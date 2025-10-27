# Phase 11.0: Global Pages & Infrastructure

## geoverity-100
type: task
priority: 1
labels: global,homepage,phase-11
title: Create English homepage (/) with mission highlight
description: |
  Build src/pages/index.astro with:
  - GeoVerity mission ("Truth at Global Scale")
  - Higher Education Consulting featured as flagship (first position)
  - High-level service overview
  - CTA to /contact/ and /insights/
  - Language switcher to /es/
  - Metadata: translationStatus=complete, lastReviewed, hreflang to /es/
  - Short paragraph body content
deps: geoverity-2

## geoverity-101
type: task
priority: 1
labels: global,homepage,spanish,phase-11
title: Create Spanish homepage (/es/) mirroring English
description: |
  Build src/pages/es/index.astro with:
  - Equivalent Spanish content
  - CTA paths to /es/contacto/ and /es/insights/
  - hreflang back to /
  - Metadata: translationStatus=complete, lastReviewed
deps: geoverity-2,geoverity-100

## geoverity-102
type: task
priority: 1
labels: global,contact,phase-11
title: Create contact page (/contact/) with React island placeholder
description: |
  Build src/pages/contact.astro with:
  - Heading + short paragraph
  - Comment marking React Contact Form island mount point
  - hreflang to /es/contacto/
  - Metadata block
  Note: Actual React island tracked in separate future-phase bead
deps: geoverity-2

## geoverity-103
type: task
priority: 1
labels: global,contact,spanish,phase-11
title: Create Spanish contact page (/es/contacto/)
description: |
  Build src/pages/es/contacto.astro mirroring /contact/
  - Spanish headings + paragraph
  - React island mount placeholder
  - hreflang to /contact/
deps: geoverity-2,geoverity-102

## geoverity-104
type: task
priority: 1
labels: global,seo,build-scripts,phase-11
title: Create sitemap.xml generation script
description: |
  Build script in scripts/ to:
  - Crawl all .astro pages in src/pages/
  - Generate sitemap.xml in public/
  - Include both English and Spanish routes
  - Set proper lastmod, priority, changefreq
  - Integrate into package.json build chain
deps: geoverity-2

## geoverity-105
type: task
priority: 1
labels: global,seo,build-scripts,phase-11
title: Create robots.txt generation script
description: |
  Build script in scripts/ to:
  - Generate public/robots.txt
  - Allow all crawlers
  - Reference sitemap.xml location
  - Integrate into package.json build chain
deps: geoverity-2

## geoverity-106
type: task
priority: 1
labels: global,navigation,phase-11
title: Update global navigation with all pillar links
description: |
  Update navigation component to include:
  - Home
  - Services
  - Higher Education Consulting (first service link)
  - Insights
  - Contact
  - Language toggle (EN/ES)
  Ensure mobile-first responsive behavior
deps: geoverity-2

# Phase 11.1: Services Master Hub

## geoverity-110
type: task
priority: 1
labels: services,pillar,phase-11
title: Create Services hub (/services/)
description: |
  Build src/pages/services/index.astro as master services landing:
  - Mission statement ("Truth at Global Scale")
  - Section cards linking to 4 pillars:
    1. Higher Education Consulting (FIRST position, flagship)
    2. AI Data Infrastructure
    3. Model Evaluation & Trust Scoring
    4. AI Governance & Compliance
  - Optional: Research & Insights credibility layer
  - CTA to /contact/ and /insights/ (filtered to "Institutional Strategy")
  - Metadata + hreflang to /es/servicios/
  - Short paragraph for each pillar
deps: geoverity-2

## geoverity-111
type: task
priority: 1
labels: services,pillar,spanish,phase-11
title: Create Spanish Services hub (/es/servicios/)
description: |
  Build src/pages/es/servicios/index.astro mirroring /services/
  - Spanish content for all 4 pillar cards
  - hreflang to /services/
deps: geoverity-2,geoverity-110

