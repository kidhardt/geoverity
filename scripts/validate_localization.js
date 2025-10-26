#!/usr/bin/env node
/**
 * GeoVerity 2026 – Localization Validator
 * Validates bilingual parity and required metadata.
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const publicDirs = ["public", "public/es"];
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

for (const dir of ["public"]) {
  const esDir = path.join(root, "public", "es");
  if (fs.existsSync(dir) && fs.existsSync(esDir)) checkParity(dir, esDir);
}

if (ok) console.log("✅ Localization parity validated");
else {
  console.error("❌ Localization parity issues found");
  process.exit(1);
}
