# Flux → Redux → Redux Toolkit (and RTK Query)

> **TL;DR:** unidirectional data flow. **Flux** used many stores and a dispatcher. **Redux** uses one store, pure reducers and middleware.
> **Redux Toolkit** is the official, batteries-included way to write Redux today. **RTK Query** handles server state.

## Flux (Facebook, 2014)
```
Action ──► Dispatcher ──► Store A ──► View
                     └──► Store B (waitFor A) ──► View ──► Action …
```
Multiple stores, each registered with a single Dispatcher. `waitFor` orders store updates. Stores hold their logic and emit change events.

## Redux (2015)
```
UI ──dispatch(action)──► middleware ──► rootReducer(state, action) ──► new state ──► subscribers (UI)
```
Three principles: **single source of truth**, **state is read-only** (only actions change it), and **changes are made with pure functions**.

### Classic Redux (what you write by hand in `features/ui`)
```js
export const SIDEBAR_TOGGLED = 'ui/sidebarToggled';
export const sidebarToggled = () => ({ type: SIDEBAR_TOGGLED });
export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLED: return { ...state, sidebarOpen: !state.sidebarOpen };
    default: return state;
  }
}
```

### Middleware
`store => next => action => { … }`. It's curried so that `applyMiddleware` can inject the store API once, compose the chain once, and run the innermost function per action.
- **thunk:** dispatch functions (`(dispatch, getState, extra) => …`)
- **listener middleware (RTK):** "when X happens, do Y" side effects (like a lightweight saga)
- logger, analytics, crash reporting

## Redux Toolkit
| API | Replaces |
|---|---|
| `configureStore` | `createStore` + `applyMiddleware` + DevTools + thunk + dev-only immutability/serializability checks |
| `createSlice` | action types + action creators + reducer (with **Immer**, so "mutating" syntax is safe) |
| `createAsyncThunk` | the pending/fulfilled/rejected boilerplate |
| `createEntityAdapter` | **normalised** `{ ids: [], entities: {} }` + CRUD reducers + selectors |
| `createSelector` (Reselect) | memoised derived data |
| `createListenerMiddleware` | side effects reacting to actions |
| **RTK Query** (`createApi`) | fetching, caching, de-duplication, invalidation, polling, optimistic updates |

### Normalisation
```js
// ❌ nested: hard to update one task, O(n) lookups
{ columns: [{ id: 'todo', tasks: [{ id: 't1', … }] }] }
// ✅ normalised
{ tasks: { ids: ['t1','t2'], entities: { t1: {…}, t2: {…} } }, columns: { todo: ['t1'], … } }
```

### Selectors & memoisation
```js
const selectTasks = (s) => s.board.tasks.entities;
const selectFilter = (s) => s.board.filter;
export const selectVisibleTasks = createSelector([selectTasks, selectFilter], (tasks, f) => /* expensive */);
```
It only recomputes when the inputs change **by reference**, which is another reason immutability matters. `useSelector` re-renders when the selected value changes (`===`).

## Server state vs client state
Server data is a **cache** (it can go stale, be refetched, or be shared by many components). Use RTK Query or TanStack Query rather than hand-rolled slices.
Client state (UI toggles, drafts, drag state) lives in slices, local state or context.

## Redux vs Context vs Zustand (the trade-off talk)
- **Context:** dependency injection for rarely-changing values (theme, user). Every consumer re-renders when the value changes.
- **Redux:** predictable, debuggable (time-travel), middleware, a big ecosystem, and scales with teams.
- **Zustand/Jotai/signals:** smaller APIs with fine-grained subscriptions.

## 🎤 Interview questions
<details><summary>Why must reducers be pure and immutable?</summary>
So that reference equality detects changes (fast re-render checks and memoised selectors), and so time-travel and replay work. Immer lets you write mutating syntax while still producing new objects.
</details>
<details><summary>What does RTK's `configureStore` do in development?</summary>
It adds the thunk middleware, the immutability and serializability check middleware, and the Redux DevTools Extension integration.
</details>

## Practise in Kanvas
[lab 13](../../../labs/13-mini-redux/README.md) · `client/src/features/ui` · `app/store.js` · `features/board/boardSlice.js` · `features/projects/projectsApi.js`
