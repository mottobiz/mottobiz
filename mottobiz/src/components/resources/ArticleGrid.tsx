import { motion } from 'framer-motion'
import { ArticleCard, ArticleCategory } from '@/types/article'
import { ArticleCardComponent } from './ArticleCard'

interface ArticleGridProps {
  articles: ArticleCard[]
  columns?: 2 | 3 | 4
  showLoadMore?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  loading?: boolean
}

export function ArticleGrid({ 
  articles, 
  columns = 3,
  showLoadMore = false,
  onLoadMore,
  hasMore = false,
  loading = false
}: ArticleGridProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div>
      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {articles.map((article, index) => (
          <ArticleCardComponent 
            key={article.id} 
            article={article} 
            index={index} 
          />
        ))}
      </div>

      {showLoadMore && hasMore && (
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              'Load More Articles'
            )}
          </button>
        </motion.div>
      )}
    </div>
  )
}

// Paginated grid with page numbers
interface PaginatedGridProps {
  articles: ArticleCard[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginatedGrid({
  articles,
  currentPage,
  totalPages,
  onPageChange
}: PaginatedGridProps) {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCardComponent 
            key={article.id} 
            article={article} 
            index={index} 
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                Math.abs(page - currentPage) <= 1
              )
              .map((page, i, arr) => (
                <span key={page}>
                  {i > 0 && arr[i - 1] !== page - 1 && (
                    <span className="px-2 text-white/30">...</span>
                  )}
                  <button
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-lg transition-all ${
                      page === currentPage
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                </span>
              ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
