# Closures

> **TL;DR:** a closure is a function together with the **variables of the scope it was created in**. Those variables stay alive
> as long as the function is reachable, even after the outer function has returned.

## Mental model
```
function makeCounter() {        ┌───────────── scope object ──────────────┐
  let count = 0;          ───►  │ count: 0                                │
  return () => ++count;         └─────────────────────────────────────────┘
}                                          ▲ [[Environment]] reference
const inc = makeCounter();  inc ───────────┘
inc(); inc();  // 2: the same scope object each time
```

## Uses
- **Private state:** module pattern, factories, `once`, `memoize`, rate limiters
- **Partial application / currying**
- **Callbacks that remember context:** event handlers, `setTimeout`, promise chains
- **React:** every hook callback closes over the props and state *of the render it was created in*

## Stale closures in React
```jsx
function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000); // ❌ `count` is always 0
    return () => clearInterval(id);
  }, []);
}
```
Fixes: a functional update `setCount(c => c + 1)`; list `count` in the deps (the interval restarts); keep the latest value in a `ref`;
or `useEffectEvent` (React 19.2+) for event-like logic inside effects.

## Pitfalls
- **Memory:** a closure keeps its *whole* scope alive. A small handler can retain a large array. Remove listeners and clear timers.
- The `var` loop bug (see [scope](scope-hoisting-tdz.md)).
- Creating closures in hot render paths is usually fine. Only memoise when identity matters (memoised children, effect deps).

## 🎤 Interview questions
<details><summary>Give a real-world closure use case.</summary>
`debounce` keeps `timer` and `lastArgs` in a closure. Each debounced function has its own private timer.
</details>
<details><summary>How do closures relate to memory leaks?</summary>
Anything reachable from a live closure can't be garbage-collected. A forgotten event listener that closes over a detached DOM subtree keeps the whole subtree alive.
</details>

## Practise in Kanvas
[lab 01](../../../labs/01-scope-closures/README.md) · [lab 06](../../../labs/06-functional/README.md) · `client/src/hooks/*`
