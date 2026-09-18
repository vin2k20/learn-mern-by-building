/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/eslint.config.js · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   An ESLint 10 flat config that catches real bugs (hooks rules, accessibility) and stays out of
 *   Prettier's way.
 *
 * 🧠 CONCEPTS  → docs/concepts/tooling/eslint-prettier.md
 *
 * 📝 STEPS
 *   1. Imports: js from '@eslint/js', globals from 'globals', reactHooks from 'eslint-plugin-react-hooks',
 *      jsxA11y from 'eslint-plugin-jsx-a11y', { defineConfig } from 'eslint/config'
 *   2. export default defineConfig([ … ]) with, in order:
 *      a. { ignores: ['dist', 'coverage', 'public/mockServiceWorker.js'] }
 *      b. js.configs.recommended
 *      c. reactHooks.configs.flat.recommended      (the rules of hooks, exhaustive-deps, and the compiler-powered checks)
 *      d. jsxA11y.flatConfigs.recommended
 *      e. an object for files: ['**\/*.{js,jsx}'] with
 *         languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.browser },
 *                            parserOptions: { ecmaFeatures: { jsx: true } } }
 *         rules: 'no-unused-vars' (ignore names starting with an uppercase letter or _), 'eqeqeq', 'no-console' (warn; allow warn/error)
 *      f. an object for test files ('**\/*.test.{js,jsx}', 'src/test/**') adding globals.node plus the vitest globals
 *         (describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll as 'readonly')
 *      g. an object for vite.config.js / eslint.config.js with globals.node
 *   3. Run `npx eslint --inspect-config` and explore which rules apply to src/features/board/TaskCard.jsx.
 *   4. (Prettier owns formatting. If you ever enable stylistic rules, add eslint-config-prettier last.)
 *
 * ✅ DONE WHEN
 *   [ ] `npm run lint` passes on the instruction-only files
 *   [ ] Writing `if (x) useState()` in a component produces a rules-of-hooks error
 *   [ ] An <img> without alt produces a jsx-a11y error
 *
 * ⚠️ GOTCHAS  The `**\/` above is escaped only so this comment block doesn't end early. In your real
 *             code, write the glob normally (two asterisks, a slash, then *.{js,jsx}), without the backslash.
 * 🎤 INTERVIEW ANGLE  "What changed with ESLint flat config?", "how do you enforce quality in a team?"
 * 🤖 ASK THE AGENT    /explain eslint flat config
 * ═══════════════════════════════════════════════════════════════════════════
 */
