#!/usr/bin/env node
/**
 * GeoVerity 2026 – Sitemap Generator
 * Generates bilingual XML sitemaps for EN and ES routes.
 */
import fs from "fs";
import path from "path";

const baseUrl = "https://geoverity.com"; // Update with actual domain
const publicDir = "public";
const esDir = path.join(publicDir, "es");

function scanHtmlFiles(dir, lang = "en") {
  const prefix = lang === "es" ? "/es" : "";
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const urls = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory() && file.name !== "es") {
      urls.push(...scanHtmlFiles(fullPath, lang));
    } else if (file.name.endsWith(".html")) {
      const relativePath = path
        .relative(publicDir, fullPath)
        .replace(/\\/g, "/")
        .replace(/\.html$/, "")
        .replace(/index$/, "");
      const url = `${baseUrl}${prefix}/${relativePath}`.replace(/\/$/, "") || `${baseUrl}${prefix}/`;
      urls.push(url);
    }
  }
  return urls;
}

function generateSitemap(urls) {
  const now = new Date().toISOString().split("T")[0];
  const entries = urls
    .map(
      (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

// Generate EN sitemap
const enUrls = scanHtmlFiles(publicDir, "en");
const enSitemap = generateSitemap(enUrls);
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), enSitemap);
console.log(`✅ Generated EN sitemap with ${enUrls.length} URLs`);

// Generate ES sitemap
if (fs.existsSync(esDir)) {
  const esUrls = scanHtmlFiles(esDir, "es");
  const esSitemap = generateSitemap(esUrls);
  fs.writeFileSync(path.join(esDir, "sitemap.xml"), esSitemap);
  console.log(`✅ Generated ES sitemap with ${esUrls.length} URLs`);
}
