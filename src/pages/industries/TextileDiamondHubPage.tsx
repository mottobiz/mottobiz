import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { INDUSTRY_HUBS } from '@/types/article'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function TextileDiamondHub() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.pillar === 'Textile & Diamond')
  const otherHubs = INDUSTRY_HUBS.filter(h => h.slug !== 'textile-diamond')
    .map(h => ({ name: h.name, slug: `/industries/${h.slug}`, icon: h.icon, color: h.color }))

  return (
    <>
      <SEOHead
        title={`Textile & Diamond Automation Guide | MottoBiz`}
        description={`Automate your Surat textile or diamond business. WhatsApp automation, bulk order management, CRM integration, and lead capture guides for traders in Varachha, Katargam, and across Surat.`}
        canonicalUrl={`${SITE_URL}/industries/textile-diamond`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Textile & Diamond"
        icon="🧵"
        slug="textile-diamond"
        description="Automate textile traders and diamond merchants in Surat. From bulk order management to CRM integration, these guides help you run your shop more efficiently."
        color="#6366F1"
        secondaryColor="#A855F7"
        articles={articles}
        pillar="Textile & Diamond"
        canonicalUrl={`${SITE_URL}/industries/textile-diamond`}
        metaTitle={`Textile & Diamond Automation Guide | MottoBiz`}
        metaDescription={`Automate your Surat textile or diamond business.`}
        relatedHubs={otherHubs}
      />
    </>
  )
}
