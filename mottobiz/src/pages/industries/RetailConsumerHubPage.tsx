import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { INDUSTRY_HUBS } from '@/types/article'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function RetailConsumerHub() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.pillar === 'Retail & Consumer')
  const otherHubs = INDUSTRY_HUBS.filter(h => h.slug !== 'retail')
    .map(h => ({ name: h.name, slug: `/industries/${h.slug}`, icon: h.icon, color: h.color }))

  return (
    <>
      <SEOHead
        title="Retail & Consumer Automation Guide | MottoBiz"
        description="Automate your Surat retail shop or consumer business. WhatsApp product updates, inventory alerts, new arrival announcements, and return handling for shops across Surat."
        canonicalUrl={`${SITE_URL}/industries/retail`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Retail & Consumer"
        icon="🛍️"
        slug="retail"
        description="Automate retail shop operations in Surat. From WhatsApp product availability checks to automated new arrival announcements and return handling, these guides help shops in Ring Road, Jahangirabad, and beyond."
        color="#8B5CF6"
        secondaryColor="#6366F1"
        articles={articles}
        pillar="Retail & Consumer"
        canonicalUrl={`${SITE_URL}/industries/retail`}
        metaTitle="Retail & Consumer Automation Guide | MottoBiz"
        metaDescription="Automate your Surat retail shop or consumer business."
        relatedHubs={otherHubs}
      />
    </>
  )
}
