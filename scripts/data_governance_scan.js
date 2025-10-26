#!/usr/bin/env node
/**
 * GeoVerity 2026 – Governance Scanner
 * Ensures that all sensitive pages include lastReviewed and disclaimers.
 */
import fs from "fs";
import path from "path";

const twinFiles = fs.readdirSync("public").filter(f => f.endsWith(".json"));
let ok = true;

for (const file of twinFiles) {
  const data = JSON.parse(fs.readFileSync(path.join("public", file), "utf8"));
  if (data.legalSensitivity && !data.lastReviewed) {
    console.error(`Sensitive page missing lastReviewed: ${file}`);
    ok = false;
  }
  if (data.legalSensitivity && !data.disclaimer) {
    console.error(`Sensitive page missing disclaimer: ${file}`);
    ok = false;
  }
}
if (ok) console.log("✅ Governance scan passed");
else process.exit(1);
