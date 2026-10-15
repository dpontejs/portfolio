# 04 — Continuous deployment: from merge to live site

> **Goal of this step:** every merge to `main` ends with the new version live on
> [diegoponte.dev](https://diegoponte.dev), and CI says so — or says it didn't happen.
>
> **Files:** [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) ·
> [`scripts/wait-for-deploy.sh`](../../scripts/wait-for-deploy.sh) · server side: `infra` repo,
> `docs/guide/05-automatic-deploy.md`

## 1. The whole pipeline

```
merge to main
   │
   ├─ checks   lint · unit tests · e2e in Chromium
   ├─ image    build · smoke test · push ghcr.io/dpontejs/portfolio:{sha-<commit>, main}
   │                                              │
   │                         VPS agent, every min │  pull → up --wait → healthy? (else rollback)
   │                                              ▼
   └─ deploy   poll https://diegoponte.dev/version.json until "commit" == this commit (≤ 5 min)
```

Each job only starts if the previous one passed (`needs:`), so a failing test never produces an image,
and an image that fails its smoke test is never pushed.

## 2. Why CI _watches_ instead of _deploys_

CI has no access to the server — on purpose (SSH accepts only the admin's IP; see the infra guide for the
alternatives). What CI can do is look at the public site like any visitor: `version.json` says which commit
is live and is served with `Cache-Control: no-store`, so the answer is never stale.

If the new image is unhealthy, the server rolls back, the old commit stays in `version.json`, and the
`deploy` job times out red — the failure shows up where you're already looking, on the merge.

## 3. Details in the workflow

- `if: github.ref == 'refs/heads/main'` — PRs run checks and build the image, but don't publish or deploy.
- `concurrency: deploy-production` with `cancel-in-progress` — two quick merges: the first commit will
  never be live (the second replaces it), so its wait is cancelled instead of failing after 5 minutes.
- `environment: production` — GitHub records each deployment with its URL; the repo page shows
  "Deployments", a history of what went live and when.

## 4. Exercises

1. Open the repository's **Deployments** page and match each entry to a merged PR.
2. Run `scripts/wait-for-deploy.sh https://diegoponte.dev $(git rev-parse origin/main) 30` locally.
   Then with a fake commit — read the timeout message.
3. Merge two small PRs one right after the other and watch the first `deploy` job get cancelled.

## Further reading

- [GitHub Actions: using environments for deployment](https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [GitHub Actions: concurrency](https://docs.github.com/actions/using-jobs/using-concurrency)
