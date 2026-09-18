/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/components/VirtualList/VirtualList.jsx · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Render huge lists smoothly by only mounting the rows in (and near) the viewport. Built from scratch,
 *   using your virtualWindow() maths from lab 08.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/performance-memo-splitting.md, labs/08-algorithms (virtualWindow),
 *               docs/concepts/web/rendering-pipeline.md
 *
 * 🧩 USED BY  features/activity/ActivityFeed.jsx
 *
 * 📝 STEPS
 *   1. Props: { items, rowHeight, height = '100%', overscan = 5, renderRow, getKey = (item) => item.id,
 *              onEndReached, endReachedThreshold = 10, ariaLabel }
 *   2. const scrollRef = useRef(); const [scrollTop, setScrollTop] = useState(0); const [viewportH, setViewportH] = useState(0)
 *   3. Measure the viewport height with a ResizeObserver in an effect (disconnect in the cleanup).
 *   4. onScroll → setScrollTop(e.currentTarget.scrollTop). ☆ Throttle it to animation frames (rAF) if the Profiler shows it's needed.
 *   5. const { start, end, offsetTop, totalHeight } = virtualWindow({ scrollTop, viewportHeight: viewportH, rowHeight, total: items.length, overscan })
 *   6. Markup:
 *        <div ref={scrollRef} className={styles.scroller} onScroll role="list" aria-label={ariaLabel}
 *             style={{ height }} tabIndex={0}>
 *          <div style={{ height: totalHeight, position: 'relative' }}>
 *            <div style={{ transform: `translateY(${offsetTop}px)` }}>
 *              {items.slice(start, end).map((item, i) => (
 *                <div role="listitem" key={getKey(item)} style={{ height: rowHeight }}
 *                     aria-setsize={items.length} aria-posinset={start + i + 1}>
 *                  {renderRow(item, start + i)}
 *                </div>))}
 *   7. Infinite loading: when end >= items.length - endReachedThreshold → onEndReached?.() (guard against calling it repeatedly
 *      for the same length with a ref).
 *   8. Memoise: export default memo(VirtualList). The parent must pass a stable renderRow (useCallback).
 *   9. ☆ Variable row heights: measure rendered rows, keep a prefix-sum array, and binary-search the start index (lab 08 lowerBound).
 *
 * ✅ DONE WHEN
 *   [ ] 10,000 items → at most ~30 row elements in the DOM at any time
 *   [ ] Scrolling at CPU 4× slowdown stays smooth (no long tasks in the Performance panel)
 *   [ ] Keyboard: the list is focusable and scrolls with the arrow keys / Page Down
 *   [ ] Screen readers announce "item N of 10000"
 *
 * ⚠️ GOTCHAS
 *   - Using the index as the key makes rows re-mount while scrolling. Use a stable id.
 *   - Reading scrollTop in render (instead of from state) causes stale windows.
 *
 * 🎤 INTERVIEW ANGLE  "Implement virtualisation", "what about variable heights?", "accessibility of virtual lists?"
 * 🤖 ASK THE AGENT    /hint client/src/components/VirtualList/VirtualList.jsx step 6 · /review client/src/components/VirtualList
 * ═══════════════════════════════════════════════════════════════════════════
 */
