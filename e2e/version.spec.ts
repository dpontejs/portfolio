import { expect, test } from "@playwright/test";
import { TEST_GIT_SHA } from "../playwright.config";

test("version.json exposes the build commit", async ({ request }) => {
  const response = await request.get("/version.json");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toEqual({ commit: TEST_GIT_SHA });
});
