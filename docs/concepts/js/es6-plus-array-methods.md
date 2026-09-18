# ES6+ essentials & array methods

> **TL;DR:** know the modern syntax cold, and know which array methods **mutate** and which **return new arrays**.
> Immutability is what makes React and Redux change detection work.

## Syntax checklist (ES2015 → ES2025)
| Feature | Example |
|---|---|
| `let`/`const`, block scope | `const { id, ...rest } = task` |
| Arrow functions, default/rest params | `const sum = (...n) => n.reduce((a, b) => a + b, 0)` |
| Destructuring, spread | `const next = { ...state, user: { ...state.user, name } }` |
| Template literals | `` `${first} ${last}` `` |
| Classes, getters/setters, `#private`, `static` | see [prototypes](prototypes-object-model.md) |
| Modules | `import x, { y } from './m.js'` · dynamic `import()` |
| Promises, async/await | see [async](async-promises.md) |
| `Map`, `Set`, `WeakMap`, `WeakRef` | caches, dedupe, private metadata |
| Iterators, generators | `for…of`, `function*`, `Symbol.iterator` |
| Optional chaining, nullish coalescing | `user?.profile?.name ?? 'Anonymous'` |
| Logical assignment | `opts.retries ??= 3` |
| Numeric separators, BigInt | `1_000_000`, `10n` |
| `Object.groupBy`, `Map.groupBy` (ES2024) | `Object.groupBy(tasks, t => t.status)` |
| Change-array-by-copy (ES2023) | `toSorted`, `toReversed`, `toSpliced`, `with` |
| `Array.prototype.at`, `findLast` | `arr.at(-1)` |
| `structuredClone` | a deep copy (no functions or class prototypes) |
| `Promise.withResolvers` (ES2024) | `const { promise, resolve } = Promise.withResolvers()` |
| Set methods (ES2025) | `a.union(b)`, `a.intersection(b)`, `a.difference(b)` |
| Iterator helpers (ES2025) | `iter.map(f).filter(g).take(5).toArray()` |

## Mutating vs non-mutating
| Mutates ❌ (avoid on state) | Returns a new value ✅ |
|---|---|
| `push`, `pop`, `shift`, `unshift` | `concat`, `[...a, x]` |
| `splice` | `slice`, `toSpliced` |
| `sort`, `reverse` | `toSorted`, `toReversed` |
| `fill`, `copyWithin` | `with(index, value)` |
| `arr[i] = x` | `map`, `filter`, `reduce`, `flatMap` |

## Picking the right method
| Need | Method |
|---|---|
| transform each | `map` |
| keep some | `filter` |
| first match / its index | `find` / `findIndex` (`findLast` from the end) |
| any / all | `some` / `every` |
| accumulate into anything | `reduce` |
| flatten one level after mapping | `flatMap` |
| membership | `includes` (O(n)) → `Set.has` (O(1)) for repeated lookups |

## Complexity notes
- `includes`/`indexOf`/`find` are O(n). Inside a loop that becomes O(n²), so build a `Set` or `Map` first.
- `reduce` with `{...acc}` each iteration is O(n²). Mutating a *fresh* accumulator is fine.
- `shift`/`unshift` can be O(n). Use an index-based queue.

## 🎤 Interview questions
<details><summary>Remove duplicates from an array of objects by id.</summary>
<code>[...new Map(items.map(i => [i.id, i])).values()]</code> keeps the last occurrence of each id and first-insertion order.
</details>
<details><summary>`map` vs `forEach`?</summary>
`map` returns a new array (for transformation). `forEach` returns undefined (for side effects). Neither can be stopped early, so use `for…of`, `some` or `find` for that.
</details>

## Practise in Kanvas
[lab 04](../../../labs/04-array-methods/README.md) · `features/board/selectors.js`
