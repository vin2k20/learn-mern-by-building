/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/hooks/useIntersectionObserver.js · Phase 5 · Day 5 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  const [ref, entry] = useIntersectionObserver({ root, rootMargin, threshold, freezeOnceVisible })
 *
 * 🧠 CONCEPTS  → docs/concepts/js/dom-events-delegation.md (observers)
 * 🧩 USED BY    ActivityFeed (the non-virtualised infinite-scroll sentinel) · DashboardPage (start the count-up when visible)
 *
 * 📝 STEPS
 *   1. Return a CALLBACK ref (const [node, setNode] = useState(null); return [setNode, entry]) so it works even
 *      when the element mounts later.
 *   2. An effect on [node, rootMargin, threshold…]: create an IntersectionObserver, observe the node, and store the latest entry in state.
 *      Disconnect in the cleanup.
 *   3. freezeOnceVisible: stop observing after the first intersection.
 *   4. Pass `threshold` as a primitive or a memoised array (why?).
 *   ☆ React 19 ref cleanup functions: implement the same thing with a callback ref that RETURNS the disconnect function.
 *
 * ✅ DONE WHEN  [ ] The sentinel triggers loading once per page · no observers leak (Memory panel)
 * 🎤 INTERVIEW ANGLE  "Callback refs vs useRef?", "IntersectionObserver vs scroll events?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
