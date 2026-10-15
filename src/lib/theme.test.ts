import { describe, expect, it } from "vitest";
import { initTheme, toggleTheme } from "./theme";

function fakeRoot(theme?: string): HTMLElement {
  return { dataset: theme ? { theme } : {} } as unknown as HTMLElement;
}

describe("initTheme", () => {
  it("uses the stored choice when there is one", () => {
    const root = fakeRoot();
    expect(
      initTheme(
        root,
        () => "dark",
        () => false,
      ),
    ).toBe("dark");
    expect(root.dataset.theme).toBe("dark");
  });

  it("follows the system preference when nothing is stored", () => {
    expect(
      initTheme(
        fakeRoot(),
        () => null,
        () => true,
      ),
    ).toBe("dark");
    expect(
      initTheme(
        fakeRoot(),
        () => null,
        () => false,
      ),
    ).toBe("light");
  });

  it("ignores invalid stored values", () => {
    expect(
      initTheme(
        fakeRoot(),
        () => "purple",
        () => false,
      ),
    ).toBe("light");
  });

  it("falls back to the system preference when storage is blocked", () => {
    const blocked = () => {
      throw new Error("SecurityError");
    };
    expect(initTheme(fakeRoot(), blocked, () => true)).toBe("dark");
  });

  it("is self-contained, so it can be serialized into an inline script", () => {
    // Rebuilds the function from its source text alone: any reference to an outer
    // variable or import would throw here, just like it would in the browser.
    const rebuilt = new Function(`return (${initTheme.toString()})`)() as typeof initTheme;
    const root = fakeRoot();
    rebuilt(
      root,
      () => "light",
      () => true,
    );
    expect(root.dataset.theme).toBe("light");
  });
});

describe("toggleTheme", () => {
  it("switches dark to light and stores the choice", () => {
    const root = fakeRoot("dark");
    const stored: string[] = [];
    expect(toggleTheme(root, (t) => stored.push(t))).toBe("light");
    expect(root.dataset.theme).toBe("light");
    expect(stored).toEqual(["light"]);
  });

  it("switches light to dark", () => {
    expect(toggleTheme(fakeRoot("light"), () => {})).toBe("dark");
  });

  it("still switches when storage is blocked", () => {
    const root = fakeRoot("light");
    toggleTheme(root, () => {
      throw new Error("SecurityError");
    });
    expect(root.dataset.theme).toBe("dark");
  });
});
