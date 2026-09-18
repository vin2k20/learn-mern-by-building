# Phase 3 · React foundations ★ (Day 3 afternoon, ~3.5 h)

**Goal:** a hand-built Vite 8 + React 19.3 app shell: responsive layout, routing with lazy routes, an error boundary
(a class component!), theming, a small component kit and custom hooks.
**[Interview topics](../interview/target-role.md) covered:** *React fundamentals (JSX, Virtual DOM, component lifecycle) · Create React App · popular frontend tools · UI design*
**Primers:** [lifecycle: class vs hooks](../concepts/react/lifecycle-class-vs-hooks.md) · [hooks deep dive](../concepts/react/hooks-deep-dive.md) ·
[component patterns](../concepts/react/component-patterns.md) · [error boundaries & Suspense](../concepts/react/error-boundaries-suspense.md) ·
[React 19 features](../concepts/react/react-19-features.md) · [routing (RR8)](../concepts/react/routing-rr8.md) ·
[bundlers: Vite vs webpack vs CRA](../concepts/tooling/bundlers-vite-webpack-cra.md) · [ESLint & Prettier](../concepts/tooling/eslint-prettier.md)

---

## Order of work
| # | File(s) | Time | Notes |
|---|---|---|---|
| 1 | [`client/SETUP.md`](../../client/SETUP.md) | 45 min | Build the toolchain by hand. Add the root workspace. |
| 2 | `client/index.html`, `vite.config.js`, `eslint.config.js` | 20 min | Dev server running, lint passing |
| 3 | `src/styles/tokens.css` → `reset.css` → `utilities.css` → `layout.css` | 30 min | Tokens from the design doc; the app-shell grid |
| 4 | `src/main.jsx`, `src/app/router.jsx`, `src/app/AppLayout.jsx` | 35 min | Placeholder pages for each route |
| 5 | `src/app/ErrorBoundary.jsx` | 15 min | A class component: `getDerivedStateFromError`, `componentDidCatch` |
| 6 | `src/context/ThemeContext.jsx` + `src/hooks/useMediaQuery.js` + `useLocalStorage.js` | 25 min | Light/dark/system |
| 7 | `src/components/Button`, `Spinner`, `Skeleton` | 20 min | Variants via `data-*` attributes and CSS Modules |
| 8 | `src/components/Modal`, `Toast` | 30 min | Portals, focus trap (lab 09!), `aria-live` |
| 9 | Remaining hooks (`useDebounce`, `useClickOutside`, `useKeyboardShortcut`, `usePrevious`) | 20 min | Reuse lab 06 |
| 10 | `src/lib/dataStructures.js`, `format.js` | 10 min | Copy your lab 07 code across |
| ☆ | `Tabs`, `Dropdown`, `Avatar` | | Compound components, roving tabindex |

## Architecture you're building
```
main.jsx
 └─ <StrictMode>
     └─ <Provider store>             (Phase 4)
         └─ <ThemeProvider>
             └─ <ToastProvider>
                 └─ <RouterProvider router>
                      └─ AppLayout (grid shell: header / sidebar / main)
                          ├─ <Outlet/> → lazy route pages (Projects, Board, Whiteboard, Dashboard, Activity, Settings)
                          └─ errorElement / ErrorBoundary
```

## Lifecycle map (memorise it)
| Class component | Hooks equivalent | When |
|---|---|---|
| `constructor` | `useState` initialiser | before the first render |
| `render` | the function body | every render (must be pure) |
| `componentDidMount` | `useEffect(fn, [])` | after the first commit and paint |
| `componentDidUpdate(prevProps)` | `useEffect(fn, [deps])` | after commits where deps changed |
| `componentWillUnmount` | the cleanup returned from `useEffect` | before removal (and before re-running the effect) |
| `shouldComponentUpdate` / `PureComponent` | `React.memo` | to skip re-rendering |
| `getDerivedStateFromError` / `componentDidCatch` | **no hook equivalent**, so you still need a class | on render errors in children |
| `getSnapshotBeforeUpdate` | `useLayoutEffect` (roughly) | before paint, to read the layout |

## ✅ Checkpoint
- [ ] `npm run dev` serves the app. Every route renders a placeholder, and unknown URLs show a 404 route.
- [ ] Resizing from 360 → 1440 px: drawer → icon rail → full sidebar
- [ ] Throwing inside a page shows the error UI instead of a blank screen, and "Try again" recovers
- [ ] The theme toggle persists across reloads and respects the OS setting on "system"
- [ ] The modal traps focus, closes on Esc and backdrop click, and gives focus back to the trigger
- [ ] `npm run lint` passes with 0 warnings
- [ ] DevTools → Network: each route loads its own JS chunk the first time you visit it

## 🎤 Drill
1. Why does `StrictMode` run effects twice in development?
2. Why can't error boundaries be function components? What don't they catch?
3. Controlled vs uncontrolled components?
4. Context: what re-renders when the value changes? How do you avoid unnecessary re-renders?
5. What did CRA give you, and why did the React team deprecate it in 2025?

🤖 `/review client/src/app` · `/quiz react lifecycle hooks context`
