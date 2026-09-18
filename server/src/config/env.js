/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/config/env.js · Phase 7 · Day 7 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Validate and type-coerce process.env ONCE at startup with zod, and fail fast with a readable message.
 *
 * 📝 STEPS
 *   1. const schema = z.object({
 *        NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
 *        PORT: z.coerce.number().int().positive().default(4000),
 *        MONGO_URI: z.string().min(1),       (for the test env you can default it, since setup.js overrides it)
 *        JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
 *        JWT_EXPIRES_IN: z.string().default('1h'),
 *        CLIENT_ORIGIN: z.url().default('http://localhost:5173'),   (zod 4: z.url() replaces z.string().url())
 *        RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60_000),
 *        RATE_LIMIT_MAX: z.coerce.number().default(300),
 *      })
 *   2. const parsed = schema.safeParse(process.env). On failure: print z.prettifyError(parsed.error) (zod 4) and process.exit(1).
 *   3. export const env = Object.freeze(parsed.data)
 *   4. Tests: set process.env values in test/setup.js BEFORE importing app.js (import order matters with top-level code!).
 *
 * ✅ DONE WHEN  [ ] Removing JWT_SECRET from .env stops the server with a helpful error
 * 🎤 INTERVIEW ANGLE  "How do you manage configuration and secrets per environment?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
