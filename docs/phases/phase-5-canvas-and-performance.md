# Phase 5 · Canvas, GraphQL & performance ★ (Day 5, ~6 h)

**Goal:** the features that set a senior candidate apart: a **canvas whiteboard**, **hand-drawn canvas charts** fed by **GraphQL**,
a **Trie-powered command palette**, a **virtualised 10k-row feed**, code splitting, and hands-on **profiling and debugging** in DevTools.
**[Interview topics](../interview/target-role.md) covered:** *canvas · GraphQL · browser-based debugging and performance testing · highly optimised, performant code · design patterns*
**Primers:** [canvas vs SVG](../concepts/web/canvas-vs-svg.md) · [performance: memo & splitting](../concepts/react/performance-memo-splitting.md) ·
[rendering pipeline](../concepts/web/rendering-pipeline.md) · [Web Vitals & Lighthouse](../concepts/web/web-vitals-lighthouse.md) ·
[memory leaks](../concepts/js/memory-leaks.md) · [design patterns](../concepts/js/design-patterns.md) · [REST vs GraphQL](../concepts/web/rest-vs-graphql.md)

---

## Order of work
| # | File(s) | Time | Notes |
|---|---|---|---|
| 1 | `features/whiteboard/drawingEngine.js` | 30 min | Pure logic: command pattern, strategy per tool, hit-testing (lab 10) |
| 2 | `features/whiteboard/CanvasBoard.jsx`, `Toolbar.jsx`, `WhiteboardPage.jsx`, `exportImage.js` | 90 min | Refs, DPR, ResizeObserver, pointer events, rAF, autosave |
| 3 | `mocks/handlers.js` (GraphQL part), `features/dashboard/dashboardQueries.js` | 20 min | `graphql.query('Dashboard', …)` in MSW |
| 4 | `features/dashboard/DashboardPage.jsx`, `BarChartCanvas.jsx` | 50 min | Grid areas, count-up tiles, an animated canvas chart with a tooltip |
| 5 | `features/search/CommandPalette.jsx` | 50 min | Trie + fuzzyScore, combobox ARIA, keyboard navigation |
| 6 | `components/VirtualList`, `features/activity/ActivityFeed.jsx` | 50 min | Naive vs virtualised: measure both |
| 7 | Code splitting & bundle check | 15 min | `lazy` routes, `npm run build`, look at the chunk sizes |
| 8 | [`docs/debugging-lab.md`](../debugging-lab.md) | 60 min | 6 bug hunts with DevTools |
| 9 | `perf/reportWebVitals.js` + Lighthouse on `npm run preview` | 20 min | Performance ≥ 90 |
| ☆ | `features/settings/LegacyClock.jsx`, `BurndownChart.jsx` (SVG), `<ViewTransition>` | | |

## Performance toolbox (use each at least once today)
| Tool | Where | What it tells you |
|---|---|---|
| React DevTools **Profiler** (+ "Highlight updates") | extension | which components rendered, why, and how long it took |
| Chrome **Performance** panel (CPU 4× slowdown) | DevTools | long tasks, layout thrashing, scripting vs rendering time |
| **Performance insights** / Web Vitals overlay | DevTools | LCP, CLS, INP per interaction |
| **Memory** panel (heap snapshots, "Detached elements") | DevTools | leaks from listeners, intervals, closures |
| **Coverage** tab | DevTools → More tools | unused JS/CSS per route |
| **Network** panel (throttling, disable cache) | DevTools | waterfall, caching headers, payload sizes |
| **Rendering** panel (paint flashing, layout shift regions, FPS meter) | DevTools → More tools | what repaints and what shifts |
| **Lighthouse** | DevTools | lab scores and opportunities |
| `web-vitals` library | code | field data (LCP, INP, CLS) sent to `/api/metrics` |

## Before/after log (fill it in; it's great interview material)
| Scenario | Metric | Before | After | Change you made |
|---|---|---|---|---|
| Activity feed, 10k rows | initial render (ms) | | | |
| Activity feed, scrolling | dropped frames / long tasks | | | |
| Board, drag a card | components re-rendered | | | |
| Command palette, typing | INP (ms) | | | |
| Initial load | JS transferred (kB) | | | |
| Whiteboard, drawing | FPS | | | |

## ✅ Checkpoint
- [ ] The whiteboard is crisp at 200% zoom, works with touch (device mode), has undo/redo (Cmd/Ctrl+Z / Shift+Cmd/Ctrl+Z), autosaves and exports a PNG
- [ ] The dashboard loads with ONE GraphQL request (check the Network tab) and the chart tooltip follows the mouse
- [ ] `Cmd/Ctrl + K` opens the palette. Arrow keys, Enter and Esc work, and matched characters are highlighted.
- [ ] The virtualised feed keeps ≤ ~30 row elements in the DOM (check the Elements panel) and scrolls at 60 fps
- [ ] The debugging-lab table is filled in
- [ ] Lighthouse on the production build: Performance ≥ 90, Accessibility ≥ 95

## 🎤 Drill
1. Walk me through how you'd find out why a page is slow.
2. `useMemo` / `useCallback` / `memo`: when do they help, and when do they hurt? What does the React Compiler change?
3. How does list virtualisation work? What about variable row heights?
4. Why use GraphQL for the dashboard but REST for CRUD?
5. How would you make the whiteboard collaborative in real time? (WebSockets, CRDTs or OT, presence, conflict resolution.)
6. What's INP, and how do you improve it? (Yield to the main thread, `startTransition`, `useDeferredValue`, break up long tasks.)

🤖 `/review client/src/features/whiteboard` · `/quiz performance debugging canvas`
