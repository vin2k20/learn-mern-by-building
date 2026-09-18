/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/components/Dropdown/Dropdown.jsx · Phase 3 · ☆ stretch (the avatar menu, board filters)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A menu button: <Dropdown label="Filter"><Dropdown.Item onSelect>…</Dropdown.Item></Dropdown>
 *   that opens on click/Enter/ArrowDown, closes on Esc/outside click, and supports keyboard navigation.
 *
 * 🧠 CONCEPTS  → docs/concepts/web/accessibility.md (the menu button pattern), hooks/useClickOutside.js,
 *               docs/concepts/web/trends-2026.md (Popover API + anchor positioning)
 *
 * 📝 STEPS
 *   1. The trigger <button aria-haspopup="menu" aria-expanded aria-controls>
 *   2. The menu <ul role="menu"> with <li role="menuitem" tabIndex={-1}> items. When it opens, focus the first item.
 *   3. Keys: ArrowUp/Down (wrap around), Home/End, typeahead (focus the next item starting with the typed letter ☆), Esc (close + focus the trigger), Tab (close).
 *   4. Close on outside click with useClickOutside(ref, close).
 *   5. Positioning: first with CSS (position: absolute; inset-block-start: 100%). ☆ Then try the native Popover API
 *      (popover attribute + popovertarget) with CSS anchor positioning (anchor-name / position-anchor) and no JS positioning.
 *
 * ✅ DONE WHEN  [ ] Fully keyboard operable · focus returns to the trigger · it doesn't overflow the viewport on mobile
 * 🎤 INTERVIEW ANGLE  "Make a custom dropdown accessible."
 * ═══════════════════════════════════════════════════════════════════════════
 */
