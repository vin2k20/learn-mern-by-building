/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/config/db.js · Phase 7 · Day 7 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Connect to MongoDB with Mongoose, with retries, and expose connect/disconnect helpers.
 *
 * 🧠 CONCEPTS  → docs/concepts/node/mongoose-modeling.md · labs/05 (retry with backoff)
 *
 * 📝 STEPS
 *   1. mongoose.set('strictQuery', true) (explain what it does in a comment)
 *   2. export async function connectDb(uri) → use your lab 05 retry(): up to 5 attempts, backoff from 500 ms.
 *      Log "MongoDB connected" with the host and db name (never the credentials).
 *   3. Listen to the connection events: 'disconnected' and 'error' → log them.
 *   4. export async function disconnectDb() → await mongoose.disconnect()
 *   5. ☆ Sync indexes at startup in development (Model.syncIndexes()) and explain why you'd NOT do that on every production boot.
 *
 * ✅ DONE WHEN  [ ] Starting the API before Mongo is up retries, then connects once you start Mongo
 * ═══════════════════════════════════════════════════════════════════════════
 */
