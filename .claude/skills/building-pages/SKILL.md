---
name: building-pages
description: Use when shipping header, navigation, hero, or above-the-fold layouts across frameworks and you must enforce measurable Core Web Vitals, WCAG 2.2 AA+, localization parity, and mobile-first ergonomics with auditable verification workflows
---

# Building Pages (2025–2026 Standard)

## Overview

The master skill for constructing and reviewing above-the-fold experiences. It enforces outcome-based rules that keep navigation, hero, and header layouts accessible, fast, localized, and ergonomic across React, Astro, Next, Vue, Svelte, SSR/SSG, and SPA routing systems.

**Version:** 2.0.0 (Master Consolidation)

**Governs:** Creation, review, and validation of all header, navigation, hero, and above-the-fold components across web properties using outcome-based, measurable, and framework-neutral standards.

**Compatible with:** React, Astro, Next, Vue, Svelte, SSR/SSG, and SPA routing systems. Applies to both static and dynamic layouts.

## When to Use

- Building or reviewing header, navigation, drawer, hero, or splash zones
- Enforcing measurable Core Web Vitals (LCP, INP, CLS) on new or refactored layouts
- Validating WCAG 2.2 AA+ accessibility, localization parity, and mobile-first ergonomics
- Auditing CI pipelines and manual QA plans tied to page-shell releases

## Goals

- Guarantee measurable compliance with Core Web Vitals (LCP, INP, CLS) and WCAG 2.2 AA+
- Provide concrete, testable rules for accessibility, performance, and localization
- Enable consistent nav/hero design across frameworks without mandating markup or naming
- Support progressive enhancement, SPA routing, and design-system integration
- Deliver reproducible CI, RUM, and manual QA verification procedures

## Priority Order

1. **Accessibility & Legal Compliance** (highest)
2. **Core Web Vitals Performance**
3. **Mobile-First Ergonomics**
4. **Localization / Internationalization**
5. **Design-System Consistency / Branding**

---

## Instructions for AI Agent

When this skill is invoked, follow these steps exactly:

### Step 1: Identify the Task Type

Determine if you are:
- **Building new** header/navigation/hero components
- **Reviewing existing** code for compliance
- **Refactoring** non-compliant legacy patterns

### Step 2: Gather Required Evidence

Before making any judgments, collect:

**For new builds:**
- Framework and routing approach (Astro/React/Next/etc.)
- Target device profile (mobile-first assumption)
- Localization requirements (languages, RTL support)
- Design system tokens (if available)

**For reviews:**
- Complete component code (markup, styles, behavior)
- Existing CI metrics (LCP/CLS/INP if available)
- Localization catalog location
- Device testing results (if available)

**For refactors:**
- Current implementation and violations
- CI baseline metrics
- Breaking change tolerance

### Step 3: Apply Compliance Rules

Systematically check against these sections **in priority order**:

1. **Accessibility (Section 5)** - Skip links, focus, contrast, ARIA
2. **Performance (Section 1)** - LCP/INP/CLS thresholds
3. **Tap Targets (Section 4)** - Minimum size verification
4. **Localization (Section 6)** - Lang/dir attributes, catalog proof, RTL
5. **Navigation Semantics (Section 2)** - Role attributes, focus management
6. **Gesture Conditions (Section 3)** - Media query gating
7. **Governance (Section 7)** - CI/QA verification paths

### Step 4: Check for Red Flags

Scan PR notes, commit messages, and discussion for **immediate-fail phrases**:
- "We'll fix INP later"
- "Localization in Phase 2"
- "Keyboard users not in MVP"
- "Focus styling deferred"
- "Spanish catalog pending"
- "Temporary mobile nav"

If ANY red flag found → **output "This cannot ship" immediately** and stop.

### Step 5: Output Review Results

Use the **Required Review Output Template** (see template section below) exactly as specified.

**For builds:** Generate compliant code with inline comments citing specific rules.

**For reviews:** Output the template with PASS/FAIL verdicts, then provide corrected code for all FAILs.

