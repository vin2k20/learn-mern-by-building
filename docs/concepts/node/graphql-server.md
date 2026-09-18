# GraphQL on the server (graphql-yoga 5)

> **TL;DR:** define a **schema** (SDL), implement **resolvers** per field, put per-request data (user, loaders) in the **context**,
> and mount the server in Express. Watch out for N+1 queries and unbounded query cost.

## Minimal setup
```js
import { createYoga, createSchema } from 'graphql-yoga';
const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  context: ({ req }) => ({ user: req.user, loaders: createLoaders() }),   // Express adds req/res to the server context
  graphqlEndpoint: '/graphql',
});
app.use(yoga.graphqlEndpoint, requireAuth, yoga);
```
graphql-yoga works with **graphql 17**. (Apollo Server 5 currently expects graphql 16, so pick one and align the versions.)

## Resolvers
```js
const resolvers = {
  TaskStatus: { TODO: 'todo', IN_PROGRESS: 'in_progress', REVIEW: 'review', DONE: 'done' },   // enum → internal values
  Query: {
    dashboard: async (_parent, { projectId }, ctx) => { assertMember(ctx.user, projectId); return { projectId }; },
  },
  Dashboard: {
    totals: ({ projectId }) => computeTotals(projectId),
    tasksByStatus: ({ projectId }) => Task.aggregate([...]),
    burndown: ({ projectId }, { days }) => computeBurndown(projectId, days),
  },
  Task: {
    assignee: (task, _args, ctx) => (task.assignee ? ctx.loaders.userById.load(String(task.assignee)) : null),
  },
};
```
Resolver signature: `(parent, args, context, info)`. Resolvers run **per field**, and parents resolve before their children.

## N+1 and DataLoader
100 tasks × `User.findById` = 101 queries. **DataLoader** batches `load(id)` calls made in the same tick into one `User.find({ _id: { $in: ids } })`
and caches them per request (create the loaders in the context, **per request**).

## Errors
Throw a `GraphQLError(message, { extensions: { code: 'FORBIDDEN' } })`. The response still has HTTP 200 with an `errors` array (and partial `data`).

## Production concerns
Depth and complexity limits, persisted queries, disabling introspection in production (debatable), rate limiting, auth in the context, schema-first vs code-first.

## 🎤 Interview questions
<details><summary>How do you secure a GraphQL API?</summary>
Authenticate in the context, authorise in the resolvers (or with directives/shields), limit query depth and cost, use timeouts, and allow only persisted queries for public clients.
</details>

## Practise in Kanvas
`server/src/graphql/*` · [API contract §6](../../api-contract.md#6-graphql-post-graphql)
