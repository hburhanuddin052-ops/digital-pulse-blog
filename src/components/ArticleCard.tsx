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
    <article className="group flex flex-col justify-between border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl overflow-hidden transition-colors duration-150 hover:border-neutral-300 dark:hover:border-slate-700">
      <div>
        <a
          href={articlePath}
          onClick={handleCardClick}
          className="block focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <EditorialImage
            src={article.image}
            alt={article.imageAlt}
            category={article.category}
            title={article.title}
            aspectClass="aspect-[16/10]"
          />
        </a>
        {article.imageCredit && (
          <div className="px-6 pt-2 text-[11px] text-neutral-400 dark:text-slate-500">
            Photo by{' '}
            <a
              href={article.imageCredit.photographerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-600 dark:hover:text-slate-300"
            >
              {article.imageCredit.photographer}
            </a>{' '}
            on{' '}
            <a
              href={article.imageCredit.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-600 dark:hover:text-slate-300"
            >
              {article.imageCredit.sourceName}
            </a>
          </div>
        )}

        <div className="p-6 pb-4">
          {/* Unboxed static metadata per Zero-Pill constitution */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-slate-400 mb-3 tabular-nums">
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.isoDate}>{article.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-snug mb-2.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            <a href={articlePath} onClick={handleCardClick}>
              {article.title}
            </a>
          </h3>

          <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 mt-2 border-t border-neutral-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
        <div className="text-xs text-neutral-600 dark:text-slate-400 truncate">
          By <span className="font-medium text-neutral-900 dark:text-slate-200">{author?.name || 'Digital Pulse Staff'}</span>
        </div>

        <a
          href={articlePath}
          onClick={handleCardClick}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 whitespace-nowrap shrink-0 transition-colors"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
};
