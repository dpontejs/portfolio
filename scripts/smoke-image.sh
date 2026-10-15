#!/usr/bin/env bash
# Smoke test for the production image: start it, wait until healthy, check what it serves.
# Usage: scripts/smoke-image.sh <image> <expected-commit>
set -euo pipefail

image="${1:?usage: smoke-image.sh <image> <expected-commit>}"
commit="${2:?usage: smoke-image.sh <image> <expected-commit>}"
name="portfolio-smoke-$$"
port=18080
failures=0

cleanup() { docker rm -f "$name" >/dev/null 2>&1 || true; }
trap cleanup EXIT

docker run -d --name "$name" -p "127.0.0.1:$port:80" "$image" >/dev/null

# Wait for the Dockerfile HEALTHCHECK to report healthy (same signal the deploy agent uses).
for _ in $(seq 1 30); do
  status="$(docker inspect --format '{{.State.Health.Status}}' "$name")"
  [[ "$status" == "healthy" ]] && break
  sleep 1
done

check() {
  local description="$1" expected="$2" actual="$3"
  if [[ "$actual" == "$expected" ]]; then
    printf '  ok    %s\n' "$description"
  else
    printf '  FAIL  %s (expected %s, got %s)\n' "$description" "$expected" "$actual"
    failures=$((failures + 1))
  fi
}

base="http://127.0.0.1:$port"
header() { curl -sI "$1" | tr -d '\r' | awk -v h="$2" 'tolower($1) == tolower(h)":" {sub(/^[^:]+: /, ""); print}'; }
asset="$(curl -s "$base/" | grep -oE '/_astro/[^"]+\.css' | head -1)"

echo "Smoke tests for $image"
check "container is healthy"                     healthy "$status"
check "/ responds 200"                           200 "$(curl -s -o /dev/null -w '%{http_code}' "$base/")"
check "/pt/ responds 200"                        200 "$(curl -s -o /dev/null -w '%{http_code}' "$base/pt/")"
check "version.json has the build commit"        "{\"commit\":\"$commit\"}" "$(curl -s "$base/version.json")"
check "version.json is never cached"             no-store "$(header "$base/version.json" cache-control)"
check "assets are cached forever"                "public, max-age=31536000, immutable" "$(header "$base$asset" cache-control)"
check "responses are compressed"                 gzip "$(curl -s -H 'Accept-Encoding: gzip' -o /dev/null -D - "$base/" | tr -d '\r' | awk 'tolower($1)=="content-encoding:"{print $2}')"

if ((failures > 0)); then
  echo "$failures check(s) failed"
  exit 1
fi
echo "all checks passed"
