/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/test/setup.js · Phase 6 · Day 5 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  The global Vitest setup: jest-dom matchers, the MSW server lifecycle, DOM cleanup, and polyfills jsdom lacks.
 *
 * 🧠 CONCEPTS  → docs/concepts/tooling/testing-mocha-vitest-rtl.md
 *
 * 📝 STEPS
 *   1. import '@testing-library/jest-dom/vitest'
 *   2. import { cleanup } from '@testing-library/react'; import { server } from '@/mocks/server.js'; import { resetDb } from '@/mocks/handlers.js'
 *   3. beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))   ← unexpected requests fail the test loudly
 *      afterEach(() => { server.resetHandlers(); resetDb(); cleanup(); localStorage.clear(); })
 *      afterAll(() => server.close())
 *   4. Polyfills/stubs for APIs jsdom doesn't implement:
 *      - window.matchMedia (return { matches: false, addEventListener() {}, removeEventListener() {} })
 *      - ResizeObserver and IntersectionObserver (minimal classes whose observe/unobserve/disconnect do nothing)
 *      - HTMLCanvasElement.prototype.getContext → a stub (or install the `vitest-canvas-mock` package ☆)
 *      - HTMLDialogElement.prototype.showModal / close, if your jsdom version lacks them (set/remove the `open` attribute)
 *      - Element.prototype.scrollIntoView = () => {}
 *   5. Set import.meta.env-dependent behaviour: MODE is 'test', so the MSW latency is 0 (see handlers.js).
 *
 * ✅ DONE WHEN  [ ] `npm run test:run` works with zero or more tests, and a stray fetch fails with a clear MSW error
 * ═══════════════════════════════════════════════════════════════════════════
 */
