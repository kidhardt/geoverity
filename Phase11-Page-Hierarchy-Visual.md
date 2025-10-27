# Phase 11: Page Hierarchy Visualization

## Complete Site Map

```
GeoVerity 2026
└── / (Homepage) [100, 101]
    │
    ├── /contact/ [102, 103]
    │   └── [Future: React Contact Form - bead 700]
    │
    ├── /services/ [110, 111] ⭐ MASTER HUB
    │   │
    │   ├── /higher-education-consulting/ [200, 210] 🏆 FLAGSHIP PILLAR
    │   │   ├── /graduate-students-epistemic-integrity/ [201]
    │   │   ├── /authorized-departmental-llms/ [202]
    │   │   ├── /faculty-ai-literacy/ [203]
    │   │   ├── /campus-trust-charter/ [204]
    │   │   ├── /trust-as-currency/ [205]
    │   │   ├── /ai-ethics-curriculum/ [206]
    │   │   └── /research-integrity-tools/ [207]
    │   │       └── [Future: React P-Value Assessor - bead 701]
    │   │       └── [Future: React Bias Checker - bead 702]
    │   │
    │   ├── /multilingual-ai-training-data/ [300, 310] 📊 DATA PILLAR
    │   │   ├── /legal-translation-corpora/ [301]
    │   │   ├── /speech-audio-dataset-dialects/ [302]
    │   │   ├── /multilingual-image-video-annotation/ [303]
    │   │   └── /how-we-source-120-languages/ [304]
    │   │
    │   ├── /trustworthy-ai-evaluation-compliance/ [400, 410] ✓ EVALUATION PILLAR
    │   │   ├── /ai-model-bias-audit-framework/ [401]
    │   │   ├── /continuous-evaluation-dashboard/ [402]
    │   │   ├── /data-lineage-and-provenance/ [403] ↔ links to Higher Ed
    │   │   └── /gdpr-and-ai-compliance-datasets/ [404]
    │   │
    │   └── /ai-governance-frameworks/ [500, 510] ⚖️ GOVERNANCE PILLAR
    │       ├── /ai-policy-and-disclosure/ [501]
    │       ├── /trustscore-and-audit-readiness/ [502]
    │       ├── /provenance-and-data-lineage/ [503] ↔ links to Higher Ed + Evaluation
    │       └── /regulatory-alignment/ [504]
    │
    └── /insights/ [600] 💡 THOUGHT LEADERSHIP HUB
        │
        ├── /category/academic-integrity/ [601] → Higher Ed focus
        │   ├── /why-trust-is-the-new-academic-currency/ [610]
        │   └── /authorized-llms-graduate-education/ [611]
        │
        ├── /category/ai-governance/ [602] → Governance focus
        │   └── /ai-governance-frameworks-universities/ [614]
        │
        ├── /category/multilingual-data/ [603] → Data focus
        │   └── /building-multilingual-ai-without-bias/ [612]
        │
        ├── /category/trust-and-evaluation/ [604] → Evaluation focus
        │   └── /continuous-ai-model-evaluation/ [613]
        │
        └── /category/research-integrity/ [605] → Research Tools focus
            └── /p-value-abuse-research-integrity/ [615]
```

## Spanish Mirror Structure

Every English page has a Spanish equivalent under `/es/`:

```
/es/ (Spanish Homepage) [101]
├── /es/contacto/ [103]
├── /es/servicios/ [111]
│   ├── /es/consultoria-academica/ [210]
│   │   └── [8 Spanish spokes mirroring 201-207]
│   ├── /es/datos-multilingues-para-ia/ [310]
│   │   └── [5 Spanish spokes mirroring 301-304]
│   ├── /es/evaluacion-confiable-de-ia/ [410]
│   │   └── [5 Spanish spokes mirroring 401-404]
│   └── /es/gobernanza-de-ia/ [510]
│       └── [5 Spanish spokes mirroring 501-504]
└── /es/insights/
    ├── /es/insights/categoria/integridad-academica/
    ├── /es/insights/categoria/gobernanza-de-ia/
    ├── /es/insights/categoria/datos-multilingues/
    ├── /es/insights/categoria/confianza-y-evaluacion/
    ├── /es/insights/categoria/integridad-de-investigacion/
    └── [6 Spanish post mirrors]
```

## Cross-Linking Map

### Higher Education Consulting → Everything

