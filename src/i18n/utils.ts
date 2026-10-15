import { defaultLocale, languageTags, locales, type Locale } from "./config";
import { ui, type UiKey } from "./ui";

/** "/pt" or "/pt/…" is Portuguese; everything else is the default locale (English). */
export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split("/");
  return locales.find((l) => l !== defaultLocale && l === first) ?? defaultLocale;
}

/** Same page in another locale: "/" ↔ "/pt/". The default locale has no prefix. */
export function localizePath(path: string, locale: Locale): string {
  const withoutLocale = path.replace(/^\/pt(\/|$)/, "/");
  return locale === defaultLocale ? withoutLocale : `/${locale}${withoutLocale}`;
}

/** Every language version of a page, for <link rel="alternate" hreflang> and the language switch. */
export function alternates(path: string) {
  return locales.map((locale) => ({
    locale,
    lang: languageTags[locale],
    path: localizePath(path, locale),
  }));
}

export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key];
}

/** "2026-07" → "Jul 2026" (en) / "jul. 2026" (pt). */
export function formatMonth(yearMonth: string, locale: Locale): string {
  const [year, month] = yearMonth.split("-").map(Number);
  // UTC on both sides: a local timezone must never shift the month.
  const date = new Date(Date.UTC(year, month - 1, 1));
  const monthName = new Intl.DateTimeFormat(languageTags[locale], {
    month: "short",
    timeZone: "UTC",
  }).format(date);
  return `${monthName} ${year}`;
}

export function formatPeriod(start: string, end: string | undefined, locale: Locale): string {
  const until = end ? formatMonth(end, locale) : useTranslations(locale)("period.present");
  return `${formatMonth(start, locale)} – ${until}`;
}
