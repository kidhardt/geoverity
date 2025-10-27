# overriding-content Skill v1.0.0

## Purpose

Provides temporary content simplification overrides for non-journal pages. This skill applies reading level adjustments and grammatical constraints to make content more accessible.

**CRITICAL: This skill is ONLY invoked by explicit user request. Never use proactively.**

---

## When to Use

**ONLY use this skill when:**
- ✅ User explicitly requests "override content" or "apply reading level override"
- ✅ User asks to simplify content to specific grade level
- ✅ User requests grammatical constraints (e.g., limit -ing words)

**NEVER use this skill:**
- ❌ Proactively without user request
- ❌ During normal content generation workflows
- ❌ As part of languaging/checking-crappy-writing workflows
- ❌ When user asks to create new pages

---

## Override Specifications

### Target Reading Level
**Default:** 8th grade (Flesch-Kincaid Grade Level 8.0)
- Sentence length: 12-18 words average
- Vocabulary: Common 2000-word vocabulary
- Syntax: Simple and compound sentences (minimal subordination)

### Grammatical Constraints
**Default:** Maximum 1 -ing word per paragraph
- Includes: gerunds, present participles, progressive verb forms
- Applies to: Body content only (not navigation, labels, or metadata)

### Scope
**Pages affected:**
- ✅ Homepage (/, /es/)
- ✅ Services pages (/higher-education-consulting/, etc.)
- ✅ Insights Hub (/insights/, /es/perspectivas/)
- ❌ Insights Posts (journal articles - C1-C2 register preserved)
- ❌ Navigation, headers, footers
- ❌ Forms, labels, accessibility strings

---

## Implementation Approach

### Option A: Build-Time Transform Script (RECOMMENDED)

**File:** `scripts/apply_reading_level_override.js`

**How it works:**
1. Runs AFTER `npm run build` completes
2. Reads `dist/**/*.html` files (excluding Insights Posts)
3. Extracts text content from specific sections:
   - `.hero`, `.content-section`, `.offering` classes
   - `<p>`, `<h1>`, `<h2>`, `<h3>` tags within content areas
4. Applies transformations:
   - Simplifies vocabulary (replace complex words with common synonyms)
   - Shortens sentences (split at conjunctions, limit to 18 words)
   - Removes -ing words exceeding 1 per paragraph
5. Writes transformed HTML back to `dist/`
6. Logs all changes to `OVERRIDE_CHANGES.md`

**Pros:**
- Original i18n catalogs remain unchanged
- Reversible by rebuilding without script
- No git commits to revert
- Easy to toggle on/off

**Cons:**
- Only affects built HTML (not visible in source)
- Must re-run after every build

**Usage:**
```bash
npm run build && node scripts/apply_reading_level_override.js
```

**Removal:**
```bash
npm run build  # Build without running override script
```

---

### Option B: i18n Catalog Modification with Git Branch

**How it works:**
1. Create override branch: `git checkout -b content-override`
2. Modify `src/i18n/locales/en.json` and `es.json` directly
3. Apply same transformations as Option A to JSON strings
4. Commit changes to override branch
5. Merge to master when ready, or discard branch to revert

**Pros:**
- Changes visible in source code
- Works in dev mode (`npm run dev`)
- Can preview before building

**Cons:**
- Requires git branch management
- Creates commits that may need reverting
- Modifies source content (not just output)

**Usage:**
```bash
git checkout -b content-override
# Modify i18n catalogs
git add src/i18n/locales/*.json
git commit -m "temp: Apply reading level override"
npm run dev  # Preview changes
```

**Removal:**
```bash
git checkout master
git branch -D content-override  # Delete override branch
```

---

### Option C: Runtime i18n Overlay

**File:** `src/i18n/overrides.ts`

**How it works:**
1. Create wrapper around `t()` function
2. Intercept all translation calls
3. Apply transformations on-the-fly during page generation
4. Toggle via environment variable: `APPLY_READING_OVERRIDE=true`

