/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/11-babel-jsx/remove-console-plugin.js · Phase 2 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Write a Babel plugin that strips console calls from production code, and learn how
 *   the tools you use every day (the React Compiler, styled-components, i18n) work inside.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/jsx-and-babel.md
 *   AST node types (CallExpression, MemberExpression, Identifier, StringLiteral) ·
 *   visitors · path.remove() / path.replaceWith() · plugin options (state.opts) · scope bindings
 *   Explore ASTs interactively at https://astexplorer.net (choose @babel/parser).
 *
 * 📝 STEPS
 *   1. `export default function removeConsole(api) { const t = api.types; return { name, visitor } }`
 *   2. visitor.CallExpression(path, state):
 *      a. exclude = state.opts.exclude ?? ['error', 'warn']
 *         Only these console methods are ever removed (minus the excluded ones):
 *         const METHODS = ['log', 'info', 'debug', 'trace', 'table', 'dir', 'group', 'groupEnd',
 *                          'time', 'timeEnd', 'count', 'assert', 'warn', 'error']
 *      b. The callee must be a MemberExpression whose object is the Identifier `console`.
 *      c. Method name: property.name when not computed; property.value when computed with a
 *         StringLiteral (console['debug']). Anything else → leave it alone.
 *      d. If the name is not in METHODS, or is in exclude → leave it alone.
 *      e. If the call's parent is an ExpressionStatement → remove the whole statement.
 *         Otherwise (e.g. `a && console.log(x)`) → replace the call with `void 0`
 *         (t.unaryExpression('void', t.numericLiteral(0))).
 *   3. ☆ If `console` is a LOCAL binding (a function parameter named console), don't touch it:
 *      path.scope.hasBinding('console').
 *
 * ✅ DONE WHEN  [ ] the plugin tests in `npm run test:11` pass (☆ with npm run test:stretch)
 *
 * ⚠️ GOTCHAS
 *   - `myconsole.log()` and `console.logger()` must survive. Compare names exactly (no regex/startsWith).
 *   - Removing a call also removes its arguments' side effects (`console.log(save())`). Mention this trade-off in interviews.
 *
 * 🎤 INTERVIEW ANGLE  "How do Babel plugins work?", "what is an AST?", "how does tree shaking differ?"
 * 🤖 ASK THE AGENT    /explain babel AST visitor pattern · /hint labs/11-babel-jsx/remove-console-plugin.js step 2
 * ═══════════════════════════════════════════════════════════════════════════
 */

export default function removeConsole(api) {
  throw new Error('TODO: implement the removeConsole Babel plugin');
}
