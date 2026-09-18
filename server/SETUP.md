# Server setup: Express 5 + MongoDB ★ (Day 7, ~30 min)

Run the commands from the **repo root** unless a step says otherwise.
**Primers:** [Express 5](../docs/concepts/node/express5-middleware.md) · [Mongoose 9](../docs/concepts/node/mongoose-modeling.md) ·
[JWT](../docs/concepts/node/jwt-auth.md) · [GraphQL server](../docs/concepts/node/graphql-server.md) · [testing](../docs/concepts/tooling/testing-mocha-vitest-rtl.md)

---

## 1. Create the package
```bash
npm init -y -w server
```
Edit `server/package.json`:
- `"name": "@kanvas/server"`, `"private": true`, `"type": "module"`, `"engines": { "node": ">=24" }`
- scripts:

| script | command | notes |
|---|---|---|
| `dev` | `node --watch --env-file=.env src/index.js` | no nodemon or dotenv needed on Node 24 |
| `start` | `node --env-file-if-exists=.env src/index.js` | production-style start |
| `seed` | `node --env-file=.env src/scripts/seed.js` | loads client seed data + 10k activity rows |
| `test` | `mocha` | reads `.mocharc.yml` |

## 2. Install dependencies
```bash
npm i express mongoose jsonwebtoken bcryptjs zod helmet cors morgan graphql graphql-yoga -w server
```
```bash
npm i -D mocha chai supertest mongodb-memory-server -w server
```
☆ Later: `dataloader` (GraphQL N+1), `pino` (structured logs).

> Why graphql-yoga? It supports **graphql 17**. Apollo Server 5 currently expects graphql 16. If you pick Apollo, pin `graphql@16`.

## 3. Environment
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
(Windows PowerShell: `Copy-Item server/.env.example server/.env`)

Then set a long random `JWT_SECRET`:
```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

## 4. MongoDB
Pick **one** option and put its connection string in `MONGO_URI` in `server/.env`.
Any MongoDB 7 or 8 works.

| Option | Setup | `MONGO_URI` |
|---|---|---|
| **macOS (Homebrew)** | `brew tap mongodb/brew && brew install mongodb-community`, then `brew services start mongodb-community` | `mongodb://127.0.0.1:27017/kanvas` |
| **Ubuntu / Debian** | Follow the official "Install MongoDB Community Edition" guide for your release (it adds MongoDB's apt repo), then `sudo systemctl start mongod` | `mongodb://127.0.0.1:27017/kanvas` |
| **Windows** | Install MongoDB Community Server with the MSI installer (tick "Install as a Service") | `mongodb://127.0.0.1:27017/kanvas` |
| **Docker (any OS)** | `docker run -d --name kanvas-mongo -p 27017:27017 -v kanvas-mongo:/data/db mongo:7` | `mongodb://127.0.0.1:27017/kanvas` |
| **MongoDB Atlas (no install)** | Create a free cluster at mongodb.com/atlas → add a database user → Network Access: allow your IP → Connect → Drivers | `mongodb+srv://<user>:<password>@<cluster>/kanvas` |

Check the connection (requires [mongosh](https://www.mongodb.com/docs/mongodb-shell/install/)):
```bash
mongosh "mongodb://127.0.0.1:27017/kanvas" --eval "db.runCommand({ ping: 1 })"
```
(Or use MongoDB Compass, the GUI.)

> Tests **don't** need any of this: `mongodb-memory-server` downloads and starts a throwaway `mongod` on the first test run (this takes a while the first time).
> Transactions need a replica set. Atlas has one; a plain local `mongod` doesn't. That's only relevant for the ☆ delete-project exercise.

## 5. Wire up `dev` at the root
Step 1 already added `"server"` to the root `"workspaces"` (check that it now lists both `client` and `server`).
Then install `concurrently` at the root:
```bash
npm i -D concurrently
```
Root script: `"dev": "concurrently -n client,server -c blue,green \"npm:dev -w client\" \"npm:dev -w server\""`

## 6. Build order
Follow [phase 7](../docs/phases/phase-7-node-backend.md): `config` → `utils` + `middleware` → `app.js`/`index.js` → `models` → auth → projects/tasks → seed → GraphQL → tests.

## ✅ Done when
- [ ] `npm run dev -w server` logs "API listening on :4000" and "MongoDB connected"
- [ ] `curl -s localhost:4000/health` (or open it in a browser) → `{"ok":true,…}`
- [ ] `npm test -w server` runs (with 0 tests at first)
