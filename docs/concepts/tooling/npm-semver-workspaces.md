# npm, semver, lockfiles & workspaces

> **TL;DR:** `package.json` declares **ranges**, and `package-lock.json` pins the **exact tree**. Use `npm ci` in CI. Workspaces link local packages in one monorepo.

## Semver: `MAJOR.MINOR.PATCH`
| Range | Allows | Example (`1.4.2`) |
|---|---|---|
| `^1.4.2` | the same major (for `0.x`, the same minor) | `1.9.0` ✓, `2.0.0` ✗ |
| `~1.4.2` | the same minor | `1.4.9` ✓, `1.5.0` ✗ |
| `1.4.2` | exact | only 1.4.2 |
| `>=1.4 <2` | explicit range | |
| `*` / `latest` | anything (avoid) | |

## Dependency types
| Field | Installed by consumers? | Use for |
|---|---|---|
| `dependencies` | yes | runtime libraries (react, express) |
| `devDependencies` | no | build and test tools (vite, mocha, eslint) |
| `peerDependencies` | must be provided by the host | plugins/libraries that need the host's React or Vite |
| `optionalDependencies` | if installable | platform-specific binaries |
| `overrides` | — | force a transitive version (security fixes) |

## Commands
| Command | What it does |
|---|---|
| `npm i` / `npm i -D pkg` | install (and update the lockfile) |
| `npm ci` | a clean, exact install from the lockfile (fails if it's out of sync), used in CI |
| `npx <bin>` / `npm exec` | run a package binary |
| `npm run <script>` | `pre<script>`/`post<script>` hooks also run |
| `npm ls <pkg>` / `npm explain <pkg>` | why is this installed? |
| `npm outdated` / `npm update` | see and apply updates within the ranges |
| `npm audit` / `npm audit fix` | known vulnerabilities |
| `npm pkg set scripts.dev="vite"` | edit package.json from the CLI |
| `npm version patch` | bump the version and tag it |

## Workspaces (this repo's root)
```json
{ "private": true, "workspaces": ["client", "server"] }
```
- `npm install` at the root installs everything and hoists shared dependencies to the root `node_modules`.
- `npm run dev -w client`, `npm test --workspaces --if-present`
- Alternatives: pnpm workspaces (strict, fast, disk-efficient), Yarn, with Nx/Turborepo for task orchestration and caching.

## `"type": "module"` and `"engines"`
`"type": "module"` makes `.js` files ESM. `"engines": { "node": ">=24" }` documents the requirement (enforced with `engine-strict`).

## 🎤 Interview questions
<details><summary>Should you commit the lockfile?</summary>
Yes, for applications: reproducible installs and reviewable dependency changes. Libraries commit it for their own development, but consumers resolve from the ranges.
</details>
<details><summary>npm vs pnpm vs yarn?</summary>
pnpm uses a content-addressed store with symlinks: fast, saves disk, and its strict layout prevents phantom dependencies. npm is the default and good enough for most projects.
</details>
