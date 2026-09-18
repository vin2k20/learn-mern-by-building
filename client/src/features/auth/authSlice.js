/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/auth/authSlice.js · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   The auth state with Redux Toolkit: login/logout/restore thunks (createAsyncThunk), request status,
 *   errors, and token persistence (via the listener in store.js).
 *
 * 🧠 CONCEPTS  → docs/concepts/react/flux-redux-rtk.md, docs/concepts/node/jwt-auth.md,
 *               docs/concepts/web/security-xss-csrf-jwt.md
 *
 * 🧩 DEPENDS ON  lib/httpClient.js (via thunkAPI.extra.http) · the API contract: POST /api/auth/login, GET /api/auth/me
 * 🧩 USED BY    LoginPage · RequireAuth · AppLayout (the avatar menu, logout) · store.js (the persistence listener)
 *
 * 📝 STEPS
 *   1. const TOKEN_KEY = 'kanvas-token'. The initial state reads the token from localStorage (in try/catch):
 *      { token, user: null, status: token ? 'restoring' : 'idle', error: null }
 *      status: 'idle' | 'restoring' | 'loading' | 'authenticated' | 'failed'
 *   2. export const login = createAsyncThunk('auth/login', async ({ email, password }, { extra, rejectWithValue }) => {
 *        try { const { data } = await extra.http.post('/auth/login', { email, password }); return data; }
 *        catch (err) { return rejectWithValue({ code: err.code, message: err.message }); }
 *      })
 *   3. export const restoreSession = createAsyncThunk('auth/restore', …GET /auth/me…)
 *      with a `condition` option so it doesn't run when there's no token
 *   4. createSlice({ name: 'auth', initialState, reducers: { loggedOut(state) { … } }, extraReducers: (builder) => …
 *        builder.addCase(login.pending, …).addCase(login.fulfilled, …).addCase(login.rejected, (s, a) => { s.error = a.payload ?? { message: a.error.message } }) })
 *      Notice that you can "mutate" `state` here: that's Immer.
 *   5. Selectors: selectAuth, selectCurrentUser, selectIsAuthenticated, selectToken
 *   6. Wire configureAuth(() => store.getState().auth.token) (httpClient) and the 'unauthorized' event → dispatch(loggedOut())
 *      in store.js.
 *   7. Comment: localStorage vs an HttpOnly cookie for the token. What would you change in production? (See the security primer.)
 *
 * ✅ DONE WHEN
 *   [ ] A wrong password → status 'failed' and error.code 'UNAUTHENTICATED'
 *   [ ] A reload with a valid token → 'restoring' → 'authenticated' without showing the login page
 *   [ ] Logout clears the token, the user and the RTK Query cache (dispatch(api.util.resetApiState()))
 *
 * ⚠️ GOTCHAS  Don't store the password anywhere · reset the error when a new login starts
 *
 * 🎤 INTERVIEW ANGLE  "What does createAsyncThunk generate?", "rejectWithValue vs throw?", "where do you store JWTs?"
 * 🤖 ASK THE AGENT    /explain createAsyncThunk lifecycle · /review client/src/features/auth
 * ═══════════════════════════════════════════════════════════════════════════
 */
