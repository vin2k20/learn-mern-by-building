/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 landing/js/main.js · Phase 1 · Day 6 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Progressive enhancement: the page works without JS, and JS adds the mobile menu,
 *   the scroll reveal, the header shadow, the theme toggle and friendly form validation.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/dom-events-delegation.md, docs/concepts/web/accessibility.md
 *   IntersectionObserver · Constraint Validation API · aria-expanded / aria-pressed ·
 *   passive listeners · localStorage · matchMedia
 *
 * 🧩 DEPENDS ON  ids and data attributes you added in index.html
 *               (optional: import helpers from ../../labs/09-dom-events/dom-events.js)
 *
 * 📝 STEPS
 *   1. Mobile menu
 *      - Clicking the toggle flips aria-expanded and sets or removes data-menu-open on the header.
 *      - Esc closes it and returns focus to the toggle. A click outside closes it (onClickOutside from lab 09).
 *      - Closing when the viewport reaches ≥ 64rem: matchMedia('(min-width: 64rem)').addEventListener('change', …)
 *   2. Header shadow: an IntersectionObserver on a 1px sentinel at the top of <main> sets data-scrolled on the header.
 *      (Why is this better than a scroll listener? Write your answer in a comment.)
 *   3. Reveal on scroll: observe every [data-reveal] element (threshold 0.15), add .is-visible once, then unobserve it.
 *      Skip all of this if the browser supports scroll-driven animations (CSS.supports('animation-timeline: view()')).
 *   4. Theme toggle
 *      - Cycle through light → dark → system. Store the choice in localStorage ('kanvas-theme'), set or remove
 *        document.documentElement.dataset.theme, and update aria-pressed and the button label.
 *   5. Contact form validation (the Constraint Validation API)
 *      - On submit: preventDefault(). For each field, if !field.checkValidity(), show a friendly message based on
 *        field.validity (valueMissing, typeMismatch, tooShort), set aria-invalid="true", and write the message into
 *        the matching .field-error. Focus the FIRST invalid field.
 *      - On 'input' after the first submit: re-validate that field live.
 *      - The message character counter: update the <output> on input ("123 / 500").
 *      - If everything is valid: disable the button, simulate sending (await a 800ms sleep), then show
 *        "Thanks! We'll be in touch." in the role="status" region and reset the form.
 *   6. The current year in the footer.
 *   7. ☆ A canvas particle background behind the hero (reuse your lab 10 playground). Pause it when
 *      the page is hidden or the user prefers reduced motion.
 *
 * ✅ DONE WHEN
 *   [ ] With JS disabled (DevTools → Command menu → "Disable JavaScript") the page is still readable and the nav links work on desktop
 *   [ ] The mobile menu works with mouse, keyboard and a screen reader (aria-expanded is announced)
 *   [ ] Invalid fields are announced (aria-invalid + aria-describedby), and focus moves to the first error
 *   [ ] No console errors · no scroll event listeners
 *
 * 💡 HINTS  field.validity.valueMissing · form.elements · new IntersectionObserver(cb, { rootMargin: '0px 0px -10% 0px' })
 *
 * ⚠️ GOTCHAS
 *   - Add `novalidate` to the form, or the browser's own bubbles fire before your handler.
 *   - The inline theme script in <head> and this file must use the same storage key.
 *
 * 🎤 INTERVIEW ANGLE  "What is progressive enhancement?", "IntersectionObserver vs scroll events?"
 * 🤖 ASK THE AGENT    /explain constraint validation api · /review landing/js/main.js
 * ═══════════════════════════════════════════════════════════════════════════
 */
