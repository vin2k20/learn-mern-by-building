/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/whiteboard/CanvasBoard.jsx · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Bridge React and an imperative <canvas>: hi-DPI sizing, pointer input, a rAF render loop that only draws when something
 *   changed, keyboard shortcuts, and a thorough cleanup. React state must NOT be updated on every pointermove.
 *
 * 🧠 CONCEPTS  → docs/concepts/web/canvas-vs-svg.md, docs/concepts/react/hooks-deep-dive.md (useRef, useEffect cleanup),
 *               docs/concepts/js/memory-leaks.md, docs/concepts/js/event-loop.md (rAF) · labs/10 playground
 *
 * 🧩 DEPENDS ON  drawingEngine.js · labs/10 scaleForDPR (copy it into lib/) · hooks/useKeyboardShortcut · context/ThemeContext
 *
 * 📝 STEPS
 *   1. Props: { engine, tool, style, onChange }  (engine is created ONCE by WhiteboardPage with useState(() => createEngine(…)))
 *   2. const canvasRef = useRef(null); const needsDraw = useRef(true)
 *   3. An effect for sizing: a ResizeObserver on the parent → scaleForDPR → set canvas.width/height → ctx.setTransform(dpr,…) →
 *      needsDraw = true. (Why re-apply the transform after changing the width?)
 *   4. An effect for the render loop: let rafId; const frame = () => { if (needsDraw.current) { engine.render(ctx, …); needsDraw.current = false }
 *      rafId = requestAnimationFrame(frame) }; the cleanup → cancelAnimationFrame(rafId)
 *      Subscribe to engine 'change' → needsDraw.current = true; onChange?.(). Unsubscribe in the cleanup.
 *      ☆ Pause the loop when document.hidden.
 *   5. Pointer events (React props on <canvas>):
 *      onPointerDown → e.currentTarget.setPointerCapture(e.pointerId); engine.pointerDown(point(e), style)
 *      onPointerMove → use e.nativeEvent.getCoalescedEvents?.() for smooth strokes; engine.pointerMove(point)
 *      onPointerUp / onPointerCancel → engine.pointerUp()
 *      point(e) = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
 *   6. Cursor per tool via data-tool on the canvas (CSS decides the cursor).
 *   7. Keyboard: mod+z → engine.undo() · shift+mod+z → engine.redo() · Delete/Backspace → remove the selected shape ·
 *      the number keys 1–6 switch tools ☆
 *   8. Theme: when the theme changes, re-read the colours (getComputedStyle) and set needsDraw.
 *   9. Accessibility: <canvas role="img" aria-label={`Whiteboard with ${count} shapes`}> with fallback text inside, and
 *      a visually hidden live region announcing "Rectangle added" etc. ☆
 *  10. Wrap it in <ErrorBoundary resetKey={projectId}> from the page.
 *
 * ✅ DONE WHEN
 *   [ ] Crisp at 200% zoom and on Retina · resizing the window doesn't blur or distort the drawing
 *   [ ] Drawing a long stroke causes ZERO React re-renders of CanvasBoard (Profiler)
 *   [ ] Navigating away and back 5× leaks nothing (Memory panel: no growing listeners or observers)
 *   [ ] Works with touch in DevTools device mode (touch-action: none in the CSS)
 *
 * ⚠️ GOTCHAS
 *   - Creating the engine in the render body → a new engine every render (use useState's lazy initialiser or a ref).
 *   - StrictMode mounts effects twice: the render loop must fully clean up, or you'll get two loops.
 *
 * 🎤 INTERVIEW ANGLE  "How do you integrate imperative APIs (canvas, maps, charts) with React?", "how did you keep drawing at 60 fps?"
 * 🤖 ASK THE AGENT    /hint client/src/features/whiteboard/CanvasBoard.jsx step 4 · /review client/src/features/whiteboard
 * ═══════════════════════════════════════════════════════════════════════════
 */
