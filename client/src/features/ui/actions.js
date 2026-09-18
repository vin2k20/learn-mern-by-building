/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/ui/actions.js · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  CLASSIC Redux, step 2 of 3: action creators (plain functions returning FSA-style action objects).
 *
 * 🧠 CONCEPTS  → docs/concepts/react/flux-redux-rtk.md (Flux Standard Actions: { type, payload, error?, meta? })
 *
 * 📝 STEPS
 *   export const sidebarToggled = () => ({ type: SIDEBAR_TOGGLED })
 *   export const sidebarSet = (open) => ({ type: SIDEBAR_SET, payload: open })
 *   export const paletteToggled = () => …
 *   export const paletteClosed = () => …
 *   export const lastProjectVisited = (projectId) => …
 *   export const reducedMotionSet = (value) => …
 *   ☆ Rewrite ONE of them with your lab 13 createAction() and compare the ergonomics.
 *
 * ✅ DONE WHEN  [ ] Redux DevTools shows these actions with readable types and payloads
 * ═══════════════════════════════════════════════════════════════════════════
 */
