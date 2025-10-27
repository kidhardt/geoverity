#!/usr/bin/env node
/**
 * GeoVerity 2026 – Accessibility Scanner (axe-core WCAG 2.2 AA)
 * Replaces Phase 2 stub with production-ready accessibility testing.
 *
 * Uses @axe-core/playwright to scan all HTML pages in build output
 * against WCAG 2.0, 2.1, and 2.2 Level AA standards.
 */
import fs from "fs";
import path from "path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BUILD_DIR = process.env.BUILD_DIR || 'dist';

if (!fs.existsSync(BUILD_DIR)) {
  console.error(`❌ Build directory not found: ${BUILD_DIR}`);
  console.error(`Run 'npm run build' first`);
  process.exit(1);
}

/**
 * Recursively find all HTML files in a directory
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      findHtmlFiles(fullPath, fileList);
    } else if (file.name.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

async function scanAccessibility() {
  console.log("🔍 GeoVerity Accessibility Scanner (axe-core WCAG 2.2 AA)\n");

  const htmlFiles = findHtmlFiles(BUILD_DIR);

  if (htmlFiles.length === 0) {
    console.error(`❌ No HTML files found in ${BUILD_DIR}`);
    process.exit(1);
  }

  console.log(`Found ${htmlFiles.length} HTML files to scan\n`);

  // Check if Playwright browsers are installed
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    if (error.message.includes('Executable doesn\'t exist') || error.message.includes('browserType.launch')) {
      console.error("❌ Playwright browsers not installed");
      console.error("\nInstallation required:");
      console.error("  npm install playwright");
      console.error("  npx playwright install chromium");
      console.error("\nAlternatively, install all browsers:");
      console.error("  npx playwright install");
      console.error("\nFor CI environments, see:");
      console.error("  https://playwright.dev/docs/ci");
      process.exit(1);
    }
    throw error; // Re-throw if it's a different error
  }
  const context = await browser.newContext();

  let totalViolations = 0;
  const violationsByFile = new Map();

  for (const file of htmlFiles) {
    const page = await context.newPage();
    const fileUrl = 'file://' + path.resolve(file);
    const relativePath = path.relative(BUILD_DIR, file);

    try {
      await page.goto(fileUrl, { waitUntil: 'networkidle' });

      // Run axe-core scan with WCAG 2.2 AA tags
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      if (results.violations.length > 0) {
        totalViolations += results.violations.length;
        violationsByFile.set(relativePath, results.violations);

        console.error(`\n❌ ${relativePath}: ${results.violations.length} violations`);

        // Group violations by impact
        const critical = results.violations.filter(v => v.impact === 'critical');
        const serious = results.violations.filter(v => v.impact === 'serious');
        const moderate = results.violations.filter(v => v.impact === 'moderate');
        const minor = results.violations.filter(v => v.impact === 'minor');

        if (critical.length > 0) console.error(`   🔴 Critical: ${critical.length}`);
        if (serious.length > 0) console.error(`   🟠 Serious: ${serious.length}`);
        if (moderate.length > 0) console.error(`   🟡 Moderate: ${moderate.length}`);
        if (minor.length > 0) console.error(`   ⚪ Minor: ${minor.length}`);

        // Show top 3 violations
        const topViolations = results.violations.slice(0, 3);
        for (const violation of topViolations) {
          console.error(`\n   ${violation.id}: ${violation.description}`);
          console.error(`   Impact: ${violation.impact} | WCAG: ${violation.tags.filter(t => t.startsWith('wcag')).join(', ')}`);
          console.error(`   Affected elements: ${violation.nodes.length}`);

          // Show first affected element
          if (violation.nodes.length > 0) {
            const node = violation.nodes[0];
            console.error(`   Example: ${node.html.substring(0, 100)}${node.html.length > 100 ? '...' : ''}`);
          }
        }

        if (results.violations.length > 3) {
          console.error(`   ... and ${results.violations.length - 3} more violations`);
        }
      } else {
        console.log(`✅ ${relativePath}: No violations`);
      }

    } catch (error) {
      console.error(`\n❌ Error scanning ${relativePath}:`);
      console.error(`   ${error.message}`);
      totalViolations++; // Count scan errors as violations
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log("\n" + "=".repeat(60));
  console.log("Accessibility Scan Summary");
  console.log("=".repeat(60));

  if (totalViolations === 0) {
    console.log("✅ All pages passed WCAG 2.2 AA accessibility standards");
    console.log(`   Scanned: ${htmlFiles.length} pages`);
    console.log(`   Standards: WCAG 2.0/2.1/2.2 Level AA`);
    process.exit(0);
  } else {
    console.error(`\n❌ Found ${totalViolations} accessibility violations across ${violationsByFile.size} files\n`);

    console.error("Files with violations:");
    for (const [file, violations] of violationsByFile) {
      const critical = violations.filter(v => v.impact === 'critical').length;
      const serious = violations.filter(v => v.impact === 'serious').length;
      console.error(`   ${file}: ${violations.length} violations (${critical} critical, ${serious} serious)`);
    }

    console.error("\nRemediation:");
    console.error("  1. Review violations above");
    console.error("  2. Fix critical and serious issues first");
    console.error("  3. Re-run 'npm run validate:accessibility'");
    console.error("  4. See: .claude/skills/building-pages/SKILL.md for WCAG compliance rules");
    console.error("\nWCAG 2.2 AA Reference: https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aa");

    process.exit(1);
  }
}

scanAccessibility().catch(error => {
  console.error("\n❌ Fatal error during accessibility scan:");
  console.error(error);
  process.exit(1);
});
