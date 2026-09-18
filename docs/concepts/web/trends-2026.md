# Frontend trends to talk about (as of Sept 2026)

> Senior job descriptions often ask for *"continued education and research into frontend development trends"*. Have 3–4 of these ready,
> each with **what it is, why it matters, and whether you'd adopt it** (be pragmatic). Check each item's current Baseline/support status before quoting it.

## React ecosystem
- **React 19.x**: Actions, `use`, `<Activity>`, `useEffectEvent`, and in 19.3 stable `<ViewTransition>` and Fragment refs. See [react-19-features](../react/react-19-features.md).
- **React Compiler 1.0**: automatic memoisation at build time, which changes how teams think about `useMemo`/`useCallback`.
- **Server Components & frameworks**: Next.js and React Router framework mode render on the server by default and ship less JS. CRA is deprecated, and the React docs recommend a framework, or Vite for SPAs.
- **React Router 8**: annual major releases, the `react-router-dom` merge completed, middleware on by default.
- **State:** server-state libraries (RTK Query, TanStack Query) plus small client stores. Signals are being discussed (a TC39 proposal).

## Tooling
- **Vite 8 + Rolldown + Oxc** (Rust): much faster builds with a single bundler for dev and prod. The VoidZero toolchain (Vitest, Oxlint).
- **Vitest** as the default test runner for Vite apps. **Playwright** for E2E.
- **Biome / Oxlint**: fast Rust linters and formatters alongside ESLint 10 (flat config only).
- **Node 24 LTS / Node 26**: built-in TypeScript type stripping, `node --test`, `--watch`, `--env-file`, `node:sqlite` (stable in 26). From Node 27, one major release a year.
- **TypeScript** everywhere. The native (Go) TypeScript compiler speeds up type-checking massively.

## Platform (CSS & HTML)
- **Container queries**, **`:has()`**, **native nesting**, **cascade layers**, **subgrid**: all Baseline now.
- **View Transitions** (same-document and cross-document), **scroll-driven animations**, **`@starting-style`**
- **Anchor positioning** + the **Popover API** + `<dialog>`: tooltips and menus without JS positioning libraries
- **Customizable `<select>`** (`appearance: base-select`), `field-sizing: content`
- **Speculation Rules API** for instant navigations (prerender)
- **Interop 20xx** and **Baseline** labels on MDN to judge browser support

## Performance & UX
- **INP** replaced FID as a Core Web Vital. The focus is on main-thread work and yielding (`scheduler.yield()`).
- Islands and partial hydration, streaming SSR, edge rendering
- **WebGPU** for heavy graphics and compute. `OffscreenCanvas` in workers.

## AI in frontend work
- AI-assisted coding and review in the IDE and CI (be ready to say how you verify AI output: tests, reviews, types).
- Built-in browser AI APIs (on-device models) are emerging. Streaming UI for LLM responses.
- Accessibility and testing automation using AI, with a human in the loop.

## How to answer "how do you keep up?"
Release notes (react.dev/blog, vite.dev/blog, nodejs.org), web.dev and MDN Baseline, the Chrome and WebKit blogs, State of JS/CSS surveys,
newsletters (e.g. JavaScript Weekly, Frontend Focus), conference talks, **and building small prototypes to validate hype**, like this project.
