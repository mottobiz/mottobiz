import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArticleCard, CATEGORY_COLORS } from '@/types/article'
import { ArticleThumbnailStatic } from './ArticleThumbnail'

interface ArticleCardProps {
  article: ArticleCard
  index?: number
}

export function ArticleCardComponent({ article, index = 0 }: ArticleCardProps) {
  const colors = CATEGORY_COLORS[article.category]
  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <Link
        to={`/resources/${article.slug}`}
        className="block card overflow-hidden hover:border-white/20 transition-all duration-300"
      >
        {/* Thumbnail */}
        {article.thumbnail ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={article.thumbnail.src}
              alt={article.thumbnail.alt}
              width={article.thumbnail.width}
              height={article.thumbnail.height}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base to-transparent opacity-60" />
          </div>
        ) : (
          <ArticleThumbnailStatic
            category={article.category}
            slug={article.slug}
            className="h-48"
          />
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 text-xs font-medium rounded-full"
            style={{ 
              backgroundColor: `${colors.primary}30`,
              color: colors.primary,
              border: `1px solid ${colors.primary}50`
            }}
          >
            {article.category === 'case-studies' ? 'Case Study' : 
             article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {article.title}
          </h3>
          
          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-white/40">
            <span>{article.readingTime} min read</span>
            <span>{formattedDate}</span>
          </div>

          {/* Pillar indicator if exists */}
          {article.pillar && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <span className="text-xs text-white/40">
                {article.pillar}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

// Featured Article Card (larger, for hero section)
interface FeaturedArticleProps {
  article: ArticleCard
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const colors = CATEGORY_COLORS[article.category]
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative col-span-full lg:col-span-2"
    >
      <Link
        to={`/resources/${article.slug}`}
        className="block card overflow-hidden hover:border-white/20 transition-all duration-300"
      >
        {article.thumbnail ? (
          <div className="relative h-64 lg:h-80 overflow-hidden">
            <img
              src={article.thumbnail.src}
              alt={article.thumbnail.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base via-base/50 to-transparent" />
          </div>
        ) : (
          <ArticleThumbnailStatic
            category={article.category}
            slug={article.slug}
            className="h-64 lg:h-80"
          />
        )}

        {/* Featured Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-bold rounded-full bg-amber-500 text-base">
            Featured
          </span>
          <span
            className="px-3 py-1 text-xs font-medium rounded-full"
            style={{ 
              backgroundColor: `${colors.primary}30`,
              color: colors.primary,
              border: `1px solid ${colors.primary}50`
            }}
          >
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {article.title}
          </h3>
          
          <p className="text-white/70 text-sm lg:text-base mb-4 line-clamp-2">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-white/50">
            <span>{article.readingTime} min read</span>
            <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
              Read article →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
