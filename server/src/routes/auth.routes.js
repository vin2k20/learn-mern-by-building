/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/routes/auth.routes.js · Phase 7 · Day 7 · ★ core (5 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Map the auth HTTP routes to their controllers, with validation and a login rate limit.
 *
 * 📝 STEPS
 *   const router = Router()
 *   router.post('/login', rateLimit({ max: 5, key: (req) => req.ip }) ☆, validate({ body: loginBody }), authController.login)
 *   router.post('/register', validate({ body: registerBody }), authController.register)   ☆
 *   router.get('/me', requireAuth, authController.me)
 *   export default router
 *   loginBody = z.object({ email: z.email(), password: z.string().min(1) })   (zod 4: z.email())
 *
 * 💡 PATTERN (the same for every *.routes.js file): routes = the HTTP shape only (path, method, middleware), controllers = the logic.
 * ═══════════════════════════════════════════════════════════════════════════
 */
