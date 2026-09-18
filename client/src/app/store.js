/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/app/store.js · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Create the Redux store with Redux Toolkit, combining a HAND-WRITTEN classic reducer (ui), RTK slices
 *   (auth, board), and the RTK Query API slice, plus a listener middleware for side effects.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/flux-redux-rtk.md · labs/13-mini-redux (you built createStore yourself!)
 *
 * 🧩 DEPENDS ON  features/ui/uiReducer.js · features/auth/authSlice.js · features/board/boardSlice.js ·
 *               features/projects/projectsApi.js (the `api` slice) · lib/httpClient.js
 *
 * 📝 STEPS
 *   1. export const listenerMiddleware = createListenerMiddleware()
 *   2. export function setupStore(preloadedState) {           ← a factory, so tests can create fresh stores
 *        return configureStore({
 *          reducer: { ui: uiReducer, auth: authReducer, board: boardReducer, [api.reducerPath]: api.reducer },
 *          preloadedState,
 *          middleware: (getDefault) => getDefault({ thunk: { extraArgument: { http } } })
 *                                        .prepend(listenerMiddleware.middleware)
 *                                        .concat(api.middleware),
 *          devTools: import.meta.env.DEV,
 *        })
 *      }
 *      export const store = setupStore()
 *   3. Persistence with a listener: when the auth slice changes (loggedIn / loggedOut), write or remove the token in
 *      localStorage. When the ui theme or sidebar preference changes, persist it too. (Why a listener rather than
 *      store.subscribe? Write the answer in a comment.)
 *   4. setupListeners(store.dispatch) from '@reduxjs/toolkit/query' (refetchOnFocus / refetchOnReconnect support).
 *   5. Export typed-style helpers for consistency: export const useAppDispatch = useDispatch.withTypes?.() ?? useDispatch
 *      (in JS a simple re-export is fine; the point is having one import location).
 *   6. Open Redux DevTools: dispatch an action from the DevTools dispatcher, then use time-travel (the slider).
 *
 * ✅ DONE WHEN
 *   [ ] The DevTools state tree shows ui, auth, board and api
 *   [ ] Mutating state outside a reducer (try `store.getState().ui.sidebarOpen = true` in the console) throws in dev (the immutability check)
 *   [ ] Tests can call setupStore({ board: … }) to preload state
 *
 * ⚠️ GOTCHAS
 *   - Forgetting api.middleware → RTK Query caching and invalidation silently won't work.
 *   - Don't put non-serializable values (Dates, Maps, class instances) in state. Store ISO strings, arrays and plain objects.
 *
 * 🎤 INTERVIEW ANGLE  "What does configureStore add?", "how do you mix RTK Query with slices?", "why a store factory?"
 * 🤖 ASK THE AGENT    /explain listener middleware vs thunks · /review client/src/app/store.js
 * ═══════════════════════════════════════════════════════════════════════════
 */
