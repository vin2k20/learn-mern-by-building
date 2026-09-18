/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/dashboard/BarChartCanvas.jsx · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A hand-drawn, animated, responsive, themeable bar chart on <canvas>, with an interactive tooltip and an accessible
 *   data-table fallback. No chart library!
 *
 * 🧠 CONCEPTS  → docs/concepts/web/canvas-vs-svg.md · labs/10 (niceTicks, easeOutCubic, lerp, pointInRect, scaleForDPR)
 *
 * 📝 STEPS
 *   1. Props: { data: [{ status, count, points }], metric = 'count', height = 280 }
 *   2. Sizing: a ResizeObserver on the wrapper → set the canvas size with DPR scaling (the same as CanvasBoard, so extract a
 *      shared useCanvas(ref) hook ☆).
 *   3. Layout maths (pure function computeLayout(data, width, height) → { bars: [{ x, y, w, h, label, value }], ticks }):
 *      - margins for the axes · niceTicks(0, max) for the y-axis · the band width = innerWidth / n with 30% padding
 *   4. Draw: gridlines + tick labels (ctx.fillText, textAlign/textBaseline), bars (colours from the --chart-N / status tokens read via
 *      getComputedStyle), value labels above the bars, and category labels below.
 *   5. Animate the bars growing from 0 with rAF over 600 ms using easeOutCubic (skip it with reduced motion). Re-animate from the
 *      OLD heights to the new ones when the data changes (lerp).
 *   6. Tooltip: onPointerMove → map to canvas coordinates → find the hovered bar (pointInRect) → position an absolutely-positioned
 *      <div role="tooltip"> near the pointer with the label and value. Highlight the hovered bar (redraw it with a lighter fill).
 *      Hide it on pointerleave.
 *   7. Keyboard ☆: make the canvas focusable, and let ←/→ move a "focused bar" that shows the tooltip.
 *   8. Accessibility: <figure> with a <figcaption>, the canvas has role="img" and an aria-label summary, PLUS a visually-hidden
 *      <table> with the same data (or a "Show data" toggle).
 *   9. Redraw when the theme changes (subscribe to useTheme().resolved).
 *  10. 🧪 ☆ A Vitest test for computeLayout (a pure function, so it's easy to test).
 *
 * ✅ DONE WHEN
 *   [ ] Crisp on Retina · responsive to its container · the colours follow the theme
 *   [ ] The tooltip tracks the hovered bar exactly · the screen reader can reach the data table
 *   [ ] No leaks: the ResizeObserver and rAF are cleaned up (check by navigating away mid-animation)
 *
 * 🎤 INTERVIEW ANGLE  "Would you build charts with canvas, SVG or a library? Why?", "how do you make canvas charts accessible?"
 * 🤖 ASK THE AGENT    /hint client/src/features/dashboard/BarChartCanvas.jsx step 3 · /review client/src/features/dashboard/BarChartCanvas.jsx
 * ═══════════════════════════════════════════════════════════════════════════
 */
