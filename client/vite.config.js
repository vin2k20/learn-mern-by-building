/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/vite.config.js · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Configure Vite 8 for React: the plugin, the `@` alias, the dev proxy to the API, build
 *   options, and the Vitest test environment, all in one file.
 *
 * 🧠 CONCEPTS  → docs/concepts/tooling/bundlers-vite-webpack-cra.md, docs/concepts/web/http-caching-cors.md,
 *               docs/concepts/tooling/testing-mocha-vitest-rtl.md
 *
 * 📝 STEPS
 *   1. import { defineConfig } from 'vitest/config'   (the same as Vite's, plus typing for the `test` key)
 *      import react from '@vitejs/plugin-react'
 *      import { fileURLToPath, URL } from 'node:url'
 *   2. export default defineConfig({
 *        plugins: [react()],
 *        resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
 *        server: {
 *          port: 5173,
 *          proxy: { '/api': 'http://localhost:4000', '/graphql': 'http://localhost:4000' },
 *        },
 *        build: { sourcemap: true },
 *        test: {
 *          environment: 'jsdom',
 *          globals: true,                       // describe/it/expect without imports (optional; you can import them)
 *          setupFiles: ['./src/test/setup.js'],
 *          css: { modules: { classNameStrategy: 'non-scoped' } },   // readable class names in tests ☆
 *          restoreMocks: true,
 *        },
 *      })
 *   3. Explain in a comment: while VITE_USE_MOCKS=true, MSW intercepts fetches in the browser BEFORE they
 *      reach the proxy. When it's false (Day 7), the proxy forwards them to Express, so there's no CORS.
 *   4. ☆ Manual chunking: the Vite 8 bundler options live under build.rolldownOptions (build.rollupOptions is a
 *      deprecated alias). See the Rolldown docs for its code-splitting options and try putting react + react-dom +
 *      react-router in a "vendor" chunk. Compare the `vite build` output before and after. Is it better? Why or why not?
 *   5. ☆ React Compiler: @vitejs/plugin-react 6 supports it either through `react({ compiler: true })` (the experimental
 *      Rust port; needs oxc-transform-react) or through Babel (`reactCompilerPreset` + @rolldown/plugin-babel +
 *      babel-plugin-react-compiler). Read the plugin README, enable it, and compare the Profiler results from Phase 5.
 *
 * ✅ DONE WHEN
 *   [ ] `import X from '@/components/Button/Button.jsx'` resolves in the app AND in tests
 *   [ ] `npm run build` produces dist/ with source maps; route chunks appear once router.jsx uses lazy()
 *   [ ] `npm run test:run` finds src/test/setup.js
 *
 * ⚠️ GOTCHAS
 *   - The proxy only applies to the dev server, not to `vite preview` (configure preview.proxy if you need it there).
 *   - Environment variables: only `VITE_*` values are exposed via import.meta.env.
 *
 * 🎤 INTERVIEW ANGLE  "How do you avoid CORS in dev?", "how do you analyse and split bundles?"
 * 🤖 ASK THE AGENT    /explain vite proxy · /review client/vite.config.js
 * ═══════════════════════════════════════════════════════════════════════════
 */
