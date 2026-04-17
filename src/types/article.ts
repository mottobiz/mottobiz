// Article and Content Types for Mottobiz Resources

export type ArticleCategory = 
  | 'locations'
  | 'industries'
  | 'guides'
  | 'case-studies'
  | 'comparisons'

export type ArticleDifficulty = 'beginner' | 'intermediate' | 'advanced'
export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational'
export type InternalLinkType = 'service' | 'article' | 'pillar' | 'hub'

export interface SEOFields {
  metaTitle: string
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
  searchIntent: SearchIntent
  targetAudience: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface InternalLink {
  anchor: string
  url: string
  type: InternalLinkType
}

export interface ArticleCard {
  id: string
  title: string
  excerpt: string
  slug: string
  category: ArticleCategory
  pillar?: string
  subPillar?: string
  thumbnail?: { src: string; alt: string; width: number; height: number }
  readingTime: number
  publishDate: string
  lastUpdated?: string
  author?: {
    name: string
    title: string
    credentials?: string
  }
  featured?: boolean
  difficulty?: ArticleDifficulty
  // SEO fields (enriched at runtime if not provided)
  seo?: SEOFields
  faq?: FAQItem[]
  internalLinks?: InternalLink[]
  relatedArticleSlugs?: string[]
}

export type ArticleEnrichment = {
  seo: SEOFields
  faq: FAQItem[]
  internalLinks: InternalLink[]
  relatedArticleSlugs: string[]
  tldr: string[]
}

export interface CategoryInfo {
  name: string
  slug: ArticleCategory
  icon: string
  count: number
  color: string
  description: string
}

export interface IndustryHub {
  name: string
  icon: string
  slug: string
  color: string
  articles: number
  description?: string
}

// Interactive component types
export interface ComparisonRow {
  feature: string
  values: string[]
}

export interface ComparisonTableData {
  title: string
  columns: string[]
  rows: ComparisonRow[]
  recommendation?: { column: number; badge: string }
}

export interface StatCardData {
  value: string
  label: string
  context?: string
}

export interface ChecklistItem {
  text: string
  checked?: boolean
}

export interface ChecklistData {
  title: string
  items: ChecklistItem[]
}

export interface StepItem {
  step: string
  title: string
  description: string
}

export interface ProTipData {
  tip: string
  context?: string
}

export interface WarningData {
  title: string
  message: string
}

// Category color mappings (from CONTENT_STRATEGY.md)
export const CATEGORY_COLORS: Record<ArticleCategory, { primary: string; secondary: string; gradient: string }> = {
  locations: {
    primary: '#6366F1',
    secondary: '#A855F7',
    gradient: 'from-indigo-500 to-purple-500'
  },
  industries: {
    primary: '#F59E0B',
    secondary: '#F97316',
    gradient: 'from-amber-500 to-orange-500'
  },
  guides: {
    primary: '#10B981',
    secondary: '#14B8A6',
    gradient: 'from-emerald-500 to-teal-500'
  },
  'case-studies': {
    primary: '#F43F5E',
    secondary: '#EC4899',
    gradient: 'from-rose-500 to-pink-500'
  },
  comparisons: {
    primary: '#8B5CF6',
    secondary: '#6366F1',
    gradient: 'from-violet-500 to-indigo-500'
  }
}

export const CATEGORY_INFO: CategoryInfo[] = [
  {
    name: 'Industry Tips',
    slug: 'industries',
    icon: '🏭',
    count: 43,
    color: '#F59E0B',
    description: 'Tailored for your business type'
  },
  {
    name: 'Location Guides',
    slug: 'locations',
    icon: '📍',
    count: 27,
    color: '#6366F1',
    description: 'Area-specific automation guides for Surat'
  },
  {
    name: 'Automation How-To',
    slug: 'guides',
    icon: '⚡',
    count: 3,
    color: '#10B981',
    description: 'Step-by-step tutorials'
  },
  {
    name: 'Case Studies',
    slug: 'case-studies',
    icon: '📊',
    count: 1,
    color: '#F43F5E',
    description: 'Real Surat success stories'
  },
  {
    name: 'Comparisons',
    slug: 'comparisons',
    icon: '⚖️',
    count: 7,
    color: '#8B5CF6',
    description: 'Tools and approaches compared'
  }
]

export const INDUSTRY_HUBS: IndustryHub[] = [
  {
    name: 'Textile & Diamond',
    icon: '🧵',
    slug: 'textile-diamond',
    color: '#6366F1',
    articles: 19,
    description: 'Automation for textile traders and diamond merchants'
  },
  {
    name: 'Restaurants & Food',
    icon: '🍽️',
    slug: 'restaurant-food',
    color: '#F59E0B',
    articles: 15,
    description: 'Order automation and customer management'
  },
  {
    name: 'Real Estate',
    icon: '🏠',
    slug: 'real-estate',
    color: '#10B981',
    articles: 14,
    description: 'Lead generation and client nurturing'
  },
  {
    name: 'Coaching & Education',
    icon: '📚',
    slug: 'coaching-education',
    color: '#F43F5E',
    articles: 11,
    description: 'Student and admission management'
  },
  {
    name: 'Retail & Consumer',
    icon: '🛍️',
    slug: 'retail',
    color: '#8B5CF6',
    articles: 12,
    description: 'Customer service and operations'
  }
]