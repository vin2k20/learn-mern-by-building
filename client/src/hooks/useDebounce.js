/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/hooks/useDebounce.js · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Two hooks: useDebouncedValue(value, delay) and useDebouncedCallback(fn, delay).
 *
 * 🧠 CONCEPTS  → labs/06-functional (debounce) · docs/concepts/js/closures.md (stale closures)
 * 🧩 USED BY    ProjectsPage filter · whiteboard autosave · CommandPalette ☆
 *
 * 📝 STEPS
 *   1. useDebouncedValue(value, delay = 300)
 *      - state = value; an effect sets a timeout to update it after `delay`; the cleanup clears the timeout.
 *   2. useDebouncedCallback(fn, delay = 300)
 *      - Keep the LATEST fn in a ref (update the ref in an effect or with useEffectEvent) so the debounced function can stay stable.
 *      - const debounced = useMemo(() => debounce((...args) => fnRef.current(...args), delay), [delay])  ← your lab 06 debounce
 *      - Cancel it on unmount (an effect cleanup → debounced.cancel()).
 *      - Return debounced (with .cancel and .flush).
 *   3. Comment: when would you choose useDeferredValue instead? (It isn't time-based; it's priority-based.)
 *
 * ✅ DONE WHEN  [ ] Typing "website" quickly triggers ONE filter/API call · no calls after unmount
 * ⚠️ GOTCHAS    Re-creating the debounced function on every render resets its timer, so it never fires.
 * 🎤 INTERVIEW ANGLE  "Write useDebounce", "why use a ref for the callback?"
 * 🤖 ASK THE AGENT    /hint client/src/hooks/useDebounce.js step 2
 * ═══════════════════════════════════════════════════════════════════════════
 */