**For refactors:** Output template, highlight BREAKING CHANGES, cite specific WCAG/CWV requirements.

### Step 6: Final Verdict

- If **all checks PASS** → Output: **"PASS - Ready to ship"**
- If **any check FAILS** → Output: **"THIS CANNOT SHIP"** with specific remediation steps

**Do not offer to "make improvements later" or "track as technical debt." Failed compliance blocks shipment.**

---

## Critical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **LCP** | ≤ 2.5 s | 75th percentile mobile |
| **INP** | < 200 ms | Nav-toggle response via RUM/trace |
| **CLS** | < 0.1 | First render + interactions |
| **Tap Targets** | ≥ 44 × 44 px | Or ≥ 32 × 32 px control + ≥ 12 px padding |
| **Accessibility** | WCAG 2.2 AA → AA+ | 2026 readiness |

### CI Audit Profile

- Median of 3 Lighthouse mobile audits using Moto G Power, 4G throttling, 4× CPU slowdown
- Variance tolerance: ±10% LCP/INP, ±0.02 CLS
- RUM instrumentation required for real interaction timing

### RUM Instrumentation Guidance

```javascript
// Add performance marks for nav toggle
performance.mark('navToggleStart');
performance.measure('navToggleINP');

// Observe INP via PerformanceObserver
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Report median < 200 ms in CI
  }
});
observer.observe({ type: 'event' });
```

Or use Playwright trace timing for automated verification.

---

## Compliance Checklist

### Must Have

Every page MUST meet ALL of the following:

- [ ] CLS < 0.1, LCP ≤ 2.5 s, INP < 200 ms (verified by RUM + CI)
- [ ] Visible focus rings on all interactive elements
- [ ] Tap targets meet 44 × 44 px or 32 × 32 px + 12 px spacing rule
- [ ] Skip link focusable at load and on SPA route changes
- [ ] Landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) intact
- [ ] Drawer retains `role="navigation"` and uses polite aria messages only when context meaningfully changes
- [ ] Lang + dir accurate and reflected in layout
- [ ] Localization hooks + catalog proof exist
- [ ] Gesture logic conditional on pointer and hover media queries
- [ ] Progressive enhancement or prerendered fallback present for SPA navigation
- [ ] CI + manual QA confirm compliance using measurable tools

### Verification Requirements

- [ ] Metrics meet stated budgets and are captured in CI + RUM
- [ ] Navigation semantics and focus management correct
- [ ] Gesture gating follows defined conditions
- [ ] Tap targets and tokens comply with rules
- [ ] Accessibility requirements verified
- [ ] Localization hooks, catalog proof, and RTL behavior aligned
- [ ] CI and manual QA loops executed
- [ ] Document token mapping in design-system README (missing aliases = **FAIL**)

### Failure Policy

**Any unmet criterion → This cannot ship.**

---

## 1. Performance / Core Web Vitals

### Requirements

- Achieve defined LCP/INP/CLS thresholds
- Font strategy MUST use `font-display: swap` or equivalent to prevent FOIT/FOUC
- Inline or preload critical CSS as needed (outcome-based, not prescriptive)
- Above-the-fold visuals must declare `width`/`height` or `aspect-ratio`
- Measure LCP/CLS in CI (Lighthouse) and INP in RUM/Playwright
- CI stores audit results and regression deltas per commit

### Implementation

- Hit the LCP/INP/CLS thresholds; store medians and regression deltas per commit
- Use `font-display: swap` (or equivalent) to avoid FOIT/FOUC
- Inline or preload critical CSS only when necessary; focus on outcomes not tools
- Declare `width`, `height`, or `aspect-ratio` for above-the-fold assets
- Instrument nav toggle with `performance.mark()` and `performance.measure()`; report < 200 ms median

### CI Audit Details

- Run three Lighthouse mobile audits using Moto G Power, 4G throttling, 4× CPU slowdown
- Allow ±10% variance on LCP/INP and ±0.02 on CLS
- Maintain RUM collectors in production for real interaction timing

---

## 2. Navigation Semantics & Behavior

### Requirements

