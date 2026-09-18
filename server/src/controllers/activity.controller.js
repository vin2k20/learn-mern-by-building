/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/controllers/activity.controller.js · Phase 7 · ☆ stretch (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 📝 STEPS
 *   list: assertProjectMember → const { cursor, limit } = req.valid.query →
 *         docs = await Activity.find({ projectId, ...cursorFilter(cursor) }).sort({ createdAt: -1, _id: -1 }).limit(limit + 1).lean()
 *         → { data: docs.slice(0, limit), nextCursor: docs.length > limit ? encodeCursor(docs[limit - 1]) : null }
 *   Check it with 10k seeded rows: the response time should stay flat on page 1 and page 90 (offset pagination would get slower). Measure it!
 * ═══════════════════════════════════════════════════════════════════════════
 */
