/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/board/useBoardDnD.js · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   HTML5 drag-and-drop for the whole board with DELEGATED native listeners (one set on the board element),
 *   computing the target column AND index from the pointer position.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/dom-events-delegation.md · labs/09 (delegate(), the playground DnD) ·
 *               docs/concepts/web/rendering-pipeline.md (don't thrash layout during dragover)
 *
 * 📝 STEPS
 *   1. export function useBoardDnD(boardRef, { onMove })
 *      Keep onMove in a ref (the latest-callback pattern). The listeners are added once in an effect on boardRef.
 *   2. dragstart (delegated to '[data-task-id]'):
 *      e.dataTransfer.setData('text/plain', id); e.dataTransfer.effectAllowed = 'move';
 *      store { id, fromStatus } in a ref; set data-dragging on the card (in the next frame, via rAF, so the drag image isn't transparent)
 *   3. dragover on '[data-drop-zone]': e.preventDefault() (REQUIRED to allow a drop); e.dataTransfer.dropEffect = 'move'
 *      - Find the insertion index: loop over the column's cards, reading getBoundingClientRect() ONCE per card, and find the first card
 *        whose vertical midpoint is below e.clientY. Throttle this to animation frames (your lab 06 throttle, or rAF).
 *      - Set data-drag-over on the column and position a drop indicator (a CSS variable --drop-y).
 *   4. dragleave: clear data-drag-over only when leaving the column for real (!column.contains(e.relatedTarget))
 *   5. drop: e.preventDefault(); read the id; call onMoveRef.current(id, column.dataset.status, index); clean up the attributes
 *   6. dragend: clean up everything (it also fires when the drop is cancelled, e.g. with Esc)
 *   7. Return the cleanup that removes every listener.
 *   8. ☆ Auto-scroll the board horizontally when dragging near its edges (rAF loop).
 *   9. ☆ Touch: native HTML5 DnD doesn't work well on touch screens. Sketch (in a comment) how you'd implement it with Pointer Events
 *      (pointerdown + a long-press timer → a clone that follows the pointer → elementFromPoint to find the drop zone), or explain
 *      why you'd choose a library such as dnd-kit.
 *
 * ✅ DONE WHEN
 *   [ ] Dragging shows a live insertion indicator; dropping inserts at that exact position
 *   [ ] DevTools → Elements → Event Listeners on the board: exactly one of each drag event type; the cards have none
 *   [ ] Performance panel during a drag: no "forced reflow" warnings
 *
 * ⚠️ GOTCHAS  dragover fires continuously, so keep it cheap · Firefox needs setData() to be called or the drag won't start.
 *
 * 🎤 INTERVIEW ANGLE  "Explain the HTML5 DnD event sequence", "native DnD vs pointer events vs a library?"
 * 🤖 ASK THE AGENT    /explain html5 drag and drop events · /hint client/src/features/board/useBoardDnD.js step 3
 * ═══════════════════════════════════════════════════════════════════════════
 */
