# 01 — Scaffold and design system

> **Goal of this step:** a fast static site with Astro, a small design system (colors, type, light/dark
> theme) and the quality gates that every later change must pass.
>
> **Files:** [`src/`](../../src) · [`e2e/`](../../e2e) · config files at the root · **Issue:** #1

## 1. Why Astro

A portfolio is mostly **content**: text, links, project cards. It doesn't need a JavaScript app running
in the browser to show it.

**Astro** renders pages to plain HTML at build time (**static site generation**). The browser downloads
HTML + CSS and is done. JavaScript is shipped only for the pieces that need it — here, two tiny inline scripts: the
theme initializer (389 bytes) and the toggle (352 bytes). Astro inlined them, so there's no JS bundle at all.

|                       | Single-page app (React/Vite)               | Astro (this repo)                                    |
| --------------------- | ------------------------------------------ | ---------------------------------------------------- |
| What the browser gets | an empty page + a JS bundle that builds it | finished HTML                                        |
| JS shipped            | the whole app                              | only interactive parts                               |
| SEO / first paint     | depends on JS running                      | immediate                                            |
| Hosting               | static files                               | static files (served by Caddy, see the `infra` repo) |

## 2. Project structure

```
src/
├── layouts/BaseLayout.astro   # <html>, <head>, header, footer — every page uses it
├── components/                # Header, Footer, ThemeToggle
├── pages/index.astro          # each file in pages/ becomes a URL (file-based routing)
├── lib/theme.ts               # theme logic (pure TypeScript, unit tested)
└── styles/global.css          # Tailwind + design tokens
e2e/                           # end-to-end tests (Playwright, real browser)
public/                        # copied as is (favicon)
```

An `.astro` file has two parts: a **frontmatter** between `---` fences, which runs at **build time** on
your machine (imports, data), and a **template** below it, which becomes HTML.

## 3. The design system

### Tokens: name the intent, not the color

Components never say "blue" — they say **what the color is for**:

| Token          | Purpose                              | Light     | Dark      |
| -------------- | ------------------------------------ | --------- | --------- |
| `bg`           | page background                      | `#ffffff` | `#0d1117` |
| `surface`      | cards, hover backgrounds             | `#f6f8fa` | `#151b23` |
| `fg`           | main text                            | `#1f2328` | `#e6edf3` |
| `muted`        | secondary text                       | `#59636e` | `#9198a1` |
| `border`       | lines and outlines                   | `#d1d9e0` | `#3d444d` |
| `accent`       | links, primary buttons (Python blue) | `#306998` | `#6ea8d6` |
| `highlight`    | decorative details (Python yellow)   | `#ffd43b` | `#ffd43b` |
| `highlight-fg` | yellow **text**                      | `#9a6700` | `#ffd43b` |

They're CSS variables redefined per theme (`:root` and `[data-theme="dark"]`), exposed to Tailwind with
`@theme inline`, so you write `bg-bg text-fg border-border` and the theme switch is free.

### Contrast, measured

Every text/background pair was checked against **WCAG AA** (≥ 4.5:1 for normal text):

```
light  fg/bg 15.8  muted/bg 6.1  accent/bg 5.8  accent-fg/accent 5.8
dark   fg/bg 16.0  muted/bg 6.5  accent/bg 7.4  accent-fg/accent 7.4
```

That check caught a real problem: Python yellow `#ffd43b` as **text** on white is **1.4:1** — unreadable.
Hence the separate `highlight-fg` token (`#9a6700`, 4.9:1) for yellow text in light mode. The bright yellow
stays for decorative shapes, where contrast rules for text don't apply.

### Tailwind CSS v4

Utility classes (`px-4`, `text-xl`, `rounded-md`) compose styles directly in the markup. Version 4 is
configured **in CSS** (`@import "tailwindcss"`, `@theme`) instead of a JS config file, and only the classes
actually used end up in the final CSS.

