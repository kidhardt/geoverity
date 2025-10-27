# Languaging Skill - Fortification Report

**Date:** 2025-10-27
**Skill:** languaging
**Location:** `.claude/skills/languaging/SKILL.md`
**Version:** 1.1.0 (Fortified)

---

## Summary of Changes

The languaging skill has been fortified with linguistic theory grounding and explicit enforcement mechanisms based on languaging as social action (Swain; Halliday; Vygotsky).

---

## New Content Added

### 1. "What Languaging Means in This Skill" Section (Lines 20-171)

**Location:** Immediately after Overview, before "When to Use"

**Operational Definition Added:**
> "Languaging is the active process of using language to **do things** — to build meaning with an audience, to frame expertise, to guide decisions, and to position yourself socially. It treats language as **action, not just text**."

**Five Subsections Added:**

#### 1.1. Languaging as Action (Lines 28-57)
- Defines the "job" of each page type
- Provides GOOD/BAD examples for Services vs Insights
- **Enforcement Hook:** "What is this page trying to cause in the reader?"
  - Book a call → Services register (B2-C1)
  - Rethink policy → Insights register (C1-C2)

#### 1.2. Languaging as Meaning-Making (Lines 60-92)
- Services pattern: Problem → What we do → Outcome
- Insights pattern: Interrogate assumptions, use theoretical framing
- **Enforcement Hook:**
  - Frames operational scenario → Service register
  - Problematizes concepts → Insights register

#### 1.3. Languaging as Identity Work (Lines 95-117)
- Services identity: "You are the person responsible..." (operations owner)
- Insights identity: "Our current models assume..." (co-analyst)
- **Enforcement Hook:** "Am I speaking to them as an operations owner, or as a fellow theorist?"

#### 1.4. Languaging as Cognitive Tool (Lines 120-144)
- Services: We do the reasoning for them (finished policy move)
- Insights: We invite them into the reasoning process
- **Enforcement Hook:**
  - Making them think through redesign → Insights (C1-C2)
  - Promising implementable fix → Services (B2-C1)

#### 1.5. Languaging as Multimodal Meaning (Lines 147-170)
- Services: Technical terms immediately grounded in effect
- Insights: Theoretical constructs without immediate operationalization
- **Enforcement Hook:**
  - Define term + tie to outcome → Services
  - Elaborate term + situate in field debate → Insights

---

### 2. Register Swap Test Section (Lines 598-679)

**Location:** After Common Mistakes, before Quality Assurance Checklist

**Two diagnostic checklists added:**

#### 2.1. If Drafting Homepage/Services Content (Lines 602-628)
**STOP and revise if:**
- ❌ Starting with subordinate clauses
- ❌ Using academic terminology without operational grounding
- ❌ Asking reader to rethink policy foundations
- ❌ Performing identity work as "fellow theorist"

**Fix checklist provided:**
- [ ] Rewrite with main clause first
- [ ] Replace academic terms with industry-standard terms
- [ ] Frame as operational problem → solution → outcome
- [ ] Position reader as decision-maker

#### 2.2. If Drafting Insights Post (Lines 631-660)
**STOP and revise if:**
- ❌ Promising operational outcomes directly
- ❌ Avoiding theoretical terms
- ❌ Writing only short main-clause-first sentences
- ❌ Performing identity work as "service provider"

**Fix checklist provided:**
- [ ] Rewrite to argue/theorize/reframe
- [ ] Use disciplinary terminology without operationalization
- [ ] Use complex syntax for complex ideas
- [ ] Position reader as co-analyst

#### 2.3. Swap Test Summary (Lines 663-678)
Copy-paste diagnostic for quick reference:
- Services should answer: "What problem? What do we do? What outcome?"
- Insights should answer: "What assumptions? What evidence? What reframing?"

---

### 3. Enhanced Red Flags Section (Lines 780-811)

**Reorganized into 5 categories:**

#### 3.1. Languaging Violations (Action/Identity)
- Services page does academic languaging
- Insights post does service languaging
- Wrong identity positioning

#### 3.2. Syntactic Violations
- Subordinate-initial clauses on service pages
- Only short simple sentences in Insights posts

#### 3.3. Lexical Violations
- Academic jargon undefined on service pages
- Plain language in Insights posts
- Industry terms avoided in Insights

#### 3.4. Cross-Linguistic Violations
- Spanish translation more formal than English
- Register shift between EN → ES

#### 3.5. Swap Test Failures
- Services content interrogating assumptions (wrong)
- Insights content promising implementation (wrong)

