#!/usr/bin/env bash
set -e

echo "=== GeoVerity 2026: trust posture monitor ==="

echo "[1/7] TypeScript strict mode..."
npx tsc --noEmit

echo "[2/7] Astro build..."
npm run build

echo "[3/7] Beads validator..."
node scripts/beads/validate.js

echo "[4/7] Localization parity..."
node scripts/validate_localization.js

echo "[5/7] Accessibility baseline..."
node scripts/accessibility_scan.js

echo "[6/7] Governance scan..."
node scripts/data_governance_scan.js

echo "[7/7] Lighthouse mobile posture..."
bash scripts/lighthouse_ci.sh || echo "Lighthouse script reported below-target score; manual follow-up required."

echo "=== GeoVerity 2026: trust posture monitor complete ==="
