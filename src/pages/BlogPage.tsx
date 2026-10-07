import React from 'react';
import { Search, X } from 'lucide-react';
import { ALL_ARTICLES, CATEGORIES, filterAndSearchArticles } from '../data/articles';
import { CategoryName } from '../types/blog';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface BlogPageProps {
  selectedCategory: CategoryName | 'All';
  onSelectCategory: (cat: CategoryName | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigate,
}) => {
  const filteredArticles = filterAndSearchArticles(selectedCategory, searchQuery);

  return (
    <div>
      {/* Archive Header & Search / Filter Controls */}
      <section className="border-b border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#0E1420] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
              Complete Editorial Archive · 10 Original Guides
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-3">
              All Digital Pulse Articles
            </h1>
            <p className="text-base text-neutral-600 dark:text-slate-300 leading-relaxed">
              Browse all 10 long-form, research-backed articles on digital marketing trends, social
              media recommendation algorithms, beginner SEO, artificial intelligence, Instagram
              growth, short-form video, online reviews, personal branding, and misinformation.
            </p>
          </div>

          {/* Search Input + Category Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
            {/* Interactive Category Tabs */}
            <div
              role="tablist"
              aria-label="Filter articles by category"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-lg"
            >
              {(['All', ...CATEGORIES.map((c) => c.name)] as const).map((catName) => {
                const isActive = selectedCategory === catName;
                const count =
                  catName === 'All'
                    ? ALL_ARTICLES.length
                    : ALL_ARTICLES.filter((a) => a.category === catName).length;
                return (
                  <button
                    key={catName}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onSelectCategory(catName)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                      isActive
                        ? 'bg-blue-700 text-white font-semibold'
                        : 'text-neutral-600 dark:text-slate-400 hover:text-neutral-950 dark:hover:text-white'
                    }`}
                  >
                    {catName} ({count})
                  </button>
                );
              })}
            </div>

            {/* Live Search Bar */}
            <div className="relative w-full lg:w-80">
              <label htmlFor="blog-search-input" className="sr-only">
                Search articles
              </label>
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="blog-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by keyword or topic..."
                className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-neutral-300 dark:border-slate-700 bg-[#FAFAFA] dark:bg-slate-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 text-xs text-neutral-500 dark:text-slate-400 tabular-nums">
            <p>
              Showing <span className="font-semibold text-neutral-900 dark:text-white">{filteredArticles.length}</span> of{' '}
              {ALL_ARTICLES.length} published articles
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              {searchQuery.trim() ? ` matching "${searchQuery}"` : ''}
            </p>
            {(selectedCategory !== 'All' || searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  onSearchChange('');
                }}
                className="font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
              ))}
            </div>
          ) : (
            <div className="border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-12 text-center max-w-lg mx-auto my-8">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                No matching articles found
              </h2>
              <p className="text-sm text-neutral-600 dark:text-slate-400 mb-6">
                We could not find an article matching "{searchQuery}" in {selectedCategory}. Try
                clearing your filter or searching for another marketing term.
              </p>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  onSearchChange('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
              >
                Show All 10 Articles
              </button>
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};
