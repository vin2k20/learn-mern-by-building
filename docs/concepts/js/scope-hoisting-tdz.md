# Scope, hoisting & the temporal dead zone

> **TL;DR:** `var` is function-scoped and hoisted as `undefined`. `let`/`const`/`class` are block-scoped and hoisted
> into the **TDZ** (accessing them before their declaration throws). Function declarations are hoisted with their body.

## Mental model
```
function outer() {                 // function scope
  // TDZ for `b` starts here ─────────────┐
  console.log(a);   // undefined (var)     │
  console.log(fn);  // [Function fn]       │
  if (true) {                              │
    let c = 1;      // block scope only    │
  }                                        │
  var a = 1;                               │
  let b = 2;        // TDZ ends ───────────┘
  function fn() {}
}
```
The scope **chain** is lexical: it's decided by where the code is *written*, not where it's called.

## Key points
| | `var` | `let` | `const` | function declaration | `class` |
|---|---|---|---|---|---|
| Scope | function | block | block | function/block* | block |
| Hoisted | yes (`undefined`) | yes (TDZ) | yes (TDZ) | yes (with body) | yes (TDZ) |
| Re-declare | allowed | ✗ | ✗ | allowed | ✗ |
| Re-assign | ✓ | ✓ | ✗ (the binding is constant; the object can still be mutated) | ✓ | ✓ |
| Global object property | yes (`window.x`) | no | no | yes | no |

\* Block-level function declarations have legacy quirks in sloppy mode. Avoid them.

- `typeof undeclared` is `'undefined'`, but `typeof x` inside x's TDZ **throws**.
- Default parameters have their own scope: `function f(a = b, b) {}` throws (b is in the TDZ).
- ES modules and classes are always strict mode.

## Pitfalls
- The `for (var i…)` closure bug (all callbacks see the final `i`). `let` creates a fresh binding per iteration.
- Accidental globals in sloppy mode (`x = 5` without a declaration). Strict mode throws instead.
- Shadowing a variable and then reading the outer one by mistake.

## 🎤 Interview questions
<details><summary>Why was the TDZ introduced?</summary>
To catch use-before-initialisation bugs, and to make `const` meaningful (a const must never be observed as `undefined`).
</details>
<details><summary>Is `let` hoisted?</summary>
Yes. The binding is created when the scope is entered (so it shadows outer variables straight away), but it's uninitialised until the declaration runs, which is the TDZ.
</details>

## Practise in Kanvas
[lab 01](../../../labs/01-scope-closures/README.md) predictions q1–q5
