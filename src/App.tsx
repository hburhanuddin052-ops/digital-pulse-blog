import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { CategoryName } from './types/blog';
import { getArticleBySlug, ALL_ARTICLES } from './data/articles';
import {
  updatePageSEO,
  normalizeCanonicalPathname,
  getArticleCanonicalImageUrl,
} from './utils/seo';
import { getEditorialSEOByPath } from './data/seoEditorialData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function normalizePath(rawPath: string): string {
  return normalizeCanonicalPathname(rawPath);
}

export interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps = {}) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) return normalizePath(initialPath);
    return typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/';
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [themeHydrated, setThemeHydrated] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Hydrate theme preference and ?q= search query safely after mount (prevents SSR hydration mismatch)
  useEffect(() => {
    const savedTheme = localStorage.getItem('digital_pulse_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
    setThemeHydrated(true);

    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');
    if (qParam) {
      setSearchQuery(qParam);
    }
  }, []);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (!themeHydrated) return;
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('digital_pulse_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('digital_pulse_theme', 'light');
    }
  }, [darkMode, themeHydrated]);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      const params = new URLSearchParams(window.location.search);
      setSearchQuery(params.get('q') || '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track scroll position for Back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useCallback((targetPath: string) => {
    const clean = normalizePath(targetPath);
    if (typeof window !== 'undefined' && normalizePath(window.location.pathname) !== clean) {
      window.history.pushState({}, '', clean);
    }
    setCurrentPath(clean);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Dynamic SEO & Schema.org JSON-LD updater per route
  useEffect(() => {
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      const article = getArticleBySlug(slug);
      const editorial = getEditorialSEOByPath(currentPath);

      if (article) {
        updatePageSEO({
          title: editorial ? editorial.seoTitle : article.seoTitle,
          description: editorial ? editorial.metaDescription : article.metaDescription,
          keywords: [article.primaryKeyword, ...article.secondaryKeywords],
          pathname: `/blog/${article.slug}`,
          type: 'article',
          image: getArticleCanonicalImageUrl(article),
          imageAlt: article.imageAlt,
          article,
        });
        return;
      }

      updatePageSEO({
        title: '404: Page Not Found | Digital Pulse Blog',
        description:
          'Oops! This page could not be found. Explore our 10 complete digital marketing, SEO, and social media guides or return to the homepage.',
        pathname: currentPath,
        type: 'website',
        noindex: true,
      });
      return;
    }

    const editorial = getEditorialSEOByPath(currentPath);
    const shouldIncludeArticleList = currentPath === '/' || currentPath === '/blog';

    if (editorial) {
      updatePageSEO({
        title: editorial.seoTitle,
        description: editorial.metaDescription,
        keywords: [editorial.primaryKeyword, ...editorial.secondaryKeywords],
        pathname: editorial.pathname,
        type: 'website',
        listedArticles: shouldIncludeArticleList ? ALL_ARTICLES : undefined,
      });
    } else if (currentPath === '/') {
      updatePageSEO({
        title: 'Digital Pulse: Digital Marketing, SEO & Social Media Blog',
        description:
          'Digital Pulse is an independent digital marketing blog covering SEO, social media marketing, AI tools, and online business strategy for founders and students.',
        keywords: [
          'digital marketing blog',
          'social media strategy',
          'online business insights',
        ],
        pathname: '/',
        type: 'website',
        listedArticles: ALL_ARTICLES,
      });
    } else {
      updatePageSEO({
        title: '404: Page Not Found | Digital Pulse Blog',
        description:
          'Oops! This page could not be found. Explore our 10 complete digital marketing, SEO, and social media guides or return to the homepage.',
        pathname: currentPath,
        type: 'website',
        noindex: true,
      });
    }
  }, [currentPath]);

  const renderPage = () => {
    if (currentPath === '/') {
      return (
        <HomePage
          onNavigate={navigate}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
      );
    }

    if (currentPath === '/blog') {
      return (
        <BlogPage
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      const article = getArticleBySlug(slug);
      if (article) {
        return (
          <ArticlePage
            key={article.slug}
            article={article}
            onNavigate={navigate}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        );
      }

      // Branded 404 page if an unknown /blog/ slug is visited
      return <NotFoundPage onNavigate={navigate} />;
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }

    if (currentPath === '/terms-and-conditions') {
      return <TermsPage />;
    }

    // Default fallback for any undefined route: branded 404 page
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0B0F17] text-[#111827] dark:text-[#F9FAFB] transition-colors duration-150">
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        globalSearchQuery={searchQuery}
        onGlobalSearchChange={setSearchQuery}
      />

      <main id="main-content" className="flex-1">{renderPage()}</main>

      <Footer
        onNavigate={navigate}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Back to top button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-md transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