# Phase 11.2: Higher Education Consulting Pillar (FLAGSHIP)

## geoverity-200
type: task
priority: 0
labels: higher-ed,pillar,flagship,phase-11
title: Create Higher Education Consulting pillar (/higher-education-consulting/)
description: |
  Build src/pages/higher-education-consulting/index.astro:
  - Problem: AI collapse of traditional authorship
  - Graduate students as epistemic integrity guardians
  - Trustworthiness > skills in hiring/accreditation
  - List and link to 7 spoke services (beads 201-207)
  - Trust Charter concept
  - CTA: "Request Academic Consultation" → /contact/
  - Metadata + hreflang to /es/consultoria-academica/
  - 2-3 paragraphs of positioning content
deps: geoverity-2

## geoverity-201
type: task
priority: 1
labels: higher-ed,spoke,phase-11
title: Create spoke - Graduate Students Epistemic Integrity
description: |
  Build /higher-education-consulting/graduate-students-epistemic-integrity/
  - Heading + short paragraph on identity formation, ethical AI use
  - Hiring/accreditation relevance
  - Link back to parent pillar page
  - Metadata + hreflang to Spanish mirror
deps: geoverity-200

## geoverity-202
type: task
priority: 1
labels: higher-ed,spoke,phase-11
title: Create spoke - Authorized Departmental LLMs
description: |
  Build /higher-education-consulting/authorized-departmental-llms/
  - Heading + paragraph on secure, auditable, discipline-tuned models
  - Disclosure trails, FERPA/GDPR compliance
  - Departmental deployment pitch
  - Metadata + hreflang
deps: geoverity-200

## geoverity-203
type: task
priority: 1
labels: higher-ed,spoke,phase-11
title: Create spoke - Faculty AI Literacy
description: |
  Build /higher-education-consulting/faculty-ai-literacy/
  - Faculty AI ethics and supervisory literacy
  - Policy alignment, training, certification pathways
  - Metadata + hreflang
deps: geoverity-200

## geoverity-204
type: task
priority: 1
labels: higher-ed,spoke,phase-11
title: Create spoke - Campus Trust Charter
description: |
  Build /higher-education-consulting/campus-trust-charter/
  - Campus-wide AI Trust Charter
  - Aligns provost, grad school, IRB, chairs
  - Accreditation and reputation outputs
  - Metadata + hreflang
deps: geoverity-200

## geoverity-205
type: task
priority: 1
labels: higher-ed,spoke,phase-11
title: Create spoke - Trust as Currency
description: |
  Build /higher-education-consulting/trust-as-currency/
  - Trustworthiness as new credential currency
  - Argument to presidents, boards, deans, employers
  - Fundraising and external relations positioning
  - Metadata + hreflang
deps: geoverity-200

## geoverity-206
type: task
priority: 1
labels: higher-ed,spoke,phase-11
title: Create spoke - AI Ethics Curriculum
description: |
  Build /higher-education-consulting/ai-ethics-curriculum/
  - Graduate curriculum for AI-era ethics
  - Modules on critical review, attribution, bias literacy
  - Co-teaching models faculty + grad students
  - Metadata + hreflang
deps: geoverity-200

## geoverity-207
type: task
priority: 1
labels: higher-ed,spoke,tools,phase-11
title: Create spoke - Research Integrity Tools (React island mount)
description: |
  Build /higher-education-consulting/research-integrity-tools/
  - Heading + paragraph explaining ethical tooling
  - Comment placeholder for React islands (p-value abuse, bias checkers)
  - Demonstration page for universities
  - Metadata + hreflang
  Note: Actual React islands tracked separately
deps: geoverity-200

## geoverity-210
type: task
priority: 1
labels: higher-ed,spanish,phase-11
title: Create all 8 Spanish mirrors for Higher Education Consulting
description: |
  Build Spanish versions under /es/consultoria-academica/:
  - index (pillar)
  - graduate-students-epistemic-integrity
  - authorized-departmental-llms
  - faculty-ai-literacy
  - campus-trust-charter
  - trust-as-currency
  - ai-ethics-curriculum
  - research-integrity-tools
  All with hreflang back to English counterparts
