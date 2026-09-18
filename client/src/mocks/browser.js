/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/mocks/browser.js · Phase 4 · Day 4 · ★ core (5 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Create the MSW Service Worker instance for the browser.
 *
 * 📝 STEPS
 *   import { setupWorker } from 'msw/browser'
 *   import { handlers } from './handlers.js'
 *   export const worker = setupWorker(...handlers)
 *   (main.jsx starts it only when VITE_USE_MOCKS === 'true', and imports this file dynamically.)
 *   ☆ Expose `window.__msw = worker` in dev so you can call worker.use(...) from the console to simulate failures.
 *
 * ✅ DONE WHEN  [ ] DevTools → Application → Service Workers shows mockServiceWorker.js active
 * 🎤 INTERVIEW ANGLE  "How does MSW intercept fetch in the browser?" (a Service Worker + a messaging channel)
 * ═══════════════════════════════════════════════════════════════════════════
 */
