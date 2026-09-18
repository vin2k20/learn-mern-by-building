/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/models/User.js · Phase 7 · Day 7 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  The User model: a unique email, a hashed password, a role, an avatar colour, and SAFE JSON output.
 *
 * 🧠 CONCEPTS  → docs/concepts/node/mongoose-modeling.md (Mongoose 9: async pre hooks, no next()), docs/concepts/node/jwt-auth.md
 *
 * 📝 STEPS
 *   1. The schema: name (required, trim, 1–80) · email (required, unique, lowercase, trim, a match regex) ·
 *      passwordHash (required, select: false) · role (an enum of admin/member, default member) · avatarColor (default '#5b5bd6') · timestamps
 *   2. A virtual setter or an instance method for passwords:
 *      userSchema.methods.setPassword = async function (plain) { this.passwordHash = await bcrypt.hash(plain, 12) }
 *      userSchema.methods.checkPassword = function (plain) { return bcrypt.compare(plain, this.passwordHash) }
 *      (Alternative: an async pre('save') hook. In Mongoose 9 it's `schema.pre('save', async function () { … })` with NO next.)
 *   3. The toJSON transform: rename _id → id (a string), delete passwordHash and __v.
 *      Tip: a shared plugin in models/plugins/toJSON.js ☆ reused by every model.
 *   4. export const User = model('User', userSchema)
 *
 * ✅ DONE WHEN  [ ] res.json(user) never contains passwordHash · a duplicate email → 409 via the error handler (code 11000)
 * 🎤 INTERVIEW ANGLE  "How do you store passwords?", "why select: false?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
