/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/controllers/tasks.controller.js · Phase 7 · Day 7 · ★ core (35 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Task CRUD + MOVE with the business rules: membership, dependency cycles, blocked moves, and activity records.
 *
 * 🧠 CONCEPTS  → docs/api-contract.md §3–4 · labs/07 Graph (wouldCreateCycle) · docs/concepts/node/mongoose-modeling.md
 *
 * 📝 STEPS
 *   1. listForProject: assertProjectMember → Task.find({ projectId }).sort({ status: 1, order: 1 }).lean() → map _id → id
 *   2. create: assertProjectMember → order = await Task.nextOrder(projectId, status) → Task.create(…) → Activity 'task.created' → 201
 *   3. get: load the task → assertProjectMember(task.projectId) → { data }
 *   4. update: load → member check → if body.dependsOn is present:
 *        build a Graph (copy lab 07 into server/src/utils/graph.js) from all the tasks' dependsOn in this project, with the edge dep → task,
 *        and reject if any new dep would create a cycle → badRequest('Dependency cycle', …)
 *      → apply the allowed fields → save → Activity 'task.updated' → { data }
 *   5. move (the important one):
 *        const { status, order } = req.valid.body
 *        if (status === 'done') { const open = await Task.countDocuments({ _id: { $in: task.dependsOn }, status: { $ne: 'done' } });
 *                                 if (open) throw blocked('Finish the dependencies first') }   → 422
 *        task.status = status; task.order = order; completedAt handling; await task.save()
 *        Activity 'task.moved' with a message like `${actor.name} moved “${task.title}” to ${label}`
 *        → { data: task }
 *   6. remove: member check → deleteOne → also $pull this id from the other tasks' dependsOn → 204 (res.status(204).end())
 *   7. ☆ Optimistic concurrency: accept an `If-Match: <updatedAt>` header on move/update and reply 409 if the task changed meanwhile
 *      (the collaboration talking point from the system-design doc).
 *
 * 🧪 Covered by test/tasks.test.js
 * ✅ DONE WHEN  [ ] The client board works end to end against these endpoints, including the 422 rollback toast
 * 🎤 INTERVIEW ANGLE  "Where do business rules live?", "how do you handle concurrent edits?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
