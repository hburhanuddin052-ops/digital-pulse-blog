import { Article } from '../types/blog';
import { AUTHORS } from '../data/authors';

export const CANONICAL_ORIGIN = 'https://digital-pulse-blog.vercel.app';

export const SHORT_TAIL_CORE_TOPICS: string[] = [
  'Digital Marketing',
  'Search Engine Optimization (SEO)',
  'Social Media Marketing',
  'Social Media Algorithms',
  'AI in Digital Marketing',
  'Instagram Marketing',
  'Short-Form Video Marketing',
  'Small Business Marketing',
  'Online Reviews',
  'Personal Branding',
  'Brand Reputation',
  'Online Business',
];

const ARTICLE_SHORT_TAIL_ENTITIES: Record<string, string[]> = {
  'digital-marketing-trends-2026': [
    'Digital Marketing',
    'Marketing Trends',
    'Digital Marketing Trends 2026',
    'First-Party Data',
    'Short-Form Video',
  ],
  'how-social-media-algorithms-work': [
    'Social Media',
    'Social Media Algorithms',
    'Organic Reach',
    'Feed Ranking',
  ],
  'seo-for-beginners-how-google-ranks-websites': [
    'SEO',
    'Search Engine Optimization',
    'SEO for Beginners',
    'Google Ranking',
    'On-Page SEO',
  ],
  'how-ai-is-changing-digital-marketing': [
    'AI Marketing',
    'AI in Digital Marketing',
    'Marketing Automation',
    'Generative AI',
  ],
  'instagram-marketing-for-small-businesses': [
    'Instagram Marketing',
    'Instagram Reels',
    'Small Business Marketing',
    'Social Media Marketing',
  ],
  'why-short-form-video-is-so-powerful': [
    'Short-Form Video',
    'Video Marketing',
    'TikTok Marketing',
    'YouTube Shorts',
  ],
  'common-digital-marketing-mistakes-small-businesses': [
    'Small Business Marketing',
    'Digital Marketing Mistakes',
    'Local SEO',
    'Conversion Optimization',
  ],
  'how-online-reviews-influence-customer-decisions': [
    'Online Reviews',
    'Customer Reviews',
    'Social Proof',
    'Reputation Management',
  ],
  'how-to-build-a-personal-brand-from-scratch': [
    'Personal Branding',
    'Personal Brand',
    'Online Portfolio',
    'Career Marketing',
  ],
  'fake-news-misinformation-brand-reputation': [
    'Brand Reputation',
    'Misinformation',
    'Crisis Communication',
    'Media Literacy',
  ],
};

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  pathname: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  article?: Article;
  listedArticles?: Article[];
  wordCount?: number;
  noindex?: boolean;
}

export interface SeoHeadPayload {
  title: string;
  description: string;
  author: string;
  robots: string;
  canonicalUrl: string;
  pageType: 'website' | 'article';
  imageUrl: string;
  imageAlt: string;
  keywordsList: string[];
  schemaJson: string;
  noindex: boolean;
}

/**
 * Normalizes any route path into a deterministic, canonical pathname
 * (strips query strings, hash fragments, .html suffixes, and trailing slashes)
 * so two URL variations never produce overlapping or mismatched canonicals.
 */
export function normalizeCanonicalPathname(rawPathname: string): string {
  if (!rawPathname) return '/';
  const withoutQueryOrHash = rawPathname.split('?')[0].split('#')[0].trim();
  const withoutHtml = withoutQueryOrHash
    .replace(/\/index\.html$/i, '')
    .replace(/\.html$/i, '')
    .replace(/\/+$/, '');

  if (!withoutHtml || withoutHtml === '') return '/';
  return withoutHtml.startsWith('/') ? withoutHtml : `/${withoutHtml}`;
}

/**
 * Builds the authoritative canonical URL for any page or blog article slug.
 */
export function getCanonicalUrl(pathname: string): string {
  const cleanPathname = normalizeCanonicalPathname(pathname);
  return cleanPathname === '/'
    ? `${CANONICAL_ORIGIN}/`
    : `${CANONICAL_ORIGIN}${cleanPathname}`;
}

/**
 * Returns the authoritative canonical URL for a blog article.
 */
export function getArticleCanonicalUrl(article: Article | string): string {
  const slug = typeof article === 'string' ? article : article.slug;
  return `${CANONICAL_ORIGIN}/blog/${slug}`;
}

/**
 * Returns the unique, deterministic public Open Graph / Schema image URL
 * for each of the 10 blog articles based on its unique slug.
 */
export function getArticleCanonicalImageUrl(article: Article): string {
  return `${CANONICAL_ORIGIN}/images/photos/${article.slug}.jpg`;
}

/**
 * Returns the unique Schema.org URI identifier for an article BlogPosting entity.
 */
