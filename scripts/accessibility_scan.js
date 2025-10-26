#!/usr/bin/env node
/**
 * GeoVerity 2026 – Accessibility Scanner (Phase 2 Stub)
 * Checks for required attributes in HTML pages.
 */
import fs from "fs";
import path from "path";

const htmlFiles = fs.readdirSync("public").filter(f => f.endsWith(".html"));
let ok = true;

for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join("public", file), "utf8");
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
