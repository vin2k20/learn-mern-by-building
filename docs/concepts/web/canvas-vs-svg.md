# Canvas vs SVG (and canvas essentials)

> **TL;DR:** **SVG** is a retained-mode DOM (styleable, accessible, event-per-element), which is great for icons, diagrams and charts with
> fewer than ~1–2k elements. **Canvas** is immediate-mode pixels, which is great for thousands of objects, free drawing, games and image processing.

| | SVG | Canvas 2D | WebGL/WebGPU |
|---|---|---|---|
| Model | DOM nodes | a bitmap you redraw | GPU pipelines |
| Events | per element | manual hit-testing | manual (picking) |
| Accessibility | good (text, `title`, ARIA) | poor (needs a fallback or a parallel DOM) | poor |
| Styling | CSS | code | shaders |
| Scaling | vector, crisp | set the backing store to the DPR | set the backing store to the DPR |
| Performance with many objects | degrades (DOM) | good | best |
| Export | serialise markup | `toBlob`/`toDataURL` | readPixels |

## Canvas essentials
```js
const dpr = Math.min(window.devicePixelRatio || 1, 3);
const { width, height } = canvas.getBoundingClientRect();
canvas.width = Math.round(width * dpr);  canvas.height = Math.round(height * dpr);
const ctx = canvas.getContext('2d');
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);   // now draw in CSS pixels

ctx.clearRect(0, 0, width, height);
ctx.save();
ctx.strokeStyle = '#5b5bd6'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
ctx.beginPath(); ctx.moveTo(10, 10); ctx.lineTo(100, 60); ctx.stroke();
ctx.restore();
```
- **Render loop:** `requestAnimationFrame`, and only redraw when something changed (a dirty flag).
- **Input:** Pointer Events (`pointerdown/move/up/cancel`), `setPointerCapture`, `getCoalescedEvents()` for smooth strokes, and CSS `touch-action: none`.
- **Hit-testing:** your own geometry (lab 10), `ctx.isPointInPath(path, x, y)`, or a hidden "colour-picking" canvas.
- **Performance:** batch paths, cache static layers in an offscreen canvas, use `OffscreenCanvas` in a Worker, avoid `getImageData` in hot loops, and skip redrawing unchanged regions.
- **Accessibility:** fallback content between the `<canvas>` tags, `role="img"` + `aria-label` for static drawings, a data table for charts, and keyboard-operable tools.

## 🎤 Interview questions
<details><summary>How would you build a collaborative whiteboard?</summary>
Shapes live as data (vectors, not pixels); canvas rendering; local command history; WebSocket sync of operations with CRDTs (e.g. Yjs) or OT; presence cursors; throttled pointer broadcasts; periodic snapshots; and viewport culling for large boards.
</details>

## Practise in Kanvas
[lab 10](../../../labs/10-canvas/README.md) · `features/whiteboard/*` · `features/dashboard/BarChartCanvas.jsx` vs `BurndownChart.jsx` (SVG)
