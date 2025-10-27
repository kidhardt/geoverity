#!/usr/bin/env node
/**
 * GeoVerity 2026 - Building Pages Compliance Review Validator
 *
 * Parses PR description or file for the Building Pages Compliance Review template.
 * Fails if:
 * - Template is missing when layout/component files changed
 * - Template format is invalid
 * - Any check is marked FAIL
 * - Final verdict is not "PASS - Ready to ship"
 *
 * Refinements:
 * - Uses merge-base for accurate diff detection
 * - Reads from PR_BODY env var, file, or template fallback
 * - Gracefully handles missing pull_request payload
 */

import fs from "fs";
import { execSync } from "child_process";

const PROTECTED_PATHS = [
  "src/layouts/",
  "src/components/sections/",
  "src/pages/",
  "public/index.html"
];

const CONTENT_PATHS = [
  "src/data/unstructured/",
  "src/pages/",
  "src/apps/"
];

const REQUIRED_SECTIONS = [
  "Metrics Check",
  "Accessibility and Interaction Check",
  "Localization Check",
  "Progressive Enhancement Check",
  "Final Verdict"
];

const RED_FLAG_PHRASES = [
  "fix later",
  "phase 2",
  "coming soon",
  "not critical",
  "skip for now",
  "temporarily disabled",
  "will add",
  "todo:",
  "hack:",
  "workaround"
];