deps: geoverity-200,geoverity-201,geoverity-202,geoverity-203,geoverity-204,geoverity-205,geoverity-206,geoverity-207

# Phase 11.3: AI Data Infrastructure Pillar

## geoverity-300
type: task
priority: 1
labels: data-infrastructure,pillar,phase-11
title: Create AI Data Infrastructure pillar (/multilingual-ai-training-data/)
description: |
  Build src/pages/multilingual-ai-training-data/index.astro:
  - Position as enterprise/research multilingual data provider
  - Sections: data collection, HITL annotation, domain datasets
  - Multilingual coverage, quality controls
  - Link to 4 spokes (beads 301-304)
  - Metadata + hreflang to /es/datos-multilingues-para-ia/
deps: geoverity-2

## geoverity-301
type: task
priority: 2
labels: data-infrastructure,spoke,phase-11
title: Create spoke - Legal Translation Corpora
description: |
  Build /multilingual-ai-training-data/legal-translation-corpora/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-300

## geoverity-302
type: task
priority: 2
labels: data-infrastructure,spoke,phase-11
title: Create spoke - Speech Audio Dataset Dialects
description: |
  Build /multilingual-ai-training-data/speech-audio-dataset-dialects/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-300

## geoverity-303
type: task
priority: 2
labels: data-infrastructure,spoke,phase-11
title: Create spoke - Multilingual Image/Video Annotation
description: |
  Build /multilingual-ai-training-data/multilingual-image-video-annotation/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-300

## geoverity-304
type: task
priority: 2
labels: data-infrastructure,spoke,phase-11
title: Create spoke - How We Source 120 Languages
description: |
  Build /multilingual-ai-training-data/how-we-source-120-languages/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-300

## geoverity-310
type: task
priority: 2
labels: data-infrastructure,spanish,phase-11
title: Create all 5 Spanish mirrors for AI Data Infrastructure
description: |
  Build Spanish versions under /es/datos-multilingues-para-ia/:
  - index (pillar)
  - legal-translation-corpora
  - speech-audio-dataset-dialects
  - multilingual-image-video-annotation
  - how-we-source-120-languages
  All with hreflang
deps: geoverity-300,geoverity-301,geoverity-302,geoverity-303,geoverity-304

# Phase 11.4: Model Evaluation & Trust Scoring Pillar

## geoverity-400
type: task
priority: 1
labels: evaluation,pillar,phase-11
title: Create Model Evaluation pillar (/trustworthy-ai-evaluation-compliance/)
description: |
  Build src/pages/trustworthy-ai-evaluation-compliance/index.astro:
  - Bias audits, trust scoring, continuous monitoring pitch
  - GeoVerity Trust Index™ introduction
  - Link to 4 spokes (beads 401-404)
  - Cross-link to Higher Ed accreditation use case
  - Metadata + hreflang to /es/evaluacion-confiable-de-ia/
deps: geoverity-2

## geoverity-401
type: task
priority: 2
labels: evaluation,spoke,phase-11
title: Create spoke - AI Model Bias Audit Framework
description: |
  Build /trustworthy-ai-evaluation-compliance/ai-model-bias-audit-framework/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-400

## geoverity-402
type: task
priority: 2
labels: evaluation,spoke,phase-11
title: Create spoke - Continuous Evaluation Dashboard
description: |
  Build /trustworthy-ai-evaluation-compliance/continuous-evaluation-dashboard/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-400

## geoverity-403
type: task
priority: 2
labels: evaluation,spoke,phase-11
title: Create spoke - Data Lineage and Provenance
description: |
  Build /trustworthy-ai-evaluation-compliance/data-lineage-and-provenance/
  - Heading + paragraph stub
  - Cross-link to Higher Ed campus-trust-charter
  - Metadata + hreflang
