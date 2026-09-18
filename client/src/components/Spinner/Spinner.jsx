/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/components/Spinner/Spinner.jsx · Phase 3 · Day 3 · ★ core (5 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  An accessible loading indicator.
 * 📝 STEPS
 *   1. export default function Spinner({ size = 'md', label = 'Loading' })
 *   2. Render <span role="status" className={styles.spinner} data-size={size}><span className="visually-hidden">{label}</span></span>
 *   3. ☆ Delay showing it by 300 ms (a CSS animation-delay with opacity) so fast requests don't flash a spinner.
 * ✅ DONE WHEN  [ ] Screen readers announce "Loading" · no flash for requests faster than 300 ms
 * ═══════════════════════════════════════════════════════════════════════════
 */
