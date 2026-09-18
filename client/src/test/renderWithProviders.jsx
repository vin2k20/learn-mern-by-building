/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/test/renderWithProviders.jsx · Phase 6 · Day 5 · ★ core (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A test helper that renders UI with a REAL store (preloadable), the theme and toast providers, and a memory router,
 *   and returns the store and a user-event instance.
 *
 * 🧠 CONCEPTS  → docs/concepts/tooling/testing-mocha-vitest-rtl.md ("test like a user"; real store, mocked network)
 *
 * 📝 STEPS
 *   1. export function renderWithProviders(ui, { preloadedState, route = '/', path = '/', store = setupStore(preloadedState) } = {})
 *   2. Build a router with createMemoryRouter([{ path, element: ui }], { initialEntries: [route] })
 *      (for pages that need params, pass path="/projects/:projectId/board" and route="/projects/p_001/board")
 *   3. render(<Provider store={store}><ThemeProvider><ToastProvider><RouterProvider router={router} /></ToastProvider></ThemeProvider></Provider>)
 *   4. return { store, router, user: userEvent.setup(), ...renderResult }
 *   5. Also export a small fixture builder: makeTask(overrides) and makeBoardState(tasks) (uses the entity adapter's shape).
 *
 * ✅ DONE WHEN  [ ] TaskCard.test.jsx and CommandPalette.test.jsx use this helper instead of repeating the provider setup
 * 🎤 INTERVIEW ANGLE  "Do you mock Redux in component tests?" (No: use a real store with preloaded state.)
 * ═══════════════════════════════════════════════════════════════════════════
 */
