# Lab 03 · The JavaScript object model ★

**Time box:** 90 min · **Run:** `npm run test:03` · **Primer:** [prototypes & object model](../../docs/concepts/js/prototypes-object-model.md), [design patterns](../../docs/concepts/js/design-patterns.md)

## Why this matters
Senior frontend job descriptions often ask for *"strong proficiency in JavaScript, object model"*. Expect questions like
"how does `class` work under the hood?", "what's the prototype chain?", "implement an EventEmitter", or
"how would you make an object observable?" (the idea behind MobX, Vue reactivity and Immer).

## Concepts
- `[[Prototype]]`, `__proto__` vs `.prototype`, `Object.create`, `Object.getPrototypeOf/setPrototypeOf`
- Constructor functions vs `class` (syntactic sugar, but with differences: TDZ, strict mode, non-enumerable methods)
- `extends`/`super`, static members, **`#private` fields**, getters/setters, `toJSON`
- Property descriptors: `writable`, `enumerable`, `configurable`, plus `Object.freeze` vs `seal` vs `preventExtensions`
- `Proxy` and `Reflect`: meta-programming for reactivity
- The **observer / pub-sub** pattern (EventEmitter)

## Tasks (in `object-model.js`)
1. `class EventEmitter`: `on`, `off`, `once`, `emit`, `listenerCount` (Node.js-like semantics).
2. `inherits(Child, Parent)`: ES5-style inheritance, including statics.
3. `class Task` + `class BugTask extends Task`: private fields, validation in a setter, `toJSON`, `static fromJSON`, static private counter.
4. `deepFreeze(obj)`: recursive and cycle-safe.
5. `createObservable(target, onChange)`: a `Proxy` that reports deep `set`/`delete` changes with a path.
6. `getPrototypeChain(obj)`: list the constructor names up the chain.

## Draw it (do this on paper before coding)
```
dog ──[[Prototype]]──► Dog.prototype ──[[Prototype]]──► Animal.prototype ──► Object.prototype ──► null
                          │ constructor: Dog                │ constructor: Animal
                          │ speak()                         │ speak()
Dog ──[[Prototype]]──► Animal  (so Dog.kingdom() works: static inheritance)
```

## 🎤 Interview questions
1. What does `new` do, step by step? (Four steps.)
2. `class` vs constructor function: list three real differences.
3. How are `#private` fields different from closures or `_underscore` conventions? Can a subclass read them?
4. `Object.freeze` is shallow. How do you deep-freeze? Why does Redux Toolkit freeze state in development?
5. How does Vue 3 / MobX reactivity work? (A Proxy `get` tracks, a `set` triggers.)
6. Design an EventEmitter. How do you handle a listener removing itself during `emit`?
7. What's the difference between `Object.keys`, `for…in` and `Reflect.ownKeys`?

## Stretch ☆
- Add `prependListener` and a `maxListeners` warning to the EventEmitter.
- Make `createObservable` batch changes and call `onChange` once per microtask with an array.
