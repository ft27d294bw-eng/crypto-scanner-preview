#!/bin/bash
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 22+ is required: https://nodejs.org/"
  read -r -p "Press Enter to close..." _
  exit 1
fi
export AUTH_DEV_VERIFY=1
export NODE_ENV=development
export PORT=3000
printf '\nCrypto Scanner v0.6 starting...\nOpen http://localhost:3000/?demo=1 in Safari.\nIn development, verification links are shown in this Terminal.\nUse Ctrl+C to stop.\n\n'
node server.js
