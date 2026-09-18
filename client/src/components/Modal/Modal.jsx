/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/components/Modal/Modal.jsx · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   An accessible modal dialog: rendered in a portal, with focus trapped inside, closing on Esc and backdrop
 *   click, focus returned to the trigger, the page scroll locked, and enter/exit animations.
 *
 * 🧠 CONCEPTS  → docs/concepts/web/accessibility.md, docs/concepts/react/component-patterns.md (portals),
 *               labs/09-dom-events (trapFocus) · docs/concepts/css/transitions-keyframes-animations.md
 *
 * 🧩 USED BY  features/projects/NewProjectModal.jsx · features/search/CommandPalette.jsx (a variant) · delete confirmations
 *
 * 📝 STEPS
 *   Option A (recommended): the native <dialog> element
 *   1. export default function Modal({ open, onClose, title, children, footer, size = 'md' })
 *   2. const dialogRef = useRef(null). In an effect: open ? dialog.showModal() : dialog.close().
 *      showModal() gives you the top layer, inert background, Esc handling and a ::backdrop for FREE.
 *   3. Listen for the dialog's 'cancel' event (Esc) → event.preventDefault(); onClose()  (let React own the state)
 *   4. Backdrop click: onClick on the <dialog> where event.target === dialogRef.current → onClose()
 *   5. Restore focus: remember document.activeElement when it opens, and .focus() it again after it closes.
 *   6. aria-labelledby={titleId} (useId), with <h2 id={titleId}>{title}</h2>. A close button with aria-label="Close".
 *   7. Scroll lock: document.documentElement.style.overflow = 'hidden' while open (restore it in the cleanup).
 *   8. Exit animation ☆: keep the element mounted with data-state="closing" until 'animationend', then close().
 *
 *   Option B (for learning): createPortal(<div role="dialog" aria-modal="true">…</div>, document.body)
 *   plus your trapFocus() from lab 09 and your own Esc/backdrop handling. Try it, then compare the effort with Option A.
 *
 * ✅ DONE WHEN
 *   [ ] Tab never leaves the modal · Esc closes it · a backdrop click closes it · focus returns to the trigger
 *   [ ] VoiceOver announces "<title>, dialog"
 *   [ ] Background content can't be clicked or scrolled while it's open
 *   [ ] It animates in (scale-in) and respects reduced motion
 *
 * ⚠️ GOTCHAS
 *   - Calling showModal() on a dialog that's already open throws. Check dialog.open first.
 *   - StrictMode runs effects twice. Make the open/close effect idempotent.
 *
 * 🎤 INTERVIEW ANGLE  "Build an accessible modal", "why portals?", "what does <dialog> give you?"
 * 🤖 ASK THE AGENT    /explain dialog element vs custom modal · /review client/src/components/Modal
 * ═══════════════════════════════════════════════════════════════════════════
 */
