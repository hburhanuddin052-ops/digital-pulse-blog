import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Please complete all required fields before submitting your message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address so our editorial team can reply.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div>
      <section className="border-b border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#0E1420] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Editorial Inquiries &amp; Feedback
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-3">
            Contact Digital Pulse
          </h1>
          <p className="text-base text-neutral-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Have a question about one of our articles, want to suggest a digital marketing topic for
            future coverage, or spotted a broken reference link? Send a note to our editorial desk.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
                  Message Received
                </h2>
                <p className="text-sm text-neutral-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold">{name}</span>. Your message regarding{' '}
                  <span className="font-semibold">“{subject}”</span> has been logged with the
                  Digital Pulse editorial desk. We respond to reader inquiries within 1–2 business
                  days.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h2 className="text-lg font-bold text-neutral-950 dark:text-white mb-2">
                  Send a Message
                </h2>

                {error && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300"
                  >
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-neutral-800 dark:text-slate-200 mb-1.5"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 dark:border-slate-700 bg-[#FAFAFA] dark:bg-slate-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-neutral-800 dark:text-slate-200 mb-1.5"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 dark:border-slate-700 bg-[#FAFAFA] dark:bg-slate-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-neutral-800 dark:text-slate-200 mb-1.5"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Topic suggestion, question, or feedback"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 dark:border-slate-700 bg-[#FAFAFA] dark:bg-slate-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-neutral-800 dark:text-slate-200 mb-1.5"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your question or feedback here..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 dark:border-slate-700 bg-[#FAFAFA] dark:bg-slate-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Message
                </button>
              </form>
            )}
          </div>

          {/* Editorial Desk Info (5 cols) */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-5">
              <h2 className="text-base font-bold text-neutral-950 dark:text-white">
                Editorial Desk Directory
              </h2>

              <div className="flex items-start gap-3.5 text-sm">
                <Mail className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    General &amp; Reader Inquiries
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-slate-400 mt-0.5">
                    masterhola64@gmail.co
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <Clock className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    Response Timeframe
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-slate-400 mt-0.5">
                    Monday – Friday, 9:00 AM to 5:00 PM EST (Typically within 24–48 hours)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <MapPin className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    Corrections &amp; Fact-Checking Policy
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    If you believe any statistic, link, or citation in a Digital Pulse article is
                    outdated, include the article URL and primary source link in your message for
                    immediate review.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