**Pros:**
- No content modification (source or dist)
- Easy toggle via env var
- Works in dev and build modes

**Cons:**
- Adds complexity to i18n system
- Slower builds (transforms run every time)
- Less transparent (changes happen in memory)

**Usage:**
```bash
APPLY_READING_OVERRIDE=true npm run build
APPLY_READING_OVERRIDE=true npm run dev
```

**Removal:**
```bash
npm run build  # Build without env var
```

---

## Transformation Rules

### 1. Vocabulary Simplification

**Replace complex words with 8th grade equivalents:**

| Complex Word | Simplified |
|--------------|------------|
| facilitate | help |
| utilize | use |
| endeavor | try |
| commence | start |
| terminate | end |
| demonstrate | show |
| implement | use / apply |
| framework | system / plan |
| methodology | method |
| substantial | large / major |
| comprehensive | complete / full |
| integrity | honesty / trust |
| accreditation | approval / certification |
| epistemic | knowledge-based |
| governance | management / rules |

**Preserve industry-standard terms when unavoidable:**
- AI, LLM (define on first use)
- Academic integrity (define)
- Accreditation (simplify definition)

---

### 2. Sentence Simplification

**Target:** 12-18 words per sentence (8th grade level)

**Techniques:**
- Split compound/complex sentences at conjunctions
- Remove subordinate clauses or convert to separate sentences
- Reduce embedding depth from 2-3 to 0-1

**Examples:**

❌ **Before (B2-C1, 25 words):**
> "We partner with universities to build academic integrity frameworks for AI environments, ensuring faculty can assess student work when AI tools are involved."

✅ **After (8th grade, 13 + 11 words):**
> "We partner with universities to build academic integrity systems for AI use. Faculty learn to assess student work when AI tools are used."

---

❌ **Before (B2-C1, 22 words):**
> "Our consulting engagements combine policy development, faculty training, and implementation support to meet your institutional context and accreditation requirements."

✅ **After (8th grade, 14 + 10 words):**
> "Our consulting combines policy writing, faculty training, and hands-on support. We meet your school's needs and certification requirements."

---

### 3. -ing Word Constraint

**Rule:** Maximum 1 -ing word per paragraph

**Counted as -ing words:**
- Gerunds: "Training faculty is critical"
- Present participles: "We are building frameworks"
- Adjectives: "challenging environment"
- Nouns: "Our training includes..."

**Not counted:**
- Fixed phrases: "during," "according," "regarding"
- Navigation labels: "Building Pages skill"
- Proper nouns: "Learning Management System"

**Replacement strategies:**

❌ **Violates (3 -ing words in one paragraph):**
> "We are building academic integrity frameworks. Our training helps faculty assess student work. This is challenging in AI environments."

✅ **Compliant (1 -ing word):**
> "We build academic integrity frameworks. Our training helps faculty assess student work. This is tough in AI environments."

---

## Conflict Resolution

### Override vs. languaging Skill

**languaging requires:**
- Homepage: B1-B2
- Services: B2-C1
- Insights Hub: B2-C1
- Insights Posts: C1-C2

**Override changes:**
- Homepage: B1-B2 → 8th grade (~B1)
- Services: B2-C1 → 8th grade (~B1)
- Insights Hub: B2-C1 → 8th grade (~B1)
- Insights Posts: **No change** (C1-C2 preserved)

**Resolution:**
When override is active, it **temporarily suspends** languaging register requirements for affected pages. Original register-compliant content is preserved in source.

---

### Override vs. checking-crappy-writing Skill

**checking-crappy-writing Section 9 flags:**
- Monotonous rhythm
- Uniform paragraph length
- Every paragraph opening with same connective

**Override -ing constraint risk:**
Artificially limiting to exactly 1 -ing word per paragraph could create mechanical patterns.

**Resolution:**
- Allow 0-1 -ing words per paragraph (not exactly 1)
- Vary sentence structure to avoid monotony
- Preserve natural rhythm while meeting constraint

