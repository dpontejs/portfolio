export type Theme = "light" | "dark";

/**
 * Picks the initial theme and sets `data-theme` on <html>.
 *
 * It runs inline in <head>, before the first paint, so the page never flashes the wrong theme.
 * BaseLayout serializes it with `toString()`, so it must stay self-contained: no imports and no
 * references to outer variables (a test rebuilds it from its source to guarantee that).
 * The parameters exist only so tests can inject fakes; the browser uses the defaults.
 */
export function initTheme(
  root: HTMLElement = document.documentElement,
  readStored: () => string | null = () => localStorage.getItem("theme"),
  prefersDark: () => boolean = () => matchMedia("(prefers-color-scheme: dark)").matches,
): Theme {
  let stored: string | null = null;
  try {
    stored = readStored();
  } catch {
    // Storage blocked (private mode, disabled cookies): follow the system preference.
  }
  const theme: Theme =
    stored === "light" || stored === "dark" ? stored : prefersDark() ? "dark" : "light";
  root.dataset.theme = theme;
  return theme;
}

/** Flips the current theme and remembers the visitor's choice. */
export function toggleTheme(
  root: HTMLElement = document.documentElement,
  writeStored: (theme: Theme) => void = (theme) => localStorage.setItem("theme", theme),
): Theme {
  const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    writeStored(next);
  } catch {
    // Storage blocked: the switch still works for this page view.
  }
  return next;
}
