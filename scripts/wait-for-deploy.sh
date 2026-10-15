#!/usr/bin/env bash
# Waits until the live site serves the given commit (the VPS pulls new images every minute).
# Fails when the timeout expires, e.g. because the new version was unhealthy and got rolled back.
# Usage: scripts/wait-for-deploy.sh <site-url> <commit> [timeout-seconds]
set -uo pipefail

url="${1:?usage: wait-for-deploy.sh <site-url> <commit> [timeout-seconds]}"
commit="${2:?usage: wait-for-deploy.sh <site-url> <commit> [timeout-seconds]}"
timeout="${3:-300}"
deadline=$((SECONDS + timeout))

while ((SECONDS < deadline)); do
  live="$(curl -fsS --max-time 10 "$url/version.json" 2>/dev/null | grep -oE '"commit":"[^"]*"' | cut -d'"' -f4)"
  if [[ "$live" == "$commit" ]]; then
    echo "live: $commit (after ${SECONDS}s)"
    exit 0
  fi
  echo "waiting: live=${live:-unreachable} want=$commit"
  sleep 10
done

echo "timeout after ${timeout}s: $url still serves ${live:-nothing}, expected $commit"
echo "check the server: journalctl -u stack-update@portfolio"
exit 1
