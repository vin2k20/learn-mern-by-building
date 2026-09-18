/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/board/Column.jsx · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A memoised column: a header with the count and points, a list of TaskCards (by id), a drop zone,
 *   and an inline "Add task" form.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/performance-memo-splitting.md, docs/concepts/react/virtual-dom-reconciliation.md (keys)
 *
 * 📝 STEPS
 *   1. function Column({ status, label, onMove }) → export default memo(Column)
 *   2. const ids = useSelector((s) => selectIds(s, status)) (the selector factory from selectors.js) and the stats for this status.
 *   3. Markup:
 *        <section className={styles.column} data-status={status} data-drop-zone aria-labelledby={headingId}>
 *          <header> <h2 id={headingId}>{label}</h2> <span className={styles.count}>{count}</span> <span>{points} pts</span> </header>
 *          <ol className={styles.list} role="list">
 *            {ids.map((id, index) => <li key={id}><TaskCard id={id} index={index} status={status} onMove={onMove} /></li>)}
 *          </ol>
 *          <AddTaskForm status={status} />   (a local component: a button that turns into an input; Enter creates, Esc cancels)
 *        </section>
 *   4. Pass ONLY ids and primitives down. TaskCard selects its own task by id (that's what makes memo effective).
 *   5. An empty column → a dashed "Drop here" placeholder (still a valid drop target).
 *   6. ☆ Virtualise the column when it has more than 100 cards (reuse VirtualList with a fixed card height).
 *
 * ✅ DONE WHEN  [ ] Keys are task ids (never the index) · the column re-renders only when ITS ids or stats change
 * 🎤 INTERVIEW ANGLE  "Why pass ids instead of objects to list items?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
