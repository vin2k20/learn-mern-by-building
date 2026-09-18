/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/middleware/rateLimit.js · Phase 7 · ☆ stretch (20 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  A hand-rolled SLIDING-WINDOW rate limiter (the DS&A applied), with the standard headers.
 *
 * 🧠 CONCEPTS  → labs/07 (Queue), labs/08 (sliding window) · docs/api-contract.md (429 RATE_LIMITED)
 *
 * 📝 STEPS
 *   1. export function rateLimit({ windowMs = env.RATE_LIMIT_WINDOW_MS, max = env.RATE_LIMIT_MAX, key = (req) => req.user?.id ?? req.ip } = {})
 *   2. Store: Map<key, number[]> of request timestamps (or your Queue). On each request, drop the timestamps older than now - windowMs.
 *   3. If count >= max → throw tooMany(secondsUntilOldestExpires) (the error handler sets Retry-After).
 *   4. Otherwise push now and set the headers: RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset.
 *   5. Prevent unbounded memory growth: sweep empty keys periodically (setInterval(...).unref()).
 *   6. Comment: why doesn't this work with multiple server instances? (Use Redis or a gateway instead.) Compare it with a token bucket.
 *   7. Apply a stricter limit to POST /api/auth/login (5 per minute per IP).
 *
 * ✅ DONE WHEN  [ ] The 6th rapid login attempt → 429 with a Retry-After header
 * 🎤 INTERVIEW ANGLE  "Design a rate limiter" (fixed window vs sliding window vs token bucket)
 * ═══════════════════════════════════════════════════════════════════════════
 */
