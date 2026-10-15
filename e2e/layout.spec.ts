import { expect, test } from "@playwright/test";

for (const path of ["/", "/pt/"]) {
  for (const width of [360, 768, 1280]) {
    test(`no horizontal scroll on ${path} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBe(0);
    });
  }
}

test("has title, description and a single h1", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Diego Ponte/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});
