# Checking-Crappy-Writing: Recursive Integration Plan
**Date:** 2025-10-27
**Authority:** GeoVerity Content Governance / Register Enforcement Council
**Purpose:** Enforce writing quality checks at multiple workflow layers to prevent AI artifacts from reaching production

---

## Executive Summary

The `checking-crappy-writing` skill (v1.1.0) exists as a comprehensive content hygiene gate but currently has **no automated enforcement**. This plan establishes **recursive quality gates** at 5 workflow layers to ensure all client-facing content passes AI artifact detection before publication.

**Key Integration Points:**
1. **Skill Chain** - Mandatory prerequisite in `templating-pages` and `languaging`
2. **Pre-Commit Hook** - Non-blocking warnings for protected files
3. **PR Template** - Manual checklist review (analogous to Building Pages)
4. **Build-Time Validation** - Automated scanning via governance loop
5. **Making-Skill-Decisions** - Discovery trigger when writing website content

---

## Problem Statement

### Current State
- `checking-crappy-writing` skill is well-defined (10 sections + 4-tier detection)
- Covers: hallucinated citations, puffery, vague attribution, templatey discourse, register drift, formatting artifacts, meta-chatbot voice, truncations, structural repetition
- **No enforcement mechanism exists**
- Relies on manual skill invocation by the user
- Easy to skip or forget

### Risk
Without recursive enforcement:
- Hallucinated citations enter production (legal/compliance risk)
- Puffery undermines academic credibility
- Chatbot meta-language signals AI authorship
- Register drift violates `languaging` stratification
- Formatting artifacts (bold bullets, emoji, curly quotes) leak through

### Goal
**Every piece of user-facing text must pass `checking-crappy-writing` before reaching production, with recursive application until all issues are resolved.**

---

## Content Surfaces Requiring Checks

### 1. JSON Data Files (`src/data/unstructured/`)
**Files:**
- `consultingHigherEd.en.json`
- `consultingHigherEd.es.json`

**Fields to scan:**
- `title`
- `summary`
- `disclaimer`

**Current enforcement:** `data_governance_scan.js` checks metadata, NOT content quality

### 2. Astro Page Frontmatter (`src/pages/**/*.astro`)
**Files:**
- `index.astro`
- `placeholder.astro`
- `es/index.astro`
- `es/placeholder.astro`

**Fields to scan:**
- `pageMeta.title`
- `pageMeta.description`

**Current enforcement:** None

### 3. React Island Strings (`src/apps/*/manifest.ts`)
**Files:**
- `src/apps/research-integrity/manifest.ts`

**Fields to scan:**
- `strings.en.heading`
- `strings.en.subheading`
- `strings.en.ctaLabel`
- `strings.en.disclaimer`
- `strings.es.*` (Spanish equivalents)

**Current enforcement:** None

### 4. Structured Data String Fields (`src/data/structured/`)
**Files:**
- `models.ts` (TypeScript interfaces)
- `pillars.sample.ts` (sample data)

**Fields to scan:**
- `title_en`, `title_es`
- `summary_en`, `summary_es`
- `deliverable_en`, `deliverable_es`

**Current enforcement:** TypeScript strict mode (type safety only)

### 5. Hardcoded HTML/JSX in Templates
**Files:**
- Any `.astro` file with inline text content
- Section components (future: `src/components/sections/`)

**Content to scan:**
- `<h1>`, `<h2>`, `<p>`, `<a>`, etc. text nodes
- Inline marketing copy

**Current enforcement:** None

---

## Recursive Integration Strategy (5 Layers)

## **Layer 1: Skill Chain Binding (COMPLETED)**

**Implementation:** ✅ Completed 2025-10-27

**Changes made:**

### A. Updated `templating-pages/SKILL.md`
Added new section: **"Content Quality Gate (MANDATORY)"**

**Requirement:**
Before finalizing ANY user-facing text, the Claude Code assistant MUST:
1. Invoke `languaging` skill (register compliance)
2. Invoke `checking-crappy-writing` skill (AI artifact detection)
3. Pass ALL Section 11 checklist items

