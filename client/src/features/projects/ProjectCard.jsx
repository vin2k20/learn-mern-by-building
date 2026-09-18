/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/projects/ProjectCard.jsx · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A memoised, fully clickable card (the "block link" pattern) with the project colour, name, description,
 *   task count and member avatars, and quick links to its board, whiteboard and dashboard.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/performance-memo-splitting.md (memo), docs/concepts/web/accessibility.md,
 *               docs/concepts/css/media-and-container-queries.md (container queries)
 *
 * 📝 STEPS
 *   1. function ProjectCard({ project }) … export default memo(ProjectCard)
 *   2. Markup: <article className={styles.card} style={{ '--project-color': project.color }}>
 *        <h2 className={styles.title}><Link to={`/projects/${project.id}/board`} className={styles.mainLink}>{project.name}</Link></h2>
 *        <p className="line-clamp-2">{project.description}</p>
 *        <footer> <AvatarGroup users={members} /> <span>{project.taskCount} tasks</span> quick-link icons </footer>
 *      The main link's ::after covers the whole card (so the whole card is clickable), while the quick links sit above it (z-index)
 *      and stay individually focusable.
 *   3. Members: use the cached users from useGetUsersQuery (select just the ones you need with selectFromResult ☆)
 *   4. Dispatch lastProjectVisited(project.id) on click (the classic ui action).
 *   5. Use the Profiler to check: typing in the search box shouldn't re-render cards whose project object didn't change.
 *
 * ✅ DONE WHEN
 *   [ ] The whole card is clickable, but the screen reader hears ONE link name (not the entire card text)
 *   [ ] The quick links work with the keyboard · the hover lift only happens on pointer devices
 *   [ ] memo prevents re-renders (Profiler: "Did not render")
 *
 * 🎤 INTERVIEW ANGLE  "How do you make a whole card clickable accessibly?", "when does memo help?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
