/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/app/ErrorBoundary.jsx · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Two error UIs: a reusable CLASS-based <ErrorBoundary> for widgets (the whiteboard, charts), and
 *   <RouteError> for React Router's route-level ErrorBoundary.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/error-boundaries-suspense.md, docs/concepts/react/lifecycle-class-vs-hooks.md,
 *               docs/concepts/js/this-binding.md (class fields)
 *
 * 📝 STEPS
 *   1. export class ErrorBoundary extends Component
 *      - state = { error: null }
 *      - static getDerivedStateFromError(error) → { error }         (render phase: pure!)
 *      - componentDidCatch(error, info) → console.error + info.componentStack (a Sentry.captureException stand-in)
 *      - reset = () => { this.setState({ error: null }); this.props.onReset?.() }   (a class-field arrow → bound `this`)
 *      - componentDidUpdate(prevProps): if props.resetKey changed while in the error state → reset()
 *      - render(): if there's an error → this.props.fallback?.({ error, reset }) ?? a default <div role="alert"> with a "Try again" button
 *   2. export function RouteError()
 *      - const error = useRouteError() (from 'react-router')
 *      - isRouteErrorResponse(error) → show the status and statusText (e.g. a 404 from a loader)
 *      - otherwise show a friendly message, error.message in development only (import.meta.env.DEV), and a "Reload" button
 *   3. Use <ErrorBoundary resetKey={projectId}> around <CanvasBoard> and <BarChartCanvas> later.
 *   4. Try it: temporarily `throw new Error('boom')` inside a page and inside a click handler.
 *      Which one does the boundary catch? Write the answer in a comment.
 *
 * ✅ DONE WHEN
 *   [ ] A render error in a widget shows the fallback while the rest of the page keeps working
 *   [ ] "Try again" re-mounts the children · changing resetKey clears the error
 *   [ ] Route errors render inside the layout (the header and nav still work)
 *
 * ⚠️ GOTCHAS
 *   - Don't call setState inside getDerivedStateFromError (it's static and pure).
 *   - Error boundaries don't catch errors in event handlers or async code.
 *
 * 🎤 INTERVIEW ANGLE  "Why is there no hook for error boundaries?", "lifecycle order when an error happens?"
 * 🤖 ASK THE AGENT    /explain error boundary lifecycle · /review client/src/app/ErrorBoundary.jsx
 * ═══════════════════════════════════════════════════════════════════════════
 */
