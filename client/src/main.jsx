/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/main.jsx · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Bootstrap the app: start the mock API (in mock mode), then mount React with every
 *   provider in the right order.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/lifecycle-class-vs-hooks.md (StrictMode),
 *               docs/concepts/tooling/testing-mocha-vitest-rtl.md (MSW), docs/concepts/web/web-vitals-lighthouse.md
 *
 * 🧩 DEPENDS ON  styles/index.css · app/store.js · app/router.jsx · context/ThemeContext.jsx ·
 *               components/Toast/ToastProvider.jsx · mocks/browser.js · perf/reportWebVitals.js
 *
 * 📝 STEPS
 *   0. FIRST VERSION (during SETUP): createRoot(document.getElementById('root')).render(<h1>Kanvas</h1>)
 *   1. import '@/styles/index.css'
 *   2. async function enableMocking():
 *        if (import.meta.env.VITE_USE_MOCKS !== 'true') return;
 *        const { worker } = await import('@/mocks/browser.js');   ← a dynamic import keeps MSW out of the real bundle path
 *        await worker.start({ onUnhandledRequest: 'bypass' });
 *   3. enableMocking().then(() => { createRoot(...).render(tree) })
 *      The tree, from the outside in:
 *        <StrictMode>
 *          <Provider store={store}>          (react-redux, from Day 4; skip it until store.js exists)
 *            <ThemeProvider>
 *              <ToastProvider>
 *                <RouterProvider router={router} />   (import RouterProvider from 'react-router/dom')
 *   4. Call reportWebVitals() after the render (Phase 5).
 *   5. ☆ Pass createRoot options: { onUncaughtError, onCaughtError } that log to the console for now
 *      (Sentry would go here in production).
 *
 * ✅ DONE WHEN
 *   [ ] With VITE_USE_MOCKS=true the console shows "[MSW] Mocking enabled." before the app fetches anything
 *   [ ] With VITE_USE_MOCKS=false the MSW code isn't downloaded (check the Network tab)
 *   [ ] You can explain why the providers are in this order (the router needs the store and theme, not the other way round)
 *
 * ⚠️ GOTCHAS
 *   - Rendering before the worker has started → the first requests escape to the network (and 404).
 *   - StrictMode double-invokes effects in dev. Don't "fix" that by removing StrictMode.
 *
 * 🎤 INTERVIEW ANGLE  "What does StrictMode do?", "how do you mock APIs in development?"
 * 🤖 ASK THE AGENT    /explain StrictMode double render · /hint client/src/main.jsx step 2
 * ═══════════════════════════════════════════════════════════════════════════
 */
