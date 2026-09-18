# Hooks deep dive

> **TL;DR:** hooks are stored **per component instance in call order**. That's why they must be called unconditionally, at the top level.

## How React stores hooks (simplified)
```
fiber.memoizedState → hook0 { state, queue } → hook1 { effect, deps } → hook2 { ref } → …
render #1: useState, useEffect, useRef     (creates the list)
render #2: useState, useEffect, useRef     (walks the same list in the same order)
if (cond) useState()  ❌  → the order shifts and the hooks read the wrong slots
```

## Core hooks cheat sheet
| Hook | Use for | Notes |
|---|---|---|
| `useState` | local state | setters are stable; use functional updates for derived-from-previous values; updates are batched |
| `useReducer` | complex state transitions | the reducer must be pure; dispatch is stable |
| `useEffect` | syncing with external systems | cleanup; deps; runs after paint |
| `useLayoutEffect` | measuring the DOM before paint | blocks paint, so use sparingly |
| `useRef` | mutable values without re-rendering; DOM refs | `.current` changes don't re-render |
| `useMemo` | caching expensive derived values | a performance hint, not a guarantee |
| `useCallback` | a stable function identity | only useful if someone compares identity (memo children, deps) |
| `useContext` / `use(Context)` | reading context | `use` can be called conditionally (React 19) |
| `useId` | stable ids for a11y attributes | SSR-safe |
| `useTransition` / `startTransition` | mark non-urgent updates | keeps input responsive; `isPending` |
| `useDeferredValue` | a lagging copy of a value | expensive lists that filter while typing |
| `useSyncExternalStore` | subscribing to external stores | what react-redux uses; tear-free |
| `useImperativeHandle` | exposing a custom ref API | with `ref` as a prop (React 19) |
| `useActionState` | form action state (pending, result) | React 19 |
| `useFormStatus` | pending state of the parent `<form>` | from `react-dom` |
| `useOptimistic` | optimistic UI during an action | reverts automatically |
| `useEffectEvent` | read the latest props and state inside an effect without re-subscribing | React 19.2 |
| `use(promise)` | unwrap a promise inside Suspense | promises should be cached and created outside render |

## Custom hooks
Functions whose names start with `use`, which call other hooks. They share **logic**, not state (each call gets its own state).
```js
function useMediaQuery(query) {
  const subscribe = useCallback((cb) => {
    const mql = matchMedia(query);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
  }, [query]);
  return useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false);
}
```

## Lint rules
Use `eslint-plugin-react-hooks` (`rules-of-hooks`, `exhaustive-deps`, plus the React Compiler–powered rules in recent versions). Treat warnings as bugs.

## 🎤 Interview questions
<details><summary>Why does setState seem "async"?</summary>
Updates are queued and batched. The new value appears on the next render. The variable in the current closure never changes.
</details>
<details><summary>When would you use useReducer over useState?</summary>
When the next state depends on the previous one in complex ways, when several values change together, or when you want to test the transitions as a pure function.
</details>

## Practise in Kanvas
`client/src/hooks/*` · [lab 12](../../../labs/12-mini-react/README.md)