**Added:** "Quick diagnostic: Run the Register Swap Test above before finalizing any content."

---

## File Structure Verification

### Test 1: Frontmatter Structure ✅ PASS
```
---
name: languaging
description: Use when writing or rewriting ANY content...
---

# Languaging: GeoVerity Register Stratification Framework
```

### Test 2: Frontmatter Length ✅ PASS
- 375 characters (< 1024 limit)

### Test 3: Content Format ✅ PASS
```bash
$ grep -n "^[a-z-]*:" .claude/skills/languaging/SKILL.md | head -n 10
2:name: languaging
3:description: Use when writing or rewriting ANY content...
# Only matches in frontmatter - content is Markdown ✅
```

### Test 4: File Size
- 811 lines total
- Comprehensive coverage of register stratification
- All content in Markdown format

---

## Theoretical Grounding

The fortified skill now explicitly grounds register stratification in:

1. **Systemic Functional Linguistics (Halliday):** Language as social semiotic shaped by field, tenor, mode
2. **Languaging Theory (Swain):** Language as cognitive tool for meaning-making
3. **Sociocultural Theory (Vygotsky):** Language as mediation for thinking
4. **Audience Design Theory (Bell):** Register selection based on audience relationship

This transforms register rules from "arbitrary style preferences" to **linguistically-motivated social actions**.

---

## Enforcement Mechanisms

### Before (Original Skill)
- Register specifications by content surface
- Syntactic feature matrix
- Common mistakes section

### After (Fortified Skill)
All of the above, PLUS:

1. **Operational Definition:** What languaging means (not just "register")
2. **5 Enforcement Hooks:** Action, Meaning-Making, Identity, Cognitive Tool, Multimodal
3. **Register Swap Test:** Two diagnostic checklists with fix procedures
4. **Expanded Red Flags:** Categorized by violation type (Action/Identity, Syntactic, Lexical, Cross-Linguistic, Swap Test)
5. **Copy-Paste Diagnostic:** Quick reference for self-checking

---

## Key Additions for AI Pattern Matching

The fortified skill now provides:

### 1. Concrete Examples Tied to Page Types
- Homepage/Services: "We evaluate your AI models across 120+ languages and tell you where they're risky." ✅
- Insights: "While multilingual LLMs expand institutional reach, they also destabilize traditional assumptions..." ✅

### 2. Explicit Violation Patterns
- "The epistemic instability introduced by multilingual generative systems demands institutional recalibration." ❌ (Services page using Insights languaging)

### 3. Diagnostic Questions
- "What is this page trying to cause in the reader?"
- "Am I speaking to them as an operations owner, or as a fellow theorist?"
- "What problem do you have? What do we do? What outcome do you get?" (Services)
- "What assumptions are we interrogating?" (Insights)

### 4. Fix Checklists
Every violation now has a concrete fix procedure with checkboxes.

---

## Impact on Content Generation

### Before Fortification
AI agents knew:
- Register specifications (B2-C1 for Services, C1-C2 for Insights)
- Syntactic rules (subordinate-initial clauses prohibited on Services)
- Common mistakes (5 examples)

**Problem:** Could still drift registers because rules felt arbitrary.

### After Fortification
AI agents now know:
- **WHY** registers differ (different social actions, different identity positioning)
- **WHAT** each languaging act does (builds operational trust vs. invites theoretical debate)
- **HOW** to self-diagnose violations (Register Swap Test with explicit symptoms)
- **WHEN** to stop and revise (Red Flags organized by violation type)

**Solution:** Register drift is now framed as **violating social action**, not just "style preference."

---

## Compliance Statement

The fortified languaging skill maintains compliance with writing-skills guidelines:

1. ✅ YAML frontmatter only (name + description)
2. ✅ Markdown content (headings, lists, tables, examples)
3. ✅ Frontmatter under 1024 characters (375 chars)
4. ✅ No YAML key-value pairs in content body
5. ✅ File structure verified with all 3 commands

---

## Next Steps

The languaging skill is now production-ready with:
- ✅ Linguistic theory grounding
- ✅ 5 enforcement hooks
- ✅ Register Swap Test diagnostics
- ✅ Enhanced Red Flags
- ✅ File structure verified

**No further changes required.** The skill is ready for use in template creation and content generation.

---

**Document Control:**
- Version: 1.1.0 (Fortified)
- Date: 2025-10-27
- Changes: Added languaging theory, enforcement hooks, Register Swap Test, enhanced Red Flags
- Verified By: File structure verification (3 tests passed)
