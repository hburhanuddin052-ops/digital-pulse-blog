import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address (for example, name@university.edu).');
      return;
    }
    setError('');
    setSubmittedEmail(trimmed);
    setEmail('');
  };

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="border-y border-neutral-200/80 dark:border-slate-800/80 bg-neutral-100/70 dark:bg-slate-900/60 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto glass-card border border-neutral-200/90 dark:border-slate-800/90 rounded-2xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
              Weekly Digital Marketing Strategy Briefing
            </p>
            <h2
              id="newsletter-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3"
            >
              Get practical SEO and marketing research in your inbox every Thursday.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 leading-relaxed">
              Written for students, founders, and small business marketers. Every issue breaks down
              one algorithm shift, one search engine optimization test, and one actionable case
              study.
            </p>
          </div>

          <div className="lg:col-span-5">
            {submittedEmail ? (
              <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Subscription confirmed
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-slate-300 mt-1 leading-relaxed">
                      We have added <span className="font-medium">{submittedEmail}</span> to the
                      Thursday Digital Pulse briefing.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedEmail('')}
                      className="mt-3 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline whitespace-nowrap cursor-pointer"
                    >
                      Register another address
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <div>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter subscription
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your work or student email..."
                    className="w-full px-4 py-3 text-sm rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                  {error && (
                    <p role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer"
                >
                  Subscribe to Briefing
                </button>
                <p className="text-xs text-neutral-500 dark:text-slate-400">
                  First-party email list only. Unsubscribe in one click at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
