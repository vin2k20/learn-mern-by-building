/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/utils/AppError.js · Phase 7 · Day 7 · ★ core (5 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  A typed error class that the error handler turns into the contract's error envelope.
 *
 * 📝 STEPS
 *   export class AppError extends Error {
 *     constructor(status, code, message, details) { super(message); this.name = 'AppError'; this.status = status; this.code = code; this.details = details; }
 *   }
 *   Factory helpers: badRequest(message, details) · unauthenticated() · forbidden() · notFound(what) · conflict(message) ·
 *   blocked(message) (422 BLOCKED_BY_DEPENDENCY) · tooMany(retryAfterSeconds)
 *
 * 🧩 USED BY  controllers · middleware/auth.js · middleware/validate.js · errorHandler.js
 * 🎤 INTERVIEW ANGLE  "How do you standardise API errors?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
