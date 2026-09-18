/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/perf/reportWebVitals.js · Phase 5 · Day 5 · ★ core (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Measure real-user Core Web Vitals and send them to the API (field data), plus log them in development.
 *
 * 🧠 CONCEPTS  → docs/concepts/web/web-vitals-lighthouse.md
 *
 * 📝 STEPS
 *   1. import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals'
 *   2. export function reportWebVitals() → register each metric with a `send` function:
 *      - development → console.table-style log with metric.name, value, rating, and the attribution ☆ (web-vitals/attribution build)
 *      - otherwise → navigator.sendBeacon('/api/metrics', JSON.stringify({ name, value, rating, id, path: location.pathname }))
 *        (fall back to fetch with keepalive: true if sendBeacon isn't available)
 *   3. Add custom timings: performance.mark('board:tasks-loaded') in BoardPage when the tasks arrive, then
 *      performance.measure('board:ttr', 'navigationStart'-equivalent, 'board:tasks-loaded'). View them in the Performance panel's Timings track.
 *   4. Why sendBeacon? (It survives page unload and doesn't block navigation.)
 *
 * ✅ DONE WHEN  [ ] The console shows LCP / CLS / INP (INP appears after an interaction) · the metrics POSTs show up in the Network tab in production mode
 * ═══════════════════════════════════════════════════════════════════════════
 */
