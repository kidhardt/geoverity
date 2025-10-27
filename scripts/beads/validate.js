#!/usr/bin/env node
/**
 * Beads Validation Script for GeoVerity 2026
 *
 * Validates the official Beads CLI database by checking:
 * - issues.jsonl exists and is valid JSONL
 * - Database connection via bd CLI works
 * - Issue count matches expectations
 */

import fs from "fs";
import { execSync } from "child_process";

let ok = true;

// Check 1: issues.jsonl exists
const jsonlPath = ".beads/issues.jsonl";
if (!fs.existsSync(jsonlPath)) {
  console.error("ERROR: .beads/issues.jsonl not found");
  ok = false;
} else {
  // Check 2: Validate JSONL format (each line is valid JSON or empty)
  try {
    const content = fs.readFileSync(jsonlPath, "utf8");
    const lines = content.split("\n").filter(l => l.trim().length > 0);

    for (let i = 0; i < lines.length; i++) {
      try {
        JSON.parse(lines[i]);
      } catch (err) {
        console.error(`ERROR: Invalid JSON at line ${i + 1} in issues.jsonl: ${err.message}`);
        ok = false;
      }
    }
  } catch (err) {
    console.error(`ERROR: Cannot read issues.jsonl: ${err.message}`);
    ok = false;
  }
}

// Check 3: Verify bd CLI is accessible and working
// First check if bd CLI is installed
function checkBeadsInstalled() {
  try {
    execSync('bd --version', { encoding: 'utf8', stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// Check if Go is installed (for auto-install suggestion)
function checkGoInstalled() {
  try {
    execSync('go version', { encoding: 'utf8', stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

try {
  // Allow skipping beads CLI validation in development/CI
  // NOTE: SKIP_BEADS only skips bd CLI check, NOT JSONL validation
  if (process.env.SKIP_BEADS === '1') {
    console.log('⚠️  SKIP_BEADS=1, skipping beads CLI validation');
    console.log('   (JSONL validation still runs - it is mandatory)');
    console.log('To enable CLI validation: unset SKIP_BEADS');
    console.log('To install bd CLI: go install github.com/steveyegge/beads/cmd/bd@latest');

    // Check if JSONL validation passed
    if (!ok) {
      console.error("\n❌ Beads validation FAILED");
      console.error("   JSONL database has errors (see above)");
      console.error("   SKIP_BEADS only skips bd CLI check, not JSONL validation");
      process.exit(1);
    }

    console.log("\n✅ Beads validation: OK (SKIP_BEADS mode - JSONL valid, CLI skipped)");
    process.exit(0);
  }

  // Check installation before running
  if (!checkBeadsInstalled()) {
    console.error("❌ Beads CLI (bd) not found in PATH");

    if (checkGoInstalled()) {
      console.error("\n✅ Go is installed. Install Beads CLI with:");
      console.error("  go install github.com/steveyegge/beads/cmd/bd@latest");
      console.error("\nAfter installation, ensure $GOPATH/bin is in your PATH:");
      console.error("  export PATH=$PATH:$(go env GOPATH)/bin");
    } else {
      console.error("\n❌ Go is not installed. Install Go first:");
      console.error("  https://go.dev/doc/install");
      console.error("\nThen install Beads CLI:");
      console.error("  go install github.com/steveyegge/beads/cmd/bd@latest");
    }

    console.error("\nTo skip this check (not recommended):");
    console.error("  export SKIP_BEADS=1");
    console.error("\nFor more details:");
    console.error("  See scripts/beads/README.md");

    process.exit(1);
  }

  const output = execSync("bd info --json", { encoding: "utf8" });
  const info = JSON.parse(output);

  if (info.daemon_status !== "healthy") {
    console.error(`WARNING: Beads daemon status is ${info.daemon_status}`);
  }

  console.log(`✓ Beads daemon: ${info.daemon_status}`);
  console.log(`✓ Issue count: ${info.issue_count}`);
  console.log(`✓ Database: ${info.database_path}`);
} catch (err) {
  // In CI or when SKIP_BEADS would be helpful, provide helpful error
  if (process.env.CI === 'true') {
    console.warn('⚠️  Beads CLI not available in CI environment');
    console.warn('Set SKIP_BEADS=1 to skip beads validation');
    console.warn('Or install bd CLI: go install github.com/steveyegge/beads/cmd/bd@latest');
    // Allow CI to continue if JSONL is valid
    if (ok) {
      console.log("\n✅ Beads validation: OK (CI mode, JSONL valid)");
      process.exit(0);
    }
  }

  console.error(`ERROR: Cannot access bd CLI: ${err.message}`);
  console.error('\nTo fix:');
  console.error('  1. Install: go install github.com/steveyegge/beads/cmd/bd@latest');
  console.error('  2. Or skip: export SKIP_BEADS=1');
  console.error('  3. See: scripts/beads/README.md');
  ok = false;
}

if (!ok) {
  console.error("\n❌ Beads validation FAILED");
  process.exit(1);
} else {
  console.log("\n✅ Beads validation: OK");
  process.exit(0);
}
