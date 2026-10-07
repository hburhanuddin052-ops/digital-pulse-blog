import React, { useState } from 'react';
import { CATEGORIES } from '../data/authors';
import { CategoryName } from '../types/blog';

interface FooterProps {
  onNavigate: (path: string) => void;
  onSelectCategory?: (category: CategoryName) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, category: CategoryName) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    onNavigate('/blog');
  };

  const handleSocialPlaceholder = (platform: string) => {
    setSocialNotice(`Digital Pulse official ${platform} profile link placeholder.`);
    setTimeout(() => setSocialNotice(null), 3500);
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-neutral-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white inline-block"
            >
              Digital Pulse
            </a>
            <p className="text-sm text-neutral-600 dark:text-slate-300 max-w-sm leading-relaxed">
              Practical insights on digital marketing, technology, social media and online business.
            </p>
            <div className="pt-1">
              <p className="text-xs font-medium text-neutral-500 dark:text-slate-400 mb-2.5">
                Follow Digital Pulse
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {['LinkedIn', 'X (Twitter)', 'Instagram', 'YouTube'].map((network) => (
                  <button
                    key={network}
                    type="button"
                    onClick={() => handleSocialPlaceholder(network)}
                    className="text-xs font-medium text-neutral-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 underline underline-offset-4 cursor-pointer whitespace-nowrap"
                  >
                    {network}
                  </button>
                ))}
              </div>
              {socialNotice && (
                <p className="mt-2 text-xs text-blue-700 dark:text-blue-400">{socialNotice}</p>
              )}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-900 dark:text-white">
              Publication
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink(e, '/')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handleLink(e, '/blog')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Blog (All 10 Articles)
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleLink(e, '/privacy-policy')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  onClick={(e) => handleLink(e, '/terms-and-conditions')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Editorial Desks / Categories & Technical SEO */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-900 dark:text-white">
              Editorial Desks &amp; SEO Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <a
                    href="/blog"
                    onClick={(e) => handleCategoryClick(e, cat.name)}
                    className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-neutral-100 dark:border-slate-800/80 flex items-center gap-4 text-xs">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-blue-700 dark:hover:text-blue-400 underline underline-offset-4"
                >
                  sitemap.xml
                </a>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-blue-700 dark:hover:text-blue-400 underline underline-offset-4"
                >
                  robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-slate-400">
          <p>© 2026 Digital Pulse. All rights reserved.</p>
          <p>Independent Digital Publication · Built for Fast Reading &amp; Search Accessibility</p>
        </div>
      </div>
    </footer>
  );
};
