/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/hooks/useUndoRedo.js · Phase 4 · Day 4 · ☆ stretch
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A generic undo/redo reducer hook: const { state, set, undo, redo, canUndo, canRedo, reset } = useUndoRedo(initial, { limit })
 *
 * 🧠 CONCEPTS  → labs/07-data-structures (History) · docs/concepts/js/design-patterns.md (command vs snapshot)
 * 🧩 USED BY    the whiteboard (if you keep shapes in local state) · settings drafts ☆
 *               (The BOARD's undo lives in Redux. See boardSlice.js's "history" step.)
 *
 * 📝 STEPS
 *   1. A reducer over { past: [], present, future: [] } with actions set / undo / redo / reset.
 *      (It's the same logic as your History class, but immutable so React can compare it.)
 *   2. `set` accepts a value or an updater, and ignores no-op sets (Object.is).
 *   3. Enforce `limit` by slicing `past`.
 *   4. Optional coalescing: consecutive `set` calls within 500ms with the same `groupKey` merge into one undo step
 *      (dragging a slider shouldn't create 60 undo steps).
 *   5. Wire up the keyboard shortcuts in the consumer (useKeyboardShortcut('mod+z'), 'shift+mod+z').
 *
 * ✅ DONE WHEN  [ ] 50 changes → 50 undos → back to the initial state · a new change after an undo clears the redo stack
 * 🎤 INTERVIEW ANGLE  "Design undo/redo" (snapshots vs commands vs patches; memory trade-offs)
 * ═══════════════════════════════════════════════════════════════════════════
 */
