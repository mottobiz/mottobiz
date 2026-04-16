import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { SEOHead } from '@/components/SEOHead'
import { ArticleCardComponent } from '@/components/resources/ArticleCard'
import { ArticleThumbnailStatic } from '@/components/resources/ArticleThumbnail'
import { ComparisonTable, StatCards, Checklist, ProTip, Warning, CTABox, TLDRBox } from '@/components/resources/ArticleComponents'
import { CATEGORY_COLORS } from '@/types/article'
import { getEnrichedArticle, getRelatedArticlesEnriched, getArticleContent } from '@/data/articles'
import { SITE_URL, WHATSAPP_LINK } from '@/lib/config'

type ParsedBlock = 
  | { type: 'heading2'; text: string }
  | { type: 'heading3'; text: string }
  | { type: 'tldr'; items: string[] }
  | { type: 'statCards'; stats: { value: string; label: string; context?: string }[] }
  | { type: 'comparisonTable'; data: { title: string; columns: string[]; rows: { feature: string; values: string[] }[]; recommendation?: { column: number; badge: string } } }
  | { type: 'checklist'; data: { title: string; items: { text: string; checked?: boolean }[] } }
  | { type: 'protip'; data: { tip: string; context?: string } }
  | { type: 'warning'; data: { title: string; message: string } }
  | { type: 'ctaBox'; data: { title: string; description: string; ctaText?: string; ctaLink?: string } }
  | { type: 'bulletList'; items: string[] }
  | { type: 'numberedList'; items: { num: number; title: string; description: string }[] }
  | { type: 'paragraph'; text: string }

function parseArticleContent(content: string, category: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = []
  const sections = content.split('\n\n').filter(s => s.trim())

  for (const section of sections) {
    const trimmed = section.trim()

    // TLDR box: lines starting with • or - that form a summary block
    if (trimmed.startsWith('**TL;DR') || trimmed.startsWith('TL;DR') || trimmed.startsWith('**Key Takeaways')) {
      const items = trimmed.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('•') || l.trim().startsWith('*')).map(l => l.replace(/^[\s]*[-•*]\s*/, '').replace(/\*\*/g, ''))
      if (items.length > 0) blocks.push({ type: 'tldr', items })
      continue
    }

    // Comparison table: | Feature | Option A | Option B | format
    if (trimmed.includes('|') && trimmed.split('\n').filter(l => l.includes('|')).length >= 3) {
      const lines = trimmed.split('\n').filter(l => l.includes('|') && !l.match(/^[\s|:-]+$/))
      if (lines.length >= 2) {
        const headerCells = lines[0].split('|').map(c => c.trim()).filter(Boolean)
        const columns = headerCells.slice(1)
        const rows = lines.slice(1).map(l => {
          const cells = l.split('|').map(c => c.trim()).filter(Boolean)
          return { feature: cells[0] || '', values: cells.slice(1) }
        })
        blocks.push({ type: 'comparisonTable', data: { title: headerCells[0] || 'Comparison', columns, rows } })
        continue
      }
    }

    // Heading 2
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'heading2', text: trimmed.replace('## ', '') })
      continue
    }

    // Heading 3
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'heading3', text: trimmed.replace('### ', '') })
      continue
    }

    // Bullet list
    if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter(l => l.trim().startsWith('-')).map(l => l.trim().replace(/^-\s*/, ''))
      blocks.push({ type: 'bulletList', items })
      continue
    }

    // Numbered bold list: 1. **Title** — description
    if (trimmed.match(/^\d+\.\s+\*\*/)) {
      const lines = trimmed.split('\n').filter(l => l.trim())
      const items = lines.map((l, i) => {
        const match = l.match(/^\d+\.\s+\*\*(.+?)\*\*\s*[-—:]\s*(.+)/)
        if (match) return { num: i + 1, title: match[1], description: match[2] }
        const simpleMatch = l.match(/^\d+\.\s+(.+)/)
        return { num: i + 1, title: simpleMatch ? simpleMatch[1] : l, description: '' }
      })
      blocks.push({ type: 'numberedList', items })
      continue
    }

    // Paragraph
    blocks.push({ type: 'paragraph', text: trimmed })
  }

  return blocks
}

