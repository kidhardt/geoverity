#!/usr/bin/env bash
# GeoVerity 2026 – Lighthouse CI (Mobile)
# Requires: npm install -g lighthouse
echo "Running Lighthouse mobile audit..."
URL="http://localhost:4321"  # adjust to dev server
lighthouse $URL --only-categories=performance --output=json --output-path=./lighthouse-report.json --quiet
SCORE=$(node -e "console.log(require('./lighthouse-report.json').categories.performance.score)")
echo "Mobile performance score: $SCORE"
if (( $(echo "$SCORE < 0.9" | bc -l) )); then
  echo "❌ Mobile performance below 90%"
  exit 1
else
  echo "✅ Mobile performance ≥90%"
  exit 0
fi
