#!/usr/bin/env node
/**
 * GeoVerity 2026 – Localization Validator
 * Validates bilingual parity across all 58 pages.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const BUILD_DIR = process.env.BUILD_DIR || 'dist';
const distPath = path.join(root, BUILD_DIR);

let ok = true;
const enRoutes = [];
const esRoutes = [];

function findHtmlFiles(dir, routeList, prefix = '', excludeDirs = []) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === '_astro' || excludeDirs.includes(entry.name)) continue;
      findHtmlFiles(fullPath, routeList, path.join(prefix, entry.name), excludeDirs);
    } else if (entry.isFile() && entry.name === 'index.html') {
      const route = prefix ? `/${prefix.split(path.sep).join('/')}/` : '/';
      routeList.push(route);
    }
  }
}

if (!fs.existsSync(distPath)) {
  console.error(`❌ Build directory not found: ${BUILD_DIR}`);
  console.error(`Run 'npm run build' first`);
  process.exit(1);
}

// Find EN routes (exclude /es/ directory)
findHtmlFiles(distPath, enRoutes, '', ['es']);

// Find ES routes
const esPath = path.join(distPath, 'es');
if (fs.existsSync(esPath)) {
  findHtmlFiles(esPath, esRoutes);
}

console.log(`Found ${enRoutes.length} English routes`);
console.log(`Found ${esRoutes.length} Spanish routes`);

// Check for missing Spanish mirrors
const missingSpanish = [];
for (const enRoute of enRoutes) {
  if (enRoute.includes('/placeholder/')) continue;
  if (!esRoutes.includes(enRoute)) {
    missingSpanish.push(enRoute);
    ok = false;
  }
}

// Check for orphaned Spanish pages
const orphanedSpanish = [];
for (const esRoute of esRoutes) {
  if (!enRoutes.includes(esRoute)) {
    orphanedSpanish.push(esRoute);
    ok = false;
  }
}

if (missingSpanish.length > 0) {
  console.error(`\n❌ Missing Spanish mirrors (${missingSpanish.length}):`);
  missingSpanish.forEach(r => console.error(`   ${r} → /es${r}`));
}

if (orphanedSpanish.length > 0) {
  console.error(`\n❌ Orphaned Spanish pages (${orphanedSpanish.length}):`);
  orphanedSpanish.forEach(r => console.error(`   /es${r} (no English original)`));
}

if (ok) {
  console.log(`\n✅ Localization parity validated - ${enRoutes.length} pages with EN/ES mirrors`);
  process.exit(0);
} else {
  console.error(`\n❌ Localization parity issues found`);
  process.exit(1);
}
