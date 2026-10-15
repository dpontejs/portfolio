// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://diegoponte.dev",
  vite: {
    plugins: [tailwindcss()],
  },
});
