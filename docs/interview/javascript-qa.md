# JavaScript interview Q&A

Answer each question **out loud** before opening the answer. Mark the ones you missed and re-quiz them with `/quiz`.

## Language core
<details><summary>1. What are the primitive types? How is `typeof null` a bug?</summary>
string, number, bigint, boolean, undefined, symbol, null. <code>typeof null === 'object'</code> is a legacy bug from the original type tagging.
</details>
<details><summary>2. `==` vs `===` vs `Object.is`?</summary>
<code>==</code> coerces types. <code>===</code> doesn't. <code>Object.is</code> is like === except <code>Object.is(NaN, NaN)</code> is true and <code>Object.is(0, -0)</code> is false (React uses it to compare state).
</details>
<details><summary>3. Explain hoisting and the TDZ.</summary>
Declarations are registered before the code runs. var → undefined, functions → fully initialised, let/const/class → uninitialised (TDZ) until their line runs. See the scope primer.
</details>
<details><summary>4. What is a closure? A practical example?</summary>
A function plus its lexical environment. Examples: debounce timers, private module state, React hooks capturing the props of their render.
</details>
<details><summary>5. How is `this` determined?</summary>
new > explicit (call/apply/bind) > implicit (obj.fn()) > default (undefined in strict mode). Arrows are lexical.
</details>
<details><summary>6. Explain the prototype chain. What does `new` do?</summary>
Lookups walk [[Prototype]] links. <code>new</code> creates an object linked to <code>Fn.prototype</code>, calls Fn with that object as this, and returns it (unless Fn returns an object).
</details>
<details><summary>7. Shallow vs deep copy? How do you deep-copy?</summary>
Spread and Object.assign copy one level. For deep copies: <code>structuredClone</code> (no functions or class prototypes), a custom recursive clone (lab 06), or immutable updates that copy only the changed path.
</details>
<details><summary>8. What are generators and iterators used for?</summary>
Lazy sequences, custom iteration (<code>Symbol.iterator</code>), pausing and resuming control flow (redux-saga is built on them), and paginated fetchers (async generators with <code>for await</code>).
</details>
<details><summary>9. WeakMap vs Map?</summary>
WeakMap keys must be objects and are held weakly (they don't prevent GC), and it isn't iterable. Use it for private or per-object metadata and caches keyed by DOM nodes.
</details>
<details><summary>10. What does `"use strict"` change?</summary>
No accidental globals, `this` is undefined in plain calls, assigning to read-only properties throws, no `with`, no duplicate parameter names. Modules and classes are always strict.
</details>

## Async
<details><summary>11. Order: sync log, setTimeout, Promise.then, queueMicrotask?</summary>
Sync → microtasks (then/queueMicrotask in registration order) → timers.
</details>
<details><summary>12. How do you cancel a fetch? How do you handle race conditions in search?</summary>
AbortController: abort the previous request on each keystroke (or in the effect cleanup). Alternatively, tag requests and ignore stale responses.
</details>
<details><summary>13. Promise.all vs allSettled vs race vs any?</summary>
See the async primer table. all fails fast; allSettled never rejects; race settles with the first result; any takes the first success, or an AggregateError.
</details>
<details><summary>14. What happens to an unhandled rejection?</summary>
Browsers fire `unhandledrejection` and log it. Node (15+) crashes the process by default. Always handle rejections.
</details>

## DOM & browser
<details><summary>15. Event delegation: how and why?</summary>
One listener on an ancestor, using event.target.closest(selector). Fewer listeners, it works for dynamic children, and it's what React does at the root.
</details>
<details><summary>16. Capture vs bubble; stopPropagation vs preventDefault?</summary>
Events go capture (down) → target → bubble (up). stopPropagation stops the travel. preventDefault cancels the browser's default action.
</details>
<details><summary>17. localStorage vs sessionStorage vs cookies vs IndexedDB?</summary>
localStorage persists (~5 MB, synchronous, strings only). sessionStorage lasts for the tab. Cookies are sent with requests (small; HttpOnly for security). IndexedDB is asynchronous, large, structured, and works in workers.
</details>
<details><summary>18. What is CORS?</summary>
A browser mechanism where servers opt in to cross-origin requests via Access-Control-* headers. Non-simple requests trigger a preflight OPTIONS request.
</details>
<details><summary>19. How would you implement infinite scroll?</summary>
An IntersectionObserver on a sentinel element, a loading guard, a cursor, and virtualisation for big lists. See the DOM primer.
</details>
<details><summary>20. What causes a reflow, and how do you avoid layout thrashing?</summary>
Geometry changes and layout reads. Batch the reads before the writes, use transforms, and use rAF.
</details>

## Data structures
<details><summary>21. Design an LRU cache with O(1) operations.</summary>
A hash map from key to a node in a doubly linked list (most recent at the head). get: move to the head. put: insert at the head, and evict the tail when over capacity. In JS, a Map's insertion order gives a very short version.
</details>
<details><summary>22. Implement autocomplete for 100k items.</summary>
A Trie (prefix search in O(k)) with ranked results; debounce the input; cache the results; virtualise the list; or search on the server with an index. Mention the memory trade-off.
</details>
<details><summary>23. Detect a cycle in dependencies.</summary>
Kahn's topological sort (in-degree queue): if the sorted count is less than the node count, there's a cycle. Or DFS with white/grey/black colouring.
</details>
<details><summary>24. When would you use a heap?</summary>
Priority queues (schedulers, top-K, "next urgent task", merging sorted streams). O(log n) push and pop.
</details>
<details><summary>25. Queue in JS with O(1) dequeue?</summary>
Two indexes over an object or Map, a linked list, or a ring buffer. Array.shift is O(n) in the worst case.
</details>

## Coding warm-ups (write them without help)
`debounce` · `throttle` · `Promise.all` · `bind` · `deepClone` · `flatten` · `curry` · `EventEmitter` · `memoize` · `get(obj, path)` · `LRUCache` ·
`groupBy` · `chunk` · `isBalanced` · `twoSum` · `retry with backoff` · `mapLimit`. All of them are in the labs.
