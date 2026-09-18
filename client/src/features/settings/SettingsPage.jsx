/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/settings/SettingsPage.jsx · Phase 5 · Day 5 · ★ core (30 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  User preferences (theme, reduced motion, board density ☆) plus a place to host the LegacyClock lifecycle demo.
 *
 * 🧠 CONCEPTS  → context/ThemeContext · features/ui (reducedMotion) · components/Tabs ☆
 *
 * 📝 STEPS
 *   1. The theme: a radio group (Light / Dark / System) bound to useTheme(). Show the resolved theme under "System".
 *   2. Reduced motion: a checkbox (the OS setting is shown read-only, plus an app-level override → sets data-reduced-motion on <html>;
 *      the tokens CSS respects it too).
 *   3. The lifecycle lab: a "Show legacy clock" toggle that mounts/unmounts <LegacyClock format="…" />, plus a format select
 *      so you can trigger componentDidUpdate. Open the console and watch the lifecycle logs.
 *   4. ☆ <Tabs>: General · Accessibility · Developer (show the build info: import.meta.env.MODE and the app version).
 *   5. Layout: a GRID with the setting label + description on the left and the control on the right (≥ 48rem), stacked on mobile.
 *
 * ✅ DONE WHEN  [ ] Every control has a label and a description (aria-describedby) · the changes apply instantly and persist
 * ═══════════════════════════════════════════════════════════════════════════
 */