**Recursive application enforced:**
- Initial draft → Fix issues → Re-run → Fix issues → Re-run until PASS
- Every content revision
- Before marking page implementation complete

**Impact:**
- Any page templating work now has mandatory writing quality gate
- STOP condition if checks fail
- Prevents proceeding with implementation until content passes

### B. Updated `languaging/SKILL.md`
Added to **"Integration with Other Skills"** section:

**New requirement:**
```
5. CRITICAL: Always run `checking-crappy-writing` after generating content
```

**Execution order:**
1. `languaging` → Generate register-compliant content
2. `checking-crappy-writing` → Scan for AI artifacts
3. Iterate until both PASS

**Impact:**
- Every content generation task now includes AI artifact check
- Establishes two-phase validation: register compliance + artifact detection
- Prevents register-compliant content with AI tells from passing

**Status:** ✅ ACTIVE - No code changes needed, enforced via skill system

---

## **Layer 2: Making-Skill-Decisions Trigger (RECOMMENDED)**

**Implementation:** Update `making-skill-decisions/SKILL.md`

**Proposed change:**
Add `checking-crappy-writing` to skill discovery triggers:

```markdown
## Skill Discovery Rules

**When the user asks to write or edit website content (homepage, services, Insights posts, contact pages, disclaimers, CTAs):**

MANDATORY skill sequence:
1. Invoke `languaging` (register stratification)
2. Generate content following register rules
3. Invoke `checking-crappy-writing` (AI artifact scan)
4. If FAILS → Fix → Re-run checking-crappy-writing
5. Repeat step 4 until PASS
```

**Impact:**
- Automatic skill routing for all writing tasks
- User doesn't need to remember to invoke checking-crappy-writing
- Enforced at task initiation

**Effort:** Low (documentation update only)

**Status:** 🟡 RECOMMENDED - Needs user approval

---

## **Layer 3: Pre-Commit Hook Extension (RECOMMENDED)**

**Implementation:** Extend `scripts/precommit-verify.sh`

**Current behavior:**
- Detects changes to protected files (`src/layouts/`, `src/components/sections/`, `src/pages/`, `public/index.html`)
- Prints warning message
- Exits with 0 (non-blocking)

**Proposed enhancement:**
Add content quality warning when JSON data files or page frontmatter modified:

```bash
# After line 50 (existing protected file detection)

# Detect content file changes
CONTENT_FILES=$(git diff --cached --name-only --diff-filter=ACM | \
  grep -E '(src/data/unstructured/.*\.json|src/pages/.*\.astro|src/apps/.*/manifest\.ts)' || true)

if [ -n "$CONTENT_FILES" ]; then
  echo "⚠️  WARNING: Content files modified:"
  echo "$CONTENT_FILES"
  echo ""
  echo "Before committing, verify you have:"
  echo "  1. ✅ Run 'languaging' skill for register compliance"
  echo "  2. ✅ Run 'checking-crappy-writing' skill for AI artifact detection"
  echo "  3. ✅ Passed ALL items in Section 11 PASS/FAIL Checklist"
  echo ""
  echo "If any check FAILED, fix issues and re-run before committing."
  echo ""
fi
```

**Impact:**
- Developer sees reminder at commit time
- Non-blocking (maintains current git hook philosophy)
- Covers all content file types identified in analysis

**Effort:** Low (bash script modification)

**Status:** 🟡 RECOMMENDED - Needs user approval

---

## **Layer 4: PR Template Checklist (RECOMMENDED)**

**Implementation:** Add to `.github/PULL_REQUEST_TEMPLATE.md`

**Current PR sections:**
- Building Pages Compliance Review (required, validated by `scripts/validate_building_pages_review.js`)
- Other standard PR fields

**Proposed new section:**

