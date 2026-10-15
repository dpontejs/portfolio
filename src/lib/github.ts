/**
 * Live repository stats from the GitHub API, fetched once at build time.
 *
 * The site must build even when GitHub is down, rate limited or offline: any failure just means
 * the project card is rendered without stats. Set GITHUB_OFFLINE=1 to skip the API entirely
 * (e2e tests do, so they don't depend on the network). GITHUB_TOKEN, when present, raises the
 * rate limit from 60 to 5,000 requests per hour (CI provides one).
 */

const OWNER = "dpontejs";
const TIMEOUT_MS = 5_000;

export interface RepoStats {
  url: string;
  stars: number;
  language: string | null;
  pushedAt: string;
  homepage: string | null;
}

interface Options {
  fetchFn?: (url: string, init?: RequestInit) => Promise<Response>;
  token?: string;
  offline?: boolean;
}

// Astro renders the page once per language; both renders share one request per repo.
const cache = new Map<string, Promise<RepoStats | null>>();

export function clearRepoStatsCache(): void {
  cache.clear();
}

export async function fetchRepoStats(
  repos: string[],
  {
    fetchFn = fetch,
    token = process.env.GITHUB_TOKEN,
    offline = process.env.GITHUB_OFFLINE === "1",
  }: Options = {},
): Promise<Map<string, RepoStats>> {
  const stats = new Map<string, RepoStats>();
  if (offline) return stats;

  const results = await Promise.all(
    repos.map((repo) => {
      let pending = cache.get(repo);
      if (!pending) {
        pending = fetchOne(repo, fetchFn, token);
        cache.set(repo, pending);
      }
      return pending;
    }),
  );
  results.forEach((result, i) => {
    if (result) stats.set(repos[i], result);
  });
  return stats;
}

async function fetchOne(
  repo: string,
  fetchFn: NonNullable<Options["fetchFn"]>,
  token: string | undefined,
): Promise<RepoStats | null> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const response = await fetchFn(`https://api.github.com/repos/${OWNER}/${repo}`, {
      headers,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      console.warn(`[github] ${repo}: HTTP ${response.status}, rendering without stats`);
      return null;
    }
    return parse(await response.json());
  } catch (error) {
    console.warn(`[github] ${repo}: ${String(error)}, rendering without stats`);
    return null;
  }
}

function parse(data: unknown): RepoStats | null {
  if (typeof data !== "object" || data === null) return null;
  const d = data as Record<string, unknown>;
  if (
    typeof d.html_url !== "string" ||
    typeof d.stargazers_count !== "number" ||
    typeof d.pushed_at !== "string"
  ) {
    return null;
  }
  return {
    url: d.html_url,
    stars: d.stargazers_count,
    language: typeof d.language === "string" ? d.language : null,
    pushedAt: d.pushed_at,
    homepage: typeof d.homepage === "string" && d.homepage !== "" ? d.homepage : null,
  };
}
