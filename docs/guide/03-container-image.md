# 03 — Packaging the site as a container image

> **Goal of this step:** turn the site into a Docker image that runs the same everywhere, publish it to
> GitHub's registry on every merge, and expose the commit it was built from — the pieces the automatic
> deploy (infra repo, `docs/features/auto-deploy.md`) relies on.
>
> **Files:** [`Dockerfile`](../../Dockerfile) · [`docker/Caddyfile`](../../docker/Caddyfile) ·
> [`src/pages/version.json.ts`](../../src/pages/version.json.ts) ·
> [`scripts/smoke-image.sh`](../../scripts/smoke-image.sh) · [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)

## 1. Why an image, for a static site?

The VPS could just receive the `dist/` folder. An image adds three things the deploy needs:

- **A single artifact** with the files _and_ the server config (cache headers), versioned by commit.
- **A health signal**: Docker knows whether the container is `healthy`, so the deploy agent can roll back.
- **The same mechanism for every app**: the next projects (a RAG API, a model server) are containers too.

## 2. Multi-stage build

```dockerfile
FROM node:24-alpine AS build      # stage 1: has Node, npm, node_modules…
RUN npm ci && npm run build       #          produces /app/dist

FROM caddy:2.11.7-alpine          # stage 2: starts clean
COPY --from=build /app/dist /srv  #          takes only the result
```

The final image never contains Node, `node_modules` or the source code — only Caddy and static files
(~93 MB, mostly Caddy + Alpine). Smaller image, smaller attack surface.

**Layer caching:** `package.json` and `package-lock.json` are copied and installed _before_ the rest of the
code. Docker reuses that layer while dependencies don't change, so editing a page doesn't reinstall
everything. `.dockerignore` keeps `node_modules`, `dist`, tests and docs out of the build context.

## 3. The server inside the container

`docker/Caddyfile` listens on plain HTTP port 80 **inside the Docker network**. HTTPS, the domain and the
security headers stay with the Caddy in front (infra repo) — each layer has one job.

| Path            | `Cache-Control`                       | Why                                                                                    |
| --------------- | ------------------------------------- | -------------------------------------------------------------------------------------- |
| `/_astro/*`     | `public, max-age=31536000, immutable` | file names contain a content hash; a new build = new names, so caching forever is safe |
| `/version.json` | `no-store`                            | the deploy pipeline must always see the current commit                                 |
| everything else | default (revalidate)                  | HTML must update as soon as a new version is live                                      |

`admin off` disables Caddy's admin API — nothing needs to reconfigure this container at runtime.

## 4. `version.json`: which commit is live?

`src/pages/version.json.ts` is an Astro **endpoint**. In a static build it runs once, at build time,
and writes `dist/version.json`:

```json
{ "commit": "f6ccd37…" }
```

The commit comes from the `GIT_SHA` build argument (`--build-arg GIT_SHA=$(git rev-parse HEAD)`). Two
consumers:

- the **healthcheck** (`wget http://127.0.0.1/version.json`): if the file is served, the site is up;
- the **CI deploy check** (next PR): poll `https://diegoponte.dev/version.json` until it shows the merged commit.

## 5. Tags: one that moves, one that doesn't

| Tag                                       | Changes?                 | Used for                          |
| ----------------------------------------- | ------------------------ | --------------------------------- |
| `ghcr.io/dpontejs/portfolio:main`         | moves to every new merge | what the VPS follows              |
| `ghcr.io/dpontejs/portfolio:sha-<commit>` | never                    | traceability and rollback targets |

The `LABEL org.opencontainers.image.source` links the package on GitHub to this repository.

## 6. Tests

- **e2e** `version.spec.ts`: the build exposes the commit passed in `GIT_SHA` (Playwright builds with a fake one).
- **Image smoke test** (`make image-test`, also in CI on every PR): starts the real image and checks
  that it becomes `healthy`, serves `/` and `/pt/`, has the right commit in `version.json`, and sends the
  cache and compression headers above.
- CI only **pushes** from `main`; PRs build and test the image without publishing it.

## 7. Exercises

1. Run `make image-test`, then `docker image history portfolio:local`: which layers are the biggest?
2. Change a page and rebuild. Which steps print `CACHED`? Now change `package.json` — what changes?
3. Run `docker run --rm -p 8080:80 portfolio:local` and open `http://localhost:8080/version.json`.
   Then `docker inspect --format '{{json .State.Health}}' <container>`.
4. Break the healthcheck on purpose (point it to `/nope.json`), run `make image-test` and read the output.
5. Why is there no `HEALTHCHECK` using `curl`? (Hint: what's installed in `caddy:alpine`?)

## Further reading

- [Dockerfile best practices: multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
- [HEALTHCHECK instruction](https://docs.docker.com/reference/dockerfile/#healthcheck)
- [GitHub Container Registry](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [HTTP caching (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
