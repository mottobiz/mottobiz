import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function VarachhaHubPage() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.slug.includes('varachha'))

  return (
    <>
      <SEOHead
        title="Business Automation in Varachha, Surat | MottoBiz"
        description="Automate your Varachha textile or business. WhatsApp order management, website development, and workflow automation for traders in Varachha, Surat."
        canonicalUrl={`${SITE_URL}/locations/varachha`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Varachha"
        icon="📍"
        slug="varachha"
        description="Automate your Varachha business, Surat's textile heartland. From WhatsApp order automation for traders to website development, these guides are built for Varachha's busy market."
        color="#F59E0B"
        secondaryColor="#F97316"
        articles={articles}
        canonicalUrl={`${SITE_URL}/locations/varachha`}
        metaTitle="Business Automation in Varachha, Surat | MottoBiz"
        metaDescription="Automate your Varachha textile business."
        relatedHubs={[
          { name: 'Vesu', slug: '/locations/vesu', icon: '📍', color: '#6366F1' },
          { name: 'Adajan', slug: '/locations/adajan', icon: '📍', color: '#F59E0B' },
          { name: 'Katargam', slug: '/locations/katargam', icon: '📍', color: '#10B981' },
        ]}
      />
    </>
  )
}
