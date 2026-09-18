# Modules (ESM vs CommonJS) & bundling basics

> **TL;DR:** ES modules (`import`/`export`) are static, asynchronous, strict and tree-shakeable. CommonJS (`require`) is dynamic and synchronous.
> This project is **ESM everywhere** (`"type": "module"`).

## ESM vs CJS
| | ESM | CommonJS |
|---|---|---|
| Syntax | `import` / `export` | `require` / `module.exports` |
| Loading | async, static graph (known before running) | sync, at runtime |
| Bindings | **live** (read-only views of exports) | copied values |
| Top-level `await` | ✓ | ✗ |
| `this` at the top level | `undefined` | `module.exports` |
| Tree-shaking | ✓ (static analysis) | hard |
| In Node | `.mjs` or `"type": "module"` | `.cjs` or the default |
| `__dirname` | `import.meta.dirname` (Node 20.11+) | ✓ |

Node 22+ can `require()` synchronous ESM, which makes interop much easier than it used to be.

## Browser loading
```html
<script type="module" src="app.js"></script>   <!-- deferred by default, strict, CORS-fetched -->
<script nomodule src="legacy.js"></script>      <!-- old browsers only -->
```
`defer`: download in parallel, run in order after parsing. `async`: run as soon as it's downloaded (unordered).

## Dynamic import & code splitting
```js
const { exportPng } = await import('./exportImage.js');   // a separate chunk, loaded on demand
const Whiteboard = lazy(() => import('./WhiteboardPage.jsx')); // React route splitting
```

## Tree-shaking prerequisites
ESM syntax · `"sideEffects": false` (or a list) in package.json · no top-level side effects in utility modules · named imports.

## Import maps & aliases
Vite alias `@` → `src` (configure it in `vite.config.js`, and in `jsconfig.json` for editor IntelliSense).

## 🎤 Interview questions
<details><summary>What are live bindings?</summary>
An importer sees the current value of an exported `let` even after the exporting module changes it. CJS gives you a copy at require time.
</details>
<details><summary>How does tree-shaking work?</summary>
The bundler builds the static import graph, marks the exports that are actually used, and drops unused, side-effect-free code during minification.
</details>

## Practise in Kanvas
`client/vite.config.js` · `client/src/app/router.jsx` (lazy) · [bundlers primer](../tooling/bundlers-vite-webpack-cra.md)
