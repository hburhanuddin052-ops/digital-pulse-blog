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
 * Returns the unique, deterministic public Open Graph / Schema image URL
 * for each of the 10 blog articles based on its unique slug.
 */
export function getArticleCanonicalImageUrl(article: Article): string {
  return `${CANONICAL_ORIGIN}/images/photos/${article.slug}.jpg`;
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  const existing = document.head.querySelectorAll(`meta[${attrName}="${attrValue}"]`);
  let element = existing[0] as HTMLMetaElement | undefined;

  // Remove any accidental duplicate meta tags with the same key
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
  const elements = document.head.querySelectorAll(`meta[${attrName}^="${prefix}"]`);
  elements.forEach((el) => el.parentNode?.removeChild(el));
}

function setCanonicalLinkTag(canonicalHref: string) {
  const existingLinks = document.head.querySelectorAll('link[rel="canonical"]');
  let canonical = existingLinks[0] as HTMLLinkElement | undefined;

  // Deduplicate if multiple canonical tags exist to prevent canonical link overlap
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

export function updatePageSEO(config: PageSEOConfig) {
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

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', config.description);
  if (keywordsList.length > 0) {
    setMetaTag('name', 'keywords', keywordsList.join(', '));
  }

  // 3. Single Authoritative Canonical Link (prevents canonical overlap across routes)
  setCanonicalLinkTag(fullCanonicalUrl);

  // 4. Open Graph Metadata with Unique Article Identifiers
  setMetaTag('property', 'og:site_name', 'Digital Pulse');
  setMetaTag('property', 'og:locale', 'en_US');
  setMetaTag('property', 'og:type', pageType);
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('property', 'og:url', fullCanonicalUrl);
  setMetaTag('property', 'og:image', imageUrl);
  setMetaTag('property', 'og:image:alt', imageAlt);

  // Clear previous article:* Open Graph tags before setting current route's tags
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
    setMetaTag('property', 'article:tag', keywordsList.join(', '));
  }

  // 5. Twitter / X Card Metadata
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);
  setMetaTag('name', 'twitter:image', imageUrl);
  setMetaTag('name', 'twitter:image:alt', imageAlt);

  // 6. Schema.org JSON-LD Structured Data with Unique @id Entities
  let scriptEl = document.getElementById('schema-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'schema-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const organizationId = `${CANONICAL_ORIGIN}/#organization`;
  const websiteId = `${CANONICAL_ORIGIN}/#website`;
  const webpageId = `${fullCanonicalUrl}#webpage`;
  const primaryImageId = `${fullCanonicalUrl}#primaryimage`;
  const breadcrumbId = `${fullCanonicalUrl}#breadcrumb`;

  if (article) {
    const author = AUTHORS[article.authorId];
    const authorIdUri = `${CANONICAL_ORIGIN}/#author-${article.authorId}`;
    const articleIdUri = `${fullCanonicalUrl}#article`;

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
        datePublished: article.isoDate,
        dateModified: article.isoDate,
      },
      {
        '@type': 'BlogPosting',
        '@id': articleIdUri,
        identifier: `digital-pulse-article-${article.id}-${article.slug}`,
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
        author: {
          '@type': 'Person',
          '@id': authorIdUri,
          name: author ? author.name : 'Digital Pulse Editorial Team',
          jobTitle: author ? author.role : 'Editorial Author',
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
          '@type': pageSchemaType,
          '@id': webpageId,
          url: fullCanonicalUrl,
          name: config.title,
          description: config.description,
          isPartOf: {
            '@id': websiteId,
          },
          publisher: {
            '@id': organizationId,
          },
        },
      ],
    };
    scriptEl.textContent = JSON.stringify(webGraph, null, 2);
  }
}
