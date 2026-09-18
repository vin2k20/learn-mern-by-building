/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/dashboard/dashboardQueries.js · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   GraphQL on the client WITHOUT a library first (to show it's just HTTP), then expose it through RTK Query.
 *
 * 🧠 CONCEPTS  → docs/concepts/web/rest-vs-graphql.md, docs/api-contract.md §6
 *
 * 📝 STEPS
 *   1. export const DASHBOARD_QUERY = `query Dashboard($projectId: ID!) { dashboard(projectId: $projectId) { … } }`
 *      (copy the exact selection from the API contract)
 *   2. export function fetchDashboard(projectId, { signal }) → http.graphql(DASHBOARD_QUERY, { projectId }, { signal })
 *      (lib/httpClient throws when `errors` is present, even with HTTP 200)
 *   3. Add an RTK Query endpoint using queryFn (because the path and shape differ from REST):
 *        getDashboard: build.query({ queryFn: async (projectId) => { try { return { data: await fetchDashboard(projectId) } }
 *                                   catch (error) { return { error: { status: error.status, data: error.message } } } },
 *                                   providesTags: (r, e, id) => [{ type: 'Dashboard', id }] })
 *      Invalidate 'Dashboard' when tasks move ☆ (add the tag to moveTask's side effects via api.util.invalidateTags).
 *   4. Map the enum values to labels: { TODO: 'To do', IN_PROGRESS: 'In progress', REVIEW: 'Review', DONE: 'Done' }
 *   5. ☆ Swap in Apollo Client 4 (or urql) for this one query and compare: bundle size, caching, devtools.
 *
 * ✅ DONE WHEN  [ ] The dashboard makes exactly ONE POST /graphql per project visit (plus a cache hit on revisit)
 * 🎤 INTERVIEW ANGLE  "Do you need Apollo to use GraphQL?", "how do you handle GraphQL errors?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
