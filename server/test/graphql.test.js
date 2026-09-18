/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/test/graphql.test.js · Phase 7 · ☆ stretch (20 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Test the dashboard query over HTTP, the same way the client calls it.
 *
 * 📝 TEST CASES
 *   1. POST /graphql without a token → 401 (the Express middleware runs before yoga)
 *   2. With a token, for a project with 3 tasks (1 done, 2 estimate points each) →
 *      data.dashboard.totals deep-equals { tasks: 3, done: 1, overdue: 0, points: 6, pointsDone: 2 }
 *   3. tasksByStatus contains all 4 statuses (the zeros filled in) using the UPPER_CASE enum names
 *   4. burndown(days: 7) returns 7 points in ascending date order, and the last `remaining` equals points - pointsDone
 *   5. A non-member → HTTP 200 with errors[0].extensions.code === 'FORBIDDEN' and data null (explain why it's still HTTP 200)
 *
 * 💡 request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send({ query: DASHBOARD_QUERY, variables: { projectId } })
 *    ☆ Import DASHBOARD_QUERY from the CLIENT file so the test catches contract drift between the client and the server.
 * ═══════════════════════════════════════════════════════════════════════════
 */
