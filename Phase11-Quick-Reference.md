# Phase 11: Quick Reference Guide

## What Just Happened?

You now have **59 beads** tracking the complete build-out of GeoVerity's page hierarchy. Phase 11 follows your successful Phase 10 completion and sets up the entire content architecture.

---

## Quick Stats

- **Total Beads**: 59
- **Total Pages When Complete**: ~140 (70 English + 70 Spanish)
- **Service Pillars**: 4 (Higher Education Consulting is flagship)
- **Insights Categories**: 5
- **Seed Blog Posts**: 6
- **React Island Placeholders**: 3 (for future phases)

---

## Bead Numbering System

| Range | Section | Priority |
|-------|---------|----------|
| geoverity-2 | Phase 11 Epic | P0 |
| geoverity-100-106 | Global Pages & Infrastructure | P1 |
| geoverity-110-111 | Services Master Hub | P1 |
| geoverity-200-210 | **Higher Education Consulting (FLAGSHIP)** | P0-P1 |
| geoverity-300-310 | AI Data Infrastructure | P1-P2 |
| geoverity-400-410 | Model Evaluation & Trust Scoring | P1-P2 |
| geoverity-500-510 | AI Governance & Compliance | P1-P2 |
| geoverity-600-615 | Insights Hub + Categories + Posts | P0-P2 |
| geoverity-700-702 | React Islands (PLACEHOLDER - future) | P3 |
| geoverity-800-804 | Validation & Verification | P0 |

---

## Essential Commands

### View All Beads
```bash
bd list
```

### View by Priority
```bash
bd list | grep "P0"   # Highest priority (7 beads)
bd list | grep "P1"   # High priority (32 beads)
bd list | grep "P2"   # Medium priority (19 beads)
bd list | grep "P3"   # Low/Future priority (3 beads)
```

### View by Section
```bash
bd list | grep "higher-ed"           # Higher Education Consulting
bd list | grep "insights"            # Insights hub and posts
bd list | grep "spanish"             # All Spanish mirror beads
bd list | grep "validation"          # Validation beads
bd list | grep "future-phase"        # React island placeholders
```

### View Specific Bead Details
```bash
bd info geoverity-200   # Higher Ed pillar details
bd info geoverity-600   # Insights hub details
bd info geoverity-104   # Sitemap script details
```

### Mark Bead as Complete (when you finish work)
```bash
bd resolve geoverity-100
```

---

## Suggested Work Order

### Phase A: Foundation (Do First)
1. **Build Scripts** (geoverity-104, 105)
   - Sitemap and robots.txt generators
2. **Global Infrastructure** (geoverity-100-103, 106)
   - Homepages, contact pages, navigation
3. **Services Hub** (geoverity-110-111)
   - Master services landing page

### Phase B: Flagship Service (Do Second - Highest Business Value)
1. **Higher Education Consulting Pillar** (geoverity-200) - P0
2. **7 Higher Ed Spokes** (geoverity-201-207) - P1
3. **Spanish Mirrors** (geoverity-210) - P1

### Phase C: Supporting Pillars (Do Third)
1. **AI Data Infrastructure** (geoverity-300-310)
2. **Model Evaluation** (geoverity-400-410)
3. **AI Governance** (geoverity-500-510)

### Phase D: Thought Leadership (Do Fourth)
1. **Insights Hub** (geoverity-600) - P0
2. **5 Categories** (geoverity-601-605) - P1
3. **6 Seed Posts** (geoverity-610-615) - P1/P2

### Phase E: Validation (Do Last)
1. **Localization Check** (geoverity-800)
2. **Accessibility Scan** (geoverity-801)
3. **Build Verification** (geoverity-802)
4. **TypeScript Check** (geoverity-803)
5. **Completion Report** (geoverity-804)

---

## What Each Page Needs

Every page you build should have:

### 1. Frontmatter Metadata
```astro
---
import BasePageEn from "@/layouts/BasePageEn.astro";
// or BasePageEs for Spanish

const pageMeta = {
  title: "Page Title",
  description: "SEO description",
  canonical: "/canonical-url/",
  alternateEs: "/es/spanish-url/",  // or alternateEn for Spanish pages
  translationStatus: "complete",     // or "placeholder"
  lastReviewed: "2025-10-26",
  legalSensitivity: false,
  disclaimer: ""
};
---
```

