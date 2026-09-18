/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/board/TaskCard.jsx · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A memoised, draggable, keyboard-movable task card that opens the details drawer when clicked.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/dom-events-delegation.md (the HTML5 drag-and-drop API), docs/concepts/web/accessibility.md,
 *               docs/concepts/react/performance-memo-splitting.md · labs/09 playground (you built this in vanilla JS!)
 *
 * 🧩 DEPENDS ON  selectTaskById · useGetUsersQuery (the assignee) · components/Avatar · lib/format · TaskCard.module.css
 *
 * 📝 STEPS
 *   1. function TaskCard({ id, index, status, onMove }) → export default memo(TaskCard)
 *      const task = useSelector((s) => selectTaskById(s, id))
 *   2. Markup: <article className={styles.card} draggable="true" tabIndex={0} data-task-id={id} data-index={index}
 *                aria-roledescription="Draggable task" aria-describedby={instructionsId}
 *                data-priority={task.priority} data-grabbed={grabbed || undefined}>
 *        a priority chip · <h3><Link to={`tasks/${id}`}>{task.title}</Link></h3> · labels · the due date (red when overdue) ·
 *        estimate points · the assignee avatar · the dependency icon when dependsOn.length > 0
 *      The drag events themselves are handled by useBoardDnD at the board level (delegation). The card only needs the data-* attributes.
 *   3. KEYBOARD MOVE (the accessible alternative to dragging):
 *      - Space on a focused card → "grab" it (local state grabbed = true), announce "Grabbed. Use arrow keys to move, Space to drop, Escape to cancel."
 *      - While grabbed: ←/→ change the target column, ↑/↓ change the target index. Show a visual preview with a CSS class on the target.
 *      - Space → onMove(id, targetStatus, targetIndex), then keep focus on the moved card (find it again after the re-render by data-task-id).
 *      - Esc → cancel.
 *      - Enter (not grabbed) → open the drawer.
 *      A hidden <p id={instructionsId} className="visually-hidden"> contains these instructions.
 *   4. Animations: when the status changes (usePrevious), briefly apply data-just-moved → the `pop` keyframe.
 *   5. ☆ <ViewTransition> (React 19.3) around the card so moves between columns animate automatically.
 *
 * 🧪 TESTS  (write client/src/features/board/TaskCard.test.jsx)
 *   - it renders the title, the assignee name (accessible name of the avatar) and the priority
 *   - clicking the title navigates to /projects/p_001/board/tasks/t_001 (render inside a MemoryRouter / createMemoryRouter)
 *   - keyboard: focus → Space → ArrowRight → Space calls onMove(id, 'in_progress', …) (pass a vi.fn())
 *   - Esc while grabbed doesn't call onMove
 *   Use renderWithProviders from src/test/renderWithProviders.jsx with a preloaded board state.
 *
 * ✅ DONE WHEN
 *   [ ] It works with the mouse, the keyboard and a screen reader (the announcements are read)
 *   [ ] The focus ring is visible; the grabbed state is visually obvious (not colour-only: add an icon or outline)
 *   [ ] Profiler: typing in the board search doesn't re-render cards that stay visible
 *
 * ⚠️ GOTCHAS  Links inside draggable elements: prevent accidental navigation after a drag (check a `dragging` flag in onClick).
 *
 * 🎤 INTERVIEW ANGLE  "How do you make drag-and-drop accessible?", "how did you prevent re-renders in a big list?"
 * 🤖 ASK THE AGENT    /hint client/src/features/board/TaskCard.jsx step 3 · /review client/src/features/board/TaskCard.jsx
 * ═══════════════════════════════════════════════════════════════════════════
 */