If checking-crappy-writing flags structural repetition, adjust override to allow more variation.

---

## Validation After Override

After applying override, run:

```bash
# 1. Verify reading level
node scripts/check_reading_level.js

# 2. Check -ing word count
node scripts/count_ing_words.js

# 3. Validate still passes accessibility
node scripts/accessibility_scan.js

# 4. Verify build succeeds
npm run build
```

Expected results:
- Flesch-Kincaid Grade Level: 7.5-8.5
- -ing words per paragraph: ≤1
- Accessibility: PASS
- Build: SUCCESS

---

## Reverting Override

### If using Option A (Build-Time Script):
```bash
npm run build  # Rebuild without running override script
```

### If using Option B (Git Branch):
```bash
git checkout master
git branch -D content-override
npm run build
```

### If using Option C (Runtime Overlay):
```bash
npm run build  # Build without APPLY_READING_OVERRIDE env var
```

No source content changes = instant revert.

---

## Example Override Session

```bash
# User requests override
user> "apply reading level override to all service pages"

# Claude invokes this skill
assistant> I'm invoking the overriding-content skill to apply 8th grade reading level override.

# Claude asks for confirmation
assistant> This will:
- Lower services from B2-C1 to 8th grade
- Limit -ing words to 1 per paragraph
- Use Option A (build-time script, reversible)

Proceed? (yes/no)

# User confirms
user> "yes"

# Claude creates script
assistant> Creating scripts/apply_reading_level_override.js...

# Claude runs build + override
assistant> Running: npm run build && node scripts/apply_reading_level_override.js

# Claude reports results
assistant> Override applied:
- 45 sentences simplified
- 23 -ing words removed
- Reading level: 8.2 (target: 8.0)
- Changes logged to OVERRIDE_CHANGES.md

To revert: npm run build (without override script)
```

---

## Important Warnings

### ⚠️ This Override is Temporary

**Do NOT commit override changes to production unless:**
1. User explicitly approves permanent change
2. You update languaging skill to reflect new register requirements
3. You re-validate with checking-crappy-writing
4. You document why B2-C1 register was abandoned for services

### ⚠️ Audience Mismatch Risk

Lowering service pages from B2-C1 to 8th grade may:
- Signal less expertise to administrator/PM audiences
- Reduce professional credibility
- Over-simplify for decision-makers who expect professional register

User accepts this trade-off by requesting override.

### ⚠️ Bilingual Parity

If applying override:
- Apply to BOTH English and Spanish content
- Maintain register parity across languages
- Spanish 8th grade ≠ English 8th grade (cultural adjustment needed)

---

## Logging and Transparency

**OVERRIDE_CHANGES.md format:**

```markdown
# Reading Level Override Changes

**Applied:** 2025-10-27T13:45:00Z
**Target:** 8th grade (Flesch-Kincaid 8.0)
**Constraint:** ≤1 -ing word per paragraph
**Scope:** Homepage, Services, Insights Hub (EN/ES)

## Changes by Page

### /higher-education-consulting/

**Section: Hero Subheading**
- **Before (B2-C1, 22 words):** "We help universities maintain academic integrity in the AI era. Build policies that work without starting an arms race around detection."
- **After (8th grade, 19 words):** "We help universities keep academic honesty in the AI era. Build policies that work without starting an arms race."
- **Changes:** "maintain" → "keep", "integrity" → "honesty", removed "around detection" (redundant)

**Section: Problem Paragraph 1**
- **Before (B2-C1, 4 -ing words):** "Graduate programs face declining trust in student work. Faculty cannot tell which submissions involve AI authorship. Detection tools generate false accusations. Administrators worry about accreditation standards while students demand access to AI tools."
- **After (8th grade, 1 -ing word):** "Graduate programs face less trust in student work. Faculty cannot tell which submissions use AI. Detection tools create false claims. Administrators worry about accreditation standards while students demand access to AI tools."
- **Changes:** "declining" → "less", "generate" → "create", removed 3 -ing words

[... continue for all pages ...]
```