deps: geoverity-400

## geoverity-404
type: task
priority: 2
labels: evaluation,spoke,phase-11
title: Create spoke - GDPR and AI Compliance Datasets
description: |
  Build /trustworthy-ai-evaluation-compliance/gdpr-and-ai-compliance-datasets/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-400

## geoverity-410
type: task
priority: 2
labels: evaluation,spanish,phase-11
title: Create all 5 Spanish mirrors for Model Evaluation
description: |
  Build Spanish versions under /es/evaluacion-confiable-de-ia/:
  - index (pillar)
  - ai-model-bias-audit-framework
  - continuous-evaluation-dashboard
  - data-lineage-and-provenance
  - gdpr-and-ai-compliance-datasets
  All with hreflang
deps: geoverity-400,geoverity-401,geoverity-402,geoverity-403,geoverity-404

# Phase 11.5: AI Governance & Compliance Pillar

## geoverity-500
type: task
priority: 1
labels: governance,pillar,phase-11
title: Create AI Governance pillar (/ai-governance-frameworks/)
description: |
  Build src/pages/ai-governance-frameworks/index.astro:
  - For enterprises, legal counsel, compliance officers, provosts
  - Governance frameworks, model documentation, traceability
  - NIST / EU AI alignment
  - Link to 4 spokes (beads 501-504)
  - Metadata + hreflang to /es/gobernanza-de-ia/
deps: geoverity-2

## geoverity-501
type: task
priority: 2
labels: governance,spoke,phase-11
title: Create spoke - AI Policy and Disclosure
description: |
  Build /ai-governance-frameworks/ai-policy-and-disclosure/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-500

## geoverity-502
type: task
priority: 2
labels: governance,spoke,phase-11
title: Create spoke - TrustScore and Audit Readiness
description: |
  Build /ai-governance-frameworks/trustscore-and-audit-readiness/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-500

## geoverity-503
type: task
priority: 2
labels: governance,spoke,phase-11
title: Create spoke - Provenance and Data Lineage
description: |
  Build /ai-governance-frameworks/provenance-and-data-lineage/
  - Heading + paragraph stub
  - Cross-link to Higher Ed campus-trust-charter and Evaluation data-lineage
  - Metadata + hreflang
deps: geoverity-500

## geoverity-504
type: task
priority: 2
labels: governance,spoke,phase-11
title: Create spoke - Regulatory Alignment
description: |
  Build /ai-governance-frameworks/regulatory-alignment/
  - Heading + paragraph stub
  - Metadata + hreflang
deps: geoverity-500

## geoverity-510
type: task
priority: 2
labels: governance,spanish,phase-11
title: Create all 5 Spanish mirrors for AI Governance
description: |
  Build Spanish versions under /es/gobernanza-de-ia/:
  - index (pillar)
  - ai-policy-and-disclosure
  - trustscore-and-audit-readiness
  - provenance-and-data-lineage
  - regulatory-alignment
  All with hreflang
deps: geoverity-500,geoverity-501,geoverity-502,geoverity-503,geoverity-504

# Phase 11.6: Insights Hub & Categories

## geoverity-600
type: task
priority: 0
labels: insights,hub,phase-11
title: Create Insights hub (/insights/)
description: |
  Build src/pages/insights/index.astro:
  - Thought leadership and SEO engine
  - Editorial product aligned to service pillars
  - List all 5 categories with descriptions
  - Recent posts display (query from content collection)
  - Metadata + hreflang to /es/insights/
deps: geoverity-2

## geoverity-601
type: task
priority: 1
labels: insights,category,phase-11
title: Create Insights category - Academic Integrity
description: |
  Build /insights/category/academic-integrity/ (English + Spanish /es/insights/categoria/integridad-academica/)
  - Focus: Higher Education Consulting
  - Topics: grad students, authorized LLMs, trust as credential
  - List posts tagged with this category
  - Metadata + hreflang
