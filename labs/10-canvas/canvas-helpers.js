/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/10-canvas/canvas-helpers.js · Phase 2 · Day 2 · ☆ stretch
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   The pure geometry and maths behind the Kanvas whiteboard and canvas charts.
 *   (Pure functions are easy to test. The drawing itself happens in the playground.)
 *
 * 🧠 CONCEPTS  → docs/concepts/web/canvas-vs-svg.md
 *
 * 🧩 USED LATER BY
 *   client/src/features/whiteboard/drawingEngine.js (hitTestShapes, simplifyPath)
 *   client/src/features/whiteboard/CanvasBoard.jsx (scaleForDPR)
 *   client/src/features/dashboard/BarChartCanvas.jsx (niceTicks, easeOutCubic, lerp)
 *
 * 🧩 SHAPE FORMAT (from docs/api-contract.md)
 *   { id, type: 'pen'|'line'|'rect'|'ellipse', points?: [x, y][], x?, y?, w?, h?, strokeWidth }
 *   w and h may be NEGATIVE (the user dragged up or left).
 *
 * 📝 STEPS
 *   1. scaleForDPR({ cssWidth, cssHeight, dpr = 1, maxDpr = 3 }) → { width, height, scale }
 *      scale = min(dpr, maxDpr) · width = round(cssWidth * scale) · height = round(cssHeight * scale)
 *   2. pointInRect(px, py, { x, y, w, h }) → boolean, edges inclusive. Normalise negative w/h first.
 *   3. pointInEllipse(px, py, { x, y, w, h }) → boolean, using ((px-cx)/rx)² + ((py-cy)/ry)² <= 1
 *      (rx = |w|/2, ry = |h|/2). A zero radius → false.
 *   4. distanceToSegment([px, py], [ax, ay], [bx, by]) → number
 *      Project the point onto the segment, clamp t to [0, 1], and return the distance to the projection.
 *      Handle a === b (a zero-length segment).
 *   5. hitTestShapes(shapes, x, y, tolerance = 4) → the id of the TOPMOST hit (the last in the array), or null
 *      rect → pointInRect · ellipse → pointInEllipse
 *      line → distanceToSegment(p, [x, y], [x + w, y + h]) <= strokeWidth / 2 + tolerance
 *      pen  → any consecutive pair of points within strokeWidth / 2 + tolerance
 *             (a single-point stroke: the distance to that point)
 *   6. niceTicks(min, max, maxTicks = 5) → { niceMin, niceMax, step, ticks }
 *      "Nice numbers" algorithm (Heckbert):
 *        niceNum(range, round): exponent = floor(log10(range)); fraction = range / 10^exponent
 *          round ? (f < 1.5 → 1, f < 3 → 2, f < 7 → 5, else 10)
 *                : (f <= 1 → 1, f <= 2 → 2, f <= 5 → 5, else 10)
 *          return niceFraction * 10^exponent
 *        If min === max, use min - 1 and max + 1.
 *        range = niceNum(max - min, false); step = niceNum(range / (maxTicks - 1), true)
 *        niceMin = floor(min / step) * step; niceMax = ceil(max / step - 1e-9) * step
 *        ticks = niceMin, niceMin + step, … niceMax. ROUND each tick to the step's number of decimals
 *        (so you get 0.6, not 0.6000000000000001).
 *   7. lerp(a, b, t) · clamp(v, min, max) · easeOutCubic(t) = 1 - (1 - t)³
 *   8. ☆ simplifyPath(points, epsilon) → Ramer–Douglas–Peucker. Keep the first and last points, and
 *      recursively keep the farthest point when its distance to the chord is greater than epsilon.
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:10 is green (and npm run test:stretch for simplifyPath, if you're going for it)
 *
 * 💡 HINTS
 *   - Math.hypot(dx, dy)
 *   - decimals = Math.max(0, -Math.floor(Math.log10(step))); Number(value.toFixed(decimals))
 *
 * 🎤 INTERVIEW ANGLE  "How would you implement selection on a canvas?", "why is my canvas blurry?"
 *
 * 🤖 ASK THE AGENT  /explain canvas hit testing · /hint labs/10-canvas/canvas-helpers.js niceTicks
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function scaleForDPR(options) {
  throw new Error('TODO: implement scaleForDPR');
}

export function pointInRect(px, py, rect) {
  throw new Error('TODO: implement pointInRect');
}

export function pointInEllipse(px, py, box) {
  throw new Error('TODO: implement pointInEllipse');
}

export function distanceToSegment(p, a, b) {
  throw new Error('TODO: implement distanceToSegment');
}

export function hitTestShapes(shapes, x, y, tolerance = 4) {
  throw new Error('TODO: implement hitTestShapes');
}

export function niceTicks(min, max, maxTicks = 5) {
  throw new Error('TODO: implement niceTicks');
}

export function lerp(a, b, t) {
  throw new Error('TODO: implement lerp');
}

export function clamp(value, min, max) {
  throw new Error('TODO: implement clamp');
}

export function easeOutCubic(t) {
  throw new Error('TODO: implement easeOutCubic');
}

export function simplifyPath(points, epsilon) {
  throw new Error('TODO (stretch): implement simplifyPath');
}
