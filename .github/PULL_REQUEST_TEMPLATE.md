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
- [ ] All review comments addressed
- [ ] No red flag phrases detected
- [ ] Ready to merge
