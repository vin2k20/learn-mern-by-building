/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/auth/RequireAuth.jsx · Phase 4 · Day 4 · ★ core (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  A route guard component: render the children when authenticated, otherwise redirect to /login?next=…
 *
 * 🧠 CONCEPTS  → docs/concepts/react/routing-rr8.md (compare it with route middleware)
 *
 * 📝 STEPS
 *   1. const { status } = useSelector(selectAuth); const location = useLocation(); const dispatch = useDispatch()
 *   2. On mount, if status === 'restoring' → dispatch(restoreSession()) (an effect)
 *   3. 'restoring' → a full-page <Skeleton variant="page" /> (not a blank screen)
 *      not authenticated → <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace />
 *      authenticated → children
 *   4. Comment: which is better, this component or RR8 middleware? Consider waterfalls, flashes of content and testability.
 *
 * ✅ DONE WHEN  [ ] A deep link to a board while logged out → login → back to that board
 * ═══════════════════════════════════════════════════════════════════════════
 */
