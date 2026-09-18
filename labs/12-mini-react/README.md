# Lab 12 · Build a mini-React ★

**Time box:** 90 min core (+45 min ☆ useEffect) · **Run:** `npm run test:12` (`npm run test:stretch` for useEffect)
**Primers:** [Virtual DOM & reconciliation](../../docs/concepts/react/virtual-dom-reconciliation.md), [lifecycle](../../docs/concepts/react/lifecycle-class-vs-hooks.md), [hooks deep dive](../../docs/concepts/react/hooks-deep-dive.md)

## Why this matters
*"Complete understanding of ReactJS and its main fundamentals like JSX, Virtual DOM, component lifecycle."*
Nothing makes those answers crisper than having built a tiny version yourself. After this lab you'll be able to explain,
from experience: what a virtual node is, why keys matter, why hooks can't be called conditionally, what batching is,
and when effects run.

## What you'll build (about 150 lines)
```
h(type, props, ...children) ──► vnode tree ──► render(vnode, container)
                                                   │ first render: create DOM
                                                   │ next renders: diff old vs new → patch DOM
                                                   ▼
function components ──► called during render; hooks stored per instance (an array + an index)
setState ──► queue the update ──► queueMicrotask ──► re-render the root once (batching)
useEffect ☆ ──► runs AFTER the DOM is committed; cleanup before the next run and on unmount
```

## Suggested data model
```js
// vnode
{ type: 'li' | TEXT | Function, key: string | null, props: { ...attrs, children: vnode[] } }

// instance (your "fiber-lite"), one per mounted vnode
{ vnode, dom, childInstances: [] }                      // host element / text
{ vnode, dom, child: instance, hooks: [], root }        // function component (dom = child's dom)
```

## Reconciliation rules (the same heuristics React uses)
1. **Different type** → throw away the old subtree and build a new one.
2. **Same host type** → keep the DOM node and update only the changed props.
3. **Same text vnode** → update `nodeValue` if it changed.
4. **Children** → match old and new children by `key` (or by index if there's no key). Reuse matches, create new ones,
   remove leftovers, then make the DOM order match the new order.
5. **Same component type** → keep the instance (and its hooks!) and re-run the function with the new props.

## 🎤 Interview questions (answer them after the lab, out loud)
1. What is the Virtual DOM? Is it "faster than the DOM"? (Not inherently. It gives you declarative updates with *good enough* diffing.)
2. Explain reconciliation and the two heuristics that make it O(n).
3. Why are index keys a problem when items are inserted or reordered? Show the bug with inputs.
4. Why must hooks be called in the same order every render?
5. What is batching? What changed in React 18? (Automatic batching everywhere, not just in event handlers.)
6. `useEffect` vs `useLayoutEffect`: when do they run relative to paint?
7. What does Fiber add that your mini-React doesn't? (Interruptible rendering, priorities/lanes, time slicing, Suspense.)
8. What does the React Compiler change about memoization?

## Stretch ☆
- `useEffect` (tests gated behind `npm run test:stretch`).
- `useRef` and `useMemo`: about 10 lines each once hooks work.
- Only re-render the component that called setState instead of the whole root.
