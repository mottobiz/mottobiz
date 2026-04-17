import { motion } from 'framer-motion'
import { ArticleCategory, CATEGORY_INFO } from '@/types/article'

interface CategoryFilterProps {
  activeCategory: ArticleCategory | 'all'
  onCategoryChange: (category: ArticleCategory | 'all') => void
  counts?: Record<ArticleCategory, number>
}

export function CategoryFilter({ 
  activeCategory, 
  onCategoryChange,
  counts 
}: CategoryFilterProps) {
  const categories = [
    { name: 'All', slug: 'all' as const, icon: '📑', color: '#FAFAFA' },
    ...CATEGORY_INFO.map(cat => ({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      color: cat.color,
      count: counts?.[cat.slug] ?? cat.count
    }))
  ]

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Filter articles by category">
      {categories.map((category) => {
        const isActive = activeCategory === category.slug
        const count = category.slug === 'all' 
          ? Object.values(counts || {}).reduce((a, b) => a + b, 0)
          : counts?.[category.slug as ArticleCategory] ?? (category as any).count

        return (
          <motion.button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={isActive}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'text-white shadow-lg'
                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            style={isActive ? {
              background: `linear-gradient(135deg, ${category.color}, ${category.color}CC)`,
              border: 'none'
            } : undefined}
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              isActive 
                ? 'bg-white/20' 
                : 'bg-white/10'
            }`}>
              {count}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

// Compact filter for sidebar
interface CompactFilterProps {
  activeCategory: ArticleCategory | 'all'
  onCategoryChange: (category: ArticleCategory | 'all') => void
  counts?: Record<ArticleCategory, number>
}

export function CompactCategoryFilter({
  activeCategory,
  onCategoryChange,
  counts
}: CompactFilterProps) {
  const categories = [
    { name: 'All', slug: 'all' as const },
    ...CATEGORY_INFO.map(cat => ({
      name: cat.name,
      slug: cat.slug,
      count: counts?.[cat.slug] ?? cat.count
    }))
  ]

  return (
    <div className="space-y-1">
      {categories.map((category) => {
        const isActive = activeCategory === category.slug
        const count = category.slug === 'all'
          ? Object.values(counts || {}).reduce((a, b) => a + b, 0)
          : counts?.[category.slug as ArticleCategory] ?? (category as any).count

        return (
          <button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            aria-pressed={isActive}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
              isActive
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{category.name}</span>
            <span className="text-xs text-white/55">{count}</span>
          </button>
        )
      })}
    </div>
  )
}

// Search bar component
interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Search articles...' 
}: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="article-search" className="sr-only">Search articles</label>
      <input
        id="article-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
      />
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