---

## Testing the Override

### Test Case 1: Reading Level Measurement

**Input:** Original B2-C1 service page content
**Expected Output:** Flesch-Kincaid Grade Level 7.5-8.5

**Validation:**
```bash
node scripts/check_reading_level.js dist/higher-education-consulting/index.html
# Expected: Grade Level: 8.1 ✅
```

---

### Test Case 2: -ing Word Count

**Input:** Paragraph with 4 -ing words
**Expected Output:** Paragraph with ≤1 -ing word

**Example:**
```
Before: "We are building frameworks for assessing student work in challenging environments requiring new training."
-ing count: 4 (building, assessing, challenging, requiring, training)

After: "We build frameworks to assess student work in tough environments that need new training."
-ing count: 1 (training)
```

---

### Test Case 3: Coherence Preservation

**Input:** Multiple short choppy sentences
**Expected Output:** Coherent flow with appropriate connectives

**Example:**
```
❌ Bad override: "We help universities. We build systems. You get support."
✅ Good override: "We help universities build honesty systems. You get support through training and policy work."
```

---

## Version History

### v1.0.0 (2025-10-27)
- Initial skill creation
- User-invoked only (never proactive)
- Supports 8th grade reading level override
- Supports -ing word constraint (≤1 per paragraph)
- Three implementation options (build-time, git branch, runtime overlay)
- Reversible overrides (no permanent source changes)

---

## Integration with Other Skills

**Execution context:**

1. User creates pages with `languaging` + `checking-crappy-writing` → B2-C1 service register ✅
2. User requests override → Claude invokes `overriding-content` skill
3. Override applied → Content simplified to 8th grade
4. User reviews → Accepts or reverts
5. If reverting → Rebuild without override script

**Override does NOT replace languaging/checking-crappy-writing.**
It is a **post-processing step** applied after normal content validation.

---

## Scope Limitations

**This skill does NOT:**
- ❌ Apply to Insights Posts (C1-C2 register preserved for scholarly audience)
- ❌ Modify navigation, headers, footers, labels
- ❌ Change accessibility strings (ARIA labels, skip links, etc.)
- ❌ Run automatically (user must explicitly invoke)
- ❌ Commit changes to git (unless user explicitly requests)

**This skill ONLY:**
- ✅ Simplifies body content to 8th grade when user requests
- ✅ Enforces -ing word constraint when user requests
- ✅ Provides reversible, transparent overrides
- ✅ Logs all changes for user review

---

## User Invocation Examples

**Valid requests:**
- "Apply reading level override to all service pages"
- "Simplify Higher Ed consulting page to 8th grade"
- "Limit -ing words to 1 per paragraph across homepage and services"
- "Use the overriding-content skill to make everything more accessible"

**Invalid requests (do NOT invoke this skill):**
- "Create a new service page" → Use `templating-pages` skill
- "Fix this typo" → Use Edit tool directly
- "Make this sound better" → Use `checking-crappy-writing` skill
- "Translate to Spanish" → Use languaging skill with i18n

---

## Final Checklist Before Applying Override

- [ ] User explicitly requested override (never proactive)
- [ ] Confirmed target reading level (default: 8th grade)
- [ ] Confirmed -ing word constraint (default: ≤1 per paragraph)
- [ ] Selected implementation option (default: Option A - build-time script)
- [ ] Explained reversibility (rebuild without script)
- [ ] Warned about audience mismatch risk (B2-C1 → 8th grade)
- [ ] Confirmed scope (Homepage, Services, Insights Hub; NOT Posts)
- [ ] Ready to log changes to OVERRIDE_CHANGES.md

If all checkboxes ✅, proceed with override implementation.

---

**REMINDER: This skill is ONLY invoked by explicit user request. Never use proactively.**
