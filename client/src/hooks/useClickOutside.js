/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/hooks/useClickOutside.js · Phase 3 · Day 3 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  useClickOutside(refOrRefs, handler, { enabled = true }) calls handler on pointerdown outside the element(s).
 *
 * 🧠 CONCEPTS  → labs/09-dom-events (onClickOutside), docs/concepts/js/closures.md
 *
 * 📝 STEPS
 *   1. Keep the latest handler in a ref (so the effect doesn't re-subscribe on every render).
 *   2. In an effect (when enabled): a document 'pointerdown' listener (with capture: true, so it runs even if a child stops propagation).
 *      If none of the refs contain event.target → handlerRef.current(event).
 *   3. Support an array of refs (a trigger button + a menu).
 *   4. Clean up on unmount or when disabled.
 *   ☆ Use event.composedPath() so it also works with Shadow DOM.
 *
 * ✅ DONE WHEN  [ ] Clicking the trigger doesn't immediately re-close the dropdown
 * 🎤 INTERVIEW ANGLE  "Why pointerdown rather than click for outside detection?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