function parseReviewTemplate(content) {
  // Find the review block - capture everything until next ## heading or three dashes (---) or end
  const reviewMatch = content.match(/##\s+Building Pages Compliance Review([\s\S]*?)(?=\n---|\n##\s+[^#]|$)/i);
  if (!reviewMatch) {
    return { found: false, error: "Compliance review template not found" };
  }

  const review = reviewMatch[1];
  const results = {
    found: true,
    sections: {},
    verdict: null,
    redFlags: [],
    failures: []
  };

  // Parse each required section
  for (const section of REQUIRED_SECTIONS) {
    if (!review.includes(section)) {
      results.failures.push(`Missing section: ${section}`);
    }
  }

  // Extract PASS/FAIL verdicts
  const lines = review.split('\n');
  for (const line of lines) {
    if (line.includes('FAIL') && !line.includes('PASS/FAIL')) {
      results.failures.push(line.trim());
    }
  }

  // Extract final verdict
  const verdictMatch = review.match(/\*\*(PASS - Ready to ship|THIS CANNOT SHIP)\*\*/);
  if (!verdictMatch) {
    results.failures.push("Missing or invalid final verdict");
  } else {
    results.verdict = verdictMatch[1];
  }

  // Check for red flag phrases in entire content
  const lowerContent = content.toLowerCase();
  for (const phrase of RED_FLAG_PHRASES) {
    if (lowerContent.includes(phrase)) {
      results.redFlags.push(`Found red flag phrase: "${phrase}"`);
    }
  }

  return results;
}

function parseWritingQualityReview(content) {
  // Find the Writing Quality Review block (v1.3.0)
  const reviewMatch = content.match(/##\s+Writing Quality Review \(checking-crappy-writing v1\.3\.0\)([\s\S]*?)(?=\n---|\n##\s+[^#]|$)/i);
  if (!reviewMatch) {
    return { found: false, error: "Writing Quality Review v1.3.0 template not found" };
  }

  const review = reviewMatch[1];
  const results = {
    found: true,
    verdict: null,
    autoFixSummary: null,
    provenanceChecked: false,
    failures: []
  };

  // Check 1: Auto-Fix Summary must not be placeholder
  const autoFixTable = review.match(/\|\s*Field\s*\|\s*Original Text \(excerpt\)\s*\|\s*Fixed Text \(excerpt\)\s*\|\s*Violations Fixed\s*\|/i);
  if (!autoFixTable) {
    results.failures.push("Auto-Fix Summary table missing or malformed");
  } else {
    // Check if table has been filled (not empty placeholder)
    const tableRows = review.match(/\|[^|]+\|[^|]+\|[^|]+\|[^|]+\|/g);
    if (!tableRows || tableRows.length <= 2) { // Header + separator only
      // This is acceptable if "No auto-fixes needed" is stated
      if (!review.includes("No auto-fixes needed")) {
        results.failures.push("Auto-Fix Summary table appears empty - fill with actual fixes or write 'No auto-fixes needed'");
      }
    }
  }

  // Check 2: Total Auto-Fixes must be updated from placeholder
  const totalFixesMatch = review.match(/\*\*Total Auto-Fixes:\*\*\s*(\d+)\s*violations fixed across\s*(\d+)\s*fields/i);
  if (!totalFixesMatch) {
    results.failures.push("Total Auto-Fixes count missing");
  }

  // Check 3: Items Requiring Manual Review must be filled
  const manualReviewSection = review.match(/###\s*Items Requiring Manual Review([\s\S]*?)###\s*Provenance Attestation/i);
  if (manualReviewSection) {
    const manualContent = manualReviewSection[1].trim();
    // Check if it's just a placeholder dash or empty
    if (!manualContent || manualContent === '-' || manualContent.length < 10) {
      results.failures.push("Items Requiring Manual Review section empty - fill or write 'None - all violations auto-fixed'");
    }
  }

  // Check 4: Provenance Attestation must be completed
  const provenanceChecks = [
    "All `ai-generated-fixed` fields reviewed and approved by human",
    "All provenance fields updated",
    "All `_meta.contentStatus` set to",
    "Ran `npm run validate:governance`"
  ];

  let allProvenanceChecked = true;
  for (const check of provenanceChecks) {
    const checkPattern = new RegExp(`- \\[x\\].*${check.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
    if (!checkPattern.test(review)) {
      results.failures.push(`Provenance Attestation incomplete: "${check}" not checked`);
      allProvenanceChecked = false;
    }
  }
  results.provenanceChecked = allProvenanceChecked;

  // Check 5: Section 1-12 Final Check must have explicit PASS or FAIL
  const requiredChecks = [
    "No hallucinated/broken/misaligned citations",
    "No puffery or promotional vocabulary",
    "No vague opinion attribution",
    "No templatey discourse markers or negative parallelism",
    "No register drift or identity drift",
    "No formatting/typography artifacts",
    "No meta-chatbot voice",
    "No abrupt cutoffs or fragmented sections",
    "No structural repetition",
    "No anti-detection evasion artifacts"
  ];

  for (const check of requiredChecks) {
    // Look for checkbox with → **[PASS/FAIL]:** format
    const checkPattern = new RegExp(`- \\[ \\].*${check.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*→\\s*\\*\\*\\[(PASS|FAIL)\\]:\\*\\*`, 'i');
    if (!checkPattern.test(review)) {
      results.failures.push(`Section 1-12: "${check}" not marked with PASS or FAIL`);
    } else {
      // Check if it's marked FAIL
      const failPattern = new RegExp(`- \\[ \\].*${check.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*→\\s*\\*\\*\\[FAIL\\]:\\*\\*`, 'i');
      if (failPattern.test(review)) {
        results.failures.push(`Section 1-12: "${check}" is marked FAIL`);
      }
    }
  }

  // Check 6: Tier checks must have PASS/FAIL
  const tierChecks = [
    "Tier 1: Lexical & Phrasal Scan",
    "Tier 2: Syntactic & Structural Patterns",
    "Tier 3: Semantic & Content Analysis",
    "Tier 4: Technical & Factual Verification"
  ];

  for (const tier of tierChecks) {
    const tierPattern = new RegExp(`- \\[ \\]\\s*${tier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*→\\s*\\*\\*\\[(PASS|FAIL)\\]:\\*\\*`, 'i');
    if (!tierPattern.test(review)) {
      results.failures.push(`Tier Detection: "${tier}" not marked with PASS or FAIL`);
    }
  }

  // Check 7: Register Compliance must have PASS/FAIL
  const registerPattern = /- \[ \]\s*`languaging` skill applied.*→\s*\*\*\[(PASS|FAIL)\]:\*\*/i;
  if (!registerPattern.test(review)) {
    results.failures.push("Register Compliance: languaging skill not marked with PASS or FAIL");
  }

  // Check 8: Final verdict must be checked
  const verdictChecked = /- \[x\] \*\*PASS - Content ready to publish\*\*/i.test(review);
  const verdictFailChecked = /- \[x\] \*\*FAIL - Fix violations and re-run checks\*\*/i.test(review);

  if (verdictChecked) {
    results.verdict = "PASS - Content ready to publish";
  } else if (verdictFailChecked) {
    results.verdict = "FAIL - Fix violations and re-run checks";
    results.failures.push("Final verdict is FAIL - cannot merge");
  } else {
    results.failures.push("Final verdict not checked - must check ONE box");
  }

  return results;
}

function getChangedFiles() {
  try {
    // Use merge-base to compare against origin/master (or main)
    let baseBranch = 'origin/master';

    // Detect default branch name
    try {
      const defaultBranch = execSync("git symbolic-ref refs/remotes/origin/HEAD", {
        encoding: "utf8",
        stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
      })
        .trim()
        .replace('refs/remotes/origin/', '');
      baseBranch = `origin/${defaultBranch}`;
    } catch {
      // Fall back to trying origin/main, then origin/master, then master, then main
      const candidates = ['origin/main', 'origin/master', 'master', 'main'];
      for (const branch of candidates) {
        try {
          execSync(`git rev-parse ${branch}`, {
            encoding: "utf8",
            stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
          });
          baseBranch = branch;
          break;
        } catch {
          continue;
        }
      }
    }

    const mergeBase = execSync(`git merge-base HEAD ${baseBranch}`, {
      encoding: "utf8",
      stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
    }).trim();
    const output = execSync(`git diff --name-only ${mergeBase} HEAD`, { encoding: "utf8" });
    return output.split('\n').filter(f => f.trim().length > 0);
  } catch (err) {
    // Fallback: try HEAD~1 comparison
    try {
      const output = execSync("git diff --name-only HEAD~1 HEAD", {
        encoding: "utf8",
        stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
      });
      return output.split('\n').filter(f => f.trim().length > 0);
    } catch {
      // Final fallback: assume no changes (validation will skip)
      return [];
    }
  }
}

function requiresReview(files) {
  return files.some(file =>
    PROTECTED_PATHS.some(path => file.startsWith(path))
  );
}

function requiresWritingQualityReview(files) {
  return files.some(file => {
    // Check if file is a content file
    const isContentPath = CONTENT_PATHS.some(path => file.startsWith(path));
    // Filter for specific content file types
    const isContentFile = file.match(/\.(json|astro|ts)$/) && (
      file.includes('src/data/unstructured/') ||
      file.includes('src/pages/') ||
      file.includes('src/apps/') && file.includes('manifest')
    );
    return isContentPath && isContentFile;
  });
}

function getReviewContent() {
  // Priority 1: Environment variable (GitHub Actions)
  if (process.env.PR_BODY) {
    return { source: 'PR_BODY env var', content: process.env.PR_BODY };
  }

  // Priority 2: Explicit file (staging area)
  if (fs.existsSync(".github/pr_description.md")) {
    return {
      source: '.github/pr_description.md',
      content: fs.readFileSync(".github/pr_description.md", "utf8")
    };
  }

  // Priority 3: Pull request template (fallback)
  if (fs.existsSync(".github/PULL_REQUEST_TEMPLATE.md")) {
    return {
      source: '.github/PULL_REQUEST_TEMPLATE.md (fallback)',
      content: fs.readFileSync(".github/PULL_REQUEST_TEMPLATE.md", "utf8")
    };
  }

  return { source: 'none', content: '' };
}

function main() {
  console.log("🔍 Building Pages Compliance Review Validator\n");

  const changedFiles = getChangedFiles();
  const needsReview = requiresReview(changedFiles);

  const protectedFilesChanged = changedFiles.filter(f =>
    PROTECTED_PATHS.some(p => f.startsWith(p))
  );

  if (protectedFilesChanged.length > 0) {
    console.log("📋 Protected files changed:");
    protectedFilesChanged.forEach(f => console.log(`   - ${f}`));
  } else {
    console.log("✅ No protected files changed - review not required\n");
    process.exit(0);
  }

  console.log("\n🔍 Validating compliance review...\n");

  const { source, content } = getReviewContent();
  console.log(`📄 Reading review from: ${source}\n`);

  if (!content) {
    console.error("❌ FAIL: No review content found\n");
    console.error("Protected files were modified but no Building Pages Compliance Review found.");
    console.error("\nExpected review in one of:");
    console.error("  - PR_BODY environment variable (GitHub Actions)");
    console.error("  - .github/pr_description.md");
    console.error("  - .github/PULL_REQUEST_TEMPLATE.md (filled out)");
    console.error("\nSee .claude/workflows/page-templating.md for the required workflow.");
    console.error("See .claude/skills/building-pages/SKILL.md for the template format.");
    process.exit(1);
  }

  const review = parseReviewTemplate(content);

  if (!review.found) {
    console.error("❌ FAIL: " + review.error + "\n");
    console.error("Protected files were modified but compliance review template is missing.\n");
    console.error("Required template structure:");
    console.error("  ## Building Pages Compliance Review");
    console.error("  ### Metrics Check");
    console.error("  ### Accessibility and Interaction Check");
    console.error("  ### Localization Check");
    console.error("  ### Progressive Enhancement Check");
    console.error("  ### Final Verdict\n");
    console.error("See .claude/skills/building-pages/SKILL.md for complete template.");
    process.exit(1);
  }

  let hasErrors = false;

  if (review.failures.length > 0) {
    console.error("❌ FAIL: Compliance review has issues:\n");
    review.failures.forEach(f => console.error(`  - ${f}`));
    console.error("");
    hasErrors = true;
  }

  if (review.redFlags.length > 0) {
    console.warn("⚠️  WARNING: Red flags detected:\n");
    review.redFlags.forEach(f => console.warn(`  - ${f}`));
    console.warn("\nRed flag phrases suggest deferred compliance.");
    console.warn("GeoVerity requires accessibility, performance, and localization from day one.\n");
    // Red flags are warnings, not hard failures (for now)
  }

  if (review.verdict !== "PASS - Ready to ship") {
    console.error(`❌ FAIL: Final verdict is "${review.verdict}"\n`);
    console.error("Compliance review must show 'PASS - Ready to ship' to merge.\n");
    hasErrors = true;
  }

  if (hasErrors) {
    console.error("Remediate issues and update the review before merging.");
    console.error("Workflow: .claude/workflows/page-templating.md");
    console.error("Template: .claude/skills/building-pages/SKILL.md");
    process.exit(1);
  }

  console.log("✅ Building Pages compliance review validated");
  console.log(`   Verdict: ${review.verdict}`);
  console.log(`   Source: ${source}\n`);

  // Check if Writing Quality Review is required
  const contentFilesChanged = changedFiles.filter(f =>
    CONTENT_PATHS.some(p => f.startsWith(p)) && f.match(/\.(json|astro|ts)$/)
  );

  if (contentFilesChanged.length > 0) {
    console.log("📝 Content files changed - validating Writing Quality Review...\n");
    contentFilesChanged.forEach(f => console.log(`   - ${f}`));
    console.log("");

    const writingReview = parseWritingQualityReview(content);

    if (!writingReview.found) {
      console.error("❌ FAIL: " + writingReview.error + "\n");
      console.error("Content files were modified but Writing Quality Review is missing.\n");
      console.error("Required when modifying:");
      console.error("  - src/data/unstructured/*.json");
      console.error("  - src/pages/**/*.astro (with content changes)");
      console.error("  - src/apps/*/manifest.ts\n");
      console.error("See .claude/skills/checking-crappy-writing/SKILL.md");
      console.error("See docs/Checking-Crappy-Writing-Integration-Plan.md");
      process.exit(1);
    }

    if (writingReview.failures.length > 0) {
      console.error("❌ FAIL: Writing Quality Review has issues:\n");
      writingReview.failures.forEach(f => console.error(`  - ${f}`));
      console.error("");
      console.error("All checks must be marked **PASS** before merging.\n");
      process.exit(1);
    }

    if (writingReview.verdict !== "PASS - Content ready to publish") {
      console.error(`❌ FAIL: Writing Quality verdict is "${writingReview.verdict}"\n`);
      console.error("Content must pass both 'languaging' and 'checking-crappy-writing' v1.3.0 skills.\n");
      console.error("Auto-fix workflow: AI fixes → user reviews → provenance updated → approved.\n");
      console.error("See: .claude/skills/checking-crappy-writing/SKILL.md v1.3.0\n");
      process.exit(1);
    }

    if (!writingReview.provenanceChecked) {
      console.error("❌ FAIL: Provenance attestation incomplete\n");
      console.error("All content must have provenance tracking and human approval.\n");
      console.error("See: src/data/structured/models.ts ProvenanceMetadata\n");
      process.exit(1);
    }

    console.log("✅ Writing Quality Review v1.3.0 validated");
    console.log(`   Verdict: ${writingReview.verdict}`);
    console.log(`   Provenance attestation: ${writingReview.provenanceChecked ? 'COMPLETE' : 'INCOMPLETE'}`);
    console.log("");
  }

  process.exit(0);
}

main();
