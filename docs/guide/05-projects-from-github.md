# 05 — Projects section with live data from GitHub

> **Goal of this step:** show the projects that matter, described in both languages, enriched with live
> data from GitHub (language, last update, stars) — without ever letting GitHub break the build.
>
> **Files:** [`src/data/projects.ts`](../../src/data/projects.ts) · [`src/lib/github.ts`](../../src/lib/github.ts) ·
> [`src/components/ProjectCard.astro`](../../src/components/ProjectCard.astro) · **Issue:** #3

## 1. Curated text + live numbers

| Comes from                            | What                                                                   | Why                                                                                                |
| ------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/data/projects.ts` (you write it) | which projects, order, title, summary, highlights, tags — in EN and PT | a repo description is one short line in one language; a recruiter needs the problem and the result |
| GitHub API (at build time)            | primary language, last push, stars, homepage                           | changes on its own; nobody should update it by hand                                                |

The issue first proposed choosing projects by a `portfolio` topic on GitHub. The site is only rebuilt on
merge, so a topic change wouldn't show up until the next deploy anyway — and the bilingual text has to live
in the repo. The data file is the single, reviewable place for both.

## 2. Fetching at build time

```astro
const stats = await fetchRepoStats(projects.map((p) => p.repo));
```

This runs in the page's frontmatter, so it executes **during `npm run build`**, not in the visitor's
browser. Visitors get plain HTML with the numbers already in it: no API call, no rate limit, no loading
spinner. The numbers are as fresh as the last deploy.

### Never break the build

`src/lib/github.ts` treats GitHub as optional:

| Situation                                            | Result                                       |
| ---------------------------------------------------- | -------------------------------------------- |
| 200 with the expected fields                         | stats shown                                  |
| 404 (private, renamed or deleted repo)               | card without stats, warning in the build log |
| network error or > 5 s                               | card without stats                           |
| 200 with unexpected JSON (e.g. a rate-limit message) | card without stats                           |
| `GITHUB_OFFLINE=1`                                   | no request at all (the e2e build uses this)  |

The JSON is checked field by field (`parse()`) instead of trusting a type cast: the API is external input.

Two smaller details:

- **One request per repo per build.** Astro renders `/` and `/pt/`; a module-level `Map` of promises makes
  the second render reuse the first one's requests.
- **Token without leaking it.** Anonymous API calls are limited to 60/hour per IP — and CI runners share IPs.
  CI passes `GITHUB_TOKEN` to `docker build` as a **build secret** (`RUN --mount=type=secret`): available
  to that one command, never written to an image layer (an `ARG` or `ENV` would be visible in
  `docker history`). Verified with `docker history --no-trunc`.

## 3. The card

Title (linked), year, summary, highlights, tags, and a footer with _Code →_, _Live demo →_ (when there is
one) and the live stats. Stars only appear when there are some — "★ 0" adds nothing.

## 4. Tests

| Test                        | Checks                                                                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/github.test.ts`    | field mapping, 404 skipped, network error survives, malformed JSON ignored, offline makes no request, token sent as `Authorization`, one request per repo |
| `src/data/projects.test.ts` | unique repos, valid names, text in every language with the same number of highlights, plausible year, tags                                                |
| `e2e/projects.spec.ts`      | every project rendered in order with the right link, PT translation, cards still render without GitHub, section order (about → projects → experience)     |

## 5. Adding a project

1. Make sure the repo is **public** and has a good README.
2. Add an entry to `src/data/projects.ts` (both languages). Run `make test` — the data tests tell you what's missing.
3. Merge: the pipeline deploys it (guide 04).

## 6. Exercises

1. Add a fake repo name to `projects.ts` and run `npm run build`: find the warning in the log and see the card without stats.
2. Run `GITHUB_OFFLINE=1 npm run build` and compare `dist/index.html` with a normal build.
3. Run `curl -sI https://api.github.com/repos/dpontejs/flamengo-news | grep -i ratelimit` with and
   without `-H "Authorization: Bearer $(gh auth token)"`.
4. Build the image with `make image` and run `docker history --no-trunc portfolio:local`: is there any token in it?

## Further reading

- [GitHub REST API: get a repository](https://docs.github.com/rest/repos/repos#get-a-repository)
- [GitHub API rate limits](https://docs.github.com/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [Docker build secrets](https://docs.docker.com/build/building/secrets/)
