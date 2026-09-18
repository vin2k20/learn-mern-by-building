/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/controllers/auth.controller.js · Phase 7 · Day 7 · ★ core (20 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Login, register and "me", following the contract exactly (shapes and status codes).
 *
 * 🧠 CONCEPTS  → docs/concepts/node/jwt-auth.md · docs/api-contract.md §3 (Auth)
 *
 * 📝 STEPS (all of them are async functions; Express 5 forwards thrown errors)
 *   1. login(req, res):
 *      const { email, password } = req.valid.body
 *      const user = await User.findOne({ email }).select('+passwordHash')
 *      if (!user || !(await user.checkPassword(password))) throw unauthenticated('Invalid email or password')   ← one generic message
 *      res.json({ data: { token: signToken(user), user } })
 *   2. register(req, res) ☆: create the user (setPassword) → 201 { data: { token, user } }. A duplicate email → 409 (via the error handler).
 *   3. me(req, res): const user = await User.findById(req.user.id); if (!user) throw unauthenticated(); res.json({ data: user })
 *   4. ☆ A timing-attack note: comparing against a dummy hash when the user doesn't exist keeps the response time constant.
 *
 * 🧪 Covered by test/auth.test.js
 * ═══════════════════════════════════════════════════════════════════════════
 */
