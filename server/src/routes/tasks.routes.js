/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/routes/tasks.routes.js · Phase 7 · Day 7 · ★ core (5 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 📝 STEPS
 *   GET    /:taskId            → tasks.get
 *   PATCH  /:taskId            → tasks.update   (body: a partial schema; dependsOn: z.array(objectId).optional())
 *   PATCH  /:taskId/move       → tasks.move     (body: { status: taskStatus, order: z.number().finite() })
 *   DELETE /:taskId            → tasks.remove   (204)
 *   GET    /:taskId/comments   → comments.list ☆
 *   POST   /:taskId/comments   → comments.create ☆ (body: { body: z.string().trim().min(1).max(2000) })
 *   Express 5 path note: parameters work the same as in v4, but wildcards must be named (`/*splat`).
 * ═══════════════════════════════════════════════════════════════════════════
 */
