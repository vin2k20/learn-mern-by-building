/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/board/selectors.js · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   MEMOISED derived data for the board: filtered tasks, column id lists, per-column counts and points,
 *   and the task lookup used by the command palette.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/flux-redux-rtk.md (createSelector), labs/04-array-methods (toColumns, countByStatus),
 *               docs/concepts/react/performance-memo-splitting.md
 *
 * 📝 STEPS
 *   1. export const STATUSES = [ { id: 'todo', label: 'To do' }, { id: 'in_progress', label: 'In progress' },
 *                               { id: 'review', label: 'Review' }, { id: 'done', label: 'Done' } ]
 *   2. selectFilters = (s) => s.board.filters
 *   3. selectVisibleTasks = createSelector([selectAllTasks, selectFilters], (tasks, f) => tasks.filter(…))
 *      assignee, label and search (case-insensitive on the title) filters
 *   4. selectColumnIds = createSelector([selectVisibleTasks], (tasks) => toColumns(tasks))   ← your lab 04 function
 *   5. makeSelectColumnIds ☆: a selector factory, so each <Column> gets a memoised ids array for ITS status only,
 *      e.g. const selectIds = useMemo(() => makeSelectColumnIds(), []) → useSelector((s) => selectIds(s, status))
 *   6. selectColumnStats = createSelector(…) → { [status]: { count, points } }
 *   7. selectHasActiveFilters
 *   8. Test in the browser console: calling selectColumnIds(state) twice with the same state returns the SAME array reference.
 *
 * ✅ DONE WHEN
 *   [ ] Moving one card only changes the id arrays of the two affected columns (the others keep their references,
 *       so their <Column> doesn't re-render). Check this with the Profiler.
 *
 * ⚠️ GOTCHAS  A selector like (s) => s.board.ids.map(...) returns a NEW array every time → useSelector re-renders on EVERY dispatch.
 *
 * 🎤 INTERVIEW ANGLE  "How does reselect memoise?", "why would a selector cause extra renders?"
 * 🤖 ASK THE AGENT    /explain createSelector memoization pitfalls
 * ═══════════════════════════════════════════════════════════════════════════
 */
