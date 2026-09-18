/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/scripts/seed.js · Phase 7 · Day 7 · ★ core (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Load the SAME seed data the mock used (client/src/mocks/data/seed.json) into MongoDB, plus 10,000 activity rows.
 *
 * 🧠 CONCEPTS  → docs/concepts/node/mongoose-modeling.md (bulk operations) · labs/05 (mapLimit)
 *
 * 📝 STEPS
 *   1. Read the JSON: JSON.parse(await readFile(new URL('../../../client/src/mocks/data/seed.json', import.meta.url)))
 *      (or `import seed from '…' with { type: 'json' }`, an import attribute)
 *   2. connectDb → drop the existing collections (ask for confirmation unless --yes is passed: process.argv)
 *   3. Map the string ids (u_001, p_001, t_001…) to NEW ObjectIds with a Map, and replace every reference (ownerId, memberIds,
 *      projectId, assigneeId, dependsOn, taskId, authorId) using that map.
 *   4. Users: set every password to 'kanvas123' (hash them in parallel with Promise.all, or mapLimit(users, 4, …) since bcrypt is CPU-heavy)
 *   5. insertMany the users, projects, tasks, comments and drawings (ordered: false ☆)
 *   6. Activity: generate 10,000 rows for the first project with timestamps spread over 60 days, and insert them in chunks of 1,000
 *      (your lab 04 chunk()) with insertMany. Log the progress.
 *   7. Print a summary table (console.table) and disconnect.
 *
 * ✅ DONE WHEN  [ ] `npm run seed -w server -- --yes` → you can log in as demo@kanvas.dev / kanvas123 and see the same board as with MSW
 * 🎤 INTERVIEW ANGLE  "How do you seed and migrate data safely?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
