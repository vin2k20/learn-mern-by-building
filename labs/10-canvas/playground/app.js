/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/10-canvas/playground/app.js · Phase 2 · Day 2 · ☆ stretch
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Get hands-on with the 2D canvas: crisp rendering, an animation loop,
 *   free-hand drawing, selection and export. This is a rehearsal for the Kanvas whiteboard.
 *
 * 🧠 CONCEPTS  → docs/concepts/web/canvas-vs-svg.md, docs/concepts/web/rendering-pipeline.md
 *   immediate mode · the scene graph lives in YOUR data · rAF · delta time ·
 *   Pointer Events + setPointerCapture · ResizeObserver · devicePixelRatio · toBlob
 *
 * 🧩 DEPENDS ON  ../canvas-helpers.js (scaleForDPR, hitTestShapes, simplifyPath ☆)
 *
 * 📝 STEPS
 *   1. Setup & hi-DPI
 *      - const canvas = document.querySelector('#canvas'); const ctx = canvas.getContext('2d');
 *      - resize(): read the CSS size (canvas.getBoundingClientRect()), call scaleForDPR, set
 *        canvas.width/height, then ctx.setTransform(scale, 0, 0, scale, 0, 0) so you can draw
 *        in CSS pixels. Call draw() afterwards (resizing clears the canvas!).
 *      - new ResizeObserver(resize).observe(canvas.parentElement)
 *      - Test it: zoom the browser to 200% and check that the lines stay crisp.
 *   2. Scene state (plain data): const scene = { shapes: [], particles: [], selectedId: null, tool: 'draw' }
 *   3. Animation loop
 *      - function frame(now) { const dt = (now - last) / 1000; last = now; update(dt); draw(); rafId = requestAnimationFrame(frame); }
 *      - update(dt): move 50 particles by velocity * dt and bounce them off the edges.
 *      - Toggle the loop with the Particles button (cancelAnimationFrame).
 *      - Pause when document.visibilityState === 'hidden' (listen for 'visibilitychange').
 *      - Open DevTools → Performance → record 5 s. Confirm ~60 fps and no long tasks.
 *   4. draw()
 *      - ctx.clearRect(...), then draw every shape (pen strokes: beginPath, moveTo, lineTo…, stroke;
 *        lineCap/lineJoin = 'round'), then the particles, then a dashed outline around the selected shape
 *        (ctx.setLineDash([6, 4]) inside save()/restore()).
 *   5. Drawing with Pointer Events
 *      - pointerdown: canvas.setPointerCapture(e.pointerId); start a new pen shape with the first point
 *        (use e.offsetX / e.offsetY).
 *      - pointermove: if drawing, push points. For fast pointers, use e.getCoalescedEvents() ☆.
 *      - pointerup / pointercancel: finish the shape. ☆ Run simplifyPath(points, 1) and console.log
 *        the point counts before and after.
 *      - Only redraw once per frame: set a `needsDraw` flag and let the rAF loop call draw().
 *   6. Selection: in 'select' mode, pointerdown → scene.selectedId = hitTestShapes(scene.shapes, x, y).
 *      Delete/Backspace removes the selected shape.
 *   7. Export: canvas.toBlob((blob) => { const url = URL.createObjectURL(blob); … <a download> … ;
 *      URL.revokeObjectURL(url) }). Why toBlob instead of toDataURL? (Memory, and it's async.)
 *   8. Accessibility: keep the fallback text up to date ("Canvas with N shapes"), and make the toolbar
 *      keyboard-operable.
 *
 * ✅ DONE WHEN
 *   [ ] Lines are crisp on Retina / 200% zoom   [ ] Drawing works with mouse and touch (DevTools device mode)
 *   [ ] 60 fps with particles on                [ ] Selection and delete work   [ ] PNG export works
 *
 * ⚠️ GOTCHAS
 *   - Setting canvas.width resets the ENTIRE context state (transform, styles). Re-apply them after a resize.
 *   - offsetX/offsetY are in CSS pixels. Don't multiply by DPR if you already applied setTransform.
 *   - Forgetting beginPath() makes every stroke redraw all the previous paths (it slows down over time).
 *
 * 🎤 INTERVIEW ANGLE  "Build a drawing app", "canvas performance", "canvas accessibility".
 *
 * 🤖 ASK THE AGENT  /explain requestAnimationFrame vs setInterval · /hint labs/10-canvas/playground/app.js step 1
 * ═══════════════════════════════════════════════════════════════════════════
 */
