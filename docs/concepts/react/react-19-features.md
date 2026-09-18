# React 19 → 19.3: what's new (as of Sept 2026)

> **TL;DR:** Actions and form hooks, `use`, `ref` as a prop, `<Context>` as a provider, document metadata, `<Activity>`,
> `useEffectEvent`, and, new in 19.3, stable `<ViewTransition>` and Fragment refs. Plus the React Compiler 1.0 (Oct 2025).

## React 19.0 (Dec 2024)
| Feature | One-liner |
|---|---|
| **Actions** | async functions in transitions handle pending state, errors and optimistic updates |
| `useActionState(action, initial)` | `[state, formAction, isPending]` for forms |
| `<form action={fn}>` | function actions, which reset uncontrolled forms on success |
| `useFormStatus()` (react-dom) | `{ pending, data, method }` of the parent form, for submit buttons |
| `useOptimistic(state, update)` | show the optimistic value while the action runs |
| `use(resource)` | read a promise (with Suspense) or context, and it can be called conditionally |
| `ref` as a prop | `forwardRef` is no longer needed for new components |
| Ref cleanup functions | `ref={(node) => { …; return () => cleanup(); }}` |
| `<Context value>` as a provider | `<ThemeContext value={theme}>` instead of `.Provider` |
| Document metadata | `<title>`, `<meta>`, `<link>` rendered anywhere get hoisted to `<head>` |
| Stylesheet & script support | `precedence` for stylesheets, de-duplicated async scripts |
| Resource preloading | `preload`, `preinit`, `prefetchDNS`, `preconnect` from `react-dom` |
| Better hydration errors | a single diff message |
| Removed | `ReactDOM.render`/`hydrate` (use `createRoot`/`hydrateRoot`), string refs, legacy context, `propTypes` checks, `defaultProps` on function components |

## React 19.1 / 19.2 (2025)
- **Owner stacks** in development (who rendered this?).
- **`<Activity mode="hidden|visible">`** hides UI while keeping its state (a better way to keep tabs alive), with deferred updates while hidden.
- **`useEffectEvent`** for effect "event" logic that always sees the latest props and state without being a dependency.
- **React Performance Tracks** in the Chrome DevTools Performance panel.
- Server-side: Partial Pre-rendering / resume APIs, batched Suspense reveals, `cacheSignal` for RSC.

## React 19.3 (Sept 9, 2026)
- **`<ViewTransition>` is stable**: animates enter, exit, update and move using the browser View Transition API. Transitions trigger from `startTransition`, `useDeferredValue` or Suspense reveals. `addTransitionType` picks the animation based on the cause of the update.
- **Fragment refs are stable**: `<Fragment ref={r}>` gives a `FragmentInstance` (`addEventListener`, `focus`, `observeUsing`, `getClientRects`, `scrollIntoView`, …) without a wrapper div.
- **`browser()`** (react-dom): `use(browser())` suspends on the server so browser-only components render on the client.
- **Trusted Types** support; new DOM events `onFullscreenChange`/`onFullscreenError`; Context rendered directly in Server Components.

## React Compiler 1.0 (Oct 2025)
A build-time Babel plugin (`babel-plugin-react-compiler`) that auto-memoises components and hooks. It requires code that follows the Rules of React.
The ESLint plugin surfaces violations. Talking point: *"I'd still reach for manual memoisation in library code, and I'd know how to read what the compiler did."*

## 🎤 Interview questions
<details><summary>How do Actions change form handling?</summary>
Instead of `onSubmit` + preventDefault + useState for pending/error, you pass an async function to `action`. React tracks the pending state (useFormStatus/useActionState), resets the form, and integrates optimistic updates.
</details>
<details><summary>What problem does `useEffectEvent` solve?</summary>
Effects that need the latest value of something (a theme, analytics props) without re-running when it changes. Before, people suppressed the lint rule or used refs.
</details>

## Practise in Kanvas
`features/auth/LoginPage.jsx` (useActionState, useFormStatus) · `features/projects/NewProjectModal.jsx` (useOptimistic ☆) ·
`features/board/TaskDetailsDrawer.jsx` (`<ViewTransition>` ☆) · `context/ThemeContext.jsx` (`<Context>` provider)
