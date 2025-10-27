#!/usr/bin/env node
/**
 * Phase 11: Page Hierarchy & Content Architecture
 * Bead Creation Script
 *
 * Creates all tracking beads for GeoVerity's complete page hierarchy
 * following Phase 10 completion
 */

const { execSync } = require('child_process');

function createBead(id, title, description, priority, labels, deps = '') {
  const depsFlag = deps ? `--deps "${deps}"` : '';
  const cmd = `bd create "${title}" --id "${id}" --priority ${priority} --type task --labels "${labels}" --description "${description}" ${depsFlag}`;

  try {
    execSync(cmd, { stdio: 'inherit', shell: true });
    console.log(`✓ Created ${id}: ${title}`);
  } catch (error) {
    console.error(`✗ Failed to create ${id}: ${error.message}`);
  }
}

console.log('Creating Phase 11 beads...\n');

// 11.0: Global Pages & Infrastructure
createBead(
  'geoverity-100',
  'Create English homepage (/) with mission highlight',
  'Build src/pages/index.astro with GeoVerity mission, Higher Education Consulting featured first, service overview, CTAs, language switcher, metadata with hreflang, short paragraph content',
  1,
  'global,homepage,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-101',
  'Create Spanish homepage (/es/) mirroring English',
  'Build src/pages/es/index.astro with Spanish content, CTAs to /es/contacto/ and /es/insights/, hreflang back to /, metadata complete',
  1,
  'global,homepage,spanish,phase-11',
  'geoverity-2,geoverity-100'
);

createBead(
  'geoverity-102',
  'Create contact page (/contact/) with React island placeholder',
  'Build src/pages/contact.astro with heading, paragraph, comment for React Contact Form mount point, hreflang to /es/contacto/, metadata',
  1,
  'global,contact,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-103',
  'Create Spanish contact page (/es/contacto/)',
  'Build src/pages/es/contacto.astro mirroring /contact/ with Spanish content, React island placeholder, hreflang',
  1,
  'global,contact,spanish,phase-11',
  'geoverity-2,geoverity-102'
);

createBead(
  'geoverity-104',
  'Create sitemap.xml generation script',
  'Build script in scripts/ to crawl .astro pages, generate sitemap.xml in public/, include English+Spanish routes, set lastmod/priority/changefreq, integrate into package.json',
  1,
  'global,seo,build-scripts,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-105',
  'Create robots.txt generation script',
  'Build script in scripts/ to generate public/robots.txt, allow all crawlers, reference sitemap.xml, integrate into package.json',
  1,
  'global,seo,build-scripts,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-106',
  'Update global navigation with all pillar links',
  'Update navigation component with Home, Services, Higher Education Consulting (first), Insights, Contact, language toggle (EN/ES), mobile-first responsive',
  1,
  'global,navigation,phase-11',
  'geoverity-2'
);

// 11.1: Services Master Hub
createBead(
  'geoverity-110',
  'Create Services hub (/services/)',
  'Build src/pages/services/index.astro as master services landing with mission, 4 pillar cards (Higher Ed FIRST), CTAs, metadata+hreflang, paragraph per pillar',
  1,
  'services,pillar,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-111',
  'Create Spanish Services hub (/es/servicios/)',
  'Build src/pages/es/servicios/index.astro mirroring /services/ with Spanish pillar cards, hreflang',
  1,
  'services,pillar,spanish,phase-11',
  'geoverity-2,geoverity-110'
);

// 11.2: Higher Education Consulting Pillar (FLAGSHIP)
createBead(
  'geoverity-200',
  'Create Higher Education Consulting pillar (/higher-education-consulting/)',
  'Build pillar page: AI+authorship problem, grad students as guardians, trustworthiness>skills, 7 spoke links, Trust Charter, CTA to consultation, 2-3 paragraphs, metadata+hreflang',
  0,
  'higher-ed,pillar,flagship,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-201',
  'Create spoke - Graduate Students Epistemic Integrity',
  'Build /higher-education-consulting/graduate-students-epistemic-integrity/ with paragraph on identity, ethical AI, hiring relevance, link to pillar, metadata+hreflang',
  1,
  'higher-ed,spoke,phase-11',
  'geoverity-200'
);