deps: geoverity-600

## geoverity-602
type: task
priority: 1
labels: insights,category,phase-11
title: Create Insights category - AI Governance
description: |
  Build /insights/category/ai-governance/ (English + Spanish)
  - Focus: AI Governance & Compliance
  - Topics: policy, disclosure, accreditation, regulatory harmonization
  - Metadata + hreflang
deps: geoverity-600

## geoverity-603
type: task
priority: 1
labels: insights,category,phase-11
title: Create Insights category - Multilingual Data
description: |
  Build /insights/category/multilingual-data/ (English + Spanish)
  - Focus: AI Data Infrastructure
  - Topics: bias in corpora, dialectal coverage, legal/medical data ethics
  - Metadata + hreflang
deps: geoverity-600

## geoverity-604
type: task
priority: 1
labels: insights,category,phase-11
title: Create Insights category - Trust and Evaluation
description: |
  Build /insights/category/trust-and-evaluation/ (English + Spanish)
  - Focus: Model Evaluation & Trust Scoring
  - Topics: bias audits, fairness, provenance, Truth Index
  - Metadata + hreflang
deps: geoverity-600

## geoverity-605
type: task
priority: 1
labels: insights,category,phase-11
title: Create Insights category - Research Integrity
description: |
  Build /insights/category/research-integrity/ (English + Spanish)
  - Focus: Research Integrity Tools
  - Topics: p-value abuse, transparency, reproducibility
  - Metadata + hreflang
deps: geoverity-600

## geoverity-610
type: task
priority: 1
labels: insights,posts,phase-11
title: Create seed Insights post - Why Trust is the New Academic Currency
description: |
  Build /insights/why-trust-is-the-new-academic-currency/ (English + Spanish)
  - Category: academic-integrity
  - 1 paragraph of content
  - Link to /higher-education-consulting/trust-as-currency/
  - CTA: "Work With Us" → /contact/
  - Metadata: lastReviewed, translationStatus=complete, hreflang
  - JSON twin for AI ingestion
deps: geoverity-601

## geoverity-611
type: task
priority: 1
labels: insights,posts,phase-11
title: Create seed Insights post - Authorized LLMs in Graduate Education
description: |
  Build /insights/authorized-llms-graduate-education/ (English + Spanish)
  - Category: academic-integrity
  - 1 paragraph
  - Link to /higher-education-consulting/authorized-departmental-llms/
  - CTA to consultation
  - Metadata + hreflang + JSON twin
deps: geoverity-601

## geoverity-612
type: task
priority: 2
labels: insights,posts,phase-11
title: Create seed Insights post - Building Multilingual AI Without Bias
description: |
  Build /insights/building-multilingual-ai-without-bias/ (English + Spanish)
  - Category: multilingual-data
  - 1 paragraph
  - Link to /multilingual-ai-training-data/
  - CTA to consultation
  - Metadata + hreflang + JSON twin
deps: geoverity-603

## geoverity-613
type: task
priority: 2
labels: insights,posts,phase-11
title: Create seed Insights post - The Case for Continuous AI Model Evaluation
description: |
  Build /insights/continuous-ai-model-evaluation/ (English + Spanish)
  - Category: trust-and-evaluation
  - 1 paragraph
  - Link to /trustworthy-ai-evaluation-compliance/
  - CTA to consultation
  - Metadata + hreflang + JSON twin
deps: geoverity-604

## geoverity-614
type: task
priority: 2
labels: insights,posts,phase-11
title: Create seed Insights post - AI Governance Frameworks for Universities
description: |
  Build /insights/ai-governance-frameworks-universities/ (English + Spanish)
  - Category: ai-governance
  - 1 paragraph
  - Link to /ai-governance-frameworks/ and /higher-education-consulting/campus-trust-charter/
  - CTA to consultation
  - Metadata + hreflang + JSON twin
deps: geoverity-602