### 2. Short Content
- **Heading** (h1)
- **1-2 paragraphs** of actual content (not lorem ipsum)
- Links to related pages
- CTA button (where appropriate)

### 3. Bilingual Pair
- If you create `/page/`, also create `/es/page/`
- Ensure hreflang links point correctly both ways

---

## Special Cases

### React Island Mount Points

Three pages have comments for future React islands:

1. **/contact/** and **/es/contacto/** (beads 102, 103)
   ```astro
   <!-- React Contact Form island will mount here (geoverity-700) -->
   ```

2. **/higher-education-consulting/research-integrity-tools/** (bead 207)
   ```astro
   <!-- React P-Value Abuse Assessor island will mount here (geoverity-701) -->
   <!-- React Bias/Drift Self-Checker island will mount here (geoverity-702) -->
   ```

### Cross-Linking Requirements

Some spokes MUST link to other pillars:

- **Data Lineage and Provenance** (Evaluation spoke 403) → links to Higher Ed Campus Trust Charter
- **Provenance and Data Lineage** (Governance spoke 503) → links to Higher Ed Campus Trust Charter AND Evaluation Data Lineage

### Insights Posts Must Include

Every Insights post must have:
- Link to at least one service pillar or spoke page
- "Work With Us" CTA → /contact/ or relevant consultation page
- Category assignment
- JSON twin file for AI ingestion (same content, .json extension)

---

## File Locations

### Pages
```
src/pages/                           # All .astro page files
src/pages/es/                        # Spanish mirrors
```

### Scripts
```
scripts/generate_sitemap.js          # Bead 104
scripts/generate_robots.js           # Bead 105
scripts/beads/create_phase11_beads.cjs   # Already created
```

### Generated Files
```
public/sitemap.xml                   # Generated by bead 104 script
public/robots.txt                    # Generated by bead 105 script
```

### Future React Islands (don't build yet - just placeholders)
```
src/apps/ContactForm/                # Bead 700 (future)
src/apps/PValueAssessor/             # Bead 701 (future)
src/apps/BiasChecker/                # Bead 702 (future)
```

---

## Higher Education Consulting - Why It's Flagship

This is your **primary market entry point** and **moral positioning**:

- **Target Audience**: Provosts, deans, grad school administrators, department chairs, accreditation bodies
- **Problem Statement**: AI collapse of traditional authorship threatens academic integrity
- **Solution**: Graduate students as epistemic guardians + authorized departmental LLMs
- **Value Proposition**: Trustworthiness as the new credential currency
- **Business Impact**: Campus-wide Trust Charters, faculty training, curriculum design, research integrity tools

**On every page, Higher Ed should be**:
- First in navigation
- First on Services hub
- Featured on homepage hero
- Linked from Insights posts

---

## Validation Scripts to Run

When pages are built, run these (they already exist from Phases 1-10):

```bash
# Localization
node scripts/validate-localization.js

# Accessibility
node scripts/accessibility_scan.js

# Build
npx astro build

# TypeScript
npx tsc --noEmit
```

All must pass with zero errors before Phase 11 is complete.

---

## When Phase 11 is Done

You'll have:
- ✓ Complete page hierarchy live
- ✓ All 4 service pillars established with Higher Ed as flagship
- ✓ Insights hub with categories and seed posts
- ✓ 100% bilingual parity (English/Spanish)
- ✓ Full sitemap and robots.txt
- ✓ All validation passing
- ✓ Phase11-Verification-Report.txt generated

**Then you're ready for Phase 12**: Content Expansion (turning stubs into full pages)

---

## Getting Help

- **Full Details**: See [Phase11-Bead-Tracking-Summary.md](Phase11-Bead-Tracking-Summary.md)
- **Bead Info**: `bd info geoverity-XXX`
- **Phase 1 Report**: [Phase1-Verification-Report.txt](Phase1-Verification-Report.txt) for infrastructure context

---

**Start with the P0 beads (highest priority) and work your way down!**

*GeoVerity 2026 - Truth at Global Scale*
