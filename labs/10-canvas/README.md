# Lab 10 · Canvas fundamentals ☆

**Time box:** 90 min (stretch, but do the playground if you can) · **Run:** `npm run test:10` · **Playground:** `npm run serve:10`
**Primer:** [canvas vs SVG](../../docs/concepts/web/canvas-vs-svg.md)

## Why this matters
*"Experience in canvas will be an added advantage."* Kanvas has a whiteboard and hand-drawn charts.
Canvas is **immediate mode**: there's no DOM for your shapes. You keep your own scene data, redraw it every frame,
and do your own hit-testing. The maths in this lab is exactly what the whiteboard and chart need.

## Concepts
- `getContext('2d')`, paths (`beginPath`, `moveTo`, `lineTo`, `arc`, `ellipse`, `stroke`, `fill`), `save`/`restore`, transforms
- **Hi-DPI**: the backing-store size (`canvas.width`) vs the CSS size (`canvas.style.width`), and `ctx.scale(dpr, dpr)`
- The animation loop with `requestAnimationFrame`, delta time, and easing
- Hit-testing: point in rectangle or ellipse, distance to a segment
- Axis "nice numbers" for charts
- Path simplification (Ramer–Douglas–Peucker) to shrink free-hand strokes before saving them

## Part A: tested helpers (`canvas-helpers.js`)
`scaleForDPR`, `pointInRect`, `pointInEllipse`, `distanceToSegment`, `hitTestShapes`, `niceTicks`, `lerp`, `clamp`,
`easeOutCubic`, and ☆ `simplifyPath` (run it with `npm run test:stretch`).

## Part B: the playground (`playground/`)
1. A crisp hi-DPI canvas that resizes with its container.
2. Bouncing particles driven by `requestAnimationFrame` (pause them when the tab is hidden).
3. Free-hand drawing with Pointer Events (works with mouse, touch and pen).
4. Click to select the topmost shape (using your `hitTestShapes`).
5. Export as PNG.

## 🎤 Interview questions
1. Canvas vs SVG: when would you choose each? (Thousands of objects → canvas. Accessibility and CSS styling → SVG.)
2. Why does a canvas look blurry on Retina screens, and how do you fix it?
3. How do you make canvas content accessible? (Fallback content, ARIA, a parallel DOM, or a data table.)
4. How do you keep canvas animations at 60 fps? (rAF, avoid layout reads, offscreen canvas, only redraw dirty regions.)
5. What is `OffscreenCanvas`, and when would you move drawing to a Web Worker?
