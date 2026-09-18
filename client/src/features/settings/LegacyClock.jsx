/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/settings/LegacyClock.jsx · Phase 5 · ☆ stretch (but highly recommended for interviews)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A CLASS component that exercises the lifecycle methods, then refactor it to hooks and compare.
 *   (Interviewers still ask about the "component lifecycle".)
 *
 * 🧠 CONCEPTS  → docs/concepts/react/lifecycle-class-vs-hooks.md, docs/concepts/js/this-binding.md, docs/concepts/js/memory-leaks.md
 *
 * 📝 STEPS
 *   1. export class LegacyClock extends Component
 *      - constructor(props): super(props); this.state = { now: new Date(), ticks: 0 }; console.log('constructor')
 *      - static getDerivedStateFromProps(props, state): log it; return null (explain in a comment when you'd use it, and why it's rare)
 *      - componentDidMount(): start setInterval (1s) → this.tick; add a 'visibilitychange' listener that pauses the clock when hidden; log it
 *      - shouldComponentUpdate(nextProps, nextState): only re-render when the displayed second or the format changes; log it
 *      - getSnapshotBeforeUpdate(prevProps, prevState): return something measurable (e.g. the element's width); log it
 *      - componentDidUpdate(prevProps, prevState, snapshot): log it; if prevProps.format !== this.props.format → log "format changed"
 *      - componentWillUnmount(): clear the interval, remove the listener; log it
 *      - tick = () => this.setState((s) => ({ now: new Date(), ticks: s.ticks + 1 }))   ← why a class-field arrow?
 *      - render(): <time dateTime={iso}>{formatted}</time> using Intl.DateTimeFormat and props.format ('short' | 'medium' | 'long')
 *   2. In StrictMode, notice the double constructor/mount logs in development. Explain them in a comment.
 *   3. Remove the componentWillUnmount cleanup, toggle the clock 5 times, and watch the ticks multiply (a leak!). Restore it.
 *   4. export function ClockHooks({ format }): the SAME behaviour with useState + useEffect (+ useRef for the interval id) +
 *      memo (instead of shouldComponentUpdate). Put both side by side in SettingsPage.
 *   5. Write a 5-line comparison in a comment: what got simpler, what got harder, and what has no hook equivalent.
 *
 * ✅ DONE WHEN  [ ] The console shows the full mount → update → unmount sequence · no leaks after toggling
 * 🎤 INTERVIEW ANGLE  "Name the lifecycle methods in order", "map them to hooks", "what does StrictMode do to them?"
 * 🤖 ASK THE AGENT    /quiz react lifecycle · /review client/src/features/settings/LegacyClock.jsx
 * ═══════════════════════════════════════════════════════════════════════════
 */
