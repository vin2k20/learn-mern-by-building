/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/whiteboard/exportImage.js · Phase 5 · Day 5 · ★ core (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Export the drawing as a PNG (with a background colour and optional padding) and trigger a download.
 *
 * 🧠 CONCEPTS  → docs/concepts/web/canvas-vs-svg.md, docs/concepts/js/memory-leaks.md (object URLs)
 *
 * 📝 STEPS
 *   1. export async function exportPng(engine, { scale = 2, background = '#ffffff', padding = 24, fileName = 'kanvas-whiteboard.png' })
 *   2. Compute the bounding box of all the shapes. Create an OFFSCREEN canvas (document.createElement('canvas'), or
 *      new OffscreenCanvas(w, h) ☆) sized to the bbox + padding × scale.
 *   3. Fill the background, translate by -bbox.x + padding, then call engine.render(ctx, …) for the full scene.
 *   4. const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'))  (or offscreen.convertToBlob())
 *   5. const url = URL.createObjectURL(blob); create an <a download={fileName} href={url}>, click it, then URL.revokeObjectURL(url).
 *   6. ☆ exportSvg(): serialise the shapes into SVG markup and compare the output size and quality with the PNG (a canvas vs SVG talking point).
 *
 * ✅ DONE WHEN  [ ] The downloaded PNG is crisp (2×) and includes every shape, even ones outside the current viewport
 * ═══════════════════════════════════════════════════════════════════════════
 */
