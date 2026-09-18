/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/components/Button/Button.jsx · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   One accessible button for the whole app: variants, sizes, a loading state, icon slots,
 *   polymorphic rendering (as a link), and ref forwarding (React 19 style).
 *
 * 🧠 CONCEPTS  → docs/concepts/react/component-patterns.md, docs/concepts/react/react-19-features.md (ref as a prop)
 *
 * 📝 STEPS
 *   1. export default function Button({ as: Tag = 'button', variant = 'primary', size = 'md', loading = false,
 *        iconStart, iconEnd, className, children, ref, ...rest })
 *   2. Render <Tag ref={ref} className={[styles.button, className].filter(Boolean).join(' ')}
 *        data-variant={variant} data-size={size} data-loading={loading || undefined} …rest>
 *      - If Tag === 'button', default type="button" (a sneaky bug otherwise: buttons inside forms submit!).
 *      - loading → aria-busy="true", disabled (for buttons), and a <Spinner size="sm" /> in place of iconStart.
 *      - Wrap the children in <span className={styles.label}> so the width doesn't jump while loading ☆.
 *   3. Variants: primary · secondary · ghost · danger. Sizes: sm · md · lg.
 *   4. Icon-only usage must require an aria-label. Log a console.warn in dev if there are no children and no aria-label.
 *
 * ✅ DONE WHEN
 *   [ ] <Button as={Link} to="/x"> renders an <a> with button styling
 *   [ ] A ref gives you the DOM node (test it with ref.current.focus())
 *   [ ] It's keyboard operable and the focus ring is visible
 *
 * 💡 HINTS  Variants via data attributes keep the CSS simple: .button[data-variant="ghost"] { --btn-bg: transparent }
 * 🎤 INTERVIEW ANGLE  "How do you design a reusable component API?", "forwardRef in React 19?"
 * 🤖 ASK THE AGENT    /explain polymorphic as prop · /review client/src/components/Button
 * ═══════════════════════════════════════════════════════════════════════════
 */
