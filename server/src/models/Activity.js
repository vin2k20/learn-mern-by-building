/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/models/Activity.js · Phase 7 · ☆ stretch (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  An append-only activity log with an index that supports cursor pagination.
 *
 * 📝 STEPS
 *   1. projectId (index) · actorId · type (an enum from the contract) · message · taskId (nullable) · createdAt (default Date.now)
 *      (no updatedAt, since rows are immutable: { timestamps: { createdAt: true, updatedAt: false } })
 *   2. The index: { projectId: 1, createdAt: -1, _id: -1 }
 *   3. A static: Activity.record({ projectId, actorId, type, message, taskId }), called from the task/comment controllers
 *   4. ☆ TTL: expire activity older than 180 days with a TTL index on createdAt. When is that appropriate?
 *   5. ☆ Capped collections vs TTL: explain the difference in a comment.
 * ═══════════════════════════════════════════════════════════════════════════
 */
