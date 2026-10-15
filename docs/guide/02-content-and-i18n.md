# 02 — Content from data files, in two languages

> **Goal of this step:** the resume (about, experience, skills, education) on the home page, in English at
> `/` and Portuguese at `/pt/`, with the content kept in typed data files instead of inside components.
>
> **Files:** [`src/data/profile.ts`](../../src/data/profile.ts) · [`src/i18n/`](../../src/i18n) ·
> [`src/components/HomePage.astro`](../../src/components/HomePage.astro) · **Issue:** #2

## 1. Separate content from presentation

If the experience list were written inside the HTML, updating a job would mean editing markup in two
languages and hoping nothing breaks. Instead:

```
src/data/profile.ts        ← WHAT to say (content, per language)
src/i18n/ui.ts             ← interface labels ("Experience", "Skip to content"…)
src/components/*.astro     ← HOW to show it (layout, styles)
```

Updating the resume now means editing one data file. Components only _loop_ over it:

```astro
{p.experience.map((role) => (
  <li>…{role.title}…</li>
))}
```

### Types as a contract

`profile.ts` declares interfaces (`Role`, `SkillGroup`, `Profile`). TypeScript (`make lint` →
`astro check`) refuses a role without a `start` date or a typo like `higlights`. Dates are stored as
`"YYYY-MM"` and formatted per language at build time.

### Tests on data

Data has rules too, and `src/data/profile.test.ts` enforces them:

- both languages have the **same structure** (same number of roles, same dates, same number of bullets) —
  so a translation can't silently drop a job;
- experience is ordered **most recent first**;
- dates are valid and `start ≤ end`;
- no empty strings; GitHub, LinkedIn and email links are present.

## 2. Internationalization (i18n)

### Routing

`astro.config.mjs` declares the locales; files decide the URLs:

```
src/pages/index.astro     → /      (English, default — no prefix)
src/pages/pt/index.astro  → /pt/   (Portuguese)
```

Both render the same `HomePage` component with a different `locale` prop. No content is duplicated in
markup — only in the data file, where translation belongs.

### The helpers (`src/i18n/utils.ts`, unit tested)

| Function                       | Does                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `getLocaleFromUrl(url)`        | `/pt/…` → `"pt"`, anything else → `"en"` (and `/ptolemy/` is **not** Portuguese — a test checks this edge case) |
| `localizePath(path, locale)`   | `/` ↔ `/pt/`, used by the language switch                                                                       |
| `alternates(path)`             | every language version of a page, for `hreflang` tags                                                           |
| `useTranslations(locale)`      | returns `t(key)` for interface strings; a test checks both languages define the same keys                       |
| `formatMonth` / `formatPeriod` | `"2026-07"` → `Jul 2026` / `jul. 2026`, and "Present"/"Atual" for ongoing roles                                 |

`UiKey` is derived from the English dictionary (`keyof typeof ui.en`), so `t("nav.experiense")` is a
**type error**, not a blank label in production.

### Dates without timezone bugs

`new Date("2026-07")` is interpreted in UTC, but `toLocaleDateString()` formats in the machine's local
timezone — in Brazil (UTC−3), midnight of July 1st UTC is still **June 30th**. Both the date and the
formatter use UTC (`Date.UTC(…)`, `timeZone: "UTC"`), so the month never shifts.

### Telling browsers and search engines

- `<html lang="en">` / `<html lang="pt-BR">`: screen readers pick the right pronunciation; browsers offer
  the right translation.
- `<link rel="alternate" hreflang="…">` for each version, plus `x-default`: Google shows Brazilians the
  Portuguese page and everyone else the English one, instead of treating them as duplicate content.
- The language switch uses `aria-current` for the active language, `hreflang` and `lang` on each link, and
  an accessible name in the target language ("Português", "English").

## 3. Layout details

- **Sections** share a `Section` component: an `h2` with a Python-yellow bar, `aria-labelledby`, and
  `scroll-mt-8` so anchored headings aren't glued to the top of the window.
- **Experience** is an ordered list (`<ol>`) drawn as a timeline with a left border and dots; periods use
  `<time datetime="2026-07">` so machines can read the dates.
- **Header navigation** to sections appears from tablet width (`md:`); on phones only the logo, language
  switch and theme toggle remain — the e2e test checks there's no horizontal scroll at 360 px in both
  languages.

## 4. Tests

| Where                      | What                                                                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/i18n/utils.test.ts`   | locale detection, path localization, alternates, dictionary keys, date formatting                                                                    |
| `src/data/profile.test.ts` | structure parity, ordering, valid dates, no empty text, required links                                                                               |
| `e2e/i18n.spec.ts`         | `lang` attribute per page, switch navigation + `aria-current`, `hreflang` URLs, 5 roles and contact links visible, header anchors scroll to sections |
| `e2e/layout.spec.ts`       | no horizontal scroll at 360/768/1280 px, now on `/` **and** `/pt/`                                                                                   |

## 5. Exercises

1. Add a new role to `profile.ts` only in English and run `make test`. Which test fails, and why is that
   useful?
2. Add a third language (e.g. Spanish, `es`): what has to change in `config.ts`, `ui.ts`,
   `profile.ts`, `astro.config.mjs` and `pages/`? Which tests guide you?
3. Remove `timeZone: "UTC"` from `formatMonth`, run the tests with `TZ=America/Fortaleza npx vitest run`
   and watch the month shift.
4. Use a key that doesn't exist, `t("nav.blog")`, and run `make lint`. Read the type error.
5. View the page source of `/pt/` in the browser and find the three `hreflang` links.

## Further reading

- [Astro i18n routing](https://docs.astro.build/en/guides/internationalization/)
- [Google: localized versions of your pages (hreflang)](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [MDN: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
