# `this` binding

> **TL;DR:** `this` is decided by **how a function is called**, except in arrow functions, which take `this` from their surrounding scope.

## The rules (highest precedence first)
| Call site | `this` |
|---|---|
| `new Fn()` | the newly created object |
| `fn.call(obj)` / `apply` / a `bind`-ed function | `obj` (a bound function ignores later call/apply/bind, but `new` overrides it) |
| `obj.fn()` | `obj` |
| `fn()` | `undefined` in strict mode (modules, classes), `globalThis` in sloppy mode |
| arrow function | lexical: the `this` of the enclosing scope, which can't be changed |

## Common scenarios
```js
class Toggle {
  on = false;
  flip() { this.on = !this.on; }        // on the prototype; `this` is lost when detached
  flipArrow = () => { this.on = !this.on; } // an own property, with lexical this (the instance)
}
const t = new Toggle();
button.addEventListener('click', t.flip);      // ❌ this === button
button.addEventListener('click', t.flipArrow); // ✅
button.addEventListener('click', () => t.flip()); // ✅
```
- In a DOM listener declared with `function`, `this === event.currentTarget`.
- Array methods take a `thisArg`: `arr.map(fn, ctx)`.
- `setTimeout(obj.method)` loses `this`.

## Class-field arrows vs prototype methods
| | Prototype method | Class-field arrow |
|---|---|---|
| Memory | one shared function | one function **per instance** |
| `this` when detached | lost | bound |
| Overridable via `super.method()` | ✓ | ✗ (it isn't on the prototype) |
| Testable via `Class.prototype` spying | ✓ | ✗ |

## 🎤 Interview questions
<details><summary>Why did React class components need `.bind(this)`?</summary>
Because JSX passes the method as a detached reference (`onClick={this.handleClick}`). React calls it as a plain function, so `this` is undefined in strict class code.
</details>
<details><summary>Can you change `this` of an arrow function with call?</summary>
No. call/apply/bind can still pass arguments, but `this` stays lexical.
</details>

## Practise in Kanvas
[lab 02](../../../labs/02-this-bind/README.md) · `client/src/app/ErrorBoundary.jsx` · `features/settings/LegacyClock.jsx`
