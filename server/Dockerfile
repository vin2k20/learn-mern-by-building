# ═══════════════════════════════════════════════════════════════════════════
# 📄 server/Dockerfile · Phase 8 · ☆ stretch (needs Docker Desktop, OrbStack, Colima or Podman)
# ═══════════════════════════════════════════════════════════════════════════
# 🎯 GOAL  A small, secure, cache-friendly production image for the API.
#
# 🧠 CONCEPTS  → docs/concepts/tooling/docker-basics.md
#
# 📝 STEPS (build context = the repo root, so the image can reach the root lockfile and the workspace;
#           or build from server/ with its own lockfile. Choose one and explain why in a comment.)
#   1. Stage "deps": FROM node:24-alpine AS deps · WORKDIR /app
#      COPY package.json package-lock.json ./ and server/package.json ./server/
#      RUN npm ci --omit=dev -w server        (only production dependencies for the server workspace)
#   2. Stage "runtime": FROM node:24-alpine · ENV NODE_ENV=production · WORKDIR /app
#      COPY --from=deps /app/node_modules ./node_modules
#      COPY server/src ./server/src   and   client/src/mocks/data/seed.json (if the seed script runs in the container)
#      USER node          ← don't run as root
#      EXPOSE 4000
#      HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:4000/health || exit 1
#      CMD ["node", "server/src/index.js"]      (exec form, so SIGTERM reaches Node → graceful shutdown)
#   3. Create server/.dockerignore (or a root .dockerignore): node_modules, .git, **/.env, coverage, client/dist
#   4. Build and run:
#        docker build -f server/Dockerfile -t kanvas-api .
#        docker run --rm -p 4000:4000 --env-file server/.env -e MONGO_URI=mongodb://host.docker.internal:27017/kanvas kanvas-api
#
# ✅ DONE WHEN  [ ] The image is < 200 MB (docker image ls) · runs as non-root · the healthcheck turns "healthy"
# 🎤 INTERVIEW ANGLE  "Why multi-stage builds?", "why the exec form of CMD?", "how do layers cache?"
# ═══════════════════════════════════════════════════════════════════════════
