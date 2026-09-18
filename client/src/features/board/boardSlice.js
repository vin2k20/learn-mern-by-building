/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/board/boardSlice.js · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   The board's client state: NORMALISED tasks (createEntityAdapter), per-project loading, filters, OPTIMISTIC moves
 *   with rollback, and ☆ undo/redo, all driven by thunks that call the REST API.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/flux-redux-rtk.md (normalisation, Immer, thunks),
 *               docs/api-contract.md §3-4 (tasks, fractional ordering) · labs/04 (toColumns) · labs/07 (Graph, History)
 *
 * 🧩 USED BY  selectors.js · BoardPage · Column · TaskCard · useBoardDnD · TaskDetailsDrawer · CommandPalette (task titles)
 *
 * 📝 STEPS
 *   1. const tasksAdapter = createEntityAdapter()   (ids are strings; sortComparer: (a, b) => a.order - b.order)
 *   2. initialState = tasksAdapter.getInitialState({
 *        projectId: null, status: 'idle', error: null,
 *        filters: { assigneeId: null, label: null, search: '' },
 *        pendingMoves: {},          // taskId → the previous { status, order } snapshot (for rollback)
 *        history: { past: [], future: [] },   // ☆ undo/redo of moves
 *      })
 *   3. Thunks (thunkAPI.extra.http):
 *      - fetchTasks(projectId) → GET /projects/:id/tasks. Use `condition` to skip it if the same project is already loaded.
 *      - createTask({ projectId, title, status }) → POST, and add the result to the adapter
 *      - updateTask({ id, changes }) → PATCH (optimistic, like moveTask) ☆
 *      - moveTask({ id, toStatus, toIndex }) → the OPTIMISTIC MOVE:
 *          a. getState → compute the new `order` from the target column's neighbours using fractional indexing
 *             (between prev and next: (a + b) / 2; top: first - 1000; bottom: last + 1000; empty: 1000)
 *          b. dispatch(taskMovedOptimistic({ id, status: toStatus, order, previous }))   ← the UI updates instantly
 *          c. try PATCH /tasks/:id/move { status, order } → dispatch(taskMoveConfirmed(serverTask))
 *          d. catch → dispatch(taskMoveRolledBack({ id })) and rethrow a friendly message
 *             (the listener middleware or the component shows a toast. A 422 BLOCKED_BY_DEPENDENCY gets a specific message.)
 *   4. Reducers (createSlice): filterChanged, filtersCleared, taskMovedOptimistic, taskMoveConfirmed, taskMoveRolledBack,
 *      boardReset, ☆ undo, ☆ redo. In extraReducers: fetchTasks pending/fulfilled (tasksAdapter.setAll)/rejected, createTask.fulfilled (addOne).
 *   5. ☆ History: each confirmed move pushes { id, from, to } onto history.past (limit 50) and clears the future.
 *      undo → dispatch moveTask back to `from` (as a thunk: undoLastMove) · redo → the reverse. Wire up Cmd/Ctrl+Z in BoardPage.
 *   6. ☆ Dependencies: before moving to 'done', build a Graph (lab 07) from the tasks' dependsOn and refuse the move
 *      (with a toast) if any dependency isn't done. The server enforces this too (422), so the client check is just UX.
 *   7. Export the adapter selectors: export const { selectAll: selectAllTasks, selectById: selectTaskById, selectEntities }
 *      = tasksAdapter.getSelectors((state) => state.board)
 *
 * 🧪 TESTS  (write client/src/features/board/boardSlice.test.js with Vitest)
 *   - fetchTasks.fulfilled normalises the payload (ids and entities)
 *   - taskMovedOptimistic changes status and order, and stores the previous values in pendingMoves
 *   - taskMoveRolledBack restores the previous values exactly
 *   - moveTask thunk with MSW returning 500 → the final state equals the initial state; with 200 → the confirmed server values
 *     (use setupStore() from app/store.js and the MSW server from src/mocks/server.js)
 *   - the fractional order between two tasks is strictly between them
 *
 * ✅ DONE WHEN
 *   [ ] Redux DevTools: a move shows board/taskMovedOptimistic followed by board/taskMoveConfirmed (or RolledBack)
 *   [ ] State shape: { ids: [...], entities: {...} }, with no nested arrays of task objects
 *   [ ] The tests above pass
 *
 * ⚠️ GOTCHAS
 *   - Don't store derived column arrays in state. Derive them in selectors (selectors.js).
 *   - Concurrent moves of the same card: keep only the FIRST previous snapshot for rollback.
 *
 * 🎤 INTERVIEW ANGLE  "Walk me through an optimistic update with rollback", "why normalise?", "fractional indexing?"
 * 🤖 ASK THE AGENT    /hint client/src/features/board/boardSlice.js step 3 · /review client/src/features/board/boardSlice.js
 * ═══════════════════════════════════════════════════════════════════════════
 */
