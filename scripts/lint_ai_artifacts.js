#!/usr/bin/env node
/**
 * GeoVerity 2026 – AI Artifact Content Linter (Pre-Commit)
 *
 * Flags obvious AI artifacts in staged content files before commit.
 * Works in tandem with checking-crappy-writing skill but provides fast feedback.
 *
 * This is a LIGHTWEIGHT check - full validation happens via checking-crappy-writing skill.
 */
import fs from 'fs';
import path from 'path';

// AI puffery vocabulary (from checking-crappy-writing Section 2)
const PUFFERY = [
  'pioneering', 'groundbreaking', 'seminal', 'acclaimed',
  'renowned', 'celebrated', 'transformative', 'dynamic',
  'revolutionary', 'cutting-edge', 'world-class', 'best-in-class',
  'industry-leading', 'award-winning'
];

// Templatey discourse markers (from checking-crappy-writing Section 4)
const TEMPLATEY_PATTERNS = [
  /\bnot just \w+,?\s+but\s+\w+/i,  // negative parallelism
  /\bthis isn't about \w+[-–—]it's about \w+/i,
  /\bmoreover,/gi,
  /\bfurthermore,/gi,
  /\bin conclusion,/gi,
  /\bultimately,/gi,
  /\boverall,/gi
];

// AI verbiage (from checking-crappy-writing Tier 1)
const AI_VERBIAGE = [
  'delve', 'delving',
  'intricate tapestry',
  'navigating the landscape',
  'multifaceted',
  'vibrant ecosystem'
];

// Meta-chatbot language (from checking-crappy-writing Section 7)
const META_CHATBOT = [
  'as an ai',
  'i cannot access',
  'as of my last training',
  'here is your requested',
  'happy to help'
];

/**
 * Scan file content for AI artifacts
 */
function scanFile(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`⚠️  Cannot read ${filePath}: ${err.message}`);
    return [];
  }

  const violations = [];
  const lowerContent = content.toLowerCase();

  // Check 1: Puffery
  for (const word of PUFFERY) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      violations.push({
        type: 'Section 2: Puffery',
        word: word,
        count: matches.length,
        severity: 'warning'
      });
    }
  }

  // Check 2: Templatey patterns
  for (const pattern of TEMPLATEY_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      violations.push({
        type: 'Section 4: Templatey Discourse',
        pattern: pattern.source,
        example: matches[0],
        severity: 'warning'
      });
    }
  }

  // Check 3: AI verbiage
  for (const phrase of AI_VERBIAGE) {
    if (lowerContent.includes(phrase.toLowerCase())) {
      violations.push({
        type: 'Tier 1: AI Verbiage',
        phrase: phrase,
        severity: 'warning'
      });
    }
  }

  // Check 4: Meta-chatbot language (CRITICAL)
  for (const phrase of META_CHATBOT) {
    if (lowerContent.includes(phrase)) {
      violations.push({
        type: 'Section 7: Meta-Chatbot Voice',
        phrase: phrase,
        severity: 'error'
      });
    }
  }

  // Check 5: Emoji detection (from Section 6)
  const emojiPattern = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojiMatches = content.match(emojiPattern);
  if (emojiMatches) {
    violations.push({
      type: 'Section 6: Formatting Artifacts',
      issue: `Emoji detected (${emojiMatches.length} instances)`,
      severity: 'error'
    });
  }

  return violations;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node lint_ai_artifacts.js <file1> <file2> ...');
    console.log('Scans staged content files for AI artifacts');
    process.exit(0);
  }

  let totalViolations = 0;
  const fileViolations = new Map();

  // Scan each file
  for (const file of args) {
    // Only scan content files
    const isContentFile = file.match(/\.(json|astro|ts|tsx|md)$/) && (
      file.includes('src/data/unstructured/') ||
      file.includes('src/pages/') ||
      file.includes('src/apps/') ||
      file.includes('README') ||
      file.includes('docs/')
    );

    if (!isContentFile) {
      continue;
    }

    if (!fs.existsSync(file)) {
      console.warn(`⚠️  File not found: ${file}`);
      continue;
    }

    const violations = scanFile(file);

    if (violations.length > 0) {
      fileViolations.set(file, violations);
      totalViolations += violations.length;
    }
  }

  // Report results
  if (totalViolations === 0) {
    console.log('✅ No obvious AI artifacts detected in staged content');
    process.exit(0);
  }

  console.error('\n⚠️  AI Artifact Linter detected potential issues:\n');

  for (const [file, violations] of fileViolations) {
    const relativePath = path.relative(process.cwd(), file);
    console.error(`📄 ${relativePath}:`);

    for (const violation of violations) {
      const icon = violation.severity === 'error' ? '🔴' : '🟡';
      console.error(`   ${icon} ${violation.type}`);

      if (violation.word) {
        console.error(`      Word: "${violation.word}" (${violation.count} instances)`);
      }
      if (violation.phrase) {
        console.error(`      Phrase: "${violation.phrase}"`);
      }
      if (violation.pattern) {
        console.error(`      Pattern: ${violation.pattern}`);
        console.error(`      Example: "${violation.example}"`);
      }
      if (violation.issue) {
        console.error(`      ${violation.issue}`);
      }
    }
    console.error('');
  }

  console.error(`Total: ${totalViolations} potential AI artifacts detected\n`);
  console.error('⚠️  REMINDER: This is a LIGHTWEIGHT pre-commit check');
  console.error('   For full validation, run:');
  console.error('   1. Invoke `languaging` skill');
  console.error('   2. Invoke `checking-crappy-writing` v1.3.0 skill (AUTO-FIX)');
  console.error('   3. Review auto-fixes and update provenance');
  console.error('   4. See: .claude/skills/checking-crappy-writing/SKILL.md\n');

  // Exit with error if critical issues found
  const hasCritical = Array.from(fileViolations.values())
    .flat()
    .some(v => v.severity === 'error');

  if (hasCritical) {
    console.error('❌ CRITICAL issues found - commit blocked');
    process.exit(1);
  } else {
    console.error('⚠️  Warnings detected - review recommended but commit allowed');
    process.exit(0);
  }
}

main();
