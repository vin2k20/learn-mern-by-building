/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/board/TaskDetailsDrawer.jsx · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A side drawer on a NESTED ROUTE (/projects/:projectId/board/tasks/:taskId) that shows and edits a task,
 *   slides in and out, and closes back to the board.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/routing-rr8.md (nested routes, the URL as state),
 *               docs/concepts/css/transitions-keyframes-animations.md, components/Modal (focus management)
 *
 * 📝 STEPS
 *   1. const { projectId, taskId } = useParams(); const task = useSelector((s) => selectTaskById(s, taskId))
 *      If there's no task yet (a deep link before the load) → a Skeleton. If the tasks loaded and there's no match → "Task not found".
 *   2. Close = navigate('..') (relative to the route) or navigate(`/projects/${projectId}/board`). Esc closes it.
 *   3. Render it as a non-modal <aside aria-labelledby> on desktop (the board stays usable) and as a Modal (bottom sheet) on mobile
 *      (useMediaQuery). Explain the a11y difference in a comment.
 *   4. Content (use <Tabs> ☆: Details · Comments · Activity):
 *      - the title: an inline-editable heading (click → input; blur/Enter saves via updateTask; Esc reverts)
 *      - status and priority selects · the assignee select (useGetUsersQuery) · labels · estimate · due date (<input type="date">)
 *      - "Depends on" ☆: a multi-select of the other tasks; prevent cycles on the client with Graph.wouldCreateCycle (lab 07)
 *      - Comments ☆: GET/POST /api/tasks/:id/comments with RTK Query
 *      - Delete: a confirmation Modal → DELETE → close + toast
 *   5. Animations: data-state="open" → slide-in-right. On close, play slide-out-right, then navigate (animationend),
 *      or ☆ use <ViewTransition> + startTransition(navigate).
 *   6. Focus: move focus to the drawer heading on open, and back to the card on close (by data-task-id).
 *
 * ✅ DONE WHEN
 *   [ ] A deep link straight to a task URL works after a reload
 *   [ ] The browser Back button closes the drawer
 *   [ ] Edits update the card on the board immediately
 *
 * 🎤 INTERVIEW ANGLE  "Why model a drawer as a route?", "modal vs non-modal dialogs?"
 * 🤖 ASK THE AGENT    /review client/src/features/board/TaskDetailsDrawer.jsx
 * ═══════════════════════════════════════════════════════════════════════════
 */
