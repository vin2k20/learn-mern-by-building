# Virtual DOM & reconciliation

> **TL;DR:** components return element trees (plain objects). On each update React **diffs** the new tree against the previous one
> and applies the minimal DOM changes. Two heuristics make this O(n): **different type → replace the subtree**, and **keys identify list items**.

## Render → commit
```
setState / props change
      │
      ▼
RENDER PHASE (pure, can be paused or restarted in concurrent mode)
  call components → new element tree → reconcile against the current Fiber tree → a list of effects
      │
      ▼
COMMIT PHASE (synchronous, can't be interrupted)
  mutate the DOM → useLayoutEffect / ref callbacks → browser paints → useEffect (passive effects)
```

## The diffing heuristics
1. **Different element type** (`<div>` → `<section>`, `ComponentA` → `ComponentB`) → unmount the old subtree (its state is lost) and mount the new one.
2. **Same host type** → keep the DOM node and patch the changed attributes.
3. **Same component type** → keep the instance and its state, and re-render with the new props.
4. **Children lists** → matched by `key` (or by index when there are no keys).

### Why index keys break things
```
Before: [key 0: "Buy milk" <input>]   insert at the top →   [key 0: "NEW" <input>]
        [key 1: "Walk dog" <input>]                          [key 1: "Buy milk" <input>]
                                                             [key 2: "Walk dog" <input>]
React thinks item 0 changed its text, and the <input> state typed for "Buy milk" now sits next to "NEW".
```
Use stable ids. Changing a `key` on purpose is also a way to **reset** a component's state.

## Fiber (what real React adds)
- Each element becomes a **fiber** (a unit of work with `child`/`sibling`/`return` pointers), so rendering can be **interrupted** and resumed.
- **Lanes** give updates priorities: urgent input vs transitions (`startTransition`) vs deferred values.
- A "double buffering" tree (current vs work-in-progress) means the commit is atomic.
- It enables Suspense, concurrent rendering, `<Activity>` (keeping hidden UI state) and `<ViewTransition>`.

## Is the Virtual DOM "fast"?
Not inherently. Updating the DOM directly with perfect knowledge is faster. The VDOM gives you **declarative UI with good-enough performance**
and a single place to optimise. Signals-based frameworks (Solid, Svelte 5, Angular signals) skip the diffing by tracking fine-grained dependencies.

## 🎤 Interview questions
<details><summary>What triggers a re-render?</summary>
A state change (via a setter/dispatch), a parent re-render (unless the child is memoised and its props are equal), or a context value change for consumers. A re-render doesn't necessarily mean a DOM change.
</details>
<details><summary>What's the difference between rendering and committing?</summary>
Rendering computes the next tree (pure, repeatable). Committing applies the DOM mutations and runs the effects.
</details>

## Practise in Kanvas
[lab 12](../../../labs/12-mini-react/README.md) · [lab 08 keyedDiff](../../../labs/08-algorithms/README.md) · React DevTools Profiler on the board