```markdown
---

## Writing Quality Review (checking-crappy-writing)

**Required for PRs that modify:**
- `src/data/unstructured/*.json` (content fields: title, summary, disclaimer)
- `src/pages/**/*.astro` (frontmatter: title, description)
- `src/apps/*/manifest.ts` (strings objects)
- Any user-facing text content

### Section 1-9 Artifact Scan

- [ ] PASS - No hallucinated/broken/misaligned citations
- [ ] PASS - No puffery or promotional exaggeration
- [ ] PASS - No vague opinion attribution ("many experts say...")
- [ ] PASS - No templatey discourse markers ("Moreover," "In conclusion," "Ultimately")
- [ ] PASS - No register drift or identity drift (checked against `languaging` register matrix)
- [ ] PASS - No formatting/typography artifacts (bold bullets, title case errors, emoji)
- [ ] PASS - No meta-chatbot voice ("As an AI...", "I can't access...")
- [ ] PASS - No abrupt cutoffs or fragmented sections
- [ ] PASS - No structural repetition or monotonous rhythm

### Tier 1-4 Detection

- [ ] PASS - Tier 1: Lexical & Phrasal Scan (no "renowned," "cutting-edge," "delve," "intricate tapestry")
- [ ] PASS - Tier 2: Syntactic & Structural Patterns (no rule-of-three triads, flat cadence)
- [ ] PASS - Tier 3: Semantic & Content Analysis (specific, nuanced, no generic filler)
- [ ] PASS - Tier 4: Technical & Factual Verification (all citations/links verified)

### Final Verdict

**[PASS / FAIL]** - All content passes writing quality checks

**If FAIL:** Block merge. Fix issues and re-run checks until PASS.

---
```

**Impact:**
- Manual but systematic review
- Analogous to Building Pages review (established pattern)
- Can be validated by extending `validate_building_pages_review.js`

**Effort:** Medium (PR template + validation script extension)

**Status:** 🟡 RECOMMENDED - Needs user approval + implementation

---

## **Layer 5: Build-Time Validation Script (FUTURE)**

**Implementation:** Create `scripts/validate_writing_quality.js`

**Purpose:** Automated scanning of all content files for AI artifacts

**Technical approach:**

### Phase 1: Extract Content
```javascript
// Scan all content sources
const contentSources = [
  'src/data/unstructured/**/*.json',
  'src/pages/**/*.astro',
  'src/apps/**/manifest.ts',
  'src/data/structured/*.ts'
];

// Extract text fields
const extractedContent = {
  'consultingHigherEd.en.json': {
    title: "...",
    summary: "...",
    disclaimer: "..."
  },
  // ... etc
};
```

### Phase 2: Run Detection Rules
```javascript
// Tier 1: Lexical scan
const tier1Flags = detectProblematicVocabulary(content);
// ["renowned" at line 12, "cutting-edge" at line 34]

// Tier 2: Structural patterns
const tier2Flags = detectTemplatePatterns(content);
// ["Rule-of-three triad at line 45"]

// Tier 3: Semantic analysis
const tier3Flags = detectGenericFiller(content);
// ["Vague attribution 'many experts' at line 67"]

// Tier 4: Factual verification
const tier4Flags = verifyCitations(content);
// ["Unverifiable DOI at line 89"]
```

### Phase 3: Report Violations
```javascript
// Exit with error code if violations found
if (violations.length > 0) {
  console.error(`❌ Writing quality check FAILED`);
  console.error(`${violations.length} issues found:`);
  violations.forEach(v => {
    console.error(`  - ${v.file}:${v.line} - ${v.message}`);
  });
  process.exit(1);
}
```

### Integration into Governance Loop
Add to `scripts/governance-loop.sh` as Stage 2.5:

```bash
echo "Stage 2.5: Writing Quality Validation..."
node scripts/validate_writing_quality.js || {
  echo "❌ Writing quality validation FAILED"
  exit 1
}
```

**Impact:**
- Fully automated enforcement
- Blocks build if content has AI artifacts
- Provides file/line context for fixes
- Recursive until all issues resolved (developer must fix and re-run build)

**Effort:** High (requires NLP tooling, regex patterns, citation verification)

**Dependencies:**
- Natural language processing library (e.g., `compromise`, `natural`)
- Readability scoring (Flesch-Kincaid)
- Link checking utilities
- Citation format parsing

**Status:** 🔵 FUTURE - Deferred to Phase 12+

---

## Recursive Application Pattern

**Goal:** Content must pass checks iteratively until clean

**Workflow:**

```
User: "Write homepage hero section"
  ↓
