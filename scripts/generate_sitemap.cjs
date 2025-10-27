#!/usr/bin/env node
/**
 * Generate sitemap.xml from built HTML files
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const BASE_URL = 'https://geoverity.com';

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file === 'index.html') {
      const relativePath = path.relative(DIST_DIR, filePath);
      const urlPath = relativePath.replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\/$/, '');
      fileList.push(urlPath);
    }
  });
  
  return fileList;
}

const pages = getAllHtmlFiles(DIST_DIR);
const lastmod = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}/${page}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(SITEMAP_PATH, sitemap);
console.log(`✅ Sitemap generated: ${pages.length} pages`);
console.log(`   Location: ${SITEMAP_PATH}`);
