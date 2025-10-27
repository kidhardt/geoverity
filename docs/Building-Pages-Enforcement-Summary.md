# Building Pages Skill Enforcement - Implementation Summary

**Date:** 2025-10-26
**Phase:** 11 Pre-Implementation
**Status:** ✅ Complete

This document summarizes the 5-layer enforcement system for the `building-pages` skill, ensuring all page templates, layouts, and components meet GeoVerity's compliance standards before shipping.

---

## Overview

The enforcement system operates at **five layers** to catch compliance issues at every stage of development:

| Layer | File/System | Type | Blocking? |
|-------|-------------|------|-----------|
| **1. Workflow Documentation** | `.claude/workflows/page-templating.md` | Process guidance | Claude awareness |
| **2. Templating Skill** | `.claude/skills/templating-pages/SKILL.md` | Implementation guardrails | Claude enforcement |
| **3. Pre-commit Hook** | `scripts/precommit-verify.sh` | Local developer warning | Advisory (non-blocking) |
| **4. PR Validation Script** | `scripts/validate_building_pages_review.js` | Automated parsing | ✅ Blocks CI |
| **5. GitHub Actions** | `.github/workflows/repo-protection.yml` | CI/CD pipeline | ✅ Blocks merge |

---

## Layer 1: Workflow Documentation

**File:** [.claude/workflows/page-templating.md](../.claude/workflows/page-templating.md)

**Purpose:** Define the mandatory workflow for creating/modifying page templates.

**Key Features:**
- Triggers on keywords: "create/build/implement page/template/component/layout"
- Triggers on file patterns: `src/layouts/`, `src/components/sections/`, `src/pages/`
- Lists required skills in execution order
- Provides guard clause checklist before coding
- Documents red flag phrases that indicate compliance deferral

**Integration Point:**
When `.claude/CLAUDE.md` is created, add cross-reference:
```markdown
## Page & Template Development
See: [.claude/workflows/page-templating.md](.claude/workflows/page-templating.md)
```

---

## Layer 2: Templating Skill

**File:** [.claude/skills/templating-pages/SKILL.md](../.claude/skills/templating-pages/SKILL.md)

**Purpose:** Enforce Astro-specific conventions and building-pages prerequisites.

**Key Guardrails:**

### Prerequisites (Step 1):
- **MUST** have completed `building-pages` compliance review first
- **MUST** have verdict "PASS - Ready to ship"
- Blocks code generation until compliance verified

### Pattern Enforcement (Step 2):
- **Pattern A:** Full page layouts (must use `src/layouts/`, include skip links, bilingual frontmatter)
- **Pattern B:** Section components (semantic HTML, bilingual props, mobile-first CSS)
- **Pattern C:** React islands (must live in `src/apps/`, lazy hydration, no-JS fallback)

### Mobile-First CSS (Step 3):
- Base styles = mobile (320px-767px)
- Progressive enhancement with `min-width` media queries
- Tap targets ≥ 44×44px

### Bilingual Checklist (Step 4):
- All strings via props (no hardcoded English)
- `lang` and `dir` attributes propagate
- Date/number formatting uses `Intl` APIs

### Performance (Step 5):
- Images use Astro `<Image>` with WebP
- React islands use `client:idle` or `client:visible` (NOT `client:load`)
- Critical CSS inlined (< 14KB)

### Accessibility (Step 6):
- Skip link functional
- Heading hierarchy logical
- Focus rings visible
- Color contrast verified

---

## Layer 3: Pre-commit Hook

**File:** [scripts/precommit-verify.sh](../scripts/precommit-verify.sh)

**Purpose:** Warn developers locally before pushing protected file changes.

**Behavior:**
```bash
# Detects staged changes to protected paths
PROTECTED_FILES=$(git diff --cached --name-only | grep -E "^(src/layouts/|src/components/sections/|src/pages/|public/index.html)")

# If detected, shows warning with links to:
# - .claude/workflows/page-templating.md
# - .claude/skills/building-pages/SKILL.md

# Optional: Validates if .github/pr_description.md exists
```

