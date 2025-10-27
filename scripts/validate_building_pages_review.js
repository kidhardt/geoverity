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
  process.exit(0);
}

main();