- Drawer/mega-menu keeps `role="navigation"`; reserve `role="dialog"` only for true modals
- `aria-live="polite"` allowed only for meaningful state changes (not every toggle)
- Focus moves into nav on open, returns to trigger on close
- Desktop menus open on click/Enter (hover highlights only)
- Keyboard: Escape closes, Tab/Arrow navigates
- Screen readers announce current section via `aria-expanded`/`aria-controls` correctly

### Example: Proper Drawer Setup

```html
<button
  aria-expanded="false"
  aria-controls="main-nav"
  id="nav-toggle">
  Menu
</button>

<nav
  id="main-nav"
  role="navigation"
  aria-labelledby="nav-toggle">
  <!-- Navigation content -->
</nav>

<!-- Only announce meaningful changes -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- Announce "Navigation opened" only on first open, not every toggle -->
</div>
```

---

## 3. Gesture & Input Conditions

### When to Enable Swipe

Enable swipe-to-close **ONLY** when:

```css
(hover: none) and (pointer: coarse) and (not (forced-colors: active))
```

### When to Disable Gestures

- When `prefers-reduced-motion: reduce`
- When keyboard focus mode is active (use `focus-visible` tracking)
- On pen/hybrid devices (default to tap controls only)

### Touch Listener Requirements

- Keep touch listeners **passive**
- Execution time **< 50 ms**

### Example: Conditional Gesture Logic

```javascript
const supportsGestures =
  window.matchMedia('(hover: none)').matches &&
  window.matchMedia('(pointer: coarse)').matches &&
  !window.matchMedia('(forced-colors: active)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (supportsGestures) {
  // Enable swipe handlers (passive listeners only)
}
```

---

## 4. Tap Target Ergonomics / Tokens

### Minimum Size

- **44 × 44 px** (preferred)
- OR **32 × 32 px control** + **12 px padding/margin** per side

### Verification Tools

- Axe rule: `"target-size"`
- Playwright: `boundingBox()` assertions

### Token Aliasing Example

```css
:root {
  --tap-min-block: var(--ds-size-touch-target, 44px);
}

.nav-link {
  min-width: var(--tap-min-block);
  min-height: var(--tap-min-block);
  /* OR */
  padding: 12px; /* With 32px minimum control size */
}
```

### Documentation Requirement

**Document token mapping in design-system README.**

Missing aliases = **FAIL – design token unlinked.**

---

## 5. Accessibility (WCAG 2.2 AA+)

### Skip Links

- Appears before `<main>`
- May follow a language switcher/CTA if the header is congested
- SPA routes must restore focus to `<main>` on navigation

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### Focus

- Always visible (can be stylized but not removed)
- Apply consistent focus indicator across all interactive elements

```css
/* Visible focus - can customize but NEVER remove */
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### Contrast

| Element | Ratio |
|---------|-------|
| Text | 4.5:1 |
| Large text and UI elements | 3:1 |

### Announcements

- Use polite `aria-live` only for substantive context changes, not repetitive toggles

### Progressive Enhancement

- Must have acceptable fallback: `<noscript>` static links OR prerendered HTML shell that hydrates

```html
<noscript>
  <nav>
    <a href="/services">Services</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</noscript>
