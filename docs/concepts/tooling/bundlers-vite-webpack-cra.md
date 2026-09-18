# Bundlers & dev servers: Vite 8, webpack, CRA

> **TL;DR:** a bundler turns your module graph into optimised files for browsers. **Vite** serves native ESM in dev (instant start, fast HMR)
> and bundles with **Rolldown** for production (Vite 8). **webpack** bundles everything, in dev too. **CRA** wrapped webpack + Babel + Jest and is deprecated (Feb 2025).

## What a bundler does
Resolve imports → transform (JSX/TS/CSS) → build the graph → **tree-shake** → split into chunks → minify → content-hash the file names → emit assets and source maps.

## Vite 8 (Mar 2026)
- **Dev:** serves source files as native ES modules, transforms them on request with **Oxc**, pre-bundles dependencies, and does HMR over WebSocket (React Fast Refresh via `@vitejs/plugin-react`).
- **Build:** **Rolldown** (Rust, Rollup-compatible plugin API) is the single bundler. Before Vite 8, dev used esbuild and production used Rollup.
- Config: `vite.config.js` → `plugins`, `resolve.alias`, `server.proxy`, `build` options, `define`, `envPrefix` (`VITE_`).
- Env vars: `.env`, `.env.local`, `.env.production`, read with `import.meta.env.VITE_*` (anything prefixed `VITE_` is **public**!).
- `vite preview` serves the production build locally (use it for Lighthouse).

## webpack (still very common in existing codebases)
- `entry` → `module.rules` (loaders: babel-loader, css-loader, style-loader) → `plugins` (HtmlWebpackPlugin, MiniCssExtractPlugin, DefinePlugin) → `output`.
- `optimization.splitChunks`, dynamic `import()` for splitting, Module Federation (micro-frontends).
- The dev server bundles in memory, so it gets slow as apps grow. That's the main reason teams moved to Vite, Rspack or Turbopack.

## Create React App
`react-scripts` hid webpack, Babel, ESLint and Jest configuration behind one dependency (`eject` to customise).
It's deprecated because it was slow, unmaintained, and lacked routing, data fetching and SSR patterns. The React docs now recommend frameworks (Next.js, React Router) or Vite.
**Migration talking points:** swap the scripts, move `public/index.html` to the root `index.html` with a module script, rename `REACT_APP_` to `VITE_`, replace Jest with Vitest (a similar API), and fix `process.env` usages.

## Others to recognise
esbuild (Go), SWC (Rust, used by Next.js), Rspack (a Rust webpack-compatible bundler), Turbopack (Next.js), Parcel (zero-config), Bun's bundler.

## 🎤 Interview questions
<details><summary>Why is Vite's dev server fast?</summary>
It doesn't bundle your source in dev. The browser requests modules and Vite transforms only what's requested. Dependencies are pre-bundled once. HMR updates just the changed module and its boundary.
</details>
<details><summary>How do you reduce bundle size?</summary>
Route- and component-level code splitting, tree-shakeable imports, removing or replacing heavy dependencies (date libraries, lodash → native), a modern browser target (less transpiling and polyfilling), compression, and analysing chunks with a visualiser.
</details>

## Practise in Kanvas
`client/SETUP.md` (by hand) · `client/vite.config.js` · [lab 11](../../../labs/11-babel-jsx/README.md)
