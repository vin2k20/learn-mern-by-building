/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/test/tasks.test.js · Phase 7 · Day 7 · ★ core (25 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  API tests for the task rules that the client relies on (the optimistic move + rollback flow).
 *
 * 📝 TEST CASES
 *   | # | Scenario                                                        | Expect                                          |
 *   |---|-----------------------------------------------------------------|-------------------------------------------------|
 *   | 1 | GET /api/projects/:id/tasks as a member                         | 200, sorted by status then order                 |
 *   | 2 | the same as a NON-member                                        | 403 (or 404, whichever you chose; be consistent) |
 *   | 3 | POST a task with no status                                      | 201, status 'todo', order = the column max + 1000 |
 *   | 4 | POST a task with an empty title                                 | 400 VALIDATION_ERROR                             |
 *   | 5 | PATCH /move to 'review' with order 1500                         | 200, status and order updated, an Activity row exists |
 *   | 6 | PATCH /move to 'done' while a dependency is open                | 422 BLOCKED_BY_DEPENDENCY, the task is unchanged in the DB |
 *   | 7 | PATCH /move to 'done' once the dependencies are done            | 200, completedAt is set                          |
 *   | 8 | PATCH dependsOn creating a cycle (A→B, then B→A)                | 400                                              |
 *   | 9 | DELETE a task                                                   | 204, and it's removed from the other tasks' dependsOn |
 *   | 10 | PATCH /move with a malformed id                                | 404 (a CastError mapped by the error handler)    |
 *
 * 💡 Use the factories from setup.js to build the state; assert on the HTTP response AND the DB state (Task.findById) for #5/#6.
 * ✅ DONE WHEN  [ ] At least cases 1, 3, 5, 6 and 8 pass (★)
 * ═══════════════════════════════════════════════════════════════════════════
 */