Claude Code assistant invokes `languaging` skill
  ↓
Generates B2-C1 register-compliant draft
  ↓
Claude Code assistant invokes `checking-crappy-writing` skill
  ↓
Scans draft against 10 sections + 4 tiers
  ↓
[FAIL] - Issues found:
  - "Renowned" (Tier 1 promotional vocab)
  - "Moreover" spam (Section 4 templatey discourse)
  - Bold bullet formatting (Section 6)
  ↓
Claude Code assistant fixes issues
  ↓
Re-runs `checking-crappy-writing`
  ↓
[FAIL] - Remaining issue:
  - Generic filler "many institutions" (Tier 3)
  ↓
Claude Code assistant rewrites with specificity
  ↓
Re-runs `checking-crappy-writing`
  ↓
[PASS] - All checks passed ✅
  ↓
Proceeds with templating implementation
```

**Key enforcement points:**
1. **STOP conditions** - Cannot proceed if checks fail
2. **Iterative refinement** - Must fix and re-run until PASS
3. **Multi-layer validation** - Skill chain + pre-commit + PR + build
4. **No bypass** - Every layer reinforces the requirement

---

## Content File Checklist (Per File Type)

### JSON Data Files (`src/data/unstructured/*.json`)

**Before committing changes to `title`, `summary`, or `disclaimer` fields:**

- [ ] Run `languaging` skill - Verify register matches surface (B2-C1 for service content)
- [ ] Run `checking-crappy-writing` - Scan all text fields
- [ ] PASS Section 1 - No hallucinated citations
- [ ] PASS Section 2 - No puffery ("groundbreaking," "historic")
- [ ] PASS Section 3 - No vague attribution ("many experts")
- [ ] PASS Section 4 - No templatey discourse markers
- [ ] PASS Section 5 - No register drift
- [ ] PASS Section 6 - No formatting artifacts (check for emoji, curly quotes)
- [ ] PASS Section 7 - No meta-chatbot voice
- [ ] PASS Section 8 - No truncations
- [ ] PASS Section 9 - Structural variation present
- [ ] PASS Tier 1 - No promotional vocabulary
- [ ] PASS Tier 2 - No flat syntactic patterns
- [ ] PASS Tier 3 - Specific, nuanced content
- [ ] PASS Tier 4 - All facts verified
- [ ] Spanish translation reviewed for register parity

### Astro Page Frontmatter

**Before committing changes to `pageMeta.title` or `pageMeta.description`:**

- [ ] Run `languaging` skill
- [ ] Run `checking-crappy-writing` on title and description fields
- [ ] PASS all Section 1-9 checks
- [ ] PASS all Tier 1-4 checks
- [ ] Verify Spanish mirror (`es/*.astro`) has equivalent quality
- [ ] No SEO keyword stuffing (Tier 3 semantic check)

### React Island Strings

**Before committing changes to `manifest.ts` strings objects:**

- [ ] Run `languaging` skill on all `strings.en.*` fields
- [ ] Run `checking-crappy-writing` on all string values
- [ ] PASS all checks
- [ ] Verify `strings.es.*` register parity with English
- [ ] No chatty UX microcopy violations (Section 7)

### Structured Data

**Before committing changes to `*_en` or `*_es` string fields:**

- [ ] Run `languaging` skill
- [ ] Run `checking-crappy-writing`
- [ ] PASS all checks
- [ ] TypeScript strict mode passes (type safety)
- [ ] Bilingual field pairs complete

---

## Skill Priority Hierarchy (Updated)

**When multiple skills apply, resolve conflicts using this order (highest priority first):**

1. **`SAFETY_RULES.md`** - Deletion prevention, critical safeguards
2. **`making-skill-decisions`** - Mandatory skill discovery + routing
3. **`languaging`** - Register, audience, tone for ALL outward-facing text
4. **`checking-crappy-writing`** - AI artifact detection, credibility enforcement ← **NEWLY INTEGRATED**
5. **`building-pages`** - Accessibility (WCAG 2.2 AA+), localization, structured data anchors
6. **`writing-skills`** - Skill authoring / modification requirements
7. **`prompting-for-claude`** - CLI interaction style (lowest priority)

**Rule:** `checking-crappy-writing` ranks just below `languaging` because it validates the output of register-compliant content generation.

---

## Implementation Roadmap

### Phase 1: Skill Chain Integration (COMPLETED ✅)
**Date:** 2025-10-27
**Status:** ✅ ACTIVE

- [x] Update `templating-pages/SKILL.md` with Content Quality Gate
- [x] Update `languaging/SKILL.md` with execution order
- [x] Document recursive application pattern
- [x] Update skill priority hierarchy

**Impact:** All new page work now has mandatory writing quality checks

---

### Phase 2: Skill Discovery Trigger (RECOMMENDED 🟡)
**Effort:** Low
**Dependencies:** None

**Tasks:**
- [ ] Update `making-skill-decisions/SKILL.md` with writing task detection
- [ ] Add automatic skill routing for content generation requests
- [ ] Test with sample user requests ("Write homepage copy")

**Acceptance criteria:**
- User asks to write website content → `languaging` + `checking-crappy-writing` auto-invoked
- No manual skill selection needed

---

### Phase 3: Pre-Commit Hook (RECOMMENDED 🟡)
**Effort:** Low
**Dependencies:** None

**Tasks:**
- [ ] Extend `scripts/precommit-verify.sh` with content file detection
- [ ] Add non-blocking warning messages
- [ ] Test with modified JSON/Astro files

**Acceptance criteria:**
- Commit to `src/data/unstructured/*.json` → Warning displayed
- Commit to `src/pages/*.astro` → Warning displayed
- Hook remains non-blocking (warning only)

---

### Phase 4: PR Template Checklist (RECOMMENDED 🟡)
**Effort:** Medium
**Dependencies:** Phase 3 (pre-commit warnings establish pattern)

**Tasks:**
- [ ] Add "Writing Quality Review" section to `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] Extend `scripts/validate_building_pages_review.js` to parse new section
- [ ] Add CI check to block merge if FAIL verdict
- [ ] Document checklist usage in `docs/`

**Acceptance criteria:**
- PR modifies content files → Template requires Writing Quality Review section
- FAIL verdict → CI blocks merge
- PASS verdict → Merge allowed

---

### Phase 5: Build-Time Validation (FUTURE 🔵)
**Effort:** High
**Dependencies:** Phases 1-4 (manual enforcement working well)

**Tasks:**
- [ ] Create `scripts/validate_writing_quality.js`
- [ ] Implement Tier 1-4 detection algorithms
- [ ] Integrate into `scripts/governance-loop.sh`
- [ ] Add npm script: `npm run validate:writing`
- [ ] Document automated checks

**Acceptance criteria:**
- `npm run validate:writing` scans all content files
- Reports violations with file:line context
- Exits with 1 if violations found (blocks build)
- `governance-loop.sh` Stage 2.5 runs automatically

---

## Testing Strategy

### Manual Testing (Phases 1-4)

**Test Case 1: Puffery Detection**
```json
// src/data/unstructured/test.en.json
{
  "title": "Our Groundbreaking AI Integrity Platform",
  "summary": "This historic turning point in higher education..."
}
```

**Expected:**
1. User modifies file
2. Pre-commit hook warns about content change
3. User invokes `checking-crappy-writing`
4. Skill reports FAIL - Section 2 (Puffery)
5. User fixes: "Our AI Integrity Platform" / "We help institutions..."
6. Re-runs `checking-crappy-writing`
7. Skill reports PASS ✅

**Test Case 2: Chatbot Meta-Language**
```astro
---
const pageMeta = {
  title: "AI Evaluation Services",
  description: "As an AI, I can help you evaluate your models. I can't access real-time data, but..."
}
---
```

**Expected:**
1. User creates page
2. Invokes `templating-pages` skill
3. Content Quality Gate triggers `checking-crappy-writing`
4. Skill reports FAIL - Section 7 (Meta-Chatbot Voice)
5. User rewrites: "GeoVerity evaluates your AI models and provides actionable insights."
6. Re-runs check
7. PASS ✅

**Test Case 3: Register Drift**
```typescript
// src/apps/example/manifest.ts
strings: {
  en: {
    heading: "Research Integrity Solutions",
    subheading: "The epistemic instability introduced by LLMs demands institutional recalibration of hermeneutic frameworks."
  }
}
```

**Expected:**
1. User edits island strings
2. Invokes `languaging` + `checking-crappy-writing`
3. `languaging` reports FAIL - C1-C2 language on service component (should be B2-C1)
4. `checking-crappy-writing` reports FAIL - Section 5 (Register Drift)
5. User rewrites: "Large language models change how institutions verify student work. We help you update policies to match this reality."
6. Both skills PASS ✅

### Automated Testing (Phase 5)

**Unit Tests for `validate_writing_quality.js`:**

```javascript
// tests/validate_writing_quality.test.js

describe('Tier 1: Lexical Scan', () => {
  it('should flag promotional vocabulary', () => {
    const content = "Our renowned platform offers cutting-edge solutions.";
    const flags = detectTier1(content);
    expect(flags).toContain('renowned');
    expect(flags).toContain('cutting-edge');
  });
});

describe('Section 7: Meta-Chatbot Voice', () => {
  it('should flag AI self-reference', () => {
    const content = "As an AI, I cannot access real-time data.";
    const flags = detectMetaChatbot(content);
    expect(flags).toContain('As an AI');
  });
});
```

**Integration Test:**

```bash
# Modify test fixture with bad content
echo '{"title": "Groundbreaking Solutions"}' > src/data/unstructured/test.en.json

# Run validation
npm run validate:writing

# Expected: Exit code 1, violation reported
# "❌ Writing quality check FAILED"
# "  - src/data/unstructured/test.en.json:1 - Puffery detected: 'Groundbreaking'"
```

---

## Rollout Plan

### Week 1: Skill Chain Activation (COMPLETED)
- [x] Update `templating-pages` and `languaging` skills
- [x] Document integration plan
- [x] Announce to team via Slack/email

### Week 2: Developer Training
- [ ] Create tutorial: "Using checking-crappy-writing Skill"
- [ ] Record demo video showing recursive refinement
- [ ] Update onboarding docs

### Week 3: Pre-Commit Hook Deployment
- [ ] Implement `precommit-verify.sh` extension
- [ ] Test with content file modifications
- [ ] Deploy to all developers

### Week 4: PR Template Rollout
- [ ] Add Writing Quality Review section to template
- [ ] Extend validation script
- [ ] Enable CI enforcement
- [ ] Monitor PRs for compliance

### Month 2-3: Refinement
- [ ] Collect developer feedback
- [ ] Tune detection rules (reduce false positives)
- [ ] Document common fixes

### Month 4+: Build-Time Automation
- [ ] Design `validate_writing_quality.js` architecture
- [ ] Implement Tier 1-2 (lexical + structural)
- [ ] Beta test with non-blocking mode
- [ ] Enable blocking mode in governance loop

---

## Success Metrics

### Qualitative Metrics
- [ ] Zero hallucinated citations reach production
- [ ] Zero chatbot meta-language in public content
- [ ] All service pages maintain B2-C1 register (no academic drift)
- [ ] All Insights posts maintain C1-C2 register (no casual drift)
- [ ] Formatting artifacts eliminated (no bold bullets, emoji, curly quotes in metadata)

### Quantitative Metrics
- **Target:** 100% of content-modifying PRs include Writing Quality Review
- **Target:** <5% false positive rate (content incorrectly flagged)
- **Target:** Zero FAIL verdicts merged to production
- **Measure:** PR rejection rate due to writing quality issues
- **Measure:** Average iterations per content draft (expect 2-3 before PASS)

### Process Metrics
- **Time to PASS:** Track how long recursive refinement takes
- **Common violation types:** Identify patterns for targeted training
- **Developer satisfaction:** Survey on skill usefulness

---

## Known Limitations & Future Work

### Current Limitations

1. **English-only detection**
   `checking-crappy-writing` explicitly states: "Applies only to English and no other language."
   **Impact:** Spanish content relies on manual register parity review
   **Future work:** Extend detection rules to Spanish (Tier 1 vocabulary, discourse markers)

2. **Manual enforcement dependency**
   Phases 1-4 rely on developer discipline to run skills
   **Impact:** Possible to skip checks if rushed
   **Mitigation:** Layer 4 (PR template) provides last-line defense

3. **No automated citation verification**
   Section 1 (Hallucinated Citations) requires manual verification
   **Impact:** Time-consuming to check DOIs, URLs
   **Future work:** Integrate DOI resolution API, link checking utilities

4. **Subjective semantic analysis**
   Tier 3 (Semantic & Content Analysis) is difficult to automate
   **Impact:** Requires human judgment for "informational depth"
   **Future work:** Train ML model on GeoVerity-approved vs. rejected content

### Future Enhancements

**Phase 6: Spanish Language Support**
- Extend Tier 1 vocabulary lists with Spanish promotional terms
- Adapt discourse marker detection ("Por lo tanto," "En resumen")
- Test register parity between EN/ES versions

**Phase 7: Citation Verification API**
- Integrate CrossRef API for DOI validation
- Integrate `broken-link-checker` for URL verification
- Auto-flag 404s and mismatches

**Phase 8: ML-Powered Detection**
- Train classifier on human-labeled examples
- Detect stylometric signatures of AI text
- Improve Tier 3 semantic analysis accuracy

**Phase 9: Real-Time Editor Integration**
- VS Code extension with live linting
- Inline suggestions while editing JSON/Astro files
- Integrate with Astro LSP for `.astro` file support

---

## Appendix A: Skill Execution Flow Diagram

```
User Request: "Write services page copy"
              ↓
┌─────────────────────────────────────┐
│ making-skill-decisions               │
│ → Detects writing task               │
│ → Routes to languaging skill         │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ languaging                           │
│ → Identifies audience: Admins/PMs    │
│ → Selects register: B2-C1            │
│ → Generates draft                    │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ checking-crappy-writing              │
│ → Scans draft (Sections 1-9)        │
│ → Runs Tier 1-4 detection           │
│ → Reports violations                 │
└──────────────┬──────────────────────┘
               ↓
        [PASS or FAIL?]
               ↓
        ┌─────┴─────┐
        │           │
      PASS        FAIL
        │           │
        ↓           ↓
  Proceed    ┌──────────────────┐
  with       │ Fix issues       │
  template   │ Re-run checking  │
             │ Loop until PASS  │
             └──────────────────┘
```

---

## Appendix B: Detection Rule Examples

### Tier 1: Lexical Scan (Promotional Vocabulary)

**Flagged terms:**
- renowned, cutting-edge, groundbreaking, transformative, revolutionary, game-changing
- vibrant, dynamic, robust, seamless, unparalleled, unprecedented
- delve, intricate tapestry, navigating the landscape of, serves as a testament to

**Implementation:**
```javascript
const tier1Blocklist = [
  /\brenowd\b/i,
  /\bcutting-edge\b/i,
  /\bgroundbreaking\b/i,
  // ... etc
];

function detectTier1(text) {
  const flags = [];
  tier1Blocklist.forEach(pattern => {
    if (pattern.test(text)) {
      flags.push(pattern.source);
    }
  });
  return flags;
}
```

### Section 4: Templatey Discourse Markers

**Flagged patterns:**
- "Moreover," "Furthermore," "Additionally," "In addition,"
- "Overall," "In summary," "In conclusion," "Ultimately,"
- "Not only... but also... ultimately..."

**Implementation:**
```javascript
function detectTemplateDiscourse(text) {
  const patterns = [
    /\bMoreover,/g,
    /\bIn conclusion,/g,
    /\bnot only\b.*\bbut also\b.*\bultimately\b/gi
  ];

  const flags = [];
  patterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      flags.push(...matches);
    }
  });
  return flags;
}
```

### Section 7: Meta-Chatbot Voice

**Flagged phrases:**
- "As an AI," "As a language model,"
- "I can't access real-time data"
- "I can't browse the internet"
- "Here is your requested overview"
- "Happy to help!"

**Implementation:**
```javascript
function detectMetaChatbot(text) {
  const metaPhrases = [
    /\bAs an AI\b/i,
    /\bAs a language model\b/i,
    /\bI can't access\b/i,
    /\bHere is your requested\b/i,
    /\bHappy to help\b/i
  ];

  return metaPhrases.filter(pattern => pattern.test(text));
}
```

---

## Appendix C: Example Violation Reports

### Example 1: Puffery + Templatey Discourse

**Input:**
```json
{
  "title": "Groundbreaking AI Integrity Solutions",
  "summary": "Our renowned platform offers cutting-edge tools. Moreover, we provide unparalleled support. Ultimately, this represents a historic turning point in higher education."
}
```

**Output:**
```
❌ Writing Quality Check FAILED
File: src/data/unstructured/example.en.json

Section 2: Puffery / Promotional Exaggeration
  - Line 2: "Groundbreaking" (promotional superlative)
  - Line 3: "renowned" (promotional vocabulary)
  - Line 3: "cutting-edge" (promotional vocabulary)
  - Line 3: "unparalleled" (promotional vocabulary)
  - Line 3: "historic turning point" (grandiose universal-impact framing)

Section 4: Templatey Discourse Markers
  - Line 3: "Moreover," (LLM discourse marker spam)
  - Line 3: "Ultimately," (boilerplate closer)

Tier 1: Lexical Scan
  - "renowned" (promotional)
  - "cutting-edge" (promotional)
  - "unparalleled" (promotional)

VERDICT: FAIL - Fix violations and re-run check
```

**Fixed version:**
```json
{
  "title": "AI Integrity Solutions",
  "summary": "We audit multilingual training data to surface bias before deployment. Faculty receive clear reports showing where models are risky."
}
```

**Re-run output:**
```
✅ Writing Quality Check PASSED
File: src/data/unstructured/example.en.json

All sections: PASS
All tiers: PASS

VERDICT: PASS - Ready to proceed
```

---

## Appendix D: FAQ

**Q: Do I need to run both `languaging` and `checking-crappy-writing` every time?**
A: Yes. `languaging` checks register compliance (audience-appropriate complexity). `checking-crappy-writing` detects AI artifacts. Both are required for production content.

**Q: What if I get false positives (content incorrectly flagged)?**
A: Document the case and raise with content governance team. We'll refine detection rules to reduce false positives.

**Q: Can I skip writing quality checks for internal documentation?**
A: Yes. `checking-crappy-writing` applies ONLY to user-facing content (website, marketing, client deliverables). Internal docs, code comments, and developer notes are exempt.

**Q: What about Spanish content?**
A: Currently, `checking-crappy-writing` is English-only. Spanish content relies on manual review for register parity. Phase 6 (future) will add Spanish detection rules.

**Q: How long does recursive refinement typically take?**
A: Expect 2-3 iterations on average. First draft usually has 3-5 violations. Second pass reduces to 0-2. Third pass typically achieves PASS.

**Q: What happens if I commit content without running checks?**
A: Pre-commit hook (Phase 3) will warn you. PR template (Phase 4) will require manual attestation. Build-time validation (Phase 5) will block deployment.

---

## Document Control

**Version:** 1.0.0
**Created:** 2025-10-27
**Last Updated:** 2025-10-27
**Authors:** GeoVerity Engineering Governance Team
**Reviewers:** Content Governance / Register Enforcement Council

**Change Log:**
- 2025-10-27: Initial document creation
- 2025-10-27: Completed Phase 1 (Skill Chain Integration)

**Related Documents:**
- `.claude/skills/checking-crappy-writing/SKILL.md` - Core skill definition
- `.claude/skills/languaging/SKILL.md` - Register stratification framework
- `.claude/skills/templating-pages/SKILL.md` - Page implementation workflow
- `docs/Language-Register-Plan.md` - PhD-level linguistic specification
- `docs/CONTINUOUS_GOVERNANCE.md` - Governance loop operations
