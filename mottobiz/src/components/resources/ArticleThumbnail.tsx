import { CATEGORY_COLORS, ArticleCategory } from '@/types/article'

interface ArticleThumbnailProps {
  category: ArticleCategory
  title: string
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const THUMBNAIL_ICONS: Record<string, string> = {
  'whatsapp-automation-textile-traders-surat': '💬',
  'bulk-order-inquiries-automation': '📦',
  'lead-capture-diamond-businesses': '💎',
  'stock-alert-automation-textile': '🔔',
  'textile-business-automation-varachha': '🧵',
  'varachha-textile-case-study': '📊',
  'restaurant-automation-adajan': '🍽️',
  'whatsapp-order-automation-restaurants': '📱',
  'auto-confirming-orders-estimates': '✅',
  'reservation-booking-whatsapp': '📅',
  'delivery-status-updates-whatsapp': '🛵',
  'automated-review-requests-restaurants': '⭐',
  'real-estate-leads-vesu': '🏠',
  'real-estate-lead-automation-surat': '🎯',
  'qualifying-property-buyers-automatically': '🔍',
  'property-listings-whatsapp-automation': '🏘️',
  'long-term-lead-nurturing-real-estate': '🤝',
  'coaching-center-automation': '📚',
  'handling-admission-inquiries-24-7': '🎓',
  'class-schedule-reminders': '🕐',
  'fee-payment-reminders-coaching': '💰',
  'student-progress-updates-parents': '👨‍👩‍👧',
  'retail-whatsapp-automation': '🛍️',
  'product-availability-checks-whatsapp': '🔎',
  'sale-announcements-automation': '🏷️',
  'inventory-alerts-retail': '📉',
  'n8n-vs-make': '⚙️',
  'whatsapp-business-api-vs-automation': '📲',
  'free-vs-paid-automation': '💡',
  'website-development-varachha': '🌐',
  'business-automation-vesu': '🚀',
  'restaurant-automation-adajan-location': '🍕',
  'getting-started-business-automation': '🏁',
  'complete-whatsapp-business-guide-surat': '📖',
  'how-much-does-business-automation-cost': '💵',
  // Pillar 1 additions
  'price-quote-automation-textile': '💰',
  'following-up-buyers-automation': '🔔',
  'qualifying-international-buyers': '🌍',
  'crm-integration-diamond-trading': '🔗',
  'order-confirmation-workflows': '📋',
  'connecting-inventory-whatsapp': '📊',
  'diamond-traders-surat-automation-guide': '💎',
  // Pillar 2 additions
  'customization-requests-automation': '📝',
  'table-availability-updates': '💺',
  'festival-menu-announcements': '🎉',
  'route-optimization-delivery': '🛵',
  'birthday-anniversary-offers-automation': '🎂',
  // Pillar 3 additions
  'separating-hot-leads-time-wasters': '🎯',
  'new-property-alerts-buyers': '🔔',
  'virtual-tour-scheduling-automation': '🎥',
  'follow-up-sequences-convert': '📈',
  'document-collection-automation': '📄',
  // Pillar 4 additions
  'course-information-whatsapp': '📚',
  'exam-result-notifications': '📝',
  'sharing-study-materials-automatically': '📎',
  // Pillar 5 additions
  'return-exchange-handling-automation': '🔄',
  'new-arrival-alerts-loyal-customers': '🆕',
  'supplier-order-automation': '🚚',
}

const DIMENSIONS = {
  sm: { width: 400, height: 225, fontSize: 40, titleSize: 16 },
  md: { width: 600, height: 338, fontSize: 56, titleSize: 20 },
  lg: { width: 800, height: 450, fontSize: 72, titleSize: 24 },
}

function getTitleLines(title: string, maxChars: number): string[] {
  const words = title.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > maxChars) {
      if (currentLine) lines.push(currentLine.trim())
      currentLine = word
    } else {
      currentLine = currentLine ? currentLine + ' ' + word : word
    }
  }
  if (currentLine) lines.push(currentLine.trim())

  return lines.slice(0, 3)
}