createBead(
  'geoverity-202',
  'Create spoke - Authorized Departmental LLMs',
  'Build /higher-education-consulting/authorized-departmental-llms/ with paragraph on secure models, disclosure, FERPA/GDPR, departmental pitch, metadata+hreflang',
  1,
  'higher-ed,spoke,phase-11',
  'geoverity-200'
);

createBead(
  'geoverity-203',
  'Create spoke - Faculty AI Literacy',
  'Build /higher-education-consulting/faculty-ai-literacy/ with paragraph on AI ethics, policy alignment, training pathways, metadata+hreflang',
  1,
  'higher-ed,spoke,phase-11',
  'geoverity-200'
);

createBead(
  'geoverity-204',
  'Create spoke - Campus Trust Charter',
  'Build /higher-education-consulting/campus-trust-charter/ with paragraph on campus-wide charter, provost alignment, accreditation outputs, metadata+hreflang',
  1,
  'higher-ed,spoke,phase-11',
  'geoverity-200'
);

createBead(
  'geoverity-205',
  'Create spoke - Trust as Currency',
  'Build /higher-education-consulting/trust-as-currency/ with paragraph on trustworthiness credential, argument to leadership, fundraising positioning, metadata+hreflang',
  1,
  'higher-ed,spoke,phase-11',
  'geoverity-200'
);

createBead(
  'geoverity-206',
  'Create spoke - AI Ethics Curriculum',
  'Build /higher-education-consulting/ai-ethics-curriculum/ with paragraph on graduate curriculum, critical review modules, co-teaching models, metadata+hreflang',
  1,
  'higher-ed,spoke,phase-11',
  'geoverity-200'
);

createBead(
  'geoverity-207',
  'Create spoke - Research Integrity Tools (React island mount)',
  'Build /higher-education-consulting/research-integrity-tools/ with paragraph on ethical tooling, React island placeholder comments (p-value, bias), demo for universities, metadata+hreflang',
  1,
  'higher-ed,spoke,tools,phase-11',
  'geoverity-200'
);

createBead(
  'geoverity-210',
  'Create all 8 Spanish mirrors for Higher Education Consulting',
  'Build Spanish versions under /es/consultoria-academica/ for pillar+7 spokes, all with hreflang back to English',
  1,
  'higher-ed,spanish,phase-11',
  'geoverity-200,geoverity-201,geoverity-202,geoverity-203,geoverity-204,geoverity-205,geoverity-206,geoverity-207'
);

// 11.3: AI Data Infrastructure Pillar
createBead(
  'geoverity-300',
  'Create AI Data Infrastructure pillar (/multilingual-ai-training-data/)',
  'Build pillar page: multilingual data provider positioning, data collection/HITL/domains, coverage+quality, 4 spoke links, metadata+hreflang',
  1,
  'data-infrastructure,pillar,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-301',
  'Create spoke - Legal Translation Corpora',
  'Build /multilingual-ai-training-data/legal-translation-corpora/ with heading+paragraph stub, metadata+hreflang',
  2,
  'data-infrastructure,spoke,phase-11',
  'geoverity-300'
);

createBead(
  'geoverity-302',
  'Create spoke - Speech Audio Dataset Dialects',
  'Build /multilingual-ai-training-data/speech-audio-dataset-dialects/ with heading+paragraph stub, metadata+hreflang',
  2,
  'data-infrastructure,spoke,phase-11',
  'geoverity-300'
);

createBead(
  'geoverity-303',
  'Create spoke - Multilingual Image/Video Annotation',
  'Build /multilingual-ai-training-data/multilingual-image-video-annotation/ with heading+paragraph stub, metadata+hreflang',
  2,
  'data-infrastructure,spoke,phase-11',
  'geoverity-300'
);

