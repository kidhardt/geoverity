---
name: page-templating
triggers:
  keywords:
    - "create|build|implement (page|template|component|layout)"
    - "header|navigation|hero|footer|section"
  file_patterns:
    - "src/layouts/**"
    - "src/components/sections/**"
    - "src/pages/**/*.astro"
    - "public/index.html"
---

# Page Templating Workflow

This workflow enforces GeoVerity's compliance standards when creating or modifying page templates, layouts, or major UI sections.

## When This Workflow Applies

Trigger this workflow when:
- Creating new Astro layouts (`src/layouts/`)
- Building page templates or components (`src/components/sections/`)
- Modifying navigation, header, hero, or footer components
- Any work involving Core Web Vitals, accessibility, or mobile-first design

## Required Skills (Execute in Order)

### 1. `building-pages` (MANDATORY FIRST)
**Must invoke BEFORE writing any code.**

- Complete the compliance review template
- Verify all checks are PASS
- If ANY check fails → remediate before proceeding
- Document the completed review in your PR description

**Skipping this step = CI will block your PR.**

### 2. `templating-pages` (MANDATORY SECOND)
Astro-specific implementation guide:
- Enforces layout conventions
- Mandates bilingual frontmatter
- Provides hydration island patterns

### 3. `using-astro` (Reference)
Framework-specific patterns:
- Routing conventions
- Content collections
- React island integration

### 4. `generating-json-ld` (For Public Pages)
Structured data requirements:
- All public pages must include Schema.org markup
- Bilingual breadcrumbs
- Organization/WebSite entities

### 5. `requesting-code-review` (Before PR)
Final validation:
- Run all local validators
- Verify template output in review request
- Ensure PR description includes compliance review

## Guard Clause - STOP Before Coding

Before writing ANY template code, complete this checklist:

- [ ] Invoked `building-pages` skill
- [ ] Completed compliance review template (all PASS)
- [ ] Identified target pages and locales (EN + ES)
- [ ] Confirmed mobile-first breakpoints
- [ ] Verified design system tokens available
- [ ] Checked for existing similar layouts (avoid duplication)

## Red Flags - STOP Immediately

If you encounter these phrases in requirements, discussion, or commits, **STOP and escalate**:

- ❌ "We'll fix accessibility later"
- ❌ "Mobile optimization in Phase 2"
- ❌ "Spanish version coming soon"
- ❌ "Performance isn't critical for this page"
- ❌ "Skip localization for now"
- ❌ "Temporarily disable (any compliance check)"

**Why these are blockers:** GeoVerity's trust posture requires accessibility, performance, and bilingual parity from day one. Deferring any of these creates technical debt that blocks marketing and violates governance commitments.

## Workflow Steps

### Step 1: Invoke building-pages
```
I'm using the building-pages skill to ensure this template meets compliance standards.
```

Complete the review template. Do not proceed until verdict is "PASS - Ready to ship."

### Step 2: Invoke templating-pages
```
I'm using the templating-pages skill to implement this using Astro conventions.
```

Follow the Astro-specific guardrails for layouts, frontmatter, and islands.

### Step 3: Implement Template
- Use established layout patterns from `src/layouts/`
- Follow mobile-first CSS (min-width media queries)
- Include bilingual string hooks via i18n utilities
- Add skip links, focus management, ARIA where needed
- Defer non-critical JS with `client:idle` or `client:visible`

### Step 4: Test Locally
Run validators before committing:
```bash
npm run type-check
npm run build
node scripts/validate_localization.js
node scripts/accessibility_scan.js
```

### Step 5: Create PR
Include the completed Building Pages Compliance Review in your PR description. CI will parse and validate it.

## Notes for CLAUDE.md Integration

When `.claude/CLAUDE.md` is created, add this cross-reference:

```markdown
## Page & Template Development
See detailed workflow: [.claude/workflows/page-templating.md](.claude/workflows/page-templating.md)
```

This ensures discovery scripts and Claude can navigate between workflow documentation.

## Enforcement Layers

| Layer | Mechanism | Blocking? |
|-------|-----------|-----------|
| Pre-commit | `scripts/precommit-verify.sh` | Warning only |
| PR Description | `scripts/validate_building_pages_review.js` | ✅ Blocks merge |
| CI Pipeline | GitHub Actions `building-pages-review` job | ✅ Blocks merge |
| Skill System | `making-skill-decisions` + `templating-pages` | Claude enforcement |

All four layers work together to ensure compliance at every stage.
