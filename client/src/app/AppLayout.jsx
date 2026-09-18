/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/app/AppLayout.jsx · Phase 3 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   The authenticated app shell: a header, a responsive sidebar (drawer → icon rail → full), and main content
 *   with <Outlet/>. It also hosts the global command palette and a keyboard shortcut.
 *
 * 🧠 CONCEPTS  → docs/concepts/css/grid.md, docs/concepts/css/media-and-container-queries.md,
 *               docs/concepts/web/accessibility.md · wireframes §2
 *
 * 🧩 DEPENDS ON  AppLayout.module.css · styles/layout.css · features/ui (sidebarOpen, paletteOpen) ·
 *               hooks/useMediaQuery.js · hooks/useKeyboardShortcut.js · features/search/CommandPalette.jsx ·
 *               components/Avatar · context/ThemeContext (the theme toggle button)
 *
 * 📝 STEPS
 *   1. Markup (semantic!):
 *        <a className="skip-link" href="#main">Skip to content</a>
 *        <div className={styles.shell} data-sidebar={sidebarOpen ? 'open' : 'closed'}>
 *          <header className={styles.header}> menu button · search button (shows ⌘K / Ctrl K) · theme toggle · avatar menu </header>
 *          <nav className={styles.sidebar} aria-label="Main"> NavLinks with an icon + <span className={styles.label}> </nav>
 *          <main id="main" className={styles.main} tabIndex={-1}><Outlet /></main>
 *        </div>
 *   2. Nav links come from an array config ([{ to, label, icon }]) mapped to <NavLink>. Use NavLink's
 *      className callback ({ isActive }) and aria-current (NavLink sets it for you, so verify it in the DOM).
 *      Project-scoped links (board, whiteboard, dashboard) use the last visited project id from the store
 *      (hide them when there isn't one).
 *   3. Sidebar behaviour:
 *      - const isDesktop = useMediaQuery('(min-width: 64rem)'); const isTablet = useMediaQuery('(min-width: 48rem)')
 *      - mobile: the sidebar is an off-canvas drawer (data-sidebar="open" slides it in); a backdrop closes it;
 *        Esc closes it; close it on route change (useLocation + an effect)
 *      - tablet: an icon rail (visually hidden labels, a tooltip via title/aria-label)
 *      - desktop: the full sidebar
 *   4. Global shortcut: useKeyboardShortcut('mod+k', () => dispatch(paletteToggled()))
 *   5. Focus management: after navigation, move focus to <main> (for screen readers) unless the navigation was a same-page change ☆
 *   6. Render <CommandPalette /> once, here.
 *
 * ✅ DONE WHEN
 *   [ ] 360px: a drawer with a backdrop and a focus trap · 768px: an icon rail · 1024px+: the full sidebar
 *   [ ] Tab order: skip link → header → nav → main; the skip link works
 *   [ ] The active link is visually distinct AND has aria-current="page"
 *   [ ] Cmd/Ctrl+K opens the palette from any page
 *
 * 💡 HINTS  <NavLink className={({ isActive }) => …}> · clsx-style helper: [a, cond && b].filter(Boolean).join(' ')
 *
 * ⚠️ GOTCHAS  An off-canvas drawer that's merely translated off-screen is still focusable. Use `inert` (or visibility: hidden) when it's closed.
 *
 * 🎤 INTERVIEW ANGLE  "How do you build a responsive layout?", "how do you manage focus in an SPA?"
 * 🤖 ASK THE AGENT    /explain inert attribute · /review client/src/app/AppLayout.jsx
 * ═══════════════════════════════════════════════════════════════════════════
 */
