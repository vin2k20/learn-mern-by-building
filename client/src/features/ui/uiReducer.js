/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/ui/uiReducer.js · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   CLASSIC Redux, step 3 of 3: a pure switch-based reducer with HAND-WRITTEN immutable updates, plus selectors.
 *   It plugs into configureStore next to the RTK slices, which proves RTK is "just Redux".
 *
 * 🧠 CONCEPTS  → docs/concepts/react/flux-redux-rtk.md, docs/concepts/js/es6-plus-array-methods.md (immutability)
 *
 * 📝 STEPS
 *   1. export const initialState = { sidebarOpen: false, paletteOpen: false, lastProjectId: null, reducedMotion: false }
 *   2. export default function uiReducer(state = initialState, action) { switch (action.type) { … default: return state } }
 *      - every case returns a NEW object ({ ...state, field }) and never mutates
 *      - unknown actions return the SAME state reference (why does that matter? lab 13's combineReducers test!)
 *   3. Selectors (co-located): export const selectSidebarOpen = (s) => s.ui.sidebarOpen, and so on.
 *   4. 🧪 ☆ A test: uiReducer.test.js checks the transitions and that an unknown action returns the same reference.
 *   5. Comment: rewrite this reducer as a createSlice in your head. What would you delete?
 *      (the type constants, the action creators, the switch, the spreads)
 *
 * ✅ DONE WHEN
 *   [ ] AppLayout's menu button and Cmd+K dispatch these actions
 *   [ ] DevTools time-travel toggles the sidebar back and forth
 *   [ ] No mutation (the RTK immutability middleware would throw in dev if you mutated)
 *
 * 🎤 INTERVIEW ANGLE  "Why must reducers be pure?", "what's the downside of classic Redux?"
 * 🤖 ASK THE AGENT    /review client/src/features/ui
 * ═══════════════════════════════════════════════════════════════════════════
 */
