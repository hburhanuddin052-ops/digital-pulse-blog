import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Article } from '../types/blog';
import { AUTHORS } from '../data/authors';
import { EditorialImage } from './EditorialImage';

interface ArticleCardProps {
  article: Article;
  onNavigate: (path: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate }) => {
  const author = AUTHORS[article.authorId];
  const articlePath = `/blog/${article.slug}`;

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(articlePath);
  };

  return (
    <article className="group flex flex-col justify-between border border-neutral-200/90 dark:border-slate-800/90 glass-card rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/40 dark:hover:border-blue-400/40">
      <div>
        <a
          href={articlePath}
          onClick={handleCardClick}
          className="block focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <EditorialImage
            src={article.image}
            webpSrc={article.webpImage}
            alt={article.imageAlt}
            category={article.category}
            title={article.title}
            aspectClass="aspect-[16/10]"
          />
        </a>

        <div className="p-6 pb-4">
          {/* Category, Date & Reading Time */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-slate-400 mb-3 tabular-nums">
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.isoDate}>{article.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>

          {/* Article Title (Statement title, not forced into a question) */}
          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-snug mb-2.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            <a href={articlePath} onClick={handleCardClick}>
              {article.title}
            </a>
          </h3>

          {/* Short Description */}
          <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Author & Read Article Button */}
      <div className="px-6 pb-6 pt-3 mt-2 border-t border-neutral-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
        <div className="text-xs text-neutral-600 dark:text-slate-400 truncate">
          By{' '}
          <span className="font-medium text-neutral-900 dark:text-slate-200">
            {author?.name || 'Digital Pulse Staff'}
          </span>
        </div>

        <a
          href={articlePath}
          onClick={handleCardClick}
          aria-label={`Read Article: ${article.title}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/70 group-hover:bg-blue-700 group-hover:text-white group-hover:border-blue-700 transition-colors whitespace-nowrap shrink-0"
        >
          <span>Read Article</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
};
