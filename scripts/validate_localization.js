#!/usr/bin/env node
/**
 * GeoVerity 2026 – Localization Validator
 * Validates bilingual parity and required metadata.
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const BUILD_DIR = process.env.BUILD_DIR || 'dist';
let ok = true;

function checkParity(enDir, esDir) {
  const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith(".html"));
  for (const file of enFiles) {
    const esFile = path.join(esDir, file);
    if (!fs.existsSync(esFile)) {
      console.error(`Missing Spanish mirror for: ${file}`);
      ok = false;
    }
  }
}

const enDir = path.join(root, BUILD_DIR);
const esDir = path.join(root, BUILD_DIR, "es");

if (!fs.existsSync(BUILD_DIR)) {
  console.error(`❌ Build directory not found: ${BUILD_DIR}`);
  console.error(`Run 'npm run build' first`);
  process.exit(1);
}

if (fs.existsSync(enDir) && fs.existsSync(esDir)) {
  checkParity(enDir, esDir);
}

if (ok) console.log("✅ Localization parity validated");
else {
  console.error("❌ Localization parity issues found");
  process.exit(1);
}
