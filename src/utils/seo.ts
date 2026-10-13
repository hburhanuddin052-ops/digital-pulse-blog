import { Article } from '../types/blog';
import { AUTHORS } from '../data/authors';

export const CANONICAL_ORIGIN = 'https://digital-pulse-blog.vercel.app';

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  pathname: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  article?: Article;
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

/**
 * Safely sets or updates a meta tag in document head, removing any duplicate tags with the same key.
 */
function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  if (typeof document === 'undefined') return;
  const existing = document.head.querySelectorAll(`meta[${attrName}="${attrValue}"]`);
  let element = existing[0] as HTMLMetaElement | undefined;

  // Purge any duplicate meta tags with identical key to prevent metadata conflict
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

/**
 * Safely removes all meta tags matching a specific attribute prefix (e.g., 'article:').
 */
function removeMetaTagsByPrefix(attrName: 'name' | 'property', prefix: string) {
  if (typeof document === 'undefined') return;
  const elements = document.head.querySelectorAll(`meta[${attrName}^="${prefix}"]`);
  elements.forEach((el) => el.parentNode?.removeChild(el));
}

/**
 * Enforces a single, authoritative <link rel="canonical"> tag in the document,
 * completely purging any extra or duplicate canonical links to prevent canonical overlap.
 */
function setCanonicalLinkTag(canonicalHref: string) {
  if (typeof document === 'undefined') return;
  const existingLinks = document.querySelectorAll('link[rel="canonical"]');
  let canonical = existingLinks[0] as HTMLLinkElement | undefined;

  // Deduplicate if multiple canonical tags exist across the document
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

  const article = config.article;
  const effectivePathname = article ? `/blog/${article.slug}` : config.pathname;
  const cleanPathname = normalizeCanonicalPathname(effectivePathname);
  const fullCanonicalUrl = getCanonicalUrl(cleanPathname);

  // Resolve unique image URL & alt text per article or fallback for core pages
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

  // 1. Document Title
  document.title = config.title;

  // 2. Standard Meta Tags (Keywords are stored as editorial SEO data; keywords meta tag is omitted per search engine standards)
  setMetaTag('name', 'description', config.description);
  setMetaTag('name', 'author', article ? (AUTHORS[article.authorId]?.name || 'Digital Pulse Editorial Team') : 'Digital Pulse Editorial Team');
  setMetaTag('name', 'robots', 'index, follow');
  const existingKeywordsMeta = document.head.querySelectorAll('meta[name="keywords"]');
  existingKeywordsMeta.forEach((el) => el.parentNode?.removeChild(el));

  // 3. Single Authoritative Canonical Link (strictly prevents canonical overlap across routes)
  setCanonicalLinkTag(fullCanonicalUrl);

  // 4. Open Graph Metadata with Unique Identifiers
  setMetaTag('property', 'og:site_name', 'Digital Pulse');
  setMetaTag('property', 'og:locale', 'en_US');
  setMetaTag('property', 'og:type', pageType);
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('property', 'og:url', fullCanonicalUrl);
  setMetaTag('property', 'og:image', imageUrl);
  setMetaTag('property', 'og:image:secure_url', imageUrl);
  setMetaTag('property', 'og:image:alt', imageAlt);
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:type', 'image/jpeg');

  // Purge any stale article:* Open Graph tags from previous routes
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
    // Append each keyword as individual article:tag meta element (Open Graph standard)
    keywordsList.forEach((tag) => {
      const tagMeta = document.createElement('meta');
      tagMeta.setAttribute('property', 'article:tag');
      tagMeta.setAttribute('content', tag);
      document.head.appendChild(tagMeta);
    });
  }

  // 5. Twitter / X Card Metadata with Exact Canonical URL Alignment
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:site', '@DigitalPulse');
  setMetaTag('name', 'twitter:creator', '@DigitalPulse');
  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);
  setMetaTag('name', 'twitter:url', fullCanonicalUrl);
  setMetaTag('name', 'twitter:image', imageUrl);
  setMetaTag('name', 'twitter:image:alt', imageAlt);

  // 6. Schema.org JSON-LD Structured Data with Unique @id Entities
  // Remove all previous application/ld+json tags in document head to avoid schema duplication
  const existingScripts = document.head.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach((s) => s.parentNode?.removeChild(s));

  const scriptEl = document.createElement('script');
  scriptEl.id = 'schema-jsonld';
  scriptEl.type = 'application/ld+json';

  const organizationId = `${CANONICAL_ORIGIN}/#organization`;
  const websiteId = `${CANONICAL_ORIGIN}/#website`;
  const webpageId = `${fullCanonicalUrl}#webpage`;
  const primaryImageId = `${fullCanonicalUrl}#primaryimage`;
  const breadcrumbId = `${fullCanonicalUrl}#breadcrumb`;

  if (article) {
    const author = AUTHORS[article.authorId];
    const authorIdUri = `${CANONICAL_ORIGIN}/#author-${article.authorId}`;
    const articleIdUri = `${fullCanonicalUrl}#article`;
    const globalArticleIdentifier = getArticleGlobalIdentifier(article);

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Digital Pulse',
        url: `${CANONICAL_ORIGIN}/`,
        description:
          'Independent digital publication covering digital marketing, social media, technology, and online business.',
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${CANONICAL_ORIGIN}/`,
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
        keywords: keywordsList.join(', '),
        inLanguage: 'en-US',
        timeRequired: `PT${article.readingTimeMinutes}M`,
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

    scriptEl.textContent = JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@graph': graph,
      },
      null,
      2
    );
  } else {
    const pageSchemaType = cleanPathname === '/blog' ? 'CollectionPage' : 'WebPage';
    const webGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': organizationId,
          name: 'Digital Pulse',
          url: `${CANONICAL_ORIGIN}/`,
          description:
            'Practical insights on digital marketing, technology, social media and online business.',
        },
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url: `${CANONICAL_ORIGIN}/`,
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
          caption: imageAlt,
        },
        {
          '@type': pageSchemaType,
          '@id': webpageId,
          url: fullCanonicalUrl,
          name: config.title,
          description: config.description,
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
      ],
    };
    scriptEl.textContent = JSON.stringify(webGraph, null, 2);
  }

  document.head.appendChild(scriptEl);
}
