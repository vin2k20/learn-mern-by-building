# REST vs GraphQL

> **TL;DR:** **REST** models resources with URLs and HTTP verbs, and gets simple caching from HTTP. **GraphQL** gives one endpoint
> with a typed schema, where the client asks for exactly the shape it needs. Kanvas uses REST for CRUD and GraphQL for the dashboard.

## REST in one table
| Verb | Path | Meaning | Idempotent | Success |
|---|---|---|---|---|
| GET | `/api/projects` | list | ✓ | 200 |
| POST | `/api/projects` | create | ✗ | 201 (+ `Location`) |
| GET | `/api/projects/:id` | read | ✓ | 200 / 404 |
| PUT | `/api/projects/:id/drawing` | replace | ✓ | 200 |
| PATCH | `/api/tasks/:id` | partial update | not guaranteed | 200 |
| DELETE | `/api/tasks/:id` | delete | ✓ | 204 |

Status codes: 400 (validation) · 401 (who are you?) · 403 (not allowed) · 404 · 409 (conflict) · 422 (a semantic rule broken) · 429 (rate limited) · 5xx (server).
Pagination: offset (`?page=`) vs **cursor** (`?cursor=`), which is stable under inserts.
Versioning: `/v1/` URLs, headers, or evolving without breaking changes.

## GraphQL in one picture
```
POST /graphql  { query, variables, operationName }
      │
schema (types, Query, Mutation, Subscription)  ──►  resolvers per field  ──►  data sources (DB, REST, cache)
      │
{ data, errors }   ← partial success is possible; HTTP status is usually 200
```
```graphql
query Dashboard($projectId: ID!) {
  dashboard(projectId: $projectId) { totals { tasks done } tasksByStatus { status count } }
}
```

## Trade-offs
| | REST | GraphQL |
|---|---|---|
| Over/under-fetching | common (the BFF pattern helps) | the client picks the fields |
| Round trips for composite screens | several | one |
| HTTP caching (CDN, ETag) | natural | harder (POST; needs persisted queries/GET) |
| Client cache | per URL | normalised by `__typename:id` (Apollo, urql, Relay) |
| Typing & tooling | OpenAPI | built-in schema, introspection, codegen |
| Error handling | status codes | the `errors` array (check it even with a 200!) |
| Server complexity | lower | resolvers, the N+1 problem (DataLoader), query cost limits |
| File uploads, streaming | easy | extra specs |

## 🎤 Interview questions
<details><summary>When would you choose GraphQL?</summary>
Many clients with different data needs (web, mobile), composite screens that aggregate several resources, a fast-moving UI, and a team willing to own the schema and its performance. Otherwise REST (or tRPC) is simpler.
</details>
<details><summary>What is the N+1 problem?</summary>
Resolving a list of N items, then running one query per item for a nested field. The fix is batching per tick with DataLoader.
</details>

## Practise in Kanvas
[API contract](../../api-contract.md) · `features/projects/projectsApi.js` · `features/dashboard/dashboardQueries.js` · `server/src/graphql/*`
