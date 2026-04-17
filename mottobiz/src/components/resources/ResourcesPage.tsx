import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArticleCard, 
  ArticleCategory, 
  CATEGORY_INFO, 
  INDUSTRY_HUBS 
} from '@/types/article'
import { ResourcesHero, NewsletterCTA, WhatsAppCTA } from './ResourcesHero'
import { CategoryFilter } from './CategoryFilter'
import { ArticleGrid } from './ArticleGrid'
import { FeaturedArticle } from './ArticleCard'
import { ARTICLES } from '@/data/articles'

interface ResourcesPageProps {
  articles?: ArticleCard[]
}

export function ResourcesPage({ articles = ARTICLES }: ResourcesPageProps) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDataPrefetched, setIsDataPrefetched] = useState(false)

  // Prefetch article data in background (once per session)
  useEffect(() => {
    if (!isDataPrefetched) {
      import('@/data/articles').then(() => setIsDataPrefetched(true))
    }
  }, [isDataPrefetched])

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    let filtered = articles

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(article => article.category === activeCategory)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.pillar?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [articles, activeCategory, searchQuery])

  // Separate featured and regular articles
  const featuredArticles = filteredArticles.filter(a => a.featured)
  const regularArticles = filteredArticles.filter(a => !a.featured)

  // Count articles per category
  const categoryCounts = useMemo(() => {
    const counts: Record<ArticleCategory, number> = {
      locations: 0,
      industries: 0,
      guides: 0,
      'case-studies': 0,
      comparisons: 0
    }
    articles.forEach(article => {
      counts[article.category]++
    })
    return counts
  }, [articles])

  return (
    <main className="min-h-screen bg-base">
      {/* Hero Section */}
      <ResourcesHero 
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        articleCount={articles.length}
      />

      {/* Category Filter */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={categoryCounts}
          />
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && activeCategory === 'all' && !searchQuery && (
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              Most Popular Guides
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <FeaturedArticle key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industry Hubs */}
      {activeCategory === 'all' && !searchQuery && (
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Industry Guides
            </h2>
            <p className="text-white/50 mb-8">
              Find guides specific to your business type
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {INDUSTRY_HUBS.map((hub) => (
                <Link
                  key={hub.slug}
                  to={`/industries/${hub.slug}`}
                  className="card p-6 hover:border-white/20 transition-all group"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ 
                      backgroundColor: `${hub.color}20`,
                      border: `1px solid ${hub.color}30`
                    }}
                  >
                    {hub.icon}
                  </div>
                  <h3 className="font-display font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                    {hub.name}
                  </h3>
                  <p className="text-xs text-white/55">
                    {hub.articles} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-white">
              {activeCategory === 'all' ? 'All Articles' : CATEGORY_INFO.find(c => c.slug === activeCategory)?.name}
            </h2>
            <span className="text-white/55 text-sm">
              {filteredArticles.length} articles
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <ArticleGrid articles={regularArticles} columns={3} />
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">No articles found</h3>
              <p className="text-white/50 text-sm">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />

      {/* WhatsApp CTA */}
      <WhatsAppCTA />
    </main>
  )
}
