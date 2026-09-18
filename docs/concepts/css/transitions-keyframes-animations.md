# Transitions, `@keyframes` & performant animation

> **TL;DR:** **transitions** animate between two states when a property changes. **Keyframe animations** run a defined timeline
> (they can loop, start on load, or have many steps). Animate only `transform` and `opacity` for smooth 60 fps.

## Transitions
```css
.card { transition: transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out); }
.card:hover { transform: translateY(-2px); box-shadow: var(--shadow-2); }
```
`transition: <property> <duration> <timing-function> <delay>`. Avoid `transition: all` (it animates unexpected properties).
Modern: `transition-behavior: allow-discrete` + `@starting-style` let you animate from `display: none` (entry animations for dialogs and popovers).

## Keyframes
```css
@keyframes slide-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}
.toast { animation: slide-up var(--duration-base) var(--ease-spring) both; }

@keyframes shimmer { to { background-position-x: -200%; } }
.skeleton { background: linear-gradient(90deg, var(--s1) 25%, var(--s2) 50%, var(--s1) 75%) 0 0 / 200% 100%;
            animation: shimmer 1.2s linear infinite; }

@keyframes shake { 10%, 90% { transform: translateX(-1px) } 20%, 80% { transform: translateX(2px) }
                   30%, 50%, 70% { transform: translateX(-4px) } 40%, 60% { transform: translateX(4px) } }
```
`animation: name duration timing delay iteration-count direction fill-mode play-state`
- `fill-mode: both` keeps the first and last frame styles before and after the animation
- **Stagger:** `animation-delay: calc(var(--i) * 60ms)` with `style="--i: 3"` on each item
- `steps(8)` gives sprite-like animation. `cubic-bezier()` gives a custom feel.
- JS hooks: `animationend`, `transitionend`, and the Web Animations API (`el.animate(keyframes, options)`)

## Scroll-driven animations ☆
```css
@keyframes reveal { from { opacity: 0; transform: translateY(24px); } }
.feature { animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% cover 30%; }
```
Feature-detect with `@supports (animation-timeline: view())`, and fall back to IntersectionObserver.

## View Transitions
The browser API is `document.startViewTransition(update)`. CSS `view-transition-name` morphs elements between states.
React 19.3's `<ViewTransition>` wires this into transitions and Suspense.

## Performance: the rendering pipeline
```
JS → Style → Layout → Paint → Composite
width/top/left  → layout + paint + composite   (expensive)
color/background → paint + composite
transform/opacity → composite only              (cheap, can run on the compositor thread)
```
- `will-change: transform` only on elements that are about to animate (it creates layers that use memory).
- Check with DevTools → Rendering → **Paint flashing**, **Layer borders**, and the FPS meter.

## Accessibility
Honour `prefers-reduced-motion`. Avoid flashing more than 3 times a second. Don't make essential information depend on motion.

## 🎤 Interview questions
<details><summary>Transition vs animation?</summary>
A transition needs a trigger (a state change) and has two states. An animation runs on its own and can have many keyframes, loops and delays.
</details>
<details><summary>Why is animating `left` slower than `transform: translateX`?</summary>
`left` triggers layout and paint on every frame. `transform` only needs compositing, which the GPU/compositor handles off the main thread.
</details>

## Practise in Kanvas
`landing/css/animations.css` · `client/src/styles/animations.css` · Toast, Modal, Skeleton, TaskDetailsDrawer, DashboardPage
