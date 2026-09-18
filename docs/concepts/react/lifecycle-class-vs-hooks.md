# Component lifecycle: class vs hooks

> **TL;DR:** mount → update (any number of times) → unmount. Classes use lifecycle **methods**. Function components use
> **effects** that synchronise with external systems. Error boundaries still require classes.

## Class lifecycle diagram
```
MOUNT:   constructor → static getDerivedStateFromProps → render → [DOM] → componentDidMount
UPDATE:  static getDerivedStateFromProps → shouldComponentUpdate → render
         → getSnapshotBeforeUpdate → [DOM] → componentDidUpdate(prevProps, prevState, snapshot)
UNMOUNT: componentWillUnmount
ERRORS:  static getDerivedStateFromError (render phase) → componentDidCatch (commit phase)
```
Removed/legacy: `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate` (the `UNSAFE_` prefixed versions still work but are discouraged).

## Hooks timeline
```
render (function body)        ← must be pure: no subscriptions, no DOM writes
  ↓
DOM mutated
  ↓
useLayoutEffect + ref callbacks   ← synchronous, BEFORE paint (measure layout, avoid flicker)
  ↓
browser paints
  ↓
useEffect                         ← after paint (subscriptions, fetching, logging)
... next render: cleanups of changed effects run first, then the new effects ...
unmount: every cleanup runs
```

## Mapping table
| Need | Class | Hooks |
|---|---|---|
| Initial state | constructor | `useState(init)` / `useState(() => expensive())` |
| Fetch on mount | `componentDidMount` | `useEffect(() => { … }, [])` (or better: a data library / loader) |
| React to a prop change | `componentDidUpdate` + comparison | `useEffect(…, [prop])` |
| Clean up | `componentWillUnmount` | return a cleanup from the effect |
| Skip renders | `shouldComponentUpdate` / `PureComponent` | `React.memo` (+ stable props) |
| Instance variables | `this.timer` | `useRef` |
| Force an update | `forceUpdate()` | a state counter (or rethink it) |
| Error boundary | `getDerivedStateFromError` + `componentDidCatch` | **no hook**, so use a class (or `react-error-boundary`) |

## "You might not need an effect"
- Derive values during render instead of syncing them into state.
- Handle user events in event handlers, not in effects.
- Reset state with a `key` instead of an effect.
- Fetch data with loaders, RTK Query or React Query rather than hand-rolled effects.

## StrictMode in development
It double-invokes component bodies, reducers and initialisers, and **mounts → unmounts → re-mounts** effects, to expose impure renders and missing cleanups.

## 🎤 Interview questions
<details><summary>useEffect vs useLayoutEffect?</summary>
Both run after the DOM mutation. useLayoutEffect runs synchronously before paint (for measuring or adjusting layout to avoid flicker). useEffect runs after paint (the default choice, since it doesn't block visual updates).
</details>
<details><summary>Why is the dependency array important?</summary>
It tells React when the effect's inputs changed. Missing deps cause stale closures. Extra or unstable deps (new objects every render) cause effects to re-run too often.
</details>

## Practise in Kanvas
`client/src/app/ErrorBoundary.jsx` · `features/settings/LegacyClock.jsx` · [lab 12 ☆](../../../labs/12-mini-react/README.md)
