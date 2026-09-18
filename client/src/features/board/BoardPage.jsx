/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/board/BoardPage.jsx · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   The Kanban board page: load the project's tasks, render 4 columns (horizontally scrollable, with snap on mobile),
 *   the filter bar, undo/redo, drag-and-drop via ONE delegated handler, and the nested task drawer (<Outlet/>).
 *
 * 🧠 CONCEPTS  → docs/concepts/react/component-patterns.md (container vs presentational),
 *               docs/concepts/js/dom-events-delegation.md, docs/concepts/css/flexbox.md · wireframes §4
 *
 * 🧩 DEPENDS ON  boardSlice (fetchTasks, moveTask, filters) · selectors · Column · useBoardDnD · projectsApi (useGetProjectQuery)
 *               · hooks/useKeyboardShortcut · components/Dropdown ☆ · BoardPage.module.css
 *
 * 📝 STEPS
 *   1. const { projectId } = useParams(). An effect: dispatch(fetchTasks(projectId)) and dispatch(lastProjectVisited(projectId)).
 *      (What happens in StrictMode? Does the `condition` option in the thunk prevent a double fetch?)
 *   2. Header: the project name (useGetProjectQuery), filters (an assignee select, a label select, a search input → filterChanged),
 *      a "Clear filters" button when filters are active, and Undo/Redo buttons ☆ with ⌘Z hints.
 *   3. A STABLE callback: const handleMove = useCallback((id, toStatus, toIndex) => dispatch(moveTask(…)).unwrap().catch(showToast), [dispatch])
 *   4. The board: <section ref={boardRef} className={styles.board} aria-label="Board">
 *        {STATUSES.map((s) => <Column key={s.id} status={s.id} label={s.label} onMove={handleMove} />)}
 *      </section>
 *      Attach drag-and-drop ONCE at the board level: useBoardDnD(boardRef, { onMove: handleMove })
 *   5. Loading → 4 column skeletons · error → a message + retry · an empty project → the "Add your first task" prompt in To do
 *   6. <Outlet /> for the nested /tasks/:taskId drawer route
 *   7. Live region: <p aria-live="polite" className="visually-hidden">{announcement}</p> updated after moves
 *      ("Moved Login form to Review, position 2 of 3")
 *   8. <title>{project.name} · Board · Kanvas</title>
 *
 * ✅ DONE WHEN
 *   [ ] Mouse drag moves cards between columns and within a column (the order persists after a reload with MSW state)
 *   [ ] Keyboard moves work (see TaskCard) and are announced
 *   [ ] Filters narrow the cards without refetching
 *   [ ] Profiler: a move re-renders ≤ 2 columns + the moved card (see debugging-lab hunt #4)
 *   [ ] Mobile: the columns scroll horizontally with snap points, and there's no page-level horizontal scroll
 *
 * 🎤 INTERVIEW ANGLE  "How did you structure the board for performance?", "container/presentational split?"
 * 🤖 ASK THE AGENT    /review client/src/features/board
 * ═══════════════════════════════════════════════════════════════════════════
 */
