/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/graphql/resolvers.js · Phase 7 · Day 7 · ★ core (35 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Resolvers for the dashboard: aggregation pipelines, enum mapping, per-field resolvers, auth, and ☆ DataLoader.
 *
 * 🧠 CONCEPTS  → docs/concepts/node/graphql-server.md, docs/concepts/node/mongoose-modeling.md (aggregation)
 *
 * 📝 STEPS
 *   1. The enum map: TaskStatus: { TODO: 'todo', IN_PROGRESS: 'in_progress', REVIEW: 'review', DONE: 'done' }
 *      (so the resolvers work with the DB values and GraphQL exposes the UPPER_CASE names)
 *   2. Query.me: (_, __, ctx) → User.findById(ctx.user.id)
 *   3. Query.project: member check → Project.findById
 *   4. Query.dashboard: (_, { projectId }, ctx) → member check → return { projectId }   (the child resolvers do the work lazily,
 *      so a query that doesn't ask for burndown never computes it: the per-field laziness of GraphQL)
 *   5. Dashboard.project → Project.findById(parent.projectId)
 *      Dashboard.totals → ONE aggregation using $facet or $group:
 *        tasks (count), done (status 'done'), overdue (dueDate < now && status != 'done'), points (sum estimate), pointsDone
 *      Dashboard.tasksByStatus → $group by status → ensure all 4 statuses are present (fill in zeros)
 *      Dashboard.tasksByAssignee → $group by assigneeId → user: via ctx.loaders.userById.load(id) (null for unassigned)
 *      Dashboard.burndown(parent, { days }) → for each of the last `days` days: the sum of the estimates of the tasks with
 *        createdAt <= endOfDay AND (completedAt == null OR completedAt > endOfDay) (do it in JS from one query, or in a pipeline ☆)
 *   6. Project.members → loaders.userById.loadMany(memberIds) · Project.tasks(parent, { status }) → Task.find(…)
 *      Task.assignee → loaders.userById.load(…) (without DataLoader, note the N+1 in the Mongo logs, then fix it ☆)
 *   7. Errors: throw new GraphQLError('Forbidden', { extensions: { code: 'FORBIDDEN' } })
 *
 * 🧪 ☆ test/graphql.test.js
 * ✅ DONE WHEN  [ ] The client dashboard renders from the real server · the Mongo logs show a handful of queries, not dozens
 * 🎤 INTERVIEW ANGLE  "How do you avoid N+1 in GraphQL?", "why resolve per field?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
