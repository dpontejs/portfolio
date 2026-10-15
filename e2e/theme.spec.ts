import { expect, test } from "@playwright/test";

test.describe("follows the system preference", () => {
  for (const scheme of ["light", "dark"] as const) {
    test(`${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", scheme);
    });
  }
});

test("theme is set before the first paint (no flash)", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  // Records data-theme as soon as <body> starts parsing, before any deferred script runs.
  await page.addInitScript(() => {
    new MutationObserver((_, observer) => {
      if (document.body) {
        (window as unknown as { themeAtBody: string | undefined }).themeAtBody =
          document.documentElement.dataset.theme;
        observer.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });
  });
  await page.goto("/");
  const themeAtBody = await page.evaluate(
    () => (window as unknown as { themeAtBody: string | undefined }).themeAtBody,
  );
  expect(themeAtBody).toBe("dark");
});

test("toggle switches theme and remembers the choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle dark mode" });

  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
