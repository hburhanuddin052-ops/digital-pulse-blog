import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ALL_ARTICLES,
  AUTHORS,
  CATEGORIES,
  getFeaturedArticle,
  getPopularArticles,
} from '../data/articles';
import { CategoryName } from '../types/blog';
import { EditorialImage } from '../components/EditorialImage';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectCategory: (cat: CategoryName | 'All') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryName | 'All'>('All');
  const featuredArticle = getFeaturedArticle();
  const featuredAuthor = AUTHORS[featuredArticle.authorId];
  const popularArticles = getPopularArticles(4);

  const latestArticles =
    activeCategory === 'All'
      ? ALL_ARTICLES.filter((a) => a.id !== featuredArticle.id).slice(0, 6)
      : ALL_ARTICLES.filter((a) => a.category === activeCategory);

  const handleArticleLink = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    onNavigate(`/blog/${slug}`);
  };

  const handleViewAllBlog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSelectCategory('All');
    onNavigate('/blog');
  };

  return (
    <div>
      {/* 1. Editorial Hero & Lead Featured Story (3-Tier Salience) */}
      <section className="border-b border-neutral-200 dark:border-slate-800 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Masthead Kicker & Introduction */}
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
              Independent Digital Publication · 2026 Edition
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.12] mb-4">
              Evidence-based reporting on digital marketing, search, and online business.
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-slate-300 leading-relaxed">
              Practical guides and research-backed breakdowns written for college students, young
              entrepreneurs, digital marketers, and small business owners.
            </p>
          </div>

          {/* Lead Story vs. Popular Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Lead Featured Article (8 cols) */}
            <div className="lg:col-span-8 group">
              <a
                href={`/blog/${featuredArticle.slug}`}
                onClick={(e) => handleArticleLink(e, featuredArticle.slug)}
                className="block rounded-xl overflow-hidden border border-neutral-200 dark:border-slate-800 mb-2"
              >
                <EditorialImage
                  src={featuredArticle.image}
                  alt={featuredArticle.imageAlt}
                  category={featuredArticle.category}
                  title={featuredArticle.title}
                  aspectClass="aspect-[16/9]"
                  priority
                />
              </a>
              {featuredArticle.imageCredit && (
                <p className="text-[11px] text-neutral-500 dark:text-slate-400 mb-4">
                  Photo by{' '}
                  <a
                    href={featuredArticle.imageCredit.photographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-neutral-800 dark:hover:text-slate-200"
                  >
                    {featuredArticle.imageCredit.photographer}
                  </a>{' '}
                  on{' '}
                  <a
                    href={featuredArticle.imageCredit.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-neutral-800 dark:hover:text-slate-200"
                  >
                    {featuredArticle.imageCredit.sourceName}
                  </a>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-slate-400 mb-2.5 tabular-nums">
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  Featured Lead · {featuredArticle.category}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={featuredArticle.isoDate}>{featuredArticle.publishedAt}</time>
                <span aria-hidden="true">·</span>
                <span>{featuredArticle.readingTimeMinutes} min read</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                <a
                  href={`/blog/${featuredArticle.slug}`}
                  onClick={(e) => handleArticleLink(e, featuredArticle.slug)}
                >
                  {featuredArticle.title}
                </a>
              </h2>

              <p className="text-base text-neutral-600 dark:text-slate-300 leading-relaxed mb-5 max-w-2xl">
                {featuredArticle.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-200 dark:border-slate-800">
                <div className="text-xs text-neutral-600 dark:text-slate-400">
                  By{' '}
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {featuredAuthor?.name}
                  </span>{' '}
                  · {featuredAuthor?.role}
                </div>
                <a
                  href={`/blog/${featuredArticle.slug}`}
                  onClick={(e) => handleArticleLink(e, featuredArticle.slug)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Read Featured Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Popular Articles Rail (4 cols) */}
            <aside
              aria-labelledby="popular-articles-heading"
              className="lg:col-span-4 border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl p-6"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-200 dark:border-slate-800">
                <h2
                  id="popular-articles-heading"
                  className="text-sm font-bold tracking-tight text-neutral-950 dark:text-white"
                >
                  Most Read on Digital Pulse
                </h2>
                <span className="text-xs text-neutral-500 dark:text-slate-400 tabular-nums">
                  Top 4
                </span>
              </div>

              <ol className="divide-y divide-neutral-200 dark:divide-slate-800">
                {popularArticles.map((article, index) => {
                  const author = AUTHORS[article.authorId];
                  return (
                    <li key={article.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-3.5">
                        <span className="text-sm font-mono font-semibold text-blue-700 dark:text-blue-400 tabular-nums mt-0.5">
                          0{index + 1}.
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-slate-400 mb-1 tabular-nums">
                            <span className="font-medium text-neutral-700 dark:text-slate-300">
                              {article.category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{article.readingTimeMinutes} min read</span>
                          </div>
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                            <a
                              href={`/blog/${article.slug}`}
                              onClick={(e) => handleArticleLink(e, article.slug)}
                            >
                              {article.title}
                            </a>
                          </h3>
                          <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">
                            By {author?.name}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-slate-800">
                <a
                  href="/blog"
                  onClick={handleViewAllBlog}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline whitespace-nowrap"
                >
                  <span>Browse all 10 complete articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 2. Latest Articles Section with Interactive Category Filter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1.5">
                Recent Reporting &amp; Guides
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Latest Articles
              </h2>
            </div>

            {/* Interactive Category Filter Control (functional buttons) */}
            <div
              role="tablist"
              aria-label="Filter latest articles by category"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/70 dark:bg-slate-900 rounded-lg"
            >
              {(['All', ...CATEGORIES.map((c) => c.name)] as const).map((catName) => {
                const active = activeCategory === catName;
                return (
                  <button
                    key={catName}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(catName)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white dark:bg-slate-800 text-neutral-950 dark:text-white shadow-xs font-semibold'
                        : 'text-neutral-600 dark:text-slate-400 hover:text-neutral-950 dark:hover:text-white'
                    }`}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/blog"
              onClick={handleViewAllBlog}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-900 dark:text-white bg-white dark:bg-slate-900 border border-neutral-300 dark:border-slate-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-500 transition-colors whitespace-nowrap"
            >
              <span>View All 10 Articles in Archive</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Editorial Categories Directory */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#0E1420]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1.5">
              Topic Desks
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
              Explore by Subject Category
            </h2>
            <p className="text-sm text-neutral-600 dark:text-slate-300">
              Every article on Digital Pulse is organized into five core subject desks with verified
              primary citations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CATEGORIES.map((cat, idx) => {
              const count = ALL_ARTICLES.filter((a) => a.category === cat.name).length;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat.name);
                    onNavigate('/blog');
                  }}
                  className="text-left p-5 rounded-xl border border-neutral-200 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-900/80 hover:border-blue-600 dark:hover:border-blue-500 transition-colors flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="text-xs font-mono text-neutral-400 dark:text-slate-500 mb-2 tabular-nums">
                      0{idx + 1}. Desk · {count} {count === 1 ? 'Article' : 'Articles'}
                    </div>
                    <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-slate-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-200/70 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400">
                    <span>Read desk</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Newsletter Signup Section */}
      <NewsletterSection />
    </div>
  );
};
