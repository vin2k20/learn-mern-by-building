/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/whiteboard/WhiteboardPage.jsx · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   The container for the whiteboard: load the saved drawing, own the engine and tool state, autosave (debounced),
 *   and lay out the toolbar and canvas.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/component-patterns.md (container), hooks/useDebounce (autosave),
 *               docs/api-contract.md (GET/PUT /api/projects/:id/drawing)
 *
 * 📝 STEPS
 *   1. const { projectId } = useParams(). Load the drawing (an RTK Query endpoint you add with api.injectEndpoints:
 *      getDrawing / saveDrawing, with tag 'Drawing').
 *   2. const [engine] = useState(() => createEngine()). When the drawing data arrives (or projectId changes) → engine.load(data.shapes).
 *   3. The tool and style live in local state (they don't need to be in Redux. Why not?).
 *   4. canUndo/canRedo: subscribe to engine changes and copy those two booleans into state (a tiny useSyncExternalStore ☆).
 *   5. Autosave: onChange → a debounced (1500 ms) saveDrawing({ projectId, shapes: engine.serialize().shapes }).
 *      Show the save state in the toolbar. Flush the pending save on unmount and on `pagehide`.
 *      ☆ Save a local draft to localStorage when offline (navigator.onLine / the 'offline' event) and sync it when back online.
 *   6. Export: exportImage.js (lazy-load it with a dynamic import() on click, since the user rarely needs it).
 *   7. Layout: <div className={styles.page}> Toolbar + <ErrorBoundary><CanvasBoard …/></ErrorBoundary> </div>
 *   8. <title>Whiteboard · Kanvas</title>
 *
 * ✅ DONE WHEN
 *   [ ] Draw → wait → reload → the drawing is still there (MSW memory, or the real DB on Day 7)
 *   [ ] Rapid drawing produces at most one save per 1.5 s (Network tab)
 *   [ ] The whiteboard route is its own chunk, and exportImage is a separate chunk loaded on first export
 *
 * 🎤 INTERVIEW ANGLE  "How would you implement autosave?", "when is local state better than Redux?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
