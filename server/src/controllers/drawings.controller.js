/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/controllers/drawings.controller.js · Phase 7 · ☆ stretch (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 📝 STEPS
 *   get:  assertProjectMember → Drawing.findOne({ projectId }).lean() → { data: drawing ?? { id: null, projectId, shapes: [], updatedAt: null } }
 *   save: assertProjectMember → upsert (see models/Drawing.js) → { data }
 *   ☆ Return 413 Payload Too Large gracefully when the body limit is exceeded (the error handler: err.type === 'entity.too.large').
 * ═══════════════════════════════════════════════════════════════════════════
 */
