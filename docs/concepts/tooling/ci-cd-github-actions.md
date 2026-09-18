# CI/CD with GitHub Actions

> **TL;DR:** **CI** = every push is automatically linted, tested and built. **CD** = passing builds are automatically delivered or deployed.
> GitHub Actions workflows are YAML files in `.github/workflows/`.

## Anatomy
```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request:
concurrency: { group: ci-${{ github.ref }}, cancel-in-progress: true }
jobs:
  client:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: client } }
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version-file: .nvmrc, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --run
      - run: npm run build
      - uses: actions/upload-artifact@v7
        with: { name: client-dist, path: client/dist }
```
(Action versions current as of Sept 2026. Check each action's releases page for newer majors.)

## Concepts
| Concept | Notes |
|---|---|
| Triggers | `push`, `pull_request`, `workflow_dispatch`, `schedule` |
| Jobs & steps | jobs run in parallel unless they declare `needs:` |
| Matrix | `strategy.matrix.node: [24, 26]` |
| Caching | `setup-node` with `cache: npm` (keyed on the lockfile hash) |
| Services | a `services: mongo:` container for integration tests |
| Artifacts | pass the build output between jobs, and keep reports |
| Secrets & env | `${{ secrets.X }}`; never echo them; OIDC for cloud deploys |
| Environments | `environment: production` with required reviewers |
| Branch protection | require checks to pass and reviews before merge |

## A pipeline for a frontend team
PR → install → lint + typecheck → unit and integration tests (+ coverage) → build → bundle-size check → preview deploy → E2E and Lighthouse CI on the preview → review → merge → deploy to staging → smoke tests → production (canary or feature flags) → monitoring.

## 🎤 Interview questions
<details><summary>How do you keep CI fast?</summary>
Cache dependencies, run jobs in parallel, run only affected projects (Nx/Turbo), shard tests, fail fast on lint, and cancel superseded runs with concurrency groups.
</details>

## Practise in Kanvas
[`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml) · [phase 8](../../phases/phase-8-devops-cicd.md)
