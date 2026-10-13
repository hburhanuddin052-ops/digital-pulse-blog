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
 * so direct browser access on Vercel or any static host always resolves with HTTP 200 OK
 * and search crawlers see full metadata, Schema.org JSON-LD, H1/H2 headings, and internal links in static HTML.
 */
const ROUTES = [
  {
    routePath: '/blog',
    type: 'website',
    title: 'Digital Marketing Articles & SEO Guides | Digital Pulse',
    h1: 'Digital Marketing Articles, SEO Tutorials & Social Media Guides',
    description:
      'Browse all 10 original digital marketing articles, step-by-step SEO tutorials, and social media guides written for students, founders, and small businesses.',
    keywords: 'digital marketing articles, SEO tutorials, social media guides',
    image: '/images/photos/digital-marketing-trends-2026.jpg',
    imageAlt: 'Laptop on a wooden desk displaying website traffic charts and campaign analytics',
    intro:
      'Explore all 10 original, research-backed digital marketing articles, step-by-step SEO tutorials, and social media guides published by the Digital Pulse editorial desk.',
    headings: ['10 Published Digital Marketing Articles & Guides'],
    internalLinks: [
      { href: '/blog/digital-marketing-trends-2026', text: '10 Digital Marketing Trends 2026 Businesses Should Watch' },
      { href: '/blog/how-social-media-algorithms-work', text: 'How Social Media Algorithms Work: How Feeds Rank Content' },
      { href: '/blog/seo-for-beginners-how-google-ranks-websites', text: 'SEO for Beginners: How Google Ranks Websites Step by Step' },
    ],
  },
  {
    routePath: '/about',
    type: 'website',
    title: 'About Our Digital Marketing Publication | Digital Pulse',
    h1: 'An Independent Digital Marketing Publication Built for Clarity',
    description:
      'Learn about Digital Pulse, an independent digital marketing publication dedicated to primary-source editorial standards and marketing education for students.',
    keywords: 'digital marketing publication, editorial standards, marketing education for students',
    image: '/images/photos/digital-marketing-trends-2026.jpg',
    imageAlt: 'Laptop on a wooden desk displaying website traffic charts and campaign analytics',
    intro:
      'Digital Pulse is an independent digital marketing publication dedicated to strict editorial standards and accessible marketing education for students, founders, and small business owners.',
    headings: [
      'Why We Built This Digital Marketing Publication',
      'Core Topics & Marketing Education for Students',
      'Our Editorial Standards & Primary-Source Verification',
      'Meet the Digital Pulse Editorial Team',
    ],
    internalLinks: [
      { href: '/blog', text: 'Browse all 10 digital marketing articles and SEO guides' },
      { href: '/contact', text: 'Contact the Digital Pulse editorial team' },
    ],
  },
  {
    routePath: '/contact',
    type: 'website',
    title: 'Contact Digital Pulse Editorial Team & Feedback Desk',
    h1: 'Contact the Digital Pulse Editorial Team',
    description:
      'Contact the Digital Pulse editorial team with reader feedback, marketing topic suggestions, press inquiries, or source corrections. We reply in 24–48 hours.',
    keywords: 'contact Digital Pulse editorial team, reader feedback, marketing topic suggestions',
    image: '/images/photos/digital-marketing-trends-2026.jpg',
    imageAlt: 'Laptop on a wooden desk displaying website traffic charts and campaign analytics',
    intro:
      'Whether you want to contact the Digital Pulse editorial team with reader feedback, submit marketing topic suggestions, or flag a source update, our editors read every message.',
    headings: ['Send Reader Feedback or Marketing Topic Suggestions', 'Editorial Desk Contact Information'],
    internalLinks: [
      { href: '/blog', text: 'Explore all 10 digital marketing articles' },
      { href: '/about', text: 'Read about our editorial standards' },
    ],
  },
  {
    routePath: '/privacy-policy',
    type: 'website',
    title: 'Digital Pulse Privacy Policy & First-Party Data Terms',
    h1: 'Digital Pulse Privacy Policy & First-Party Data Practices',
    description:
      'Read the official Digital Pulse privacy policy covering first-party data privacy, newsletter subscriber rights, contact inquiries, and search analytics.',
    keywords: 'Digital Pulse privacy policy, first-party data privacy, newsletter subscriber rights',
    image: '/images/photos/digital-marketing-trends-2026.jpg',
    imageAlt: 'Laptop on a wooden desk displaying website traffic charts and campaign analytics',
    intro:
      'This Digital Pulse privacy policy explains our commitment to first-party data privacy, how we handle voluntary contact and newsletter submissions, and your newsletter subscriber rights.',
    headings: [
      '1. Information We Collect (First-Party Data Privacy)',
      '2. Analytics, Search Console & Cookies',
      '3. Third-Party Links & External Citations',
      '4. Newsletter Subscriber Rights & Data Deletion',
    ],
    internalLinks: [
      { href: '/terms-and-conditions', text: 'Review Digital Pulse Terms and Conditions' },
      { href: '/contact', text: 'Contact the Digital Pulse editorial team' },
    ],
  },
  {
    routePath: '/terms-and-conditions',
    type: 'website',
    title: 'Digital Pulse Terms and Conditions & Citation Guidelines',
    h1: 'Digital Pulse Terms and Conditions',
    description:
      'Review the Digital Pulse terms and conditions, including our editorial citation policy, intellectual property rules, and educational content disclaimer.',
    keywords: 'Digital Pulse terms and conditions, editorial citation policy, educational content disclaimer',
    image: '/images/photos/digital-marketing-trends-2026.jpg',
    imageAlt: 'Laptop on a wooden desk displaying website traffic charts and campaign analytics',
    intro:
      'Please read these Digital Pulse terms and conditions carefully before using our website, citing our articles, or applying our educational marketing guides.',
    headings: [
      '1. Educational Content Disclaimer',
      '2. Intellectual Property & Editorial Citation Policy',
      '3. External Links & Third-Party Research',
      '4. Changes to These Terms',
    ],
    internalLinks: [
      { href: '/privacy-policy', text: 'Read the Digital Pulse Privacy Policy' },
      { href: '/blog', text: 'Browse all 10 digital marketing articles' },
    ],
  },
  // All 10 Blog Articles
  {
    routePath: '/blog/digital-marketing-trends-2026',
    type: 'article',
    title: '10 Digital Marketing Trends 2026: Full Strategy Guide',
    h1: '10 Digital Marketing Trends 2026 Businesses Should Watch',
    description:
      'Discover the top 10 digital marketing trends 2026 businesses need to watch, including first-party data strategy, social commerce growth, AI workflows, and SEO.',
    keywords: 'digital marketing trends 2026, first-party data strategy, social commerce growth',
    publishedAt: '2026-09-24',
    author: 'Maya Lin',
    category: 'Digital Marketing',
    image: '/images/photos/digital-marketing-trends-2026.jpg',
    imageAlt: 'Laptop on a wooden desk displaying website traffic charts and campaign analytics',
    intro:
      'Evaluating the most effective digital marketing trends 2026 has to offer starts with recognizing a fundamental shift: third-party tracking cookies and generic blog posts no longer guarantee customer acquisition.',
    headings: [
      'How Do AI Tools Support Digital Marketing Workflows Without Replacing Humans?',
      'Why Is Short-Form Video Still the Fastest Organic Discovery Channel?',
      'How Is Search Behavior Changing Across Google and Social Media Platforms?',
      'Why Is First-Party Data Strategy Essential for Online Businesses?',
      'How Can Brands Personalize Marketing Without Invasive Tracking?',
      'How Does Social Commerce Growth Reduce Mobile Checkout Friction?',
      'Why Do Long-Term Micro-Creator Partnerships Outperform One-Off Ads?',
      'What Is Conversational Marketing in Direct Messaging and Live Chat?',
      'FTC Disclosure Rules, Review Transparency, and Website Customer Experience',
    ],
    internalLinks: [
      { href: '/blog/how-ai-is-changing-digital-marketing', text: 'how AI in digital marketing improves workflows without replacing human judgment' },
      { href: '/blog/why-short-form-video-is-so-powerful', text: 'short-form video marketing and how to structure high-retention video hooks' },
      { href: '/blog/seo-for-beginners-how-google-ranks-websites', text: 'SEO for beginners and how Google crawls, indexes, and ranks websites' },
      { href: '/blog/how-online-reviews-influence-customer-decisions', text: 'how online reviews influence customers and purchasing decisions' },
    ],
  },
  {
    routePath: '/blog/how-social-media-algorithms-work',
    type: 'article',
    title: 'How Social Media Algorithms Work & Rank Your Content',
    h1: 'How Social Media Algorithms Work: How Feeds Rank Content',
    description:
      'Learn how social media algorithms work across Instagram, TikTok, and YouTube, including how feed recommendation systems score video watch time signals.',
    keywords: 'how social media algorithms work, feed recommendation systems, video watch time signals',
    publishedAt: '2026-09-19',
    author: 'Priya Patel',
    category: 'Social Media',
    image: '/images/photos/how-social-media-algorithms-work.jpg',
    imageAlt: 'Person holding a smartphone browsing mobile social media applications and feed notifications',
    intro:
      'Understanding how social media algorithms work starts with dispelling a common myth: platforms like Instagram, TikTok, YouTube, and LinkedIn do not use a single master algorithm. Instead, each app runs multiple feed recommendation systems tailored to how people use specific surfaces.',
    headings: [
      'How Do Feed Recommendation Systems Filter Billions of Social Posts?',
      'What Is the Difference Between Follower Feeds and Discovery Feeds?',
      'Which Engagement and Video Watch Time Signals Matter Most?',
      'How Does Your Personal Browsing Behavior Shape Your Feed?',
      'Why Does Content Go Viral on Social Media?',
      'Practical Checklist for Improving Organic Social Reach',
    ],
    internalLinks: [
      { href: '/blog/why-short-form-video-is-so-powerful', text: 'short-form video marketing and vertical video retention' },
      { href: '/blog/digital-marketing-trends-2026', text: '10 digital marketing trends 2026 businesses should watch' },
      { href: '/blog/instagram-marketing-for-small-businesses', text: 'practical guide to Instagram marketing for small businesses' },
    ],
  },
  {
    routePath: '/blog/seo-for-beginners-how-google-ranks-websites',
    type: 'article',
    title: 'SEO for Beginners: How Google Ranks Websites Step by Step',
    h1: 'SEO for Beginners: How Google Ranks Websites Step by Step',
    description:
      'Master SEO for beginners with this step-by-step guide explaining how Google ranks websites through crawling, indexing, search intent optimization, and links.',
    keywords: 'SEO for beginners, how Google ranks websites, search intent optimization',
    publishedAt: '2026-09-14',
    author: 'Lucas Vance',
    category: 'SEO & Search',
    image: '/images/photos/seo-for-beginners-how-google-ranks-websites.jpg',
    imageAlt: 'Marketer working on a laptop displaying Google Analytics and search engine traffic data',
    intro:
      'Learning SEO for beginners starts with a simple truth: when you launch a new website, search engines do not automatically know it exists or trust its content. For your pages to appear when customers search online, search engines must first crawl, index, and rank your URLs.',
    headings: [
      'How Does Google Search Crawl, Index, and Rank Websites?',
      'What Is Search Intent Optimization and Why Does It Matter?',
      'Which On-Page SEO Elements Should Every Webpage Include?',
      'What Is Technical SEO and How Does It Help Search Crawlers?',
      'How Do Backlinks and Helpful Content Influence Google Rankings?',
      'Setting Up Google Search Console to Monitor SEO Performance',
    ],
    internalLinks: [
      { href: '/blog/how-to-build-a-personal-brand-from-scratch', text: 'how to build a personal brand from scratch with an SEO portfolio' },
      { href: '/blog/common-digital-marketing-mistakes-small-businesses', text: '10 small business digital marketing mistakes and how to fix them' },
      { href: '/blog/digital-marketing-trends-2026', text: '10 digital marketing trends 2026 businesses should watch' },
    ],
  },
  {
    routePath: '/blog/how-ai-is-changing-digital-marketing',
    type: 'article',
    title: 'AI in Digital Marketing: Workflows, Benefits & Key Risks',
    h1: 'AI in Digital Marketing: How Automation Changes Workflows',
    description:
      'Explore how AI in digital marketing improves marketing workflow automation, ad targeting, and data analysis while still requiring human editorial oversight.',
    keywords: 'AI in digital marketing, marketing workflow automation, human editorial oversight',
    publishedAt: '2026-09-08',
    author: 'Lucas Vance',
    category: 'Technology & AI',
    image: '/images/photos/how-ai-is-changing-digital-marketing.jpg',
    imageAlt: 'High-resolution monitor displaying data dashboards, predictive metrics, and performance graphs',
    intro:
      'Applying AI in digital marketing effectively begins with recognizing that machine learning has powered search engine rankings, email spam filters, and automated ad bidding for over a decade. Used responsibly, marketing workflow automation reduces repetitive busywork while human editorial oversight ensures accuracy.',
    headings: [
      'How Should Marketers Use AI Content Tools Without Losing Quality?',
      'How Does AI Improve Personalization in Email and E-Commerce?',
      'When Should Customer Service Use AI Chat vs. Human Support?',
      'How Has Machine Learning Changed Paid Advertising Campaigns?',
      'How Can Small Teams Use AI for Marketing Data Analysis?',
      'What Are the Main Risks of Using AI in Digital Marketing?',
      'Balancing AI Speed With Human Editorial Judgment',
    ],
    internalLinks: [
      { href: '/blog/seo-for-beginners-how-google-ranks-websites', text: 'SEO for beginners and Google’s helpful content standards' },
      { href: '/blog/digital-marketing-trends-2026', text: '10 digital marketing trends 2026 and first-party data strategy' },
      { href: '/blog/fake-news-misinformation-brand-reputation', text: 'misinformation and brand reputation crisis defense' },
    ],
  },
  {
    routePath: '/blog/instagram-marketing-for-small-businesses',
    type: 'article',
    title: 'Instagram Marketing for Small Businesses: Complete Guide',
    h1: 'Instagram Marketing for Small Businesses: A Practical Guide',
    description:
      'A practical guide to Instagram marketing for small businesses covering bio optimization, Instagram Reels strategy, carousel engagement tips, UGC, and Insights.',
    keywords: 'Instagram marketing for small businesses, Instagram Reels strategy, carousel engagement tips',
    publishedAt: '2026-08-29',
    author: 'Priya Patel',
    category: 'Social Media',
    image: '/images/photos/instagram-marketing-for-small-businesses.jpg',
    imageAlt: 'Small business owner holding a tablet at a retail counter while managing online store orders and social media',
    intro:
      'Effective Instagram marketing for small businesses treats your profile as a visual storefront and customer trust engine, assigning clear jobs to an Instagram Reels strategy, carousel engagement tips, and Stories.',
    headings: [
      'How Should a Small Business Optimize Its Instagram Profile Bio?',
      'When Should You Use Instagram Reels vs. Carousels vs. Stories?',
      'Do Hashtags Still Work on Instagram or Are Keywords Better?',
      'How Does User-Generated Content (UGC) Build Customer Trust?',
      'Which Instagram Insights Metrics Actually Measure Business Growth?',
      'Local Creator Collaborations and FTC Disclosure Rules',
    ],
    internalLinks: [
      { href: '/blog/how-social-media-algorithms-work', text: 'how social media algorithms work and rank your content' },
      { href: '/blog/how-online-reviews-influence-customer-decisions', text: 'how online reviews influence customers and build buyer trust' },
      { href: '/blog/common-digital-marketing-mistakes-small-businesses', text: '10 small business digital marketing mistakes to avoid' },
    ],
  },
  {
    routePath: '/blog/why-short-form-video-is-so-powerful',
    type: 'article',
    title: 'Short-Form Video Marketing: Why Vertical Video Converts',
    h1: 'Short-Form Video Marketing: Why Vertical Video Is So Powerful',
    description:
      'Learn why short-form video marketing dominates attention, how vertical video retention works on TikTok, Reels, and Shorts, and how to write strong video hooks.',
    keywords: 'short-form video marketing, vertical video retention, TikTok Reels Shorts strategy',
    publishedAt: '2026-08-21',
    author: 'Priya Patel',
    category: 'Social Media',
    image: '/images/photos/why-short-form-video-is-so-powerful.jpg',
    imageAlt: 'Video creator holding a professional camera rig while filming studio video content',
    intro:
      'Short-form video marketing has become the dominant discovery format online because full-screen 9:16 video matches how people hold smartphones and combines visual proof, voice, and captions simultaneously.',
    headings: [
      'Why Do Short-Form Vertical Videos Hold Attention Better Than Static Posts?',
      'How Do TikTok, Instagram Reels, and YouTube Shorts Compare for Brands?',
      'Have Human Attention Spans Shrunk, or Have Filters Gotten Faster?',
      'How Do You Structure TikTok, Reels, and Shorts Hooks for High Retention?',
      'Should Small Businesses Create Educational or Entertainment Videos?',
      'Five Short-Form Video Production Mistakes Brands Should Avoid',
    ],
    internalLinks: [
      { href: '/blog/how-social-media-algorithms-work', text: 'how social media algorithms work across feeds and video' },
      { href: '/blog/how-to-build-a-personal-brand-from-scratch', text: 'how to build a personal brand from scratch step by step' },
      { href: '/blog/instagram-marketing-for-small-businesses', text: 'guide to Instagram marketing for small businesses' },
    ],
  },
  {
    routePath: '/blog/common-digital-marketing-mistakes-small-businesses',
    type: 'article',
    title: '10 Small Business Digital Marketing Mistakes to Avoid',
    h1: '10 Small Business Digital Marketing Mistakes and How to Fix Them',
    description:
      'Avoid the 10 most costly small business digital marketing mistakes, from buying fake followers to neglecting website conversion optimization and local search.',
    keywords: 'small business digital marketing mistakes, website conversion optimization, local search visibility',
    publishedAt: '2026-08-12',
    author: 'Maya Lin',
    category: 'Digital Marketing',
    image: '/images/photos/common-digital-marketing-mistakes-small-businesses.jpg',
    imageAlt: 'Small business team collaborating around a whiteboard with strategy notes during a marketing planning session',
    intro:
      'Fixing common small business digital marketing mistakes does not require a corporate agency budget. Most early marketing failures happen because busy founders spread themselves across too many platforms, chase vanity follower counts, or send visitors to a slow mobile website.',
    headings: [
      'Why Does Marketing to "Everyone" Fail for Small Businesses?',
      'How Many Social Media Platforms Should a Small Business Manage at Once?',
      'Why Is Ignoring Local Search Visibility So Costly for Small Businesses?',
      'Why Does Buying Followers Hurt Your Social Media Reach?',
      'How Does Poor Website Conversion Optimization Lose Customers?',
      'Why Should Brands Avoid Inconsistent Branding and Unrelated Viral Memes?',
      'Which Marketing Analytics Should Small Businesses Track Every Month?',
      'How Long Does Organic Digital Marketing Take to Show Results, and Why Do Reviews Matter?',
    ],
    internalLinks: [
      { href: '/blog/instagram-marketing-for-small-businesses', text: 'complete guide to Instagram marketing for small businesses' },
      { href: '/blog/seo-for-beginners-how-google-ranks-websites', text: 'step-by-step tutorial on SEO for beginners' },
      { href: '/blog/how-online-reviews-influence-customer-decisions', text: 'how online reviews influence customers and how to reply to criticism' },
    ],
  },
  {
    routePath: '/blog/how-online-reviews-influence-customer-decisions',
    type: 'article',
    title: 'How Online Reviews Influence Customers & Build Trust',
    h1: 'How Online Reviews Influence Customers and Buying Decisions',
    description:
      'Understand how online reviews influence customers through customer social proof, star rating credibility, FTC fake review rules, and responding to criticism.',
    keywords: 'how online reviews influence customers, customer social proof, responding to negative reviews',
    publishedAt: '2026-07-30',
    author: 'Marcus Thorne',
    category: 'Brand & Business',
    image: '/images/photos/how-online-reviews-influence-customer-decisions.jpg',
    imageAlt: 'Two people reviewing customer feedback and online store ratings together on a laptop screen',
    intro:
      'Analyzing how online reviews influence customers reveals why ratings sit at the final decision point of the digital marketing funnel. Shoppers routinely scroll past brand promises to read unfiltered experiences from previous buyers.',
    headings: [
      'How Does Customer Social Proof Reduce Online Buying Risk?',
      'Why Do Shoppers Trust a 4.6 Star Rating More Than a Perfect 5.0?',
      'Why Do Buyers Read 1-Star and 2-Star Reviews First?',
      'What Is the Best Way to Respond to Negative Reviews?',
      'What Does the FTC Rule Banning Fake Reviews Prohibit?',
      'Ethical Strategies for Earning More Customer Reviews Across Platforms',
    ],
    internalLinks: [
      { href: '/blog/instagram-marketing-for-small-businesses', text: 'complete guide to Instagram marketing for small businesses' },
      { href: '/blog/fake-news-misinformation-brand-reputation', text: 'misinformation and brand reputation crisis defense' },
      { href: '/blog/common-digital-marketing-mistakes-small-businesses', text: 'guide to 10 small business digital marketing mistakes' },
    ],
  },
  {
    routePath: '/blog/how-to-build-a-personal-brand-from-scratch',
    type: 'article',
    title: 'How to Build a Personal Brand From Scratch: Step-by-Step',
    h1: 'How to Build a Personal Brand From Scratch',
    description:
      'Learn how to build a personal brand from scratch with this practical guide covering personal branding for students, content pillars, and portfolio strategy.',
    keywords: 'how to build a personal brand, personal branding for students, online portfolio strategy',
    publishedAt: '2026-07-18',
    author: 'Maya Lin',
    category: 'Brand & Business',
    image: '/images/photos/how-to-build-a-personal-brand-from-scratch.jpg',
    imageAlt: 'Minimalist creative workspace with a laptop, notebook, and coffee mug for writing and personal portfolio building',
    intro:
      'Learning how to build a personal brand from scratch does not mean acting like a self-proclaimed internet guru. In reality, your personal brand is simply the documented proof of work that recruiters, clients, or collaborators find when they search your name online.',
    headings: [
      'How Do You Build a Personal Brand From Scratch Without Years of Experience?',
      'What Are Content Pillars in Personal Branding for Students and Professionals?',
      'Which Platform Is Best for Building a Professional Personal Brand?',
      'What Should an Online Portfolio Strategy Include?',
      'How Often Should You Post to Grow Your Personal Brand?',
      'Measuring Personal Brand Growth Beyond Follower Counts',
    ],
    internalLinks: [
      { href: '/blog/how-social-media-algorithms-work', text: 'how social media algorithms work and rank your content' },
      { href: '/blog/why-short-form-video-is-so-powerful', text: 'short-form video marketing and vertical video retention' },
      { href: '/blog/seo-for-beginners-how-google-ranks-websites', text: 'step-by-step guide to SEO for beginners' },
    ],
  },
  {
    routePath: '/blog/fake-news-misinformation-brand-reputation',
    type: 'article',
    title: 'Misinformation and Brand Reputation: Crisis Defense Guide',
    h1: 'Misinformation and Brand Reputation: How Fake News Damages Trust',
    description:
      'Examine how misinformation and brand reputation intersect online, the difference between disinformation vs misinformation, and how to build a crisis plan.',
    keywords: 'misinformation and brand reputation, disinformation vs misinformation, crisis communication plan',
    publishedAt: '2026-07-06',
    author: 'Marcus Thorne',
    category: 'Brand & Business',
    image: '/images/photos/fake-news-misinformation-brand-reputation.jpg',
    imageAlt: 'Close-up photograph of printed newspapers and editorial headlines representing media verification and public trust',
    intro:
      'Managing misinformation and brand reputation is a critical survival skill for modern businesses. In an environment of instant social sharing, synthetic media, and algorithmic discovery feeds, a company’s credibility can be challenged in a single afternoon by an unverified rumor.',
    headings: [
      'What Is the Difference Between Disinformation and Misinformation?',
      'Why Do False Rumors Spread Faster Than Facts on Social Media?',
      'How Do False Online Claims Damage a Brand’s Reputation and Revenue?',
      'How Can Businesses Detect False Rumors Before They Go Viral?',
      'What Should a Brand Crisis Communication Plan Include?',
      'Long-Term Brand Resilience and Verification Standards',
    ],
    internalLinks: [
      { href: '/blog/how-social-media-algorithms-work', text: 'how social media algorithms work across recommendation feeds' },
      { href: '/blog/how-ai-is-changing-digital-marketing', text: 'AI in digital marketing workflows, benefits, and key risks' },
      { href: '/blog/how-online-reviews-influence-customer-decisions', text: 'how online reviews influence customers and build trust' },
    ],
  },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const ARTICLE_SLUG_ID_MAP = {
  'digital-marketing-trends-2026': 1,
  'how-social-media-algorithms-work': 2,
  'seo-for-beginners-how-google-ranks-websites': 3,
  'how-ai-is-changing-digital-marketing': 4,
  'instagram-marketing-for-small-businesses': 5,
  'why-short-form-video-is-so-powerful': 6,
  'common-digital-marketing-mistakes-small-businesses': 7,
  'how-online-reviews-influence-customer-decisions': 8,
  'how-to-build-a-personal-brand-from-scratch': 9,
  'fake-news-misinformation-brand-reputation': 10,
};

function buildSchemaJson(route, canonicalUrl, imageUrl) {
  const organizationId = `${SITE_ORIGIN}/#organization`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;
  const primaryImageId = `${canonicalUrl}#primaryimage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  if (route.type === 'article') {
    const slug = route.routePath.replace('/blog/', '');
    const articleId = ARTICLE_SLUG_ID_MAP[slug] || 1;
    const authorSlug = route.author.toLowerCase().replace(/\s+/g, '-');
    const articleIdUri = `${canonicalUrl}#article`;
    const globalIdentifier = `digital-pulse-article-${articleId}-${slug}`;

    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': organizationId,
            name: 'Digital Pulse',
            url: `${SITE_ORIGIN}/`,
            description:
              'Independent digital publication covering digital marketing, social media, technology, and online business.',
          },
          {
            '@type': 'WebSite',
            '@id': websiteId,
            url: `${SITE_ORIGIN}/`,
            name: 'Digital Pulse',
            publisher: {
              '@id': organizationId,
            },
          },
          {
            '@type': 'ImageObject',
            '@id': primaryImageId,
            url: imageUrl,
            contentUrl: imageUrl,
            caption: route.imageAlt,
            width: 1200,
            height: 630,
          },
          {
            '@type': 'WebPage',
            '@id': webpageId,
            url: canonicalUrl,
            name: route.title,
            description: route.description,
            isPartOf: {
              '@id': websiteId,
            },
            primaryImageOfPage: {
              '@id': primaryImageId,
            },
            breadcrumb: {
              '@id': breadcrumbId,
            },
            mainEntity: {
              '@id': articleIdUri,
            },
            datePublished: route.publishedAt,
            dateModified: route.publishedAt,
          },
          {
            '@type': 'BlogPosting',
            '@id': articleIdUri,
            identifier: globalIdentifier,
            url: canonicalUrl,
            isPartOf: {
              '@id': webpageId,
            },
            mainEntityOfPage: {
              '@id': webpageId,
            },
            headline: route.h1,
            alternativeHeadline: route.title,
            description: route.description,
            image: {
              '@id': primaryImageId,
            },
            datePublished: route.publishedAt,
            dateModified: route.publishedAt,
            articleSection: route.category,
            keywords: route.keywords,
            inLanguage: 'en-US',
            author: {
              '@type': 'Person',
              '@id': `${SITE_ORIGIN}/#author-${authorSlug}`,
              name: route.author,
            },
            publisher: {
              '@id': organizationId,
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': breadcrumbId,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_ORIGIN}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${SITE_ORIGIN}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: route.h1,
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
      null,
      2
    );
  }

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': organizationId,
          name: 'Digital Pulse',
          url: `${SITE_ORIGIN}/`,
          description:
            'Practical insights on digital marketing, technology, social media and online business.',
        },
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url: `${SITE_ORIGIN}/`,
          name: 'Digital Pulse',
          publisher: {
            '@id': organizationId,
          },
        },
        {
          '@type': route.routePath === '/blog' ? 'CollectionPage' : 'WebPage',
          '@id': webpageId,
          url: canonicalUrl,
          name: route.title,
          description: route.description,
          isPartOf: {
            '@id': websiteId,
          },
          publisher: {
            '@id': organizationId,
          },
        },
      ],
    },
    null,
    2
  );
}

