#!/usr/bin/env bash
set -e

echo "=== GeoVerity 2026: Governance Loop ==="
TODAY=$(date -Iseconds)
LOGFILE="governance-run-$TODAY.log"

echo "Run timestamp: $TODAY" | tee -a "$LOGFILE"

echo "[1/6] TypeScript strict mode..."
npx tsc --noEmit | tee -a "$LOGFILE"

echo "[2/6] Validation & Governance..."
if [ ! -d "dist" ]; then
  echo "ERROR: dist/ directory not found. Run 'npm run build' first." | tee -a "$LOGFILE"
  exit 1
fi
node scripts/beads/validate.js | tee -a "$LOGFILE"
node scripts/validate_localization.js | tee -a "$LOGFILE"
node scripts/data_governance_scan.js | tee -a "$LOGFILE"
node scripts/enforce-review-timestamps.js | tee -a "$LOGFILE"

echo "[3/6] Accessibility check..."
node scripts/accessibility_scan.js | tee -a "$LOGFILE"

echo "[4/6] Lighthouse mobile (non-blocking)..."
bash scripts/lighthouse_ci.sh | tee -a "$LOGFILE" || echo "Lighthouse below target, investigate." | tee -a "$LOGFILE"

echo "[5/6] Localization debt aging..."
node scripts/check-localization-debt.js | tee -a "$LOGFILE"

echo "[6/6] Governance summary..."
echo "Governance loop completed at $TODAY" | tee -a "$LOGFILE"

echo "=== GeoVerity 2026: Governance Loop Complete ==="
