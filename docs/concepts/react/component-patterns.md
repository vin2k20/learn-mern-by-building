# Component patterns

> **TL;DR:** prefer composition. Custom hooks share logic. Compound components share implicit state. Keep components small and their props minimal.

| Pattern | Sketch | Use when |
|---|---|---|
| **Composition / children** | `<Card><Card.Header/>…</Card>` or `<Modal footer={<Buttons/>}>` | layout wrappers, slots |
| **Container / presentational** | `BoardPage` (data, dispatch) → `Column` (pure UI) | testability, reuse |
| **Custom hook** | `const { items, loadMore } = useInfiniteActivity()` | sharing stateful logic |
| **Compound components** | `<Tabs value onChange><Tabs.List><Tabs.Tab/></Tabs.List><Tabs.Panel/></Tabs>` | widgets with several cooperating parts |
| **Controlled / uncontrolled** | `value` + `onChange` vs `defaultValue` + ref | forms, inputs, dropdowns |
| **Render props** | `<VirtualList renderRow={(item) => …}/>` | the caller decides how to render |
| **HOC** | `withErrorBoundary(Component)` | cross-cutting concerns (less common now) |
| **Provider** | `<ThemeProvider>` + `useTheme()` | app-wide dependencies |
| **Polymorphic `as`** | `<Button as="a" href=…>` | semantic flexibility |
| **Headless** | logic hook + your own markup (Downshift, TanStack) | a design system with a custom look |
| **State reducer** | the parent can override internal transitions | flexible reusable components |
| **Portals** | `createPortal(node, document.body)` | modals, toasts, tooltips (escape `overflow`/`z-index`) |

## Compound component sketch
```jsx
const TabsContext = createContext(null);
export function Tabs({ value, onChange, children }) {
  return <TabsContext value={{ value, onChange }}>{children}</TabsContext>;   // React 19: <Context> as provider
}
Tabs.Tab = function Tab({ id, children }) {
  const { value, onChange } = use(TabsContext);
  return <button role="tab" aria-selected={value === id} onClick={() => onChange(id)}>{children}</button>;
};
```

## Props design checklist
- Accept `className` and `...rest` for host elements (so `aria-*` and `data-*` pass through).
- Accept `ref` (React 19: a normal prop, no `forwardRef` needed).
- Use booleans for flags, and variants as a string union (`variant="primary" | "ghost"`).
- Avoid passing whole objects when the component needs two fields (it hurts memoisation and coupling).
- Name event props `onX` and call them with meaningful arguments (`onMove(taskId, toStatus)`).

## 🎤 Interview questions
<details><summary>HOCs vs render props vs hooks?</summary>
All three share logic. Hooks avoid "wrapper hell" and prop-name collisions, compose better, and are the default today. HOCs are still useful to wrap whole components (e.g. error boundaries).
</details>

## Practise in Kanvas
`client/src/components/*` (Tabs, Modal, Toast, VirtualList)
