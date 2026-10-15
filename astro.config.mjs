// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://diegoponte.dev",
  // English at "/", Portuguese at "/pt/" (keep in sync with src/i18n/config.ts).
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt"],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
