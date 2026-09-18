# PROGRESS

This file is **yours**: fill it in and commit it in your own copy of the repo.
Tick items as you finish them, or run `/progress` and the AI tutor will do it for you (and run the lab tests).
"Done" means every **✅ DONE WHEN** box in that file's instruction block is satisfied.

```
Track:    intensive-7-day | standard-4-week | part-time-8-week      ← keep one (see ROADMAP.md)
Level:    junior | mid | senior                                     ← keep one (sets /quiz difficulty)
Started:  YYYY-MM-DD
Goal:     e.g. "frontend interview on 2026-10-01" or "build my first MERN app"
Last updated by /progress: never
```

---

## Phase 0 — Setup
- [ ] Node 24 active (`node -v` → v24.x)
- [ ] Your own copy of the repo (fork or template), cloned; working on a `phase-…` branch
- [ ] Root `package.json` with npm workspaces (`client`, `server`)
- [ ] `labs` dependencies installed, `npm test` runs (red is fine)

## Phase 2 — JavaScript labs (tests: `cd labs && npm test`)
| Lab | ★/☆ | Tests green | Notes |
|---|---|---|---|
| 01 scope & closures | ★ | [ ] | |
| 02 this & bind | ★ | [ ] | |
| 03 object model | ★ | [ ] | |
| 04 array methods | ★ | [ ] | |
| 05 async | ★ | [ ] | |
| 06 functional utils | ★ | [ ] | |
| 07 data structures | ★ | [ ] | |
| 08 algorithms | ☆ | [ ] | |
| 09 DOM & events (+ playground) | ★ | [ ] | |
| 10 canvas (+ playground) | ☆ | [ ] | |
| 11 Babel & JSX | ★ | [ ] | |
| 12 mini-React | ★ | [ ] | |
| 13 mini-Redux | ★ | [ ] | |

## Phase 1 — Landing page (HTML/CSS)
- [ ] `landing/index.html` semantic structure
- [ ] `css/base.css` · [ ] `css/layout.css` · [ ] `css/components.css`
- [ ] `css/animations.css` · [ ] `css/responsive.css` · [ ] `js/main.js`
- [ ] Looks intentional at 360 / 768 / 1024 / 1440 px · Lighthouse a11y ≥ 95

## Phase 3 — React foundations (`client/`)
- [ ] SETUP done by hand (dev server runs)
- [ ] `index.html` · [ ] `vite.config.js` · [ ] `eslint.config.js`
- [ ] `main.jsx` · [ ] `app/router.jsx` · [ ] `app/AppLayout.jsx` · [ ] `app/ErrorBoundary.jsx`
- [ ] `styles/` tokens · reset · layout · animations · utilities
- [ ] `context/ThemeContext.jsx`
- [ ] Components: [ ] Button [ ] Modal [ ] Toast [ ] Skeleton [ ] Spinner [ ] Avatar ☆ [ ] Tabs ☆ [ ] Dropdown ☆ [ ] VirtualList
- [ ] Hooks: [ ] useDebounce [ ] useLocalStorage [ ] useMediaQuery [ ] useClickOutside [ ] useKeyboardShortcut [ ] useIntersectionObserver [ ] usePrevious [ ] useUndoRedo ☆
- [ ] `lib/`: [ ] dataStructures [ ] httpClient [ ] format

## Phase 4 — State & data
- [ ] `features/ui` classic Redux (actionTypes, actions, uiReducer)
- [ ] `app/store.js`
- [ ] `mocks/` browser · server · handlers
- [ ] `features/auth`: authSlice · LoginPage · RequireAuth
- [ ] `features/projects`: projectsApi · ProjectsPage · ProjectCard · NewProjectModal
- [ ] `features/board`: boardSlice · selectors · BoardPage · Column · TaskCard · useBoardDnD · TaskDetailsDrawer

## Phase 5 — Canvas & performance
- [ ] `features/whiteboard`: WhiteboardPage · CanvasBoard · Toolbar · drawingEngine · exportImage
- [ ] `features/dashboard`: DashboardPage · BarChartCanvas · BurndownChart ☆ · dashboardQueries
- [ ] `features/search/CommandPalette`
- [ ] `features/activity/ActivityFeed` (naive vs virtualized, profiled)
- [ ] `features/settings`: SettingsPage · LegacyClock ☆
- [ ] `perf/reportWebVitals.js`
- [ ] Debugging lab: 6 bug hunts done
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95 (production build)

## Phase 6 — Testing & quality
- [ ] `test/setup.js`
- [ ] `boardSlice.test.js` · [ ] `TaskCard.test.jsx` · [ ] `CommandPalette.test.jsx`
- [ ] `npm run lint` passes with 0 warnings
- [ ] `/review` done on 3 files and findings fixed

## Phase 7 — Node backend (`server/`)
- [ ] SETUP done, MongoDB running
- [ ] `app.js` · `index.js` · `config/env.js` · `config/db.js`
- [ ] Models: User · Project · Task · Drawing ☆ · Activity ☆
- [ ] Middleware: auth · validate · errorHandler · rateLimit ☆
- [ ] Routes + controllers: auth · projects · tasks · activity ☆ · drawings ☆
- [ ] GraphQL: schema · resolvers · index
- [ ] `scripts/seed.js`
- [ ] Tests: auth · tasks · graphql ☆
- [ ] Client switched from MSW to the real API

## Phase 8 — DevOps ☆
- [ ] `.github/workflows/ci.yml` green on GitHub
- [ ] `server/Dockerfile` · `server/docker-compose.yml`
- [ ] Lighthouse CI

## Phase 9 — Interview drills
- [ ] 4 machine-coding prompts done under time
- [ ] System design walkthrough recorded / rehearsed
- [ ] 6 STAR stories written
- [ ] Full mock interview (`/quiz full mock interview`)

---

## Confidence tracker (rate 1–5; re-rate after each `/quiz`)
| Topic | Start | Midway | End |
|---|---|---|---|
| Scope, closures, hoisting, TDZ | | | |
| `this`, prototypes, classes | | | |
| Event loop, promises, async/await | | | |
| DOM manipulation, events, delegation | | | |
| Data structures & algorithms | | | |
| JSX & Babel | | | |
| Virtual DOM & reconciliation | | | |
| Component lifecycle (class & hooks) | | | |
| Flux / Redux / RTK / RTK Query | | | |
| REST vs GraphQL | | | |
| Flexbox & Grid | | | |
| Media & container queries, responsive design | | | |
| Transitions, `@keyframes`, performance of animations | | | |
| Canvas | | | |
| React performance (memo, splitting, virtualization) | | | |
| Browser DevTools debugging & profiling | | | |
| Testing (Mocha, Vitest, RTL) | | | |
| Git, CI/CD, Docker | | | |
| Node, Express, MongoDB, JWT | | | |
| Frontend system design | | | |

## Quiz log
| Date | Topic | Score | Weak spots to revisit |
|---|---|---|---|
| | | | |
