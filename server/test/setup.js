/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/test/setup.js · Phase 7 · Day 7 · ★ core (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Mocha ROOT HOOKS: start an in-memory MongoDB once, clean the collections between tests, and stop it at the end.
 *
 * 🧠 CONCEPTS  → docs/concepts/tooling/testing-mocha-vitest-rtl.md · labs (you've used Mocha all week)
 *
 * 📝 STEPS
 *   1. Set the env BEFORE the app modules load: process.env.NODE_ENV = 'test'; process.env.JWT_SECRET = 'x'.repeat(32); …
 *      Then load the app with a dynamic import inside beforeAll (so env.js sees these values).
 *   2. export const mochaHooks = {
 *        async beforeAll() { mongod = await MongoMemoryServer.create(); await connectDb(mongod.getUri()); },
 *        async afterEach() { for (const c of Object.values(mongoose.connection.collections)) await c.deleteMany({}); },
 *        async afterAll() { await disconnectDb(); await mongod.stop(); },
 *      }
 *   3. Export factories for the tests (test/factories.js ☆): createUser({ email, password }), loginAs(app, user) → token,
 *      createProject(owner), createTask(project, overrides)
 *   4. Add `require: 'test/setup.js'` to .mocharc.yml.
 *
 * ✅ DONE WHEN  [ ] Tests never touch your local `kanvas` database · every test starts from an empty DB
 * ⚠️ GOTCHAS  The first run downloads a MongoDB binary (~100 MB). Keep the 20 s timeout from .mocharc.yml for it.
 * ═══════════════════════════════════════════════════════════════════════════
 */
