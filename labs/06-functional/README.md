# Lab 06 · Functional utilities ★

**Time box:** 90 min · **Run:** `npm run test:06` · **Primers:** [closures](../../docs/concepts/js/closures.md), [performance](../../docs/concepts/react/performance-memo-splitting.md)

## Why this matters
"Implement debounce" is probably *the* most-asked frontend machine-coding question. `deepClone`, `deepEqual` and
`get`/`setIn` show up in interviews and inside every state-management library.

## Concepts
- **Debounce** (wait for quiet) vs **throttle** (at most once per window), with leading and trailing edges
- Currying & partial application, function composition (`compose` = right-to-left, `pipe` = left-to-right)
- Deep vs shallow copies, circular references, `structuredClone` and what it can't copy
- Equality: `===` vs `Object.is` vs SameValueZero vs structural equality
- Immutable updates by path with structural sharing (how Immer/RTK feel from the outside)

## Where you'll use them
| Utility | In Kanvas |
|---|---|
| `debounce` | search inputs, whiteboard autosave (`hooks/useDebounce.js`) |
| `throttle` | pointermove on the canvas, scroll handlers |
| `pipe` / `compose` | selector pipelines, Redux `compose` (lab 13) |
| `deepEqual` | tests, `useDeepCompareEffect` discussions |
| `get` / `setIn` | form state, nested settings |

## Timeline to reason about (wait = 100)
```
calls:      x   x   x                     x
time:       0   50  100                   400
debounce:                   ●(t=200)                     ●(t=500)       trailing
debounce(leading):  ●(t=0)                ●(t=400)                      leading only
throttle:   ●(t=0)      ●(t=100)          ●(t=400)                      leading + trailing
```

## 🎤 Interview questions
1. Debounce vs throttle: pick one for (a) search-as-you-type, (b) scroll position, (c) window resize, (d) a "save" button.
2. Why do you need `cancel()`? (Unmounting a React component with a pending call.)
3. How would you write `useDebouncedCallback` so the debounced function stays stable across renders?
4. What does `structuredClone` fail on? (Functions, DOM nodes, class prototypes are lost.)
5. Implement `curry`. How does it know when to call the original? (`fn.length`)

## Stretch ☆
- Add `maxWait` to `debounce` (lodash-style).
- `throttle` with `{ leading, trailing }` options.
