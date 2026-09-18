# Docker basics for frontend/full-stack developers

> **TL;DR:** an **image** is a layered, immutable filesystem plus metadata. A **container** is a running instance of one.
> **Compose** runs several containers together (api + mongo).

## Dockerfile essentials
```dockerfile
FROM node:24-alpine AS deps            # a pinned base image
WORKDIR /app
COPY package*.json ./                  # copy the manifests first → layer cache
RUN npm ci --omit=dev

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
USER node                              # don't run as root
EXPOSE 4000
HEALTHCHECK CMD wget -qO- http://localhost:4000/health || exit 1
CMD ["node", "src/index.js"]
```
- **Layer caching:** instructions whose inputs haven't changed are reused. Order them from least to most frequently changing.
- **Multi-stage builds:** build tools stay in earlier stages, so the final image is small.
- `.dockerignore`: `node_modules`, `.git`, `.env`, `coverage`.
- **Frontend images:** build with Node, then serve `dist/` with nginx (and configure the SPA fallback to `index.html`).

## Compose
```yaml
services:
  mongo:
    image: mongo:7
    volumes: [mongo-data:/data/db]
    healthcheck: { test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"], interval: 10s }
  api:
    build: .
    env_file: .env
    environment: { MONGO_URI: mongodb://mongo:27017/kanvas }
    ports: ["4000:4000"]
    depends_on: { mongo: { condition: service_healthy } }
volumes: { mongo-data: {} }
```
Services reach each other by **service name** (`mongo`), not `localhost`.

## Commands
`docker build -t kanvas-api .` · `docker run -p 4000:4000 --env-file .env kanvas-api` · `docker compose up -d` · `docker compose logs -f api` ·
`docker compose down -v` · `docker exec -it <id> sh` · `docker image ls` · `docker system prune`

## 🎤 Interview questions
<details><summary>Why containers?</summary>
The same environment in dev, CI and prod; isolation; fast, reproducible deploys; and the unit that orchestrators (Kubernetes, ECS) schedule.
</details>
