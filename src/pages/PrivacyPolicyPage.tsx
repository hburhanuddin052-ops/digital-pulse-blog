import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-3xl mx-auto glass-card border border-neutral-200/90 dark:border-slate-800/90 rounded-xl p-8 sm:p-12 space-y-8">
        <div className="border-b border-neutral-200 dark:border-slate-800 pb-6">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Legal &amp; Data Transparency · Effective Date: January 1, 2026
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Digital Pulse Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400 mt-2">
            Last updated: September 1, 2026
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-neutral-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              1. Overview of Our First-Party Data Privacy Standards
            </h2>
            <p>
              This Digital Pulse privacy policy explains our commitment to first-party data privacy
              and protecting the personal information you share with our publication. Below we break
              down what information we collect, how we use it, and your newsletter subscriber rights
              when you visit Digital Pulse.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              2. Information We Collect
            </h2>
            <p>We collect information in two ways:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Information You Voluntarily Provide:
                </span>{' '}
                When you subscribe to the Digital Pulse email newsletter or submit a message through
                our Contact form, we collect your email address, name, and the content of your
                inquiry.
              </li>
              <li>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Technical &amp; Usage Data:
                </span>{' '}
                Like most websites, standard server logs and search performance tools (such as
                Google Search Console) record aggregated, non-personally identifiable technical data
                including browser type, device type, referring pages, and search queries used to
                find our articles. We also store your light/dark theme preference locally in your
                browser’s localStorage.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect strictly to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deliver the weekly Digital Pulse editorial newsletter to opted-in subscribers.</li>
              <li>Respond to reader questions, feedback, or correction requests submitted via our Contact page.</li>
              <li>Analyze aggregated page performance, search visibility, and mobile usability to improve our articles.</li>
            </ul>
            <p>
              We do not sell, rent, or trade subscriber email addresses or personal information to
              third-party data brokers or advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              4. External Source Links
            </h2>
            <p>
              Our articles contain clickable reference links to authoritative third-party websites
              (such as Google Search Central, Pew Research Center, Reuters Institute, Meta, and the
              Federal Trade Commission). We are not responsible for the privacy practices or content
              of external websites. We encourage you to read the privacy policies of any external
              sites you visit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
              5. Your Data Rights &amp; Opt-Out Choices
            </h2>
            <p>
              You may unsubscribe from our newsletter at any time using the one-click unsubscribe
              link at the bottom of every email, or request deletion of any contact form submission
              by reaching out to our team via the Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
