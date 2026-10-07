import { ArticleFAQ } from '../types/blog';

export const ARTICLE_FAQS: Record<string, ArticleFAQ[]> = {
  'digital-marketing-trends-2026': [
    {
      question: 'Which digital marketing channel delivers the best return for a small business with a limited budget in 2026?',
      answer:
        'For most small businesses, combining one organic discovery channel (such as local SEO via Google Business Profile or short-form vertical video) with one owned retention channel (an email newsletter) provides the highest return on time and budget. Paid ads work best after you have validated which message and product page convert organic visitors.',
    },
    {
      question: 'What is the difference between first-party data and third-party data?',
      answer:
        'First-party data is information your audience voluntarily shares directly with your business—such as email newsletter signups, account preferences, purchase history, and survey responses. Third-party data is aggregated behavioral tracking purchased or collected across unrelated websites via external trackers, which has become heavily restricted by browser privacy protections and data laws.',
    },
    {
      question: 'Does using AI tools to help draft marketing copy hurt Google search rankings?',
      answer:
        'Google Search Central states that automation itself is not automatically spam; however, publishing unedited, low-value pages at scale to manipulate search rankings violates spam policies. Content that is thoroughly edited, fact-checked by humans, and written to genuinely help readers performs well.',
    },
  ],
  'how-social-media-algorithms-work': [
    {
      question: 'Does posting at a specific time of day make a post go viral?',
      answer:
        'Posting when your core followers are awake helps generate initial engagement velocity, which is useful for connected feeds like Stories. However, for interest-based discovery feeds like TikTok, Instagram Reels, and YouTube Shorts, watch time, completion rate, and share rate matter far more than the exact hour you publish.',
    },
    {
      question: 'Why did my video views suddenly drop after a few high-performing posts?',
      answer:
        'Because discovery feeds evaluate each video individually across test cohorts, one viral video does not guarantee the next upload will reach the same number of people. If a new video has a slower opening hook or lower completion rate in its initial test group of 300–500 viewers, the system will not expand it to wider cohorts.',
    },
    {
      question: 'Do hashtags still control who sees my social media posts?',
      answer:
        'Hashtags no longer act as a magic reach multiplier. Instead, platforms use computer vision, audio transcripts, caption keywords, and 3 to 5 relevant hashtags together to classify your topic and match it with users who search for or watch that subject.',
    },
  ],
  'seo-for-beginners-how-google-ranks-websites': [
    {
      question: 'How long does it take for a new website to appear on Google?',
      answer:
        'Crawling and indexing can happen within a few days to a few weeks after you verify your site in Google Search Console and submit your sitemap.xml. Earning competitive rankings for non-branded keywords typically takes three to six months of consistent publishing and helpful content creation.',
    },
    {
      question: 'Do I need to pay Google to have my website indexed in organic search results?',
      answer:
        'No. Inclusion in Google’s organic search results is completely free. Google Search Console is also a free tool provided by Google. Paid search advertisements (Google Ads) are separate and appear with a "Sponsored" label.',
    },
    {
      question: 'What is the difference between a sitemap.xml file and a robots.txt file?',
      answer:
        'A robots.txt file gives instructions to search engine crawlers about which folders or pages they are allowed or disallowed from requesting. An XML sitemap (sitemap.xml) is a structured directory of all the canonical URLs you actively want search engines to crawl and index.',
    },
  ],
  'how-ai-is-changing-digital-marketing': [
    {
      question: 'Where does AI save the most time for a solo marketer or student entrepreneur?',
      answer:
        'AI delivers the most reliable time savings in structured data tasks: transcribing recorded video or customer interviews, summarizing long research reports, grouping customer support questions by theme, and generating rough headline or email subject line variations for human editing.',
    },
    {
      question: 'Why do unedited AI blog posts often fail to convert readers into customers?',
      answer:
        'Language models generate statistically average phrasing based on existing internet text. Without human editing, real examples, verified citations, and a clear brand point of view, automated text reads as generic and fails to build the trust required for someone to buy or subscribe.',
    },
    {
      question: 'What privacy precautions should marketers take when using AI tools?',
      answer:
        'Never upload personally identifiable customer data (such as subscriber email lists, phone numbers, or private billing records) or confidential company financials into public consumer AI prompts.',
    },
  ],
  'instagram-marketing-for-small-businesses': [
    {
      question: 'How many times per week should a small business post on Instagram?',
      answer:
        'Instagram’s creator guidance emphasizes sustainable consistency over sheer volume. Publishing 3 to 4 thoughtful feed posts per week (a mix of Reels and educational or product Carousels) alongside casual daily Stories is plenty to grow steadily without burning out.',
    },
    {
      question: 'Should a small business use a Creator account or a Business account on Instagram?',
      answer:
        'Both are free Professional account types that unlock Instagram Insights, contact buttons, and Direct Message folders. Brick-and-mortar shops, e-commerce stores, and local service providers should generally choose a Business account for local address tags, shopping integrations, and scheduling tools, while solo educators and public figures often prefer Creator accounts.',
    },
    {
      question: 'Why are Carousels so effective for small business engagement?',
      answer:
        'Carousels allow you to walk through a multi-step story, comparison, or tutorial at the reader’s own reading pace, which encourages high save rates. Additionally, Instagram can show a Carousel a second time to followers who scrolled past the first slide by displaying the second slide.',
    },
  ],
  'why-short-form-video-is-so-powerful': [
    {
      question: 'What is the ideal length for a short-form marketing video?',
      answer:
        'The ideal length is as short as possible to deliver clear value without rushing. Product demonstrations and quick tips often perform best between 20 and 35 seconds, while deeper mini-case studies or storytelling clips work well between 45 and 75 seconds.',
    },
    {
      question: 'Can I repost the exact same vertical video across TikTok, Instagram Reels, and YouTube Shorts?',
      answer:
        'Yes, cross-posting is a smart way for small teams to maximize production effort. However, always export the clean master video file from your editing app rather than downloading a video with another platform’s watermark logo on it, as platforms explicitly deprioritize watermarked reposts.',
    },
    {
      question: 'Do I need an expensive camera to film effective short-form videos?',
      answer:
        'No. Any modern smartphone filming at 1080p (30 or 60 fps) near a natural window or basic softbox light is more than sharp enough. Investing $30 to $60 in a clip-on wireless lavalier microphone will improve viewer retention far more than buying an expensive camera body.',
    },
  ],
  'common-digital-marketing-mistakes-small-businesses': [
    {
      question: 'If I bought followers in the past, how can I fix my account?',
      answer:
        'Stop any automated follower services immediately and manually remove obvious bot or spam accounts from your follower list over time. Focus on publishing high-retention Reels and encouraging real customers to interact with your account so your engagement ratios gradually recover.',
    },
    {
      question: 'How do I know if my website is costing me sales?',
      answer:
        'Check whether mobile visitors can understand what you sell, how much it costs, and how to buy within five seconds of landing on your page. Use Google PageSpeed Insights to test mobile loading speed and remove intrusive pop-ups that block the screen on smartphones.',
    },
    {
      question: 'How long should a small business test a marketing channel before deciding whether it works?',
      answer:
        'For organic channels like SEO, blogging, or short-form video, commit to at least 90 days of consistent weekly execution while tracking profile visits, search impressions, and email signups before judging channel viability.',
    },
  ],
  'how-online-reviews-influence-customer-decisions': [
    {
      question: 'Is it legal to offer a discount or gift card in exchange for a positive 5-star review?',
      answer:
        'No. Under FTC endorsement and review guidelines as well as Google and Yelp platform policies, conditioning an incentive on the review being positive is deceptive and prohibited. Even offering unconditional incentives for reviews is banned on platforms like Google Maps and Yelp.',
    },
    {
      question: 'Should a business delete or hide negative customer reviews?',
      answer:
        'No. Suppressing honest negative reviews violates the FTC’s Rule on the Use of Consumer Reviews and Testimonials and destroys buyer trust. Instead, reply calmly and publicly to explain how you are resolving the issue. Only report reviews to platforms when they clearly violate platform rules (such as spam, profanity, or reviews posted for the wrong business location).',
    },
    {
      question: 'When is the best time to ask a customer for a review?',
      answer:
        'For local services, ask within 24 hours of completing the job while the experience is fresh. For shipped e-commerce products, send an automated follow-up email 5 to 10 days after delivery confirmation so the buyer has had time to unbox and test the item.',
    },
  ],
  'how-to-build-a-personal-brand-from-scratch': [
    {
      question: 'How can a college student build a personal brand without full-time work experience?',
      answer:
        'Document your learning process and independent projects. Turn class assignments, volunteer work, club campaigns, or self-initiated analyses of real brands into structured case studies showing the problem you examined, your methodology, and your takeaways.',
    },
    {
      question: 'Should my personal website use my real name as the domain?',
      answer:
        'Yes. Registering a clean domain with your name (or a close variation) and structuring your homepage title tag around your full name and discipline makes it easy for recruiters, clients, and collaborators to find your official portfolio first on Google.',
    },
    {
      question: 'How do I avoid sounding boastful when sharing my work online?',
      answer:
        'Focus on usefulness and process rather than self-praise. Instead of writing "I am thrilled to announce I am a marketing expert," write "Last week I redesigned our student club’s email signup flow and increased registrations—here are the three specific changes we made."',
    },
  ],
  'fake-news-misinformation-brand-reputation': [
    {
      question: 'What is the single most important difference between misinformation and disinformation?',
      answer:
        'Intent. Misinformation is false or inaccurate information shared by people who mistakenly believe it is true. Disinformation is false information deliberately fabricated and distributed with the intent to deceive, manipulate, or cause harm.',
    },
    {
      question: 'Why should brands avoid repeating a false rumor in the headline of their press statement?',
      answer:
        'Cognitive research on debunking shows that repeating a false myth prominently can reinforce familiarity with the falsehood in readers’ memories. Leading your headline with the verified factual statement—and only referencing the rumor briefly inside the body copy to correct it—prevents accidental reinforcement.',
    },
    {
      question: 'When should a company ignore a false online claim instead of issuing a public statement?',
      answer:
        'If a false claim has negligible reach (such as a single obscure post with almost no views or shares) and poses no safety risk, issuing a loud company-wide statement can backfire by introducing the rumor to a mass audience. Address isolated misunderstandings one-on-one and reserve public statements for claims gaining measurable traction.',
    },
  ],
};
