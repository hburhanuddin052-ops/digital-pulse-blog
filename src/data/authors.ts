import { Author, CategoryName } from '../types/blog';

export const AUTHORS: Record<string, Author> = {
  'maya-lin': {
    id: 'maya-lin',
    name: 'Maya Lin',
    role: 'Senior Digital Strategy Editor, Digital Pulse Editorial Team',
    bio: 'Maya covers digital marketing strategy, customer acquisition, privacy-first measurement, and small business growth for the Digital Pulse editorial desk.',
    credentialsNote: 'Digital Pulse Staff Editorial Author',
    initials: 'ML',
  },
  'lucas-vance': {
    id: 'lucas-vance',
    name: 'Lucas Vance',
    role: 'Search & Technical Web Editor, Digital Pulse Editorial Team',
    bio: 'Lucas writes about search engine indexing, technical SEO, web performance standards, and applied marketing automation for the Digital Pulse editorial desk.',
    credentialsNote: 'Digital Pulse Staff Editorial Author',
    initials: 'LV',
  },
  'priya-patel': {
    id: 'priya-patel',
    name: 'Priya Patel',
    role: 'Social Platforms & Creator Economy Writer, Digital Pulse Editorial Team',
    bio: 'Priya analyzes recommendation systems, short-form video retention, Instagram commerce, and personal brand positioning for the Digital Pulse editorial desk.',
    credentialsNote: 'Digital Pulse Staff Editorial Author',
    initials: 'PP',
  },
  'marcus-thorne': {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    name_display: 'Marcus Thorne',
    role: 'Brand Trust & Media Research Editor, Digital Pulse Editorial Team',
    bio: 'Marcus focuses on online reputation management, consumer review behavior, digital media literacy, and crisis communication for the Digital Pulse editorial desk.',
    credentialsNote: 'Digital Pulse Staff Editorial Author',
    initials: 'MT',
  } as Author,
};

export const CATEGORIES: { name: CategoryName; description: string; slug: string }[] = [
  {
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'Customer acquisition, campaign strategy, conversion optimization, and small business marketing fundamentals.',
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    description: 'Feed recommendation algorithms, Instagram growth, short-form video retention, and community engagement.',
  },
  {
    name: 'SEO & Search',
    slug: 'seo-search',
    description: 'How search engines crawl, index, and rank websites, keyword intent, and Google Search Console workflows.',
  },
  {
    name: 'Technology & AI',
    slug: 'technology-ai',
    description: 'Practical applications of artificial intelligence, automation workflows, and martech infrastructure.',
  },
  {
    name: 'Brand & Business',
    slug: 'brand-business',
    description: 'Online reviews, consumer trust, personal branding, crisis communication, and misinformation defense.',
  },
];
