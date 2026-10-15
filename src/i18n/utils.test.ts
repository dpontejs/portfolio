import { describe, expect, it } from "vitest";
import { ui } from "./ui";
import {
  alternates,
  formatMonth,
  formatPeriod,
  getLocaleFromUrl,
  localizePath,
  useTranslations,
} from "./utils";

describe("getLocaleFromUrl", () => {
  it("detects Portuguese from the /pt prefix", () => {
    expect(getLocaleFromUrl(new URL("https://diegoponte.dev/pt/"))).toBe("pt");
    expect(getLocaleFromUrl(new URL("https://diegoponte.dev/pt"))).toBe("pt");
  });

  it("defaults to English", () => {
    expect(getLocaleFromUrl(new URL("https://diegoponte.dev/"))).toBe("en");
    expect(getLocaleFromUrl(new URL("https://diegoponte.dev/projects/"))).toBe("en");
  });

  it("does not mistake paths that only start with 'pt'", () => {
    expect(getLocaleFromUrl(new URL("https://diegoponte.dev/ptolemy/"))).toBe("en");
  });
});

describe("localizePath", () => {
  it("keeps English paths unprefixed", () => {
    expect(localizePath("/", "en")).toBe("/");
    expect(localizePath("/pt/", "en")).toBe("/");
  });

  it("prefixes Portuguese paths", () => {
    expect(localizePath("/", "pt")).toBe("/pt/");
    expect(localizePath("/pt/", "pt")).toBe("/pt/");
  });
});

describe("alternates", () => {
  it("lists every locale version of a page", () => {
    expect(alternates("/pt/")).toEqual([
      { locale: "en", lang: "en", path: "/" },
      { locale: "pt", lang: "pt-BR", path: "/pt/" },
    ]);
  });
});

describe("useTranslations", () => {
  it("returns the string for the locale", () => {
    expect(useTranslations("pt")("nav.experience")).toBe(ui.pt["nav.experience"]);
    expect(useTranslations("en")("nav.experience")).toBe(ui.en["nav.experience"]);
  });

  it("defines every key in every locale", () => {
    expect(Object.keys(ui.pt).sort()).toEqual(Object.keys(ui.en).sort());
  });
});

describe("formatMonth and formatPeriod", () => {
  it("formats months per locale", () => {
    expect(formatMonth("2026-07", "en")).toBe("Jul 2026");
    expect(formatMonth("2026-07", "pt")).toBe("jul. 2026");
  });

  it("formats a period with an en dash", () => {
    expect(formatPeriod("2024-06", "2024-12", "en")).toBe("Jun 2024 – Dec 2024");
  });

  it("shows 'Present' for ongoing roles", () => {
    expect(formatPeriod("2025-06", undefined, "en")).toBe("Jun 2025 – Present");
    expect(formatPeriod("2025-06", undefined, "pt")).toBe("jun. 2025 – Atual");
  });
});
