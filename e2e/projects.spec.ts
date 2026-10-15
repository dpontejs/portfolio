import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";

test("lists every featured project with a link to its code", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("#projects article");
  await expect(cards).toHaveCount(projects.length);
  for (const [i, project] of projects.entries()) {
    const card = cards.nth(i);
    await expect(card.getByRole("heading", { level: 3 })).toHaveText(project.text.en.title);
    await expect(card.getByRole("link", { name: "Code →" })).toHaveAttribute(
      "href",
      `https://github.com/dpontejs/${project.repo}`,
    );
  }
});

test("projects are translated on /pt/", async ({ page }) => {
  await page.goto("/pt/");
  await expect(page.getByRole("heading", { level: 2, name: "Projetos" })).toBeVisible();
  await expect(page.locator("#projects article").first().getByRole("heading")).toHaveText(
    projects[0].text.pt.title,
  );
  await expect(
    page.locator("#projects").getByRole("link", { name: "Código →" }).first(),
  ).toBeVisible();
});

test("builds without GitHub: cards render without live stats", async ({ page }) => {
  // The e2e build runs with GITHUB_OFFLINE=1 (playwright.config.ts).
  await page.goto("/");
  await expect(page.locator("#projects article")).toHaveCount(projects.length);
  await expect(page.getByTestId("stats")).toHaveCount(0);
});

test("projects come right after the about section", async ({ page }) => {
  await page.goto("/");
  const ids = await page.locator("main section[id]").evaluateAll((els) => els.map((e) => e.id));
  expect(ids.slice(0, 3)).toEqual(["about", "projects", "experience"]);
});