createBead(
  'geoverity-304',
  'Create spoke - How We Source 120 Languages',
  'Build /multilingual-ai-training-data/how-we-source-120-languages/ with heading+paragraph stub, metadata+hreflang',
  2,
  'data-infrastructure,spoke,phase-11',
  'geoverity-300'
);

createBead(
  'geoverity-310',
  'Create all 5 Spanish mirrors for AI Data Infrastructure',
  'Build Spanish versions under /es/datos-multilingues-para-ia/ for pillar+4 spokes, all with hreflang',
  2,
  'data-infrastructure,spanish,phase-11',
  'geoverity-300,geoverity-301,geoverity-302,geoverity-303,geoverity-304'
);

// 11.4: Model Evaluation & Trust Scoring Pillar
createBead(
  'geoverity-400',
  'Create Model Evaluation pillar (/trustworthy-ai-evaluation-compliance/)',
  'Build pillar page: bias audits/trust scoring/monitoring, Trust Index intro, 4 spoke links, cross-link Higher Ed accreditation, metadata+hreflang',
  1,
  'evaluation,pillar,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-401',
  'Create spoke - AI Model Bias Audit Framework',
  'Build /trustworthy-ai-evaluation-compliance/ai-model-bias-audit-framework/ with heading+paragraph stub, metadata+hreflang',
  2,
  'evaluation,spoke,phase-11',
  'geoverity-400'
);

createBead(
  'geoverity-402',
  'Create spoke - Continuous Evaluation Dashboard',
  'Build /trustworthy-ai-evaluation-compliance/continuous-evaluation-dashboard/ with heading+paragraph stub, metadata+hreflang',
  2,
  'evaluation,spoke,phase-11',
  'geoverity-400'
);

createBead(
  'geoverity-403',
  'Create spoke - Data Lineage and Provenance',
  'Build /trustworthy-ai-evaluation-compliance/data-lineage-and-provenance/ with heading+paragraph stub, cross-link Higher Ed charter, metadata+hreflang',
  2,
  'evaluation,spoke,phase-11',
  'geoverity-400'
);

createBead(
  'geoverity-404',
  'Create spoke - GDPR and AI Compliance Datasets',
  'Build /trustworthy-ai-evaluation-compliance/gdpr-and-ai-compliance-datasets/ with heading+paragraph stub, metadata+hreflang',
  2,
  'evaluation,spoke,phase-11',
  'geoverity-400'
);

createBead(
  'geoverity-410',
  'Create all 5 Spanish mirrors for Model Evaluation',
  'Build Spanish versions under /es/evaluacion-confiable-de-ia/ for pillar+4 spokes, all with hreflang',
  2,
  'evaluation,spanish,phase-11',
  'geoverity-400,geoverity-401,geoverity-402,geoverity-403,geoverity-404'
);

// 11.5: AI Governance & Compliance Pillar
createBead(
  'geoverity-500',
  'Create AI Governance pillar (/ai-governance-frameworks/)',
  'Build pillar page: for enterprises/counsel/compliance/provosts, governance frameworks, traceability, NIST/EU alignment, 4 spoke links, metadata+hreflang',
  1,
  'governance,pillar,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-501',
  'Create spoke - AI Policy and Disclosure',
  'Build /ai-governance-frameworks/ai-policy-and-disclosure/ with heading+paragraph stub, metadata+hreflang',
  2,
  'governance,spoke,phase-11',
  'geoverity-500'
);

createBead(
  'geoverity-502',
  'Create spoke - TrustScore and Audit Readiness',
  'Build /ai-governance-frameworks/trustscore-and-audit-readiness/ with heading+paragraph stub, metadata+hreflang',
  2,
  'governance,spoke,phase-11',
  'geoverity-500'
);

createBead(
  'geoverity-503',
  'Create spoke - Provenance and Data Lineage',
  'Build /ai-governance-frameworks/provenance-and-data-lineage/ with heading+paragraph stub, cross-links to Higher Ed charter and Evaluation lineage, metadata+hreflang',
  2,
  'governance,spoke,phase-11',
  'geoverity-500'
);