## geoverity-615
type: task
priority: 2
labels: insights,posts,phase-11
title: Create seed Insights post - P-Value Abuse and Research Integrity
description: |
  Build /insights/p-value-abuse-research-integrity/ (English + Spanish)
  - Category: research-integrity
  - 1 paragraph
  - Link to /higher-education-consulting/research-integrity-tools/
  - CTA to consultation
  - Metadata + hreflang + JSON twin
deps: geoverity-605

# Phase 11.7: React Islands Placeholders (Future Phase)

## geoverity-700
type: task
priority: 3
labels: react,islands,future-phase,phase-11
title: PLACEHOLDER - React Contact Form island
description: |
  Future implementation: Build React contact form in src/apps/ContactForm/
  - Mount points already in /contact/ and /es/contacto/ (beads 102, 103)
  - Accessibility compliant
  - Form validation
  - Backend integration TBD
  This is placeholder tracking only - actual implementation in later phase
deps: geoverity-102,geoverity-103

## geoverity-701
type: task
priority: 3
labels: react,islands,future-phase,phase-11
title: PLACEHOLDER - React P-Value Abuse Assessor island
description: |
  Future implementation: Build p-value abuse tool in src/apps/PValueAssessor/
  - Mount point in /higher-education-consulting/research-integrity-tools/ (bead 207)
  - Interactive statistical analysis
  - Educational feedback
  This is placeholder tracking only
deps: geoverity-207

## geoverity-702
type: task
priority: 3
labels: react,islands,future-phase,phase-11
title: PLACEHOLDER - React Bias/Drift Self-Checker island
description: |
  Future implementation: Build bias checker in src/apps/BiasChecker/
  - Mount point in /higher-education-consulting/research-integrity-tools/ (bead 207)
  - Model bias detection
  - Drift analysis
  This is placeholder tracking only
deps: geoverity-207

# Phase 11.8: Cross-Cutting Validation

## geoverity-800
type: task
priority: 0
labels: validation,localization,phase-11
title: Run localization validator on all new pages
description: |
  Execute node scripts/validate-localization.js
  - Verify all English pages have Spanish mirrors
  - Verify hreflang bidirectional links
  - Verify translationStatus metadata present
  - No pages should fail validation
deps: geoverity-100,geoverity-110,geoverity-200,geoverity-300,geoverity-400,geoverity-500,geoverity-600

## geoverity-801
type: task
priority: 0
labels: validation,accessibility,phase-11
title: Run accessibility scan on all new pages
description: |
  Execute node scripts/accessibility_scan.js
  - Verify mobile-first baseline
  - Verify proper heading hierarchy
  - Verify lang attributes
  - Verify tap target sizes
  - No critical failures
deps: geoverity-100,geoverity-110,geoverity-200,geoverity-300,geoverity-400,geoverity-500,geoverity-600

## geoverity-802
type: task
priority: 0
labels: validation,build,phase-11
title: Verify full Astro build with all new routes
description: |
  Execute npx astro build
  - All pages must build without errors
  - Check dist/ output for all routes
  - Verify sitemap.xml includes all new pages
  - Verify robots.txt present
deps: geoverity-104,geoverity-105,geoverity-800,geoverity-801

## geoverity-803
type: task
priority: 0
labels: validation,typescript,phase-11
title: Run TypeScript strict mode check
description: |
  Execute npx tsc --noEmit
  - All new .astro and supporting .ts files must pass strict mode
  - No type errors
deps: geoverity-802

## geoverity-804
type: task
priority: 0
labels: validation,git,phase-11
title: Create Phase 11 completion verification report
description: |
  Generate Phase11-Verification-Report.txt with:
  - Total pages created (English + Spanish count)
  - All validation results (localization, accessibility, build, TypeScript)
  - List of beads completed
  - List of placeholder beads for future phases
  - Confirmation of sitemap and robots.txt
  - Ready for Phase 12 statement
deps: geoverity-803
