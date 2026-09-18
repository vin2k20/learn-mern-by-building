/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/hooks/usePrevious.js · Phase 3 · Day 3 · ★ core (5 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  usePrevious(value) → the value from the PREVIOUS render (like prevProps in componentDidUpdate).
 *
 * 📝 STEPS
 *   Classic version: const ref = useRef(); useEffect(() => { ref.current = value }); return ref.current;
 *   Then read the React docs' note about reading refs during render, and implement the "store info from previous renders"
 *   pattern with state instead:
 *     const [prev, setPrev] = useState(value); const [curr, setCurr] = useState(value);
 *     if (value !== curr) { setPrev(curr); setCurr(value); }  return prev;
 *   Comment on which one works better with the React Compiler, and why.
 *
 * 🧩 USED BY  TaskCard (animate when the status changed) · DashboardPage (animate the numbers from old → new)
 * 🎤 INTERVIEW ANGLE  "How do you access previous props with hooks?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
