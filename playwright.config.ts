import { defineConfig, devices } from "@playwright/test";

/** Fake commit baked into the test build, checked by e2e/version.spec.ts. */
export const TEST_GIT_SHA = "0123456789abcdef0123456789abcdef01234567";

// End-to-end tests run against the production build (astro preview), in a real browser.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: "http://localhost:4321" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // --ignore-lock keeps the server in the foreground: Astro 7 detaches `preview` when it detects
    // an AI coding agent, and Playwright would think the server died.
    command: "npm run build && npm run preview -- --ignore-lock",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { GIT_SHA: TEST_GIT_SHA },
  },
});
