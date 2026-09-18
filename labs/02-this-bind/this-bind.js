/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/02-this-bind/this-bind.js · Phase 2 · Day 1 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Re-implement call/apply/bind, fix the "lost this" problem in a class, and
 *   predict six `this` puzzles.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/this-binding.md
 *   the four binding rules · arrow functions (lexical this) · strict mode ·
 *   Symbols as collision-free keys · new.target · property descriptors
 *
 * 🧩 USED LATER BY
 *   client/src/app/ErrorBoundary.jsx and features/settings/LegacyClock.jsx (class components)
 *
 * 📝 STEPS
 *   1. myCall(fn, thisArg, ...args)
 *      a. If thisArg is null/undefined, use globalThis. Otherwise box it with Object(thisArg).
 *      b. Create a unique key with Symbol(), put fn on the context under that key,
 *         call it as a METHOD (context[key](...args)) so implicit binding sets `this`.
 *      c. Delete the temporary key (in a `finally`) and return the result.
 *      ✋ Don't use fn.call / fn.apply / fn.bind anywhere. The tests check this.
 *   2. myApply(fn, thisArg, argsArray): same, but the args come as an array (or undefined).
 *      Reuse myCall.
 *   3. myBind(fn, thisArg, ...presetArgs) → returns `bound(...laterArgs)`:
 *      - A normal call runs fn with thisArg and [...presetArgs, ...laterArgs].
 *      - When called with `new` (check `new.target`), IGNORE thisArg and return
 *        `new fn(...presetArgs, ...laterArgs)`, so `instanceof fn` still works.
 *   4. installPolyfills(): define Function.prototype.myCall / myApply / myBind with
 *      Object.defineProperty (enumerable: false, configurable: true, writable: true).
 *      Inside each method, `this` is the function the method was called on.
 *   5. class Toggle
 *      - constructor(initial = false) sets a public `on` property.
 *      - `toggle()` flips `on` and returns the new value, and must still work when detached:
 *          const { toggle } = new Toggle(); toggle();
 *        Pick ONE fix and be ready to explain the alternatives:
 *        (a) a class-field arrow function, or (b) binding in the constructor.
 *   6. predictions: fill in the answers from README.md.
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:02 is green
 *   [ ] you can recite the four binding rules and their priority
 *
 * 💡 HINTS
 *   - `const key = Symbol('fn')` can never clash with existing properties.
 *   - `new.target` is undefined in a normal call and the function itself under `new`.
 *
 * ⚠️ GOTCHAS
 *   - Arrow functions can't be used with `new` and ignore thisArg, so `bound` must be a regular function.
 *   - Forgetting `finally` leaves the temporary Symbol on the object if fn throws.
 *
 * 🎤 INTERVIEW ANGLE
 *   "Polyfill bind", "why does my handler lose this", "arrow vs regular function".
 *
 * 🚀 STRETCH ☆  preserve bound.name ("bound x") and bound.length
 *
 * 🤖 ASK THE AGENT
 *   /explain this binding rules · /hint labs/02-this-bind/this-bind.js myBind
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function myCall(fn, thisArg, ...args) {
  throw new Error('TODO: implement myCall');
}

export function myApply(fn, thisArg, argsArray) {
  throw new Error('TODO: implement myApply');
}

export function myBind(fn, thisArg, ...presetArgs) {
  throw new Error('TODO: implement myBind');
}

export function installPolyfills() {
  throw new Error('TODO: implement installPolyfills');
}

export class Toggle {
  constructor(initial = false) {
    throw new Error('TODO: implement Toggle');
  }
}

// Every answer is a STRING (see README.md).
export const predictions = {
  q1: undefined,
  q2: undefined,
  q3: undefined,
  q4: undefined,
  q5: undefined,
  q6: undefined,
};
