# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.15.0

################################################################################
# Base stage: This is the starting point for all the other stages. It includes
# the Node.js runtime and sets up the working directory.
FROM node:${NODE_VERSION}-alpine AS base

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

# Copy the root package.json and yarn.lock
COPY package.json yarn.lock ./

# Copy structured directories from docker_build
COPY docker_build/apps ./apps
COPY docker_build/packages ./packages
COPY docker_build/tooling ./tooling

################################################################################
# Dependencies stage: This stage installs the dependencies for the application.
FROM base AS dependencies

# Install dependencies in a single layer to use cache effectively
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile --silent

COPY . .

################################################################################
# Builder stage: This stage builds the Next.js application using Turbo.
FROM dependencies AS builder

# A temporary workaround to ensure the correct NEXT_PUBLIC_ environment
# variables are set
ARG VERCEL_GIT_COMMIT_REF="unknown"
ARG NEXT_PUBLIC_SENTRY_DSN
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN
ARG ENABLE_REDIS_CACHE

ENV VERCEL_GIT_COMMIT_REF=$VERCEL_GIT_COMMIT_REF
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV ENABLE_REDIS_CACHE=$ENABLE_REDIS_CACHE

WORKDIR /app/apps/web

# Build the application, cache turbo builds specifically
RUN --mount=type=cache,target=/root/turbo-cache \
    turbo run build --filter=web --cache-dir="/root/turbo-cache" && \
    cp -r ./.next/static /app/apps/web/.next/standalone/apps/web/.next && \
    cp -r ./public /app/apps/web/.next/standalone/apps/web/ && \
    cp -r ./nextPlugins /app/apps/web/.next/standalone/apps/web/

################################################################################
# Final stage: This stage sets up the runtime environment for the application.
FROM base AS final

ENV NODE_ENV production

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./

WORKDIR /app/apps/web

# Ensure proper permissions
RUN chown -R node:node /app

USER node

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"

CMD ["node", "./server.js"]
