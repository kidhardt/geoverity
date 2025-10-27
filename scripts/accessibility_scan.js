#!/usr/bin/env node
/**
 * GeoVerity 2026 – Accessibility Scanner (Phase 2 Stub)
 * Checks for required attributes in HTML pages.
 */
import fs from "fs";
import path from "path";

const BUILD_DIR = process.env.BUILD_DIR || 'dist';

if (!fs.existsSync(BUILD_DIR)) {
  console.error(`❌ Build directory not found: ${BUILD_DIR}`);
  console.error(`Run 'npm run build' first`);
  process.exit(1);
}

const htmlFiles = fs.readdirSync(BUILD_DIR).filter(f => f.endsWith(".html"));
let ok = true;

for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(BUILD_DIR, file), "utf8");
  if (!content.includes("<html lang=")) {
    console.error(`Missing lang attribute in ${file}`);
    ok = false;
  }
  if (!content.match(/alt\s*=\s*"/)) {
    console.warn(`No alt text found in ${file}`);
  }
}
if (ok) console.log("✅ Accessibility scan passed (Phase 2 stub)");
else process.exit(1);