createBead(
  'geoverity-504',
  'Create spoke - Regulatory Alignment',
  'Build /ai-governance-frameworks/regulatory-alignment/ with heading+paragraph stub, metadata+hreflang',
  2,
  'governance,spoke,phase-11',
  'geoverity-500'
);

createBead(
  'geoverity-510',
  'Create all 5 Spanish mirrors for AI Governance',
  'Build Spanish versions under /es/gobernanza-de-ia/ for pillar+4 spokes, all with hreflang',
  2,
  'governance,spanish,phase-11',
  'geoverity-500,geoverity-501,geoverity-502,geoverity-503,geoverity-504'
);

// 11.6: Insights Hub & Categories
createBead(
  'geoverity-600',
  'Create Insights hub (/insights/)',
  'Build thought leadership/SEO landing: editorial aligned to pillars, list 5 categories with descriptions, recent posts query, metadata+hreflang',
  0,
  'insights,hub,phase-11',
  'geoverity-2'
);

createBead(
  'geoverity-601',
  'Create Insights category - Academic Integrity',
  'Build /insights/category/academic-integrity/ (English+Spanish) focused on Higher Ed: grad students, authorized LLMs, trust credential, post list, metadata+hreflang',
  1,
  'insights,category,phase-11',
  'geoverity-600'
);

createBead(
  'geoverity-602',
  'Create Insights category - AI Governance',
  'Build /insights/category/ai-governance/ (English+Spanish) focused on Governance pillar: policy, disclosure, accreditation, metadata+hreflang',
  1,
  'insights,category,phase-11',
  'geoverity-600'
);

createBead(
  'geoverity-603',
  'Create Insights category - Multilingual Data',
  'Build /insights/category/multilingual-data/ (English+Spanish) focused on Data Infrastructure: bias, dialects, legal/medical ethics, metadata+hreflang',
  1,
  'insights,category,phase-11',
  'geoverity-600'
);

createBead(
  'geoverity-604',
  'Create Insights category - Trust and Evaluation',
  'Build /insights/category/trust-and-evaluation/ (English+Spanish) focused on Evaluation pillar: bias audits, fairness, provenance, Truth Index, metadata+hreflang',
  1,
  'insights,category,phase-11',
  'geoverity-600'
);

createBead(
  'geoverity-605',
  'Create Insights category - Research Integrity',
  'Build /insights/category/research-integrity/ (English+Spanish) focused on Research Tools: p-values, transparency, reproducibility, metadata+hreflang',
  1,
  'insights,category,phase-11',
  'geoverity-600'
);

createBead(
  'geoverity-610',
  'Create seed post - Why Trust is the New Academic Currency',
  'Build /insights/why-trust-is-the-new-academic-currency/ (English+Spanish) category academic-integrity, 1 paragraph, link to trust-as-currency spoke, CTA consultation, metadata+hreflang+JSON twin',
  1,
  'insights,posts,phase-11',
  'geoverity-601'
);

createBead(
  'geoverity-611',
  'Create seed post - Authorized LLMs in Graduate Education',
  'Build /insights/authorized-llms-graduate-education/ (English+Spanish) category academic-integrity, 1 paragraph, link to authorized-departmental-llms spoke, CTA, metadata+hreflang+JSON',
  1,
  'insights,posts,phase-11',
  'geoverity-601'
);

createBead(
  'geoverity-612',
  'Create seed post - Building Multilingual AI Without Bias',
  'Build /insights/building-multilingual-ai-without-bias/ (English+Spanish) category multilingual-data, 1 paragraph, link to data pillar, CTA, metadata+hreflang+JSON',
  2,
  'insights,posts,phase-11',
  'geoverity-603'
);

createBead(
  'geoverity-613',
  'Create seed post - The Case for Continuous AI Model Evaluation',
  'Build /insights/continuous-ai-model-evaluation/ (English+Spanish) category trust-and-evaluation, 1 paragraph, link to evaluation pillar, CTA, metadata+hreflang+JSON',
  2,
  'insights,posts,phase-11',
  'geoverity-604'
);

