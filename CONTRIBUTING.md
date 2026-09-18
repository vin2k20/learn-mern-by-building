# Contributing to Learn MERN by Building (Kanvas)

Thanks for helping people learn! This repo is **learning material**, so contributions look a little different from a normal app.

> **Learners:** you don't need to contribute anything to use this repo. Work in your own copy (template or fork).
> Please **don't open PRs containing your solutions** against the original repo.

## Ways to help
| Contribution | How |
|---|---|
| 🐛 A mistake, broken link, outdated API or failing setup step | Open an issue with the **Content problem** template |
| 🧪 A lab test that's wrong or too weak | Open an issue with the failing input and the expected behaviour (**Lab test problem** template) |
| 💡 Clearer instructions, better hints, a new primer or interview question | Open a PR (small and focused) |
| 🧩 A new lab, stretch goal or machine-coding prompt | Open an issue first so we can agree on its scope |
| 🌍 A translation | Open an issue first (we'll decide on a folder structure, e.g. `docs/i18n/<lang>/`) |
| 🎉 Your finished build | Post it in **Discussions → Show and tell** (link your repo, and don't paste full solutions) |

## Ground rules for content
1. **No solutions in this repo.** Instruction files in `client/`, `server/`, `landing/` and the lab playgrounds must contain **only comments**.
   Lab files contain an instruction block plus **stubs that throw `TODO` errors**.
2. **Keep the instruction-block format** (see below and [docs/00-how-to-use.md](docs/00-how-to-use.md)). Every ✅ DONE WHEN item must be checkable.
3. **The contract is law.** Any API change must update [docs/api-contract.md](docs/api-contract.md), the MSW handler instructions and the server instructions together.
4. **Be accurate and version-specific.** Link to official docs, and state the version when behaviour differs between versions.
   If you bump a major version, update the "Stack facts" in [CLAUDE.md](CLAUDE.md), the docs that mention it, and [CHANGELOG.md](CHANGELOG.md).
5. **Cross-platform.** Commands must work on macOS, Linux and Windows, or show the variants.
6. **Friendly, plain English.** Short sentences, and explain jargon on first use. Beginners read this.
7. **Accessibility and performance matter** in every UI instruction (keyboard support, focus, reduced motion, measurements).

### The instruction block template
```js
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 <path> · Phase N · Day N · ★ core | ☆ stretch
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL          one or two sentences
 * 🧠 CONCEPTS      → docs/concepts/<area>/<primer>.md
 * 🧩 DEPENDS ON / USED BY
 * 📝 STEPS         numbered, small, in order
 * ✅ DONE WHEN     [ ] checkable acceptance criteria
 * 💡 HINTS         API names / direction only, never the answer
 * ⚠️ GOTCHAS
 * 🎤 INTERVIEW ANGLE
 * 🚀 STRETCH ☆
 * 🤖 ASK THE AGENT /explain … · /hint <path> step N
 * ═══════════════════════════════════════════════════════════════════════════
 */
```
Inside JS/CSS comments, write `*\/` instead of `*/` in examples (for instance in glob patterns), or the comment block ends early.
The health check catches this.

### Writing or changing lab tests
- Mocha + Chai, ESM. Tests describe **behaviour**, and test names read like a spec.
- **Never call learner code at the top level of a `describe`.** Do it inside `it` or hooks, so an unfinished lab fails cleanly instead of crashing the whole run.
- Every test must **fail against the TODO stubs** and **pass against a correct implementation**.
  Write a reference solution locally (**don't commit it**), and paste it in your PR description inside a collapsed `<details>` block, or link a secret gist, so reviewers can verify it.
- Stretch suites use the `stretch` helper (`describe.skip` unless you run `npm run test:stretch` or set `STRETCH=1`).
- DOM tests use `global-jsdom`. Point `Event`/`CustomEvent`/`FormData` at jsdom's versions (see lab 09).
- Avoid flaky timing. Prefer Sinon fake timers, and use generous lower-bound checks when real time is needed.
- When a test catches an error to inspect it, call `rethrowUnexpected(e)` first (see lab 05), so `TODO` errors surface clearly.

## Local checks before a PR
Use Node 24 (`nvm use`), then:
```bash
cd labs && npm ci && cd ..
```
```bash
node tools/verify-scaffold.mjs --run-labs
```
The script checks that the instruction files are comment-only, that the lab stubs load and **every** test fails with `TODO` (0 passing),
that the Markdown links and anchors resolve, and that the required files exist. CI runs the same check on every PR.

If you changed lab tests, also run them against your private reference solution (all green, including `npm run test:stretch`).

## Pull requests
1. Fork the repo and create a branch: `docs/fix-lab-05-typo`, `feat/lab-14-streams`, …
2. Keep PRs **small and focused**. Use Conventional Commits (`docs:`, `fix:`, `feat:`, `test:`, `chore:`).
3. Update [CHANGELOG.md](CHANGELOG.md) under **Unreleased** for anything a learner would notice.
4. Fill in the **contribution** section of the PR template. (The learner self-review checklist below it is for learners' own repos; delete it.)
5. Be patient and kind in reviews (see the [Code of Conduct](CODE_OF_CONDUCT.md)).

## For maintainers
Repository settings to enable after publishing:
- **Settings → General → Template repository** ✔ (enables "Use this template")
- **Settings → General → Features → Discussions** ✔ (categories: Q&A, Show and tell, Ideas)
- **Settings → Code security → Private vulnerability reporting** ✔ (used by SECURITY.md and CODE_OF_CONDUCT.md)
- **Settings → Branches**: protect `main` and require the **Scaffold health** check
- **About**: add a description, and topics such as `mern`, `react`, `redux-toolkit`, `express`, `mongodb`, `learning`, `interview-preparation`, `javascript`, `canvas`
- Releases: tag versions (`v1.0.0`) that match CHANGELOG.md, so learners can see what changed.

The `Scaffold health` workflow only runs on the original repository (`if: github.repository == …`), because learners' copies will
(correctly) contain code, and the health check would fail there.
