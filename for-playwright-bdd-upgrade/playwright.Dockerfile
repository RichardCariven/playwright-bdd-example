################################################################################
# Playwright stage: Run Playwright tests
FROM mcr.microsoft.com/playwright:v1.47.2-jammy

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app/

COPY ./apps/web-e2e/package.json ./apps/web-e2e/package.json
COPY ./packages ./packages
COPY ./tooling ./tooling
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN --mount=type=cache,target=/root/.yarn \
    yarn --cwd ./apps/web-e2e install --frozen-lockfile --silent && \
    stat ./node_modules/.bin/bddgen && \
    npx -y playwright install --with-deps
