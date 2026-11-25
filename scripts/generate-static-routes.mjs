import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');
const ssrEntryPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

if (!fs.existsSync(ssrEntryPath)) {
  console.error('Error: dist-ssr/entry-server.js not found. Run vite build --ssr first.');
  process.exit(1);
}

const { renderRoute, ALL_ARTICLES, CANONICAL_ORIGIN } = await import(
  pathToFileURL(ssrEntryPath).href
);

const baseHtml = fs.readFileSync(templatePath, 'utf-8');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildHtmlForRoute(routePath) {
  const { appHtml, head } = renderRoute(routePath);
  const safeTitle = escapeHtml(head.title);
  const safeDesc = escapeHtml(head.description);
  const safeAuthor = escapeHtml(head.author);
  const safeRobots = escapeHtml(head.robots);
  const safeImageAlt = escapeHtml(head.imageAlt);

  let html = baseHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+name="author"\s+content="[^"]*"\s*\/>/,
    `<meta name="author" content="${safeAuthor}" />`
  );
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/,
    `<meta name="robots" content="${safeRobots}" />`
  );

  if (head.noindex) {
    html = html.replace(/<link\s+rel="canonical"[^>]*\/>/, '');
  } else {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s+id="canonical-link"\s*\/>/,
      `<link rel="canonical" href="${head.canonicalUrl}" id="canonical-link" />`
    );
  }

  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${head.pageType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${head.canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${head.imageUrl}" />`
  );

  const matchedArticle = routePath.startsWith('/blog/')
    ? ALL_ARTICLES.find((a) => `/blog/${a.slug}` === routePath)
    : undefined;

  const articleOgTags = matchedArticle
    ? `\n    <meta property="article:published_time" content="${matchedArticle.isoDate}" />\n    <meta property="article:modified_time" content="${matchedArticle.isoDate}" />\n    <meta property="article:section" content="${escapeHtml(matchedArticle.category)}" />\n    <meta property="article:author" content="${safeAuthor}" />${[
        matchedArticle.primaryKeyword,
        ...matchedArticle.secondaryKeywords,
      ]
        .map((kw) => `\n    <meta property="article:tag" content="${escapeHtml(kw)}" />`)
        .join('')}`
    : '';

  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:alt" content="${safeImageAlt}" />
    <meta property="og:image:secure_url" content="${head.imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />${articleOgTags}`
  );

  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:url" content="${head.canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${head.imageUrl}" />
    <meta name="twitter:image:alt" content="${safeImageAlt}" />`
  );
  html = html.replace(
    /<script type="application\/ld\+json" id="schema-jsonld">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" id="schema-jsonld">\n${head.schemaJson}\n    </script>`
  );

  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return html;
}

// 1. Pre-render full SSR HTML for Homepage (/)
fs.writeFileSync(templatePath, buildHtmlForRoute('/'), 'utf-8');

// 2. Pre-render full SSR HTML for all sub-routes (5 core pages + all blog articles)
const CORE_SUB_ROUTES = [
  '/blog',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
];

const ALL_SUB_ROUTES = [
  ...CORE_SUB_ROUTES,
  ...ALL_ARTICLES.map((article) => `/blog/${article.slug}`),
];

for (const routePath of ALL_SUB_ROUTES) {
  const routeHtml = buildHtmlForRoute(routePath);
  const relativePath = routePath.replace(/^\/+/, '');

  // Directory index: dist/<route>/index.html
  const routeDir = path.join(distDir, relativePath);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf-8');

  // Clean URL HTML file: dist/<route>.html
  const htmlFilePath = path.join(distDir, `${relativePath}.html`);
  fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
  fs.writeFileSync(htmlFilePath, routeHtml, 'utf-8');
}

// 3. Pre-render genuine branded 404.html (with noindex, nofollow & no canonical tag)
const notFoundHtml = buildHtmlForRoute('/404-not-found');
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

// 4. Auto-generate up-to-date sitemap.xml (synced into both public/ and dist/)
const latestArticleDate =
  ALL_ARTICLES.map((a) => a.isoDate).sort().reverse()[0] || '2026-09-25';

const coreSitemapEntries = [
  { loc: `${CANONICAL_ORIGIN}/`, lastmod: latestArticleDate, changefreq: 'weekly', priority: '1.0' },
  { loc: `${CANONICAL_ORIGIN}/blog`, lastmod: latestArticleDate, changefreq: 'weekly', priority: '0.9' },
  { loc: `${CANONICAL_ORIGIN}/about`, lastmod: '2026-09-01', changefreq: 'monthly', priority: '0.7' },
  { loc: `${CANONICAL_ORIGIN}/contact`, lastmod: '2026-09-01', changefreq: 'monthly', priority: '0.6' },
  { loc: `${CANONICAL_ORIGIN}/privacy-policy`, lastmod: '2026-09-01', changefreq: 'yearly', priority: '0.3' },
  { loc: `${CANONICAL_ORIGIN}/terms-and-conditions`, lastmod: '2026-09-01', changefreq: 'yearly', priority: '0.3' },
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Core Website Pages -->
${coreSitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}

  <!-- Published Digital Marketing & SEO Blog Articles (${ALL_ARTICLES.length}) -->
${ALL_ARTICLES.map(
  (article) => `  <url>
    <loc>${escapeXml(`${CANONICAL_ORIGIN}/blog/${article.slug}`)}</loc>
    <lastmod>${article.isoDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(`${CANONICAL_ORIGIN}/images/photos/${article.slug}.jpg`)}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
      <image:caption>${escapeXml(article.imageAlt)}</image:caption>
    </image:image>
  </url>`
).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

// 5. Auto-generate RSS 2.0 feed (rss.xml) in public/ and dist/ for rapid crawler discovery
const rssItemsXml = ALL_ARTICLES.map((article) => {
  const url = `${CANONICAL_ORIGIN}/blog/${article.slug}`;
  const pubDate = new Date(`${article.isoDate}T08:00:00Z`).toUTCString();
  return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <description>${escapeXml(article.metaDescription)}</description>
    </item>`;
}).join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Digital Pulse — Digital Marketing, SEO &amp; Social Media Blog</title>
    <link>${CANONICAL_ORIGIN}/</link>
    <description>Research-backed guides on digital marketing, SEO, social media algorithms, AI tools, and online business strategy.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${CANONICAL_ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
${rssItemsXml}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml, 'utf-8');
fs.writeFileSync(path.join(distDir, 'rss.xml'), rssXml, 'utf-8');

console.log(
  `SSR Static Build Complete: Pre-rendered Homepage + ${ALL_SUB_ROUTES.length} sub-routes + branded 404.html + auto-synced sitemap.xml (${
    coreSitemapEntries.length + ALL_ARTICLES.length
  } URLs) + rss.xml`
);
