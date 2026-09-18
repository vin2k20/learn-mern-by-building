/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/routes/projects.routes.js · Phase 7 · Day 7 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  The project routes (see the contract §3), including the nested task, activity and drawing routes.
 *
 * 📝 STEPS
 *   GET    /                          → projects.list      (query: search?)
 *   POST   /                          → projects.create    (body: createProjectBody)
 *   GET    /:projectId                → projects.get       (params: { projectId: objectId })
 *   PATCH  /:projectId                → projects.update ☆
 *   DELETE /:projectId                → projects.remove ☆
 *   GET    /:projectId/tasks          → tasks.listForProject
 *   POST   /:projectId/tasks          → tasks.create       (body: createTaskBody)
 *   GET    /:projectId/activity       → activity.list ☆    (query: { cursor?, limit: z.coerce.number().int().min(1).max(100).default(50) })
 *   GET    /:projectId/drawing        → drawings.get ☆
 *   PUT    /:projectId/drawing        → drawings.save ☆    (body: { shapes: z.array(shapeSchema).max(5000) })
 *   ☆ router.param('projectId', …) to run the membership check once for every route with that parameter.
 *
 * Also create a tiny users router in this folder (or inline in app.js): GET /api/users → the users who share a project with req.user.
 * ═══════════════════════════════════════════════════════════════════════════
 */
