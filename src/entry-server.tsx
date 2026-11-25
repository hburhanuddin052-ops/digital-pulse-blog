import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { ALL_ARTICLES, getArticleBySlug, estimateArticleWordCount } from './data/articles';
import { getEditorialSEOByPath, CANONICAL_ORIGIN } from './data/seoEditorialData';
import {
  buildSeoHeadPayload,
  getArticleCanonicalImageUrl,
  normalizeCanonicalPathname,
  SeoHeadPayload,
} from './utils/seo';

export { ALL_ARTICLES, CANONICAL_ORIGIN };

export interface RenderedRouteResult {
  appHtml: string;
  head: SeoHeadPayload;
}

export function renderRoute(pathname: string): RenderedRouteResult {
  const cleanPath = normalizeCanonicalPathname(pathname);
  const appHtml = renderToString(<App initialPath={cleanPath} />);

  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const article = getArticleBySlug(slug);
    const editorial = getEditorialSEOByPath(cleanPath);

    if (article) {
      const head = buildSeoHeadPayload({
        title: editorial ? editorial.seoTitle : article.seoTitle,
        description: editorial ? editorial.metaDescription : article.metaDescription,
        keywords: [article.primaryKeyword, ...article.secondaryKeywords],
        pathname: `/blog/${article.slug}`,
        type: 'article',
        image: getArticleCanonicalImageUrl(article),
        imageAlt: article.imageAlt,
        article,
        wordCount: estimateArticleWordCount(article),
      });
      return { appHtml, head };
    }

    return {
      appHtml,
      head: buildSeoHeadPayload({
        title: '404: Page Not Found | Digital Pulse Blog',
        description:
          'Oops! This page could not be found. Explore our 10 complete digital marketing, SEO, and social media guides or return to the homepage.',
        pathname: cleanPath,
        type: 'website',
        noindex: true,
      }),
    };
  }

  const editorial = getEditorialSEOByPath(cleanPath);
  const shouldIncludeArticleList = cleanPath === '/' || cleanPath === '/blog';

  if (editorial) {
    return {
      appHtml,
      head: buildSeoHeadPayload({
        title: editorial.seoTitle,
        description: editorial.metaDescription,
        keywords: [editorial.primaryKeyword, ...editorial.secondaryKeywords],
        pathname: editorial.pathname,
        type: 'website',
        listedArticles: shouldIncludeArticleList ? ALL_ARTICLES : undefined,
      }),
    };
  }

  if (cleanPath === '/') {
    return {
      appHtml,
      head: buildSeoHeadPayload({
        title: 'Digital Pulse: Digital Marketing, SEO & Social Media Blog',
        description:
          'Digital Pulse is an independent digital marketing blog covering SEO, social media marketing, AI tools, and online business strategy for founders and students.',
        keywords: ['digital marketing blog', 'social media strategy', 'online business insights'],
        pathname: '/',
        type: 'website',
        listedArticles: ALL_ARTICLES,
      }),
    };
  }

  return {
    appHtml,
    head: buildSeoHeadPayload({
      title: '404: Page Not Found | Digital Pulse Blog',
      description:
        'Oops! This page could not be found. Explore our 10 complete digital marketing, SEO, and social media guides or return to the homepage.',
      pathname: cleanPath,
      type: 'website',
      noindex: true,
    }),
  };
}
