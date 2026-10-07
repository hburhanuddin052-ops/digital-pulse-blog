import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Share2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Article, CategoryName } from '../types/blog';
import { AUTHORS, estimateArticleWordCount, getRelatedArticles } from '../data/articles';
import { EditorialImage } from '../components/EditorialImage';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface ArticlePageProps {
  article: Article;
  onNavigate: (path: string) => void;
  onSelectCategory: (cat: CategoryName | 'All') => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  onNavigate,
  onSelectCategory,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSeoInspector, setShowSeoInspector] = useState(false);

  const author = AUTHORS[article.authorId];
  const relatedArticles = getRelatedArticles(article);
  const wordCount = estimateArticleWordCount(article);

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://digitalpulse.vercel.app';
  const canonicalUrl = `${origin}/blog/${article.slug}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleInternalLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSelectCategory(article.category);
    onNavigate('/blog');
  };

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    article.title
  )}&url=${encodeURIComponent(canonicalUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    canonicalUrl
  )}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    `${article.title} — Digital Pulse`
  )}&body=${encodeURIComponent(
    `I thought you might find this article useful:\n\n${article.title}\n${canonicalUrl}`
  )}`;

  return (
    <article className="bg-[#FAFAFA] dark:bg-[#0B0F17]">
      {/* Top Article Header */}
      <header className="border-b border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#0E1420] pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb & Back Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-neutral-500 dark:text-slate-400">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <a
                href="/"
                onClick={(e) => handleInternalLink(e, '/')}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Home
              </a>
              <span aria-hidden="true">/</span>
              <a
                href="/blog"
                onClick={(e) => handleInternalLink(e, '/blog')}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Blog
              </a>
              <span aria-hidden="true">/</span>
              <a
                href="/blog"
                onClick={handleCategoryClick}
                className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
              >
                {article.category}
              </a>
            </nav>

            <a
              href="/blog"
              onClick={(e) => handleInternalLink(e, '/blog')}
              className="inline-flex items-center gap-1.5 font-medium text-neutral-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Articles</span>
            </a>
          </div>

          {/* Unboxed Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-slate-400 mb-4 tabular-nums">
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.isoDate}>Published {article.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>{wordCount.toLocaleString()} words</span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.14] mb-5">
            {article.title}
          </h1>

          {/* Subtitle / Deck */}
          <p className="text-base sm:text-lg text-neutral-600 dark:text-slate-300 leading-relaxed mb-8">
            {article.excerpt}
          </p>

          {/* Author Byline & Social Share Bar */}
          <div className="pt-6 border-t border-neutral-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {author?.initials || 'DP'}
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-950 dark:text-white">
                  {author?.name || 'Digital Pulse Editorial Team'}
                </p>
                <p className="text-xs text-neutral-500 dark:text-slate-400">
                  {author?.role} · {author?.credentialsNote}
                </p>
              </div>
            </div>

            {/* Social Sharing Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-500 dark:text-slate-400 mr-1 inline-flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share:</span>
              </span>
              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-slate-700 bg-[#FAFAFA] dark:bg-slate-800 text-neutral-800 dark:text-slate-200 hover:border-blue-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
              <a
                href={xShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-slate-700 bg-[#FAFAFA] dark:bg-slate-800 text-neutral-800 dark:text-slate-200 hover:border-blue-600 transition-colors whitespace-nowrap"
              >
                X / Twitter
              </a>
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-slate-700 bg-[#FAFAFA] dark:bg-slate-800 text-neutral-800 dark:text-slate-200 hover:border-blue-600 transition-colors whitespace-nowrap"
              >
                LinkedIn
              </a>
              <a
                href={emailShareUrl}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-slate-700 bg-[#FAFAFA] dark:bg-slate-800 text-neutral-800 dark:text-slate-200 hover:border-blue-600 transition-colors whitespace-nowrap"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image Viewer & Figure Caption */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:mt-8">
        <figure className="rounded-xl overflow-hidden border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <EditorialImage
            src={article.image}
            alt={article.imageAlt}
            category={article.category}
            title={article.title}
            aspectClass="aspect-[16/9]"
            priority
          />
          <figcaption className="px-5 py-3.5 text-xs text-neutral-500 dark:text-slate-400 border-t border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>{article.imageCaption}</span>
            {article.imageCredit && (
              <span className="text-[11px] text-neutral-400 dark:text-slate-500 shrink-0">
                Photo by{' '}
                <a
                  href={article.imageCredit.photographerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-neutral-700 dark:hover:text-slate-300"
                >
                  {article.imageCredit.photographer}
                </a>{' '}
                on{' '}
                <a
                  href={article.imageCredit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-neutral-700 dark:hover:text-slate-300"
                >
                  {article.imageCredit.sourceName}
                </a>
              </span>
            )}
          </figcaption>
        </figure>
      </div>

      {/* Main Asymmetric Reading Canvas (Sidebar TOC + 65-75ch Prose Column) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Table of Contents & Metadata Sidebar (4 cols on desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 order-2 lg:order-1">
            <div className="p-5 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-3.5">
                Table of Contents
              </h2>
              <nav aria-label="Article Sections">
                <ol className="space-y-2 text-xs">
                  {article.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block py-1 text-neutral-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors leading-snug"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#key-takeaways"
                      className="block py-1 font-medium text-neutral-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                    >
                      Key Takeaways
                    </a>
                  </li>
                  {article.faqs && article.faqs.length > 0 && (
                    <li>
                      <a
                        href="#frequently-asked-questions"
                        className="block py-1 font-medium text-neutral-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                      >
                        Frequently Asked Questions
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href="#sources-and-references"
                      className="block py-1 font-medium text-neutral-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                    >
                      Sources &amp; References ({article.sources.length})
                    </a>
                  </li>
                </ol>
              </nav>
            </div>

            {/* Editorial Author Box */}
            {author && (
              <div className="p-5 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
                  About the Editorial Author
                </p>
                <h3 className="text-sm font-bold text-neutral-950 dark:text-white mb-1">
                  {author.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-slate-400 mb-3">
                  {author.role}
                </p>
                <p className="text-xs text-neutral-600 dark:text-slate-300 leading-relaxed">
                  {author.bio}
                </p>
              </div>
            )}
          </aside>

          {/* Right Main Reading Column (8 cols, constrained to max-w-2xl for comfortable reading) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="max-w-2xl space-y-10">
              {/* Article Introduction */}
              <div className="space-y-5 text-base sm:text-[17px] text-neutral-800 dark:text-slate-200 leading-[1.8]">
                {article.introduction.map((para, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? 'text-lg sm:text-xl font-medium text-neutral-900 dark:text-white leading-relaxed'
                        : ''
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* H2 & H3 Content Sections */}
              {article.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 pt-6 border-t border-neutral-200/80 dark:border-slate-800/80 space-y-5"
                >
                  <h2 className="text-2xl sm:text-[26px] font-bold tracking-tight text-neutral-950 dark:text-white leading-snug">
                    {section.heading}
                  </h2>

                  {section.paragraphs &&
                    section.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-base sm:text-[17px] text-neutral-800 dark:text-slate-200 leading-[1.8]"
                      >
                        {p}
                      </p>
                    ))}

                  {/* H3 Subsections */}
                  {section.subSections &&
                    section.subSections.map((sub, sIdx) => (
                      <div key={sIdx} className="pt-3 space-y-3">
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                          {sub.subHeading}
                        </h3>
                        {sub.paragraphs.map((sp, spIdx) => (
                          <p
                            key={spIdx}
                            className="text-base sm:text-[17px] text-neutral-800 dark:text-slate-200 leading-[1.8]"
                          >
                            {sp}
                          </p>
                        ))}
                        {sub.bullets && (
                          <ul className="space-y-2.5 pl-5 list-disc text-base text-neutral-800 dark:text-slate-200 leading-relaxed">
                            {sub.bullets.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                  {/* Bullet List */}
                  {section.bullets && (
                    <ul className="space-y-3 pl-5 list-disc text-base sm:text-[16px] text-neutral-800 dark:text-slate-200 leading-[1.75] marker:text-blue-600">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {/* Practical Example Callout */}
                  {section.exampleBox && (
                    <div className="my-6 p-6 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
                        {section.exampleBox.title}
                      </p>
                      <p className="text-sm sm:text-base text-neutral-700 dark:text-slate-300 leading-relaxed">
                        {section.exampleBox.content}
                      </p>
                    </div>
                  )}

                  {/* Editorial Pull Quote */}
                  {section.pullQuote && (
                    <blockquote className="my-8 pl-6 border-l-2 border-blue-700 dark:border-blue-400 py-1">
                      <p className="text-xl sm:text-2xl font-medium italic text-neutral-900 dark:text-white leading-snug mb-2">
                        “{section.pullQuote.quote}”
                      </p>
                      <cite className="not-italic text-xs font-medium text-neutral-500 dark:text-slate-400">
                        — Digital Pulse Editorial Note · {section.pullQuote.context}
                      </cite>
                    </blockquote>
                  )}

                  {/* Contextual Internal Link */}
                  {section.internalLink && (
                    <div className="p-4 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 text-sm text-neutral-800 dark:text-slate-200">
                      <span>{section.internalLink.contextPrefix} </span>
                      <a
                        href={`/blog/${section.internalLink.slug}`}
                        onClick={(e) =>
                          handleInternalLink(e, `/blog/${section.internalLink!.slug}`)
                        }
                        className="font-semibold text-blue-700 dark:text-blue-400 underline underline-offset-4 hover:text-blue-900 dark:hover:text-blue-300"
                      >
                        {section.internalLink.anchorText}
                      </a>
                      <span>.</span>
                    </div>
                  )}
                </section>
              ))}

              {/* Key Takeaways Box */}
              <section
                id="key-takeaways"
                className="scroll-mt-24 p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-4"
              >
                <div className="border-b border-neutral-200 dark:border-slate-800 pb-3">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
                    Executive Summary
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
                    Key Takeaways
                  </h2>
                </div>
                <ul className="space-y-3 pl-5 list-disc text-sm sm:text-base text-neutral-800 dark:text-slate-200 leading-relaxed marker:text-blue-600">
                  {article.keyTakeaways.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Frequently Asked Questions (FAQ) Section */}
              {article.faqs && article.faqs.length > 0 && (
                <section
                  id="frequently-asked-questions"
                  className="scroll-mt-24 pt-6 border-t border-neutral-200 dark:border-slate-800 space-y-5"
                >
                  <div>
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
                      Common Reader Questions
                    </p>
                    <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {article.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827]"
                      >
                        <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Sources & References Section */}
              <section
                id="sources-and-references"
                className="scroll-mt-24 pt-6 border-t border-neutral-200 dark:border-slate-800 space-y-5"
              >
                <div>
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
                    Verifiable Citations &amp; Primary Documentation
                  </p>
                  <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
                    Sources &amp; References
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">
                    All factual claims and platform mechanics in this article are grounded in the
                    following authoritative documentation and peer-reviewed or institutional sources:
                  </p>
                </div>

                <ol className="space-y-4">
                  {article.sources.map((source, idx) => (
                    <li
                      key={idx}
                      className="p-4 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="font-mono text-xs text-neutral-400 mr-2 tabular-nums">
                            [{idx + 1}]
                          </span>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-neutral-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 underline underline-offset-4"
                          >
                            {source.title}
                          </a>
                          <span className="text-neutral-500 dark:text-slate-400">
                            {' '}
                            — {source.publisher}
                          </span>
                        </div>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${source.title}`}
                          className="text-blue-700 dark:text-blue-400 shrink-0 mt-0.5"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                      {source.note && (
                        <p className="mt-1.5 text-xs text-neutral-600 dark:text-slate-400 leading-relaxed pl-6">
                          {source.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>

              {/* Expandable SEO & Search Console Metadata Inspector */}
              <section className="pt-4">
                <div className="border border-neutral-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#111827] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowSeoInspector((prev) => !prev)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                        Technical SEO &amp; Schema.org Metadata
                      </p>
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">
                        View On-Page SEO Data for This Article
                      </p>
                    </div>
                    {showSeoInspector ? (
                      <ChevronUp className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>

                  {showSeoInspector && (
                    <div className="px-5 pb-5 pt-2 border-t border-neutral-200 dark:border-slate-800 space-y-3 text-xs">
                      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1.5 border-b border-neutral-100 dark:border-slate-800">
                        <dt className="font-semibold text-neutral-500 dark:text-slate-400">
                          SEO Title Tag:
                        </dt>
                        <dd className="sm:col-span-2 font-mono text-neutral-900 dark:text-white">
                          {article.seoTitle}
                        </dd>
                      </dl>
                      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1.5 border-b border-neutral-100 dark:border-slate-800">
                        <dt className="font-semibold text-neutral-500 dark:text-slate-400">
                          Meta Description:
                        </dt>
                        <dd className="sm:col-span-2 text-neutral-800 dark:text-slate-200">
                          {article.metaDescription} ({article.metaDescription.length} chars)
                        </dd>
                      </dl>
                      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1.5 border-b border-neutral-100 dark:border-slate-800">
                        <dt className="font-semibold text-neutral-500 dark:text-slate-400">
                          URL Slug &amp; Canonical:
                        </dt>
                        <dd className="sm:col-span-2 font-mono text-blue-700 dark:text-blue-400 break-all">
                          {canonicalUrl}
                        </dd>
                      </dl>
                      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1.5 border-b border-neutral-100 dark:border-slate-800">
                        <dt className="font-semibold text-neutral-500 dark:text-slate-400">
                          Primary Keyword:
                        </dt>
                        <dd className="sm:col-span-2 font-mono text-neutral-900 dark:text-white">
                          {article.primaryKeyword}
                        </dd>
                      </dl>
                      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1.5 border-b border-neutral-100 dark:border-slate-800">
                        <dt className="font-semibold text-neutral-500 dark:text-slate-400">
                          Secondary Keywords:
                        </dt>
                        <dd className="sm:col-span-2 text-neutral-800 dark:text-slate-200">
                          {article.secondaryKeywords.join(' · ')}
                        </dd>
                      </dl>
                      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1.5">
                        <dt className="font-semibold text-neutral-500 dark:text-slate-400">
                          Image Alt Text:
                        </dt>
                        <dd className="sm:col-span-2 text-neutral-800 dark:text-slate-200">
                          {article.imageAlt}
                        </dd>
                      </dl>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#0E1420]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
                Continue Reading
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Related Articles
              </h2>
            </div>
            <a
              href="/blog"
              onClick={(e) => handleInternalLink(e, '/blog')}
              className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline"
            >
              View all 10 articles
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.id} article={rel} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </article>
  );
};
