# Lab 01 · Scope, hoisting & closures ★

**Time box:** 60 min · **Run:** `npm run test:01` · **Primer:** [closures](../../docs/concepts/js/closures.md), [scope & TDZ](../../docs/concepts/js/scope-hoisting-tdz.md)

## Why this matters
Every React hook is a closure. Every "stale state" bug is a closure bug. And "what does this loop print?"
is one of the most common screening questions there is.

## Concepts
- Lexical scope, the scope chain, block scope (`let`/`const`) vs function scope (`var`)
- Hoisting: function declarations vs `var` vs `let`/`const` (the **temporal dead zone**)
- Closures: functions remembering the variables of the scope they were created in
- Private state via closures (the module pattern / IIFE) vs `#private` class fields
- Higher-order functions (`once`, `memoize`) and caching with `Map`

## Tasks (in `closures.js`)
1. `createCounter(start = 0, step = 1)` → `{ increment(), decrement(), reset(), value }` with truly private state.
2. `once(fn)` → a wrapper that runs `fn` at most once.
3. `memoize(fn, resolver?)` → caches results by key, and exposes `.cache` and `.clear()`.
4. `createMultipliers(n)` → the classic loop-closure exercise, done right.
5. `createIdGenerator(prefix, width = 3)` → `t_001`, `t_002`, …
6. **Predict the output**: fill in `predictions` *without running the code*. The tests run the real snippets and check your answers.

## Predict the output (answer in `predictions`)
```js
// q1
const out = [];
for (var i = 0; i < 3; i++) out.push(() => i);
out.map(f => f());                       // → ?

// q2: same as q1 but with `let i`

// q3
const log = [];
log.push(typeof a);
log.push(typeof fnDecl);
log.push(typeof fnExpr);
var a = 1;
function fnDecl() {}
var fnExpr = function () {};
log;                                     // → ?

// q4: what's the error's name? (or 'no error')
function q4() {
  try { x; return 'no error'; } catch (e) { return e.name; }
  let x = 1;
}

// q5
let count = 0;
const inc = () => ++count;
{ let count = 10; inc(); count++; }
count;                                   // → ?

// q6
const counter = (function () {
  let c = 0;
  return { inc: () => ++c, get: () => c };
})();
counter.inc(); counter.inc();
const { get } = counter;
[get(), typeof c];                       // → ?
```

## 🎤 Interview questions
1. What is a closure? Give a real use case other than counters.
2. Explain the temporal dead zone. Why was it added?
3. Why does q1 print what it prints? Give two ways to fix it.
4. How can a closure cause a memory leak? (Hint: event listeners, large captured objects.)
5. What is a "stale closure" in React? Which hook helps avoid it? (`useEffectEvent`, refs, functional updates)
6. `memoize` with `JSON.stringify` as the key: what are the downsides?

## Stretch ☆
- Add a `maxSize` option to `memoize` (evict the oldest entry). You'll build a proper LRU in lab 07.
- Write `memoizeAsync` that de-duplicates in-flight promises.
