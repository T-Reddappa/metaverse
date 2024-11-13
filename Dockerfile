# Base image for all stages
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# Pruned workspace with only necessary dependencies
FROM base AS pruner
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=http --scope=websocket --docker

# Builder stage for dependencies and build
FROM base AS builder
RUN npm install -g turbo

# Copy pruned lockfile and package.json files
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

# Install dependencies
RUN npm install

# Copy source code for included apps
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# Generate Prisma Client
RUN cd packages/db && npx prisma generate

# Build the project
RUN npm run build -- --filter=http --filter=websocket

# Development stage for individual apps
FROM base AS http
COPY --from=builder /app .
WORKDIR /app/apps/http
CMD ["node", "dist/index.js"]

FROM base AS websocket
COPY --from=builder /app .
WORKDIR /app/apps/websocket
CMD ["node", "dist/index.js"]