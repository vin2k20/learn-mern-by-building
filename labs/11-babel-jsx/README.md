# Lab 11 · Babel & JSX ★

**Time box:** 60 min · **Run:** `npm run test:11` · **Primers:** [JSX & Babel](../../docs/concepts/react/jsx-and-babel.md), [bundlers](../../docs/concepts/tooling/bundlers-vite-webpack-cra.md)

## Why this matters
Frontend job descriptions often name **JSX and Babel** explicitly. Interviewers like asking: *"What does JSX compile to?"*,
*"What's the new JSX transform?"*, *"Why don't I need `import React` anymore?"*, *"What does Babel do vs a bundler?"*,
*"What's a polyfill vs a transpile?"*. In 2026, Vite 8 transforms JSX with **Oxc** (written in Rust), not Babel,
but Babel is still the reference implementation, the home of the **React Compiler** plugin, and the tool you'll meet in older codebases (CRA, webpack).

## Concepts
- JSX is **syntax sugar** for function calls. Babel parses it into an AST (abstract syntax tree), transforms it, and generates JS.
- **Classic runtime**: `React.createElement(type, props, ...children)`, so `React` must be in scope. `pragma` changes the function name (Preact's `h`).
- **Automatic runtime** (React 17+): `import { jsx } from 'react/jsx-runtime'`. The `key` is passed separately and `children` goes inside props.
  In development mode it uses `jsxDEV` from `react/jsx-dev-runtime`, which adds source info for better warnings.
- **Presets vs plugins**: a preset is a bundle of plugins. `preset-env` + `browserslist`/`targets` decide which syntax to transpile.
- **Transpiling ≠ polyfilling**: `??` can be rewritten as syntax. `Array.prototype.at` needs a runtime polyfill (core-js).
- The parse → transform (visitors) → generate pipeline, and writing your own plugin.

## Tasks
### A. Hands-on with the CLI (not tested, 15 min)
1. Open `src/App.jsx` and write the small component described there.
2. Create `labs/11-babel-jsx/babel.config.json` (Babel parses its JSON config with JSON5, so comments are allowed) containing
   `presets: [["@babel/preset-react", { "runtime": "classic" }]]`.
3. From `labs/`, run:
   ```bash
   npx babel 11-babel-jsx/src --out-dir 11-babel-jsx/dist --config-file ./11-babel-jsx/babel.config.json
   ```
   Open `dist/App.js` and read it.
4. Switch to `"runtime": "automatic"`, compile again, and compare. Then add `"development": true`. What changed? Why is `key` separate?
5. Add `["@babel/preset-env", { "targets": "chrome 40" }]`, compile again, and see what happened to arrow functions and classes.
   Then try `"targets": "defaults"`.

### B. Tested exercises
1. `compile.js`: wrap `transformSync` for the classic, automatic and legacy builds.
2. `handwritten.js`: write the `createElement` calls for a JSX snippet **by hand**. The test compiles the real JSX with Babel and compares the two.
3. `remove-console-plugin.js`: your first Babel plugin (an AST visitor).

## 🎤 Interview questions
1. What does `<Card title="x">Hi</Card>` compile to in the classic and automatic runtimes?
2. Why can JSX tags starting with a lowercase letter be strings, but components must be capitalised?
3. What's the difference between Babel, a bundler (webpack/Rollup/Rolldown), and a minifier?
4. What does `browserslist` control? How does it relate to `preset-env` and CSS autoprefixing?
5. Why is Vite fast in development? (Native ESM + on-demand transforms with Oxc/esbuild, no bundling in dev.)
6. What does the React Compiler do, and why is it a Babel plugin?

## Stretch ☆
- Make the plugin skip `console` when it's a local variable (`npm run test:stretch`).
- Write a plugin that adds `data-testid` to every JSX element that has an `id` prop.
