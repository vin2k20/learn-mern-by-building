# Product brief: Kanvas

> *"A lightweight board + whiteboard that small product teams actually enjoy."*

Read this before you write any code. It's the "customer requirement" you're building against, just like a ticket from a product manager.

## Who it's for
Small product teams (3–15 people) who want a fast Kanban board, a place to sketch ideas next to their tasks, and a simple progress dashboard.

## Screens
| Screen | What it does | Key skills it exercises |
|---|---|---|
| **Landing page** (`landing/`) | Marketing site: hero, features, pricing, FAQ, contact form | Semantic HTML, Flexbox, Grid, media queries, `@keyframes`, accessibility |
| **Login** | Email + password, JWT session | Forms, validation, async thunks, protected routes |
| **Projects** | Responsive grid of project cards, search, a "New project" modal | RTK Query, debouncing, portals, focus management, container queries |
| **Board** ★ | Kanban columns (To do / In progress / Review / Done), drag-and-drop cards, filters, a task drawer, undo | DOM drag events, normalised Redux state, memoised selectors, optimistic updates |
| **Whiteboard** ★ | A sketch pad per project: pen, shapes, eraser, colours, undo/redo, PNG export | **Canvas API**, pointer events, `requestAnimationFrame`, the command pattern |
| **Dashboard** | Stat tiles, a canvas bar chart, an SVG burndown chart | **GraphQL**, canvas drawing and hit-testing, CSS Grid areas |
| **Command palette** | `Cmd/Ctrl + K` fuzzy search over projects and tasks | a **Trie**, fuzzy scoring, keyboard navigation |
| **Activity feed** | 10,000 events with smooth scrolling | list **virtualisation**, IntersectionObserver, profiling |
| **Settings** | Theme (light/dark/system), reduced motion, a "legacy" class widget | Context, `matchMedia`, the class component lifecycle |

Wireframes: [design/wireframes.md](design/wireframes.md) · Design tokens: [design/design-tokens.md](design/design-tokens.md) · API: [api-contract.md](api-contract.md)

## User stories (the product-level acceptance tests)
1. As a visitor, I can read about Kanvas on any device, and the page looks intentional at 360 px, 768 px and 1440 px.
2. As a user, I can sign in and stay signed in across reloads; signing out clears my session.
3. As a user, I can create a project and see it appear without a full page reload.
4. As a user, I can drag a task between columns with a mouse **or** move it with the keyboard.
5. As a user, if the server rejects a move, the card snaps back and I see an error toast.
6. As a user, I can undo my last board change with `Cmd/Ctrl + Z`.
7. As a user, I can sketch on a whiteboard, undo strokes and download the drawing as a PNG.
8. As a user, I can open the command palette and jump to any task by typing part of its title.
9. As a user, I can scroll 10k activity items without jank (60 fps, no long tasks over 50 ms while scrolling).
10. As a user, the app respects my OS dark-mode and reduced-motion preferences.

**Demo login** (mock API and seeded database): any seeded email, e.g. `demo@kanvas.dev`, with the password `kanvas123`.

## Quality bars (non-functional requirements)
| Area | Requirement |
|---|---|
| Responsive | Works at 360 / 768 / 1024 / 1440 px with no page-level horizontal scroll on phones |
| Accessibility | WCAG 2.2 AA mindset: everything keyboard-operable, visible focus, labelled controls, announcements for toasts and moves. Lighthouse Accessibility ≥ 95. |
| Performance | Lighthouse Performance ≥ 90 on the production build; 60 fps drawing and scrolling; INP < 200 ms on typing |
| Motion | Only `transform`/`opacity` animations; `prefers-reduced-motion` respected |
| Resilience | Every data view handles its loading, empty, error and success states; failed mutations roll back |
| Security | No `innerHTML` with user data; passwords hashed; JWT verified on every protected route; no secrets in the repo |
| Consistency | The mock API (MSW) and the real API (Express) both follow [api-contract.md](api-contract.md) exactly |
| Quality | Lint clean; lab tests green; client and server tests for the critical flows |

## Out of scope (ideas for after you finish)
Real-time collaboration, file attachments, notifications, SSO, i18n, mobile apps. [frontend-system-design.md](interview/frontend-system-design.md) discusses how you'd add real-time collaboration.
