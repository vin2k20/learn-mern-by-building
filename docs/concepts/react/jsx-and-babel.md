# JSX & Babel

> **TL;DR:** JSX is syntax sugar for function calls that create element objects. A compiler (Babel, or Oxc/esbuild/SWC in modern tools)
> rewrites it before the browser sees it.

## What JSX becomes
```jsx
<Card title="Hi" key={id}>Hello {name}</Card>
```
**Classic runtime** (React ≤ 16 style, `React` must be in scope):
```js
React.createElement(Card, { title: "Hi", key: id }, "Hello ", name)
```
**Automatic runtime** (React 17+, the default today):
```js
import { jsxs as _jsxs } from "react/jsx-runtime";
_jsxs(Card, { title: "Hi", children: ["Hello ", name] }, id)   // key is a separate argument
```
In development, `jsxDEV` from `react/jsx-dev-runtime` adds `__source`-style debug info for better warnings.

The result is a plain object: `{ $$typeof: Symbol(react.transitional.element), type: Card, key, props }`, a **React element**, the "virtual DOM" node.

## JSX rules and why they exist
| Rule | Reason |
|---|---|
| Components are Capitalised | lowercase = a string tag (`'div'`), uppercase = a variable reference |
| `className`, `htmlFor` | JSX maps to DOM *properties*; `class`/`for` are reserved words |
| One root element (or a Fragment) | a function returns one value |
| `{}` takes expressions, not statements | it compiles to function arguments. Use a ternary or `&&`, not `if`. |
| `key` isn't a prop you can read | React uses it for reconciliation |
| `{0 && <X/>}` renders `0` | numbers are valid children; use `count > 0 &&` |

## Babel in one picture
```
source ─► @babel/parser ─► AST ─► plugins (visitors) transform the AST ─► @babel/generator ─► code + source maps
presets = bundles of plugins: preset-env (syntax for your targets), preset-react (JSX), preset-typescript
```
- **Transpile vs polyfill:** syntax (`??`, classes) can be rewritten. Missing APIs (`Array.prototype.at`, `Promise.withResolvers`) need runtime polyfills (core-js, `useBuiltIns: 'usage'`).
- **browserslist** (`"browserslist": "> 0.5%, last 2 versions, not dead"`) drives preset-env and CSS autoprefixing.

## Where Babel stands in 2026
- Vite 8 transforms JSX/TS with **Oxc** (Rust) and bundles with **Rolldown**. There's no Babel in the default pipeline.
- Babel is still used for the **React Compiler** (`babel-plugin-react-compiler`), custom code transforms, and many existing webpack/CRA-era codebases.
- CRA (`react-scripts`) was webpack + Babel + Jest + ESLint behind one dependency. It was deprecated in Feb 2025.

## 🎤 Interview questions
<details><summary>Why don't we need `import React from 'react'` anymore?</summary>
The automatic runtime makes the compiler inject <code>import { jsx } from 'react/jsx-runtime'</code>. Nothing references the <code>React</code> identifier any more.
</details>
<details><summary>What is a Babel plugin?</summary>
An object with a <code>visitor</code> that has methods per AST node type. Babel walks the tree and calls them, and plugins can replace, remove or insert nodes.
</details>

## Practise in Kanvas
[lab 11](../../../labs/11-babel-jsx/README.md) · [lab 12](../../../labs/12-mini-react/README.md)
