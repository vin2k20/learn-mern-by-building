# Prototypes & the object model

> **TL;DR:** every object has a hidden `[[Prototype]]` link. Property lookups walk this chain. `class` is (mostly) syntax sugar
> over constructor functions and prototypes, with some real differences.

## Mental model
```
const b = new BugTask()
b ──► BugTask.prototype ──► Task.prototype ──► Object.prototype ──► null
         constructor          constructor        hasOwnProperty, toString…
         toJSON()             complete()
BugTask ──► Task ──► Function.prototype          (static inheritance)
```
- `obj.__proto__` (legacy accessor) === `Object.getPrototypeOf(obj)`
- `Fn.prototype` is the object that **instances** link to. It is not Fn's own prototype.

## What `new Fn(args)` does
1. Creates an object whose `[[Prototype]]` is `Fn.prototype`
2. Calls `Fn` with `this` bound to that object
3. If `Fn` returns an object, that object is the result; otherwise the new object is

## class vs constructor function
| | `class` | `function` constructor |
|---|---|---|
| Calling without `new` | TypeError | works (with a bug-prone `this`) |
| Hoisting | TDZ | hoisted |
| Methods enumerable? | no | yes (if assigned) |
| Strict mode | always | opt-in |
| `#private` fields, `static` blocks | ✓ | ✗ |
| `super` | ✓ | manual `Parent.call(this)` |

## Properties & descriptors
```js
Object.defineProperty(obj, 'id', { value: 1, writable: false, enumerable: false, configurable: false });
Object.freeze(o)          // no add/remove/change (shallow)
Object.seal(o)            // no add/remove; can change values
Object.preventExtensions(o) // no add
```
Enumeration: `Object.keys` (own, enumerable, string keys) · `for…in` (**also inherited** enumerable keys) · `Reflect.ownKeys` (all own keys, including symbols and non-enumerable ones).

## Proxy & Reflect
A `Proxy` intercepts operations (`get`, `set`, `has`, `deleteProperty`, …). `Reflect` performs the default behaviour.
Vue 3 and MobX reactivity: `get` → track the dependency, `set` → trigger the re-render. Immer uses proxies to record "mutations" and produce immutable copies.

## Pitfalls
- Adding methods to `Child.prototype` *before* replacing it with `Object.create(...)`.
- Mutating built-in prototypes (`Array.prototype.foo = …`) in app code.
- Expecting `#private` to be readable in subclasses (it isn't) or via `obj['#x']`.
- `instanceof` fails across realms (iframes, jsdom vs Node). Use `Array.isArray` and duck typing.

## 🎤 Interview questions
<details><summary>How would you implement inheritance without class?</summary>
`Child.prototype = Object.create(Parent.prototype)`, restore `constructor`, call `Parent.call(this, …)` inside Child, and optionally `Object.setPrototypeOf(Child, Parent)` for statics.
</details>
<details><summary>What's the difference between `Object.create(null)` and `{}`?</summary>
`Object.create(null)` has no prototype (no `toString` or `hasOwnProperty`), which makes it a safe dictionary. `Map` is usually better anyway.
</details>

## Practise in Kanvas
[lab 03](../../../labs/03-object-model/README.md)
