/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/09-dom-events/playground/app.js · Phase 2 · Day 2 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Make "Quick Tasks" work with ZERO frameworks: add, toggle, delete, drag between
 *   columns, move with the keyboard, and persist to localStorage.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/dom-events-delegation.md, docs/concepts/web/rendering-pipeline.md
 *   a single source of truth (a state object) → render() · event delegation ·
 *   the HTML5 Drag and Drop API · keyboard accessibility · localStorage · the observer pattern
 *
 * 🧩 DEPENDS ON
 *   ../dom-events.js (your helpers: delegate, renderList, emitCustom, serializeForm)
 *   ../../03-object-model/object-model.js (EventEmitter, optional: a tiny store)
 *
 * 📝 STEPS
 *   1. State: `let state = load() ?? { tasks: [] }` where each task is
 *      { id, title, status, done }. load() / save() use localStorage (JSON). Wrap them in
 *      try/catch, since storage can throw (Safari private mode, quota exceeded).
 *   2. A tiny store: setState(updater) → state = updater(state); save(); render().
 *      (That's the whole Redux idea in three lines. You'll see it again in lab 13.)
 *   3. render(): for each column, filter the tasks by status and call
 *      renderList(column.querySelector('.list'), tasks, renderTask). Update the .count badges.
 *   4. renderTask(task): clone the <template> content (template.content.cloneNode(true)),
 *      fill in the title with textContent, and set data-id. Add a `done` class when done.
 *   5. The new-task form: on 'submit', preventDefault(), serializeForm(), validate
 *      (trimmed title), add the task with crypto.randomUUID(), reset the form, and focus the input again.
 *   6. Event delegation on #board (ONE listener per event type):
 *      - click on [data-action="toggle"] → toggle done
 *      - click on [data-action="delete"] → open the <dialog> (showModal()) and delete only if
 *        dialog.returnValue === 'confirm' (listen for the dialog's 'close' event)
 *   7. Drag & drop (delegated too):
 *      - dragstart on .task → event.dataTransfer.setData('text/plain', id); add a .dragging class
 *      - dragover on .column → event.preventDefault() (REQUIRED, or drop never fires); add .drop-target
 *      - dragleave / drop → remove .drop-target. On drop, read the id and move the task to column.dataset.status
 *      - dragend → remove .dragging
 *   8. Keyboard alternative (accessibility): when a .task has focus,
 *      ArrowLeft / ArrowRight moves it to the previous/next column, Delete asks to delete it,
 *      and Space/Enter toggles it. After re-rendering, focus the moved task again
 *      (query it by data-id). Announce the move in #announcer.
 *   9. Emit a 'task:changed' CustomEvent (emitCustom) after every change, and log it from
 *      a listener on document. (Practice for decoupled modules.)
 *  10. Performance check: add 1,000 tasks from the console, e.g.
 *      window.seed = (n) => setState(s => ({ ...s, tasks: [...s.tasks, ...Array.from({ length: n }, …)] }))
 *      Record in DevTools → Performance. How long does render() take? What would you change?
 *      (Hint: only re-render the columns that changed, or diff by id.)
 *
 * ✅ DONE WHEN
 *   [ ] Add / toggle / delete / drag / keyboard-move all work and survive a reload
 *   [ ] Exactly one click listener exists on #board (DevTools → Elements → Event Listeners)
 *   [ ] The widget can be used with the keyboard alone
 *   [ ] No task title is ever inserted with innerHTML
 *
 * 💡 HINTS
 *   - document.querySelector('#task-template').content.firstElementChild.cloneNode(true)
 *   - event.target.closest('.column')
 *   - dialog.addEventListener('close', () => { if (dialog.returnValue === 'confirm') … }, { once: true })
 *
 * ⚠️ GOTCHAS
 *   - dragover must call preventDefault() or `drop` will never fire.
 *   - dragleave also fires when you move over child elements (check event.relatedTarget).
 *   - After replaceChildren, previously focused nodes are gone, so restore the focus yourself.
 *
 * 🎤 INTERVIEW ANGLE
 *   "Build a todo app in vanilla JS", "how would you structure state without a framework?",
 *   "make drag-and-drop accessible".
 *
 * 🚀 STRETCH ☆  reorder within a column (insert before the hovered task) · undo with your History class (lab 07)
 *
 * 🤖 ASK THE AGENT
 *   /explain HTML5 drag and drop events · /hint labs/09-dom-events/playground/app.js step 7 ·
 *   /review labs/09-dom-events/playground
 * ═══════════════════════════════════════════════════════════════════════════
 */
