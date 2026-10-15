import { describe, expect, it } from "vitest";
import { locales } from "../i18n/config";
import { projects } from "./projects";

describe("projects data", () => {
  it("lists each repository once", () => {
    const repos = projects.map((p) => p.repo);
    expect(new Set(repos).size).toBe(repos.length);
  });

  it("uses valid GitHub repository names", () => {
    for (const p of projects) expect(p.repo).toMatch(/^[A-Za-z0-9_.-]+$/);
  });

  it("has text in every language, with the same number of highlights", () => {
    for (const p of projects) {
      for (const locale of locales) {
        const text = p.text[locale];
        expect(text.title.trim(), `${p.repo} ${locale} title`).not.toBe("");
        expect(text.summary.trim(), `${p.repo} ${locale} summary`).not.toBe("");
        expect(text.highlights.length, `${p.repo} ${locale} highlights`).toBe(
          p.text.en.highlights.length,
        );
        expect(text.highlights.every((h) => h.trim() !== "")).toBe(true);
      }
    }
  });

  it("has a plausible year and at least one tag", () => {
    for (const p of projects) {
      expect(p.year).toBeGreaterThanOrEqual(2022);
      expect(p.year).toBeLessThanOrEqual(new Date().getFullYear());
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });
});
