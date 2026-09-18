# Wireframes

Low-fidelity layouts for each screen. Treat them as a spec for **structure and responsive behaviour**, not pixels.
Tokens are in [design-tokens.md](design-tokens.md).

---

## 1. Landing page (`landing/`)

### Desktop ≥ 1024px
```
┌──────────────────────────────────────────────────────────────────────┐
│ ◆ Kanvas        Features  Pricing  FAQ              [Log in] [Start] │ ← sticky header, flex, space-between
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Plan, sketch and ship —                ┌──────────────────────┐     │ ← hero: 2-col grid
│  together.                              │  floating board      │     │   right: CSS-only mock board
│  Kanvas is the board + whiteboard       │  mockup (keyframes   │     │   with @keyframes float
│  your product team actually enjoys.     │  float + shimmer)    │     │
│  [Start free]  [Watch demo ▶]           └──────────────────────┘     │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  Features                                                            │
│  ┌────────┐ ┌────────┐ ┌────────┐                                    │ ← grid: repeat(auto-fit, minmax(16rem, 1fr))
│  │ icon   │ │ icon   │ │ icon   │   staggered reveal on scroll       │
│  │ Boards │ │ Canvas │ │ Charts │                                    │
│  └────────┘ └────────┘ └────────┘                                    │
│  ┌────────┐ ┌────────┐ ┌────────┐                                    │
│  └────────┘ └────────┘ └────────┘                                    │
├──────────────────────────────────────────────────────────────────────┤
│  Pricing                                                             │
│  ┌──────────┐ ┌════════════┐ ┌──────────┐                            │ ← grid; middle card "featured"
│  │ Free     │ ‖ Team  ★    ‖ │ Business │                            │   scaled + badge (pulse keyframes)
│  │ ₹0       │ ‖ ₹499/user  ‖ │ Contact  │                            │   subgrid ☆ aligns rows across cards
│  │ ✓ ✓ ✓    │ ‖ ✓ ✓ ✓ ✓    ‖ │ ✓ ✓ ✓ ✓ ✓│                            │
│  │ [Choose] │ ‖ [Choose]   ‖ │ [Talk]   │                            │
│  └──────────┘ └════════════┘ └──────────┘                            │
├──────────────────────────────────────────────────────────────────────┤
│  « testimonial » « testimonial » « testimonial » →→→ (marquee loop)  │ ← flex track + @keyframes marquee
├──────────────────────────────────────────────────────────────────────┤
│  FAQ  ▸ Is there a free plan?      (native <details>/<summary>)      │
│       ▸ Can I export drawings?                                       │
├──────────────────────────────────────────────────────────────────────┤
│  Contact  [Name      ] [Email      ]                                 │ ← grid form, 2 cols → 1 col on mobile
│           [Message                          ]  [Send]                │
├──────────────────────────────────────────────────────────────────────┤
│ © Kanvas · Privacy · Terms                              ☀/☾ theme    │
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile < 640px
```
┌────────────────────────┐
│ ◆ Kanvas          [☰]  │  ← nav collapses; ☰ toggles a panel (aria-expanded)
├────────────────────────┤
│ Plan, sketch and ship  │  ← hero stacks: text first, mockup below (or hidden)
│ — together.            │
│ [Start free]           │  ← buttons full width
│ [Watch demo]           │
├────────────────────────┤
│ ┌────────────────────┐ │  ← features: 1 column
│ └────────────────────┘ │
│ ┌════════════════════┐ │  ← pricing: featured card FIRST (grid `order`)
│ └════════════════════┘ │
└────────────────────────┘
```

---

## 2. App shell (`client/src/app/AppLayout.jsx`)

### Desktop ≥ 1024px: `grid-template-areas`
```
┌───────────┬──────────────────────────────────────────────────┐
│ ◆ Kanvas  │  🔍 Search… ⌘K                 🔔   ◐   (DU)     │  "sidebar header"
│           ├──────────────────────────────────────────────────┤
│ ▣ Projects│                                                  │
│ ▦ Board   │                    <Outlet />                    │  "sidebar main"
│ ✎ Canvas  │                                                  │
│ ▤ Dashbrd │                                                  │
│ ≡ Activity│                                                  │
│ ⚙ Settings│                                                  │
└───────────┴──────────────────────────────────────────────────┘
  16rem                         1fr
