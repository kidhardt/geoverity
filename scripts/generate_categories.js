#!/usr/bin/env node
/**
 * GeoVerity 2026 – Category Index Generator
 * Builds category index pages from JSON twin metadata.
 */
import fs from "fs";
import path from "path";

const publicDir = "public";
const esDir = path.join(publicDir, "es");

function collectPagesByCategory(dir, lang = "en") {
  const categories = {};
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (data.category) {
      if (!categories[data.category]) {
        categories[data.category] = [];
      }
      categories[data.category].push({
        title: data.title || file.replace(".json", ""),
        route: data.route || `/${file.replace(".json", ".html")}`,
        description: data.description || "",
      });
    }
  }

  return categories;
}

function generateCategoryHtml(category, pages, lang = "en") {
  const title = lang === "es" ? `Categoría: ${category}` : `Category: ${category}`;
  const items = pages
    .map(
      (page) => `    <li>
      <a href="${page.route}">${page.title}</a>
      ${page.description ? `<p>${page.description}</p>` : ""}
    </li>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
  <h1>${title}</h1>
  <ul>
${items}
  </ul>
</body>
</html>`;
}

// Generate EN category pages
const enCategories = collectPagesByCategory(publicDir, "en");
for (const [category, pages] of Object.entries(enCategories)) {
  const html = generateCategoryHtml(category, pages, "en");
  const outputPath = path.join(publicDir, `category-${category}.html`);
  fs.writeFileSync(outputPath, html);
  console.log(`✅ Generated EN category page: ${category} (${pages.length} pages)`);
}

// Generate ES category pages
if (fs.existsSync(esDir)) {
  const esCategories = collectPagesByCategory(esDir, "es");
  for (const [category, pages] of Object.entries(esCategories)) {
    const html = generateCategoryHtml(category, pages, "es");
    const outputPath = path.join(esDir, `category-${category}.html`);
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Generated ES category page: ${category} (${pages.length} pages)`);
  }
}

console.log("✅ Category index generation complete");