export function getArticleSchemaId(article: Article): string {
  return `${getArticleCanonicalUrl(article)}#article`;
}

/**
 * Returns the globally unique, unambiguous identifier for an article across databases and feeds.
 */
export function getArticleGlobalIdentifier(article: Article): string {
  return `digital-pulse-article-${article.id}-${article.slug}`;
}

function computeArticleWordCount(article: Article): number {
  const chunks: string[] = [
    article.title,
    article.excerpt,
    ...article.introduction,
    ...article.keyTakeaways,
  ];
  article.sections.forEach((sec) => {
    chunks.push(sec.heading);
    if (sec.paragraphs) chunks.push(...sec.paragraphs);
    if (sec.bullets) chunks.push(...sec.bullets);
    if (sec.exampleBox) chunks.push(sec.exampleBox.title, sec.exampleBox.content);
    if (sec.pullQuote) chunks.push(sec.pullQuote.quote, sec.pullQuote.context);
    if (sec.subSections) {
      sec.subSections.forEach((sub) => {
        chunks.push(sub.subHeading, ...sub.paragraphs);
        if (sub.bullets) chunks.push(...sub.bullets);
      });
    }
  });
  if (article.faqs) {
    article.faqs.forEach((f) => chunks.push(f.question, f.answer));
  }
  return chunks.join(' ').trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Builds the complete Schema.org JSON-LD @graph for both SSR and client runtime.
 */
export function buildSchemaGraph(
  config: PageSEOConfig,
  fullCanonicalUrl: string,
  imageUrl: string,
  imageAlt: string,
  keywordsList: string[]
): Record<string, unknown> {
  const article = config.article;
  const cleanPathname = normalizeCanonicalPathname(
    article ? `/blog/${article.slug}` : config.pathname
  );

  const organizationId = `${CANONICAL_ORIGIN}/#organization`;
  const websiteId = `${CANONICAL_ORIGIN}/#website`;
  const webpageId = `${fullCanonicalUrl}#webpage`;
  const primaryImageId = `${fullCanonicalUrl}#primaryimage`;
  const breadcrumbId = `${fullCanonicalUrl}#breadcrumb`;

  const organizationNode: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': organizationId,
    name: 'Digital Pulse',
    url: `${CANONICAL_ORIGIN}/`,
    description:
      'Independent digital marketing blog covering SEO, social media marketing, social media algorithms, AI workflows, and online business strategy.',
    knowsAbout: SHORT_TAIL_CORE_TOPICS,
    publishingPrinciples: `${CANONICAL_ORIGIN}/about`,
  };

  const websiteNode: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${CANONICAL_ORIGIN}/`,
    name: 'Digital Pulse',
    inLanguage: 'en-US',
    publisher: {
      '@id': organizationId,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${CANONICAL_ORIGIN}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  if (article) {
    const author = AUTHORS[article.authorId];
    const authorIdUri = `${CANONICAL_ORIGIN}/#author-${article.authorId}`;
    const articleIdUri = `${fullCanonicalUrl}#article`;
    const globalArticleIdentifier = getArticleGlobalIdentifier(article);
    const wordCount = config.wordCount || computeArticleWordCount(article);
    const shortTailTopics = ARTICLE_SHORT_TAIL_ENTITIES[article.slug] || [];
    const aboutEntities = Array.from(
      new Set([...shortTailTopics, article.primaryKeyword, ...article.secondaryKeywords])
    ).map((topic) => ({
      '@type': 'Thing',
      name: topic,
    }));

    const graph: Record<string, unknown>[] = [
      organizationNode,
      websiteNode,
      {
        '@type': 'ImageObject',
        '@id': primaryImageId,
        url: imageUrl,
        contentUrl: imageUrl,
        caption: article.imageAlt,
        width: 1200,
        height: 630,
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: fullCanonicalUrl,
        name: article.seoTitle,
        description: article.metaDescription,
        inLanguage: 'en-US',
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
        datePublished: article.isoDate,
        dateModified: article.isoDate,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.article-headline', '.article-intro', '#key-takeaways'],
        },
      },
      {
        '@type': 'BlogPosting',
        '@id': articleIdUri,
        identifier: globalArticleIdentifier,
        url: fullCanonicalUrl,
        isPartOf: {
          '@id': webpageId,
        },
        mainEntityOfPage: {
          '@id': webpageId,
        },
        headline: article.title,
        alternativeHeadline: article.seoTitle,
        description: article.metaDescription,
        image: {
          '@id': primaryImageId,
        },
        datePublished: article.isoDate,
        dateModified: article.isoDate,
        articleSection: article.category,
        keywords: Array.from(new Set([...shortTailTopics, ...keywordsList])).join(', '),
        about: aboutEntities,
        wordCount,
        inLanguage: 'en-US',
        timeRequired: `PT${article.readingTimeMinutes}M`,
        isAccessibleForFree: true,
        citation: article.sources.map((src) => ({
          '@type': 'CreativeWork',
          name: src.title,
          url: src.url,
          publisher: {
            '@type': 'Organization',
            name: src.publisher,
          },
        })),
        author: {
          '@type': 'Person',
          '@id': authorIdUri,
          name: author ? author.name : 'Digital Pulse Editorial Team',
          jobTitle: author ? author.role : 'Editorial Author',
          url: `${CANONICAL_ORIGIN}/about#author-${article.authorId}`,
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
            item: `${CANONICAL_ORIGIN}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${CANONICAL_ORIGIN}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: fullCanonicalUrl,
          },
        ],
      },
    ];

    if (article.faqs && article.faqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${fullCanonicalUrl}#faq`,
        url: `${fullCanonicalUrl}#frequently-asked-questions`,
        isPartOf: {
          '@id': webpageId,
        },
        mainEntity: article.faqs.map((f, index) => ({
          '@type': 'Question',
          '@id': `${fullCanonicalUrl}#faq-question-${index + 1}`,
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            '@id': `${fullCanonicalUrl}#faq-answer-${index + 1}`,
            text: f.answer,
          },
        })),
      });
    }

    return {
      '@context': 'https://schema.org',
      '@graph': graph,
    };
  }

  const isCollectionPage = cleanPathname === '/' || cleanPathname === '/blog';
  const pageSchemaType = isCollectionPage ? 'CollectionPage' : 'WebPage';
  const listId = `${fullCanonicalUrl}#itemlist`;
  const hasListedArticles =
    isCollectionPage && config.listedArticles && config.listedArticles.length > 0;

  const graph: Record<string, unknown>[] = [
    organizationNode,
    websiteNode,
    {
      '@type': 'ImageObject',
      '@id': primaryImageId,
      url: imageUrl,
      contentUrl: imageUrl,
      caption: imageAlt,
      width: 1200,
      height: 630,
    },
    {
      '@type': pageSchemaType,
      '@id': webpageId,
      url: fullCanonicalUrl,
      name: config.title,
      description: config.description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': websiteId,
      },
      primaryImageOfPage: {
        '@id': primaryImageId,
      },
      breadcrumb: {
        '@id': breadcrumbId,
      },
      publisher: {
        '@id': organizationId,
      },
      ...(hasListedArticles
        ? {
            mainEntity: {
              '@id': listId,
            },
          }
        : {}),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${CANONICAL_ORIGIN}/`,
        },
        ...(cleanPathname !== '/'
          ? [
              {
                '@type': 'ListItem',
                position: 2,
                name: config.title.split('|')[0].split(':')[0].trim(),
                item: fullCanonicalUrl,
              },
            ]
          : []),
      ],
    },
  ];

  if (hasListedArticles && config.listedArticles) {
    graph.push({
      '@type': 'ItemList',
      '@id': listId,
      name: 'Digital Pulse Featured Digital Marketing & SEO Articles',
      numberOfItems: config.listedArticles.length,
      itemListElement: config.listedArticles.map((art, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: getArticleCanonicalUrl(art),
        name: art.title,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Pure SEO metadata payload builder shared between client runtime and static SSR generation.
 */
export function buildSeoHeadPayload(config: PageSEOConfig): SeoHeadPayload {
  const article = config.article;
  const effectivePathname = article ? `/blog/${article.slug}` : config.pathname;
  const cleanPathname = normalizeCanonicalPathname(effectivePathname);
  const fullCanonicalUrl = getCanonicalUrl(cleanPathname);

  const imageUrl = article
    ? getArticleCanonicalImageUrl(article)
    : config.image
      ? config.image.startsWith('http')
        ? config.image
        : `${CANONICAL_ORIGIN}${config.image.startsWith('/') ? config.image : `/${config.image}`}`
      : `${CANONICAL_ORIGIN}/images/photos/digital-marketing-trends-2026.jpg`;

  const imageAlt = article
    ? article.imageAlt
    : config.imageAlt ||
      'Laptop on a wooden desk displaying website traffic charts and campaign analytics';

  const pageType: 'website' | 'article' = article ? 'article' : config.type || 'website';
  const keywordsList = article
    ? [article.primaryKeyword, ...article.secondaryKeywords]
    : config.keywords || [];

  const author = article
    ? AUTHORS[article.authorId]?.name || 'Digital Pulse Editorial Team'
    : 'Digital Pulse Editorial Team';

  const noindex = Boolean(config.noindex);
  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const schemaGraph = buildSchemaGraph(
    config,
    fullCanonicalUrl,
    imageUrl,
    imageAlt,
    keywordsList
  );

  return {
    title: config.title,
    description: config.description,
    author,
    robots,
    canonicalUrl: fullCanonicalUrl,
    pageType,
    imageUrl,
    imageAlt,
    keywordsList,
    schemaJson: JSON.stringify(schemaGraph, null, 2),
    noindex,
  };
}

/**
 * Safely sets or updates a meta tag in document head, removing any duplicate tags with the same key.
 */
function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  if (typeof document === 'undefined') return;
  const existing = document.head.querySelectorAll(`meta[${attrName}="${attrValue}"]`);
  let element = existing[0] as HTMLMetaElement | undefined;

  if (existing.length > 1) {
    for (let i = 1; i < existing.length; i += 1) {
      existing[i].parentNode?.removeChild(existing[i]);
    }
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function removeMetaTagsByPrefix(attrName: 'name' | 'property', prefix: string) {
  if (typeof document === 'undefined') return;
  const elements = document.head.querySelectorAll(`meta[${attrName}^="${prefix}"]`);
  elements.forEach((el) => el.parentNode?.removeChild(el));
}

function setCanonicalLinkTag(canonicalHref: string) {
  if (typeof document === 'undefined') return;
  const existingLinks = document.querySelectorAll('link[rel="canonical"]');
  let canonical = existingLinks[0] as HTMLLinkElement | undefined;

  if (existingLinks.length > 1) {
    for (let i = 1; i < existingLinks.length; i += 1) {
      existingLinks[i].parentNode?.removeChild(existingLinks[i]);
    }
  }

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }

  canonical.setAttribute('id', 'canonical-link');
  canonical.setAttribute('href', canonicalHref);
}

/**
 * Updates document head SEO tags, Open Graph tags, Twitter cards, and Schema.org JSON-LD
 * with 100% unique, accurate identifiers per route to prevent canonical overlap.
 */
export function updatePageSEO(config: PageSEOConfig) {
  if (typeof document === 'undefined') return;

  const payload = buildSeoHeadPayload(config);
  const article = config.article;

  // 1. Document Title
  document.title = payload.title;

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', payload.description);
  setMetaTag('name', 'author', payload.author);
  setMetaTag('name', 'robots', payload.robots);
  const existingKeywordsMeta = document.head.querySelectorAll('meta[name="keywords"]');
  existingKeywordsMeta.forEach((el) => el.parentNode?.removeChild(el));

  // 3. Single Authoritative Canonical Link (omitted on 404 pages)
  if (payload.noindex) {
    const existingCanonical = document.querySelectorAll('link[rel="canonical"]');
    existingCanonical.forEach((el) => el.parentNode?.removeChild(el));
  } else {
    setCanonicalLinkTag(payload.canonicalUrl);
  }

  // 4. Open Graph Metadata
  setMetaTag('property', 'og:site_name', 'Digital Pulse');
  setMetaTag('property', 'og:locale', 'en_US');
  setMetaTag('property', 'og:type', payload.pageType);
  setMetaTag('property', 'og:title', payload.title);
  setMetaTag('property', 'og:description', payload.description);
  setMetaTag('property', 'og:url', payload.canonicalUrl);
  setMetaTag('property', 'og:image', payload.imageUrl);
  setMetaTag('property', 'og:image:secure_url', payload.imageUrl);
  setMetaTag('property', 'og:image:alt', payload.imageAlt);
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:type', 'image/jpeg');

  removeMetaTagsByPrefix('property', 'article:');

  if (article) {
    const author = AUTHORS[article.authorId];
    setMetaTag('property', 'article:published_time', article.isoDate);
    setMetaTag('property', 'article:modified_time', article.isoDate);
    setMetaTag('property', 'article:section', article.category);
    setMetaTag(
      'property',
      'article:author',
      author ? author.name : 'Digital Pulse Editorial Team'
    );
    payload.keywordsList.forEach((tag) => {
      const tagMeta = document.createElement('meta');
      tagMeta.setAttribute('property', 'article:tag');
      tagMeta.setAttribute('content', tag);
      document.head.appendChild(tagMeta);
    });
  }

  // 5. Twitter / X Card Metadata
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:site', '@DigitalPulse');
  setMetaTag('name', 'twitter:creator', '@DigitalPulse');
  setMetaTag('name', 'twitter:title', payload.title);
  setMetaTag('name', 'twitter:description', payload.description);
  setMetaTag('name', 'twitter:url', payload.canonicalUrl);
  setMetaTag('name', 'twitter:image', payload.imageUrl);
  setMetaTag('name', 'twitter:image:alt', payload.imageAlt);

  // 6. Schema.org JSON-LD Structured Data
  const existingScripts = document.head.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach((s) => s.parentNode?.removeChild(s));

  const scriptEl = document.createElement('script');
  scriptEl.id = 'schema-jsonld';
  scriptEl.type = 'application/ld+json';
  scriptEl.textContent = payload.schemaJson;
  document.head.appendChild(scriptEl);
}
