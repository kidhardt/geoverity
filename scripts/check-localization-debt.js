#!/usr/bin/env node
/**
 * GeoVerity 2026
 * check-localization-debt.js
 *
 * Detects stale or placeholder translations and flags them.
 * Goal: prevent long-term localization debt.
 */

import fs from "fs";
import path from "path";

const contentDir = "src/data/unstructured";
const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".json"));

const now = new Date();
let debtFound = false;

function daysBetween(dateStr) {
  const d = new Date(dateStr);
  return Math.floor((now - d) / (1000 * 60 * 60 * 24));
}

for (const file of files) {
  const fullPath = path.join(contentDir, file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  const lang = file.includes(".es.") ? "es" : "en";
  if (data.translationStatus === "placeholder" || data.translationStatus === "needs-review") {
    console.error(`[DEBT] ${file} translationStatus=${data.translationStatus}`);
    debtFound = true;
  }
  if (data.lastReviewed && daysBetween(data.lastReviewed) > 90 && data.legalSensitivity) {
    console.warn(`[STALE] ${file} lastReviewed older than 90 days (${daysBetween(data.lastReviewed)} days)`);
    debtFound = true;
  }
}

if (debtFound) {
  console.error("❌ Localization or review debt detected.");
  process.exit(1);
} else {
  console.log("✅ All translations current and reviews within 90 days.");
  process.exit(0);
}
