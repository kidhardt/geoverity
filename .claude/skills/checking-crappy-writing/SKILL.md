---
name: checking-crappy-writing
description: AUTO-FIX FIRST workflow - Claude Code assistant automatically fixes AI artifacts before user review. Mandatory enforcement for all user-facing content before production release.
version: 1.3.0
updated: 2025-10-27
authority: GeoVerity Content Governance / Register Enforcement Council
---

# checking-crappy-writing Skill v1.3.0
# AUTO-FIX FIRST, USER REVIEW AFTER

## CRITICAL WORKFLOW CHANGE (v1.3.0)

**OLD WORKFLOW (v1.2.0):** Flag violations → User fixes → Review
**NEW WORKFLOW (v1.3.0):** AUTO-FIX violations → Report changes → User reviews fixes

### Why This Change

Every lexical, phrasal, syntactic, and structural AI artifact is a serious credibility risk. Claude Code assistant now:

1. **Automatically fixes** detectable violations
2. **Reports** all changes to user in structured format
3. **Updates provenance** metadata to track AI-generated → AI-generated-fixed
4. **User reviews** FIXES (not violations) and approves/rejects/edits
5. **Provenance enforcement** blocks commits until human review complete

---

## Purpose

This skill is a content hygiene gate targeting AI-generation artifacts that:
- undermine credibility or academic rigor
- introduce legal or compliance risk
- violate `languaging` register rules
- make copy read like a chatbot transcript

Indicators drawn from Wikipedia AI Cleanup guidance. Multiple violations = production block until fixed.

---

## Auto-Fix Strategy

### What Claude Code Assistant Auto-Fixes AUTOMATICALLY

#### Section 2 (Puffery): Replace promotional vocabulary
- "groundbreaking" → "proven" / "established"
- "pioneering" → "early" / "initial"
- "acclaimed" → "recognized" / "noted"
- "seminal" → "influential" / remove
- "transformative" → "significant" / "meaningful"
- "renowned" → "recognized" / "established"
- "celebrated" → "noted" / remove
- "dynamic" → "active" / remove

#### Section 4 (Templatey Discourse): Remove/rewrite patterns
- "Not just X, but Y" → Remove negative parallelism, state Y directly
- "Moreover," / "Furthermore," / "Additionally," → Remove boilerplate transitions or replace with "Also," / specific connectives
- "In conclusion," / "Overall," / "Ultimately," → Remove or replace with direct statement
- "Here's what we'll cover:" → Remove tutorial scaffolding

