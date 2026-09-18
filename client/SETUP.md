# Client setup: build the toolchain by hand ★ (Day 3, ~45 min)

You'll set up **Vite 8 + React 19.3** without `npm create vite`, so you understand every piece that CRA or a template would hide.
(Running `npm create vite` here would also overwrite the instruction files.) Run every command from the **repo root** unless a step says otherwise.
**Primers:** [bundlers](../docs/concepts/tooling/bundlers-vite-webpack-cra.md) · [npm & workspaces](../docs/concepts/tooling/npm-semver-workspaces.md) · [ESLint & Prettier](../docs/concepts/tooling/eslint-prettier.md)

---

## 1. Create the package (5 min)
```bash
npm init -y -w client
```
This creates `client/package.json` **and** adds `"workspaces": ["client"]` to the root `package.json` (check it!).
Edit `client/package.json`:
- `"name": "@kanvas/client"`, `"private": true`, `"type": "module"`
- scripts:

| script | command | why |
|---|---|---|
| `dev` | `vite` | dev server with HMR |
| `build` | `vite build` | production bundle in `dist/` |
| `preview` | `vite preview` | serve `dist/` locally (for Lighthouse) |
| `lint` | `eslint . --max-warnings 0` | treat warnings as errors |
| `format` | `prettier --write .` | |
| `test` | `vitest --passWithNoTests` | watch mode |
| `test:run` | `vitest run --passWithNoTests` | single run (CI) |

## 2. Install dependencies (5 min)
```bash
npm i react react-dom react-router @reduxjs/toolkit react-redux web-vitals -w client
```
```bash
npm i -D vite @vitejs/plugin-react eslint @eslint/js globals eslint-plugin-react-hooks eslint-plugin-jsx-a11y prettier -w client
```
```bash
npm i -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom msw -w client
```
Then run `npm ls react -w client` (you should see exactly one React version) and read `client/package.json`.
Can you explain why each package is in `dependencies` or `devDependencies`?

> Notice the **root** `node_modules` and the **root** `package-lock.json`: that's workspace hoisting.

## 3. Config files that can't hold comments (5 min)
Create these yourself:

**`client/.prettierrc`**
```json
{ "singleQuote": true, "semi": true, "printWidth": 100, "trailingComma": "all" }
```
**`client/.prettierignore`**: `dist`, `coverage`, `public/mockServiceWorker.js`

**`client/jsconfig.json`** (so the editor understands the `@/` alias)
```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"] }, "jsx": "react-jsx" }, "include": ["src"] }
```

**`client/.env.local`** (git-ignored; copy it from `.env.example`)
```
VITE_USE_MOCKS=true
VITE_API_URL=/api
```

## 4. Mock Service Worker (2 min)
From inside `client/`:
```bash
npx msw init public --save
```
This generates `public/mockServiceWorker.js` (don't edit it) and records `msw.workerDirectory` in `package.json`.

## 5. The files with instruction blocks (20 min)
Implement these in order, following each file's instructions:
1. `client/index.html`
2. `client/vite.config.js`
3. `client/eslint.config.js`
4. `client/src/main.jsx`. **First version:** just render `<h1>Kanvas</h1>` to prove the toolchain works.

```bash
npm run dev -w client
```
Open http://localhost:5173. Edit the `<h1>` text and watch **HMR** update it without a reload.
```bash
npm run lint -w client
```
```bash
npm run build -w client && npm run preview -w client
```
Look at `client/dist/`. What are the hashed file names for?

## 6. Compare with a template (5 min, in a sibling folder outside this repo)
```bash
npm create vite@latest ../vite-compare -- --template react
```
Diff it against your setup. What did the template include that you didn't (and vice versa)? What would CRA have generated?
Write three bullet points in your notes; this is a good interview talking point.

## 7. Browser extensions
Install **React Developer Tools** and **Redux DevTools** in Chrome. You'll use both from Day 4.

## ✅ Done when
- [ ] `npm run dev -w client` serves the page and HMR works
- [ ] `npm run lint -w client` and `npm run build -w client` succeed
- [ ] `npm run test:run -w client` exits 0 (no tests yet)
- [ ] You can explain: `type: module`, workspaces hoisting, `VITE_` env vars, what `public/` is for, and what `vite build` outputs

> **Note:** the other `src/` files are instructions only, so importing them before you implement them gives you undefined exports.
> Build in the order of [phase 3](../docs/phases/phase-3-react-foundations.md) and keep `main.jsx` minimal until `router.jsx` exists.
