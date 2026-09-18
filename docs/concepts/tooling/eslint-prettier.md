# ESLint 10 & Prettier

> **TL;DR:** **ESLint** finds bugs and enforces code rules, and **Prettier** formats. Don't make them fight: let Prettier own formatting.
> ESLint 10 only supports **flat config** (`eslint.config.js`).

## Flat config for Kanvas (shape, not a copy-paste answer)
```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['dist', 'coverage'] },
  js.configs.recommended,
  reactHooks.configs.flat.recommended,     // rules of hooks + React Compiler-powered checks
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: { globals: { ...globals.browser }, parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }] },
  },
]);
```
- A config is **an array of objects**, applied in order. Each can target `files`.
- Old `.eslintrc` + `extends` strings are gone. You import plugins as modules.
- Handy: `npx eslint --inspect-config` opens a visual config inspector.

## Prettier
`.prettierrc` (JSON): `{ "singleQuote": true, "semi": true, "printWidth": 100, "trailingComma": "all" }` · `.prettierignore` · the `prettier --check .` script in CI.
Run it through your editor on save. Optionally add `eslint-config-prettier` to turn off conflicting stylistic rules.

## Git hooks ☆
`husky` + `lint-staged` run ESLint and Prettier on staged files before each commit (so the CI stays green).

## 🎤 Interview questions
<details><summary>How do you enforce code quality in a team?</summary>
Shared lint and format configs, pre-commit hooks, CI gates (lint, typecheck, test, build, bundle size), PR templates and review guidelines, and automated dependency updates.
</details>
