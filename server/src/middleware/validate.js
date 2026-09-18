/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/middleware/validate.js · Phase 7 · Day 7 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  A reusable validation middleware: validate({ body, params, query }) with zod schemas.
 *
 * 📝 STEPS
 *   1. export const validate = (schemas) => (req, res, next) => { for each of body/params/query:
 *        const result = schemas[part]?.safeParse(req[part]); on failure → throw badRequest('Invalid request', details from result.error.issues)
 *        on success → store the parsed data in req.valid = { ...req.valid, [part]: result.data } }
 *      (Express 5: req.query is a read-only getter, so don't assign to it. That's why the data goes into req.valid.)
 *   2. Shared schemas (put them in the route files or a schemas.js):
 *      objectId = z.string().regex(/^[a-f\d]{24}$/i) · taskStatus = z.enum(['todo', 'in_progress', 'review', 'done'])
 *      createTaskBody, moveTaskBody ({ status, order: z.number().finite() }), createProjectBody (name 2–60), …
 *   3. Map the zod issues to [{ path: issue.path.join('.'), message: issue.message }].
 *
 * ✅ DONE WHEN  [ ] POST /api/projects with {} → 400 with details [{ path: 'name', … }]
 * 🎤 INTERVIEW ANGLE  "Where should validation live?" (both: the client for UX, the server for truth)
 * ═══════════════════════════════════════════════════════════════════════════
 */