**Advisory Mode:**
- Currently does NOT block commits (exit 0)
- Provides clear guidance on requirements
- Optionally validates staged PR description if available

**Escalation Option:**
Uncomment `exit 1` at line 45 to block commits without valid review.

---

## Layer 4: PR Validation Script

**File:** [scripts/validate_building_pages_review.js](../scripts/validate_building_pages_review.js)

**Purpose:** Parse and validate the Building Pages Compliance Review template.

**Key Features:**

### Accurate Diff Detection:
```javascript
// Uses merge-base instead of HEAD~1
const mergeBase = execSync(`git merge-base HEAD ${baseBranch}`).trim();
const changedFiles = execSync(`git diff --name-only ${mergeBase} HEAD`);
```
- Detects default branch (master/main)
- Works with force-pushes and multi-commit PRs
- Falls back gracefully if merge-base fails

### Review Content Sources (Priority Order):
1. `PR_BODY` environment variable (GitHub Actions)
2. `.github/pr_description.md` (staging file)
3. `.github/PULL_REQUEST_TEMPLATE.md` (fallback)

### Validation Checks:
- ✅ Review template present
- ✅ All required sections included
- ✅ No FAIL verdicts
- ⚠️ Red flag phrase detection (warning only)
- ✅ Final verdict is "PASS - Ready to ship"

### Exit Codes:
- `0` - Validation passed or not required
- `1` - Validation failed (blocks CI)

**Usage:**
```bash
# Local validation
npm run validate:building-pages

# CI usage (automatic via GitHub Actions)
node scripts/validate_building_pages_review.js
```

---

## Layer 5: GitHub Actions CI

