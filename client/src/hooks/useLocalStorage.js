/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/hooks/useLocalStorage.js · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   const [value, setValue, remove] = useLocalStorage(key, initialValue), synced across components AND tabs,
 *   implemented with useSyncExternalStore.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/hooks-deep-dive.md (useSyncExternalStore), docs/concepts/js/design-patterns.md (observer)
 * 🧩 USED BY    context/ThemeContext.jsx · settings (reduced motion preference) · the whiteboard draft ☆
 *
 * 📝 STEPS
 *   1. A tiny module-level store: const listeners = new Set(); function subscribe(cb) { listeners.add(cb);
 *      window.addEventListener('storage', cb); return () => { … remove both … } }
 *   2. read(key) → try { localStorage.getItem(key) } catch { return null } (storage can throw)
 *   3. In the hook: const raw = useSyncExternalStore(subscribe, () => read(key), () => null)
 *      value = raw === null ? initialValue : JSON.parse(raw) (memoise the parse by raw string so the object identity is stable)
 *   4. setValue(next): support functional updates; write JSON.stringify; then notify the local listeners (the 'storage' event only fires in OTHER tabs)
 *   5. remove(): removeItem + notify
 *
 * ✅ DONE WHEN
 *   [ ] Two components using the same key update together
 *   [ ] Changing the value in another tab updates this one
 *   [ ] A corrupt JSON value doesn't crash the app (fall back to initialValue)
 *
 * ⚠️ GOTCHAS  getSnapshot must return a cached value. Returning a NEW parsed object every call causes an infinite re-render.
 * 🎤 INTERVIEW ANGLE  "What problem does useSyncExternalStore solve?" (tearing in concurrent rendering)
 * 🤖 ASK THE AGENT    /explain useSyncExternalStore tearing
 * ═══════════════════════════════════════════════════════════════════════════
 */