function buildStaticBodyHtml(route) {
  const safeH1 = escapeHtml(route.h1);
  const safeIntro = escapeHtml(route.intro);
  const safeImageAlt = escapeHtml(route.imageAlt);
  const headingsHtml = (route.headings || [])
    .map((h) => `<h2>${escapeHtml(h)}</h2>`)
    .join('\n          ');
  const linksHtml = (route.internalLinks || [])
    .map((l) => `<li><a href="${l.href}">${escapeHtml(l.text)}</a></li>`)
    .join('\n            ');

  return `<div id="root">
      <main id="main-content" class="max-w-4xl mx-auto py-12 px-4">
        <article data-canonical-url="${SITE_ORIGIN}${route.routePath}">
          <h1>${safeH1}</h1>
          <p>${safeIntro}</p>
          <img src="${route.image}" alt="${safeImageAlt}" width="1200" height="675" loading="eager" />
          ${headingsHtml}
          <nav aria-label="Related internal articles">
            <ul>
              ${linksHtml}
            </ul>
          </nav>
        </article>
      </main>
    </div>`;
}

function buildRouteHtml(route) {
  const canonicalUrl = `${SITE_ORIGIN}${route.routePath}`;
  const imageUrl = `${SITE_ORIGIN}${route.image}`;
  const safeTitle = escapeHtml(route.title);
  const safeDesc = escapeHtml(route.description);
  const safeKeywords = escapeHtml(route.keywords);
  const safeImageAlt = escapeHtml(route.imageAlt);
  const schemaJson = buildSchemaJson(route, canonicalUrl, imageUrl);

  const articleOgMeta =
    route.type === 'article'
      ? `\n    <meta property="article:published_time" content="${route.publishedAt}" />\n    <meta property="article:modified_time" content="${route.publishedAt}" />\n    <meta property="article:section" content="${escapeHtml(route.category)}" />\n    <meta property="article:author" content="${escapeHtml(route.author)}" />\n    <meta property="article:tag" content="${safeKeywords}" />`
      : '';

  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${safeDesc}" />`
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
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${imageUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:alt" content="${safeImageAlt}" />
    <meta property="og:image:secure_url" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />${articleOgMeta}`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="${safeImageAlt}" />`
  );
  html = html.replace(
    /<script type="application\/ld\+json" id="schema-jsonld">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" id="schema-jsonld">\n${schemaJson}\n    </script>`
  );
  html = html.replace(/<div id="root"><\/div>/, buildStaticBodyHtml(route));

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

// 3. Also enrich root dist/index.html with accessible semantic homepage fallback inside <div id="root">
const homeFallbackHtml = baseHtml.replace(
  /<div id="root"><\/div>/,
  `<div id="root">
      <main id="main-content" class="max-w-7xl mx-auto py-12 px-4">
        <h1>Digital Pulse: Practical Insights on Digital Marketing, Social Media &amp; Online Business</h1>
        <p>Digital Pulse is an independent digital marketing blog publishing research-backed social media strategy, beginner SEO guides, and online business insights for college students, founders, and small businesses.</p>
        <h2>Latest Digital Marketing Blog Articles &amp; Analysis</h2>
        <nav aria-label="All 10 Blog Articles">
          <ul>
            <li><a href="/blog/digital-marketing-trends-2026">10 Digital Marketing Trends 2026 Businesses Should Watch</a></li>
            <li><a href="/blog/how-social-media-algorithms-work">How Social Media Algorithms Work: How Feeds Rank Content</a></li>
            <li><a href="/blog/seo-for-beginners-how-google-ranks-websites">SEO for Beginners: How Google Ranks Websites Step by Step</a></li>
            <li><a href="/blog/how-ai-is-changing-digital-marketing">AI in Digital Marketing: How Automation Changes Workflows</a></li>
            <li><a href="/blog/instagram-marketing-for-small-businesses">Instagram Marketing for Small Businesses: A Practical Guide</a></li>
            <li><a href="/blog/why-short-form-video-is-so-powerful">Short-Form Video Marketing: Why Vertical Video Is So Powerful</a></li>
            <li><a href="/blog/common-digital-marketing-mistakes-small-businesses">10 Small Business Digital Marketing Mistakes and How to Fix Them</a></li>
            <li><a href="/blog/how-online-reviews-influence-customer-decisions">How Online Reviews Influence Customers and Buying Decisions</a></li>
            <li><a href="/blog/how-to-build-a-personal-brand-from-scratch">How to Build a Personal Brand From Scratch</a></li>
            <li><a href="/blog/fake-news-misinformation-brand-reputation">Misinformation and Brand Reputation: How Fake News Damages Trust</a></li>
          </ul>
        </nav>
      </main>
    </div>`
);
fs.writeFileSync(templatePath, homeFallbackHtml, 'utf-8');

// 4. Create dist/404.html SPA fallback
fs.writeFileSync(path.join(distDir, '404.html'), baseHtml, 'utf-8');

console.log(`Generated ${ROUTES.length} static route HTML bundles (5 core pages + 10 blog routes) + 404.html in dist/`);
