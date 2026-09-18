/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/models/Task.js · Phase 7 · Day 7 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  The Task model matching the contract, with indexes for the board queries.
 *
 * 🧠 CONCEPTS  → docs/concepts/node/mongoose-modeling.md (the example schema), docs/api-contract.md §1 and §4
 *
 * 📝 STEPS
 *   1. Fields: projectId (ref Project, required) · title (1–120, trim) · description · status (an enum) · priority (an enum) ·
 *      assigneeId (ref User, default null) · labels [String] · order (Number, required) · estimate (Number, min 0, default 1) ·
 *      dependsOn [ObjectId → Task] · dueDate (Date | null) · completedAt (Date | null) · timestamps
 *   2. Indexes: { projectId: 1, status: 1, order: 1 } (the board) · { projectId: 1, completedAt: 1 } (the burndown) · { assigneeId: 1 }
 *   3. An async pre('save') hook (Mongoose 9: no next): when status changes to 'done' → completedAt = new Date();
 *      when it changes away from 'done' → completedAt = null. (isModified('status'))
 *      Note: findOneAndUpdate does NOT run save hooks. Handle completedAt in the move controller too, or use a query hook ☆.
 *   4. A static: Task.nextOrder(projectId, status) → (the max order in that column) + 1000, or 1000 if the column is empty
 *   5. The toJSON transform: ids → strings (including dependsOn), dates → ISO (the default)
 *
 * ✅ DONE WHEN  [ ] .explain() on the board query shows an IXSCAN on the compound index
 * 🎤 INTERVIEW ANGLE  "How would you index this collection?", "why don't update queries run save middleware?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
