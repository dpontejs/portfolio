import { describe, expect, it } from "vitest";
import { profile } from "./profile";

const en = profile.en;
const pt = profile.pt;

describe("profile data", () => {
  it("has the same structure in both languages", () => {
    expect(pt.experience.length).toBe(en.experience.length);
    expect(pt.skills.length).toBe(en.skills.length);
    expect(pt.education.length).toBe(en.education.length);
    pt.experience.forEach((role, i) => {
      expect(role.start).toBe(en.experience[i].start);
      expect(role.end).toBe(en.experience[i].end);
      expect(role.highlights.length).toBe(en.experience[i].highlights.length);
    });
  });

  it("lists experience from most recent to oldest", () => {
    const key = (r: { start: string; end?: string }) => `${r.end ?? "9999-12"}|${r.start}`;
    const keys = en.experience.map(key);
    expect(keys).toEqual([...keys].sort().reverse());
  });

  it("uses valid YYYY-MM dates with start before end", () => {
    for (const role of en.experience) {
      expect(role.start).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
      if (role.end) {
        expect(role.end).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
        expect(role.start <= role.end).toBe(true);
      }
    }
  });

  it("has no empty text", () => {
    for (const locale of [en, pt]) {
      expect(locale.headline.trim()).not.toBe("");
      expect(locale.summary.length).toBeGreaterThan(0);
      for (const role of locale.experience) {
        expect(role.title.trim()).not.toBe("");
        expect(role.highlights.every((h) => h.trim() !== "")).toBe(true);
      }
    }
  });

  it("links to GitHub, LinkedIn and email", () => {
    const hrefs = en.links.map((l) => l.href);
    expect(hrefs).toContain("https://github.com/dpontejs");
    expect(hrefs).toContain("https://linkedin.com/in/diegopontejs");
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(true);
  });
});
