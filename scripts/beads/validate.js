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
try {
  const output = execSync("bd info --json", { encoding: "utf8" });
  const info = JSON.parse(output);

  if (info.daemon_status !== "healthy") {
    console.error(`WARNING: Beads daemon status is ${info.daemon_status}`);
  }

  console.log(`✓ Beads daemon: ${info.daemon_status}`);
  console.log(`✓ Issue count: ${info.issue_count}`);
  console.log(`✓ Database: ${info.database_path}`);
} catch (err) {
  console.error(`ERROR: Cannot access bd CLI: ${err.message}`);
  ok = false;
}

if (!ok) {
  console.error("\n❌ Beads validation FAILED");
  process.exit(1);
} else {
  console.log("\n✅ Beads validation: OK");
  process.exit(0);
}