export function getArticleIcon(slug: string): string {
  return THUMBNAIL_ICONS[slug] || '📄'
}

export function ArticleThumbnail({ category, title, size = 'md', className = '' }: ArticleThumbnailProps) {
  const colors = CATEGORY_COLORS[category]
  const dims = DIMENSIONS[size]
  const titleLines = getTitleLines(title, 35)

  const svgContent = `
<svg width="${dims.width}" height="${dims.height}" viewBox="0 0 ${dims.width} ${dims.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${category}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:0.15" />
      <stop offset="50%" style="stop-color:${colors.secondary};stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#0A0A0B;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent-${category}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.primary}" />
      <stop offset="100%" style="stop-color:${colors.secondary}" />
    </linearGradient>
    <radialGradient id="glow-${category}" cx="30%" cy="30%" r="40%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${dims.width}" height="${dims.height}" fill="#0A0A0B" rx="16" />

  <!-- Gradient overlay -->
  <rect width="${dims.width}" height="${dims.height}" fill="url(#bg-${category})" rx="16" />

  <!-- Glow effect -->
  <circle cx="${dims.width * 0.25}" cy="${dims.height * 0.3}" r="${dims.width * 0.2}" fill="url(#glow-${category})" />
  <circle cx="${dims.width * 0.8}" cy="${dims.height * 0.7}" r="${dims.width * 0.15}" fill="url(#glow-${category})" opacity="0.5" />

  <!-- Decorative grid pattern -->
  <g opacity="0.03" stroke="white" stroke-width="0.5">
    <line x1="0" y1="${dims.height * 0.3}" x2="${dims.width}" y2="${dims.height * 0.3}" />
    <line x1="0" y1="${dims.height * 0.6}" x2="${dims.width}" y2="${dims.height * 0.6}" />
    <line x1="${dims.width * 0.3}" y1="0" x2="${dims.width * 0.3}" y2="${dims.height}" />
    <line x1="${dims.width * 0.7}" y1="0" x2="${dims.width * 0.7}" y2="${dims.height}" />
  </g>

  <!-- Category accent line -->
  <rect x="24" y="${dims.height - 8}" width="40" height="3" rx="1.5" fill="url(#accent-${category})" opacity="0.8" />

  <!-- Title text -->
  ${titleLines.map((line, i) => `
    <text x="24" y="${dims.height - 40 + i * (dims.titleSize + 6)}" 
      font-family="Space Grotesk, system-ui, sans-serif" 
      font-weight="700" 
      font-size="${i === 0 ? dims.titleSize : dims.titleSize - 2}" 
      fill="white" 
      opacity="${1 - i * 0.15}">
      ${line.replace(/&/g, '&amp;').replace(/</g, '&lt;')}
    </text>
  `).join('')}

  <!-- Top-right decorative element -->
  <circle cx="${dims.width - 40}" cy="40" r="4" fill="${colors.primary}" opacity="0.6" />
  <circle cx="${dims.width - 56}" cy="40" r="3" fill="${colors.secondary}" opacity="0.4" />
</svg>`

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}10, #0A0A0B)`,
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}

export function ArticleThumbnailStatic({
  category,
  slug,
  className = '',
}: {
  category: ArticleCategory
  slug: string
  className?: string
}) {
  const colors = CATEGORY_COLORS[category]
  const icon = getArticleIcon(slug)

  return (
    <div
      className={`relative overflow-hidden rounded-xl flex items-center justify-center ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colors.primary}25, ${colors.secondary}15, #0A0A0B)`,
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors.primary}30, transparent 60%)`,
        }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(white 1px, transparent 1px),
            linear-gradient(90deg, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Icon */}
      <span className="text-5xl relative z-10" role="img" aria-hidden="true">
        {icon}
      </span>
      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          opacity: 0.6,
        }}
      />
    </div>
  )
}