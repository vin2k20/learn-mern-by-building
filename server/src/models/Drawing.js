/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/models/Drawing.js · Phase 7 · ☆ stretch (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  One drawing document per project, with the shapes EMBEDDED (an embed-vs-reference decision).
 *
 * 📝 STEPS
 *   1. projectId (unique) · shapes: [shapeSchema] with { _id: false } · updatedAt via timestamps
 *   2. shapeSchema: id (String), type (an enum: pen/line/rect/ellipse), points ([[Number]]), x, y, w, h, stroke, fill (nullable), strokeWidth
 *   3. Validate at most 5,000 shapes (a custom validator), and explain the 16 MB document limit in a comment.
 *   4. The upsert in the controller: findOneAndUpdate({ projectId }, { shapes }, { upsert: true, returnDocument: 'after', runValidators: true })
 *      (Mongoose 9: returnDocument replaces the deprecated `new: true`)
 *
 * 🎤 INTERVIEW ANGLE  "When do you embed vs reference in MongoDB?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