`@custom-variant dark (…[data-theme="dark"]…)` makes `dark:` utilities follow **our** theme attribute
instead of only the OS setting, so the toggle can override the system.

## 4. Light/dark theme without flashing

The naive approach — a script that runs after the page loads — paints the page in the default theme first
and then switches: a visible **flash**. The fix has three parts:

1. **Decide before the first paint.** `initTheme` runs as an **inline, blocking script in `<head>`**:
   the browser executes it before rendering `<body>`.
2. **Precedence:** a stored choice (`localStorage`) wins; otherwise follow `prefers-color-scheme`; if
   storage is blocked (private mode), fall back to the system without crashing.
3. **One source of truth.** The inline script is generated from the tested TypeScript function:

   ```astro
   const themeScript = `(${initTheme.toString()})()`;
   <script is:inline set:html={themeScript} />
   ```

   `toString()` returns the function's source, so it must be **self-contained** (no imports, no outer
   variables). A unit test enforces that by rebuilding the function from its text with `new Function` —
   if someone adds an outer reference, the test fails, exactly like the browser would.

The toggle button uses `aria-pressed` so screen readers announce its state.

## 5. Quality gates

| Command         | What it checks                                                                                                                                                                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `make test`     | **Vitest** unit tests for `src/lib` (theme precedence, blocked storage, serializability)                                                                                                                                                                                    |
| `make test-e2e` | **Playwright** in Chromium, against the production build: no horizontal scroll at 360/768/1280 px, title/description/single `h1`, skip link, theme follows the system, **no flash** (the theme is already set when `<body>` starts parsing), toggle persists across reloads |
| `make lint`     | `astro check` (TypeScript + Astro diagnostics), ESLint (strict TypeScript rules), Prettier                                                                                                                                                                                  |

CI runs all three on every PR. When an e2e test fails in CI, the Playwright report is uploaded as an
artifact so you can see what the browser saw.

### Testing "no flash" — how?

`e2e/theme.spec.ts` injects a `MutationObserver` before the page loads (`addInitScript`) that records
`data-theme` at the moment `<body>` appears. If the theme were set by a deferred script, that value would
be `undefined`.

## 6. Two gotchas found along the way

- **TypeScript 7 is too new.** `@astrojs/check` and `typescript-eslint` don't support it yet (peer
  dependencies), so TypeScript is pinned to `~6.0.3`. Check `npm view <pkg> peerDependencies` before
  upgrading.
- **Astro 7 backgrounds `astro preview` when it detects an AI coding agent** (it was being run by one).
  Playwright saw the process exit and assumed the server died. `--ignore-lock` keeps it in the foreground
  (see the comment in `playwright.config.ts`).

## 7. Exercises

1. Change `--accent` in light mode to `#4b8bbe` and compute its contrast on white (any online WCAG
   checker). Does it pass AA? Revert if not.
2. Add a token `--success` (green) for both themes, expose it with `@theme inline` and use it somewhere.
3. Break the inline script on purpose: add `const KEY = "theme"` at the top of `theme.ts` and use it inside
   `initTheme`. Run `make test` — which test fails, and why would the browser fail too?
4. In the browser dev tools, set `localStorage.theme = "dark"`, reload, then delete it and toggle your OS
   theme. Watch the precedence rules work.
5. Run `npm run build` and open `dist/index.html`: find the inline theme script and count how many
   `<script>` tags the page ships.

## 8. Running locally

```bash
make install   # npm ci
make dev       # http://localhost:4321 with hot reload
make test      # unit tests
make lint
# e2e needs Chromium's system libraries once (WSL/Ubuntu):
sudo npx playwright install-deps chromium && npx playwright install chromium
make test-e2e
```

## Further reading

- [Astro docs: project structure](https://docs.astro.build/en/basics/project-structure/)
- [Tailwind CSS v4: theme variables](https://tailwindcss.com/docs/theme)
- [WCAG contrast (understanding 1.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Playwright: writing tests](https://playwright.dev/docs/writing-tests)
