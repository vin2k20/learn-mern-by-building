/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/mocks/server.js · Phase 6 · Day 5 · ★ core (5 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  The same handlers for Node (Vitest), so the component tests hit a realistic API.
 *
 * 📝 STEPS
 *   import { setupServer } from 'msw/node'
 *   import { handlers } from './handlers.js'
 *   export const server = setupServer(...handlers)
 *   (test/setup.js starts, resets and stops it.)
 *
 * 💡 In the tests: server.use(http.patch('/api/tasks/:id/move', () => HttpResponse.json({ error: {…} }, { status: 500 })))
 *    to force a failure for ONE test.
 * ═══════════════════════════════════════════════════════════════════════════
 */
