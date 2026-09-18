/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/whiteboard/drawingEngine.js · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   The framework-agnostic whiteboard engine: scene data, tool STRATEGIES, COMMANDS with undo/redo, hit-testing and
 *   rendering. It's pure JS, so it's testable without React or a real canvas.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/design-patterns.md (command, strategy, observer), docs/concepts/web/canvas-vs-svg.md,
 *               labs/10-canvas (hitTestShapes, simplifyPath) · labs/07 (Stack / History) · labs/03 (EventEmitter)
 *
 * 📝 STEPS
 *   1. export function createEngine({ shapes = [] } = {}) returns an object with:
 *      - state: { shapes, selectedId: null, draft: null }   (draft = the shape currently being drawn)
 *      - an emitter: on('change', fn) → unsubscribe  (CanvasBoard subscribes and schedules a redraw)
 *   2. COMMANDS (each has do() and undo()):
 *      - addShape(shape) · removeShape(id) · moveShape(id, dx, dy) ☆ · clearAll() (undo restores every shape)
 *      execute(cmd) → cmd.do(); undoStack.push(cmd); redoStack.clear(); emit('change')
 *      undo() / redo() / canUndo / canRedo (limit to 100)
 *   3. TOOL STRATEGIES: tools = { pen, line, rect, ellipse, eraser, select }, each an object with
 *        onPointerDown(engine, point, style) · onPointerMove(engine, point) · onPointerUp(engine)
 *      - pen: the draft gets points pushed on move; on up → simplifyPath(points, 0.75) ☆ → execute(addShape(draft))
 *      - rect/ellipse/line: the draft updates w/h from the start point; on up → ignore tiny shapes (< 3px) → addShape
 *      - eraser: on down/move → hitTestShapes(...) → execute(removeShape(id))
 *      - select: on down → selectedId = hitTestShapes(...); ☆ drag moves the shape (a single moveShape command on up)
 *      The engine keeps `activeTool` and delegates pointer events to it. That's the Strategy pattern: no switch statements scattered around.
 *   4. render(ctx, { width, height, theme }) → clear, draw each shape (a drawShape(ctx, shape) helper per type),
 *      then the draft, then the selection box (dashed). Use ctx.save()/restore() around each shape. lineCap/lineJoin = 'round'.
 *   5. serialize() → { shapes } (JSON for PUT /api/projects/:id/drawing) · load(shapes) resets the history.
 *   6. ☆ Viewport culling: skip shapes whose bounding box is outside the visible area.
 *   7. 🧪 ☆ Vitest: execute 3 addShape commands → undo twice → one shape left → redo → two shapes.
 *
 * ✅ DONE WHEN
 *   [ ] No React imports in this file
 *   [ ] Undo/redo works for add, erase and clear
 *   [ ] Adding a new tool means adding ONE strategy object
 *
 * 🎤 INTERVIEW ANGLE  "Design undo/redo for a drawing app", "which design patterns did you use and why?"
 * 🤖 ASK THE AGENT    /explain command pattern undo redo · /hint client/src/features/whiteboard/drawingEngine.js step 3
 * ═══════════════════════════════════════════════════════════════════════════
 */