export function ArticlePage() {
  const { slug: routeSlug } = useParams<{ slug: string }>()
  let article: ReturnType<typeof getEnrichedArticle>
  let content: string
  try {
    article = getEnrichedArticle(routeSlug || '')
    content = getArticleContent(routeSlug || '')
  } catch {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-white/50 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/resources"
            className="px-6 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
          >
            Back to Resources
          </Link>
        </div>
      </div>
    )
  }
  const relatedArticles = getRelatedArticlesEnriched(routeSlug || '', 3)

  if (!article) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-white/50 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/resources"
            className="px-6 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
          >
            Back to Resources
          </Link>
        </div>
      </div>
    )
  }

  const colors = CATEGORY_COLORS[article.category]
  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const parsedBlocks = parseArticleContent(content, article.category)

  const hasTldrInContent = parsedBlocks.some(b => b.type === 'tldr')
  if (!hasTldrInContent && article.tldr && article.tldr.length > 0) {
    const firstHeading = parsedBlocks.findIndex(b => b.type === 'heading2')
    if (firstHeading !== -1) {
      parsedBlocks.splice(firstHeading, 0, { type: 'tldr' as const, items: article.tldr })
    } else {
      parsedBlocks.unshift({ type: 'tldr' as const, items: article.tldr })
    }
  }

  // Build FAQ schema if article has FAQ
  const faqSchema = article.faq && article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null

  // Build Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.seo?.metaTitle || `${article.title} | Mottobiz`,
    description: article.seo?.metaDescription || article.excerpt,
    url: `${SITE_URL}/resources/${article.slug}`,
    datePublished: article.publishDate,
    author: {
      '@type': 'Organization',
      name: 'MottoBiz',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MottoBiz',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-static.svg` },
    },
    keywords: article.seo ? [article.seo.primaryKeyword, ...article.seo.secondaryKeywords].join(', ') : article.title,
  }

  return (
    <>
      <SEOHead
        title={article.seo?.metaTitle || `${article.title} | Mottobiz`}
        description={article.seo?.metaDescription || article.excerpt}
        canonicalUrl={`${SITE_URL}/resources/${article.slug}`}
      />
      {/* Schema markup */}
      <Helmet>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <article className="min-h-screen bg-base">
        {/* Hero Section */}
        <header className="relative py-16 sm:py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: `${colors.primary}20` }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: `${colors.secondary}20` }}
            />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* thumbnail image */}
            <ArticleThumbnailStatic
              category={article.category}
              slug={article.slug}
              className="h-48 sm:h-56 md:h-64 mb-8"
            />

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/resources" className="hover:text-white transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-white">{article.title.slice(0, 30)}...</span>
            </nav>

            {/* Category & Pillar */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{
                  backgroundColor: `${colors.primary}30`,
                  color: colors.primary,
                  border: `1px solid ${colors.primary}50`
                }}
              >
                {article.category === 'case-studies' ? 'Case Study' :
                 article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
              {article.pillar && (
                <span className="text-white/40 text-sm">{article.pillar}</span>
              )}
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {article.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/60 mb-8"
            >
              {article.excerpt}
            </motion.p>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6 text-sm text-white/40"
            >
              <span>{article.readingTime} min read</span>
              <span>{formattedDate}</span>
              {article.difficulty && (
                <span className="px-2 py-1 rounded bg-white/5">
                  {article.difficulty}
                </span>
              )}
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <div className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              {parsedBlocks.map((block, index) => {
                switch (block.type) {
                  case 'heading2':
                    return (
                      <h2 key={index} className="font-display text-2xl font-bold text-white mt-12 mb-6">
                        {block.text}
                      </h2>
                    )
                  case 'heading3':
                    return (
                      <h3 key={index} className="font-display text-xl font-semibold text-white mt-8 mb-4">
                        {block.text}
                      </h3>
                    )
                  case 'tldr':
                    return <TLDRBox key={index} items={block.items} />
                  case 'statCards':
                    return <StatCards key={index} stats={block.stats} category={article.category} />
                  case 'comparisonTable':
                    return <ComparisonTable key={index} data={block.data} />
                  case 'checklist':
                    return <Checklist key={index} data={block.data} category={article.category} />
                  case 'protip':
                    return <ProTip key={index} data={block.data} />
                  case 'warning':
                    return <Warning key={index} data={block.data} />
                  case 'ctaBox':
                    return <CTABox key={index} title={block.data.title} description={block.data.description} ctaText={block.data.ctaText || 'Chat on WhatsApp'} ctaLink={block.data.ctaLink || 'https://wa.me/917487957972?text=Hi%20MottoBiz'} />
                  case 'bulletList':
                    return (
                      <ul key={index} className="list-none space-y-3 my-6">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/70">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                              style={{ backgroundColor: colors.primary }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  case 'numberedList':
                    return (
                      <ol key={index} className="list-none space-y-4 my-6">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-white/70">
                            <span
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                              style={{
                                backgroundColor: `${colors.primary}20`,
                                color: colors.primary
                              }}
                            >
                              {item.num}
                            </span>
                            <div>
                              {item.title && <span className="font-semibold text-white">{item.title}</span>}
                              {item.description && <span>{item.title ? ` — ${item.description}` : item.description}</span>}
                            </div>
                          </li>
                        ))}
                      </ol>
                    )
                  case 'paragraph':
                  default:
                    return (
                      <p key={index} className="text-white/70 leading-relaxed mb-6">
                        {block.text}
                      </p>
                    )
                }
              })}
            </motion.div>

            {/* FAQ Section */}
            {article.faq && article.faq.length > 0 && (
              <section className="mt-16">
                <h2 className="font-display text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {article.faq.map((item, i) => (
                    <div key={i} className="rounded-xl border border-white/10 p-6 bg-white/[0.02]">
                      <h3 className="font-semibold text-white mb-2">{item.question}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Internal Links */}
            {article.internalLinks && article.internalLinks.length > 0 && (
              <section className="mt-12 pt-8 border-t border-white/10">
                <h3 className="font-display text-lg font-semibold text-white mb-4">Related Guides</h3>
                <div className="flex flex-wrap gap-3">
                  {article.internalLinks.map((link, i) => (
                    <Link
                      key={i}
                      to={link.url}
                      className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all"
                    >
                      {link.anchor}
                    </Link>
                  ))}
                </div>
              </section>
            )}

{/* CTA Box */}
            <CTABox
              title="Ready to Automate Your Business?"
              description="See exactly how automation would work for your specific business. We'll analyze your current setup and show you the numbers."
              ctaText="Chat on WhatsApp"
              ctaLink={WHATSAPP_LINK}
            />
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="px-6 pb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-white mb-8">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle, index) => (
                  <ArticleCardComponent
                    key={relatedArticle.id}
                    article={relatedArticle}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}