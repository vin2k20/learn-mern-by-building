/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/context/ThemeContext.jsx · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Theme management with the Context API: 'light' | 'dark' | 'system', persisted, synced to
 *   <html data-theme>, and reacting live to OS changes.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/hooks-deep-dive.md, docs/concepts/react/flux-redux-rtk.md (Context vs Redux),
 *               docs/concepts/css/css-architecture.md (theming)
 *
 * 🧩 DEPENDS ON  hooks/useLocalStorage.js ('kanvas-theme') · hooks/useMediaQuery.js (usePrefersDark)
 * 🧩 USED BY    AppLayout (the toggle) · SettingsPage · BarChartCanvas (it reads the colours when the theme changes)
 *
 * 📝 STEPS
 *   1. const ThemeContext = createContext(null)
 *   2. export function ThemeProvider({ children }):
 *      - const [preference, setPreference] = useLocalStorage('kanvas-theme', 'system')
 *      - const prefersDark = usePrefersDark()
 *      - const resolved = preference === 'system' ? (prefersDark ? 'dark' : 'light') : preference   ← DERIVED, not state!
 *      - an effect: preference === 'system' ? delete html.dataset.theme : html.dataset.theme = preference
 *        (the CSS handles 'system' through the media query)
 *      - value = useMemo(() => ({ preference, resolved, setPreference }), [preference, resolved, setPreference])
 *      - return <ThemeContext value={value}>{children}</ThemeContext>   ← React 19: the context itself is the provider
 *   3. export function useTheme() { const ctx = use(ThemeContext); if (!ctx) throw new Error('useTheme must be used inside ThemeProvider'); return ctx; }
 *   4. A comment explaining why theme is in Context and not Redux (it changes rarely, it's needed by the styling layer, and it doesn't need
 *      middleware or devtools), and when you WOULD move it into Redux.
 *   5. ☆ Animate the theme switch with the View Transitions API (document.startViewTransition) and a circular reveal.
 *
 * ✅ DONE WHEN
 *   [ ] 'system' follows the OS live · the choice persists · the index.html inline script prevents a flash
 *   [ ] Only the components that call useTheme() re-render on change (check with the Profiler)
 *
 * 🎤 INTERVIEW ANGLE  "Context performance pitfalls?", "derived state vs duplicated state?"
 * 🤖 ASK THE AGENT    /explain react context re-renders · /review client/src/context/ThemeContext.jsx
 * ═══════════════════════════════════════════════════════════════════════════
 */
