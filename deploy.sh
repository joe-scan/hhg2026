#!/usr/bin/env bash
# Publish site/ to https://happyherogames.com (see README: Deploying).
# Needs the retroelf-host entry in ~/.ssh/config (Namecheap, port 21098, key joescanlon_deploy).
# The web root is ~/happyherogames.com. --delete removes old site files but the P filters protect
# .well-known (Namecheap's SSL renewal checks it) and cgi-bin, which cPanel put there.
set -euo pipefail
cd "$(dirname "$0")"
node tools/build.mjs
rsync -rtvz --delete --chmod=D755,F644 \
  --filter='P .well-known/' --filter='P cgi-bin/' \
  site/ retroelf-host:happyherogames.com/
for p in '' free/ free/christmas/ free/halloween/ name/ privacy/ terms/ g/demo/ es/ ga/free/halloween/ builder.js arcade/engine.js arcade/free.js css/site.css img/og.png img/logo.svg; do
  printf '%s  https://happyherogames.com/%s\n' "$(curl -s -o /dev/null -w '%{http_code}' "https://happyherogames.com/$p")" "$p"
done
