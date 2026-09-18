/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/components/Tabs/Tabs.jsx · Phase 3 · ☆ stretch (used in SettingsPage and TaskDetailsDrawer)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A COMPOUND component: <Tabs value onValueChange><Tabs.List><Tabs.Tab value="a">A</Tabs.Tab></Tabs.List>
 *   <Tabs.Panel value="a">…</Tabs.Panel></Tabs>, with the full WAI-ARIA tabs keyboard pattern.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/component-patterns.md, docs/concepts/web/accessibility.md
 *
 * 📝 STEPS
 *   1. A context holding { value, setValue, baseId, registerTab } (controlled OR uncontrolled: support defaultValue).
 *   2. Tabs.List → role="tablist", aria-orientation. Arrow keys move focus between the tabs (roving tabindex:
 *      only the selected tab has tabIndex=0). Home/End jump to the ends. Selection follows focus (or activates on Enter ☆).
 *   3. Tabs.Tab → <button role="tab" id={`${baseId}-tab-${value}`} aria-controls={…panel id} aria-selected tabIndex>
 *   4. Tabs.Panel → role="tabpanel" aria-labelledby={tab id} hidden={!selected} tabIndex={0}
 *   5. ☆ Keep inactive panels mounted but hidden with React 19.2's <Activity mode="hidden">. What does that preserve?
 *
 * ✅ DONE WHEN  [ ] Arrow keys cycle through the tabs · the screen reader announces "tab, 2 of 3, selected"
 * 🎤 INTERVIEW ANGLE  "What is a compound component?", "what is a roving tabindex?"
 * 🤖 ASK THE AGENT    /explain roving tabindex
 * ═══════════════════════════════════════════════════════════════════════════
 */
