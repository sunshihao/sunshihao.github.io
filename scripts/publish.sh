#!/usr/bin/env bash
# 本地手动发版：构建 → 用 REST API 推到 weekly 分支（Pages 会自动重建）
# 用法：bash scripts/publish.sh "发布说明"
set -euo pipefail
cd "$(dirname "$0")/.."
ENVF=${ENVF:-$(cd "$(dirname "$0")/.." && pwd)/.env}
[ -f "$ENVF" ] || ENVF=/Users/ssh/sites/sunshihao.github.io/.env
if [ -f "$ENVF" ]; then set -a; . "$ENVF"; set +a; fi
: "${GITHUB_TOKEN:?需要 GITHUB_TOKEN（$ENVF）}"

npm run build
python3 ~/.hermes/skills/research/sourced-news-brief/scripts/api_push.py \
  --site dist --branch weekly -m "${1:-手动发版 $(date '+%Y-%m-%d %H:%M')}"
