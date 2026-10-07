import { Article } from '../types/blog';
import { AUTHORS } from '../data/authors';

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  pathname: string;
  type?: 'website' | 'article';
  image?: string;
  article?: Article;
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function updatePageSEO(config: PageSEOConfig) {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://digitalpulse.vercel.app';
  const cleanPathname = config.pathname === '/' ? '/' : config.pathname.replace(/\/+$/, '');
  const fullUrl = `${origin}${cleanPathname}`;
  const imageUrl = config.image
    ? config.image.startsWith('http')
      ? config.image
      : `${origin}${config.image}`
    : `${origin}/images/photos/digital-marketing-trends-2026.jpg`;

  // 1. Document Title
  document.title = config.title;

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', config.description);
  if (config.keywords && config.keywords.length > 0) {
    setMetaTag('name', 'keywords', config.keywords.join(', '));
  }

  // 3. Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // 4. Open Graph Metadata
  setMetaTag('property', 'og:site_name', 'Digital Pulse');
  setMetaTag('property', 'og:type', config.type || 'website');
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('property', 'og:url', fullUrl);
  setMetaTag('property', 'og:image', imageUrl);

  // 5. Twitter / X Card Metadata
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);
  setMetaTag('name', 'twitter:image', imageUrl);

  // 6. Schema.org JSON-LD Structured Data
  let scriptEl = document.getElementById('schema-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'schema-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  if (config.article) {
    const article = config.article;
    const author = AUTHORS[article.authorId];
    const graph: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl,
        },
        headline: article.title,
        description: article.metaDescription,
        image: [imageUrl],
        datePublished: article.isoDate,
        dateModified: article.isoDate,
        articleSection: article.category,
        keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
        author: {
          '@type': 'Person',
          name: author ? author.name : 'Digital Pulse Editorial Team',
          jobTitle: author ? author.role : 'Editorial Author',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Digital Pulse',
          url: origin,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: origin,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${origin}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: fullUrl,
          },
        ],
      },
    ];

    if (article.faqs && article.faqs.length > 0) {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    scriptEl.textContent = JSON.stringify(graph, null, 2);
  } else {
    const webSchema = {
      '@context': 'https://schema.org',
      '@type': cleanPathname === '/blog' ? 'CollectionPage' : 'WebSite',
      name: config.title,
      url: fullUrl,
      description: config.description,
      publisher: {
        '@type': 'Organization',
        name: 'Digital Pulse',
        description:
          'Practical insights on digital marketing, technology, social media and online business.',
      },
    };
    scriptEl.textContent = JSON.stringify(webSchema, null, 2);
  }
}
