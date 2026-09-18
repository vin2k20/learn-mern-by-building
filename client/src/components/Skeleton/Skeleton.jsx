/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/components/Skeleton/Skeleton.jsx · Phase 3 · Day 3 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Loading placeholders that match the final layout (preventing CLS) with a shimmer animation.
 *
 * 📝 STEPS
 *   1. export default function Skeleton({ variant = 'text', width, height, lines = 1, className })
 *      variants: text · circle · rect · card · page
 *   2. Render <span aria-hidden="true"> elements (decorative). The PARENT region should carry aria-busy="true"
 *      and have a visually hidden "Loading…" message.
 *   3. `lines` renders several text bars, with the last one shorter (60%).
 *   4. Size via style={{ '--sk-w': width, '--sk-h': height }} (CSS custom properties from props).
 *
 * ✅ DONE WHEN  [ ] The projects page skeleton occupies the same space as the loaded cards (no jump)
 * 🎤 INTERVIEW ANGLE  "Skeletons vs spinners?", "how do skeletons help CLS and perceived performance?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
