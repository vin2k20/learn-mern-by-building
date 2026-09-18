/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/middleware/errorHandler.js · Phase 7 · Day 7 · ★ core (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  ONE place that converts any thrown error into the contract's error envelope with the right status code.
 *
 * 🧠 CONCEPTS  → docs/concepts/node/express5-middleware.md (4-argument middleware, async errors in Express 5)
 *
 * 📝 STEPS
 *   export function errorHandler(err, req, res, next) {   ← all 4 parameters are required, or Express won't treat it as an error handler
 *     1. if (res.headersSent) return next(err)
 *     2. Map the known errors:
 *        - AppError → err.status / err.code / err.message / err.details
 *        - zod's ZodError (if it's thrown directly) → 400 VALIDATION_ERROR, with details from issues (path.join('.'), message)
 *        - mongoose.Error.ValidationError → 400 · mongoose.Error.CastError (a bad ObjectId) → 404 NOT_FOUND
 *        - MongoServerError code 11000 (a duplicate key) → 409 CONFLICT
 *        - jsonwebtoken's TokenExpiredError / JsonWebTokenError → 401 UNAUTHENTICATED
 *        - a body-parser SyntaxError (err.type === 'entity.parse.failed') → 400
 *        - anything else → 500 INTERNAL, with the message "Something went wrong"
 *     3. Log 5xx errors with the stack (console.error, or pino ☆). Never send stack traces to the client in production.
 *     4. For a 429, set the Retry-After header.
 *     5. res.status(status).json({ error: { code, message, details } })
 *   }
 *
 * ✅ DONE WHEN  [ ] Every error response in your tests has the same envelope shape
 * 🎤 INTERVIEW ANGLE  "How are errors propagated in Express 5?", "what should an API error response contain?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