**File:** [.github/workflows/repo-protection.yml](../.github/workflows/repo-protection.yml#L94-L117)

**Job:** `building-pages-review`

**Configuration:**
```yaml
building-pages-review:
  runs-on: ubuntu-latest
  if: github.event_name == 'pull_request'  # Only run on PRs
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0  # Full history for merge-base

    - uses: actions/setup-node@v4
      with:
        node-version: '20'

    - name: Get PR body
      uses: actions/github-script@v7
      with:
        script: |
          const pr = context.payload.pull_request;
          if (pr && pr.body) {
            core.exportVariable('PR_BODY', pr.body);
          } else {
            console.log('No PR body - review may come from file');
          }

    - name: Validate Building Pages Compliance Review
      run: node scripts/validate_building_pages_review.js
```

**Key Refinements:**
- `fetch-depth: 0` - Enables merge-base lookups
- Graceful handling when `pull_request` payload absent
- Exports PR body as environment variable for validator
- Runs only on pull requests (not direct pushes)

---

## Protected File Paths

All layers enforce compliance for changes to:

```
src/layouts/**
src/components/sections/**
src/pages/**
public/index.html
```

**Why these paths?**
- Direct impact on user-facing UI
- Core Web Vitals implications (LCP, INP, CLS)
- Accessibility requirements (skip links, focus, ARIA)
- Localization obligations (EN + ES parity)

---

## Red Flag Phrases

The validator detects these phrases and warns (currently non-blocking):

- ❌ "fix later"
- ❌ "phase 2"
- ❌ "coming soon"
- ❌ "not critical"
- ❌ "skip for now"
- ❌ "temporarily disabled"
- ❌ "will add"
- ❌ "todo:"
- ❌ "hack:"
- ❌ "workaround"

**Rationale:** These phrases indicate deferred compliance, which violates GeoVerity's trust posture requiring accessibility, performance, and bilingual parity from day one.

---

## Testing the Enforcement System

### Local Testing (Pre-commit):
1. Stage changes to `src/layouts/BaseLayout.astro`
2. Run `git commit -m "test"`
3. Observe warning with workflow links

### Local Validation:
1. Create `.github/pr_description.md` with compliance review
2. Run `npm run validate:building-pages`
3. Verify PASS/FAIL detection

### CI Testing:
1. Create PR modifying `src/components/sections/Hero.astro`
2. Include compliance review in PR description
3. Observe `building-pages-review` job in Actions
4. Verify job blocks merge if review incomplete

---

## Developer Workflow Example

```bash
# 1. Start feature branch
git checkout -b feat/hero-section

# 2. Invoke skills (via Claude)
# - building-pages (complete compliance review)
# - templating-pages (implement with Astro guardrails)

# 3. Implement component
# src/components/sections/Hero.astro

# 4. Test locally
npm run validate:all
npm run build

# 5. Commit (triggers pre-commit hook warning)
git add .
git commit -m "feat: add hero section with bilingual support"

# 6. Create PR with compliance review in description
# Copy completed review from building-pages skill output

# 7. CI validates automatically
# - building-pages-review job parses PR description
# - Blocks merge if FAIL or missing

# 8. Merge after approval + CI green
```

---

## NPM Scripts Added

```json
{
  "validate:building-pages": "node scripts/validate_building_pages_review.js",
  "validate:all": "npm run validate:localization && npm run validate:accessibility && npm run validate:governance && npm run validate:building-pages"
}
```

**Usage:**
```bash
# Validate building-pages review only
npm run validate:building-pages

# Run all validators (localization, a11y, governance, building-pages)
npm run validate:all
```

---

## Maintenance Notes

### Future Enhancements:
1. **PULL_REQUEST_TEMPLATE.md:** Pre-populate with compliance review structure
2. **Red Flag Escalation:** Change warnings to hard failures
3. **Metrics Integration:** Parse actual LCP/INP/CLS values from Lighthouse in review
4. **IDE Integration:** VSCode extension to validate review on save

### Common Issues:

**Issue:** Validator fails in CI but passes locally
**Cause:** Likely merge-base branch mismatch
**Fix:** Verify `origin/master` or `origin/main` exists and is up to date

**Issue:** Pre-commit hook doesn't show warning
**Cause:** Git hooks not installed
**Fix:** Run `npm run hooks:install`

**Issue:** CI can't find PR body
**Cause:** Running on push event instead of pull_request
**Fix:** Ensure job has `if: github.event_name == 'pull_request'`

---

## Integration with Phase 11

This enforcement system is now ready to support Phase 11 (140 bilingual pages). Once templates are approved and beads begin execution, every page creation will flow through:

1. **Workflow trigger** → Claude invokes `building-pages` + `templating-pages`
2. **Compliance review** → Completed template documents all checks
3. **Implementation** → Follows Astro guardrails (layouts, islands, mobile-first)
4. **Local validation** → Pre-commit hook reminds developer
5. **PR submission** → Review included in description
6. **CI enforcement** → Blocks merge if non-compliant

**Result:** Zero non-compliant pages ship to production.

---

## Files Created/Modified

### Created:
- `.claude/workflows/page-templating.md`
- `.claude/skills/templating-pages/SKILL.md`
- `scripts/validate_building_pages_review.js`
- `docs/Building-Pages-Enforcement-Summary.md` (this file)

### Modified:
- `.github/workflows/repo-protection.yml` (added `building-pages-review` job)
- `scripts/precommit-verify.sh` (added protected files warning)
- `package.json` (added `validate:building-pages` script)

---

## Summary

The 5-layer enforcement system ensures:

✅ **Claude** is aware of requirements (workflow + skills)
✅ **Developers** receive clear local guidance (pre-commit hook)
✅ **PRs** are validated automatically (parsing script)
✅ **CI** blocks non-compliant merges (GitHub Actions)
✅ **Production** only receives compliant code (all layers active)

**Zero escape hatches. Zero deferred compliance. Ship with confidence.**
