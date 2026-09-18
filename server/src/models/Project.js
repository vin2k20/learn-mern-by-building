/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/models/Project.js · Phase 7 · Day 7 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  The Project model with members and a case-insensitive unique name per owner ☆.
 *
 * 📝 STEPS
 *   1. name (required, trim, 2–60) · description (default '') · color (a hex regex, default '#5b5bd6') ·
 *      ownerId (ObjectId → User, required) · memberIds ([ObjectId → User], index) · timestamps
 *   2. Indexes: { memberIds: 1, updatedAt: -1 } (the "my projects" list) · ☆ a unique { ownerId: 1, name: 1 } with a collation
 *      { locale: 'en', strength: 2 } for case-insensitive uniqueness
 *   3. The toJSON transform: id, ownerId and memberIds as strings (the contract uses string ids)
 *   4. A static: Project.listForUser(userId, search) → the members filter + an optional case-insensitive name regex (escape the user input!)
 *      sorted by updatedAt desc
 *
 * ✅ DONE WHEN  [ ] GET /api/projects returns only the projects the user belongs to
 * ⚠️ GOTCHAS  An unescaped user input in `new RegExp(search)` → ReDoS / injection. Escape the special characters.
 * ═══════════════════════════════════════════════════════════════════════════
 */
