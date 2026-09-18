/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/utils/pagination.js · Phase 7 · ☆ stretch (activity feed)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Opaque cursor helpers for keyset pagination on (createdAt DESC, _id DESC).
 *
 * 🧠 CONCEPTS  → docs/api-contract.md (Activity) · docs/concepts/node/mongoose-modeling.md (indexes)
 *
 * 📝 STEPS
 *   1. encodeCursor(doc) → Buffer.from(`${doc.createdAt.toISOString()}|${doc._id}`).toString('base64url')
 *   2. decodeCursor(cursor) → { createdAt: Date, id: ObjectId }. Throw badRequest on garbage input.
 *   3. cursorFilter(cursor) → cursor ? { $or: [ { createdAt: { $lt: c.createdAt } }, { createdAt: c.createdAt, _id: { $lt: c.id } } ] } : {}
 *   4. paginate(query, { limit }) → fetch limit + 1 docs to know whether there's a next page → { data, nextCursor }
 *   5. The index needed: { project: 1, createdAt: -1, _id: -1 }. Verify it with .explain('executionStats') (totalDocsExamined ≈ limit).
 *
 * 🎤 INTERVIEW ANGLE  "Offset vs cursor pagination?", "why fetch limit + 1?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
