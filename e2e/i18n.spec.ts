import { expect, test } from "@playwright/test";

test("English at / and Portuguese at /pt/", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeVisible();

  await page.goto("/pt/");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 2, name: "Experiência" })).toBeVisible();
});

test("language switch goes to the other version and marks the current one", async ({ page }) => {
  await page.goto("/");
  const languages = page.getByRole("navigation", { name: "Language" });
  await expect(languages.getByRole("link", { name: "English" })).toHaveAttribute(
    "aria-current",
    "true",
  );

  await languages.getByRole("link", { name: "Português" }).click();
  await expect(page).toHaveURL(/\/pt\/$/);
  await expect(
    page.getByRole("navigation", { name: "Idioma" }).getByRole("link", { name: "Português" }),
  ).toHaveAttribute("aria-current", "true");
});

test("declares alternate language versions for search engines", async ({ page }) => {
  await page.goto("/pt/");
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    "href",
    "https://diegoponte.dev/",
  );
  await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toHaveAttribute(
    "href",
    "https://diegoponte.dev/pt/",
  );
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
    "href",
    "https://diegoponte.dev/",
  );
});

test("shows every experience entry and the contact links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#experience ol > li")).toHaveCount(5);
  for (const name of ["GitHub", "LinkedIn", "Email"]) {
    await expect(page.locator("main").getByRole("link", { name, exact: true })).toBeVisible();
  }
});

test("section links in the header jump to the sections", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.getByRole("banner").getByRole("link", { name: "Skills" }).click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.getByRole("heading", { level: 2, name: "Skills" })).toBeInViewport();
});
