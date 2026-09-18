/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/search/CommandPalette.jsx · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A Cmd/Ctrl+K command palette that searches projects, tasks and commands with a TRIE (prefix) + FUZZY scoring,
 *   highlights the matches, and is fully keyboard and screen-reader accessible (the ARIA combobox pattern).
 *
 * 🧠 CONCEPTS  → labs/07 (Trie), labs/08 (fuzzyScore) · docs/concepts/web/accessibility.md (combobox) ·
 *               docs/concepts/react/hooks-deep-dive.md (useDeferredValue) · wireframes §7
 *
 * 🧩 DEPENDS ON  features/ui (paletteOpen, paletteClosed) · projectsApi (useGetProjectsQuery) · boardSlice (tasks) ·
 *               lib/dataStructures (Trie) · components/Modal (or its own <dialog>) · CommandPalette.module.css
 *
 * 📝 STEPS
 *   1. The open state comes from the ui slice (the classic reducer). Close on Esc, backdrop click, or after running an item.
 *   2. Build the index with useMemo from projects + loaded tasks + static commands
 *      ([{ id, type: 'project'|'task'|'command', title, subtitle, run: () => … }]):
 *      - a Trie over the WORDS of each title (insert each word → map to item ids) for fast prefix candidates
 *      - an items Map for lookup by id
 *   3. Search (const deferredQuery = useDeferredValue(query)):
 *      - empty query → recent items (localStorage) + commands ("Create project", "Toggle theme", "Go to settings")
 *      - otherwise: candidates = the union of trie.suggest(lastWord, 50); if there are fewer than 10, fall back to scanning all titles
 *      - score each candidate with fuzzyScore(query, title), drop the nulls, sort by score (descending), take 20, and group by type
 *   4. Markup (the ARIA 1.2 combobox):
 *        <input role="combobox" aria-expanded="true" aria-controls={listId} aria-activedescendant={activeId} aria-autocomplete="list"
 *               aria-label="Search projects, tasks and commands" />
 *        <ul role="listbox" id={listId}> group headings (role="presentation") and
 *          <li role="option" id={optionId} aria-selected={active}> <Highlight text={title} indices={match.indices} /> </li>
 *      Focus stays in the input. Only aria-activedescendant changes.
 *   5. Keys: ↑/↓ (wrap around) · Home/End · Enter → run the active item → close · Esc → close · Tab → trap or close
 *   6. Scroll the active option into view (element.scrollIntoView({ block: 'nearest' }))
 *   7. <Highlight>: split the text into spans, wrapping the matched indices in <mark>. Never use dangerouslySetInnerHTML.
 *   8. A live region: "12 results" (debounced) for screen readers.
 *   9. Lazy-load this component (it's only needed after the first ⌘K): lazy(() => import('./CommandPalette.jsx')) in AppLayout ☆
 *
 * 🧪 TESTS  (write client/src/features/search/CommandPalette.test.jsx, with MSW serving the projects)
 *   - pressing Meta+K (or Control+K) opens it and focuses the combobox
 *   - typing "logi" shows "Login form" as an option, with <mark> around the matched characters
 *   - ArrowDown moves aria-activedescendant · Enter navigates to the task (assert on the router location)
 *   - Escape closes it and returns focus to the element that had it before
 *
 * ✅ DONE WHEN
 *   [ ] Typing feels instant with 1,000+ indexed items (INP < 200 ms at CPU 4× slowdown)
 *   [ ] VoiceOver reads "Login form, task, 1 of 12" while arrowing
 *   [ ] The tests above pass
 *
 * 🎤 INTERVIEW ANGLE  "Design a command palette / autocomplete", "Trie vs linear scan?", "combobox accessibility?"
 * 🤖 ASK THE AGENT    /hint client/src/features/search/CommandPalette.jsx step 3 · /review client/src/features/search
 * ═══════════════════════════════════════════════════════════════════════════
 */
