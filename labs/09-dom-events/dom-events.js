/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/09-dom-events/dom-events.js · Phase 2 · Day 2 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Write the small, safe DOM helpers that every vanilla widget (and every
 *   React component library, under the hood) needs.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/dom-events-delegation.md, docs/concepts/web/accessibility.md
 *
 * 🧩 USED LATER BY
 *   playground/app.js (next!) · client/src/components/Modal (focus trap) ·
 *   client/src/hooks/useClickOutside.js · landing/js/main.js
 *
 * 📝 STEPS
 *   1. createElement(tag, attrs = {}, ...children) → HTMLElement
 *      attrs (null is allowed):
 *        className → el.className        dataset → Object.assign(el.dataset, value)
 *        style (an object) → Object.assign(el.style, value)
 *        onXxx (a function) → el.addEventListener('xxx', fn)   (onClick → 'click')
 *        true → setAttribute(name, '') · false/null/undefined → skip
 *        anything else → setAttribute(name, String(value))
 *      children: flatten arrays (any depth). Skip null/undefined/true/false.
 *        Strings and numbers → text nodes (NEVER innerHTML). Nodes → append as they are.
 *   2. renderList(container, items, renderItem) → container
 *      - Build every node with renderItem(item, index) inside ONE DocumentFragment.
 *      - Replace the container's content with a SINGLE call: container.replaceChildren(fragment).
 *   3. delegate(root, type, selector, handler) → unsubscribe()
 *      - Add exactly ONE listener to root.
 *      - In it: const match = event.target.closest(selector). Ignore it if there's no match
 *        OR if the match is outside root (!root.contains(match)).
 *      - Call handler(event, match).
 *   4. onClickOutside(element, callback) → cleanup()
 *      - Listen for 'click' on element.ownerDocument. If the click target is not inside the
 *        element (use contains), call callback(event).
 *   5. emitCustom(target, name, detail) → boolean
 *      - Dispatch a CustomEvent with { detail, bubbles: true, cancelable: true }.
 *      - Return dispatchEvent's result (false when a listener called preventDefault()).
 *   6. trapFocus(container) → cleanup()
 *      - Tabbable = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]),
 *        textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
 *      - Immediately focus the first tabbable element.
 *      - On 'keydown' with key 'Tab' (query the list again on every keydown, since content can change):
 *          Shift+Tab on the first → preventDefault() and focus the last
 *          Tab on the last        → preventDefault() and focus the first
 *          otherwise do nothing (let the browser move focus)
 *   7. serializeForm(form) → a plain object
 *      - Iterate over new FormData(form). If a name appears more than once, collect an array.
 *        (Unchecked checkboxes aren't part of FormData, which is expected.)
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:09 is green
 *   [ ] you can explain why delegate() checks root.contains(match)
 *
 * 💡 HINTS
 *   - Array.prototype.flat(Infinity)
 *   - key.startsWith('on') && typeof value === 'function' → key.slice(2).toLowerCase()
 *   - container.querySelectorAll(selector), then [...nodes].at(-1)
 *
 * ⚠️ GOTCHAS
 *   - `closest` walks ABOVE root too. Without the contains check, a wrapper outside root can match.
 *   - `el.style = {...}` doesn't work. Use Object.assign(el.style, obj).
 *   - Tests run in jsdom (no layout): don't rely on offsetWidth etc.
 *
 * 🎤 INTERVIEW ANGLE
 *   "Implement event delegation", "build an accessible modal", "why not innerHTML?"
 *
 * 🚀 STRETCH ☆  delegate() support for 'focus'/'blur' (use capture) · trapFocus restoring the previous focus on cleanup
 *
 * 🤖 ASK THE AGENT
 *   /explain event delegation · /explain focus trap accessibility · /hint labs/09-dom-events/dom-events.js delegate
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function createElement(tag, attrs = {}, ...children) {
  throw new Error('TODO: implement createElement');
}

export function renderList(container, items, renderItem) {
  throw new Error('TODO: implement renderList');
}

export function delegate(root, type, selector, handler) {
  throw new Error('TODO: implement delegate');
}

export function onClickOutside(element, callback) {
  throw new Error('TODO: implement onClickOutside');
}

export function emitCustom(target, name, detail) {
  throw new Error('TODO: implement emitCustom');
}

export function trapFocus(container) {
  throw new Error('TODO: implement trapFocus');
}

export function serializeForm(form) {
  throw new Error('TODO: implement serializeForm');
}