#### Section 6 (Formatting): Strip artifacts
- Remove emoji entirely (🔥, 🚀, ✅, etc.)
- Convert curly quotes → straight quotes
- Remove bold-colon bullets ("**Data Integrity:** We ensure…") → plain prose
- Fix Title Case → sentence case where appropriate
- **FLAG ONLY** (don't auto-fix): Textbook-perfect punctuation (requires human judgment)

#### Section 7 (Meta-chatbot): Remove AI self-reference
- "As an AI..." → Remove entire sentence
- "I cannot access..." → Remove disclaimer
- "As of my last training cutoff..." → Remove
- "Happy to help!" → Remove chatty assistance language
- "Here is your requested overview..." → Remove meta-talk

#### Section 11 (Anti-detection): Fix awkward synonymy
- "facilitate epistemic evaluation" → "verify claims"
- "institutions necessitate assistance" → "institutions need help"
- "commence utilization" → "start using"
- "systematic validation approaches" → "validation methods"
- "leverage best practices" → "use proven methods"

### What Claude Code Assistant CANNOT Auto-Fix (User Required)

These require human judgment or fact-checking:

- **Section 1 (Citations):** Hallucinated sources require human verification
- **Section 3 (Opinion Attribution):** "Many experts say" needs specific citation or deletion
- **Section 5 (Register Drift):** Requires human judgment of technical level
- **Section 6 (Textbook-perfect punctuation):** Needs human assessment of whether to introduce variation
- **Section 8 (Abrupt Cutoffs):** Incomplete thoughts need content completion
- **Section 9 (Structural Repetition):** Organizational issues need rewrite

---

## Output Format for Auto-Fixes

When auto-fixing, Claude Code assistant MUST report using this format:

```markdown
### Auto-Fix Report: [filename]

**Field:** title_en
**Original:** "Pioneering solutions for groundbreaking research integrity"
**Fixed:** "Solutions for research integrity verification"
**Violations Fixed:**
  - Section 2: Removed "pioneering" (puffery)
  - Section 2: Removed "groundbreaking" (puffery)

**Provenance Updated:**
  - provenance: "ai-generated" → "ai-generated-fixed"
  - autoFixCount: 2
  - lastEdited: 2025-10-27T14:35:00Z
  - lastCheckingCrappyWritingVersion: "1.3.0"

---

**Field:** summary_en
**Original:** "Not just compliance, but transformation through dynamic solutions."
**Fixed:** "Comprehensive compliance verification for research integrity."
**Violations Fixed:**
  - Section 4: Removed negative parallelism ("Not just...but")
  - Section 2: Removed "dynamic" (puffery)
  - Section 11: Replaced semantic evasion with specific language

**Provenance Updated:**
  - provenance: "ai-generated" → "ai-generated-fixed"
  - autoFixCount: 3

---

### Items Requiring Manual Review

**Field:** disclaimer
**Issue:** Section 1 - Possible hallucinated citation (line 42: "According to UNESCO 2023 guidelines...")
**Action Required:** Verify citation exists or remove

**Field:** description_en
**Issue:** Section 6 - Textbook-perfect punctuation detected; assess if natural variation needed
**Action Required:** Review punctuation style for human variation

**CANNOT AUTO-FIX - User must review and approve/reject/edit**
```

---

## Provenance State Machine

```
ai-generated
    ↓ (auto-fix applied)
ai-generated-fixed
    ↓ (user reviews and approves)
human-edited
    ↓ (user verifies accuracy)
human-verified ✓ APPROVED
```

**Enforcement Rule:** Content with `provenance: "ai-generated"` or `"ai-generated-fixed"` CANNOT be committed until user reviews and changes to `"human-edited"`.

---

## Detection Rules (Sections 1-12)

### 1. Hallucinated / Broken / Misaligned Citations

**Definition:** AI fabricates or misuses citations: nonexistent DOIs, mismatched titles, unrelated URLs.

**Red Flags:**
- Hyper-specific citations that fail verification
- URLs that 404 or point to unrelated content
- "Peer-reviewed study" claims backed by blogs
- Invented think tanks or institutes

**Auto-Fix:** CANNOT auto-fix (requires human verification)

**Required Action:**
- Verify every cited claim
- If no verifiable source, reframe as internal data or delete
- BLOCK PUBLISH if source mismatch unresolved

---

### 2. Puffery / Promotional Exaggeration

**Definition:** AI inflates importance without evidence.

**Red Flags:**
- Promotional vocabulary: "pioneering," "groundbreaking," "seminal," "acclaimed," "celebrated," "renowned," "transformative," "dynamic"
- Emphasis phrases: "reflects broader implications," "key turning point," "indelible mark"

**Auto-Fix:** YES - Replace with concrete alternatives
- "groundbreaking" → "proven"
- "pioneering" → "early"
- "acclaimed" → "recognized"

**Example:**
- ❌ "Our groundbreaking multilingual pipeline ensures unparalleled trust."
- ✅ "We audit multilingual training data to surface bias before deployment."

---

### 3. Vague Opinion Attribution

**Definition:** Anonymous authorities ("many experts") used for credibility.

**Red Flags:**
- "Many scholars agree..." without names
- "Some experts warn..." with no citation
- "It is widely believed..." statements

**Auto-Fix:** CANNOT auto-fix (needs specific citation)

**Required Action:**
- Cite named source or rewrite as GeoVerity position
- Delete filler phrases

---

### 4. Templatey Discourse Markers

**Definition:** LLM overuse of rhythmic templates.

**Red Flags:**
- Boilerplate closers: "Overall," "In summary," "Ultimately"
- Chains: "not only... but also... and ultimately..."
- Sequential "Moreover," "Furthermore," "Additionally"
- **Negative parallelism**: "Not just X, but Y" constructions

**Auto-Fix:** YES - Remove boilerplate, rewrite negative parallelism

**Examples:**
- ❌ "Not just compliance, but transformation."
- ✅ "Comprehensive compliance verification."
- ❌ "Moreover, we provide..."
- ✅ "We also provide..." / remove transition

---

### 5. Register Drift and Identity Drift

**Definition:** Slips between registers mid-document.

**Red Flags:**
- Service page lapsing into scholarly jargon
- Insights article dropping into sales copy
- Sudden register shift (B2 business → C2 theory)

**Auto-Fix:** CANNOT auto-fix (requires human judgment)

**Required Action:**
- Check against `languaging` register matrix
- Remove letter-writing formulas
- BLOCK PUBLISH if register breaks

---

### 6. Formatting / Typography Artifacts

**Definition:** AI output carries noncompliant formatting.

**Red Flags:**
- Bold-colon bullets: "**Data Integrity:** We ensure..."
- Title Case where sentence case expected
- "Here's what we'll cover:" scaffolding
- Curly quotes where straight quotes required
- Emojis (🔥, 🚀, ✅)
- **Textbook-perfect punctuation**: Mechanically perfect but unnaturally consistent

**Auto-Fix:** YES (except textbook-perfect punctuation)
- Strip emojis
- Convert curly → straight quotes
- Remove bold-colon bullets
- Fix Title Case → sentence case
- FLAG ONLY: Textbook-perfect punctuation (user reviews)

---

### 7. Meta-Chatbot Voice

**Definition:** Assistant meta-talk signals AI authorship.

**Red Flags:**
- "As an AI..."
- "I can't access real-time data..."
- "Here is your requested overview..."
- "Happy to help!"

**Auto-Fix:** YES - Delete entirely

---

### 8. Abrupt Cutoffs / Fragmented Sections

**Definition:** LLM drafts stop mid-thought.

**Red Flags:**
- Lists ending at "3." with no preceding items
- Paragraphs ending mid-sentence
- Promised sections missing

**Auto-Fix:** CANNOT auto-fix (requires content completion)

**Required Action:** BLOCK PUBLISH if truncated

---

### 9. Structural Repetition

**Definition:** Monotonous rhythm, uniform paragraph length.

**Red Flags:**
- Identical paragraph structure throughout
- Every paragraph opening with same connective
- Dense nominalization chains

**Auto-Fix:** CANNOT auto-fix (requires organizational rewrite)

**Required Action:**
- Introduce rhythm variation
- Replace nominalizations with verbs

---

### 10. Text Detection Tiers

Apply Tiers 1-4 in addition to Sections 1-9.

#### Tier 1: Lexical & Phrasal Scan (AUTO-FIX)
- Promotional vocab: "renowned," "cutting-edge," "transformative"
- AI verbiage: "delve," "intricate tapestry," "navigating the landscape"
- Didactic throat-clearing: "It is important to note"

#### Tier 2: Syntactic & Structural (MIXED)
- Rule-of-three triads (auto-fix)
- Negative parallelism (auto-fix)
- Textbook-perfect punctuation (FLAG ONLY)
- Flat cadence (FLAG ONLY)

#### Tier 3: Semantic & Content (FLAG ONLY)
- Generic filler content
- Lack of nuance
- False ranges

#### Tier 4: Technical & Factual (CANNOT AUTO-FIX)
- Validate DOIs, ISBNs
- Test external links
- Confirm entities exist

---

### 11. Anti-Detection Evasion Artifacts

#### 11.1. Awkward Synonymy (AUTO-FIX)
- ❌ "facilitate epistemic evaluation" → ✅ "verify claims"
- ❌ "institutions necessitate assistance" → ✅ "institutions need help"

#### 11.2. Semantic Evasion (FLAG ONLY)
- ❌ "The compliance framework integrates verification while ensuring systematic validation approaches..."
- Requires human rewrite with specific claims

#### 11.3. Structural Inconsistencies (FLAG ONLY)
- Choppy fragmentation or run-on merges
- Requires human rhythm assessment

#### 11.4. Character-Level Perturbations (AUTO-FIX)
- Strip homoglyphs, zero-width spaces, lookalikes
- BLOCK PUBLISH if detected

---

## 12. PASS / FAIL Checklist for Release

Content may ship only if ALL are true:

- [ ] No hallucinated citations (verified or removed)
- [ ] No puffery vocabulary (auto-fixed or approved)
- [ ] No vague attribution (cited or removed)
- [ ] No boilerplate closers (auto-fixed)
- [ ] No negative parallelism (auto-fixed)
- [ ] Register matches surface per `languaging`
- [ ] No chatbot meta-language (auto-fixed)
- [ ] No formatting artifacts (auto-fixed)
- [ ] No textbook-perfect punctuation (user reviewed)
- [ ] No truncations (user completed)
- [ ] Cadence shows variation (user reviewed)
- [ ] Passed Tier 1-4 detection
- [ ] No anti-detection artifacts (auto-fixed or user reviewed)
- [ ] **Provenance updated to "human-edited" or "human-verified"**
- [ ] **_meta.contentStatus set to "approved"**

If any item fails → STOP. COMPLETE FIX. DO NOT PUBLISH.

---

## Integration with Other Skills

**Execution Order (v1.3.0 AUTO-FIX workflow):**

1. `languaging` → Generate register-compliant content
2. `checking-crappy-writing` → AUTO-FIX violations (this skill)
3. Claude Code assistant reports fixes to user (structured format above)
4. User reviews auto-fixes (accepts/rejects/edits)
5. User updates provenance to "human-edited"
6. User sets _meta.contentStatus to "approved"
7. Iterate until PASS

**IMPORTANT:** Content generated by `languaging` will be automatically scanned and fixed by this skill. User reviews FIXES, not violations.

---

## Scope

- **Languages:** English only. Spanish out of scope.
- **Surfaces:** Homepage, Services, Insights, Contact, PDFs, email templates, React island strings, Astro frontmatter
- **Enforcement:** Pre-commit hooks, PR validation, build-time governance

---

## Version History

### v1.3.0 (2025-10-27)
- **BREAKING CHANGE:** Auto-fix-first workflow
- Added provenance tracking integration
- Added structured auto-fix report format
- Defined auto-fixable vs. user-required violations
- Added provenance state machine
- Enforcement via data_governance_scan.js

### v1.2.0 (2025-10-27)
- Added negative parallelism detection
- Added textbook-perfect punctuation detection
- Added anti-detection evasion artifacts (Section 11)
- Expanded puffery vocabulary list

### v1.1.0 (prior)
- Initial integration with `languaging` skill
- Added Tier 1-4 detection framework
