/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/hooks/useMediaQuery.js · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  useMediaQuery('(min-width: 64rem)') → boolean that updates live. This is the JS side of CSS media queries.
 *
 * 🧠 CONCEPTS  → docs/concepts/css/media-and-container-queries.md, docs/concepts/react/hooks-deep-dive.md
 * 🧩 USED BY    AppLayout (sidebar mode) · ThemeContext (prefers-color-scheme) · animations (prefers-reduced-motion)
 *
 * 📝 STEPS
 *   1. subscribe = useCallback((cb) => { const mql = window.matchMedia(query); mql.addEventListener('change', cb);
 *      return () => mql.removeEventListener('change', cb) }, [query])
 *   2. return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
 *   3. Export convenience hooks: usePrefersReducedMotion(), usePrefersDark()
 *   4. Comment: when should you prefer pure CSS media queries over this hook? (Almost always, for STYLING.
 *      Use the hook only when BEHAVIOUR changes, like drawer vs rail.)
 *
 * ✅ DONE WHEN  [ ] Resizing across 64rem flips the value without a reload · emulating reduced motion in DevTools updates it
 * 🎤 INTERVIEW ANGLE  "How do you sync JS behaviour with CSS breakpoints?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
