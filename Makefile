.PHONY: install dev build preview test test-e2e test-all lint format image image-test

install:
	npm ci

dev:
	npm run dev

build:
	npm run build

preview: build
	npm run preview

# Fast unit tests (run by the harness on every turn that changes code).
test:
	npm test

# End-to-end tests in a real browser against the production build.
test-e2e:
	npx playwright test

test-all: test test-e2e

# Types and Astro diagnostics + ESLint + Prettier.
lint:
	npx astro check
	npm run lint

format:
	npm run format

IMAGE ?= portfolio:local
GIT_SHA ?= $(shell git rev-parse HEAD)

# Production image (multi-stage: Node builds, Caddy serves).
image:
	docker build --build-arg GIT_SHA=$(GIT_SHA) --secret id=github_token,env=GITHUB_TOKEN -t $(IMAGE) .

# Starts the image and checks health, pages, version.json and cache headers.
image-test: image
	scripts/smoke-image.sh $(IMAGE) $(GIT_SHA)
