# Lab 07 · Data structures ★

**Time box:** 2.5 h · **Run:** `npm run test:07` · **Primer:** [design patterns](../../docs/concepts/js/design-patterns.md) · **Q&A:** [javascript-qa](../../docs/interview/javascript-qa.md#data-structures)

## Why this matters
Senior roles ask for *"data structures, algorithms"* and *"highly-optimised code using appropriate design patterns and data structures"*.
In frontend interviews that usually means: *pick the right structure for a UI problem and state its complexity*.
Every structure here is used by a real Kanvas feature.

| Structure | Kanvas feature | Key operations & target complexity |
|---|---|---|
| `Stack` | whiteboard undo | push / pop / peek: O(1) |
| `Queue` | toast queue, BFS | enqueue / dequeue: **O(1)** (no `shift()`!) |
| `LinkedList` | (interview classic), LRU internals | append / prepend O(1), remove O(n), reverse O(n) |
| `LRUCache` | `lib/httpClient.js` GET cache | get / set: O(1) |
| `Trie` | command palette autocomplete | insert O(k), prefix search O(k + results) |
| `MinHeap` | "next most urgent task", scheduling | push / pop O(log n), peek O(1) |
| `Graph` | task dependencies (can't finish B before A) | topoSort O(V + E), cycle detection |
| `History` | board & canvas undo/redo | undo / redo / push: O(1) (amortised) |

## Tips
- Think about **invariants** first (e.g. "the heap parent is ≤ its children", "the Map's insertion order is recency order").
- JavaScript's `Map` keeps insertion order. That makes an LRU cache very short (delete then re-set to "touch" a key).
  Be ready to also explain the classic **hash map + doubly linked list** design.
- Heap index math: `parent = (i - 1) >> 1`, `left = 2i + 1`, `right = 2i + 2`.
- Topological sort: **Kahn's algorithm** (in-degree plus a queue). If you output fewer nodes than exist, there's a cycle.

## 🎤 Interview questions
1. Design an LRU cache with O(1) get/put. Why a doubly linked list rather than a singly linked one?
2. How would you implement autocomplete for 100k product names? Trie vs sorted array + binary search vs server-side search.
3. How does `Array.prototype.shift` affect a queue's complexity? How do you avoid it?
4. Detect a cycle in task dependencies. What's the complexity?
5. How would you implement undo/redo in a drawing app? (Command pattern vs snapshots, and the memory trade-offs.)
6. When is a `Map` better than a plain object? When is a `WeakMap` the right tool?

## Stretch ☆
- `LRUCache` with a `ttl` (time-based expiry).
- `Trie.suggest` that returns matches highlighted, e.g. `{ word, prefixLength }`.
- `History` that stores **patches** (diffs) instead of full snapshots.
