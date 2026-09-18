/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/activity/ActivityFeed.jsx · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A 10,000-event activity feed that stays smooth. First build it NAIVELY and measure it, then virtualise it and measure again.
 *   Cursor-paginated infinite loading.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/performance-memo-splitting.md, docs/concepts/web/web-vitals-lighthouse.md,
 *               components/VirtualList · docs/api-contract.md (activity cursor pagination) · docs/debugging-lab.md (hunt 5)
 *
 * 📝 STEPS
 *   1. Data: an RTK Query infinite query ☆ (build.infiniteQuery with getNextPageParam: (last) => last.nextCursor),
 *      or a simple thunk + local state that appends the pages. The mock serves 10k rows for the first project, 100 at a time.
 *   2. A toolbar: a "Virtualized" toggle (a checkbox, persisted in the URL ?virtual=0|1), a type filter, and a total count.
 *   3. <ActivityRow event users /> (memo): an avatar, the message, and a relative time (lib/format) in a <time dateTime>. A FIXED height (56px).
 *   4. NAIVE mode: map over ALL the loaded events into a plain <ol>, with an IntersectionObserver sentinel at the end for the next page.
 *      Load all 10k (keep scrolling or add a "Load all" button), then:
 *        • Performance panel (CPU 4×): record the render and a scroll. Note the long tasks and the total blocking time.
 *        • Elements panel: count the DOM nodes (document.querySelectorAll('*').length)
 *   5. VIRTUAL mode: <VirtualList items={events} rowHeight={56} renderRow={renderRow} onEndReached={loadMore} />
 *      renderRow must be stable (useCallback). Measure the same things again.
 *   6. Record the numbers in the Phase 5 before/after log (docs/phases/phase-5-canvas-and-performance.md).
 *   7. Filtering 10k items: useDeferredValue or startTransition so typing in the filter stays responsive. Measure INP.
 *   8. <title>Activity · Kanvas</title>
 *
 * ✅ DONE WHEN
 *   [ ] Virtual mode: ≤ ~30 row nodes, smooth scrolling, no long tasks while scrolling
 *   [ ] The naive vs virtual numbers are written down (initial render ms, DOM nodes, dropped frames)
 *   [ ] Infinite loading never double-fetches the same cursor
 *
 * 🎤 INTERVIEW ANGLE  "Tell me about a performance improvement you made", with the numbers from this exercise.
 * 🤖 ASK THE AGENT    /review client/src/features/activity · /explain rtk query infinite queries
 * ═══════════════════════════════════════════════════════════════════════════
 */
