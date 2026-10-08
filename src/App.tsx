import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { CategoryName } from './types/blog';
import { getArticleBySlug, ALL_ARTICLES } from './data/articles';
import { updatePageSEO } from './utils/seo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  return rawPath.replace(/\/+$/, '');
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('digital_pulse_theme') === 'dark';
    }
    return false;
  });
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('digital_pulse_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('digital_pulse_theme', 'light');
    }
  }, [darkMode]);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
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
      if (article) {
        updatePageSEO({
          title: article.seoTitle,
          description: article.metaDescription,
          keywords: [article.primaryKeyword, ...article.secondaryKeywords],
          pathname: `/blog/${article.slug}`,
          type: 'article',
          image: article.image,
          article,
        });
        return;
      }
    }

    switch (currentPath) {
      case '/blog':
        updatePageSEO({
          title: 'Digital Marketing Articles & SEO Guides | Digital Pulse',
          description:
            'Browse all 10 original digital marketing articles, step-by-step SEO tutorials, and social media guides written for students, founders, and small businesses.',
          keywords: [
            'digital marketing articles',
            'SEO tutorials',
            'social media guides',
          ],
          pathname: '/blog',
        });
        break;
      case '/about':
        updatePageSEO({
          title: 'About Our Digital Marketing Publication | Digital Pulse',
          description:
            'Learn about Digital Pulse, an independent digital marketing publication dedicated to primary-source editorial standards and marketing education for students.',
          keywords: [
            'digital marketing publication',
            'editorial standards',
            'marketing education for students',
          ],
          pathname: '/about',
        });
        break;
      case '/contact':
        updatePageSEO({
          title: 'Contact Digital Pulse Editorial Team & Feedback Desk',
          description:
            'Contact the Digital Pulse editorial team with reader feedback, marketing topic suggestions, press inquiries, or source corrections. We reply in 24–48 hours.',
          keywords: [
            'contact Digital Pulse editorial team',
            'reader feedback',
            'marketing topic suggestions',
          ],
          pathname: '/contact',
        });
        break;
      case '/privacy-policy':
        updatePageSEO({
          title: 'Digital Pulse Privacy Policy & First-Party Data Terms',
          description:
            'Read the official Digital Pulse privacy policy covering first-party data privacy, newsletter subscriber rights, contact inquiries, and search analytics.',
          keywords: [
            'Digital Pulse privacy policy',
            'first-party data privacy',
            'newsletter subscriber rights',
          ],
          pathname: '/privacy-policy',
        });
        break;
      case '/terms-and-conditions':
        updatePageSEO({
          title: 'Digital Pulse Terms and Conditions & Citation Guidelines',
          description:
            'Review the Digital Pulse terms and conditions, including our editorial citation policy, intellectual property rules, and educational content disclaimer.',
          keywords: [
            'Digital Pulse terms and conditions',
            'editorial citation policy',
            'educational content disclaimer',
          ],
          pathname: '/terms-and-conditions',
        });
        break;
      case '/':
      default:
        updatePageSEO({
          title: 'Digital Pulse: Digital Marketing Blog & SEO Strategy Hub',
          description:
            'Digital Pulse is an independent digital marketing blog publishing research-backed social media strategy, beginner SEO guides, and online business insights.',
          keywords: [
            'digital marketing blog',
            'social media strategy',
            'online business insights',
          ],
          pathname: '/',
        });
        break;
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
            article={article}
            onNavigate={navigate}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        );
      }

      // Clean fallback if an unknown /blog/ slug is visited
      return (
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-6">
            <h1 className="text-2xl font-bold text-neutral-950 dark:text-white">
              Article Not Found
            </h1>
            <p className="text-sm text-neutral-600 dark:text-slate-300">
              The article URL you requested could not be found. Choose one of our 10 complete
              articles below:
            </p>
            <ul className="space-y-2.5 text-sm">
              {ALL_ARTICLES.map((art) => (
                <li key={art.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/blog/${art.slug}`)}
                    className="text-left font-medium text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {art.id}. {art.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
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

    return (
      <HomePage
        onNavigate={navigate}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />
    );
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
