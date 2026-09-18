/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/controllers/projects.controller.js · Phase 7 · Day 7 · ★ core (20 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 📝 STEPS
 *   1. list: Project.listForUser(req.user.id, req.valid.query.search). Add taskCount with ONE aggregation
 *      (Task.aggregate([{ $match: { projectId: { $in: ids } } }, { $group: { _id: '$projectId', count: { $sum: 1 } } }])),
 *      not N queries (the N+1 problem!) → { data: projects }
 *   2. create: Project.create({ ...body, ownerId: req.user.id, memberIds: [req.user.id] }) → 201.
 *      Record an Activity 'project.created' ☆.
 *   3. get: assertProjectMember → findById → 404 if it's missing → { data }
 *   4. update ☆ / remove ☆ (remove also deletes its tasks, activity and drawing; use a transaction if you have a replica set,
 *      and explain why a local standalone mongod can't run transactions)
 * ═══════════════════════════════════════════════════════════════════════════
 */
