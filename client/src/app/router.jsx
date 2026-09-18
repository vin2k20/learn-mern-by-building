/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/app/router.jsx · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Define every route ONCE with React Router 8 data mode: lazy-loaded pages (code splitting),
 *   nested layouts, an error UI, a 404, and an auth guard.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/routing-rr8.md, docs/concepts/react/performance-memo-splitting.md
 *
 * 🧩 DEPENDS ON  app/AppLayout.jsx · app/ErrorBoundary.jsx (RouteError) · app/NotFound.jsx ·
 *               features/auth/RequireAuth.jsx · every *Page.jsx
 *
 * 📝 STEPS
 *   1. import { createBrowserRouter, redirect } from 'react-router'
 *   2. A helper: const page = (loader) => async () => ({ Component: (await loader()).default })
 *      so each route can write `lazy: page(() => import('@/features/board/BoardPage.jsx'))`
 *   3. export const router = createBrowserRouter([
 *        { path: '/login', lazy: page(LoginPage) },
 *        { path: '/', element: <RequireAuth><AppLayout /></RequireAuth>, ErrorBoundary: RouteError, children: [
 *            { index: true, loader: () => redirect('/projects') },
 *            { path: 'projects', lazy: … },
 *            { path: 'projects/:projectId/board', lazy: …, children: [ { path: 'tasks/:taskId', lazy: …TaskDetailsDrawer } ] },
 *            { path: 'projects/:projectId/whiteboard', lazy: … },
 *            { path: 'projects/:projectId/dashboard', lazy: … },
 *            { path: 'activity', lazy: … },
 *            { path: 'settings', lazy: … },
 *            { path: '*', Component: NotFound },
 *        ]},
 *      ])
 *      While the pages aren't written yet, point the routes at a tiny <Placeholder title="Board" /> component.
 *   4. ☆ Replace <RequireAuth> with route middleware (RR8 turns it on by default):
 *        middleware: [async ({ request }, next) => { if (!getToken()) throw redirect(`/login?next=…`); await next(); }]
 *      Then compare the two approaches in a comment: which one runs before any page code loads?
 *   5. ☆ Preload a route's code when the user hovers a nav link:
 *      call the same import() on onMouseEnter (the module cache makes the second call instant).
 *
 * ✅ DONE WHEN
 *   [ ] Each page is a separate JS chunk (Network tab, "JS" filter, on first navigation)
 *   [ ] /nonsense renders NotFound inside the layout; throwing inside a page renders RouteError
 *   [ ] Visiting /projects while logged out redirects to /login?next=/projects, and logging in returns you there
 *
 * ⚠️ GOTCHAS
 *   - Create the router at MODULE level, never inside a component.
 *   - Child paths are relative (no leading slash).
 *   - A nested route (the task drawer) needs <Outlet/> in its parent (BoardPage).
 *
 * 🎤 INTERVIEW ANGLE  "How does code splitting work with routes?", "how do you protect routes?"
 * 🤖 ASK THE AGENT    /explain react router 8 data mode · /hint client/src/app/router.jsx step 3
 * ═══════════════════════════════════════════════════════════════════════════
 */
