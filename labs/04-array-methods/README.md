# Lab 04 · ES6+ array methods & immutable data ★

**Time box:** 60 min · **Run:** `npm run test:04` · **Primer:** [ES6+ & array methods](../../docs/concepts/js/es6-plus-array-methods.md)

## Why this matters
Selectors, reducers and render lists are all `map`/`filter`/`reduce`. Job descriptions routinely list *"ES6 (variables and scoping, array methods)"*.
You'll also be asked to polyfill `map`/`filter`/`reduce`, and to update nested data immutably (Redux).

## Concepts
- `map`, `filter`, `reduce`, `find`, `findLast`, `some`, `every`, `flat`, `flatMap`, `at`, `includes`
- ES2023+ **non-mutating** methods: `toSorted`, `toReversed`, `toSpliced`, `with`
- `Object.groupBy`, `Object.entries/fromEntries`, `Set`, `Map`
- Sparse arrays (`[1, , 3]`) and why polyfills must skip holes (`i in arr`)
- Immutability and structural sharing: only copy what changed

## Tasks (in `array-methods.js`)
| Function | Must use |
|---|---|
| `myMap`, `myFilter`, `myReduce` | a plain `for` loop (no built-in `map`/`filter`/`reduce`) |
| `countByStatus(tasks)` | `reduce` |
| `groupByAssignee(tasks)` | `Object.groupBy` |
| `topAssignees(tasks, n)` | `reduce` + `toSorted` (no mutation) |
| `allLabels(tasks)` | `flatMap` + `Set` |
| `lastCompleted(tasks)` | `findLast` |
| `toColumns(tasks)` | builds the board's column → ids map (used again on Day 4!) |
| `paginate(items, page, pageSize)` | `slice` |
| `chunk(items, size)` | a loop or `Array.from` |
| `updateById(items, id, patch)` | `map` + spread (structural sharing) |

## 🎤 Interview questions
1. `map` vs `forEach`: when does it matter?
2. Implement `reduce`. What happens with an empty array and no initial value?
3. `sort` mutates. How do you sort a Redux array safely? (`toSorted` or `[...arr].sort`)
4. Why must reducers never mutate? How does React decide to re-render? (`Object.is` on state or props)
5. `for…of` vs `for…in` on arrays?
6. What's the time complexity of `includes` vs `Set.has`? When would you switch?

## Stretch ☆
- `myFlat(arr, depth = 1)` recursively and iteratively.
- Benchmark `reduce` with spread (`{...acc}`, O(n²)) vs mutation of the accumulator (O(n)). Why is the second fine inside `reduce`?
