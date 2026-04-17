import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ArticleCard } from '@/types/article'
import { WHATSAPP_LINK } from '@/lib/config'

interface HubArticleCardProps {
  article: ArticleCard
  colors: { primary: string; secondary: string }
}

function HubArticleCard({ article, colors }: HubArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 hover:border-white/20 transition-all group"
    >
      <Link to={`/resources/${article.slug}`} className="block">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-sm font-medium px-2 py-1 rounded-md"
            style={{ 
              backgroundColor: `${colors.primary}20`, 
              color: colors.primary,
              border: `1px solid ${colors.primary}30`
            }}
          >
            {article.category === 'locations' ? article.slug.split('-').slice(1, -1).join(' ').replace(/^\w/, c => c.toUpperCase()) : article.category}
          </span>
          <span className="text-white/55 text-xs">{article.readingTime} min read</span>
        </div>
        <h3 className="font-display font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-white/55 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center gap-1 text-indigo-400 text-sm font-medium">
          Read guide
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

interface HubPageProps {
  name: string
  icon: string
  slug: string
  description: string
  color: string
  secondaryColor: string
  articles: ArticleCard[]
  pillar?: string
  canonicalUrl: string
  metaTitle: string
  metaDescription: string
  relatedHubs?: Array<{ name: string; slug: string; icon: string; color: string }>
}

export function HubPage({ 
  name, 
  icon, 
  slug, 
  description, 
  color, 
  secondaryColor, 
  articles,
  pillar,
  canonicalUrl,
  metaTitle,
  metaDescription,
  relatedHubs,
}: HubPageProps) {
  const colors = { primary: color, secondary: secondaryColor }

  return (
    <main className="min-h-screen bg-base">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${color}15` }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${color}20, ${secondaryColor}20)`,
                border: `1px solid ${color}30`
              }}
            >
              {icon}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              {name} Automation Guide
            </h1>
            <p className="text-white/55 text-lg max-w-2xl mx-auto mb-8">
              {description}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div 
                className="px-4 py-2 rounded-xl text-sm font-medium"
                style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}25` }}
              >
                {articles.length} guides
              </div>
              {pillar && (
                <Link 
                  to="/resources"
                  className="text-white/55 hover:text-white text-sm transition-colors"
                >
                  All Industries →
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Articles Grid */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-white">
              All {name} Automation Guides
            </h2>
            <span className="text-white/55 text-sm">{articles.length} articles</span>
          </div>

          {articles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <HubArticleCard 
                  key={article.id} 
                  article={article} 
                  colors={colors} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/55">No articles in this hub yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Hubs */}
      {relatedHubs && relatedHubs.length > 0 && (
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-xl font-bold text-white mb-6">
              Explore Other Industries
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedHubs.map((hub) => (
                <Link
                  key={hub.slug}
                  to={`/industries/${hub.slug}`}
                  className="card p-5 hover:border-white/20 transition-all group"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                    style={{ 
                      backgroundColor: `${hub.color}15`,
                      border: `1px solid ${hub.color}25`
                    }}
                  >
                    {hub.icon}
                  </div>
                  <h3 className="font-display font-semibold text-white text-sm group-hover:text-indigo-400 transition-colors">
                    {hub.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className="rounded-2xl p-8 sm:p-12 text-center border"
            style={{ 
              background: `linear-gradient(135deg, ${color}08, ${secondaryColor}08)`,
              borderColor: `${color}20`
            }}
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Ready to Automate Your {name} Business?
            </h2>
            <p className="text-white/55 mb-6 max-w-lg mx-auto">
              Get a free automation audit for your {name.toLowerCase()} business in Surat. 
              We show you exactly what to automate first.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
