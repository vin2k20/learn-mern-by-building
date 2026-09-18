/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/graphql/index.js · Phase 7 · Day 7 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Create the graphql-yoga server and export it as Express middleware.
 *
 * 📝 STEPS
 *   import { createYoga, createSchema } from 'graphql-yoga'
 *   export const yoga = createYoga({
 *     schema: createSchema({ typeDefs, resolvers }),
 *     graphqlEndpoint: '/graphql',
 *     context: ({ req }) => ({ user: req.user, loaders: createLoaders() }),   ← req comes from Express (requireAuth ran first)
 *     graphiql: env.NODE_ENV !== 'production',                              ← open http://localhost:4000/graphql in the browser
 *     maskedErrors: env.NODE_ENV === 'production',
 *   })
 *   createLoaders() ☆ → { userById: new DataLoader(async (ids) => { const users = await User.find({ _id: { $in: ids } }); return ids.map(…) }) }
 *   (a NEW loader per request, so the cache doesn't leak between users)
 *   Mount it in app.js: app.use(yoga.graphqlEndpoint, requireAuth, yoga)
 *
 * ✅ DONE WHEN  [ ] GraphiQL runs the dashboard query (add an Authorization header in its headers tab)
 * ⚠️ GOTCHAS  requireAuth blocks GraphiQL's own page load in the browser. Allow GET requests for the IDE in development, or pass the token.
 * ═══════════════════════════════════════════════════════════════════════════
 */
