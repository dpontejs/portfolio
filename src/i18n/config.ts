export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** BCP 47 tags for <html lang>, hreflang and date formatting. */
export const languageTags: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
};
