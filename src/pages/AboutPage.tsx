import React from 'react';
import { AUTHORS, CATEGORIES } from '../data/authors';
import { NewsletterSection } from '../components/NewsletterSection';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const authorsList = Object.values(AUTHORS);

  return (
    <div>
      {/* Header Section */}
      <section className="border-b border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#0E1420] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
            About the Publication
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight mb-5">
            Practical, evidence-based journalism for the next generation of builders and marketers.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-slate-300 leading-relaxed">
            Digital Pulse is an independent digital publication dedicated to demystifying how
            modern search engines, social media recommendation algorithms, marketing tools, and
            online businesses actually work.
          </p>
        </div>
      </section>

      {/* Main Editorial Narrative */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-14">
          {/* 1. What Digital Pulse Is */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <p className="text-xs font-mono text-blue-700 dark:text-blue-400 mb-1">01. Mission</p>
              <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
                What Digital Pulse Is
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-base text-neutral-700 dark:text-slate-300 leading-relaxed">
              <p>
                Much of the advice published online about digital marketing and social media falls
                into two extremes: vague, recycled listicles written to chase search clicks, or
                dense enterprise whitepapers designed for Fortune 500 media buyers with million-dollar
                budgets.
              </p>
              <p>
                Digital Pulse was created to bridge that gap. We publish structured, plain-English
                guides that explain the underlying mechanics of digital platforms—such as how
                Googlebot crawls and indexes a website, why short-form video feeds prioritize
                completion rate and DM shares, and how small businesses can build sustainable
                customer acquisition engines without resorting to spam or deceptive tactics.
              </p>
            </div>
          </div>

          {/* 2. Who It Is For */}
          <div className="pt-10 border-t border-neutral-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <p className="text-xs font-mono text-blue-700 dark:text-blue-400 mb-1">
                02. Readership
              </p>
              <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
                Who We Write For
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-base text-neutral-700 dark:text-slate-300 leading-relaxed">
              <p>Our articles and case breakdowns are written specifically for five groups:</p>
              <ul className="space-y-3 pl-5 list-disc marker:text-blue-600">
                <li>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    College Students:
                  </span>{' '}
                  Learning practical SEO, content creation, analytics, and personal brand building
                  to stand out in internships and early-career roles.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    Young Entrepreneurs:
                  </span>{' '}
                  Launching independent e-commerce stores, creator businesses, software tools, or
                  local ventures on a lean budget.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    Digital Marketers:
                  </span>{' '}
                  Seeking clear, citation-backed references on platform ranking signals, AI workflow
                  governance, and privacy-first marketing.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    Small Business Owners:
                  </span>{' '}
                  Looking for realistic, time-efficient ways to earn local search visibility,
                  Instagram customers, and authentic online reviews.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    Curious Technology Readers:
                  </span>{' '}
                  Anyone who wants to understand how algorithms shape online feeds and how
                  misinformation spreads across digital networks.
                </li>
              </ul>
            </div>
          </div>

          {/* 3. What Topics We Cover */}
          <div className="pt-10 border-t border-neutral-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <p className="text-xs font-mono text-blue-700 dark:text-blue-400 mb-1">
                03. Coverage
              </p>
              <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
                Topics We Cover
              </h2>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.slug}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827]"
                >
                  <h3 className="text-sm font-bold text-neutral-950 dark:text-white mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Editorial Approach & Fact-Checking Standards */}
          <div className="pt-10 border-t border-neutral-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <p className="text-xs font-mono text-blue-700 dark:text-blue-400 mb-1">
                04. Standards
              </p>
              <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
                Our Editorial Approach
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-base text-neutral-700 dark:text-slate-300 leading-relaxed">
              <p>
                Digital marketing is full of myths—claims that posting at 3:14 p.m. guarantees
                virality, or that repeating a keyword twenty times tricks Google. At Digital Pulse,
                we do not publish unverified hacks or invented statistics.
              </p>
              <p>
                Every article on Digital Pulse adheres to three strict editorial standards:
              </p>
              <ul className="space-y-3 pl-5 list-disc marker:text-blue-600">
                <li>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    Primary Source Grounding:
                  </span>{' '}
                  Technical claims about search indexing, recommendation systems, or advertising
                  rules must reference official documentation (such as Google Search Central, Meta
                  Transparency Center, YouTube Help, TikTok Newsroom, or the Federal Trade
                  Commission) or peer-reviewed research (such as Pew Research Center and the Reuters
                  Institute).
                </li>
                <li>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    Practical Examples Over Buzzwords:
                  </span>{' '}
                  Every concept is paired with a concrete example showing how a real student,
                  freelancer, or small business can apply it.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    Transparent Authorship:
                  </span>{' '}
                  Our articles are written and maintained by the Digital Pulse staff editorial desks,
                  with clickable reference links at the bottom of every page so readers can verify
                  primary sources directly.
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Editorial Authors Directory */}
          <div className="pt-10 border-t border-neutral-200 dark:border-slate-800">
            <div className="mb-6">
              <p className="text-xs font-mono text-blue-700 dark:text-blue-400 mb-1">
                05. Editorial Team
              </p>
              <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
                Digital Pulse Editorial Authors
              </h2>
              <p className="text-sm text-neutral-600 dark:text-slate-400 mt-1">
                Our staff editorial authors oversee specific subject desks across search, social
                platforms, marketing strategy, and brand trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {authorsList.map((author) => (
                <div
                  key={author.id}
                  className="p-6 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827] flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {author.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                      {author.name}
                    </h3>
                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium mb-2">
                      {author.role}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-slate-300 leading-relaxed">
                      {author.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/blog')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
              >
                Explore All 10 Articles
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-5 py-2.5 text-xs font-semibold text-neutral-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-neutral-300 dark:border-slate-700 rounded-lg hover:border-blue-600 transition-colors cursor-pointer"
              >
                Contact the Editorial Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};