```
🏆 Higher Education Consulting (Flagship)
  │
  ├─→ Campus Trust Charter [204]
  │     ├─→ Data Lineage (Evaluation) [403]
  │     └─→ Provenance (Governance) [503]
  │
  ├─→ Authorized Departmental LLMs [202]
  │     └─→ GDPR Compliance (Evaluation) [404]
  │
  └─→ Research Integrity Tools [207]
        └─→ P-Value Abuse (Insights) [615]
```

### Insights → Services

```
💡 Insights Categories
  │
  ├─→ Academic Integrity [601]
  │     ├─→ Posts [610, 611] → Higher Ed Pillar
  │
  ├─→ AI Governance [602]
  │     └─→ Post [614] → Governance Pillar + Higher Ed Charter
  │
  ├─→ Multilingual Data [603]
  │     └─→ Post [612] → Data Pillar
  │
  ├─→ Trust & Evaluation [604]
  │     └─→ Post [613] → Evaluation Pillar
  │
  └─→ Research Integrity [605]
        └─→ Post [615] → Higher Ed Research Tools
```

## Navigation Hierarchy

### Global Header (visible on every page) [106]

```
╔════════════════════════════════════════════════════════════╗
║  GeoVerity                    🌐 EN | ES                  ║
╠════════════════════════════════════════════════════════════╣
║  Home  |  Services  |  Higher Education  |  Insights  |  Contact ║
╚════════════════════════════════════════════════════════════╝
```

**Note**: "Higher Education Consulting" gets its own top-level nav item (not buried under Services)

### Services Dropdown (if implementing dropdown navigation)

```
Services ▼
  ├─ Higher Education Consulting    🏆 (FIRST)
  ├─ AI Data Infrastructure          📊
  ├─ Model Evaluation & Trust Scoring ✓
  └─ AI Governance & Compliance      ⚖️
```

## User Journey Examples

### Journey 1: Provost Seeking Academic Integrity Solution

```
1. Google Search: "AI academic integrity graduate programs"
   ↓
2. Lands on: /insights/why-trust-is-the-new-academic-currency/ [610]
   ↓
3. Clicks link in article: /higher-education-consulting/trust-as-currency/ [205]
   ↓
4. Explores pillar: /higher-education-consulting/ [200]
   ↓
5. Discovers: /higher-education-consulting/campus-trust-charter/ [204]
   ↓
6. CTA: "Request Academic Consultation" → /contact/ [102]
```

### Journey 2: ML Engineer Seeking Multilingual Data

```
1. Google Search: "multilingual speech dataset dialects"
   ↓
2. Lands on: /multilingual-ai-training-data/speech-audio-dataset-dialects/ [302]
   ↓
3. Breadcrumb up: /multilingual-ai-training-data/ [300]
   ↓
4. Explores related: /multilingual-ai-training-data/how-we-source-120-languages/ [304]
   ↓
5. CTA: "Request Data Consultation" → /contact/ [102]
```

### Journey 3: Compliance Officer Researching AI Governance

```
1. Google Search: "AI governance frameworks NIST"
   ↓
2. Lands on: /insights/ai-governance-frameworks-universities/ [614]
   ↓
3. Clicks link: /ai-governance-frameworks/ [500]
   ↓
4. Explores: /ai-governance-frameworks/regulatory-alignment/ [504]
   ↓
5. Cross-link: /higher-education-consulting/campus-trust-charter/ [204]
   ↓
6. Realizes GeoVerity does both enterprise + higher ed
   ↓
7. CTA: "Request Governance Consultation" → /contact/ [102]
```

## SEO Authority Structure

### Topical Clusters

```
🏆 Higher Education Cluster (strongest authority)
   Pillar: /higher-education-consulting/ [200]
   Spokes: 7 deep pages [201-207]
   Spanish: 8 mirrors [210]
   Insights: Category + 2 posts [601, 610, 611]
   Cross-links: To Evaluation, Governance
   = Total: ~18 pages focused on this topic

📊 Data Infrastructure Cluster
   Pillar: /multilingual-ai-training-data/ [300]
   Spokes: 4 pages [301-304]
   Spanish: 5 mirrors [310]
   Insights: Category + 1 post [603, 612]
   = Total: ~11 pages

✓ Evaluation Cluster
   Pillar: /trustworthy-ai-evaluation-compliance/ [400]
   Spokes: 4 pages [401-404]
   Spanish: 5 mirrors [410]
   Insights: Category + 1 post [604, 613]
   Cross-links: From Higher Ed, Governance
   = Total: ~11 pages

⚖️ Governance Cluster
   Pillar: /ai-governance-frameworks/ [500]
   Spokes: 4 pages [501-504]
   Spanish: 5 mirrors [510]
   Insights: Category + 1 post [602, 614]
   Cross-links: From Higher Ed, Evaluation
   = Total: ~11 pages
```

