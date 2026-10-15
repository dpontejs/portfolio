# syntax=docker/dockerfile:1

# ---- build: Node only exists in this stage, never in the final image
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG GIT_SHA=dev
ENV GIT_SHA=${GIT_SHA}
RUN npm run build

# ---- runtime: just Caddy and static files (~95 MB; the Node stage is discarded)
FROM caddy:2.11.7-alpine
# Links the GHCR package to this repo (shows the README and source link on the package page).
LABEL org.opencontainers.image.source="https://github.com/dpontejs/portfolio"
COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
# The deploy agent waits for "healthy" and rolls back otherwise.
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/version.json >/dev/null || exit 1
