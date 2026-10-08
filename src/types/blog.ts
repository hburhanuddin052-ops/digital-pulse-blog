export type CategoryName =
  | 'Digital Marketing'
  | 'Social Media'
  | 'SEO & Search'
  | 'Technology & AI'
  | 'Brand & Business';

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  credentialsNote: string;
  initials: string;
}

export interface ArticleExampleBox {
  title: string;
  content: string;
}

export interface ArticleSubSection {
  subHeading: string; // Rendered as H3
  paragraphs: string[];
  bullets?: string[];
  exampleBox?: ArticleExampleBox;
}

export interface ArticleInternalLink {
  contextPrefix: string;
  anchorText: string;
  slug: string;
}

export interface ArticleSupportingImage {
  src: string;
  webpSrc?: string;
  alt: string;
  caption: string;
}

export interface ArticleComparisonTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface ArticleSection {
  id: string;
  heading: string; // Rendered as H2
  paragraphs?: string[];
  bullets?: string[];
  subSections?: ArticleSubSection[];
  exampleBox?: ArticleExampleBox;
  pullQuote?: {
    quote: string;
    context: string;
  };
  internalLink?: ArticleInternalLink;
  supportingImage?: ArticleSupportingImage;
  comparisonTable?: ArticleComparisonTable;
}

export interface ArticleSource {
  title: string;
  publisher: string;
  url: string;
  note?: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleImageCredit {
  photographer: string;
  photographerUrl: string;
  sourceName: string;
  sourceUrl: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: CategoryName;
  authorId: string;
  publishedAt: string;
  isoDate: string;
  readingTimeMinutes: number;
  featured?: boolean;
  popularRank?: number;
  image: string;
  webpImage?: string;
  imageAlt: string;
  imageCaption: string;
  imageCredit?: ArticleImageCredit;
  excerpt: string;
  introduction: string[];
  sections: ArticleSection[];
  keyTakeaways: string[];
  faqs?: ArticleFAQ[];
  sources: ArticleSource[];
  relatedSlugs: string[];
}
