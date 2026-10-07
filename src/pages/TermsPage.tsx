import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#111827] border border-neutral-200 dark:border-slate-800 rounded-xl p-8 sm:p-12 space-y-8">
        <div className="border-b border-neutral-200 dark:border-slate-800 pb-6">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Editorial Terms of Use · Effective Date: January 1, 2026
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400 mt-2">
            Last updated: September 1, 2026
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-neutral-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and reading Digital Pulse, you agree to comply with and be bound by these
              Terms &amp; Conditions. If you do not agree with any part of these terms, please
              discontinue use of the website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              2. Educational &amp; Informational Purpose
            </h2>
            <p>
              All articles, guides, examples, and case studies published on Digital Pulse are
              provided for general educational and informational purposes regarding digital
              marketing, search engine optimization, social media, technology, and online business.
              Nothing on this website constitutes formal legal, financial, or tax advice. Readers
              should consult qualified professionals before making legal or regulatory compliance
              decisions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              3. Intellectual Property &amp; Fair Citation
            </h2>
            <p>
              Unless otherwise noted, all original article text, layout design, and custom visual
              diagrams on Digital Pulse are the intellectual property of Digital Pulse. Educators,
              students, and journalists may quote brief excerpts (up to 150 words) provided clear
              attribution and a direct hyperlink back to the canonical Digital Pulse article URL are
              included. Republication of full articles without written permission is prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              4. Third-Party Trademarks &amp; Citations
            </h2>
            <p>
              References to third-party platforms and organizations—including Google, Google Search
              Console, YouTube, Meta, Instagram, TikTok, LinkedIn, Pew Research Center, and Reuters
              Institute—are made strictly for editorial, educational, and citation purposes. All
              product and company names are trademarks of their respective holders.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              5. Limitation of Liability
            </h2>
            <p>
              While our editorial team strives to verify all claims against authoritative sources at
              the time of publication, search algorithms, platform features, and regulatory policies
              change over time. Digital Pulse makes no warranties regarding specific search ranking
              outcomes, advertising returns, or business revenue resulting from the application of
              strategies discussed on this site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
