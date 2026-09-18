# React performance: memoisation, splitting, virtualisation

> **TL;DR:** measure first (Profiler). Then **render less** (state colocation, memo, stable props), **render less often**
> (transitions, debouncing), **render fewer things** (virtualisation), and **ship less JS** (code splitting).

## Why components re-render
1. Their state changed
2. Their parent re-rendered (the default, even if props are equal!)
3. A context they consume changed
4. A store selector they use returned a new value

## Tools (in order of preference)
| Technique | What it does | Watch out |
|---|---|---|
| **Colocate state** | move state down to where it's used | the cheapest fix |
| **Lift content up / pass `children`** | children elements created by the parent don't re-render when the wrapper's state changes | |
| `React.memo(Component)` | skips the re-render if props are shallow-equal | useless if props are new objects or functions every render |
| `useCallback` / `useMemo` | stable identities, cached computations | a cost of its own, so use it where identity matters or work is expensive |
| **React Compiler 1.0** | auto-memoises components and hooks at build time | still learn the manual APIs; write code that follows the Rules of React |
| `startTransition` / `useDeferredValue` | keeps urgent updates (typing) responsive | the work still happens, just with lower priority |
| **Debounce / throttle** | fewer updates from noisy events | |
| **Virtualisation** | only render the visible rows | fixed vs variable heights, a11y (`aria-rowcount`), scroll restoration |
| **Code splitting** | `lazy(() => import())` + `<Suspense>`, route-level chunks | avoid waterfalls; preload on hover/intent |
| **Selector granularity** | `useSelector(s => s.board.tasks.entities[id])` | selectors returning new arrays → use `createSelector` or `shallowEqual` |
| **Keys** | stable keys avoid remounting | never `Math.random()` |
| **Avoid layout thrashing** | batch reads/writes; CSS transforms | |
| **Images** | `loading="lazy"`, `srcset`, `fetchpriority="high"` for the LCP image, `width`/`height` | |
| **Web Workers / OffscreenCanvas** | move CPU-heavy work off the main thread | |

## Measuring
- **React DevTools Profiler:** flame graph, "why did this render?", commit durations
- **Chrome Performance panel:** long tasks (> 50 ms), scripting vs rendering, the React performance tracks (React 19.2+)
- **Lighthouse / Web Vitals:** LCP, INP, CLS (see [web vitals](../web/web-vitals-lighthouse.md))
- **Bundle analysis:** `vite build` output sizes, `npx vite-bundle-visualizer` ☆, the Coverage tab

## Virtualisation math (fixed row height)
```
start = floor(scrollTop / rowH) - overscan        end = ceil((scrollTop + viewportH) / rowH) + overscan
<div style="height: total * rowH; position: relative">
  <div style="transform: translateY(start * rowH)"> rows[start..end] </div>
</div>
```

## 🎤 Interview questions
<details><summary>A list of 10k items is slow. What do you do?</summary>
Profile it, then virtualise the list, memoise the row component with stable props, move the filtering to a memoised selector or <code>useDeferredValue</code>, and paginate on the server if needed.
</details>
<details><summary>When is useMemo harmful?</summary>
When the computation is cheap: you pay for the comparison and the memory, and the code gets harder to read. And when the deps change every render, it never hits the cache.
</details>

## Practise in Kanvas
`components/VirtualList` · `features/activity/ActivityFeed.jsx` · `features/board/*` · [debugging lab](../../debugging-lab.md)
