const fs = require('fs');
const path = require('path');

// Website configuration
const SITE_URL = 'https://mycompany.com';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Define all routes with their properties
const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/services',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/courses',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Generate XML sitemap content
function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${route.url}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

// Write sitemap to file
function writeSitemap() {
  try {
    const sitemapContent = generateSitemap();
    
    // Ensure the public directory exists
    const publicDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(OUTPUT_PATH, sitemapContent, 'utf8');
    console.log(`✅ Sitemap generated successfully at: ${OUTPUT_PATH}`);
    console.log(`📊 Generated ${routes.length} URLs`);
    
    // Log the routes for verification
    console.log('\n📋 Sitemap URLs:');
    routes.forEach(route => {
      console.log(`   ${SITE_URL}${route.url} (Priority: ${route.priority})`);
    });
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

// Run the sitemap generator
if (require.main === module) {
  console.log('🚀 Generating sitemap...');
  writeSitemap();
}

module.exports = { generateSitemap, writeSitemap, routes };