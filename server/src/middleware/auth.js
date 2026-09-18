/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/middleware/auth.js · Phase 7 · Day 7 · ★ core (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Authentication (verify the JWT → req.user) and authorisation helpers (project membership).
 *
 * 🧠 CONCEPTS  → docs/concepts/node/jwt-auth.md, docs/concepts/web/security-xss-csrf-jwt.md
 *
 * 📝 STEPS
 *   1. export function signToken(user) → jwt.sign({ sub: String(user._id), role: user.role }, env.JWT_SECRET,
 *        { expiresIn: env.JWT_EXPIRES_IN, algorithm: 'HS256' })
 *   2. export function requireAuth(req, res, next):
 *      - read the Authorization header → it must be "Bearer <token>", otherwise throw unauthenticated()
 *      - jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] }) → req.user = { id: payload.sub, role: payload.role }
 *      - ☆ load the user from the DB (a cached lookup) to reject deleted users
 *   3. export async function assertProjectMember(userId, projectId) → Project.exists({ _id: projectId, memberIds: userId })
 *      → otherwise throw forbidden() (or notFound() to avoid leaking whether it exists; discuss the trade-off)
 *   4. export const requireRole = (role) => (req, res, next) => … (admin-only routes ☆)
 *
 * ✅ DONE WHEN  [ ] No token → 401 · a tampered token → 401 · an expired token → 401 · a non-member → 403/404
 * 🎤 INTERVIEW ANGLE  "AuthN vs AuthZ?", "why pin the JWT algorithm?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
