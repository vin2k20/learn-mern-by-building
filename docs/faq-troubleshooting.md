# FAQ & troubleshooting

Can't find your problem here? Search the repo's **Issues** and **Discussions**, or ask your AI tutor (paste the full error).

## FAQ

**Are there official solutions?**
No, on purpose. The lab tests and the ✅ DONE WHEN lists are how you check your work. If you're truly stuck, use the file's 💡 HINTS,
the concept primers, your AI tutor's `/hint` → `/unstuck`, or ask in Discussions.

**How long does it take?**
About 7 intensive days, 4 weeks at 2–3 h/day, or 8 weeks part-time. See [ROADMAP.md](../ROADMAP.md).

**Is this only for interview prep?**
No. It's a complete MERN learning path. The 🎤 sections are there when you want them. Set `Goal:` in `PROGRESS.md`, and the AI tutor adapts.

**Do I need an AI assistant or a paid account?**
No. The tutor is optional. See [ai-tutor.md](ai-tutor.md) for "learning without AI".

**Can I skip the labs and go straight to React?**
You can, but the app reuses lab code (debounce, the Trie, the LRU cache, History…) and the labs explain what React and Redux do inside. At least do the ★ labs.

**Can I use TypeScript / Tailwind / Next.js / another UI library?**
The instructions assume plain JavaScript and plain CSS, so that you learn the fundamentals. Finish once as written, then try a variant (converting to TypeScript is a great ☆ follow-up).

**Why Vite instead of Create React App?**
CRA was deprecated in 2025. You still learn what CRA did in the [bundlers primer](concepts/tooling/bundlers-vite-webpack-cra.md).

**Why build a mock API before the backend?**
Contract-first development: the frontend team isn't blocked, the tests reuse the same mocks, and the real server must match [the contract](api-contract.md).

**The package versions are newer or older than the docs say.**
The docs were verified in September 2026 (see [CHANGELOG.md](../CHANGELOG.md)). The labs pin their versions in `labs/package-lock.json`.
For `client/` and `server/` you install the latest versions yourself. If a major version changed, check its migration guide or ask your tutor,
and please open an issue so the material can be updated.

**Windows?**
Supported. Use Git Bash or PowerShell, install Node with fnm, nvm-windows or Volta, and see the Windows notes below.

---

## Troubleshooting

### Node & npm
| Symptom | Fix |
|---|---|
| `npm WARN EBADENGINE`, jsdom or Babel errors, `SyntaxError` in node_modules | Wrong Node version. Run `nvm use` (or `fnm use` / `nvm use 24`) and check `node -v` shows v24. Then delete `node_modules` and run `npm ci` again. |
| `nvm: command not found` | Restart the terminal, or add the nvm lines to `~/.zshrc` / `~/.bashrc` (see the nvm README). |
| `Cannot use import statement outside a module` | The package needs `"type": "module"` (labs has it; add it to client and server). |
| `npm ci` fails with "lockfile out of sync" | Someone edited `package.json` without reinstalling. Run `npm install` once and commit the updated lockfile. |

### Labs
| Symptom | Fix |
|---|---|
| Every test is red with `TODO` | Expected. Implement the functions. |
| `Exception during run: …` and nothing runs | A syntax error in your lab file, or code at the top level of your file that throws. Run `node --check labs/NN-…/file.js`. |
| `'STRETCH' is not recognized` (Windows) | Use `npm run test:stretch`, which works on every OS. |
| `ERR_MODULE_NOT_FOUND @babel/core` | Run the commands from `labs/` after `npm ci`. |
| Timing tests (lab 05) fail occasionally | A very busy machine can slow the timers. Close heavy apps and re-run. If it keeps happening, open an issue. |
| Playground doesn't load (a CORS error on `file://`) | Serve it: `npm run serve:09` (or `npx serve -l 3001 09-dom-events/playground`). |

### Client (Vite, React, MSW, Vitest)
| Symptom | Fix |
|---|---|
| A blank page with no errors | `main.jsx` still only contains its instruction block. Render something first (SETUP step 5). |
| `Failed to resolve import "@/…"` | Add the `@` alias to `vite.config.js` (and `jsconfig.json` for the editor). |
| `Cannot find package 'react-router-dom'` | React Router 8 removed it. Import from `react-router` (and `RouterProvider` from `react-router/dom`). |
| `[MSW] Failed to register the Service Worker` | Run `npx msw init public --save` inside `client/`. Service Workers need `localhost` or HTTPS. |
| Requests go to the network instead of MSW | Start the worker **before** rendering (`await worker.start()`) and check `VITE_USE_MOCKS=true` in `client/.env.local`. |
| `document is not defined` / `matchMedia is not a function` in tests | Set `environment: 'jsdom'` in the Vitest config and add the polyfills from `src/test/setup.js`. |
| ESLint ignores your config | ESLint 10 only reads `eslint.config.js` (flat config). `.eslintrc*` is ignored. |
| A CORS error calling the API | In development, use the Vite proxy (call `/api/...`, not `http://localhost:4000/api/...`). |
| `Port 5173 is in use` | Vite will pick another port, or run `npm run dev -w client -- --port 5174`. |
| A blurry canvas | Scale the backing store by `devicePixelRatio` (lab 10, `scaleForDPR`). |

### Server (Express 5, MongoDB, Mongoose 9)
| Symptom | Fix |
|---|---|
| `connect ECONNREFUSED 127.0.0.1:27017` | MongoDB isn't running. See [server/SETUP.md § 4](../server/SETUP.md#4-mongodb), or use an Atlas connection string. |
| An Atlas connection times out | Add your IP to Atlas → Network Access, and check the user name, password and database name in `MONGO_URI`. |
| `req.body` is `undefined` | `app.use(express.json())` must come **before** the routes. |
| `TypeError: Missing parameter name` on a `*` route | Express 5 needs named wildcards: `/*splat`. |
| `next is not a function` in a Mongoose hook | Mongoose 9 removed `next` from pre hooks. Use `async function () { … }`. |
| `JWT_SECRET must be at least 32 characters` | Generate one: `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` |
| mongodb-memory-server is slow or fails the first time | The first run downloads a MongoDB binary. Keep the 20 s timeout, and check your network or proxy. On unusual Linux distros, set `MONGOMS_VERSION` or `MONGOMS_DISTRO`. |
| Native `bcrypt` build errors | The project uses `bcryptjs` (pure JavaScript), so no compiler is needed. |

### Git
| Symptom | Fix |
|---|---|
| Every line shows as changed on Windows | Line endings. Run `git config --global core.autocrlf input`. The repo's `.gitattributes` enforces LF. |
| You committed `.env` | Remove it (`git rm --cached server/.env`), **rotate the secret**, and check `.gitignore`. |
| Merge conflicts after syncing with upstream | Keep your code, and re-read the updated instruction block above it. |
