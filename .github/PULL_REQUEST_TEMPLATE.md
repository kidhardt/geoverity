# Pull Request

## Summary

<!-- Brief description of what this PR does (1-3 sentences) -->

## Changes

<!-- List key changes made in this PR -->

-
-
-

## Testing

<!-- How was this tested? What validations were run? -->

- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run validate:all` passes
- [ ] Manual testing completed (describe below)

**Manual testing notes:**


## Related Issues

<!-- Link to beads issues or GitHub issues -->

Refs: geoverity-XXX

---

## Building Pages Compliance Review

<!--
⚠️  REQUIRED if this PR modifies any of:
   - src/layouts/**
   - src/components/sections/**
   - src/pages/**
   - public/index.html

If your PR modifies protected files, you MUST complete this review.
See: .claude/workflows/page-templating.md
Template: .claude/skills/building-pages/SKILL.md
-->

### Metrics Check
- **LCP:** [value/result or 'MISSING DATA'] → PASS/FAIL
- **CLS:** [value/result or 'MISSING DATA'] → PASS/FAIL
- **INP (nav toggle):** [value/result or 'MISSING DATA'] → PASS/FAIL

### Accessibility and Interaction Check
- **Focus rings visible:** PASS/FAIL
- **Skip link works on SPA route change:** PASS/FAIL
- **Landmark roles correct:** PASS/FAIL
- **Tap targets meet rule:** PASS/FAIL
- **Keyboard and Escape behavior correct:** PASS/FAIL
- **ARIA live announcements limited:** PASS/FAIL

### Localization Check
- **Lang/dir attributes correct:** PASS/FAIL
- **RTL gestures reversed:** PASS/FAIL
- **i18n hook present:** PASS/FAIL
- **Catalog proof present and valid:** PASS/FAIL

### Progressive Enhancement Check
- **No-JS fallback present:** PASS/FAIL
- **Gesture logic gated correctly:** PASS/FAIL

### Red Flags Detected
[List any red-flag excuses or state "None"]

### Final Verdict
**PASS - Ready to ship** | **THIS CANNOT SHIP**

---

## Writing Quality Review (checking-crappy-writing v1.3.0)

<!--
⚠️  REQUIRED if this PR modifies user-facing content in:
   - src/data/unstructured/*.json (title, summary, disclaimer fields)
   - src/pages/**/*.astro (frontmatter: title, description)
   - src/apps/*/manifest.ts (strings objects)
   - Any hardcoded text content in templates

AUTO-FIX WORKFLOW (v1.3.0):
1. Claude Code assistant auto-fixes violations
2. Claude Code assistant reports changes below
3. You review and approve/reject/edit
4. You update provenance to "human-edited"
5. You set _meta.contentStatus to "approved"

See: .claude/skills/checking-crappy-writing/SKILL.md v1.3.0
-->

### Auto-Fix Summary

<!-- REQUIRED: Copy auto-fix report from Claude Code assistant, or write "No auto-fixes needed" -->

**Files Modified:**
-

**Auto-Fixes Applied:**

| Field | Original Text (excerpt) | Fixed Text (excerpt) | Violations Fixed |
|-------|------------------------|---------------------|------------------|
|  |  |  |  |

**Total Auto-Fixes:** 0 violations fixed across 0 fields

### Items Requiring Manual Review

<!-- REQUIRED: List issues that CANNOT be auto-fixed, or write "None - all violations auto-fixed" -->

-

### Provenance Attestation

- [ ] All `ai-generated-fixed` fields reviewed and approved by human
- [ ] All provenance fields updated to `"human-edited"` or `"human-verified"`
- [ ] All `_meta.contentStatus` set to `"approved"`
- [ ] Ran `npm run validate:governance` - **PASS**

### Section 1-12 Final Check

<!-- After reviewing auto-fixes, confirm final state. Replace [PASS/FAIL] with actual result -->

- [ ] No hallucinated/broken/misaligned citations → **[PASS/FAIL]:**
- [ ] No puffery or promotional vocabulary → **[PASS/FAIL]:**
- [ ] No vague opinion attribution → **[PASS/FAIL]:**
- [ ] No templatey discourse markers or negative parallelism → **[PASS/FAIL]:**
- [ ] No register drift or identity drift → **[PASS/FAIL]:**
- [ ] No formatting/typography artifacts → **[PASS/FAIL]:**
- [ ] No meta-chatbot voice → **[PASS/FAIL]:**
- [ ] No abrupt cutoffs or fragmented sections → **[PASS/FAIL]:**
- [ ] No structural repetition → **[PASS/FAIL]:**
- [ ] No anti-detection evasion artifacts → **[PASS/FAIL]:**

### Tier 1-4 Detection

- [ ] Tier 1: Lexical & Phrasal Scan → **[PASS/FAIL]:**
- [ ] Tier 2: Syntactic & Structural Patterns → **[PASS/FAIL]:**
- [ ] Tier 3: Semantic & Content Analysis → **[PASS/FAIL]:**
- [ ] Tier 4: Technical & Factual Verification → **[PASS/FAIL]:**

### Register Compliance

- [ ] `languaging` skill applied (B2-C1 for services, C1-C2 for Insights only) → **[PASS/FAIL]:**

### Final Verdict

<!-- REQUIRED: Check ONE box -->
- [ ] **PASS - Content ready to publish** (all provenance approved, _meta.contentStatus = "approved")
- [ ] **FAIL - Fix violations and re-run checks**

**If FAIL:** Do NOT merge. Address remaining issues, re-run checking-crappy-writing, update provenance, iterate until PASS.

---

## Screenshots

<!-- If UI changes, include screenshots for both EN and ES, mobile and desktop -->

### English
**Mobile:**
<!-- Add screenshot or write "No UI changes" -->

**Desktop:**
<!-- Add screenshot or write "No UI changes" -->

### Spanish (Español)
**Mobile:**
<!-- Add screenshot or write "No UI changes" -->

**Desktop:**
<!-- Add screenshot or write "No UI changes" -->

---

## Reviewer Checklist

<!-- For reviewers to complete -->

- [ ] Code follows GeoVerity conventions (mobile-first, bilingual, accessible)
- [ ] Tests pass in CI
- [ ] Building Pages compliance review completed (if required)
- [ ] Writing Quality Review completed (if PR modifies user-facing content)
- [ ] All review comments addressed
- [ ] No red flag phrases detected
- [ ] Ready to merge
