# ROADMAP

Pick **one** track, write it in the `Track:` line of [PROGRESS.md](PROGRESS.md), and follow it. Every track covers the same ★ items.

| Track | Time | For | Jump to |
|---|---|---|---|
| **Intensive** | 7 days × 7–8 h | developers who already know React/Node and are preparing for an interview | [↓ Intensive](#track-a-intensive-7-days) |
| **Standard** | 4 weeks × 2–3 h/day | most learners | [↓ Standard](#track-b-standard-4-weeks) |
| **Part-time** | 8 weeks × 6–8 h/week | learning alongside a job or studies | [↓ Part-time](#track-c-part-time-8-weeks) |

★ = must-do · ☆ = only if you're ahead. If you fall behind, drop the ☆ items first.
The "Day N" labels inside the instruction blocks refer to the **intensive** track. On the other tracks, go by the phase number.
The evening `/quiz` needs an [AI tutor](docs/ai-tutor.md). Without one, use the [Q&A banks](docs/interview/javascript-qa.md) for the same topics.

The order puts the most-asked topics first: **(1) JavaScript and React fundamentals → (2) HTML/CSS depth → (3) Node last**.
The standard and part-time tracks move the landing page earlier, because CSS fundamentals make the React styling easier.

---

# Track A: Intensive (7 days)
Budget about **7–8 focused hours a day**, plus **20 minutes of `/quiz` every evening**.

## Day 1 — Setup + JavaScript core (object model, scope, async)
| Block | Task | Guide |
|---|---|---|
| 0:00–1:00 ★ | Phase 0: your repo copy, Node 24, branch strategy, labs install | [phase-0](docs/phases/phase-0-setup.md) |
| 1:00–2:00 ★ | Lab 01 scope & closures | [lab 01](labs/01-scope-closures/README.md) |
| 2:00–3:00 ★ | Lab 02 `this`, call/apply/bind | [lab 02](labs/02-this-bind/README.md) |
| 3:00–4:30 ★ | Lab 03 prototypes, classes, EventEmitter, Proxy | [lab 03](labs/03-object-model/README.md) |
| 4:30–5:30 ★ | Lab 04 array methods & polyfills | [lab 04](labs/04-array-methods/README.md) |
| 5:30–7:30 ★ | Lab 05 promises, event loop, retry, concurrency | [lab 05](labs/05-async/README.md) |
| ☆ | "Predict the output" sheets in labs 01, 05 | |
| Evening | `/quiz javascript scope closures this event loop` | |

## Day 2 — DOM, events, data structures & algorithms
| Block | Task | Guide |
|---|---|---|
| 0:00–1:30 ★ | Lab 06 debounce, throttle, curry, deepClone | [lab 06](labs/06-functional/README.md) |
| 1:30–4:00 ★ | Lab 07 Stack, Queue, LinkedList, LRU, Trie, Heap, Graph | [lab 07](labs/07-data-structures/README.md) |
| 4:00–6:00 ★ | Lab 09 DOM & event delegation + vanilla playground widget | [lab 09](labs/09-dom-events/README.md) |
| 6:00–7:30 ★ | 2 timed machine-coding prompts (#1 autocomplete, #4 infinite scroll) | [machine-coding](docs/interview/machine-coding.md) |
| ☆ | Lab 08 algorithms · Lab 10 canvas | |
| Evening | `/quiz DOM events data structures` | |

## Day 3 — JSX, Babel, Virtual DOM, Flux → React app shell
| Block | Task | Guide |
|---|---|---|
| 0:00–1:00 ★ | Lab 11 Babel & JSX | [lab 11](labs/11-babel-jsx/README.md) |
| 1:00–2:30 ★ | Lab 12 mini-React (virtual DOM + diff) | [lab 12](labs/12-mini-react/README.md) |
| 2:30–3:30 ★ | Lab 13 mini-Redux + Flux dispatcher | [lab 13](labs/13-mini-redux/README.md) |
| 3:30–4:30 ★ | Client setup by hand (Vite 8, ESLint, Prettier) | [client/SETUP.md](client/SETUP.md) |
| 4:30–7:30 ★ | App shell: styles/tokens + layout grid, router, AppLayout, ErrorBoundary, ThemeContext, Button, Modal, Toast, Skeleton | [phase-3](docs/phases/phase-3-react-foundations.md) |
| ☆ | Tabs, Dropdown, Avatar | |
| Evening | `/quiz react virtual dom reconciliation jsx babel` | |

## Day 4 — State management + data fetching + the Board
| Block | Task | Guide |
|---|---|---|
| 0:00–1:00 ★ | Classic Redux `features/ui` → `configureStore` | [phase-4](docs/phases/phase-4-state-and-data.md) |
| 1:00–2:00 ★ | MSW mock API (handlers + seed) | [api-contract](docs/api-contract.md) |
| 2:00–3:00 ★ | Auth slice, LoginPage, RequireAuth | |
| 3:00–4:00 ★ | Projects via RTK Query + ProjectsPage + NewProjectModal | |
| 4:00–7:30 ★ | **Board**: boardSlice (entity adapter), selectors, BoardPage, Column, TaskCard, drag-and-drop, optimistic move, drawer | |
| ☆ | useUndoRedo, task dependencies (Graph.topoSort) | |
| Evening | `/quiz redux flux rtk query` | |

## Day 5 — Canvas, performance, debugging, tests
| Block | Task | Guide |
|---|---|---|
| 0:00–2:00 ★ | Whiteboard: CanvasBoard, drawingEngine, Toolbar, export | [phase-5](docs/phases/phase-5-canvas-and-performance.md) |
| 2:00–3:00 ★ | Dashboard + BarChartCanvas (GraphQL via MSW) | |
| 3:00–4:00 ★ | CommandPalette (Trie + fuzzy) | |
| 4:00–5:00 ★ | ActivityFeed: naive → VirtualList; code-split routes | |
| 5:00–6:15 ★ | Debugging lab: Profiler, Performance panel, Memory, Lighthouse | [debugging-lab](docs/debugging-lab.md) |
| 6:15–7:30 ★ | 3 Vitest + RTL tests (boardSlice, TaskCard, CommandPalette) | [phase-6](docs/phases/phase-6-testing-and-quality.md) |
| ☆ | LegacyClock lifecycle, `<ViewTransition>`, BurndownChart (SVG) | |
| Evening | `/quiz performance canvas debugging` | |

## Day 6 — HTML & CSS deep dive + polish
| Block | Task | Guide |
|---|---|---|
| 0:00–4:00 ★ | **Landing page**: semantic HTML, Flexbox, Grid, media queries, `@keyframes` | [phase-1](docs/phases/phase-1-html-css-landing.md) |
| 4:00–5:30 ★ | Responsive pass on the app (360 / 768 / 1024 / 1440), animations.css, reduced motion | |
| 5:30–6:30 ★ | Accessibility pass (keyboard-only walk-through, Lighthouse a11y ≥ 95) | |
| 6:30–7:30 ★ | `/review` on 3 files of your choice; fix the findings | |
| ☆ | Scroll-driven animations, container queries on cards, subgrid | |
| Evening | `/quiz css flexbox grid media queries animations` | |

## Day 7 — Node backend (slim) + interview drills
| Block | Task | Guide |
|---|---|---|
| 0:00–0:30 ★ | Server setup, start local MongoDB | [server/SETUP.md](server/SETUP.md) |
| 0:30–2:30 ★ | app.js, env, db, models, error handler, auth (JWT) | [phase-7](docs/phases/phase-7-node-backend.md) |
| 2:30–3:30 ★ | Projects + tasks REST (incl. move) | |
| 3:30–4:15 ★ | GraphQL dashboard query | |
| 4:15–5:00 ★ | 2 Mocha + Supertest tests | |
| 5:00–5:30 ★ | Switch client from MSW to the real API | |
| 5:30–7:30 ★ | System design + behavioral prep, 1 timed machine-coding prompt | [phase-9](docs/phases/phase-9-interview-drills.md) |
| ☆ | ci.yml, Dockerfile, activity cursor pagination, rate limiter | [phase-8](docs/phases/phase-8-devops-cicd.md) |
| Evening | `/quiz full mock interview senior frontend` | |

---

# Track B: Standard (4 weeks)
About **2–3 hours a day**, 7 days a week (or merge two days into a weekend session). A 20-minute quiz or Q&A review after each session.

## Week 1: setup and JavaScript
| Day | ★ Tasks | ☆ If time |
|---|---|---|
| 1 | [Phase 0](docs/phases/phase-0-setup.md) · lab 01 | predict-the-output sheet |
| 2 | labs 02 and 03 | |
| 3 | labs 04 and 05 | |
| 4 | lab 06 | |
| 5 | lab 07 | |
| 6 | lab 09 + the vanilla playground | |
| 7 | review week 1 · machine-coding prompt #1 | labs 08, 10 |

## Week 2: HTML/CSS, React internals, app shell
| Day | ★ Tasks | ☆ If time |
|---|---|---|
| 8 | labs 11 and 13 | |
| 9 | lab 12 (mini-React) | useEffect stretch |
| 10 | [landing page](docs/phases/phase-1-html-css-landing.md): HTML + base + layout | |
| 11 | landing page: components, responsive, animations, JS | scroll-driven animations |
| 12 | [client setup by hand](client/SETUP.md) · global styles | |
| 13 | router, AppLayout, ErrorBoundary, ThemeContext | |
| 14 | Button, Spinner, Skeleton, Modal, Toast · hooks · lib | Tabs, Dropdown, Avatar |

## Week 3: state, data, the board, the whiteboard
| Day | ★ Tasks | ☆ If time |
|---|---|---|
| 15 | [classic Redux](docs/phases/phase-4-state-and-data.md) `features/ui` · store · MSW handlers | |
| 16 | httpClient · auth (slice, LoginPage, RequireAuth) | |
| 17 | projects (RTK Query, page, card, modal) | optimistic create |
| 18 | board: slice, selectors, BoardPage, Column | |
| 19 | board: TaskCard, drag-and-drop, keyboard moves, drawer | undo/redo, dependencies |
| 20 | [whiteboard](docs/phases/phase-5-canvas-and-performance.md): engine, CanvasBoard, Toolbar, export | |
| 21 | dashboard + BarChartCanvas (GraphQL via MSW) | BurndownChart |

## Week 4: performance, testing, backend
| Day | ★ Tasks | ☆ If time |
|---|---|---|
| 22 | CommandPalette · VirtualList · ActivityFeed (measure before/after) | |
| 23 | [debugging lab](docs/debugging-lab.md) · web vitals · Lighthouse · code splitting | React Compiler |
| 24 | [tests, lint, accessibility, self-review](docs/phases/phase-6-testing-and-quality.md) | Playwright |
| 25 | [server setup](server/SETUP.md) · config · error handling · models · auth | |
| 26 | projects + tasks REST · seed script | activity pagination, rate limiting |
| 27 | GraphQL · server tests · switch the client to the real API | |
| 28 | [interview drills](docs/phases/phase-9-interview-drills.md) or a project write-up | [CI/CD + Docker](docs/phases/phase-8-devops-cicd.md) |

---

# Track C: Part-time (8 weeks)
About **3–4 sessions of ~2 hours per week**. Each week lists its goal. Split it into sessions however you like.

| Week | ★ Goal | ☆ If time |
|---|---|---|
| 1 | [Phase 0](docs/phases/phase-0-setup.md) · labs 01–03 | |
| 2 | labs 04–07 | lab 08 |
| 3 | labs 09, 11, 12, 13 | lab 10 |
| 4 | [landing page](docs/phases/phase-1-html-css-landing.md) (all files) | scroll-driven animations, subgrid |
| 5 | [client setup](client/SETUP.md) · app shell · component kit · hooks · lib | Tabs, Dropdown |
| 6 | Redux (classic + RTK) · MSW · auth · projects · **board** | undo/redo, dependencies |
| 7 | whiteboard · dashboard · command palette · activity feed · debugging lab · tests | BurndownChart, ViewTransition |
| 8 | [backend](docs/phases/phase-7-node-backend.md) · switch to the real API · [drills](docs/phases/phase-9-interview-drills.md) or a write-up | CI/CD, Docker |

---

## All phases (reference)
| Phase | Theme | Guide |
|---|---|---|
| 0 | Setup, git, npm workspaces | [phase-0](docs/phases/phase-0-setup.md) |
| 1 | HTML & CSS landing page | [phase-1](docs/phases/phase-1-html-css-landing.md) |
| 2 | JavaScript labs 01–13 | [phase-2](docs/phases/phase-2-javascript-labs.md) |
| 3 | React foundations | [phase-3](docs/phases/phase-3-react-foundations.md) |
| 4 | State & data (Redux, RTK Query, MSW) | [phase-4](docs/phases/phase-4-state-and-data.md) |
| 5 | Canvas & performance | [phase-5](docs/phases/phase-5-canvas-and-performance.md) |
| 6 | Testing & quality | [phase-6](docs/phases/phase-6-testing-and-quality.md) |
| 7 | Node backend | [phase-7](docs/phases/phase-7-node-backend.md) |
| 8 | DevOps & CI/CD | [phase-8](docs/phases/phase-8-devops-cicd.md) |
| 9 | Interview drills | [phase-9](docs/phases/phase-9-interview-drills.md) |

Phases are numbered by **topic**, not by day. The intensive track deliberately does Phase 2 before Phase 1, because JavaScript comes up in interviews more often than a dedicated CSS page.
