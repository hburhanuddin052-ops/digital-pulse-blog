import fs from 'node:fs';
import path from 'node:path';

const SITE_ORIGIN = 'https://digital-pulse-blog.vercel.app';
const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(templatePath, 'utf-8');

/**
 * All 15 sub-routes (5 core pages + all 10 blog article routes)
 * generated as physical HTML files inside dist/ alongside root dist/index.html
 * so direct browser access on Vercel or any static host always resolves with HTTP 200 OK.
 */
const ROUTES = [
  {
    routePath: '/blog',
    type: 'website',
    title: 'Digital Marketing Articles & SEO Guides | Digital Pulse',
    description:
      'Browse all 10 original digital marketing articles, step-by-step SEO tutorials, and social media guides written for students, founders, and small businesses.',
    keywords: 'digital marketing articles, SEO tutorials, social media guides',
  },
  {
    routePath: '/about',
    type: 'website',
    title: 'About Our Digital Marketing Publication | Digital Pulse',
    description:
      'Learn about Digital Pulse, an independent digital marketing publication dedicated to primary-source editorial standards and marketing education for students.',
    keywords: 'digital marketing publication, editorial standards, marketing education for students',
  },
  {
    routePath: '/contact',
    type: 'website',
    title: 'Contact Digital Pulse Editorial Team & Feedback Desk',
    description:
      'Contact the Digital Pulse editorial team with reader feedback, marketing topic suggestions, press inquiries, or source corrections. We reply in 24–48 hours.',
    keywords: 'contact Digital Pulse editorial team, reader feedback, marketing topic suggestions',
  },
  {
    routePath: '/privacy-policy',
    type: 'website',
    title: 'Digital Pulse Privacy Policy & First-Party Data Terms',
    description:
      'Read the official Digital Pulse privacy policy covering first-party data privacy, newsletter subscriber rights, contact inquiries, and search analytics.',
    keywords: 'Digital Pulse privacy policy, first-party data privacy, newsletter subscriber rights',
  },
  {
    routePath: '/terms-and-conditions',
    type: 'website',
    title: 'Digital Pulse Terms and Conditions & Citation Guidelines',
    description:
      'Review the Digital Pulse terms and conditions, including our editorial citation policy, intellectual property rules, and educational content disclaimer.',
    keywords: 'Digital Pulse terms and conditions, editorial citation policy, educational content disclaimer',
  },
  // All 10 Blog Articles
  {
    routePath: '/blog/digital-marketing-trends-2026',
    type: 'article',
    title: '10 Digital Marketing Trends 2026: Strategy Guide | DP',
    description:
      'Discover the top 10 digital marketing trends 2026 businesses need to watch, including first-party data strategy, social commerce growth, AI workflows, and SEO.',
    keywords: 'digital marketing trends 2026, first-party data strategy, social commerce growth',
  },
  {
    routePath: '/blog/how-social-media-algorithms-work',
    type: 'article',
    title: 'How Social Media Algorithms Work & Rank Your Content',
    description:
      'Learn how social media algorithms work across Instagram, TikTok, and YouTube, including how feed recommendation systems score video watch time signals.',
    keywords: 'how social media algorithms work, feed recommendation systems, video watch time signals',
  },
  {
    routePath: '/blog/seo-for-beginners-how-google-ranks-websites',
    type: 'article',
    title: 'SEO for Beginners: How Google Ranks Websites Step by Step',
    description:
      'Master SEO for beginners with this step-by-step guide explaining how Google ranks websites through crawling, indexing, search intent optimization, and links.',
    keywords: 'SEO for beginners, how Google ranks websites, search intent optimization',
  },
  {
    routePath: '/blog/how-ai-is-changing-digital-marketing',
    type: 'article',
    title: 'AI in Digital Marketing: Workflows, Benefits & Key Risks',
    description:
      'Explore how AI in digital marketing improves marketing workflow automation, ad targeting, and data analysis while still requiring human editorial oversight.',
    keywords: 'AI in digital marketing, marketing workflow automation, human editorial oversight',
  },
  {
    routePath: '/blog/instagram-marketing-for-small-businesses',
    type: 'article',
    title: 'Instagram Marketing for Small Businesses: Complete Guide',
    description:
      'A practical guide to Instagram marketing for small businesses covering bio optimization, Instagram Reels strategy, carousel engagement tips, UGC, and Insights.',
    keywords: 'Instagram marketing for small businesses, Instagram Reels strategy, carousel engagement tips',
  },
  {
    routePath: '/blog/why-short-form-video-is-so-powerful',
    type: 'article',
    title: 'Short-Form Video Marketing: Why Vertical Video Converts',
    description:
      'Learn why short-form video marketing dominates attention, how vertical video retention works on TikTok, Reels, and Shorts, and how to write strong video hooks.',
    keywords: 'short-form video marketing, vertical video retention, TikTok Reels Shorts strategy',
  },
  {
    routePath: '/blog/common-digital-marketing-mistakes-small-businesses',
    type: 'article',
    title: '10 Small Business Digital Marketing Mistakes to Avoid',
    description:
      'Avoid the 10 most costly small business digital marketing mistakes, from buying fake followers to neglecting website conversion optimization and local search.',
    keywords: 'small business digital marketing mistakes, local marketing ROI, website conversion optimization',
  },
  {
    routePath: '/blog/how-online-reviews-influence-customer-decisions',
    type: 'article',
    title: 'How Online Reviews Influence Customers & Build Trust',
    description:
      'Understand how online reviews influence customers through customer social proof, star rating credibility, FTC fake review rules, and responding to criticism.',
    keywords: 'how online reviews influence customers, customer social proof, responding to negative reviews',
  },
  {
    routePath: '/blog/how-to-build-a-personal-brand-from-scratch',
    type: 'article',
    title: 'How to Build a Personal Brand From Scratch: Step-by-Step',
    description:
      'Learn how to build a personal brand from scratch with this practical guide covering personal branding for students, content pillars, and portfolio strategy.',
    keywords: 'how to build a personal brand, personal branding for students, online portfolio strategy',
  },
  {
    routePath: '/blog/fake-news-misinformation-brand-reputation',
    type: 'article',
    title: 'Misinformation and Brand Reputation: Crisis Defense Guide',
    description:
      'Examine how misinformation and brand reputation intersect online, the difference between disinformation vs misinformation, and how to build a crisis plan.',
    keywords: 'misinformation and brand reputation, brand crisis communication, disinformation vs misinformation',
  },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildRouteHtml(route) {
  const canonicalUrl = `${SITE_ORIGIN}${route.routePath}`;
  const safeTitle = escapeHtml(route.title);
  const safeDesc = escapeHtml(route.description);
  const safeKeywords = escapeHtml(route.keywords);

  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/,
    `<meta name="keywords" content="${safeKeywords}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s+id="canonical-link"\s*\/>/,
    `<link rel="canonical" href="${canonicalUrl}" id="canonical-link" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${route.type}" />`
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
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );

  return html;
}

for (const route of ROUTES) {
  const routeHtml = buildRouteHtml(route);
  const relativePath = route.routePath.replace(/^\/+/, '');

  // 1. Create dist/<route>/index.html (directory-style static resolution on Vercel & static hosts)
  const routeDir = path.join(distDir, relativePath);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf-8');

  // 2. Create dist/<route>.html (cleanUrls / .html fallback resolution)
  const htmlFilePath = path.join(distDir, `${relativePath}.html`);
  fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
  fs.writeFileSync(htmlFilePath, routeHtml, 'utf-8');
}

// 3. Create dist/404.html SPA fallback
fs.writeFileSync(path.join(distDir, '404.html'), baseHtml, 'utf-8');

console.log(`Generated ${ROUTES.length} static route HTML bundles (5 core pages + 10 blog routes) + 404.html in dist/`);
