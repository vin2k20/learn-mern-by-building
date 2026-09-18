/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/app.js · Phase 7 · Day 7 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   The Express 5 app FACTORY: the security and parsing middleware, the health check, the REST routers, GraphQL, the 404 handler
 *   and the error handler, in the right order. No listen() here (so Supertest can use it directly).
 *
 * 🧠 CONCEPTS  → docs/concepts/node/express5-middleware.md, docs/concepts/web/http-caching-cors.md,
 *               docs/concepts/web/security-xss-csrf-jwt.md
 *
 * 🧩 DEPENDS ON  middleware/* · routes/* · graphql/index.js · config/env.js
 *
 * 📝 STEPS
 *   1. export function createApp() { const app = express(); … return app; }
 *   2. app.disable('x-powered-by'); app.set('trust proxy', 1) (explain in a comment when you'd need it)
 *   3. Middleware, in this order:
 *      helmet() · cors({ origin: env.CLIENT_ORIGIN, credentials: false }) · express.json({ limit: '1mb' }) ·
 *      morgan(env.NODE_ENV === 'test' ? 'tiny' : 'dev') (skip it in tests) · rateLimit() ☆
 *   4. app.get('/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }))
 *   5. Routers:
 *      app.use('/api/auth', authRouter)                 ← public
 *      app.post('/api/metrics', …) → 204                ← public (the web-vitals beacon; just log it)
 *      app.use('/api', requireAuth)                     ← everything below needs a JWT
 *      app.use('/api/users', usersRouter) · app.use('/api/projects', projectsRouter) · app.use('/api/tasks', tasksRouter)
 *   6. GraphQL: app.use('/graphql', requireAuth, yoga)   (see graphql/index.js)
 *   7. The 404 for unknown API routes: app.use('/api', (req, res) => res.status(404).json({ error: { code: 'NOT_FOUND', message: … } }))
 *   8. app.use(errorHandler) LAST
 *   9. Comment: in Express 5, an async route handler that throws reaches errorHandler automatically. Prove it with a temporary
 *      route: app.get('/api/boom', async () => { throw new Error('boom') }) → 500 with the error envelope (then delete it).
 *
 * ✅ DONE WHEN
 *   [ ] curl -i localhost:4000/api/projects → 401 { error: { code: 'UNAUTHENTICATED' } }
 *   [ ] curl -i localhost:4000/api/nope (with a token) → 404 with the envelope · the response headers include the helmet defaults
 *
 * ⚠️ GOTCHAS  Registering requireAuth BEFORE the auth router would lock everyone out · express.json() must come before the routes.
 * 🎤 INTERVIEW ANGLE  "Walk me through your middleware order", "what does helmet do?"
 * 🤖 ASK THE AGENT    /review server/src/app.js
 * ═══════════════════════════════════════════════════════════════════════════
 */
