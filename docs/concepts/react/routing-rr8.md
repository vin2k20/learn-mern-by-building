# Routing with React Router 8 (data mode)

> **TL;DR:** create the router **once, outside React**, with `createBrowserRouter` (from `react-router`), and render it with
> `<RouterProvider>` (from `react-router/dom`). Routes are objects with `path`, `Component`, `lazy`, `loader`, `action`,
> `ErrorBoundary`/`errorElement`, `middleware` and `children`.

## What's new in v8 (June 2026)
- `react-router-dom` is **gone**: import from `react-router` (and `react-router/dom` for `RouterProvider`).
- ESM-only. Requires **Node ≥ 22.22** and **React ≥ 19.2.7**.
- Middleware and split route modules are on by default (these were future flags in v7). A "deliberately boring" release.
- The three modes still exist: **declarative** (`<BrowserRouter>`), **data** (`createBrowserRouter`, used in Kanvas), and **framework** (the Vite plugin, which is the Remix successor).

## Kanvas route table
```js
import { createBrowserRouter, redirect } from 'react-router';
export const router = createBrowserRouter([
  { path: '/login', lazy: () => import('@/features/auth/LoginPage.jsx').then((m) => ({ Component: m.default })) },
  {
    path: '/',
    Component: AppLayout,
    ErrorBoundary: RouteError,
    // middleware: [requireAuthMiddleware],   ← alternative to <RequireAuth>
    children: [
      { index: true, loader: () => redirect('/projects') },
      { path: 'projects', lazy: … },
      { path: 'projects/:projectId/board', lazy: …, children: [{ path: 'tasks/:taskId', lazy: … }] },
      { path: 'projects/:projectId/whiteboard', lazy: … },
      { path: 'projects/:projectId/dashboard', lazy: … },
      { path: 'activity', lazy: … },
      { path: 'settings', lazy: … },
      { path: '*', Component: NotFound },
    ],
  },
]);
```

## Hooks & components you'll use
`<Outlet/>` · `<Link>` / `<NavLink>` (active styling via a `className` function) · `useNavigate()` · `useParams()` · `useLocation()` ·
`useSearchParams()` · `useLoaderData()` · `useNavigation()` (global pending UI) · `useRouteError()` · `redirect()` · `<ScrollRestoration/>`

## Middleware example (data mode)
```js
async function requireAuth({ request }, next) {
  if (!getToken()) throw redirect(`/login?next=${encodeURIComponent(new URL(request.url).pathname)}`);
  await next();
}
```

## Pitfalls
- Creating the router inside a component (it gets re-created every render).
- Forgetting `<Outlet/>` in layout routes.
- Absolute vs relative paths in children (child paths are relative, without a leading `/`).
- Hosting: the server must fall back to `index.html` for client routes.

## 🎤 Interview questions
<details><summary>Client-side routing: how does it work?</summary>
The History API (`pushState`/`popstate`) changes the URL without reloading the page. The router matches the URL to route objects and renders the matching component tree. Links intercept clicks.
</details>
<details><summary>Loaders vs fetching in effects?</summary>
Loaders start fetching before the component renders (no waterfalls, and the fetch can run in parallel with lazy code loading) and integrate with pending UI and error boundaries. Effects fetch after render.
</details>

## Practise in Kanvas
`client/src/app/router.jsx` · `features/auth/RequireAuth.jsx`
