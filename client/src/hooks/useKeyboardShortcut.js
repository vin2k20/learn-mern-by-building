/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/hooks/useKeyboardShortcut.js · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   useKeyboardShortcut('mod+k', handler, { enabled, allowInInputs = false, preventDefault = true })
 *   where "mod" means ⌘ on macOS and Ctrl elsewhere.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/dom-events-delegation.md, docs/concepts/web/accessibility.md
 * 🧩 USED BY    AppLayout (mod+k) · Whiteboard (mod+z, shift+mod+z, delete) · Board (mod+z)
 *
 * 📝 STEPS
 *   1. Parse the combo string once (useMemo): { key: 'k', mod: true, shift: false, alt: false }
 *   2. isMac = /Mac|iPhone|iPad/.test(navigator.userAgent) (or navigator.userAgentData?.platform)
 *   3. A window 'keydown' listener: match event.key (case-insensitive), and match mod against event.metaKey (Mac) or event.ctrlKey.
 *   4. Skip the event when its target is an input, textarea, select or contenteditable, unless allowInInputs is set.
 *   5. Skip it when event.isComposing (IME input, e.g. typing in Hindi or Japanese).
 *   6. Keep the handler in a ref, and clean up the listener.
 *   7. Export formatShortcut('mod+k') → '⌘K' or 'Ctrl K' for UI hints (wrap them in <kbd>).
 *
 * ✅ DONE WHEN  [ ] ⌘K opens the palette on Mac and Ctrl+K on Windows/Linux · typing "k" in an input doesn't trigger it
 * ⚠️ GOTCHAS    Don't override browser or OS shortcuts users rely on (Cmd+W, Ctrl+T).
 * 🎤 INTERVIEW ANGLE  "How do you implement global keyboard shortcuts accessibly?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
