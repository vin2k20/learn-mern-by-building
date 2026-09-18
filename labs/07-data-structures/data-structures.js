/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/07-data-structures/data-structures.js · Phase 2 · Day 2 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Implement 8 data structures that Kanvas features rely on, with the target
 *   complexities from README.md.
 *
 * 🧠 CONCEPTS  → README.md table · docs/concepts/js/design-patterns.md
 *   Big-O · Map insertion order · heaps · tries · graphs (Kahn's algorithm) ·
 *   iterators (Symbol.iterator) · getters · the command pattern
 *
 * 🧩 USED LATER BY (copy your implementations into client/src/lib/dataStructures.js on Day 3)
 *   Trie → features/search/CommandPalette.jsx · LRUCache → lib/httpClient.js
 *   Graph → features/board (task dependencies) and server/src/controllers/tasks.controller.js (validation)
 *   History → hooks/useUndoRedo.js · Stack → features/whiteboard/drawingEngine.js
 *
 * 📝 STEPS
 *   1. Stack
 *      push(v) → returns the new size · pop() / peek() → undefined when empty ·
 *      get size · isEmpty() · toArray() (bottom → top, a copy) · clear()
 *   2. Queue (O(1) dequeue, so NO Array.prototype.shift; the tests check this)
 *      Use an object/Map with head and tail indexes, or a linked list.
 *      enqueue(v) → new size · dequeue() / peek() → undefined when empty ·
 *      get size · isEmpty() · [Symbol.iterator]() yields items front → back
 *   3. LinkedList (singly linked, with head and tail pointers)
 *      append(v) · prepend(v) · find(predicate) → value | undefined ·
 *      remove(value) → boolean (first occurrence; keep `tail` correct!) ·
 *      reverse() → this (in place) · toArray() · get size ·
 *      *[Symbol.iterator]() · static fromArray(arr)
 *   4. LRUCache(capacity, { onEvict } = {})
 *      - capacity < 1 → throw a RangeError.
 *      - get(key) → value | undefined, and marks the key as most recently used.
 *      - set(key, value) → inserts or updates (the key becomes most recent). When size exceeds
 *        capacity, evict the LEAST recently used key and call onEvict?.(key, value). Returns this.
 *      - has(key) → boolean (does NOT change recency) · delete(key) → boolean (no onEvict)
 *      - get size · keys() → array from least to most recently used
 *   5. Trie (case-insensitive)
 *      - insert(word, weight = 1): match on word.toLowerCase(). Store the ORIGINAL spelling from
 *        the first insert. Inserting an existing word ADDS weight.
 *      - has(word) → exact match only · startsWith(prefix) → boolean
 *      - suggest(prefix, limit = 5) → original words that start with the prefix, sorted by weight
 *        (descending), then alphabetically by lowercase word (ascending). suggest('') searches all words.
 *      - delete(word) → boolean. Prune empty branches so startsWith() becomes false when no words remain.
 *      - get size → number of distinct words
 *   6. MinHeap(compare = (a, b) => a - b)
 *      push(v) · pop() → the smallest (undefined when empty) · peek() · get size
 *      Implement siftUp and siftDown on an array.
 *   7. Graph (directed; an edge A → B means "A must be done before B")
 *      addNode(id) · addEdge(from, to) (adds missing nodes) · removeEdge(from, to) ·
 *      removeNode(id) (also removes the edges pointing to it) · hasNode(id) ·
 *      neighbors(id) → array (insertion order) · nodes() → array (insertion order) ·
 *      hasPath(from, to) → BFS/DFS (true when from === to and the node exists) ·
 *      wouldCreateCycle(from, to) → true if adding the edge would create a cycle (doesn't modify the graph) ·
 *      topoSort() → every node, dependencies first (Kahn's algorithm). On a cycle, throw an Error
 *      whose name is 'CycleError'.
 *   8. History(initial, { limit = 50 } = {})   ← undo/redo
 *      get present · push(state) (clears the redo stack) · undo() → the new present (or the same one
 *      if there's nothing to undo) · redo() · get canUndo · get canRedo ·
 *      Keep at most `limit` past states (drop the OLDEST).
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:07 is green
 *   [ ] you can state the time complexity of every method out loud
 *
 * 💡 HINTS
 *   - `class X { *[Symbol.iterator]() { ... yield value ... } }`
 *   - LRU with Map: map.keys().next().value is the least recently used key.
 *   - Trie node: { children: new Map(), word: null, weight: 0 }
 *
 * ⚠️ GOTCHAS
 *   - LinkedList.remove of the TAIL must move `tail` back, or the next append will be lost.
 *   - LRUCache.get must use has(): cached values can be falsy (0, '', false).
 *   - A heap pop on a 1-element heap: take the last element carefully.
 *
 * 🎤 INTERVIEW ANGLE
 *   "Design an LRU cache", "implement autocomplete", "detect cycles", "undo/redo design".
 *
 * 🚀 STRETCH ☆  LRU ttl · History with patches · Trie match highlighting
 *
 * 🤖 ASK THE AGENT
 *   /explain LRU cache doubly linked list · /explain Kahn topological sort ·
 *   /hint labs/07-data-structures/data-structures.js MinHeap
 * ═══════════════════════════════════════════════════════════════════════════
 */

const todo = (name) => {
  throw new Error(`TODO: implement ${name}`);
};

export class Stack {
  constructor() {
    todo('Stack');
  }
}

export class Queue {
  constructor() {
    todo('Queue');
  }
}

export class LinkedList {
  constructor() {
    todo('LinkedList');
  }

  static fromArray(arr) {
    todo('LinkedList.fromArray');
  }
}

export class LRUCache {
  constructor(capacity, { onEvict } = {}) {
    todo('LRUCache');
  }
}

export class Trie {
  constructor() {
    todo('Trie');
  }
}

export class MinHeap {
  constructor(compare = (a, b) => a - b) {
    todo('MinHeap');
  }
}

export class Graph {
  constructor() {
    todo('Graph');
  }
}

export class History {
  constructor(initial, { limit = 50 } = {}) {
    todo('History');
  }
}
