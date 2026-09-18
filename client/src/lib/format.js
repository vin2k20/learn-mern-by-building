/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/lib/format.js · Phase 3 · Day 3 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Locale-aware formatting with the Intl APIs (no date library needed).
 *
 * 📝 STEPS
 *   1. formatDate(iso, opts) → new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', ...opts }).format(new Date(iso))
 *   2. formatRelative(iso, now = Date.now()) → "5 minutes ago" / "in 2 days" with Intl.RelativeTimeFormat
 *      (choose the unit: seconds < 60 → seconds, < 3600 → minutes, and so on)
 *   3. formatNumber(n, locale) → Intl.NumberFormat. ☆ Compare the grouping for 100000: 'en-US' → 100,000 vs 'en-IN' → 1,00,000
 *   4. formatCurrency(amount, 'INR') for the pricing display ☆
 *   5. Cache the Intl.* instances in a Map (creating them is relatively expensive). Which lab pattern is that? (memoize!)
 *   ☆ Temporal: check whether `Temporal` is available in your browser and compare the APIs.
 *
 * 🧩 USED BY  ActivityFeed (relative time) · TaskCard (due dates) · DashboardPage (numbers)
 * ✅ DONE WHEN  [ ] "2 minutes ago" updates when the component re-renders · 'en-IN' shows lakh grouping
 * ═══════════════════════════════════════════════════════════════════════════
 */
