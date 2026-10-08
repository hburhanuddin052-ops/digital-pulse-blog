import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { filterAndSearchArticles } from '../data/articles';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  globalSearchQuery: string;
  onGlobalSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  globalSearchQuery,
  onGlobalSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchModalOpen]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setSearchModalOpen(false);
    onNavigate(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchModalOpen(false);
    setMobileMenuOpen(false);
    onNavigate('/blog');
  };

  const quickResults = globalSearchQuery.trim()
    ? filterAndSearchArticles('All', globalSearchQuery).slice(0, 5)
    : [];

  return (
    <>
      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-700 focus:text-white focus:rounded-lg focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-neutral-200/80 dark:border-slate-800/80 glass-header transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white whitespace-nowrap shrink-0"
          >
            Digital Pulse
          </a>

          {/* Zone 2: 4 clean text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-slate-300"
          >
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath === item.path || currentPath.startsWith(`${item.path}/`);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                    isActive
                      ? 'border-blue-700 dark:border-blue-400 text-neutral-950 dark:text-white font-semibold'
                      : 'border-transparent hover:text-neutral-950 dark:hover:text-white hover:border-neutral-300 dark:hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions (Search + Theme toggle + Mobile Hamburger) */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSearchModalOpen((prev) => !prev)}
              aria-label="Search articles"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-slate-200 glass-panel border border-neutral-200/90 dark:border-slate-700/90 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Search articles</span>
            </button>

            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 text-neutral-700 dark:text-slate-200 glass-panel border border-neutral-200/90 dark:border-slate-700/90 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors shrink-0 cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-neutral-700 dark:text-slate-200 glass-panel border border-neutral-200/90 dark:border-slate-700/90 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 dark:border-slate-800 glass-panel px-4 py-4 space-y-3">
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? currentPath === '/'
                    : currentPath === item.path || currentPath.startsWith(`${item.path}/`);
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-semibold'
                        : 'text-neutral-700 dark:text-slate-300 hover:bg-neutral-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Live Search Overlay Bar */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search Digital Pulse articles"
            className="w-full max-w-2xl glass-card border border-neutral-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden animate-fade-in"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center px-4 border-b border-neutral-200 dark:border-slate-800"
            >
              <Search className="w-4 h-4 text-neutral-400 shrink-0" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={globalSearchQuery}
                onChange={(e) => onGlobalSearchChange(e.target.value)}
                placeholder="Search 10 in-depth articles by keyword, topic, or SEO concept..."
                className="w-full px-3 py-4 text-sm bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
              />
              {globalSearchQuery && (
                <button
                  type="button"
                  onClick={() => onGlobalSearchChange('')}
                  className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-white mr-2 whitespace-nowrap"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                aria-label="Close search"
                className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>

            <div className="p-4 max-h-96 overflow-y-auto">
              {!globalSearchQuery.trim() ? (
                <div className="py-4 text-center">
                  <p className="text-xs text-neutral-500 dark:text-slate-400 mb-3">
                    Popular search topics:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      'SEO for beginners',
                      'Algorithms',
                      'Short-form video',
                      'AI marketing',
                      'Online reviews',
                      'Misinformation',
                    ].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => onGlobalSearchChange(term)}
                        className="px-3 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 rounded-md hover:bg-neutral-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : quickResults.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-neutral-500 dark:text-slate-400 px-2">
                    Matching articles ({quickResults.length}):
                  </p>
                  {quickResults.map((article) => (
                    <a
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      onClick={(e) => handleLinkClick(e, `/blog/${article.slug}`)}
                      className="block p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-800/70 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400 mb-1">
                        <span>{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-neutral-500 dark:text-slate-400">
                          {article.readingTimeMinutes} min read
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {article.title}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {article.excerpt}
                      </p>
                    </a>
                  ))}
                  <div className="pt-2 border-t border-neutral-100 dark:border-slate-800 text-right">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <span>View all results on Blog page</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="py-6 text-center text-sm text-neutral-500 dark:text-slate-400">
                  No articles matched "{globalSearchQuery}". Try searching for "SEO", "Instagram",
                  "AI", or "Reviews".
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
