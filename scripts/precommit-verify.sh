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

# Check if content files are being modified
CONTENT_FILES=$(git diff --cached --name-only --diff-filter=ACM | \
  grep -E "(src/data/unstructured/.*\.json|src/pages/.*\.astro|src/apps/.*/manifest\.ts)" || true)

if [ -n "$CONTENT_FILES" ]; then
  echo ""
  echo "⚠️  CONTENT FILES MODIFIED IN COMMIT:"
  echo ""
  echo "$CONTENT_FILES" | sed 's/^/   /'
  echo ""

  # Run lightweight AI artifact linter
  echo "🔍 Running AI artifact linter..."
  if node scripts/lint_ai_artifacts.js $CONTENT_FILES; then
    echo "✅ No critical AI artifacts detected"
  else
    echo "❌ AI artifacts detected - review output above"
    echo ""
    # Don't block commit, but show warning
  fi
  echo ""

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✍️  REMINDER: Writing Quality Checks Required (v1.3.0)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "AUTO-FIX WORKFLOW:"
  echo ""
  echo "  1. ✅ Run 'languaging' skill for register compliance"
  echo "     (B2-C1 for services, C1-C2 for Insights only)"
  echo ""
  echo "  2. ✅ Run 'checking-crappy-writing' v1.3.0 skill (AUTO-FIX)"
  echo "     Claude Code assistant will automatically fix AI artifacts"
  echo ""
  echo "  3. ✅ Review auto-fixes reported by assistant"
  echo "     Accept/reject/edit changes as needed"
  echo ""
  echo "  4. ✅ Update provenance to 'human-edited'"
  echo "     All content must have provenance tracking"
  echo ""
  echo "  5. ✅ Set _meta.contentStatus to 'approved'"
  echo "     Required for governance validation"
  echo ""
  echo "  6. ✅ Run 'npm run validate:governance' - must PASS"
  echo "     Blocks commit if provenance not human-reviewed"
  echo ""
  echo "See: .claude/skills/checking-crappy-writing/SKILL.md v1.3.0"
  echo ""
  echo "Your PR will require Writing Quality Review + Provenance Attestation."
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
fi

# TODO: block commits that add an English page without its Spanish mirror.
# TODO: block commits that remove or weaken mobile-first or localization metadata.

exit 0