createBead(
  'geoverity-614',
  'Create seed post - AI Governance Frameworks for Universities',
  'Build /insights/ai-governance-frameworks-universities/ (English+Spanish) category ai-governance, 1 paragraph, link to governance pillar and campus-trust-charter, CTA, metadata+hreflang+JSON',
  2,
  'insights,posts,phase-11',
  'geoverity-602'
);

createBead(
  'geoverity-615',
  'Create seed post - P-Value Abuse and Research Integrity',
  'Build /insights/p-value-abuse-research-integrity/ (English+Spanish) category research-integrity, 1 paragraph, link to research-integrity-tools spoke, CTA, metadata+hreflang+JSON',
  2,
  'insights,posts,phase-11',
  'geoverity-605'
);

// 11.7: React Islands Placeholders (Future Phase)
createBead(
  'geoverity-700',
  'PLACEHOLDER - React Contact Form island',
  'Future: Build src/apps/ContactForm/ React island, mount in /contact/ and /es/contacto/ (beads 102,103), accessibility compliant, form validation, backend TBD. PLACEHOLDER TRACKING ONLY',
  3,
  'react,islands,future-phase,phase-11',
  'geoverity-102,geoverity-103'
);

createBead(
  'geoverity-701',
  'PLACEHOLDER - React P-Value Abuse Assessor island',
  'Future: Build src/apps/PValueAssessor/ React island, mount in research-integrity-tools (bead 207), statistical analysis, educational feedback. PLACEHOLDER TRACKING ONLY',
  3,
  'react,islands,future-phase,phase-11',
  'geoverity-207'
);

createBead(
  'geoverity-702',
  'PLACEHOLDER - React Bias/Drift Self-Checker island',
  'Future: Build src/apps/BiasChecker/ React island, mount in research-integrity-tools (bead 207), model bias detection, drift analysis. PLACEHOLDER TRACKING ONLY',
  3,
  'react,islands,future-phase,phase-11',
  'geoverity-207'
);

// 11.8: Cross-Cutting Validation
createBead(
  'geoverity-800',
  'Run localization validator on all new pages',
  'Execute node scripts/validate-localization.js: verify all pages have Spanish mirrors, hreflang bidirectional, translationStatus metadata, no failures',
  0,
  'validation,localization,phase-11',
  'geoverity-100,geoverity-110,geoverity-200,geoverity-300,geoverity-400,geoverity-500,geoverity-600'
);

createBead(
  'geoverity-801',
  'Run accessibility scan on all new pages',
  'Execute node scripts/accessibility_scan.js: verify mobile-first baseline, heading hierarchy, lang attributes, tap targets, no critical failures',
  0,
  'validation,accessibility,phase-11',
  'geoverity-100,geoverity-110,geoverity-200,geoverity-300,geoverity-400,geoverity-500,geoverity-600'
);

createBead(
  'geoverity-802',
  'Verify full Astro build with all new routes',
  'Execute npx astro build: all pages build without errors, check dist/ output, verify sitemap.xml includes all routes, verify robots.txt present',
  0,
  'validation,build,phase-11',
  'geoverity-104,geoverity-105,geoverity-800,geoverity-801'
);

createBead(
  'geoverity-803',
  'Run TypeScript strict mode check',
  'Execute npx tsc --noEmit: all new .astro and .ts files pass strict mode, no type errors',
  0,
  'validation,typescript,phase-11',
  'geoverity-802'
);

createBead(
  'geoverity-804',
  'Create Phase 11 completion verification report',
  'Generate Phase11-Verification-Report.txt: total pages count (English+Spanish), all validation results, beads completed list, placeholder beads list, sitemap/robots confirmation, Ready for Phase 12 statement',
  0,
  'validation,git,phase-11',
  'geoverity-803'
);

console.log('\n✓ Phase 11 bead creation complete!');
console.log('Run "bd list" to view all beads.');
