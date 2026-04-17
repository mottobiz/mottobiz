import type { ArticleCard, ArticleEnrichment, FAQItem, InternalLink, SEOFields, StatCardData, ChecklistData, StepItem, ProTipData, WarningData } from '@/types/article'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from './catalog'
import { TLDR_DATABASE, FAQ_DATABASE, STATCARDS_DATABASE, CHECKLISTS_DATABASE, STEPS_DATABASE, PROTIPS_DATABASE, WARNINGS_DATABASE } from './enrichment'

// Helper and enrichment logic extracted from src/data/articles.ts.

export function getArticleBySlug(slug: string): ArticleCard | undefined {
  return ARTICLES.find(article => article.slug === slug) || LOCATION_SERVICE_ARTICLES.find(article => article.slug === slug)
}

// Get articles by category
export function getArticlesByCategory(category: string): ArticleCard[] {
  return [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(article => article.category === category)
}

// Get articles by pillar
export function getArticlesByPillar(pillar: string): ArticleCard[] {
  return [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(article => article.pillar === pillar)
}

// Get featured articles
export function getFeaturedArticles(): ArticleCard[] {
  return ARTICLES.filter(article => article.featured)
}

// Get related articles
export function getRelatedArticles(currentSlug: string, limit: number = 3): ArticleCard[] {
  const currentArticle = getArticleBySlug(currentSlug)
  if (!currentArticle) return []

  return ARTICLES
    .filter(article =>
      article.slug !== currentSlug &&
      (article.pillar === currentArticle.pillar || article.category === currentArticle.category)
    )
    .slice(0, limit)
}

// Article content (moved to ./articles/content)

// SEO & Content Enrichment
// ==========================================
// Generates SEO metadata, FAQ, internal links, and related articles
// for articles that don't have them defined inline.

const PILLAR_HUB_URLS: Record<string, string> = {
  'Textile & Diamond': '/resources?pillar=Textile+%26+Diamond',
  'Restaurants & Food': '/resources?pillar=Restaurants+%26+Food',
  'Real Estate': '/resources?pillar=Real+Estate',
  'Coaching & Education': '/resources?pillar=Coaching+%26+Education',
  'Retail & Consumer': '/resources?pillar=Retail+%26+Consumer',
}

const PILLAR_KEYWORDS: Record<string, { primary: string; secondary: string[]; audience: string }> = {
  'Textile & Diamond': {
    primary: 'textile automation Surat',
    secondary: ['WhatsApp automation textile', 'Varachha textile business', 'diamond merchant automation', 'bulk order automation'],
    audience: 'Textile traders and diamond merchants in Surat',
  },
  'Restaurants & Food': {
    primary: 'restaurant automation Surat',
    secondary: ['WhatsApp order automation', 'restaurant reservation system', 'food delivery automation', 'review requests restaurant'],
    audience: 'Restaurant and cafe owners in Surat',
  },
  'Real Estate': {
    primary: 'real estate automation Surat',
    secondary: ['property lead generation', 'real estate WhatsApp', 'buyer qualification automation', 'property listing automation'],
    audience: 'Real estate agents and brokers in Surat',
  },
  'Coaching & Education': {
    primary: 'coaching center automation Surat',
    secondary: ['student inquiry automation', 'fee reminder automation', 'class schedule WhatsApp', 'admission management'],
    audience: 'Coaching center owners and tutors in Surat',
  },
  'Retail & Consumer': {
    primary: 'retail automation Surat',
    secondary: ['WhatsApp retail automation', 'inventory alert system', 'product availability WhatsApp', 'retail customer retention'],
    audience: 'Retail shop owners in Surat',
  },
}

const CATEGORY_KEYWORDS: Record<string, string> = {
  industries: 'automation Surat',
  locations: 'Surat business automation',
  comparisons: 'automation tool comparison',
  'case-studies': 'automation case study Surat',
  guides: 'business automation guide',
}

function generateFAQ(slug: string): FAQItem[] {
  if (FAQ_DATABASE[slug]) return FAQ_DATABASE[slug]
  const article = ARTICLES.find(a => a.slug === slug) ?? LOCATION_SERVICE_ARTICLES.find(a => a.slug === slug)
  if (!article) return []
  const pillarInfo = PILLAR_KEYWORDS[article.pillar || '']
  const categoryName = article.category === 'case-studies' ? 'Case Study' : article.category.charAt(0).toUpperCase() + article.category.slice(1)
  return [
    { question: `What is ${article.seo?.primaryKeyword || article.title.toLowerCase()}?`, answer: `${article.excerpt} This ${categoryName.toLowerCase()} article covers everything you need to know about ${article.pillar?.toLowerCase() || 'business automation'} in Surat, with practical steps you can implement today.` },
    { question: `How much does ${article.pillar?.toLowerCase() || 'automation'} cost for a ${article.category === 'locations' ? 'Surat business' : 'Surat business'}?`, answer: `Basic automation tools start free (WhatsApp Business). Professional setup with Make or n8n costs â‚¹700-3,500/month. Complete managed automation from MottoBiz starts at â‚¹5,000/month, with most Surat businesses seeing ROI within the first month.` },
    { question: `Can I automate my ${article.pillar?.toLowerCase() || 'business'} without technical knowledge?`, answer: `Yes. MottoBiz handles all the technical setup, configuration, and ongoing management. You don't need to touch any code or learn complex tools. We set up everything for you and provide support in Hindi, English, and Gujarati.` },
  ]
}

function generateInternalLinks(slug: string): InternalLink[] {
  const article = ARTICLES.find(a => a.slug === slug) ?? LOCATION_SERVICE_ARTICLES.find(a => a.slug === slug)
  if (!article) return []
  const links: import('@/types/article').InternalLink[] = []

  // Always link to the getting started guide
  links.push({ anchor: 'getting started with business automation', url: '/resources/getting-started-business-automation', type: 'article' })

  // Link to pillar hub if pillar exists
  if (article.pillar && PILLAR_HUB_URLS[article.pillar]) {
    const pillarArticles = ARTICLES.filter(a => a.pillar === article.pillar && a.slug !== slug)
    if (pillarArticles.length >= 2) {
      links.push({ anchor: `${article.pillar.toLowerCase()} automation guides`, url: '/resources', type: 'pillar' })
    }
    // Add 1-2 specific pillar articles
    pillarArticles.slice(0, 2).forEach(a => {
      links.push({ anchor: a.title.toLowerCase(), url: `/resources/${a.slug}`, type: 'article' })
    })
  }

  // Add comparison link for industry articles
  if (article.category === 'industries') {
    links.push({ anchor: 'n8n vs Make comparison', url: '/resources/n8n-vs-make', type: 'article' })
  }

  // Add cost guide for all articles
  links.push({ anchor: 'how much automation costs', url: '/resources/how-much-does-business-automation-cost', type: 'article' })

  // Add WhatsApp guide for all articles
  links.push({ anchor: 'complete WhatsApp business guide', url: '/resources/complete-whatsapp-business-guide-surat', type: 'article' })

  // CTA link
  links.push({ anchor: 'free automation audit', url: '/#audit', type: 'service' })

  return links.slice(0, 6)
}

function generateRelatedSlugs(slug: string): string[] {
  const article = ARTICLES.find(a => a.slug === slug) ?? LOCATION_SERVICE_ARTICLES.find(a => a.slug === slug)
  if (!article) return []

  const allArticles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES]
  const samePillar = allArticles.filter(a => a.pillar === article.pillar && a.slug !== slug)
  const sameCategory = allArticles.filter(a => a.category === article.category && a.slug !== slug && a.pillar !== article.pillar)

  return [
    ...samePillar.slice(0, 2).map(a => a.slug),
    ...sameCategory.slice(0, 1).map(a => a.slug),
  ].slice(0, 3)
}

function generateSEO(slug: string): SEOFields {
  const article = ARTICLES.find(a => a.slug === slug) ?? LOCATION_SERVICE_ARTICLES.find(a => a.slug === slug)
  if (!article) return { metaTitle: 'Article | Mottobiz', metaDescription: 'Business automation guides for Surat businesses.', primaryKeyword: 'business automation Surat', secondaryKeywords: [], searchIntent: 'informational', targetAudience: 'Surat business owners' }

  const pillarInfo = PILLAR_KEYWORDS[article.pillar || '']
  const categoryKeyword = CATEGORY_KEYWORDS[article.category] || 'business automation'
  const primaryKeyword = pillarInfo?.primary || `${article.title.toLowerCase().split(' ').slice(0, 4).join(' ')} Surat`
  const secondaryKeywords = pillarInfo?.secondary || [categoryKeyword, 'automation tools Surat', 'WhatsApp automation']
  const targetAudience = pillarInfo?.audience || 'Surat business owners'

  const metaTitle = article.title.length > 55 ? `${article.title.slice(0, 52)}... | Mottobiz` : `${article.title} | Mottobiz`
  const metaDescription = article.excerpt.length > 155 ? `${article.excerpt.slice(0, 152)}...` : article.excerpt

  const intentMap: Record<string, import('@/types/article').SearchIntent> = {
    'industries': 'commercial',
    'locations': 'commercial',
    'guides': 'informational',
    'comparisons': 'commercial',
    'case-studies': 'informational',
  }

  return {
    metaTitle,
    metaDescription,
    primaryKeyword,
    secondaryKeywords,
    searchIntent: intentMap[article.category] || 'informational',
    targetAudience,
  }
}

// Enrich all articles with SEO, FAQ, internal links, and related articles
export function getEnrichedArticle(slug: string): ArticleCard & ArticleEnrichment {
  const article = ARTICLES.find(a => a.slug === slug) ?? LOCATION_SERVICE_ARTICLES.find(a => a.slug === slug)
  if (!article) throw new Error(`Article not found: ${slug}`)

  return {
    ...article,
    seo: article.seo || generateSEO(slug),
    faq: article.faq || generateFAQ(slug),
    internalLinks: article.internalLinks || generateInternalLinks(slug),
    relatedArticleSlugs: article.relatedArticleSlugs || generateRelatedSlugs(slug),
    tldr: TLDR_DATABASE[slug] || [],
  }
}

// Get enriched related articles
export function getRelatedArticlesEnriched(currentSlug: string, limit: number = 3): (ArticleCard & ArticleEnrichment)[] {
  const current = getEnrichedArticle(currentSlug)
  const allArticles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES]
  const slugs = current.relatedArticleSlugs.length > 0
    ? current.relatedArticleSlugs
    : allArticles.filter(a => a.slug !== currentSlug && (a.pillar === current.pillar || a.category === current.category)).slice(0, limit).map(a => a.slug)

  return slugs.slice(0, limit).map(slug => {
    try { return getEnrichedArticle(slug) } catch { return null! }
  }).filter(Boolean)
}

export function getTLDR(slug: string): string[] {
  return TLDR_DATABASE[slug] || []
}

export function getInteractiveBlocks(slug: string): any[] {
  const blocks: any[] = []

  if (STATCARDS_DATABASE[slug]) {
    blocks.push({ type: 'statCards', stats: STATCARDS_DATABASE[slug] })
  }
  if (CHECKLISTS_DATABASE[slug]) {
    blocks.push({ type: 'checklist', data: CHECKLISTS_DATABASE[slug] })
  }
  if (STEPS_DATABASE[slug]) {
    blocks.push({ type: 'steps', steps: STEPS_DATABASE[slug] })
  }
  if (PROTIPS_DATABASE[slug]) {
    blocks.push({ type: 'protip', data: PROTIPS_DATABASE[slug] })
  }
  if (WARNINGS_DATABASE[slug]) {
    blocks.push({ type: 'warning', data: WARNINGS_DATABASE[slug] })
  }

  return blocks
}
