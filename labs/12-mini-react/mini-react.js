/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/12-mini-react/mini-react.js · Phase 2 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Implement a tiny React: h() → virtual nodes, render() with keyed
 *   reconciliation, function components, useState with batching (and ☆ useEffect).
 *
 * 🧠 CONCEPTS  → README.md · docs/concepts/react/virtual-dom-reconciliation.md ·
 *               docs/concepts/react/hooks-deep-dive.md
 *
 * 🧩 DEPENDS ON  lab 09 (DOM APIs) · lab 11 (what JSX compiles to) · lab 08 keyedDiff (optional)
 *
 * 📝 STEPS
 *   1. TEXT constant (already exported below) marks text vnodes.
 *   2. h(type, props, ...children)
 *      - const { key = null, ...rest } = props ?? {}
 *      - children: flat(Infinity), drop null/undefined/true/false (but KEEP 0),
 *        turn strings/numbers into { type: TEXT, key: null, props: { nodeValue: String(x), children: [] } }
 *      - return { type, key, props: { ...rest, children } }
 *   3. Props helper: updateProps(dom, prevProps, nextProps)
 *      - skip 'children' and 'key'
 *      - /^on[A-Z]/ → event listeners: lowercase the name after "on". Remove the old listener
 *        when it changed or disappeared, and add the new one.
 *      - 'style' (an object): set new keys, and reset removed keys to ''.
 *      - 'className' → dom.className · 'value' and 'checked' → DOM properties
 *      - null/undefined/false → removeAttribute · true → setAttribute(name, '') · else setAttribute(name, String(v))
 *      - props that disappeared → remove them.
 *   4. instantiate(vnode, root) → instance
 *      - TEXT → document.createTextNode
 *      - string type → document.createElement, updateProps(dom, {}, props), then instantiate and append the children
 *      - function type → create an instance { vnode, root, hooks: [] }, call the component (see step 6),
 *        and instantiate its output as `child`. instance.dom = child.dom
 *        (a component returning null → render an EMPTY TEXT NODE as a placeholder)
 *   5. reconcile(parentDom, instance, vnode, root) → the new instance (or null)
 *      - no instance → instantiate and append · no vnode → unmount and remove
 *      - type changed → instantiate, parentDom.replaceChild(new.dom, old.dom), unmount the old one
 *      - TEXT → update nodeValue if it changed
 *      - host → updateProps, then reconcileChildren
 *      - component → store the new vnode, re-run the component, reconcile its child, update instance.dom
 *      reconcileChildren(instance, newChildVNodes, root):
 *      - map the old child instances by (key ?? `__index_${i}`)
 *      - for each new child: reuse the old instance with the same key AND the same type (reconcile it),
 *        otherwise instantiate a new one
 *      - unmount and remove the old instances that weren't reused
 *      - walk the new list and insertBefore(dom, parent.childNodes[i]) whenever a node is out of place
 *   6. Hooks runtime
 *      - module-level `currentInstance` and `hookIndex`. Set them before calling a component and reset them after.
 *      - useState(initial): hooks[hookIndex++] holds { state, queue: [] }. Initialise lazily
 *        (if initial is a function, call it ONCE). On every render, apply the queued updates in order
 *        (a function → updater(prev), otherwise the value itself), then clear the queue.
 *      - setState(action): ignore it if the instance is unmounted. Push the action onto the queue and schedule
 *        a re-render of instance.root. The setter must be STABLE (the same function every render).
 *      - Scheduling: collect the dirty roots in a Set and flush them ONCE in queueMicrotask.
 *        That's batching: several setState calls in one handler → one render.
 *      - render(vnode, container): keep a WeakMap container → { vnode, instance }. Re-rendering a root
 *        = reconcile(container, previousInstance, storedVnode, container).
 *   7. unmount(instance): mark it unmounted, run the effect cleanups (☆), and recurse into its children.
 *   8. ☆ useEffect(effect, deps)
 *      - Compare deps with Object.is. No deps → run after every render. [] → run once.
 *      - Don't run it during render: push it onto a pendingEffects list and run the list at the END of render()
 *        (after the DOM has been updated). Run the previous cleanup first.
 *      - Unmount → run the cleanups in hook order.
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:12 is green (☆ npm run test:stretch for useEffect)
 *   [ ] you can explain why the "stale value" test expects '1-2'
 *
 * 💡 HINTS
 *   - node.isConnected, parent.insertBefore(node, refOrNull)
 *   - In reconcileChildren, compare parent.childNodes[i] !== newInstance.dom before moving
 *
 * ⚠️ GOTCHAS
 *   - Calling hooks for a DIFFERENT instance: always reset hookIndex = 0 before a component runs.
 *   - Event handler props are new functions on every render, so you must swap the listeners, or old closures keep firing.
 *   - `{count && <X/>}` renders "0" when count is 0. Your h() must keep 0 to match React.
 *
 * 🎤 INTERVIEW ANGLE  "Explain the virtual DOM", "why keys?", "rules of hooks", "what is batching?"
 *
 * 🚀 STRETCH ☆  useEffect · useRef · useMemo · component-level re-renders
 *
 * 🤖 ASK THE AGENT
 *   /explain reconciliation keys · /explain how hooks are stored · /hint labs/12-mini-react/mini-react.js step 5
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const TEXT = 'TEXT_ELEMENT';

export function h(type, props, ...children) {
  throw new Error('TODO: implement h');
}

export function render(vnode, container) {
  throw new Error('TODO: implement render');
}

export function useState(initial) {
  throw new Error('TODO: implement useState');
}

export function useEffect(effect, deps) {
  throw new Error('TODO (stretch): implement useEffect');
}
