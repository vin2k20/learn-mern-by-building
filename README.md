<div align="center">

# 🎨 Learn MERN by Building: **Kanvas**

**Build a real MongoDB · Express · React · Node app yourself.**
Every file tells you *what* to write and *why*, tests tell you when you've got it right,
and an optional AI tutor helps when you're stuck, without doing it for you.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node 24 LTS](https://img.shields.io/badge/node-24%20LTS-339933?logo=node.js&logoColor=white)](.nvmrc)
[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](docs/concepts/react/react-19-features.md)
[![Express 5](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](docs/concepts/node/express5-middleware.md)
[![MongoDB](https://img.shields.io/badge/MongoDB-7%2F8-47A248?logo=mongodb&logoColor=white)](docs/concepts/node/mongoose-modeling.md)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[**Getting started**](docs/getting-started.md) ·
[Roadmap](ROADMAP.md) ·
[Product brief](docs/product-brief.md) ·
[AI tutor](docs/ai-tutor.md) ·
[FAQ](docs/faq-troubleshooting.md) ·
[Contributing](CONTRIBUTING.md)

</div>

---

## Why this project?
Most tutorials show you finished code, and you end up copying it. **This repo has the complete structure of a production-style MERN app, but no implementation code.**

- 📄 **~150 source files**, each with an **instruction block**: goal, concepts, numbered steps, acceptance criteria, hints, gotchas and interview questions.
- ✅ **13 JavaScript labs with 300+ ready-made tests.** You're done when they turn green.
- 🧭 **Three learning tracks** (7 days, 4 weeks or 8 weeks) and a progress tracker.
- 📚 **48 concept primers**, interview Q&A banks, machine-coding prompts, a frontend system-design walkthrough and a DevTools debugging lab.
- 🤖 **An optional AI tutor** (`/explain`, `/hint`, `/review`, `/quiz`, `/progress`, `/unstuck`) that is instructed to *teach, not solve*.
- 🆕 **Up to date:** React 19.3, Vite 8, React Router 8, Redux Toolkit 2, Express 5, Mongoose 9, Node 24 LTS (verified September 2026).

It works for **learning the MERN stack from the ground up**, **refreshing rusty skills**, and **preparing for frontend and full-stack interviews**.

## What you'll build
**Kanvas** is a team task board with a drawing whiteboard. Full requirements: [product brief](docs/product-brief.md).

| | |
|---|---|
| 🗂️ **Board** | Kanban columns, drag-and-drop *and* keyboard moves, filters, undo, instant (optimistic) updates that roll back on failure |
| ✏️ **Whiteboard** | A canvas sketch pad: pen, shapes, eraser, undo/redo, PNG export, autosave |
| 📊 **Dashboard** | A hand-drawn canvas chart + an SVG burndown, fed by one **GraphQL** query |
| 🔎 **Command palette** | `Cmd/Ctrl + K` fuzzy search built on a Trie |
| 📜 **Activity feed** | 10,000 events with virtualised scrolling, cursor pagination and before/after profiling |
| 🔐 **Auth, projects, settings** | JWT login, RTK Query caching, a theme system, and a class-component lifecycle demo |
| 🌐 **Landing page** | Pure HTML/CSS: Flexbox, Grid, media and container queries, `@keyframes` |

```
┌──────────── React 19 SPA (Vite 8) ────────────┐        ┌──────── Node 24 ────────┐
│ React Router 8 · Redux Toolkit · RTK Query    │  REST  │ Express 5 · JWT · zod   │      ┌───────────┐
│ Canvas whiteboard & charts · CSS Modules      │ ─────► │ GraphQL (graphql-yoga)  │ ───► │  MongoDB  │
│ MSW mock API (until the server exists)        │ GraphQL│ Mongoose 9              │      └───────────┘
└───────────────────────────────────────────────┘        └─────────────────────────┘
        Vitest + Testing Library                          Mocha + Chai + Supertest
```

## What you'll learn
| Area | Topics |
|---|---|
| **JavaScript** | scope and closures, `this`, prototypes and classes, the event loop and promises, ES2025 array and object methods, DOM and event delegation, data structures and algorithms |
| **React** | JSX and Babel, the Virtual DOM and reconciliation (you build a mini-React!), hooks and the class lifecycle, error boundaries, Suspense, React 19 Actions, component patterns |
| **State & data** | Flux → Redux (you build a mini-Redux!) → Redux Toolkit, normalisation, selectors, RTK Query, REST vs GraphQL, mocking with MSW |
| **HTML & CSS** | semantic HTML, accessibility, Flexbox, Grid, media and container queries, transitions and `@keyframes`, cascade layers, design tokens, dark mode |
| **Canvas & performance** | hi-DPI canvas, hit-testing, rAF loops, virtualisation, memoisation, code splitting, Web Vitals, Lighthouse, Chrome DevTools profiling |
| **Backend (the "E" and "N")** | Express 5 middleware, REST design, JWT auth, validation with zod, MongoDB modelling with Mongoose 9, aggregation, cursor pagination, GraphQL resolvers |
| **Quality & delivery** | Mocha, Vitest, Testing Library, Supertest, ESLint 10, Git workflows, GitHub Actions CI, Docker |
| **Career** | 🎤 interview questions in every file, machine-coding drills, frontend system design, STAR stories, code-review practice |

## Who is this for?
- **Learners** who know basic HTML, CSS and JavaScript and want to build a complete MERN app properly.
- **Developers returning to the stack** after a break, who want to catch up with modern React, Node and tooling.
- **Interview candidates** for frontend or full-stack roles (see [the target role](docs/interview/target-role.md)).

You need a laptop that can run **Node 24**, and a browser. An AI assistant is optional.

## Quick start
```bash
# 1. Get your own copy: click "Use this template" (or Fork) on GitHub, then:
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2. Use Node 24 (nvm / fnm / nvm-windows / Volta; see docs/getting-started.md)
nvm install && nvm use

# 3. Install the lab dependencies and run your first lab
cd labs && npm ci
npm run test:01          # red "TODO" tests = ready for your code
```
Then open [`labs/01-scope-closures/README.md`](labs/01-scope-closures/README.md).
The full guide, from start to end and for every OS, is **[docs/getting-started.md](docs/getting-started.md)**.

## How it works
Every source file already exists and starts with an instruction block. You write the code **below** it:

```js
/**
 * 📄 client/src/features/board/TaskCard.jsx · Phase 4 · Day 4 · ★ core
 * 🎯 GOAL        A memoised, draggable, keyboard-movable task card that opens the details drawer.
 * 🧠 CONCEPTS    → docs/concepts/js/dom-events-delegation.md, docs/concepts/web/accessibility.md …
 * 📝 STEPS       1. function TaskCard({ id, index, status, onMove }) → export default memo(TaskCard) …
 * ✅ DONE WHEN   [ ] works with the mouse, the keyboard and a screen reader …
 * 💡 HINTS · ⚠️ GOTCHAS · 🎤 INTERVIEW ANGLE · 🚀 STRETCH · 🤖 ASK THE AGENT
 */
// ← your code goes here
```

| Part | What you do | How you know it's right |
|---|---|---|
| [`labs/`](labs/README.md) | 13 plain-JavaScript labs (closures → mini-React → mini-Redux) | Ready-made **Mocha tests** go green |
| [`landing/`](landing/README.md) | A responsive, animated landing page in pure HTML/CSS | The breakpoint screenshots + Lighthouse |
| [`client/`](client/SETUP.md) | Set up Vite by hand, then build the React app against a **mock API** | ✅ DONE WHEN lists, your own Vitest tests, DevTools |
| [`server/`](server/SETUP.md) | The Express + MongoDB API that replaces the mock, following the same [contract](docs/api-contract.md) | Your own Supertest tests (the cases are listed), the app working end to end |
| [`.github/`](.github/workflows/ci.yml) ☆ | A CI pipeline and a self-review PR template | Green checks on GitHub |

Conventions (★ core, ☆ stretch, legend): [docs/00-how-to-use.md](docs/00-how-to-use.md).

## Learning tracks
| Track | Time | Best for |
|---|---|---|
| [**Intensive**](ROADMAP.md#track-a-intensive-7-days) | 7 days × 7–8 h | interview prep for developers who already know React and Node |
| [**Standard**](ROADMAP.md#track-b-standard-4-weeks) | 4 weeks × 2–3 h/day | most learners |
| [**Part-time**](ROADMAP.md#track-c-part-time-8-weeks) | 8 weeks × 6–8 h/week | learning alongside work or studies |

Write your track in [PROGRESS.md](PROGRESS.md) and tick items off as you go. It's your personal checklist, confidence tracker and quiz log.

## The journey
| Phase | Guide | Outcome |
|---|---|---|
| 0 | [Setup](docs/phases/phase-0-setup.md) | Node 24, a git workflow, labs installed |
| 1 | [HTML & CSS landing page](docs/phases/phase-1-html-css-landing.md) | a responsive, accessible, animated page |
| 2 | [JavaScript labs](docs/phases/phase-2-javascript-labs.md) | 13 labs green |
| 3 | [React foundations](docs/phases/phase-3-react-foundations.md) | app shell, router, theme, component kit |
| 4 | [State & data](docs/phases/phase-4-state-and-data.md) | Redux, RTK Query, MSW, auth, projects, **board** |
| 5 | [Canvas & performance](docs/phases/phase-5-canvas-and-performance.md) | whiteboard, GraphQL dashboard, search, virtualisation, profiling |
| 6 | [Testing & quality](docs/phases/phase-6-testing-and-quality.md) | Vitest/RTL tests, lint, accessibility, code review |
| 7 | [Node backend](docs/phases/phase-7-node-backend.md) | Express 5 + MongoDB + JWT + GraphQL, with Supertest tests |
| 8 | [DevOps & CI/CD](docs/phases/phase-8-devops-cicd.md) ☆ | GitHub Actions, Docker, Lighthouse CI |
| 9 | [Interview drills](docs/phases/phase-9-interview-drills.md) | machine coding, system design, STAR stories |

## Repository structure
```
.
├── README.md · ROADMAP.md · PROGRESS.md      start here · pick a track · track your progress
├── CLAUDE.md · AGENTS.md                     tutor rules for AI assistants
├── .claude/skills/                           /explain /hint /review /quiz /progress /unstuck
├── docs/
│   ├── getting-started.md                    setup from start to end (macOS, Linux, Windows)
│   ├── 00-how-to-use.md · product-brief.md · api-contract.md
│   ├── ai-tutor.md · faq-troubleshooting.md · debugging-lab.md
│   ├── phases/        10 phase guides          ├── concepts/    48 primers (js, react, css, web, tooling, node)
│   ├── design/        wireframes, tokens        └── interview/   Q&A, machine coding, system design, STAR, target role
├── labs/              13 JS labs with tests (standalone npm package)
├── landing/           HTML/CSS landing page (instruction files)
├── client/            React app (instruction files + mock seed data)
├── server/            Express + MongoDB API (instruction files)
└── .github/           CI workflow (an exercise) · PR and issue templates · repo health check
```

## The AI tutor (optional)
With [Claude Code](https://claude.com/claude-code), open the repo and use:

| Command | Example |
|---|---|
| `/explain <topic or file>` | `/explain event delegation` |
| `/hint <file> [step]` | `/hint client/src/hooks/useLocalStorage.js step 2` |
| `/review <path>` | `/review client/src/features/board` |
| `/quiz <topics>` | `/quiz redux middleware hard n=3` |
| `/progress` | updates `PROGRESS.md` and suggests your next tasks |
| `/unstuck <file> <step>` | the last resort: one step, explained |

Using Cursor, Copilot, Codex, Gemini or ChatGPT instead? [AGENTS.md](AGENTS.md) and [docs/ai-tutor.md](docs/ai-tutor.md) give you plain-language equivalents.
**Learning without AI** works fine too: use the 💡 hints, the primers, the tests and the checklists.

## Rules of the game
- There are **no solutions in the repo**, on purpose. The tests and ✅ DONE WHEN lists are your feedback.
- **Don't edit `labs/**/*.test.js`.** Change your code until they pass.
- **The API contract is law.** The mock API and your server must both match [docs/api-contract.md](docs/api-contract.md).
- **Commit little and often** in your own copy. One branch per phase, merged with a self-review.

## FAQ
Why no solutions? Can I use TypeScript or Tailwind? Windows? Versions changed?
See [docs/faq-troubleshooting.md](docs/faq-troubleshooting.md).

## Contributing
Found a mistake, an outdated API or a confusing instruction? Contributions are very welcome: typo fixes, better hints, new labs, translations.
Read [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).
Share your finished build in **Discussions → Show and tell** (please don't post full solutions publicly).

## License
[MIT](LICENSE) © 2026 Vineet Kumar and contributors.

<div align="center">

If this helps you learn, please ⭐ the repo so others can find it.

</div>