```

### Validation

- Validate with tools: Axe, WAVE, or Playwright
- CI pipeline must log all accessibility outcomes

---

## 6. Localization / RTL / Catalog

### HTML Setup

- The `<html>` tag must have correct `lang` and `dir` attributes
- Layouts must mirror direction using logical CSS properties

```html
<html lang="en" dir="ltr">
<!-- OR -->
<html lang="ar" dir="rtl">
```

```css
/* Use logical properties for RTL support */
.nav-item {
  margin-inline-start: 1rem; /* Not margin-left */
  padding-inline-end: 0.5rem; /* Not padding-right */
}
```

### RTL Behavior

- Drawer anchors and swipe directions must swap in RTL
- Test with `dir="rtl"` to verify layout mirrors correctly

### Hook Patterns

Acceptable i18n hook patterns:

- `data-i18n-key="…"`
- `t("id")`, `locals.t("…")`
- React Intl: `<FormattedMessage id="…"/>`
- Vue I18n: `$t("…")`
- Next/Astro: `useTranslations("…")`

### Catalog Proof

**Requirement:** Reviewer must confirm both i18n hook AND catalog proof are present.

**Acceptable proofs** (at least one required):
- `/locales/<lang>.json` or `.yaml` file in the repository
- CI internationalization extraction report artifact
- Lint rule verifying message ID parity

---

## 7. Governance & Verification

### Automated CI Pipeline

Required CI checks:

- [ ] Lighthouse mobile audit (3x run median) logging LCP/CLS within tolerance
- [ ] RUM or Playwright trace proving navigation toggle INP < 200 ms
- [ ] Axe Core scan reporting zero WCAG 2.2 AA violations
- [ ] Localization catalog lint must pass for all languages

### Manual QA

Required manual verification:

- [ ] Verify keyboard loops, focus return, and ARIA correctness
- [ ] Run screen-reader checks to avoid redundant announcements
- [ ] Confirm gestures activate only on eligible devices
- [ ] Validate tap target spacing via automated rule or bounding box measurements

### Reporting

- PASS/FAIL summary must be recorded in CI report
- Any failure blocks shipment ("This cannot ship")

---

## Review Mode

When reviewing code against this skill:

1. Evaluate code against all rules for a PASS/FAIL outcome
2. Confirm RUM instrumentation, token aliases, and localization proof are present
3. For all FAILs, provide corrected code and clear rationale
4. Conclude with final verdict: "PASS" or "This cannot ship"

---

## Required Review Output Template

**Must output exactly the following template verbatim. Altering the format is a FAIL.**

This structure enables CI parsing. Copy the block below and fill in PASS/FAIL verdicts:

```markdown
## Building Pages Compliance Review

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
```

**Instructions:**
1. Copy the entire template above (including the `## Building Pages Compliance Review` heading)
2. Replace each `PASS/FAIL` with your verdict
3. Fill in actual metric values where available
4. List specific red flags or write "None"
5. Select ONE final verdict (delete the other option)
6. Do NOT alter the heading text, section names, or structure

---

## Red Flags - Immediate Fail

**Immediate failure if any PR notes, commits, or discussions include:**

- "We'll fix INP later"
- "Localization in Phase 2"
- "Keyboard users not in MVP"
- "Focus styling deferred"
- "Spanish catalog pending"
- "Temporary mobile nav"

**Action:** Output "This cannot ship" immediately.

---

## Expected Behavior When Loaded

When this skill is active, you must:

- Generate compliant, framework-neutral code
- Use concise developer comments to explain constraints
- Accept existing tokens/classes and map compliance through aliases
- Recommend progressive gesture enhancements gated by hover/pointer checks
- For refactors, output the corrected version, a PASS/FAIL summary, and highlight BREAKING CHANGES with audit justification

---

## Legacy Handling

- **Never** preserve non-compliant legacy patterns
- All BREAKING CHANGES must cite the specific WCAG or Core Web Vitals requirement
- Document token aliasing and i18n integration for portability

---

## Enforcement

**Violating this skill equals shipping a non-compliant build. No exceptions.**

---

## Governance and Maintenance

- **Owner:** Paul Kidhardt / GeoVerity 2026
- **Last Reviewed:** 2025-10-26
- **Review Cycle:** 30 days

### Version Notes (2.0.0)

This version consolidates and refines v1.0–1.4 by:

- Unifying behavioral and outcome-based rules
- Clarifying INP verification via RUM and Playwright
- Defining measurable tap-target equivalence (44×44 or 32×32 + 12px padding)
- Adding concrete gesture disabling heuristic
- Replacing inline/critical CSS mandate with flexible performance outcomes
- Detailing localization proof requirements (catalog path, lint, CI artifact)
- Expanding skip-link and SPA focus handling
- Introducing full CI/RUM verification matrix and PASS/FAIL enforcement
- Balancing accessibility and performance mandates for modern SSR/SPA frameworks
