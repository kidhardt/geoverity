# Phase 11: Page Hierarchy & Content Architecture
## Bead Tracking Summary

**Generated:** 2025-10-26
**Phase Status:** Planning Complete - Ready for Implementation
**Total Beads Created:** 59

---

## Overview

Phase 11 follows the successful completion of Phase 10 (continuous governance loop). This phase establishes the complete page hierarchy for GeoVerity's public-facing website, positioning **Higher Education Consulting as the flagship service** while building comprehensive infrastructure across all four service pillars.

### Phase Progression Context

- **Phases 1-10**: Foundation (governance, localization, CI/CD, compliance, production cut)
- **Phase 11** (current): Page Hierarchy & Content Architecture Build
- **Phase 12+** (future): Content expansion, React islands activation, advanced tooling

---

## Content Strategy

All pages follow these principles:

1. **Bilingual-First**: Every English page has a Spanish mirror with proper hreflang
2. **Metadata Complete**: translationStatus, lastReviewed, legalSensitivity fields
3. **Mobile-First**: Single-column baseline, proper tap targets, accessibility compliant
4. **SEO Optimized**: Proper heading hierarchy, internal linking, sitemap inclusion
5. **Stub Content**: Headings + short paragraph (or "Content under editorial review")
6. **Cross-Linking**: Strategic links between pillars and spokes for topical authority

---

## Bead Breakdown by Section

### 11.0: Global Pages & Infrastructure (7 beads)

**geoverity-100 to geoverity-106**

- English & Spanish homepages with mission positioning
- Contact pages with React island mount placeholders
- Sitemap.xml generation script
- Robots.txt generation script
- Global navigation component update

**Key Feature**: Higher Education Consulting prominently featured on homepage hero

---

### 11.1: Services Master Hub (2 beads)

**geoverity-110, geoverity-111**

- Master services landing page positioning all 4 pillars
- Higher Education Consulting in **FIRST position** (flagship)
- Spanish mirror

**Purpose**: Establish service hierarchy for SEO and user navigation

---

### 11.2: Higher Education Consulting Pillar - FLAGSHIP (9 beads)

**geoverity-200 to geoverity-210**

**Pillar Page** (geoverity-200, P0 priority):
- AI collapse of traditional authorship problem statement
- Graduate students as epistemic integrity guardians
- Trustworthiness > skills positioning
- Links to all 7 spokes

**7 Spoke Pages** (geoverity-201 to geoverity-207):
1. Graduate Students Epistemic Integrity
2. Authorized Departmental LLMs (secure, auditable, FERPA/GDPR)
3. Faculty AI Literacy (ethics, training, certification)
4. Campus Trust Charter (provost-level governance alignment)
5. Trust as Currency (credential value for presidents/boards)
6. AI Ethics Curriculum (graduate-level modules)
7. Research Integrity Tools (React island mount point)

**Spanish Mirrors** (geoverity-210):
- All 8 pages under /es/consultoria-academica/

**Strategic Position**: This pillar is the moral and reputational center of GeoVerity, positioned to appeal to provosts, deans, grad school administrators, and accreditation bodies.

---

### 11.3: AI Data Infrastructure Pillar (6 beads)

**geoverity-300 to geoverity-310**

**Pillar**: /multilingual-ai-training-data/

**4 Spokes**:
1. Legal Translation Corpora
2. Speech Audio Dataset Dialects
3. Multilingual Image/Video Annotation
4. How We Source 120 Languages

**Spanish Mirrors**: /es/datos-multilingues-para-ia/

**Audience**: Enterprise ML teams, research institutions, legal/medical data buyers

---

### 11.4: Model Evaluation & Trust Scoring Pillar (6 beads)

**geoverity-400 to geoverity-410**

**Pillar**: /trustworthy-ai-evaluation-compliance/

**4 Spokes**:
1. AI Model Bias Audit Framework
2. Continuous Evaluation Dashboard
3. Data Lineage and Provenance (cross-linked to Higher Ed)
4. GDPR and AI Compliance Datasets

**Spanish Mirrors**: /es/evaluacion-confiable-de-ia/

**Key Feature**: Introduces GeoVerity Trust Index™
**Cross-Link**: Links back to Higher Ed accreditation use case

---

### 11.5: AI Governance & Compliance Pillar (6 beads)

**geoverity-500 to geoverity-510**

**Pillar**: /ai-governance-frameworks/

**4 Spokes**:
1. AI Policy and Disclosure
2. TrustScore and Audit Readiness
3. Provenance and Data Lineage (cross-linked to Higher Ed and Evaluation)
4. Regulatory Alignment (NIST, EU AI Act)

**Spanish Mirrors**: /es/gobernanza-de-ia/

**Audience**: Legal counsel, compliance officers, provost-level administrators, enterprises

**Cross-Links**: Connects to Higher Ed Campus Trust Charter and Evaluation provenance spoke

---

### 11.6: Insights Hub & Categories (12 beads)

**geoverity-600 to geoverity-615**

**Insights Hub** (geoverity-600, P0 priority):
- Thought leadership landing page
- Editorial product aligned to service pillars
- SEO engine driving to service pages

