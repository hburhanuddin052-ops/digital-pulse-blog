export type SearchIntent =
  | 'Informational'
  | 'Navigational'
  | 'Commercial'
  | 'Transactional'
  | 'Informational / Commercial'
  | 'Informational / Legal';

export interface PageEditorialSEO {
  id: string;
  pathname: string;
  canonicalUrl: string;
  pageName: string;
  primaryKeyword: string;
  secondaryKeywords: [string, string];
  searchIntent: SearchIntent | string;
  mainQuestionAnswered: string;
  searchVolume?: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  titleCharCount: number;
  descriptionCharCount: number;
}

export const CANONICAL_ORIGIN = 'https://digital-pulse-blog.vercel.app';

/**
 * Authoritative editorial SEO registry for all core website pages
 * and all 10 published blog articles on Digital Pulse.
 */
export const EDITORIAL_SEO_REGISTRY: Record<string, PageEditorialSEO> = {
  // Core Website Pages
  '/': {
    id: 'page-home',
    pathname: '/',
    canonicalUrl: `${CANONICAL_ORIGIN}/`,
    pageName: 'Homepage',
    primaryKeyword: 'digital marketing blog',
    secondaryKeywords: ['social media strategy', 'online business insights'],
    searchIntent: 'Visit / Know',
    searchVolume: '6.2k',
    mainQuestionAnswered:
      'Where can students and small business owners find practical, research-backed digital marketing and SEO guides?',
    seoTitle: 'Digital Pulse: Digital Marketing Blog & SEO Strategy Hub',
    metaDescription:
      'Digital Pulse is an independent digital marketing blog publishing research-backed social media strategy, beginner SEO guides, and online business insights.',
    h1: 'An independent digital marketing blog for search, social media strategy, and online business.',
    titleCharCount: 57,
    descriptionCharCount: 156,
  },
  '/blog': {
    id: 'page-blog-archive',
    pathname: '/blog',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog`,
    pageName: 'Blog Archive & Tutorials Directory',
    primaryKeyword: 'digital marketing articles',
    secondaryKeywords: ['SEO tutorials', 'social media guides'],
    searchIntent: 'Navigational',
    mainQuestionAnswered:
      'What tutorials, long-form articles, and practical guides does Digital Pulse publish across digital marketing, SEO, and social platforms?',
    seoTitle: 'Digital Marketing Articles & SEO Guides | Digital Pulse',
    metaDescription:
      'Browse all 10 original digital marketing articles, step-by-step SEO tutorials, and social media guides written for students, founders, and small businesses.',
    h1: 'All Digital Marketing Articles, SEO Tutorials & Social Media Guides',
    titleCharCount: 55,
    descriptionCharCount: 156,
  },
  '/about': {
    id: 'page-about',
    pathname: '/about',
    canonicalUrl: `${CANONICAL_ORIGIN}/about`,
    pageName: 'About Digital Pulse',
    primaryKeyword: 'digital marketing publication',
    secondaryKeywords: ['editorial standards', 'marketing education for students'],
    searchIntent: 'Informational',
    mainQuestionAnswered:
      'Who publishes Digital Pulse, and what primary-source editorial standards guide its marketing articles and guides?',
    seoTitle: 'About Our Digital Marketing Publication | Digital Pulse',
    metaDescription:
      'Learn about Digital Pulse, an independent digital marketing publication dedicated to primary-source editorial standards and marketing education for students.',
    h1: 'An independent digital marketing publication for students, founders, and marketers.',
    titleCharCount: 55,
    descriptionCharCount: 157,
  },
  '/contact': {
    id: 'page-contact',
    pathname: '/contact',
    canonicalUrl: `${CANONICAL_ORIGIN}/contact`,
    pageName: 'Contact Editorial Desk',
    primaryKeyword: 'contact Digital Pulse editorial team',
    secondaryKeywords: ['reader feedback', 'marketing topic suggestions'],
    searchIntent: 'Navigational',
    mainQuestionAnswered:
      'How can readers, students, or partners submit feedback, topic ideas, or editorial corrections to Digital Pulse?',
    seoTitle: 'Contact Digital Pulse Editorial Team | Digital Pulse',
    metaDescription:
      'Contact the Digital Pulse editorial team with reader feedback, marketing topic suggestions, press inquiries, or source corrections. We reply in 24–48 hours.',
    h1: 'Contact the Digital Pulse Editorial Team',
    titleCharCount: 52,
    descriptionCharCount: 155,
  },
  '/privacy-policy': {
    id: 'page-privacy-policy',
    pathname: '/privacy-policy',
    canonicalUrl: `${CANONICAL_ORIGIN}/privacy-policy`,
    pageName: 'Privacy Policy',
    primaryKeyword: 'Digital Pulse privacy policy',
    secondaryKeywords: ['first-party data privacy', 'newsletter subscriber rights'],
    searchIntent: 'Informational / Legal',
    mainQuestionAnswered:
      'What personal data does Digital Pulse collect, and how are newsletter subscriber privacy rights protected?',
    seoTitle: 'Digital Pulse Privacy Policy & Data Terms | Digital Pulse',
    metaDescription:
      'Read the official Digital Pulse privacy policy covering first-party data privacy, newsletter subscriber rights, contact inquiries, and search analytics.',
    h1: 'Digital Pulse Privacy Policy',
    titleCharCount: 56,
    descriptionCharCount: 154,
  },
  '/terms-and-conditions': {
    id: 'page-terms-and-conditions',
    pathname: '/terms-and-conditions',
    canonicalUrl: `${CANONICAL_ORIGIN}/terms-and-conditions`,
    pageName: 'Terms and Conditions',
    primaryKeyword: 'Digital Pulse terms and conditions',
    secondaryKeywords: ['editorial citation policy', 'educational content disclaimer'],
    searchIntent: 'Informational / Legal',
    mainQuestionAnswered:
      'Under what terms may readers quote, cite, or use educational materials published on Digital Pulse?',
    seoTitle: 'Digital Pulse Terms and Conditions & Citation Guidelines',
    metaDescription:
      'Review the Digital Pulse terms and conditions, including our editorial citation policy, intellectual property rules, and educational content disclaimer.',
    h1: 'Digital Pulse Terms & Conditions',
    titleCharCount: 56,
    descriptionCharCount: 152,
  },

  // 10 Published Blog Articles
  '/blog/digital-marketing-trends-2026': {
    id: 'article-1',
    pathname: '/blog/digital-marketing-trends-2026',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/digital-marketing-trends-2026`,
    pageName: 'Article 1 — Digital Marketing Trends 2026',
    primaryKeyword: 'digital marketing trends 2026',
    secondaryKeywords: [
      'future of digital marketing',
      'digital marketing trends for small business',
    ],
    searchIntent: 'Know',
    searchVolume: '7.7k',
    mainQuestionAnswered:
      'Which 10 digital marketing trends should businesses prioritize in 2026 to grow without relying on third-party cookies?',
    seoTitle: '10 Digital Marketing Trends 2026: Future of Digital Marketing',
    metaDescription:
      'Explore the future of digital marketing and top digital marketing trends 2026 for small business, including first-party data, video search, and AI workflows.',
    h1: '10 Digital Marketing Trends 2026 Businesses Should Watch',
    titleCharCount: 61,
    descriptionCharCount: 159,
  },
  '/blog/how-social-media-algorithms-work': {
    id: 'article-2',
    pathname: '/blog/how-social-media-algorithms-work',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/how-social-media-algorithms-work`,
    pageName: 'Article 2 — How Social Media Algorithms Work',
    primaryKeyword: 'social media algorithms',
    secondaryKeywords: [
      'social media algorithm ranking factors',
      'how to increase organic social media reach',
    ],
    searchIntent: 'Know',
    searchVolume: '5.6k',
    mainQuestionAnswered:
      'How do social media algorithms filter, score, and rank posts across Instagram, and YouTube feeds?',
    seoTitle: 'Social Media Algorithms: Ranking Factors & Organic Reach',
    metaDescription:
      'Learn how social media algorithms work, discover core social media algorithm ranking factors, and find out how to increase organic social media reach in 2026.',
    h1: 'How Social Media Algorithms Work: How Feeds Rank Content',
    titleCharCount: 56,
    descriptionCharCount: 160,
  },
  '/blog/seo-for-beginners-how-google-ranks-websites': {
    id: 'article-3',
    pathname: '/blog/seo-for-beginners-how-google-ranks-websites',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/seo-for-beginners-how-google-ranks-websites`,
    pageName: 'Article 3 — SEO for Beginners',
    primaryKeyword: 'SEO for beginners',
    secondaryKeywords: ['how Google ranks websites', 'on-page SEO for beginners'],
    searchIntent: 'Know / Do',
    searchVolume: '9.5k',
    mainQuestionAnswered: 'how can I start SEO as a beginner?',
    seoTitle: 'SEO for Beginners: How Google Ranks Websites Step by Step',
    metaDescription:
      'Master SEO for beginners with this step-by-step guide explaining how Google ranks websites, on-page SEO for beginners, search intent, and indexing essentials.',
    h1: 'SEO for Beginners: How Google Ranks Websites Step by Step',
    titleCharCount: 58,
    descriptionCharCount: 160,
  },
  '/blog/how-ai-is-changing-digital-marketing': {
    id: 'article-4',
    pathname: '/blog/how-ai-is-changing-digital-marketing',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/how-ai-is-changing-digital-marketing`,
    pageName: 'Article 4 — AI in Digital Marketing',
    primaryKeyword: 'AI in digital marketing',
    secondaryKeywords: ['marketing workflow automation', 'human editorial oversight'],
    searchIntent: 'Informational',
    mainQuestionAnswered:
      'How is artificial intelligence transforming digital marketing workflows, and where is human editorial oversight required?',
    seoTitle: 'AI in Digital Marketing: Workflows, Benefits & Risks',
    metaDescription:
      'Explore how AI in digital marketing improves marketing workflow automation, ad targeting, and data analysis while still requiring human editorial oversight.',
    h1: 'AI in Digital Marketing: How Automation Changes Workflows',
    titleCharCount: 53,
    descriptionCharCount: 157,
  },
  '/blog/instagram-marketing-for-small-businesses': {
    id: 'article-5',
    pathname: '/blog/instagram-marketing-for-small-businesses',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/instagram-marketing-for-small-businesses`,
    pageName: 'Article 5 — Instagram Marketing for Small Businesses',
    primaryKeyword: 'Instagram marketing for small businesses',
    secondaryKeywords: ['Instagram Reels strategy', 'carousel engagement tips'],
    searchIntent: 'Informational / Commercial',
    mainQuestionAnswered:
      'How can small businesses optimize profiles, balance Reels vs. Carousels vs. Stories, and gain customers on Instagram?',
    seoTitle: 'Instagram Marketing for Small Businesses: 2026 Guide',
    metaDescription:
      'A practical guide to Instagram marketing for small businesses covering bio optimization, Instagram Reels strategy, carousel engagement tips, UGC, and Insights.',
    h1: 'Instagram Marketing for Small Businesses: A Practical Guide',
    titleCharCount: 53,
    descriptionCharCount: 160,
  },
  '/blog/why-short-form-video-is-so-powerful': {
    id: 'article-6',
    pathname: '/blog/why-short-form-video-is-so-powerful',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/why-short-form-video-is-so-powerful`,
    pageName: 'Article 6 — Short-Form Video Marketing',
    primaryKeyword: 'short-form video marketing',
    secondaryKeywords: ['vertical video retention', 'TikTok Reels Shorts strategy'],
    searchIntent: 'Informational',
    mainQuestionAnswered:
      'Why does short-form vertical video dominate organic social media discovery and viewer retention across platforms?',
    seoTitle: 'Short-Form Video Marketing: Why Vertical Video Works',
    metaDescription:
      'Learn why short-form video marketing dominates attention, how vertical video retention works on TikTok, Reels, and Shorts, and how to write strong video hooks.',
    h1: 'Short-Form Video Marketing: Why Vertical Video Is So Powerful',
    titleCharCount: 53,
    descriptionCharCount: 158,
  },
  '/blog/common-digital-marketing-mistakes-small-businesses': {
    id: 'article-7',
    pathname: '/blog/common-digital-marketing-mistakes-small-businesses',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/common-digital-marketing-mistakes-small-businesses`,
    pageName: 'Article 7 — Small Business Digital Marketing Mistakes',
    primaryKeyword: 'small business digital marketing mistakes',
    secondaryKeywords: ['website conversion optimization', 'local search visibility'],
    searchIntent: 'Informational',
    mainQuestionAnswered:
      'What are the 10 most common digital marketing mistakes small businesses make and how can founders fix them with direct action?',
    seoTitle: '10 Small Business Digital Marketing Mistakes to Avoid',
    metaDescription:
      'Avoid the 10 most costly small business digital marketing mistakes, from buying fake followers to neglecting website conversion optimization and local search.',
    h1: '10 Small Business Digital Marketing Mistakes and How to Fix Them',
    titleCharCount: 53,
    descriptionCharCount: 158,
  },
  '/blog/how-online-reviews-influence-customer-decisions': {
    id: 'article-8',
    pathname: '/blog/how-online-reviews-influence-customer-decisions',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/how-online-reviews-influence-customer-decisions`,
    pageName: 'Article 8 — Online Reviews & Buying Decisions',
    primaryKeyword: 'how online reviews influence customers',
    secondaryKeywords: ['customer social proof', 'responding to negative reviews'],
    searchIntent: 'Informational / Commercial',
    mainQuestionAnswered:
      'How do customer reviews, star ratings, and owner responses influence buying decisions and build trust online?',
    seoTitle: 'How Online Reviews Influence Customers & Buying Decisions',
    metaDescription:
      'Understand how online reviews influence customers through customer social proof, star rating credibility, FTC fake review rules, and responding to criticism.',
    h1: 'How Online Reviews Influence Customers and Buying Decisions',
    titleCharCount: 57,
    descriptionCharCount: 158,
  },
  '/blog/how-to-build-a-personal-brand-from-scratch': {
    id: 'article-9',
    pathname: '/blog/how-to-build-a-personal-brand-from-scratch',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/how-to-build-a-personal-brand-from-scratch`,
    pageName: 'Article 9 — Build a Personal Brand From Scratch',
    primaryKeyword: 'how to build a personal brand',
    secondaryKeywords: ['personal branding for students', 'online portfolio strategy'],
    searchIntent: 'Informational',
    mainQuestionAnswered:
      'How can college students, freelancers, and professionals build an authentic personal brand and portfolio from scratch?',
    seoTitle: 'How to Build a Personal Brand From Scratch: Full Guide',
    metaDescription:
      'Learn how to build a personal brand from scratch with this practical guide covering personal branding for students, content pillars, and portfolio strategy.',
    h1: 'How to Build a Personal Brand From Scratch',
    titleCharCount: 55,
    descriptionCharCount: 158,
  },
  '/blog/fake-news-misinformation-brand-reputation': {
    id: 'article-10',
    pathname: '/blog/fake-news-misinformation-brand-reputation',
    canonicalUrl: `${CANONICAL_ORIGIN}/blog/fake-news-misinformation-brand-reputation`,
    pageName: 'Article 10 — Misinformation & Brand Reputation',
    primaryKeyword: 'misinformation and brand reputation',
    secondaryKeywords: ['disinformation vs misinformation', 'crisis communication plan'],
    searchIntent: 'Informational / Commercial',
    mainQuestionAnswered:
      'How can businesses protect their brand reputation from online misinformation, viral rumors, and deceptive synthetic media?',
    seoTitle: 'Misinformation and Brand Reputation: Crisis Defense Guide',
    metaDescription:
      'Examine how misinformation and brand reputation intersect online, the difference between disinformation vs misinformation, and how to build a crisis plan.',
    h1: 'Misinformation and Brand Reputation: How Fake News Damages Trust',
    titleCharCount: 57,
    descriptionCharCount: 154,
  },
};

/**
 * Helper to retrieve editorial SEO data by path.
 */
export function getEditorialSEOByPath(pathname: string): PageEditorialSEO | undefined {
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  return EDITORIAL_SEO_REGISTRY[clean];
}

/**
 * Returns all registered editorial SEO entries as an array.
 */
export function getAllEditorialSEOEntries(): PageEditorialSEO[] {
  return Object.values(EDITORIAL_SEO_REGISTRY);
}
