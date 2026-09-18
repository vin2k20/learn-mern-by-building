# Memory leaks in frontend apps

> **TL;DR:** in a GC'd language, a leak is **something that stays reachable when it shouldn't**. SPAs are long-lived,
> so small leaks per navigation add up.

## Common sources
| Leak | Example | Fix |
|---|---|---|
| Event listeners not removed | `window.addEventListener('resize', h)` in a component | remove it in the cleanup, or use `{ signal }` with an AbortController |
| Timers | `setInterval` never cleared | `clearInterval` in the cleanup |
| Subscriptions | store/websocket subscriptions | unsubscribe in the cleanup |
| Detached DOM nodes | a closure or cache still references removed nodes | drop references; use a `WeakMap` for per-node metadata |
| Unbounded caches | a `Map` that only grows | an LRU cache (lab 07) or `WeakMap` |
| Global variables | `window.debug = hugeObject` | avoid them, or null them out |
| Closures capturing big data | a handler closes over a 50 MB array | narrow what's captured |
| Observers | an unobserved IntersectionObserver or ResizeObserver | `disconnect()` |
| Canvas | large offscreen canvases / ImageBitmaps kept around | release them (`bitmap.close()`) |
| Object URLs | `URL.createObjectURL` never revoked | `URL.revokeObjectURL` |

## Finding them (Chrome DevTools → Memory)
1. Take heap snapshot A.
2. Do the action 5–10× (open and close the whiteboard route).
3. Force GC (the 🗑 icon) and take snapshot B.
4. Compare the snapshots with the **Comparison** view. Look for growing counts of your components, `Detached HTMLDivElement`, listeners and closures.
5. The **Retainers** panel shows *why* an object is still alive.
Also: the **Performance monitor** (JS heap size, DOM nodes, listeners) and the **Detached elements** panel.

## React specifics
- Always return a cleanup from `useEffect` for subscriptions, listeners, timers, observers and in-flight requests (`AbortController`).
- StrictMode's double-invoked effects in development expose missing cleanups early. That's a feature, not a bug.
- Holding big objects in refs or context that outlive the view.

## 🎤 Interview questions
<details><summary>How do you detect a leak in production?</summary>
Watch memory in field telemetry (`performance.measureUserAgentSpecificMemory` where available), long-session crash reports and growing DOM node counts. Reproduce locally with heap-snapshot comparisons.
</details>

## Practise in Kanvas
[debugging lab, bug #3](../../debugging-lab.md) · `features/whiteboard/CanvasBoard.jsx` cleanup
