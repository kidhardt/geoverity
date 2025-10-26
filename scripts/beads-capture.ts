#!/usr/bin/env tsx
/**
 * Beads Auto-Capture Script
 *
 * This script scans the codebase for untracked TODO/FIXME comments
 * and automatically creates beads issues for them.
 */

import { BeadsEnforcement } from '../src/beads/enforcement';
import { beads } from '../src/beads/wrapper';
import * as fs from 'fs';
import * as path from 'path';

const enforcement = new BeadsEnforcement({
  autoCaptureEnabled: true,
});

interface CaptureStats {
  filesScanned: number;
  issuesCreated: number;
  errors: number;
}

/**
 * Recursively scan directory for code files
 */
function* walkDirectory(dir: string): Generator<string> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip node_modules, .git, etc.
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.beads' || entry.name === 'dist') {
      continue;
    }

    if (entry.isDirectory()) {
      yield* walkDirectory(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      yield fullPath;
    }
  }
}

/**
 * Main capture function
 */
function main(): void {
  console.log('🔍 Scanning codebase for untracked TODO/FIXME comments...\n');

  const stats: CaptureStats = {
    filesScanned: 0,
    issuesCreated: 0,
    errors: 0,
  };

  const projectRoot = process.cwd();

  for (const filePath of walkDirectory(projectRoot)) {
    stats.filesScanned++;

    try {
      const createdIssues = enforcement.autoCaptureTodos(filePath);
      stats.issuesCreated += createdIssues.length;
    } catch (error) {
      stats.errors++;
      console.error(`✗ Error processing ${filePath}: ${error}`);
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Auto-Capture Summary');
  console.log('='.repeat(60));
  console.log(`Files scanned:     ${stats.filesScanned}`);
  console.log(`Issues created:    ${stats.issuesCreated}`);
  console.log(`Errors:            ${stats.errors}`);
  console.log('='.repeat(60));

  if (stats.issuesCreated > 0) {
    console.log('\n✅ Auto-capture complete! Run "bd list" to see all issues.');
    console.log('💡 Remember to update your TODO/FIXME comments with the issue IDs.');
  } else {
    console.log('\n✅ No untracked TODO/FIXME comments found!');
  }

  // Sync beads database
  console.log('\n🔄 Syncing beads database...');
  beads.sync();
  console.log('✅ Sync complete!\n');
}

// Run capture
main();
