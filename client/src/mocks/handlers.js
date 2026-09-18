/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/mocks/handlers.js · Phase 4 · Day 4 · ★ core (plus the GraphQL part on Day 5)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A realistic in-memory mock API that follows docs/api-contract.md EXACTLY, with latency, auth checks, validation errors,
 *   random failures, cursor pagination over 10k generated events, and one GraphQL query.
 *   Writing the mock first = contract-first development (the Express server on Day 7 must behave the same way).
 *
 * 🧠 CONCEPTS  → docs/api-contract.md · docs/concepts/web/rest-vs-graphql.md · docs/concepts/tooling/testing-mocha-vitest-rtl.md (MSW) ·
 *               labs/01 (createIdGenerator) · labs/04 (paginate, groupBy) · labs/07 (Graph for dependency checks)
 *
 * 📝 STEPS
 *   1. Imports: import { http, graphql, HttpResponse, delay } from 'msw'; import seed from './data/seed.json'
 *      (Vite and Vitest can import JSON directly.)
 *   2. The in-memory DB: const db = structuredClone(seed) (so tests don't mutate the import). Add a resetDb() export for tests.
 *   3. Helpers:
 *      - const API = '/api'  (relative URLs work in the browser. In Node/Vitest, MSW matches relative paths against location.origin,
 *        which jsdom provides.)
 *      - json(data, init) → HttpResponse.json({ data }, init)
 *      - fail(status, code, message, details) → HttpResponse.json({ error: { code, message, details } }, { status })
 *      - latency: `await delay(import.meta.env.MODE === 'test' ? 0 : random(300, 800))`
 *      - auth(request) → read the Bearer token. The mock token is simply `mock-token.${userId}`. Returns the user or null.
 *        A helper `withAuth(resolver)` returns a 401 when there's no valid user.
 *      - ids: createIdGenerator('p', 3) etc., starting after the seed's highest ids
 *   4. REST handlers (see the contract §3 for the exact shapes and status codes):
 *      - POST /api/auth/login → the demo password is 'kanvas123' for any seeded email → { token, user } · otherwise a 401
 *      - GET /api/auth/me · GET /api/users
 *      - GET /api/projects?search= (add taskCount) · POST /api/projects (validate 2–60 chars → 400; a duplicate name → 409)
 *      - GET /api/projects/:projectId (404 if it's missing)
 *      - GET /api/projects/:projectId/tasks · POST (placed at the end of its column: order = the column's max + 1000)
 *      - PATCH /api/tasks/:taskId (a dependsOn cycle → 400, using Graph.wouldCreateCycle) · DELETE → 204
 *      - PATCH /api/tasks/:taskId/move:
 *          • a 10% random 500 unless the request has the header 'x-mock-no-fail' or MODE === 'test'
 *          • moving to 'done' with unfinished dependencies → 422 BLOCKED_BY_DEPENDENCY
 *          • otherwise update status, order, updatedAt and completedAt, and write an Activity row
 *      - GET /api/projects/:projectId/activity?cursor=&limit= → cursor pagination (base64 of `${createdAt}|${id}`; use btoa/atob)
 *        over a lazily GENERATED list of 10,000 events for p_001 (deterministic: use a seeded PRNG such as mulberry32 so reloads look the same)
 *      - GET/PUT /api/projects/:projectId/drawing
 *      - GET/POST /api/tasks/:taskId/comments ☆ · POST /api/metrics → 204
 *   5. GraphQL (Day 5):
 *        graphql.query('Dashboard', async ({ variables }) => HttpResponse.json({ data: { dashboard: buildDashboard(variables.projectId) } }))
 *      buildDashboard: totals, tasksByStatus (map 'in_progress' → 'IN_PROGRESS'), tasksByAssignee, burndown(14 days)
 *      (remaining = the sum of the estimates of the tasks not completed by the end of each day).
 *      ☆ Return { errors: [{ message: 'Forbidden', extensions: { code: 'FORBIDDEN' } }] } for projects the user isn't a member of.
 *   6. export const handlers = [ …all of the above… ]
 *   7. A catch-all for unknown /api/* routes → a 404 with the error envelope (it catches typos quickly).
 *
 * ✅ DONE WHEN
 *   [ ] Every endpoint in the contract has a handler, and the response shapes match exactly
 *   [ ] The Network tab shows the requests (with "(from ServiceWorker)") and realistic delays
 *   [ ] 10k activity events page correctly, and the last page has nextCursor: null
 *   [ ] The component tests can override any handler with server.use()
 *
 * ⚠️ GOTCHAS
 *   - Return NEW objects (structuredClone) from handlers so UI code can't mutate the mock DB by reference.
 *   - Relative URL matching in Node requires a base URL (jsdom provides one; configure it if you see "Invalid URL").
 *
 * 🎤 INTERVIEW ANGLE  "How do you develop the frontend before the backend is ready?", "contract-first APIs?"
 * 🤖 ASK THE AGENT    /hint client/src/mocks/handlers.js step 4 · /review client/src/mocks/handlers.js
 * ═══════════════════════════════════════════════════════════════════════════
 */
