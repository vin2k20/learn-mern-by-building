# Phase 7 · Node backend: Express 5 + MongoDB ★ (Day 7, ~5 h, slim track)

**Goal:** replace the MSW mock with a real API that follows [the contract](../api-contract.md): REST for CRUD, GraphQL for the dashboard,
JWT auth, validation, central error handling, and Mocha + Supertest tests.
**[Interview topics](../interview/target-role.md) covered:** *Node + NPM · RESTful APIs/GraphQL · Mocha · full-stack understanding*
**Primers:** [Node event loop](../concepts/node/node-event-loop.md) · [Express 5 & middleware](../concepts/node/express5-middleware.md) ·
[Mongoose modelling](../concepts/node/mongoose-modeling.md) · [JWT auth](../concepts/node/jwt-auth.md) · [GraphQL server](../concepts/node/graphql-server.md)

---

## Order of work (★ = the slim core path)
| # | File(s) | Time | ★/☆ |
|---|---|---|---|
| 1 | [`server/SETUP.md`](../../server/SETUP.md): deps, scripts, `.env`, start MongoDB | 30 min | ★ |
| 2 | `src/config/env.js`, `src/config/db.js` | 15 min | ★ |
| 3 | `src/utils/AppError.js`, `src/middleware/errorHandler.js`, `validate.js` | 20 min | ★ |
| 4 | `src/app.js`, `src/index.js` | 20 min | ★ |
| 5 | `src/models/User.js`, `Project.js`, `Task.js` | 30 min | ★ |
| 6 | `src/middleware/auth.js`, `routes/auth.routes.js`, `controllers/auth.controller.js` | 30 min | ★ |
| 7 | projects + tasks routes/controllers (including `PATCH /move`) | 50 min | ★ |
| 8 | `src/scripts/seed.js` | 15 min | ★ |
| 9 | `src/graphql/schema.js`, `resolvers.js`, `index.js` | 45 min | ★ |
| 10 | `test/setup.js`, `test/auth.test.js`, `test/tasks.test.js` | 45 min | ★ |
| 11 | Client switch-over (below) | 20 min | ★ |
| ☆ | `Activity` + cursor pagination, `Drawing`, `rateLimit.js`, `graphql.test.js`, DataLoader | | ☆ |

## Request lifecycle (Express 5)
```
request → helmet → cors → express.json() → morgan → rateLimit ☆ → router
        → auth (JWT) → validate (zod) → controller (async; Express 5 forwards rejected promises)
        → response                 ↘ throw AppError → errorHandler → { error: { code, message, details } }
```

## Client switch-over
1. `client/.env.local`: `VITE_USE_MOCKS=false`
2. `vite.config.js` proxy: `/api` and `/graphql` → `http://localhost:4000` (it's probably already there from Phase 3)
3. Root `package.json`: check that `workspaces` lists `client` and `server` (step 1 of server/SETUP.md adds it), then `npm run dev` starts both (with `concurrently`)
4. Walk through all 10 user stories from the [product brief](../product-brief.md) against the real API. Fix any contract mismatches **on the server**. The contract wins.

## ✅ Checkpoint
- [ ] `npm test` in `server/` is green (with mongodb-memory-server, no local DB needed)
- [ ] `curl -i localhost:4000/api/projects` → `401` with the error envelope
- [ ] The app works end to end against the real API. A reload keeps your data (it's stored in MongoDB).
- [ ] Moving a task to `done` while a dependency is open → `422 BLOCKED_BY_DEPENDENCY` → the UI rolls back and shows a toast
- [ ] The dashboard loads via the real `/graphql` endpoint

## 🎤 Drill
1. How does the Node event loop differ from the browser's? What blocks it?
2. What's middleware in Express? How are errors propagated in Express 5 vs 4?
3. REST status codes: 400 vs 401 vs 403 vs 404 vs 409 vs 422.
4. JWT: what's inside it, how is it verified, and how do you revoke one? Access and refresh tokens?
5. What's the N+1 problem in GraphQL, and how does DataLoader fix it?
6. How would you paginate 1M activity rows?

🤖 `/review server/src` · `/quiz node express mongodb graphql`
