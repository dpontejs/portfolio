import type { APIRoute } from "astro";

/**
 * Commit this build came from. The deploy pipeline polls it to confirm the new version is live,
 * and the container healthcheck uses it to know the site is being served.
 * Rendered once at build time into dist/version.json (static site, no server).
 */
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ commit: process.env.GIT_SHA ?? "dev" }), {
    headers: { "Content-Type": "application/json" },
  });
