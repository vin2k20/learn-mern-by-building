/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/components/Toast/ToastProvider.jsx · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   An app-wide notification system: toast({ title, description, variant, duration }) from anywhere,
 *   queued, auto-dismissed, pausable on hover, announced to screen readers, and animated.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/hooks-deep-dive.md (useReducer, Context), docs/concepts/js/design-patterns.md (observer),
 *               docs/concepts/web/accessibility.md (aria-live)
 *
 * 🧩 USED BY  features/board (move failed), features/auth (login failed), features/projects (created) ·
 *            also callable from OUTSIDE React (listener middleware), see step 5.
 *
 * 📝 STEPS
 *   1. A reducer: state = { toasts: [] }, actions: added, dismissed, removed (after the exit animation).
 *      Keep at most 3 visible. Older ones wait in a queue (your Queue from lab 07 ☆).
 *   2. const ToastContext = createContext(null). export function ToastProvider({ children }):
 *      - const [state, dispatch] = useReducer(reducer, initial)
 *      - const toast = useCallback((opts) => { const id = crypto.randomUUID(); dispatch(added({ id, ...opts })); return id; }, [])
 *      - Provide a STABLE value ({ toast, dismiss }), memoised so consumers don't re-render on every toast change.
 *      - Render the children + createPortal(<ol className={styles.viewport} aria-live="polite">…</ol>, document.body)
 *   3. <ToastItem>: auto-dismiss after `duration` (default 5000 ms) with setTimeout. Pause on hover/focus (clear the timer,
 *      then resume with the remaining time). Error toasts use role="alert". A close button. data-state="open"/"closing" for the animation.
 *   4. export const useToast = () => use(ToastContext) (React 19), throwing a helpful error if it's used outside the provider.
 *   5. Bridging to non-React code: export a module-level event emitter (your EventEmitter from lab 03!) with
 *      `notify(opts)`, and have the provider subscribe to it in an effect. The Redux listener middleware calls notify().
 *
 * ✅ DONE WHEN
 *   [ ] Toasts stack bottom-right on desktop and at the top, full width, on mobile
 *   [ ] Hovering pauses the countdown · Esc dismisses the focused toast
 *   [ ] VoiceOver reads new toasts without moving focus
 *   [ ] Showing a toast doesn't re-render the entire app (check it with the Profiler)
 *
 * ⚠️ GOTCHAS  Timers must be cleared on unmount · don't put the toasts array in the context value (it re-renders every consumer).
 *
 * 🎤 INTERVIEW ANGLE  "Design a notification system", "how do you split context to avoid re-renders?"
 * 🤖 ASK THE AGENT    /hint client/src/components/Toast/ToastProvider.jsx step 2 · /review client/src/components/Toast
 * ═══════════════════════════════════════════════════════════════════════════
 */
