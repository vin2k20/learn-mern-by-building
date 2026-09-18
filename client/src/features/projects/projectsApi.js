/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/projects/projectsApi.js · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Define the app's RTK Query API slice (`api`) and its project and user endpoints, with cache tags for
 *   automatic refetching after mutations.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/flux-redux-rtk.md (server state), docs/concepts/web/http-caching-cors.md,
 *               docs/api-contract.md §3
 *
 * 📝 STEPS
 *   1. export const api = createApi({
 *        reducerPath: 'api',
 *        baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL,
 *          prepareHeaders: (headers, { getState }) => { const t = getState().auth.token; if (t) headers.set('authorization', `Bearer ${t}`); return headers; } }),
 *        tagTypes: ['Project', 'User', 'Task'],
 *        endpoints: () => ({}),
 *      })
 *      ☆ Replace fetchBaseQuery with a custom baseQuery that uses lib/httpClient (retry and error normalisation in one place).
 *   2. transformResponse: (res) => res.data (the contract wraps payloads in { data })
 *   3. export const projectsApi = api.injectEndpoints({ endpoints: (build) => ({
 *        getProjects: build.query({ query: (search = '') => `/projects?search=${encodeURIComponent(search)}`,
 *          providesTags: (result = []) => [...result.map(({ id }) => ({ type: 'Project', id })), { type: 'Project', id: 'LIST' }] }),
 *        getProject: build.query({ query: (id) => `/projects/${id}`, providesTags: (r, e, id) => [{ type: 'Project', id }] }),
 *        createProject: build.mutation({ query: (body) => ({ url: '/projects', method: 'POST', body }),
 *          invalidatesTags: [{ type: 'Project', id: 'LIST' }] }),
 *        getUsers: build.query({ query: () => '/users', providesTags: ['User'], keepUnusedDataFor: 300 }),
 *      }) })
 *   4. Export the generated hooks: useGetProjectsQuery, useGetProjectQuery, useCreateProjectMutation, useGetUsersQuery
 *   5. ☆ An optimistic create: onQueryStarted → dispatch(api.util.updateQueryData('getProjects', '', (draft) => { draft.unshift(temp) }))
 *      → await queryFulfilled, and on error patch.undo()
 *   6. Error normalisation: the error shape from fetchBaseQuery is { status, data }. Write a helper getErrorMessage(error)
 *      that reads data.error.message from the contract.
 *
 * ✅ DONE WHEN
 *   [ ] Opening Projects twice within 60 s makes ONE network request (cache), and the DevTools api state shows the queries
 *   [ ] Creating a project refetches the list automatically (tag invalidation)
 *   [ ] Two components using useGetUsersQuery() → one request (de-duplication)
 *
 * ⚠️ GOTCHAS  Forgetting api.middleware in the store · passing new object args every render (causes refetch loops)
 *
 * 🎤 INTERVIEW ANGLE  "How does RTK Query caching work?", "tags vs manual refetch?", "server state vs client state?"
 * 🤖 ASK THE AGENT    /explain rtk query providesTags invalidatesTags · /review client/src/features/projects/projectsApi.js
 * ═══════════════════════════════════════════════════════════════════════════
 */
