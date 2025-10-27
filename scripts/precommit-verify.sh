#!/usr/bin/env bash
# GeoVerity 2026 — Pre-Commit Compliance Guard

# Check if protected files are being committed
PROTECTED_FILES=$(git diff --cached --name-only | grep -E "^(src/layouts/|src/components/sections/|src/pages/|public/index.html)")

if [ -n "$PROTECTED_FILES" ]; then
  echo ""
  echo "⚠️  PROTECTED FILES DETECTED IN COMMIT:"
  echo ""
  echo "$PROTECTED_FILES" | sed 's/^/   /'
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📋 REMINDER: Building Pages Compliance Review Required"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "Before your PR can be merged, you must:"
  echo ""
  echo "  1. Follow the page templating workflow:"
  echo "     .claude/workflows/page-templating.md"
  echo ""
  echo "  2. Complete the Building Pages Compliance Review template:"
  echo "     .claude/skills/building-pages/SKILL.md"
  echo ""
  echo "  3. Include the completed review in your PR description"
  echo ""
  echo "CI will validate the review and block merge if:"
  echo "  - Template is missing"
  echo "  - Any check is marked FAIL"
  echo "  - Final verdict is not 'PASS - Ready to ship'"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  # Optional: If PR description staging file exists, validate now
  if [ -f ".github/pr_description.md" ]; then
    echo "📄 Found staged PR description - validating..."
    if node scripts/validate_building_pages_review.js; then
      echo "✅ Compliance review validated locally"
    else
      echo "❌ Compliance review validation failed"
      echo ""
      echo "Fix issues before pushing. This will block CI."
      # Uncomment to block commit:
      # exit 1
    fi
    echo ""
  fi
fi

# TODO: block commits that add an English page without its Spanish mirror.
# TODO: block commits that remove or weaken mobile-first or localization metadata.

exit 0
