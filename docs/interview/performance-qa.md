# Performance & debugging interview Q&A

<details><summary>1. A page feels slow. Walk me through your approach.</summary>
Define "slow" (load vs interaction vs scrolling) → measure (field data from web-vitals/CrUX, lab data from Lighthouse and the Performance panel) → find the bottleneck (network waterfall, long tasks, re-renders, layout) → fix the biggest one → measure again → add a guard (budget/CI).
</details>
<details><summary>2. Explain LCP, INP and CLS, with a fix for each.</summary>
LCP: preload and prioritise the hero, a faster TTFB, less render-blocking. INP: shorter tasks, yielding, transitions, less JS. CLS: reserve space, set dimensions.
</details>
<details><summary>3. How do you reduce JavaScript bundle size?</summary>
Code splitting (routes, heavy widgets), tree-shaking, replacing heavy libraries, modern targets, removing polyfills you don't need, compression, and analysing the chunks.
</details>
<details><summary>4. How do you find which React components re-render too often?</summary>
The React DevTools Profiler (with "record why each component rendered") and "Highlight updates". Then fix with colocation, memo, stable props and granular selectors.
</details>
<details><summary>5. How does list virtualisation work?</summary>
Render only the visible slice plus some overscan inside a container sized to the full height, translated by the offset. Variable heights need measurement, a prefix-sum array and binary search.
</details>
<details><summary>6. How do you find a memory leak?</summary>
Heap snapshot comparisons around a repeated action, looking for detached DOM nodes and growing listener counts in the retainers view. Fix the cleanup.
</details>
<details><summary>7. What is a long task, and how do you break one up?</summary>
Main-thread work longer than 50 ms. Chunk it with yields (scheduler.yield, setTimeout, MessageChannel), move it to a Web Worker, or reduce the work (memoise, virtualise).
</details>
<details><summary>8. Debounce vs throttle: when do you use which?</summary>
Debounce when you only care about the final value (search, autosave, resize end). Throttle for steady sampling (scroll position, pointermove, drag).
</details>
<details><summary>9. Image optimisation?</summary>
Modern formats (AVIF/WebP), responsive srcset/sizes, lazy loading below the fold, dimensions, a CDN with resizing, and fetchpriority for the LCP image.
</details>
<details><summary>10. How do you use the Chrome Performance panel?</summary>
Record with CPU throttling, look at the Main track for long tasks, open the bottom-up/call-tree views, check the Layout and Paint events, use the Interactions track for INP, and check the React Performance Tracks.
</details>
<details><summary>11. How do you debug a production-only bug?</summary>
Reproduce it with the prod build (`vite preview`) and source maps, check the error monitoring (Sentry) breadcrumbs, compare environment and config, add logging or feature flags, and bisect the deploys.
</details>
<details><summary>12. How do you prevent performance regressions?</summary>
Lighthouse CI budgets, bundle-size checks (size-limit), perf tests for critical interactions, field monitoring with alerts, and performance checks in PR reviews.
</details>
<details><summary>13. What makes canvas drawing slow, and how do you speed it up?</summary>
Redrawing everything every frame, many state changes, getImageData in loops, and huge canvases. Use layered or offscreen canvases, dirty rectangles, batched paths, OffscreenCanvas in a worker, and a capped DPR.
</details>
<details><summary>14. Caching strategies in a SPA?</summary>
HTTP caching with hashed assets, a CDN, Service Worker strategies, and an in-memory API cache (RTK Query or an LRU) with invalidation.
</details>
<details><summary>15. How do you test performance with Mocha or Vitest?</summary>
Micro-benchmarks (`vitest bench`, or timing loops in Mocha with thresholds) for hot utilities, render-count assertions in component tests, and Lighthouse or Playwright traces for end-to-end metrics. Treat thresholds as guards, not exact numbers.
</details>
