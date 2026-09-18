# Phase 8 · DevOps & CI/CD ☆ (Day 7 if time, otherwise after the interview)

**Goal:** a pipeline that lints, tests and builds on every push; containerised API + MongoDB; automated Lighthouse budgets.
**[Interview topics](../interview/target-role.md) covered:** *CI/CD tools, DevOps · performance testing · code versioning*
**Primers:** [CI/CD with GitHub Actions](../concepts/tooling/ci-cd-github-actions.md) · [Docker basics](../concepts/tooling/docker-basics.md) · [Web Vitals & Lighthouse](../concepts/web/web-vitals-lighthouse.md)

> Even if you don't build this, **read the instruction files and be able to talk through them**. "Walk me through your CI pipeline" is a very common question.

---

## Order of work
| # | File | Time | Notes |
|---|---|---|---|
| 1 | [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) | 45 min | Jobs: labs, client (lint/test/build), server (test), Lighthouse ☆ |
| 2 | [`.github/pull_request_template.md`](../../.github/pull_request_template.md) | 5 min | Already written. Use it for every PR. |
| 3 | [`server/Dockerfile`](../../server/Dockerfile) | 30 min | Multi-stage, non-root, a healthcheck |
| 4 | [`server/docker-compose.yml`](../../server/docker-compose.yml) | 20 min | api + mongo (+ client ☆) |
| 5 | Lighthouse CI (`lighthouserc.json`, described in ci.yml) | 20 min | Performance budget assertions |
| 6 | Deployment notes (below) | 15 min | Talk-through only |

Steps 3 and 4 need a container runtime: **Docker Desktop** (Windows, macOS, Linux), **OrbStack** or **Colima** (macOS), or **Podman**.

## Pipeline shape
```
push / PR ─► ┌ labs ────────┐
             ├ client ──────┤─► all green ─► (main only) build image ─► deploy preview ─► Lighthouse CI
             └ server ──────┘
  each job: checkout → setup-node (24, cache npm) → npm ci → lint → test → build → upload artifact
```

## Deployment talk-through (no need to actually deploy)
| Piece | Option | Notes |
|---|---|---|
| Static client (`vite build` → `dist/`) | Vercel / Netlify / S3 + CloudFront | cache hashed assets forever, and `index.html` with `no-cache` |
| API | Render / Fly.io / ECS (the Docker image) | health checks, env vars from a secret store, graceful shutdown on SIGTERM |
| DB | MongoDB Atlas | IP allowlist, least-privilege user, backups |
| Observability | Sentry (errors + source maps), web-vitals → `/api/metrics`, structured logs | |
| Environments | preview per PR → staging → production | feature flags for risky changes |

## ✅ Checkpoint
- [ ] A PR on GitHub shows green checks for all three jobs
- [ ] `docker compose up` serves the API on :4000 with Mongo, and `curl localhost:4000/health` → 200
- [ ] You can explain caching (npm cache, Docker layer cache) and why `npm ci` is used in CI

## 🎤 Drill
1. Walk me through your CI/CD pipeline. What runs on a PR vs on main?
2. Why multi-stage Docker builds? Why a non-root user?
3. How do you keep secrets out of the repo and the image?
4. How would you catch a performance regression before it ships? (Lighthouse CI budgets, bundle-size checks.)
5. Blue/green vs canary vs feature flags?

🤖 `/explain github actions matrix caching` · `/quiz ci cd docker`
