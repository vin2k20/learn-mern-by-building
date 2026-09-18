/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/04-array-methods/array-methods.js · Phase 2 · Day 1 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Polyfill map/filter/reduce, then use modern array methods to wrangle
 *   Kanvas task data exactly like the board's selectors will on Day 4.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/es6-plus-array-methods.md
 *
 * 🧩 DATA SHAPE (a subset of docs/api-contract.md)
 *   { id, title, status: 'todo'|'in_progress'|'review'|'done', assigneeId: string|null,
 *     labels: string[], order: number, estimate: number }
 *
 * 🧩 USED LATER BY
 *   client/src/features/board/selectors.js (toColumns, countByStatus)
 *   client/src/features/dashboard (topAssignees) · every reducer (updateById)
 *
 * 📝 STEPS
 *   1. myMap(arr, callback, thisArg)
 *      - Return a NEW array of the same length. Call callback.call(thisArg, value, index, arr)
 *        only for indexes that exist (`i in arr`), so holes stay holes.
 *   2. myFilter(arr, callback, thisArg): same rules, keep the items where callback is truthy.
 *   3. myReduce(arr, callback, ...rest)
 *      - Use rest.length to tell "no initial value" apart from "initial value is undefined".
 *      - With no initial value: start from the first EXISTING element. If there is none,
 *        throw a TypeError ('Reduce of empty array with no initial value').
 *      - callback(acc, value, index, arr). Skip holes.
 *   4. countByStatus(tasks) → { todo: n, in_progress: n, review: n, done: n } (always all four keys).
 *   5. groupByAssignee(tasks) → { [assigneeId]: Task[] }, using the key 'unassigned' for null.
 *   6. topAssignees(tasks, n) → [{ assigneeId, points }] with the n highest total `estimate`s.
 *      Ignore unassigned tasks. Sort by points (descending), then assigneeId (ascending).
 *      Don't mutate the input.
 *   7. allLabels(tasks) → a sorted array of unique labels.
 *   8. lastCompleted(tasks) → the LAST task in array order whose status is 'done' (or undefined).
 *   9. toColumns(tasks) → { todo: id[], in_progress: id[], review: id[], done: id[] }
 *      where the ids in each column are sorted by `order` (ascending). Always include all four keys.
 *  10. paginate(items, page, pageSize) → { items, page, totalPages, hasNext }
 *      Pages are 1-based. Clamp page into [1, totalPages]. totalPages is at least 1.
 *  11. chunk(items, size) → [[...], [...], ...]. Throw a RangeError if size < 1.
 *  12. updateById(items, id, patch) → a NEW array where the matching item is replaced by
 *      { ...item, ...patch }. Every other item keeps the SAME reference. If there's no match,
 *      return the original array reference (nothing changed, so there's no re-render).
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:04 is green
 *   [ ] no function mutates its input (the tests freeze the fixtures)
 *
 * 💡 HINTS
 *   - Object.groupBy(items, fn) returns a null-prototype object.
 *   - arr.toSorted((a, b) => b.points - a.points || a.assigneeId.localeCompare(b.assigneeId))
 *   - Math.ceil, Math.min, Math.max
 *
 * ⚠️ GOTCHAS
 *   - `reduce` with `{...acc, [k]: v}` in a loop is O(n²). Mutating the accumulator you created is fine.
 *   - Object.groupBy's result has no prototype, so chai deep equality still works, but `.hasOwnProperty` doesn't exist on it.
 *
 * 🎤 INTERVIEW ANGLE
 *   "Polyfill reduce", "remove duplicates", "group by", "update nested state immutably".
 *
 * 🚀 STRETCH ☆  myFlat(arr, depth) · benchmark spread-in-reduce vs mutation
 *
 * 🤖 ASK THE AGENT
 *   /explain structural sharing · /hint labs/04-array-methods/array-methods.js myReduce
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function myMap(arr, callback, thisArg) {
  throw new Error('TODO: implement myMap');
}

export function myFilter(arr, callback, thisArg) {
  throw new Error('TODO: implement myFilter');
}

export function myReduce(arr, callback, ...rest) {
  throw new Error('TODO: implement myReduce');
}

export function countByStatus(tasks) {
  throw new Error('TODO: implement countByStatus');
}

export function groupByAssignee(tasks) {
  throw new Error('TODO: implement groupByAssignee');
}

export function topAssignees(tasks, n) {
  throw new Error('TODO: implement topAssignees');
}

export function allLabels(tasks) {
  throw new Error('TODO: implement allLabels');
}

export function lastCompleted(tasks) {
  throw new Error('TODO: implement lastCompleted');
}

export function toColumns(tasks) {
  throw new Error('TODO: implement toColumns');
}

export function paginate(items, page, pageSize) {
  throw new Error('TODO: implement paginate');
}

export function chunk(items, size) {
  throw new Error('TODO: implement chunk');
}

export function updateById(items, id, patch) {
  throw new Error('TODO: implement updateById');
}
