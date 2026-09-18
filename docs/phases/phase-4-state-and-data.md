# Phase 4 · State management & data fetching ★ (Day 4, ~7.5 h)

**Goal:** a real state architecture. A hand-written **classic Redux** slice (to understand the Flux workflow), then
**Redux Toolkit** slices with normalised state, **RTK Query** for server state, **MSW** as the mock API, and the showpiece:
the **Board**, with drag-and-drop, memoised selectors and optimistic updates.
**[Interview topics](../interview/target-role.md) covered:** *Flux, Redux, data structure libraries · RESTful APIs · DOM events · optimised code*
**Primers:** [Flux → Redux → RTK](../concepts/react/flux-redux-rtk.md) · [REST vs GraphQL](../concepts/web/rest-vs-graphql.md) ·
[HTTP caching & CORS](../concepts/web/http-caching-cors.md) · [security: XSS, CSRF, JWT](../concepts/web/security-xss-csrf-jwt.md) ·
[API contract](../api-contract.md)

---

## Order of work
| # | File(s) | Time | Notes |
|---|---|---|---|
| 1 | `features/ui/actionTypes.js`, `actions.js`, `uiReducer.js` | 35 min | **No RTK**: action constants, creators, a switch reducer, immutable updates by hand |
| 2 | `app/store.js` | 25 min | `configureStore`, mix the classic reducer with RTK slices, `listenerMiddleware` |
| 3 | `mocks/handlers.js`, `mocks/browser.js`, `mocks/server.js` | 60 min | MSW REST handlers that follow the contract, with latency and random failures |
| 4 | `lib/httpClient.js` | 25 min | Reuse lab 05 (`retry`, `withTimeout`) and lab 07 (`LRUCache`) |
| 5 | `features/auth/*` | 55 min | `createAsyncThunk`, `useActionState`, protected routes |
| 6 | `features/projects/*` | 60 min | RTK Query endpoints and tags, a debounced filter, a modal form |
| 7 | `features/board/boardSlice.js`, `selectors.js` | 50 min | `createEntityAdapter`, fractional ordering, `createSelector` |
| 8 | `features/board/BoardPage.jsx`, `Column.jsx`, `TaskCard.jsx`, `useBoardDnD.js` | 90 min | HTML5 drag-and-drop + a keyboard alternative |
| 9 | `features/board/TaskDetailsDrawer.jsx` | 30 min | Nested route and a slide-in animation |
| ☆ | `hooks/useUndoRedo.js`, task dependencies | | lab 07 History + Graph |

## The data flow you're building
```
             UI (TaskCard drop)
                   │ dispatch(moveTask({ id, toStatus, toOrder }))
                   ▼
  boardSlice (optimistic update) ──► the UI re-renders immediately
                   │ listenerMiddleware / thunk
                   ▼
  PATCH /api/tasks/:id/move ──► MSW (Day 4) / Express (Day 7)
          │ 200                          │ 4xx/5xx
          ▼                              ▼
  confirm (replace with server data)   rollback + error toast
```

## Where each kind of state belongs
| State | Home | Why |
|---|---|---|
| Server data (projects list) | **RTK Query** cache | caching, de-duplication, invalidation, loading/error flags for free |
| Board tasks (heavy client interaction) | **RTK slice** with an entity adapter | optimistic updates, undo, drag-and-drop performance |
| Auth session | RTK slice + `localStorage` | read across the app, needed by the HTTP client |
| Sidebar open, command palette open | **classic Redux** `ui` slice | practice the Flux workflow |
| Theme | **Context** | changes rarely, needed by the styling layer |
| Form input values | **local state** / form actions | never global |
| Whiteboard shapes while drawing | **refs + local state** | 60 fps. Redux would be too slow per pointer move. |

## ✅ Checkpoint
- [ ] Redux DevTools shows readable actions (`ui/sidebarToggled`, `board/taskMoved`, `api/executeQuery/...`)
- [ ] Login with `demo@kanvas.dev` / `kanvas123`; a reload keeps you signed in; logout clears the state
- [ ] Creating a project shows it without a reload (tag invalidation)
- [ ] Dragging a card between columns feels instant. When the mock returns a 500 (~10% of the time), the card snaps back and a toast explains why.
- [ ] Keyboard: focus a card → Space → Arrow keys → Space moves it, and a screen reader announces the move
- [ ] React DevTools Profiler: moving a card re-renders only the two affected columns and the moved card

## 🎤 Drill
1. Why normalise state? What does `createEntityAdapter` generate?
2. How does `createSelector` memoise? When does it recompute?
3. RTK Query vs `createAsyncThunk` vs React Query: when would you pick each?
4. How do optimistic updates work, and how do you roll back safely?
5. Where do you store a JWT, and what are the XSS/CSRF trade-offs?
6. Explain the Flux unidirectional data flow using your `ui` slice.

🤖 `/review client/src/features/board` · `/quiz redux rtk query state management`
