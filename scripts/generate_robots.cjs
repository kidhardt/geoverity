#!/usr/bin/env node
/**
 * Generate robots.txt for the built site
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const ROBOTS_PATH = path.join(DIST_DIR, 'robots.txt');
const BASE_URL = 'https://geoverity.com';

const robots = `# GeoVerity robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for well-behaved bots
Crawl-delay: 1
`;

fs.writeFileSync(ROBOTS_PATH, robots);
console.log(`✅ robots.txt generated`);
console.log(`   Location: ${ROBOTS_PATH}`);
