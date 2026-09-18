/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/projects/ProjectsPage.jsx · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A list of projects in a responsive card grid, with a debounced search filter synced to the URL,
 *   loading/empty/error states, and a "New project" modal.
 *
 * 🧠 CONCEPTS  → docs/concepts/css/grid.md (auto-fill), docs/concepts/react/performance-memo-splitting.md,
 *               docs/concepts/react/routing-rr8.md (useSearchParams) · wireframes §3
 *
 * 🧩 DEPENDS ON  projectsApi (useGetProjectsQuery) · hooks/useDebounce · ProjectCard · NewProjectModal ·
 *               components/Skeleton, Button · ProjectsPage.module.css
 *
 * 📝 STEPS
 *   1. The search state lives in the URL: const [params, setParams] = useSearchParams(); const q = params.get('q') ?? ''
 *      A local input value (for instant typing), debounced (300 ms) into the URL with replace: true.
 *      Why the URL? (Shareable, survives a reload, and the back button works.)
 *   2. const { data: projects = [], isLoading, isFetching, isError, error, refetch } = useGetProjectsQuery(debouncedQ)
 *   3. States:
 *      - isLoading → 6 <Skeleton variant="card" /> in the same grid (the region has aria-busy)
 *      - isError → a message + a Retry button (refetch)
 *      - an empty list and no query → an empty state illustration + a "Create your first project" CTA
 *      - an empty list with a query → "No projects match “q”" + a Clear button
 *      - isFetching (background) → a subtle top progress bar rather than skeletons
 *   4. The header: an <h1>Projects</h1> + a count, the search input (type="search", a label, ⌘K hint ☆), and a New project button.
 *   5. The grid: <ul className="auto-grid" role="list">{projects.map(p => <li key={p.id}><ProjectCard project={p} /></li>)}</ul>
 *   6. <NewProjectModal open={…} onClose={…} />. After creating → a toast + navigate to the new board ☆
 *   7. <title>Projects · Kanvas</title>
 *   8. ☆ Wrap the list update in startTransition or use useDeferredValue for q, and compare with debouncing.
 *
 * ✅ DONE WHEN
 *   [ ] Typing filters with ONE request per pause · the URL updates · a reload keeps the filter
 *   [ ] 1 / 2 / 3 / 4 columns as the width grows, with NO media query (auto-fill)
 *   [ ] Every state (loading, error, empty, filtered-empty, data) is implemented and reachable
 *       (use MSW's server.use or a ?fail flag to force errors)
 *
 * 🎤 INTERVIEW ANGLE  "Which states should every data view handle?", "URL state vs component state?"
 * 🤖 ASK THE AGENT    /review client/src/features/projects
 * ═══════════════════════════════════════════════════════════════════════════
 */
