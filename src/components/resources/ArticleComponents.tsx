import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CATEGORY_COLORS, type ArticleCategory, type ComparisonTableData, type StatCardData, type ChecklistData, type ProTipData, type WarningData, type StepItem } from '@/types/article'

interface ArticleComponentsProps {
  category: ArticleCategory
}

// ==========================================
// Comparison Table
// ==========================================
export function ComparisonTable({ data }: { data: ComparisonTableData }) {
  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10">
      <h3 className="font-display text-lg font-semibold text-white px-6 py-4 bg-white/5">
        {data.title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-3 text-sm font-medium text-white/50">Feature</th>
              {data.columns.map((col, i) => (
                <th key={i} className="text-center px-6 py-3 text-sm font-medium text-white/70">
                  {col}
                  {data.recommendation?.column === i && (
                    <span className="block text-xs text-amber-400 mt-1">{data.recommendation.badge}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
              >
                <td className="px-6 py-3 text-sm text-white/70 font-medium">{row.feature}</td>
                {row.values.map((val, j) => (
                  <td key={j} className="text-center px-6 py-3 text-sm text-white/60">
                    {val === '✅' ? (
                      <span className="text-emerald-400">✓</span>
                    ) : val === '❌' ? (
                      <span className="text-white/55">—</span>
                    ) : (
                      val
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ==========================================
// Stat Card
// ==========================================
export function StatCards({ stats, category }: { stats: StatCardData[]; category: ArticleCategory } & ArticleComponentsProps) {
  const colors = CATEGORY_COLORS[category]
  return (
    <div className="my-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl p-4 text-center border border-white/5"
          style={{ background: `linear-gradient(135deg, ${colors.primary}10, transparent)` }}
        >
          <div className="text-2xl sm:text-3xl font-bold font-display text-white mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-white/60">{stat.label}</div>
          {stat.context && (
            <div className="text-xs text-white/50 mt-1">{stat.context}</div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

// ==========================================
// Checklist
// ==========================================
export function Checklist({ data, category }: { data: ChecklistData } & ArticleComponentsProps) {
  const colors = CATEGORY_COLORS[category]
  return (
    <div className="my-8 rounded-2xl p-6 border border-white/10 bg-white/[0.02]">
      <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span style={{ color: colors.primary }}>✓</span>
        {data.title}
      </h3>
      <ul className="space-y-3">
        {data.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-white/70">
            <span
              className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
              style={{ backgroundColor: `${colors.primary}25`, color: colors.primary }}
            >
              {item.checked ? '✓' : i + 1}
            </span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ==========================================
// Steps / Timeline
// ==========================================
export function Steps({ steps, category }: { steps: StepItem[] } & ArticleComponentsProps) {
  const colors = CATEGORY_COLORS[category]
  return (
    <div className="my-8 space-y-4">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: `${colors.primary}25`, color: colors.primary }}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 mt-1" style={{ backgroundColor: `${colors.primary}30` }} />
            )}
          </div>
          <div className="pb-4 flex-1">
            <div className="font-semibold text-white text-sm">{step.title}</div>
            <div className="text-white/60 text-sm mt-1">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ==========================================
// ProTip
// ==========================================
export function ProTip({ data }: { data: ProTipData }) {
  return (
    <div className="my-8 rounded-xl p-5 border border-amber-500/20 bg-amber-500/5">
      <div className="flex items-start gap-3">
        <span className="text-amber-400 text-lg flex-shrink-0" aria-label="Tip">💡</span>
        <div>
          <div className="font-semibold text-amber-400 text-sm mb-1">Pro Tip</div>
          <div className="text-white/80 text-sm">{data.tip}</div>
          {data.context && (
            <div className="text-white/55 text-xs mt-1">{data.context}</div>
          )}
        </div>
      </div>
    </div>
  )
}

// ==========================================
// Warning
// ==========================================
export function Warning({ data }: { data: WarningData }) {
  return (
    <div className="my-8 rounded-xl p-5 border border-rose-500/20 bg-rose-500/5">
      <div className="flex items-start gap-3">
        <span className="text-rose-400 text-lg flex-shrink-0" aria-label="Warning">⚠️</span>
        <div>
          <div className="font-semibold text-rose-400 text-sm mb-1">{data.title}</div>
          <div className="text-white/80 text-sm">{data.message}</div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// CTA Box
// ==========================================
export function CTABox({ title, description, ctaText, ctaLink }: { title: string; description: string; ctaText: string; ctaLink: string }) {
  return (
    <div className="my-8 rounded-2xl p-6 sm:p-8 border border-indigo-500/20 bg-indigo-500/5">
      <h3 className="font-display text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/60 text-sm mb-6">{description}</p>
      <a
        href={ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
        aria-label="Chat on WhatsApp (opens in new window)"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {ctaText}
      </a>
    </div>
  )
}

// ==========================================
// TL;DR Box
// ==========================================
export function TLDRBox({ items }: { items: string[] }) {
  return (
    <div className="my-8 rounded-2xl p-6 border border-white/10 bg-white/[0.02]">
      <h3 className="font-display text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
        <span aria-label="Summary">⚡</span> TL;DR
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
            <span className="text-amber-400/70 mt-1" aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ==========================================
// StatBanner — single large stat + context
// ==========================================
export interface StatBannerData {
  value: string
  label: string
  source?: string
  color?: string
}

export function StatBanner({ data, category }: { data: StatBannerData } & ArticleComponentsProps) {
  const colors = CATEGORY_COLORS[category]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="my-10 rounded-2xl overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}18 0%, ${colors.secondary}10 100%)`,
        border: `1px solid ${colors.primary}35`
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: `${colors.primary}20` }}
      />
      <div className="relative z-10 p-8 sm:p-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display text-6xl sm:text-8xl font-extrabold mb-3"
          style={{ color: colors.primary }}
        >
          {data.value}
        </motion.div>
        <p className="text-white/80 text-lg sm:text-xl font-medium max-w-xl mx-auto mb-3">
          {data.label}
        </p>
        {data.source && (
          <p className="text-white/40 text-xs uppercase tracking-wider">{data.source}</p>
        )}
      </div>
    </motion.div>
  )
}

// ==========================================
// BarChart — animated horizontal bars
// ==========================================
export interface BarChartData {
  title: string
  bars: { label: string; value: number; formatted?: string }[]
  unit: string
  max: number
}

export function BarChart({ data, category }: { data: BarChartData } & ArticleComponentsProps) {
  const colors = CATEGORY_COLORS[category]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const effectiveMax = data.max || Math.max(...data.bars.map(b => b.value)) * 1.15

  const formatValue = (v: number, unit: string) => {
    if (unit === 'Rs.' || unit === '₹') {
      if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
      if (v >= 1000) return `₹${(v / 1000).toFixed(0)}k`
      return `₹${v}`
    }
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`
    if (v >= 1000) return `${(v / 1000).toFixed(0)}k`
    return `${v}${unit}`
  }

  return (
    <div ref={ref} className="my-8 rounded-2xl p-6 border border-white/10 bg-white/[0.02]">
      <h3 className="font-display text-base font-semibold text-white mb-6">{data.title}</h3>
      <div className="space-y-4">
        {data.bars.map((bar, i) => {
          const pct = Math.min((bar.value / effectiveMax) * 100, 100)
          const display = bar.formatted || formatValue(bar.value, data.unit)
          return (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-white/70 text-sm">{bar.label}</span>
                <span className="text-white font-semibold text-sm">{display}</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${pct}%` } : { width: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: 'easeOut' }}
                  style={{
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================
// ProcessFlow — step-by-step flow diagram
// ==========================================
export interface ProcessFlowData {
  title: string
  steps: string[]
}

export function ProcessFlow({ data, category }: { data: ProcessFlowData } & ArticleComponentsProps) {
  const colors = CATEGORY_COLORS[category]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="my-10">
      {data.title && (
        <h3 className="font-display text-base font-semibold text-white mb-6 text-center">{data.title}</h3>
      )}
      {/* Desktop: horizontal row */}
      <div className="hidden sm:flex items-start gap-0 overflow-x-auto pb-2">
        {data.steps.map((step, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center gap-2 w-28 sm:w-32"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: `${colors.primary}25`, color: colors.primary, border: `1px solid ${colors.primary}40` }}
              >
                {i + 1}
              </div>
              <span className="text-white/70 text-xs text-center leading-snug px-1">{step}</span>
            </motion.div>
            {i < data.steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.08 + 0.15 }}
                className="text-white/20 mx-1 flex-shrink-0 mb-4"
                aria-hidden="true"
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>
      {/* Mobile: vertical stack */}
      <div className="sm:hidden space-y-0">
        {data.steps.map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex flex-col items-center flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: `${colors.primary}25`, color: colors.primary, border: `1px solid ${colors.primary}40` }}
              >
                {i + 1}
              </motion.div>
              {i < data.steps.length - 1 && (
                <div className="w-px h-6 mt-0.5" style={{ backgroundColor: `${colors.primary}30` }} />
              )}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.07 + 0.1 }}
              className="text-white/70 text-sm pt-1 pb-6"
            >
              {step}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// CostCompare — two-column cost comparison
// ==========================================
export interface CostCompareData {
  title?: string
  left: { label: string; value: string; sub?: string; color?: string }
  right: { label: string; value: string; sub?: string; color?: string }
  saving?: string
}

export function CostCompare({ data }: { data: CostCompareData }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="my-10"
    >
      {data.title && (
        <h3 className="font-display text-base font-semibold text-white mb-6 text-center">{data.title}</h3>
      )}
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {/* Left — human / old */}
        <div className="rounded-2xl p-5 sm:p-7 border border-rose-500/25 bg-rose-500/5 text-center">
          <div className="text-rose-400/70 text-xs font-semibold uppercase tracking-widest mb-2">
            {data.left.label}
          </div>
          <div className="font-display text-3xl sm:text-4xl font-extrabold text-rose-400 mb-1">
            {data.left.value}
          </div>
          {data.left.sub && (
            <p className="text-white/45 text-xs mt-2 leading-relaxed">{data.left.sub}</p>
          )}
        </div>

        {/* Right — AI / new */}
        <div className="rounded-2xl p-5 sm:p-7 border border-emerald-500/25 bg-emerald-500/5 text-center">
          <div className="text-emerald-400/70 text-xs font-semibold uppercase tracking-widest mb-2">
            {data.right.label}
          </div>
          <div className="font-display text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">
            {data.right.value}
          </div>
          {data.right.sub && (
            <p className="text-white/45 text-xs mt-2 leading-relaxed">{data.right.sub}</p>
          )}
        </div>
      </div>

      {/* Saving callout */}
      {data.saving && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-3 rounded-xl py-3 px-5 text-center border border-emerald-500/20 bg-emerald-500/5"
        >
          <span className="text-emerald-400 font-semibold text-sm">{data.saving}</span>
        </motion.div>
      )}
    </motion.div>
  )
}