**SEO Strategy**: Higher Education Consulting has the deepest content cluster, signaling to search engines this is the primary expertise area.

## Priority Order Visual

### P0 (Highest - Build First)
```
🔴 geoverity-2    Phase 11 Epic
🔴 geoverity-200  Higher Ed Pillar
🔴 geoverity-600  Insights Hub
🔴 geoverity-800  Localization Validation
🔴 geoverity-801  Accessibility Validation
🔴 geoverity-802  Build Validation
🔴 geoverity-803  TypeScript Validation
🔴 geoverity-804  Completion Report
```

### P1 (High - Build Second)
```
🟠 All Global Infrastructure (100-106)
🟠 Services Hub (110-111)
🟠 Higher Ed Spokes (201-207) + Spanish (210)
🟠 All Pillar Pages (300, 400, 500)
🟠 Insights Categories (601-605)
🟠 Priority Insights Posts (610-611)
```

### P2 (Medium - Build Third)
```
🟡 All Spoke Pages for Data/Evaluation/Governance
🟡 Spanish Mirrors for those spokes
🟡 Remaining Insights Posts (612-615)
```

### P3 (Low/Future - Placeholder Only)
```
⚪ React Islands (700-702) - Don't build yet
```

## Validation Flow

```
All Pages Built
  ↓
[800] Localization Validator
  ├─ Check: English ↔ Spanish parity
  ├─ Check: hreflang bidirectional
  └─ Check: translationStatus metadata
  ↓
[801] Accessibility Scan
  ├─ Check: Mobile-first baseline
  ├─ Check: Heading hierarchy
  ├─ Check: Lang attributes
  └─ Check: Tap targets
  ↓
[802] Astro Build
  ├─ Check: All routes build
  ├─ Check: Sitemap includes all pages
  └─ Check: Robots.txt present
  ↓
[803] TypeScript Strict Mode
  └─ Check: No type errors
  ↓
[804] Generate Phase11-Verification-Report.txt
  └─ ✅ Ready for Phase 12
```

## Build Script Integration

```
package.json
  │
  ├─ "scripts": {
  │    ├─ "build": "astro build"
  │    ├─ "prebuild": "node scripts/generate_sitemap.js && node scripts/generate_robots.js"
  │    ├─ "validate:localization": "node scripts/validate-localization.js"
  │    ├─ "validate:accessibility": "node scripts/accessibility_scan.js"
  │    └─ "validate:all": "npm run validate:localization && npm run validate:accessibility && npx tsc --noEmit"
  │  }
  │
  └─ All validation runs before deployment
```

## Generated Artifacts

```
public/
├── sitemap.xml [generated by bead 104]
│   └── Contains all ~140 pages (English + Spanish)
│
└── robots.txt [generated by bead 105]
    └── References sitemap.xml location

docs/ (compliance)
└── Phase11-Verification-Report.txt [generated by bead 804]
    ├── Total pages created
    ├── Validation results
    ├── Beads completed list
    └── "Ready for Phase 12" statement
```

## Content Templates

### Pillar Page Pattern
```
Heading: {Pillar Name}
Problem Statement (1 paragraph)
Solution Overview (1 paragraph)
Value Proposition (1 paragraph)

Sub-services:
  • Link to Spoke 1
  • Link to Spoke 2
  • Link to Spoke 3
  • Link to Spoke 4

CTA: "Request Consultation"
```

### Spoke Page Pattern
```
Heading: {Spoke Name}
Overview (1 paragraph)
Key Features (bullet list or short paragraph)
Link back to parent pillar
CTA: "Learn More" or "Request Consultation"
```

### Insights Post Pattern
```
Heading: {Post Title}
Category: {category}
Date: {lastReviewed}

Content (1 paragraph explaining the topic)

Link to relevant service pillar/spoke
CTA: "Work With Us" → /contact/

Also available in: Español
```

## Summary

This visualization shows:
- **140 total pages** when complete
- **Higher Education Consulting prominently positioned** throughout
- **Clear cross-linking** between pillars for SEO authority
- **Bilingual parity** maintained across all content
- **Validation gates** ensuring quality
- **User journeys** optimized for conversion

**All tracked via 59 beads in the GeoVerity beads database.**

---

*GeoVerity 2026 - Truth at Global Scale*
