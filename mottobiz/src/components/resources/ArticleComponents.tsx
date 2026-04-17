import { motion } from 'framer-motion'
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