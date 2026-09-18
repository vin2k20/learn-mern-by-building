# Error boundaries & Suspense

> **TL;DR:** **Error boundaries** catch errors thrown while rendering their children and show a fallback. **Suspense** shows a fallback
> while children are *waiting* (lazy code, `use(promise)`, suspense-enabled data libraries).

## Error boundary (still a class)
```jsx
class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }        // render phase: update the UI
  componentDidCatch(error, info) { report(error, info.componentStack); } // commit phase: side effects
  reset = () => this.setState({ error: null });
  render() {
    return this.state.error ? this.props.fallback({ error: this.state.error, reset: this.reset }) : this.props.children;
  }
}
```
**Doesn't catch:** errors in event handlers (use try/catch), async code (setTimeout, promises) unless they end up rethrown during render,
server rendering errors, or errors in the boundary itself.
React 19 also offers `onCaughtError` / `onUncaughtError` / `onRecoverableError` options on `createRoot` for global reporting.

**Placement:** around route content (so one broken page doesn't blank the app), and around risky widgets (charts, the whiteboard).
Use `key={location.pathname}` to reset it on navigation.
React Router's `errorElement`/`ErrorBoundary` route property handles loader, action and render errors per route.

## Suspense
```jsx
const Whiteboard = lazy(() => import('./WhiteboardPage.jsx'));
<Suspense fallback={<Skeleton variant="page" />}>
  <Whiteboard />
</Suspense>
```
- Nested boundaries give **progressive reveal**. Keep fallbacks layout-stable (skeletons) to avoid CLS.
- `startTransition` around a navigation keeps the *old* UI visible instead of flashing the fallback.
- `use(promise)`: the promise must be **cached** (created outside render, e.g. by a loader or a data library).
- React 19.3 `<ViewTransition>` can animate Suspense reveals.

## 🎤 Interview questions
<details><summary>How do you handle errors in event handlers?</summary>
try/catch in the handler, then show a toast or set error state. If you want a boundary to handle it, store the error in state and throw it during render.
</details>
<details><summary>What does Suspense need from a data source?</summary>
A way to throw or return a cached, stable promise per resource, and to resolve it once. Libraries (React Router loaders, RTK Query's suspense patterns, TanStack Query) take care of that for you.
</details>

## Practise in Kanvas
`client/src/app/ErrorBoundary.jsx` · `app/router.jsx` · `components/Skeleton`
