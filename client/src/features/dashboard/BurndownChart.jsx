/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/dashboard/BurndownChart.jsx · Phase 5 · ☆ stretch
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  The SAME kind of chart in SVG (a line chart of remaining points per day), to compare with canvas.
 *
 * 🧠 CONCEPTS  → docs/concepts/web/canvas-vs-svg.md
 *
 * 📝 STEPS
 *   1. <svg viewBox="0 0 600 240" role="img" aria-labelledby="burn-title burn-desc"> with <title> and <desc>
 *   2. Scales: x = the day index → pixels; y = niceTicks(0, maxRemaining) → pixels (inverted)
 *   3. <path d="M…L…"> for the actual line and a dashed <line> for the ideal burndown. Axis ticks and labels are <text> elements.
 *   4. Line-drawing animation: stroke-dasharray + stroke-dashoffset with a CSS @keyframes (pure CSS!)
 *   5. Hover: <circle> points with <title> tooltips (native), styled with CSS :hover (no hit-testing code needed. Compare that with canvas!)
 *   6. Colours via CSS (stroke: var(--chart-1)), so theming is free.
 *
 * ✅ DONE WHEN  [ ] It scales with the container (viewBox) · you can list 3 concrete differences from the canvas version
 * ═══════════════════════════════════════════════════════════════════════════
 */
