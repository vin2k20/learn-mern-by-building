/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/dashboard/DashboardPage.jsx · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A responsive analytics dashboard: 4 animated stat tiles, a canvas bar chart (tasks by status), a people list
 *   (tasks by assignee), and ☆ an SVG burndown chart, all from ONE GraphQL query.
 *
 * 🧠 CONCEPTS  → docs/concepts/css/grid.md (grid-template-areas), docs/concepts/web/rest-vs-graphql.md,
 *               docs/concepts/css/transitions-keyframes-animations.md · wireframes §6
 *
 * 🧩 DEPENDS ON  dashboardQueries (useGetDashboardQuery) · BarChartCanvas · BurndownChart ☆ · components/Avatar, Skeleton ·
 *               hooks/useIntersectionObserver · lib/format · Dashboard.module.css
 *
 * 📝 STEPS
 *   1. const { projectId } = useParams(); const { data, isLoading, isError, refetch } = useGetDashboardQuery(projectId)
 *   2. Stat tiles: Total tasks · Done (with a %) · Overdue · Points done / total. Each <StatTile label value>:
 *      - COUNT UP from 0 to the value when the tile scrolls into view (useIntersectionObserver + a rAF loop with easeOutCubic from lab 10),
 *        or ☆ a pure-CSS @property counter
 *      - skip the animation under prefers-reduced-motion
 *      - the markup: <dl><dt>label</dt><dd>value</dd></dl>, so it's meaningful to screen readers
 *   3. <section aria-labelledby> "Tasks by status" → <ErrorBoundary><BarChartCanvas data={data.tasksByStatus} /></ErrorBoundary>
 *   4. "People" → a list of avatars + a count + a proportional bar (a CSS width percentage, or better, transform: scaleX with an inline --pct)
 *   5. ☆ "Burndown" → <BurndownChart points={data.burndown} />
 *   6. Loading → skeletons in the same grid areas · error → a message + retry
 *   7. <title>Dashboard · Kanvas</title>
 *
 * ✅ DONE WHEN
 *   [ ] 1440px: the 4 tiles in a row, the chart spanning 3 columns next to the people list · 768px: 2 columns · 360px: 1 column
 *   [ ] The count-up animation plays once, and not at all with reduced motion
 *   [ ] One GraphQL request (Network tab), and the response contains only the fields you asked for
 *
 * 🎤 INTERVIEW ANGLE  "Why GraphQL for dashboards?", "how do you build responsive dashboards?"
 * 🤖 ASK THE AGENT    /review client/src/features/dashboard
 * ═══════════════════════════════════════════════════════════════════════════
 */
