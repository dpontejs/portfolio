import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearRepoStatsCache, fetchRepoStats } from "./github";

const apiRepo = {
  html_url: "https://github.com/dpontejs/flamengo-news",
  stargazers_count: 3,
  language: "Python",
  pushed_at: "2026-10-15T01:00:00Z",
  homepage: "",
};

function respond(status: number, body: unknown = {}) {
  return new Response(JSON.stringify(body), { status });
}

describe("fetchRepoStats", () => {
  beforeEach(() => clearRepoStatsCache());

  it("maps the GitHub API response", async () => {
    const fetchFn = vi.fn(async () => respond(200, apiRepo));
    const stats = await fetchRepoStats(["flamengo-news"], { fetchFn, offline: false });
    expect(stats.get("flamengo-news")).toEqual({
      url: "https://github.com/dpontejs/flamengo-news",
      stars: 3,
      language: "Python",
      pushedAt: "2026-10-15T01:00:00Z",
      homepage: null,
    });
    expect(fetchFn).toHaveBeenCalledWith(
      "https://api.github.com/repos/dpontejs/flamengo-news",
      expect.anything(),
    );
  });

  it("skips repos the API can't return (private, renamed, deleted)", async () => {
    const fetchFn = vi.fn(async (url: string) =>
      url.endsWith("/flamengo-news") ? respond(200, apiRepo) : respond(404),
    );
    const stats = await fetchRepoStats(["flamengo-news", "infra"], { fetchFn, offline: false });
    expect([...stats.keys()]).toEqual(["flamengo-news"]);
  });

  it("never fails the build when the network does", async () => {
    const fetchFn = vi.fn(async () => {
      throw new TypeError("fetch failed");
    });
    const stats = await fetchRepoStats(["flamengo-news"], { fetchFn, offline: false });
    expect(stats.size).toBe(0);
  });

  it("ignores malformed responses", async () => {
    const fetchFn = vi.fn(async () => respond(200, { message: "rate limited" }));
    const stats = await fetchRepoStats(["flamengo-news"], { fetchFn, offline: false });
    expect(stats.size).toBe(0);
  });

  it("makes no request in offline mode", async () => {
    const fetchFn = vi.fn();
    const stats = await fetchRepoStats(["flamengo-news"], { fetchFn, offline: true });
    expect(stats.size).toBe(0);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("authenticates when a token is available", async () => {
    const fetchFn = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () =>
      respond(200, apiRepo),
    );
    await fetchRepoStats(["flamengo-news"], { fetchFn, offline: false, token: "t0k3n" });
    const headers = new Headers(fetchFn.mock.calls[0][1]?.headers);
    expect(headers.get("Authorization")).toBe("Bearer t0k3n");
  });

  it("fetches each repo once per build, even when both languages ask", async () => {
    const fetchFn = vi.fn(async () => respond(200, apiRepo));
    await fetchRepoStats(["flamengo-news"], { fetchFn, offline: false });
    await fetchRepoStats(["flamengo-news"], { fetchFn, offline: false });
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });
});
