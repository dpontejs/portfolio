.PHONY: install dev build preview test test-e2e test-all lint format

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
