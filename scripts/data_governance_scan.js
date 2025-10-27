#!/usr/bin/env node
/**
 * GeoVerity 2026 – Governance Scanner (v1.3.0)
 * Ensures that all sensitive pages include lastReviewed and disclaimers.
 * NOW INCLUDES: Content provenance tracking validation
 */
import fs from "fs";
import path from "path";

const BUILD_DIR = process.env.BUILD_DIR || 'dist';

if (!fs.existsSync(BUILD_DIR)) {
  console.error(`❌ Build directory not found: ${BUILD_DIR}`);
  console.error(`Run 'npm run build' first`);
  process.exit(1);
}

/**
 * Recursively find all JSON files in a directory
 */
function findJsonFiles(dir, fileList = []) {
  let files;
  try {
    files = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.warn(`⚠️  Warning: Cannot read directory ${dir}: ${err.message}`);
    return fileList;
  }

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    try {
      if (file.isDirectory()) {
        findJsonFiles(filePath, fileList);
      } else if (file.name.endsWith('.json')) {
        fileList.push(filePath);
      }
    } catch (err) {
      console.warn(`⚠️  Warning: Cannot access ${filePath}: ${err.message}`);
      continue;
    }
  }

  return fileList;
}

const twinFiles = findJsonFiles(BUILD_DIR);
let ok = true;

/**
 * Validate content provenance metadata (v1.3.0)
 * Ensures all text fields have provenance tracking and human review
 */
function validateProvenance(data, filename) {
  // Text fields that should have provenance tracking
  const textFields = ['title', 'summary', 'disclaimer', 'description', 'name'];

  for (const field of textFields) {
    // Check all language variants (_en, _es)
    const variants = [`${field}`, `${field}_en`, `${field}_es`];

    for (const variant of variants) {
      if (data[variant] && typeof data[variant] === 'string') {
        const provenanceField = `${variant}_provenance`;

        if (!data[provenanceField]) {
          console.warn(`⚠️  ${filename}: Field "${variant}" missing provenance tracking`);
          console.warn(`   Add provenance metadata per src/data/structured/models.ts`);
        } else {
          const prov = data[provenanceField];

          // Check 1: Block AI-generated content without human review
          if (prov.provenance === 'ai-generated' || prov.provenance === 'ai-generated-fixed') {
            console.error(`❌ ${filename}: Field "${variant}" not human-reviewed`);
            console.error(`   Provenance: ${prov.provenance}`);
            console.error(`   Action: Review content and set provenance to "human-edited"`);
            console.error(`   See: .claude/skills/checking-crappy-writing/SKILL.md v1.3.0`);
            ok = false;
          }

          // Check 2: Validate provenance enum
          const validProvenances = ['ai-generated', 'ai-generated-fixed', 'human-edited', 'human-verified'];
          if (!validProvenances.includes(prov.provenance)) {
            console.error(`❌ ${filename}: Invalid provenance value "${prov.provenance}" for field "${variant}"`);
            console.error(`   Valid values: ${validProvenances.join(', ')}`);
            ok = false;
          }

          // Check 3: Validate lastEdited timestamp
          if (!prov.lastEdited) {
            console.error(`❌ ${filename}: Field "${variant}" missing lastEdited timestamp`);
            ok = false;
          } else {
            try {
              new Date(prov.lastEdited); // Validate ISO 8601
            } catch (e) {
              console.error(`❌ ${filename}: Field "${variant}" has invalid lastEdited timestamp: ${prov.lastEdited}`);
              ok = false;
            }
          }
        }
      }
    }
  }

  // Check 4: Validate _meta.contentStatus
  if (!data._meta) {
    console.error(`❌ ${filename}: Missing _meta object`);
    console.error(`   Add: "_meta": { "contentStatus": "approved", "reviewedBy": "human" }`);
    ok = false;
  } else {
    if (data._meta.contentStatus !== 'approved') {
      console.error(`❌ ${filename}: Content not approved for publication`);
      console.error(`   Status: ${data._meta.contentStatus}`);
      console.error(`   Action: Review content and set _meta.contentStatus to "approved"`);
      ok = false;
    }

    // Check 5: Validate contentStatus enum
    const validStatuses = ['requires-review', 'approved'];
    if (!validStatuses.includes(data._meta.contentStatus)) {
      console.error(`❌ ${filename}: Invalid contentStatus "${data._meta.contentStatus}"`);
      console.error(`   Valid values: ${validStatuses.join(', ')}`);
      ok = false;
    }
  }
}

for (const filePath of twinFiles) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const relPath = path.relative(BUILD_DIR, filePath);

  // Existing checks for legal sensitivity
  if (data.legalSensitivity && !data.lastReviewed) {
    console.error(`❌ ${relPath}: Sensitive page missing lastReviewed`);
    ok = false;
  }
  if (data.legalSensitivity && !data.disclaimer) {
    console.error(`❌ ${relPath}: Sensitive page missing disclaimer`);
    ok = false;
  }

  // NEW: Provenance validation (v1.3.0)
  validateProvenance(data, relPath);
}

if (ok) {
  console.log("✅ Governance scan passed (with provenance tracking v1.3.0)");
} else {
  console.error("\n❌ Governance scan FAILED");
  console.error("Fix provenance issues before committing");
  console.error("See: .claude/skills/checking-crappy-writing/SKILL.md v1.3.0");
  process.exit(1);
}
