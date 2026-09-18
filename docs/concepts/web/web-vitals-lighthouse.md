# Core Web Vitals, Lighthouse & performance testing

> **TL;DR:** Google's Core Web Vitals are **LCP** (loading), **INP** (responsiveness) and **CLS** (visual stability). Measure them in the **field**
> (the `web-vitals` library, CrUX) and in the **lab** (Lighthouse, the DevTools Performance panel).

| Metric | Good | Needs improvement | Poor | Typical fixes |
|---|---|---|---|---|
| **LCP**: Largest Contentful Paint | ≤ 2.5 s | ≤ 4 s | > 4 s | a faster TTFB, preload/`fetchpriority` on the hero image, less render-blocking CSS/JS, SSR |
| **INP**: Interaction to Next Paint (replaced FID in 2024) | ≤ 200 ms | ≤ 500 ms | > 500 ms | break up long tasks, yield, `startTransition`, less JS, virtualisation |
| **CLS**: Cumulative Layout Shift | ≤ 0.1 | ≤ 0.25 | > 0.25 | size media, reserve space, font metrics, don't inject content above existing content |
| FCP (diagnostic) | ≤ 1.8 s | | | |
| TTFB (diagnostic) | ≤ 0.8 s | | | CDN, caching, a faster backend |
| TBT (lab proxy for INP) | ≤ 200 ms | | | |

Scores are judged at the **75th percentile** of page loads.

## Measuring in code
```js
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';
function send(metric) {
  navigator.sendBeacon('/api/metrics', JSON.stringify({ name: metric.name, value: metric.value, rating: metric.rating, id: metric.id, path: location.pathname }));
}
[onLCP, onINP, onCLS, onFCP, onTTFB].forEach((fn) => fn(send));
```
Custom timings: `performance.mark('board:start')` → `performance.measure('board', 'board:start')`, plus `PerformanceObserver`.

## Lighthouse
- Run it on a **production build** (`vite build && vite preview`), in an incognito window, with extensions disabled.
- Categories: Performance, Accessibility, Best Practices, SEO.
- **Lighthouse CI** (`@lhci/cli`) in the pipeline with **budgets** (e.g. performance ≥ 0.9, total JS ≤ 200 KB) fails the build on regressions.

## Performance testing beyond Lighthouse
- Benchmarking utilities with Mocha (the labs) or `vitest bench`
- Load testing the API: k6, autocannon (Node)
- React Profiler (render timings), CPU/network throttling
- Bundle-size checks in CI (size-limit)

## 🎤 Interview questions
<details><summary>LCP is 4 s. How do you debug it?</summary>
Find the LCP element (the Performance panel or Lighthouse), then break the time down: TTFB, resource load delay, resource load time, render delay. Fix the biggest part: preload or prioritise the image, compress it, serve it from a CDN, remove render-blocking resources, or render on the server.
</details>

## Practise in Kanvas
`client/src/perf/reportWebVitals.js` · Phase 5 before/after log · `.github/workflows/ci.yml` (Lighthouse CI ☆)
