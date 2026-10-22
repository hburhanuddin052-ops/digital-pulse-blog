import React from 'react';
import { Home, BookOpen, ArrowRight, Compass } from 'lucide-react';
import { ALL_ARTICLES } from '../data/articles';
import { AUTHORS } from '../data/authors';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  // Select top featured articles to recommend to lost visitors
  const popularArticles = ALL_ARTICLES.slice(0, 4);

  return (
    <div className="animate-fade-in py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* 404 Hero Banner */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 mb-6">
          <span>Error 404</span>
          <span>•</span>
          <span>Page Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-4">
          Oops! This page could not be found.
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-slate-300 mb-8 leading-relaxed">
          The URL you requested does not exist on Digital Pulse. It may have been moved, mistyped,
          or archived. Use the options below to find what you need.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm transition-colors shadow-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#111827] hover:bg-neutral-50 dark:hover:bg-slate-800 text-neutral-800 dark:text-slate-200 font-medium text-sm transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse All 10 Articles</span>
          </button>
        </div>
      </div>

      {/* Recommended Guides Section */}
      <div className="border-t border-neutral-200 dark:border-slate-800 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
              Popular Marketing &amp; SEO Articles
            </h2>
            <p className="text-sm text-neutral-500 dark:text-slate-400">
              Start with these research-backed guides recommended by our editorial team:
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer self-start sm:self-auto"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularArticles.map((art) => (
            <div
              key={art.id}
              className="group p-6 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-slate-400 mb-3">
                  <span className="font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                    {art.category}
                  </span>
                  <span>{art.readingTimeMinutes} min read</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/blog/${art.slug}`)}
                    className="text-left cursor-pointer"
                  >
                    {art.title}
                  </button>
                </h3>
                <p className="text-sm text-neutral-600 dark:text-slate-300 line-clamp-2 mb-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-neutral-500 dark:text-slate-400">
                  By {AUTHORS[art.authorId]?.name || 'Editorial Team'}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate(`/blog/${art.slug}`)}
                  className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Directory Links */}
      <div className="mt-12 p-6 rounded-xl bg-neutral-100/80 dark:bg-[#0E1420] border border-neutral-200 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
          <Compass className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          Looking for Something Specific?
        </h3>
        <p className="text-sm text-neutral-600 dark:text-slate-400 mb-4">
          Navigate to other core sections of Digital Pulse or contact our editorial desk:
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="text-xs font-medium px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 text-neutral-800 dark:text-slate-200 border border-neutral-200 dark:border-slate-700 hover:border-blue-500 cursor-pointer"
          >
            Homepage
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="text-xs font-medium px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 text-neutral-800 dark:text-slate-200 border border-neutral-200 dark:border-slate-700 hover:border-blue-500 cursor-pointer"
          >
            Blog Directory
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/about')}
            className="text-xs font-medium px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 text-neutral-800 dark:text-slate-200 border border-neutral-200 dark:border-slate-700 hover:border-blue-500 cursor-pointer"
          >
            About Digital Pulse
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="text-xs font-medium px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 text-neutral-800 dark:text-slate-200 border border-neutral-200 dark:border-slate-700 hover:border-blue-500 cursor-pointer"
          >
            Contact Editorial Team
          </button>
        </div>
      </div>
    </div>
  );
};
