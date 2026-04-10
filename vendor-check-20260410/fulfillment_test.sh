#!/bin/bash
set -euo pipefail
TARGET_URL="${1:-https://vercel.com}"
RECIPIENT="${2:-hello@robertle.co}"
FROM_INBOX="${3:-vendor-compliance-packet-builder@agentmail.to}"
OUTDIR="output"

node index.js "$TARGET_URL" "$OUTDIR"
LATEST_PACKET=$(ls -t "$OUTDIR"/*.md | head -1)
python3 send_packet.py "$RECIPIENT" "Sample Vendor Compliance Packet for ${TARGET_URL}" "$LATEST_PACKET" "$FROM_INBOX"

echo "PACKET=$LATEST_PACKET"
