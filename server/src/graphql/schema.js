/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/src/graphql/schema.js · Phase 7 · Day 7 · ★ core (10 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  The GraphQL type definitions (SDL), copied from docs/api-contract.md §6.
 *
 * 📝 STEPS
 *   export const typeDefs = /* GraphQL *\/ `
 *     enum TaskStatus { TODO IN_PROGRESS REVIEW DONE }
 *     type User { … }  type Task { … }  type Project { … }
 *     type Totals { … }  type StatusCount { … }  type AssigneeCount { … }  type BurndownPoint { … }
 *     type Dashboard { … burndown(days: Int = 14): [BurndownPoint!]! }
 *     type Query { me: User  project(id: ID!): Project  dashboard(projectId: ID!): Dashboard! }
 *     type Mutation { renameTask(id: ID!, title: String!): Task! }   ☆
 *   `
 *   (The GraphQL comment tag before the template literal enables editor syntax highlighting. Write it without the backslash.)
 *   Keep it in sync with the client's DASHBOARD_QUERY. ☆ Run graphql-inspector or a contract test to diff them.
 * ═══════════════════════════════════════════════════════════════════════════
 */
