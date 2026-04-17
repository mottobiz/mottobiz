import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function VesuHubPage() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.slug.includes('vesu'))

  return (
    <>
      <SEOHead
        title="Business Automation in Vesu, Surat | MottoBiz"
        description="Automate your Vesu business. WhatsApp automation, real estate lead management, and coaching center management for businesses in Vesu, Surat."
        canonicalUrl={`${SITE_URL}/locations/vesu`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Vesu"
        icon="📍"
        slug="vesu"
        description="Automate your business in Vesu, Surat's fastest-growing commercial area. From real estate lead management to coaching center automation, these guides are tailored for Vesu businesses."
        color="#6366F1"
        secondaryColor="#A855F7"
        articles={articles}
        canonicalUrl={`${SITE_URL}/locations/vesu`}
        metaTitle="Business Automation in Vesu, Surat | MottoBiz"
        metaDescription="Automate your Vesu business."
        relatedHubs={[
          { name: 'Varachha', slug: '/locations/varachha', icon: '📍', color: '#6366F1' },
          { name: 'Adajan', slug: '/locations/adajan', icon: '📍', color: '#F59E0B' },
          { name: 'Katargam', slug: '/locations/katargam', icon: '📍', color: '#10B981' },
        ]}
      />
    </>
  )
}
