import { Article, CategoryName } from '../types/blog';
import { ARTICLES_PART_1 } from './articlesPart1';
import { ARTICLES_PART_2 } from './articlesPart2';
import { ARTICLES_PART_3 } from './articlesPart3';
import { ARTICLES_PART_4 } from './articlesPart4';
import { ARTICLE_FAQS } from './articleFaqs';
import { AUTHORS, CATEGORIES } from './authors';

export const ALL_ARTICLES: Article[] = [
  ...ARTICLES_PART_1,
  ...ARTICLES_PART_2,
  ...ARTICLES_PART_3,
  ...ARTICLES_PART_4,
].map((article) => ({
  ...article,
  faqs: ARTICLE_FAQS[article.slug] || [],
}));

export { AUTHORS, CATEGORIES };

export function getArticleBySlug(slug: string): Article | undefined {
  const cleanSlug = decodeURIComponent(slug)
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/^blog\//, '')
    .replace(/\/index\.html$/i, '')
    .replace(/\.html$/i, '');
  return ALL_ARTICLES.find((article) => article.slug.toLowerCase() === cleanSlug);
}

export function getFeaturedArticle(): Article {
  return ALL_ARTICLES.find((article) => article.featured) || ALL_ARTICLES[0];
}

export function getPopularArticles(limit = 4): Article[] {
  return [...ALL_ARTICLES]
    .sort((a, b) => (a.popularRank || 99) - (b.popularRank || 99))
    .slice(0, limit);
}

export function getRelatedArticles(article: Article): Article[] {
  const related = article.relatedSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => Boolean(a));

  if (related.length >= 3) {
    return related.slice(0, 3);
  }

  const fallback = ALL_ARTICLES.filter(
    (a) => a.id !== article.id && !related.some((r) => r.id === a.id)
  );
  return [...related, ...fallback].slice(0, 3);
}

export function filterAndSearchArticles(
  category: CategoryName | 'All',
  searchQuery: string
): Article[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return ALL_ARTICLES.filter((article) => {
    const matchesCategory = category === 'All' || article.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const author = AUTHORS[article.authorId];
    const inTitle = article.title.toLowerCase().includes(normalizedQuery);
    const inExcerpt = article.excerpt.toLowerCase().includes(normalizedQuery);
    const inCategory = article.category.toLowerCase().includes(normalizedQuery);
    const inAuthor = author ? author.name.toLowerCase().includes(normalizedQuery) : false;
    const inKeywords =
      article.primaryKeyword.toLowerCase().includes(normalizedQuery) ||
      article.secondaryKeywords.some((k) => k.toLowerCase().includes(normalizedQuery));
    const inSections = article.sections.some(
      (s) =>
        s.heading.toLowerCase().includes(normalizedQuery) ||
        (s.paragraphs && s.paragraphs.some((p) => p.toLowerCase().includes(normalizedQuery)))
    );

    return inTitle || inExcerpt || inCategory || inAuthor || inKeywords || inSections;
  });
}

export function estimateArticleWordCount(article: Article): number {
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
    if (sec.exampleBox) {
      chunks.push(sec.exampleBox.title, sec.exampleBox.content);
    }
    if (sec.pullQuote) {
      chunks.push(sec.pullQuote.quote, sec.pullQuote.context);
    }
    if (sec.subSections) {
      sec.subSections.forEach((sub) => {
        chunks.push(sub.subHeading, ...sub.paragraphs);
        if (sub.bullets) chunks.push(...sub.bullets);
      });
    }
  });

  if (article.faqs) {
    article.faqs.forEach((f) => {
      chunks.push(f.question, f.answer);
    });
  }

  article.sources.forEach((src) => {
    chunks.push(src.title, src.publisher, src.note || '');
  });

  return chunks
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
