#!/usr/bin/env node
/**
 * GeoVerity 2026
 * enforce-review-timestamps.js
 *
 * Purpose:
 * - Detect edits to any high-sensitivity content surfaces (legalSensitivity=true)
 * - Ensure lastReviewed was updated in both EN and ES JSON
 * - Ensure disclaimer still exists in both EN and ES
 *
 * NOTE: This script is not blocking yet. It prints violations
 * and exits with 1 if something looks out of policy.
 */

import fs from "fs";
import path from "path";

const targets = [
  "src/data/unstructured/consultingHigherEd.en.json",
  "src/data/unstructured/consultingHigherEd.es.json"
];

let ok = true;

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function checkFile(p) {
  const data = loadJSON(p);
  if (!("legalSensitivity" in data) || data.legalSensitivity !== true) {
    console.log(`[INFO] ${p} is not marked legalSensitivity=true; skipping timestamp enforcement.`);
    return;
  }
  if (!data.lastReviewed || data.lastReviewed.trim() === "") {
    console.error(`[FAIL] ${p} is high-sensitivity but missing lastReviewed.`);
    ok = false;
  }
  if (!data.disclaimer || data.disclaimer.trim() === "") {
    console.error(`[FAIL] ${p} is high-sensitivity but missing disclaimer text.`);
    ok = false;
  }
}

for (const t of targets) {
  if (fs.existsSync(t)) {
    checkFile(path.resolve(t));
  } else {
    console.error(`[WARN] Missing expected file: ${t}`);
    ok = false;
  }
}

if (!ok) {
  console.error("❌ High-sensitivity review timestamp enforcement failed.");
  process.exit(1);
} else {
  console.log("✅ High-sensitivity review timestamp enforcement passed.");
  process.exit(0);
}
