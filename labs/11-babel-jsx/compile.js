/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/11-babel-jsx/compile.js · Phase 2 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Use Babel's JavaScript API (@babel/core) to compile code three ways.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/jsx-and-babel.md
 *
 * 📝 STEPS
 *   0. import { transformSync } from '@babel/core'
 *      Every call must pass { configFile: false, babelrc: false } so that stray config files
 *      can't change the result, and must return ONLY the generated code string (result.code).
 *   1. compileClassic(code, { pragma, pragmaFrag } = {})
 *      presets: [['@babel/preset-react', { runtime: 'classic', pragma, pragmaFrag }]]
 *      (undefined options fall back to Babel's defaults: React.createElement / React.Fragment)
 *   2. compileAutomatic(code, { importSource, development = false } = {})
 *      presets: [['@babel/preset-react', { runtime: 'automatic', development, importSource }]]
 *      (importSource undefined → 'react')
 *   3. compileForLegacy(code, targets = { chrome: '40' })
 *      presets: [['@babel/preset-env', { targets }]]
 *
 * ✅ DONE WHEN  [ ] the compile.js tests in `npm run test:11` pass
 *
 * ⚠️ GOTCHAS
 *   - Babel 8 is ESM-only.
 *   - `pragma` only exists for the classic runtime. Passing it with runtime: 'automatic' throws.
 *   - With the automatic runtime, Babel's default for `development` depends on the environment
 *     (BABEL_ENV / NODE_ENV). That's why this function makes it explicit.
 *
 * 🤖 ASK THE AGENT  /explain babel presets vs plugins
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function compileClassic(code, options = {}) {
  throw new Error('TODO: implement compileClassic');
}

export function compileAutomatic(code, options = {}) {
  throw new Error('TODO: implement compileAutomatic');
}

export function compileForLegacy(code, targets = { chrome: '40' }) {
  throw new Error('TODO: implement compileForLegacy');
}
