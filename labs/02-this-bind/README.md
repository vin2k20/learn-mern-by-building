# Lab 02 · `this`, call, apply, bind ★

**Time box:** 60 min · **Run:** `npm run test:02` · **Primer:** [this-binding](../../docs/concepts/js/this-binding.md)

## Why this matters
Event handlers, class components, callbacks passed to libraries: `this` is where rusty JavaScript breaks first.
"Write a polyfill for `bind`" is a top-10 frontend interview question.

## The four binding rules (highest priority first)
1. **`new` binding**: `new Fn()` → `this` is the new object.
2. **Explicit binding**: `fn.call(obj)`, `fn.apply(obj)`, `fn.bind(obj)`.
3. **Implicit binding**: `obj.fn()` → `this` is `obj` (lost when you detach: `const f = obj.fn`).
4. **Default binding**: plain `fn()` → `undefined` in strict mode (ES modules, classes), `globalThis` in sloppy mode.

Arrow functions **don't have their own `this`**. They use the `this` of the enclosing scope (lexical `this`) and ignore call/apply/bind.

## Tasks (in `this-bind.js`)
1. `myCall(fn, thisArg, ...args)`: **without** using `call`/`apply`/`bind`.
2. `myApply(fn, thisArg, argsArray)`
3. `myBind(fn, thisArg, ...presetArgs)`, including the tricky `new` case.
4. `installPolyfills()`: attach `myCall`/`myApply`/`myBind` to `Function.prototype` as **non-enumerable** methods.
5. `class Toggle`: a class whose `toggle` method still works when detached (like an `onClick={this.toggle}` handler).
6. **Predict the output**: fill in `predictions`.

## Predict the output (all snippets run in strict mode; every answer is a string)
```js
// q1
const obj = { name: 'obj', getName() { return this?.name; } };
const fn = obj.getName;
String(fn());                                        // → ?

// q2 (inside a plain function called as q2())
const o = { name: 'obj', regular() { return (() => this.name)(); }, arrow: () => typeof this };
[o.regular(), o.arrow()].join(',');                  // → ?

// q3
class Timer {
  constructor() { this.ticks = 0; }
  start(run) { run(function () { this.ticks += 1; }); }
}
const t = new Timer();
try { t.start((cb) => cb()); String(t.ticks); } catch (e) { e.name; }   // → ?

// q4
function who() { return this.name; }
const a = who.bind({ name: 'A' });
const b = a.bind({ name: 'B' });
b();                                                 // → ?

// q5
function Person(name) { this.name = name; }
const Bound = Person.bind({ name: 'ignored' });
const p = new Bound('Ada');
`${p.name}|${p instanceof Person}`;                  // → ?

// q6
const counter = { n: 0, inc() { this.n += 1; return this.n; } };
const other = { n: 41 };
String(counter.inc.call(other)) + '|' + counter.n;   // → ?
```

## 🎤 Interview questions
1. What are the rules that determine `this`? In what order do they apply?
2. Why do React class components need `this.handleClick = this.handleClick.bind(this)`? What are the alternatives?
3. `call` vs `apply` vs `bind`?
4. Can you re-bind a bound function? Why not? (q4)
5. What happens when you `new` a bound function? (q5)
6. What is `this` inside an arrow function defined in a class field?

## Stretch ☆
- Make `myBind` preserve `name` (`"bound fnName"`) and `length` (`max(0, fn.length - presetArgs.length)`).
