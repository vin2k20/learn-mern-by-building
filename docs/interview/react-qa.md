# React & Redux interview Q&A

## Fundamentals
<details><summary>1. What is JSX and what does it compile to?</summary>
Syntax sugar for element-creation calls: React.createElement (classic) or jsx()/jsxs() from react/jsx-runtime (automatic). The result is a plain object describing the UI.
</details>
<details><summary>2. What is the Virtual DOM? How does reconciliation work?</summary>
A lightweight tree of elements. React diffs the new tree against the previous one using type and key heuristics, then commits the minimal DOM changes. Fiber makes rendering interruptible.
</details>
<details><summary>3. Why are keys important? Why not use the index?</summary>
Keys give list items a stable identity between renders. Index keys break when items are inserted, removed or reordered (state and DOM get attached to the wrong item).
</details>
<details><summary>4. State vs props?</summary>
Props are inputs owned by the parent (read-only). State is owned by the component and changed via setters, which triggers a re-render.
</details>
<details><summary>5. Controlled vs uncontrolled components?</summary>
Controlled: React state is the source of truth (value + onChange). Uncontrolled: the DOM holds the value (defaultValue + ref, or FormData / form actions).
</details>
<details><summary>6. Lifecycle methods and their hook equivalents?</summary>
See the lifecycle primer table: didMount → useEffect([]), didUpdate → useEffect([deps]), willUnmount → the cleanup, shouldComponentUpdate → memo. Error boundaries still need a class.
</details>
<details><summary>7. Rules of hooks, and why?</summary>
Only call hooks at the top level of components or custom hooks, never conditionally, because React relies on the call order to match hooks to their stored state.
</details>
<details><summary>8. useEffect vs useLayoutEffect vs useInsertionEffect?</summary>
The effect runs after paint. The layout effect runs before paint (for measuring). The insertion effect runs before layout effects (CSS-in-JS libraries inject styles there).
</details>
<details><summary>9. When does a component re-render?</summary>
Its state changed, its parent re-rendered, a context it uses changed, or its store subscription fired with a changed selection.
</details>
<details><summary>10. How do you prevent unnecessary re-renders?</summary>
Colocate state, pass children, memo + stable props (useCallback/useMemo), split contexts, use granular selectors, or let the React Compiler memoise.
</details>
<details><summary>11. Context vs Redux?</summary>
Context is DI for rarely-changing values (all consumers re-render on change). Redux is predictable global state with devtools, middleware and fine-grained subscriptions.
</details>
<details><summary>12. What are error boundaries? Limitations?</summary>
Class components that catch render errors below them. They don't catch event handlers, async code, SSR, or errors in themselves.
</details>
<details><summary>13. What are portals for?</summary>
Rendering children into another DOM node (modals, tooltips) while keeping React context and event bubbling through the React tree.
</details>
<details><summary>14. What does StrictMode do?</summary>
Development-only checks: double-invoking renders and effects (mount → unmount → mount) to reveal impure code and missing cleanups, plus warnings about deprecated APIs.
</details>
<details><summary>15. Explain Suspense and lazy.</summary>
lazy() code-splits a component. Suspense shows a fallback until the lazy code (or suspending data) is ready. Transitions keep the old UI visible.
</details>
<details><summary>16. What's new in React 19 / 19.3?</summary>
Actions, useActionState, useFormStatus, useOptimistic, use, ref as a prop, Context as a provider, metadata tags; 19.2: Activity and useEffectEvent; 19.3: stable ViewTransition and Fragment refs; plus the React Compiler 1.0.
</details>
<details><summary>17. startTransition / useDeferredValue?</summary>
They mark updates as non-urgent so urgent updates (typing) stay responsive. useDeferredValue gives you a lagging copy of a value for expensive renders.
</details>
<details><summary>18. What are Server Components?</summary>
Components that run only on the server (they can access data directly, ship no JS, and can't use state or effects), streamed to the client and combined with client components ('use client'). Frameworks like Next.js provide them.
</details>
<details><summary>19. CRA is deprecated. What do you use instead?</summary>
A framework (Next.js, React Router framework mode) or Vite for SPAs. Be ready to explain what CRA bundled (webpack, Babel, Jest, ESLint) and how to migrate.
</details>
<details><summary>20. How do you handle forms at scale?</summary>
Form actions or React Hook Form with schema validation (zod), uncontrolled inputs for performance, accessible error messages, and server validation as the source of truth.
</details>

## Redux / state management
<details><summary>21. Explain the Redux data flow.</summary>
dispatch(action) → middleware → reducer(state, action) → new state → subscribers → the UI re-reads it via selectors.
</details>
<details><summary>22. Why immutability?</summary>
Cheap change detection by reference, memoised selectors, time-travel debugging, and predictable updates. Immer makes it ergonomic.
</details>
<details><summary>23. What is middleware? Write thunk.</summary>
<code>({dispatch, getState}) => next => action => typeof action === 'function' ? action(dispatch, getState) : next(action)</code>
</details>
<details><summary>24. Flux vs Redux?</summary>
Flux: several stores, a central dispatcher, waitFor. Redux: one store, pure reducers, no dispatcher (store.dispatch), middleware for side effects.
</details>
<details><summary>25. What does Redux Toolkit give you?</summary>
configureStore (good defaults and dev checks), createSlice with Immer, createAsyncThunk, createEntityAdapter (normalisation), createListenerMiddleware, and RTK Query.
</details>
<details><summary>26. Normalised state: why and how?</summary>
Store entities by id (<code>{ ids, entities }</code>) so updates are O(1), there's no duplication, and references stay consistent. createEntityAdapter or normalizr.
</details>
<details><summary>27. How does createSelector memoise?</summary>
It caches the last input results (by reference) and returns the cached output when they're unchanged. Selectors with arguments need care (factory selectors or a larger cache size).
</details>
<details><summary>28. RTK Query vs createAsyncThunk?</summary>
RTK Query handles caching, de-duplication, invalidation tags, polling and optimistic updates declaratively. Thunks are for custom async workflows.
</details>
<details><summary>29. How would you implement optimistic updates with rollback?</summary>
Apply the change locally, send the request, and on failure dispatch the inverse (or restore a snapshot) and notify the user. RTK Query's onQueryStarted + updateQueryData + patchResult.undo() does this.
</details>
<details><summary>30. Where should state live?</summary>
URL state (filters, ids) → the router. Server cache → RTK Query or TanStack Query. Global UI state → Redux/Zustand. Local UI → useState. Forms → the form library or actions. Derived values → compute them, don't store them.
</details>
