#!/usr/bin/env tsx
/**
 * Beads Validation Pre-commit Hook
 *
 * This script validates that commits follow beads tracking requirements.
 * It runs automatically before commits via git hooks.
 */

import { BeadsEnforcement } from '../src/beads/enforcement';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const enforcement = new BeadsEnforcement();

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Get the commit message (for commit-msg hook)
 */
function getCommitMessage(): string | null {
  const commitMsgFile = process.argv[2];
  if (commitMsgFile && fs.existsSync(commitMsgFile)) {
    return fs.readFileSync(commitMsgFile, 'utf-8').trim();
  }
  return null;
}

/**
 * Get the current branch name
 */
function getCurrentBranch(): string {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return 'unknown';
  }
}

/**
 * Get list of staged files
 */
function getStagedFiles(): string[] {
  try {
    const output = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
    return output.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Validate commit message
 */
function validateCommitMessage(message: string): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: [],
  };

  const validation = enforcement.validateCommitMessage(message);
  if (!validation.valid) {
    result.passed = false;
    result.errors.push(`❌ Commit message validation failed: ${validation.error}`);
    result.errors.push('   Format: bd-123: Your commit message');
    result.errors.push('   Example: bd-42: Add user authentication feature');
  }

  return result;
}

/**
 * Validate branch name
 */
function validateBranchName(branchName: string): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: [],
  };

  const validation = enforcement.validateBranchName(branchName);
  if (!validation.valid) {
    result.passed = false;
    result.errors.push(`❌ Branch name validation failed: ${validation.error}`);
    result.errors.push('   Format: bd-123-feature-name');
    result.errors.push('   Example: bd-42-user-authentication');
  }

  return result;
}

/**
 * Validate staged code files
 */
function validateStagedFiles(files: string[]): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: [],
  };

  const codeFiles = files.filter((file) => /\.(ts|tsx|js|jsx)$/.test(file));

  for (const file of codeFiles) {
    const filePath = path.resolve(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      continue; // File was deleted
    }

    const validation = enforcement.validateCodeComments(filePath);

    if (!validation.valid) {
      result.errors.push(`\n❌ ${file}:`);

      for (const violation of validation.violations) {
        result.errors.push(
          `   Line ${violation.line}: ${violation.type} comment must reference a beads issue`
        );
        result.errors.push(`   "${violation.text}"`);
        result.errors.push(`   Format: ${violation.type}: bd-123 description`);
      }
    }
  }

  if (result.errors.length > 0) {
    result.passed = false;
    result.errors.push('\n💡 Tip: Run "npm run beads:capture" to auto-create issues for untracked comments');
  }

  return result;
}

/**
 * Main validation function
 */
function main(): void {
  console.log('🔍 Running beads validation...\n');

  const results: ValidationResult[] = [];

  // Validate branch name
  const branchName = getCurrentBranch();
  console.log(`📌 Branch: ${branchName}`);
  results.push(validateBranchName(branchName));

  // Validate commit message (if available)
  const commitMessage = getCommitMessage();
  if (commitMessage) {
    console.log(`💬 Commit message: ${commitMessage.split('\n')[0]}`);
    results.push(validateCommitMessage(commitMessage));
  }

  // Validate staged files
  const stagedFiles = getStagedFiles();
  if (stagedFiles.length > 0) {
    console.log(`📝 Validating ${stagedFiles.length} staged file(s)...`);
    results.push(validateStagedFiles(stagedFiles));
  }

  // Aggregate results
  const allPassed = results.every((r) => r.passed);
  const allErrors = results.flatMap((r) => r.errors);
  const allWarnings = results.flatMap((r) => r.warnings);

  // Print warnings
  if (allWarnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    allWarnings.forEach((w) => console.log(w));
  }

  // Print errors
  if (!allPassed) {
    console.log('\n❌ Validation failed:\n');
    allErrors.forEach((e) => console.log(e));
    console.log('\n');
    process.exit(1);
  }

  console.log('\n✅ All beads validations passed!\n');
  process.exit(0);
}

// Run validation
main();
