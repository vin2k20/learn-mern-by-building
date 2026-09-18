/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/index.js · Phase 7 · Day 7 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  The process entry point: validate the env, connect to MongoDB, start HTTP, and shut down gracefully.
 *
 * 🧠 CONCEPTS  → docs/concepts/node/node-event-loop.md (signals, graceful shutdown), docs/concepts/node/express5-middleware.md
 *
 * 🧩 DEPENDS ON  config/env.js · config/db.js · app.js (createApp)
 *
 * 📝 STEPS
 *   1. import { env } from './config/env.js'; import { connectDb, disconnectDb } from './config/db.js'; import { createApp } from './app.js'
 *   2. await connectDb(env.MONGO_URI)   (top-level await works in ESM)
 *   3. const server = createApp().listen(env.PORT, () => console.log(`API listening on :${env.PORT}`))
 *   4. Graceful shutdown on SIGINT and SIGTERM:
 *      server.close() (stop accepting connections) → await disconnectDb() → process.exit(0)
 *      with a 10 s safety timeout that forces process.exit(1)
 *   5. process.on('unhandledRejection') / ('uncaughtException') → log and exit(1). (Why exit instead of continuing?)
 *
 * ✅ DONE WHEN  [ ] Ctrl+C prints "shutting down…" and exits cleanly · a bad MONGO_URI fails fast with a clear message
 * 🎤 INTERVIEW ANGLE  "Why separate app.js from index.js?" (testability), "what is graceful shutdown?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
