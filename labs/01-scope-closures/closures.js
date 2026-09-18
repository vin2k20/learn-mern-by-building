/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/01-scope-closures/closures.js · Phase 2 · Day 1 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Implement five closure-based utilities and predict six scope/hoisting
 *   snippets. Run `npm run test:01` until everything is green.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/closures.md, docs/concepts/js/scope-hoisting-tdz.md
 *   lexical scope · block vs function scope · hoisting · TDZ · closures ·
 *   private state · higher-order functions · Map as a cache
 *
 * 🧩 USED LATER BY
 *   client/src/hooks/* (every hook is a closure) · createIdGenerator in the MSW mock
 *
 * 📝 STEPS
 *   1. createCounter(start = 0, step = 1)
 *      - Keep the current count in a local variable (NOT on the returned object).
 *      - Return an object with increment() and decrement(), which change the count by
 *        `step` and RETURN the new value, reset(), which goes back to `start` and returns it,
 *        and a read-only `value` getter (`get value() { ... }`, no setter).
 *   2. once(fn)
 *      - Return a function that calls fn the first time only, forwarding `this` and all args.
 *      - Later calls return the FIRST result without calling fn again.
 *   3. memoize(fn, resolver)
 *      - The cache key is resolver(...args) if a resolver is given, otherwise JSON.stringify(args).
 *      - Store results in a Map. On a hit, return the cached value; on a miss, call fn
 *        (keeping `this`), store the result and return it.
 *      - Attach the Map as `memoized.cache` and add `memoized.clear()` to empty it.
 *   4. createMultipliers(n)
 *      - Return an array of n functions where fns[i](x) === x * i.
 *      - Use a plain `for` loop and make sure each function captures its OWN i.
 *   5. createIdGenerator(prefix, width = 3)
 *      - next() returns `${prefix}_${number padded with zeros to width}`, starting at 1.
 *        e.g. createIdGenerator('t').next() → 't_001'
 *      - reset() starts the numbering again at 1. Each generator is independent.
 *   6. predictions
 *      - Read the snippets in README.md and write down what each one evaluates to.
 *        Don't run them first. Be honest, it's for you!
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:01 is fully green
 *   [ ] you can explain every prediction out loud (especially q1 vs q2, and q4)
 *
 * 💡 HINTS
 *   - A getter is defined inside an object literal as `get value() { return … }`.
 *   - `once`: you need two pieces of closed-over state (called? and result).
 *   - `String.prototype.padStart`
 *   - For `this` forwarding, use a regular `function` (not an arrow) and fn.apply(this, args).
 *
 * ⚠️ GOTCHAS
 *   - Test files are ES modules, so they run in STRICT mode: assigning to a getter-only
 *     property throws a TypeError (the tests rely on that).
 *   - memoize: `if (cache.get(key))` is a bug when the cached value is falsy. Use `cache.has(key)`.
 *
 * 🎤 INTERVIEW ANGLE
 *   "Explain closures", "fix the var-in-loop bug", "what is the TDZ", "implement once/memoize".
 *
 * 🚀 STRETCH ☆  memoize with maxSize · memoizeAsync (de-duplicate in-flight promises)
 *
 * 🤖 ASK THE AGENT
 *   /explain closures · /explain temporal dead zone · /hint labs/01-scope-closures/closures.js memoize
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function createCounter(start = 0, step = 1) {
  throw new Error('TODO: implement createCounter (see instructions above)');
}

export function once(fn) {
  throw new Error('TODO: implement once');
}

export function memoize(fn, resolver) {
  throw new Error('TODO: implement memoize');
}

export function createMultipliers(n) {
  throw new Error('TODO: implement createMultipliers');
}

export function createIdGenerator(prefix, width = 3) {
  throw new Error('TODO: implement createIdGenerator');
}

// Replace each `undefined` with your prediction (an array, string or number).
export const predictions = {
  q1: undefined, // e.g. [1, 2, 3]
  q2: undefined,
  q3: undefined, // an array of three strings
  q4: undefined, // an error name like 'TypeError', or 'no error'
  q5: undefined,
  q6: undefined,
};