```

### Tablet 768–1023px: sidebar becomes an icon rail (`4rem`); labels are visually hidden but stay in the accessibility tree.

### Mobile < 768px
```
┌────────────────────────────┐
│ [☰] Kanvas     🔍   (DU)   │  "header"
├────────────────────────────┤
│                            │
│        <Outlet />          │  "main"
│                            │
├────────────────────────────┤
│  ▣    ▦    ✎    ▤    ⚙     │  ☆ bottom tab bar (or ☰ opens the sidebar as an off-canvas drawer)
└────────────────────────────┘
```

---

## 3. Projects page
```
Projects                                   [ + New project ]
[ 🔍 Filter projects…          ]           ← debounced input
┌──────────┐ ┌──────────┐ ┌──────────┐     ← grid auto-fill minmax(16rem,1fr)
│▌Website  │ │▌Mobile   │ │▌Infra    │     ← ▌ = project colour strip
│ 12 tasks │ │ 8 tasks  │ │ 4 tasks  │     ← hover: lift (translateY + shadow)
│ (A)(B)+2 │ │ (C)      │ │ (A)(D)   │     ← avatar stack (negative margin)
└──────────┘ └──────────┘ └──────────┘
Loading state: 6 skeleton cards (shimmer). Empty state: an illustration + CTA. Error state: a message + [Retry].
Card container query ☆: when a card is < 18rem wide, hide the description and shrink the avatars.
```

## 4. Board page ★
```
Website redesign ▾      Filter: [Assignee ▾] [Label ▾] [🔍]      ↶ ↷
┌── Todo (4) ──────┐ ┌── In progress (3) ┐ ┌── Review (2) ────┐ ┌── Done (5) ──────┐
│┌────────────────┐│ │┌────────────────┐ │ │                  │ │                  │
││ ● high         ││ ││ Login form     │ │ │   (drop zone     │ │                  │
││ Hero section   ││ ││ #auth  (DU) 3pt│ │ │    highlighted   │ │                  │
││ #ui   (AS) 2pt ││ │└────────────────┘ │ │    on dragover)  │ │                  │
│└────────────────┘│ │                   │ │                  │ │                  │
│ + Add task       │ │ + Add task        │ │ + Add task       │ │ + Add task       │
└──────────────────┘ └───────────────────┘ └──────────────────┘ └──────────────────┘
 ← columns: flex row, each `flex: 0 0 18rem`; board scrolls horizontally; mobile: scroll-snap-type: x mandatory
 ← cards: drag with mouse; keyboard: focus a card, press Space to "lift", ←/→ to change column, ↑/↓ to reorder, Space to drop, Esc to cancel
 ← clicking a card opens the TaskDetailsDrawer (route /projects/:id/board/tasks/:taskId), which slides in from the right
```

## 5. Whiteboard page ★
```
┌──────────────────────────────────────────────────────────────┐
│ [✎ Pen][╱ Line][▭ Rect][◯ Ellipse][⌫ Eraser] ● ● ● ● ━━ 4px  │ ← toolbar: flex, wraps; mobile: vertical rail on the left
│ ↶ ↷  🗑 Clear   ⤓ PNG   💾 Save (autosaves)                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                  <canvas> fills remaining space              │ ← ResizeObserver + devicePixelRatio scaling
│                  (cursor changes per tool)                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 6. Dashboard page
```
Desktop (grid-template-areas):
┌─ stat ─┬─ stat ─┬─ stat ─┬─ stat ─┐   ← "s1 s2 s3 s4"; numbers count up on load
├────────────────────────┬──────────┤
│  Tasks by status       │ By       │   ← "bar bar bar people"
│  (canvas bar chart,    │ assignee │
│   hover tooltip)       │ list     │
├────────────────────────┴──────────┤
│  Burndown (SVG line) ☆            │   ← "burn burn burn burn"
└───────────────────────────────────┘
Tablet: 2 columns. Mobile: 1 column; the stat tiles become a horizontal scroll strip.
```

## 7. Command palette
```
           ┌──────────────────────────────────────┐
           │ 🔍 logi|                             │  ← autofocus; role=combobox
           ├──────────────────────────────────────┤
           │ ▸ **Logi**n form        Task · Web   │  ← aria-activedescendant; matched chars bold
           │   **Log**out bug        Task · Mob   │
           │   B**log** revamp       Project      │
           ├──────────────────────────────────────┤
           │ ↑↓ navigate   ↵ open   esc close     │
           └──────────────────────────────────────┘
Backdrop: fade in. Panel: scale 0.96→1 + fade (keyframes). Centered with grid place-items.
```

## 8. Activity feed
```
Activity                          10,000 events   [ Virtualized ☑ ]   ← toggle to compare performance
┌───────────────────────────────────────────────┐
│ (AS) Asha moved “Hero” to Review · 2m ago     │ ← fixed row height 56px
│ (RM) Ravi created “Login form” · 5m ago       │
│ …only ~20 DOM rows exist at any time…         │
└───────────────────────────────────────────────┘
```

## 9. Login
```
          ┌─────────────────────────────┐
          │        ◆ Kanvas             │   ← card centred with grid place-items: center; min-height: 100dvh
          │  Email    [              ]  │
          │  Password [              ]👁 │
          │  (error text, shake on fail)│
          │  [ Sign in  ⟳ ]              │   ← button disabled + spinner while pending (useFormStatus)
          │  demo@kanvas.dev / kanvas123│
          └─────────────────────────────┘
```