**5 Categories** (geoverity-601 to geoverity-605):
1. **Academic Integrity** → Higher Education Consulting
2. **AI Governance** → AI Governance & Compliance
3. **Multilingual Data** → AI Data Infrastructure
4. **Trust and Evaluation** → Model Evaluation & Trust Scoring
5. **Research Integrity** → Research Integrity Tools

**6 Seed Posts** (geoverity-610 to geoverity-615):
1. Why Trust is the New Academic Currency (academic-integrity)
2. Authorized LLMs in Graduate Education (academic-integrity)
3. Building Multilingual AI Without Bias (multilingual-data)
4. The Case for Continuous AI Model Evaluation (trust-and-evaluation)
5. AI Governance Frameworks for Universities (ai-governance)
6. P-Value Abuse and Research Integrity (research-integrity)

**Each Post Includes**:
- English + Spanish versions
- 1 paragraph of content
- Link to relevant service pillar/spoke
- CTA to /contact/ consultation
- Metadata: lastReviewed, translationStatus, hreflang
- JSON twin for AI/Q&A ingestion

---

### 11.7: React Islands Placeholders (3 beads)

**geoverity-700 to geoverity-702 (P3 priority, future-phase label)**

1. **Contact Form island** (mounts in /contact/ and /es/contacto/)
2. **P-Value Abuse Assessor** (mounts in research-integrity-tools)
3. **Bias/Drift Self-Checker** (mounts in research-integrity-tools)

**Purpose**: Placeholder tracking only - actual implementation in later phase
**Note**: Mount points already prepared in page beads 102, 103, and 207

---

### 11.8: Cross-Cutting Validation (5 beads)

**geoverity-800 to geoverity-804 (P0 priority)**

These beads ensure Phase 11 completion integrity:

1. **Localization Validator** (800): English/Spanish parity, hreflang bidirectional
2. **Accessibility Scan** (801): Mobile-first, headings, lang attributes, tap targets
3. **Astro Build Verification** (802): All routes build, sitemap/robots.txt present
4. **TypeScript Strict Mode** (803): No type errors
5. **Phase 11 Verification Report** (804): Completion documentation

---

## Dependency Flow

```
geoverity-2 (Phase 11 Epic)
  ├─> Global Infrastructure (100-106)
  ├─> Services Hub (110-111)
  ├─> Higher Education Pillar (200)
  │     └─> 7 Spokes (201-207)
  │           └─> Spanish Mirrors (210)
  ├─> Data Infrastructure Pillar (300)
  │     └─> 4 Spokes (301-304)
  │           └─> Spanish Mirrors (310)
  ├─> Evaluation Pillar (400)
  │     └─> 4 Spokes (401-404)
  │           └─> Spanish Mirrors (410)
  ├─> Governance Pillar (500)
  │     └─> 4 Spokes (501-504)
  │           └─> Spanish Mirrors (510)
  ├─> Insights Hub (600)
  │     ├─> 5 Categories (601-605)
  │     └─> 6 Seed Posts (610-615)
  ├─> React Island Placeholders (700-702)
  └─> Validation (800-804)
```

---

## Priority Distribution

- **P0 (Highest)**: 5 beads
  - Higher Ed pillar (200)
  - Insights hub (600)
  - All validation beads (800-804)

- **P1 (High)**: 32 beads
  - All global infrastructure
  - Services hub
  - Higher Ed spokes + Spanish mirrors
  - All pillar pages (except Higher Ed which is P0)
  - Insights categories and priority posts

- **P2 (Medium)**: 19 beads
  - All spoke pages under Data, Evaluation, Governance pillars
  - Spanish mirrors for those spokes
  - Lower-priority Insights posts

- **P3 (Low)**: 3 beads
  - React island placeholders (future phase)

---

## File Structure Created

When completed, Phase 11 will produce:

```
src/pages/
├── index.astro                                        [100]
├── contact.astro                                      [102]
├── es/
│   ├── index.astro                                    [101]
│   └── contacto.astro                                 [103]
├── services/
│   └── index.astro                                    [110]
├── es/servicios/
│   └── index.astro                                    [111]
├── higher-education-consulting/
│   ├── index.astro                                    [200]
│   ├── graduate-students-epistemic-integrity/         [201]
│   ├── authorized-departmental-llms/                  [202]
│   ├── faculty-ai-literacy/                           [203]
│   ├── campus-trust-charter/                          [204]
│   ├── trust-as-currency/                             [205]
│   ├── ai-ethics-curriculum/                          [206]
│   └── research-integrity-tools/                      [207]
├── es/consultoria-academica/
│   └── [8 Spanish mirrors]                            [210]
├── multilingual-ai-training-data/
│   ├── index.astro                                    [300]
│   └── [4 spokes]                                     [301-304]
├── es/datos-multilingues-para-ia/
│   └── [5 Spanish mirrors]                            [310]
├── trustworthy-ai-evaluation-compliance/
│   ├── index.astro                                    [400]
│   └── [4 spokes]                                     [401-404]
├── es/evaluacion-confiable-de-ia/
│   └── [5 Spanish mirrors]                            [410]
├── ai-governance-frameworks/
│   ├── index.astro                                    [500]
│   └── [4 spokes]                                     [501-504]
├── es/gobernanza-de-ia/
│   └── [5 Spanish mirrors]                            [510]
├── insights/
│   ├── index.astro                                    [600]
│   ├── category/
│   │   ├── academic-integrity/                        [601]
│   │   ├── ai-governance/                             [602]
│   │   ├── multilingual-data/                         [603]
│   │   ├── trust-and-evaluation/                      [604]
│   │   └── research-integrity/                        [605]
│   ├── why-trust-is-the-new-academic-currency/        [610]
│   ├── authorized-llms-graduate-education/            [611]
│   ├── building-multilingual-ai-without-bias/         [612]
│   ├── continuous-ai-model-evaluation/                [613]
│   ├── ai-governance-frameworks-universities/         [614]
│   └── p-value-abuse-research-integrity/              [615]
└── es/insights/
    └── [mirrors of all above with categoria/]

scripts/
├── generate_sitemap.js                                [104]
└── generate_robots.js                                 [105]

public/
├── sitemap.xml                                        [generated]
└── robots.txt                                         [generated]

src/apps/ (future React islands)
├── ContactForm/                                       [700 placeholder]
├── PValueAssessor/                                    [701 placeholder]
└── BiasChecker/                                       [702 placeholder]
```

**Total Page Count**: ~70 English pages + ~70 Spanish pages = **~140 pages**

---

## Cross-Linking Strategy

Strategic internal links create topical authority and SEO value:

### Higher Education → Other Pillars
- Campus Trust Charter ↔ Data Lineage (Evaluation pillar)
- Campus Trust Charter ↔ Provenance (Governance pillar)
- Authorized LLMs ↔ GDPR Compliance (Evaluation pillar)

### Insights → Service Pages
- Every Insights post links to at least one service pillar or spoke
- Academic Integrity category posts → Higher Ed spokes
- Governance category posts → Governance pillar + Higher Ed Trust Charter
- Research Integrity category posts → Research Integrity Tools spoke

### Services Hub → All Pillars
- Master landing links prominently to all 4 pillars
- Higher Ed in first position

---

## Validation Gates

Before Phase 11 is complete, all must pass:

1. **Localization**: 100% English/Spanish parity
2. **Accessibility**: No critical failures, mobile-first verified
3. **Build**: Clean Astro build, no errors
4. **TypeScript**: Strict mode passes, no type errors
5. **SEO**: Sitemap includes all routes, robots.txt present
6. **Metadata**: All pages have complete metadata blocks

**Final Artifact**: Phase11-Verification-Report.txt (bead 804)

---

## Next Steps After Phase 11

Once all beads are completed and validation passes:

1. **Phase 12**: Content Expansion
   - Full paragraphs → full sections
   - Editorial review and polish
   - Add case studies, testimonials

2. **Phase 13**: React Islands Activation
   - Implement Contact Form (bead 700)
   - Implement Research Integrity Tools (beads 701, 702)
   - Backend integration

3. **Phase 14**: Advanced SEO & Performance
   - Lighthouse optimization
   - Schema.org structured data
   - Advanced analytics integration

---

## How to Use This Tracking System

### View All Beads
```bash
bd list
```

### Filter by Priority
```bash
bd list | grep "P0"
```

### Filter by Label
```bash
bd list | grep "higher-ed"
bd list | grep "phase-11"
bd list | grep "spanish"
```

### View Specific Bead
```bash
bd info geoverity-200
```

### Mark Bead as Resolved (when complete)
```bash
bd resolve geoverity-200
```

### View Dependencies
Each bead has `deps:` field showing what must complete first

---

## Success Metrics

Phase 11 will be complete when:

- ✓ 59 beads resolved
- ✓ ~140 pages built and deployed
- ✓ All validation scripts pass
- ✓ Phase11-Verification-Report.txt generated
- ✓ Sitemap.xml and robots.txt live
- ✓ 100% localization parity
- ✓ Zero accessibility critical failures
- ✓ Zero TypeScript errors
- ✓ Clean Astro build

**Ready for Phase 12**: When all above criteria met

---

## Labels Reference

All beads are tagged for easy filtering:

**By Phase**: `phase-11`

**By Language**: `spanish`

**By Section**:
- `global`, `homepage`, `contact`, `navigation`, `seo`, `build-scripts`
- `services`, `pillar`, `spoke`
- `higher-ed`, `flagship`, `tools`
- `data-infrastructure`
- `evaluation`
- `governance`
- `insights`, `hub`, `category`, `posts`
- `react`, `islands`, `future-phase`
- `validation`, `localization`, `accessibility`, `build`, `typescript`, `git`

---

**Generated by**: Phase 11 Bead Creation Script
**Script Location**: [scripts/beads/create_phase11_beads.cjs](scripts/beads/create_phase11_beads.cjs)
**Total Implementation Estimate**: 40-60 hours (based on bead complexity and priority)

---

*GeoVerity 2026 - Truth at Global Scale*
