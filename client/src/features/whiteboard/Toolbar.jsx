/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/whiteboard/Toolbar.jsx · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  An accessible toolbar: tools (a radio group), colour swatches, stroke width, undo/redo, clear, export and a save status.
 *
 * 🧠 CONCEPTS  → docs/concepts/web/accessibility.md (the toolbar pattern, roving tabindex), docs/concepts/css/flexbox.md
 *
 * 📝 STEPS
 *   1. Props: { tool, onToolChange, style, onStyleChange, canUndo, canRedo, onUndo, onRedo, onClear, onExport, saveState }
 *   2. <div role="toolbar" aria-label="Drawing tools" aria-orientation={isMobile ? 'vertical' : 'horizontal'}>
 *   3. Tools: a group of <button aria-pressed={tool === id}> (or a role="radiogroup" of radios) with an icon + a visually hidden label + a
 *      title showing the shortcut ("Rectangle (4)")
 *   4. Colours: 6 swatches (radio inputs styled as circles, each with an accessible name). Stroke width: <input type="range" min=1 max=24> + an <output>
 *   5. Undo/Redo (disabled when unavailable), Clear (asks for confirmation), Export PNG, and a save status ("Saved" · "Saving…" · "Offline")
 *   6. ☆ A roving tabindex so Tab enters the toolbar once and the arrow keys move within it.
 *
 * ✅ DONE WHEN  [ ] The whole toolbar can be used with the keyboard · the selected tool is announced
 * ═══════════════════════════════════════════════════════════════════════════
 */
