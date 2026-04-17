import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

const OTHER_AREAS = ['udhna', 'city-light', 'ring-road', 'nanpura', 'chowk-bazar', 'jahangirabad', 'rander', 'athwa', 'piplod', 'palanpur']

export default function OtherAreasHubPage() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => 
    a.category === 'locations' && OTHER_AREAS.some(area => a.slug.includes(area))
  )

  return (
    <>
      <SEOHead
        title="Business Automation in Surat Areas | MottoBiz"
        description="Automate your business in Udhna, City Light, Ring Road, and other Surat localities. WhatsApp automation and workflow guides for businesses across Surat."
        canonicalUrl={`${SITE_URL}/locations/other`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Other Surat Areas"
        icon="📍"
        slug="other"
        description="Business automation guides for Udhna, City Light, Ring Road, Nanpura, Chowk Bazar, Jahangirabad, Rander, Athwa, Piplod, and other Surat localities."
        color="#6366F1"
        secondaryColor="#F59E0B"
        articles={articles}
        canonicalUrl={`${SITE_URL}/locations/other`}
        metaTitle="Business Automation in Surat Areas | MottoBiz"
        metaDescription="Automate your business in Udhna, City Light, Ring Road, and other Surat areas."
        relatedHubs={[
          { name: 'Vesu', slug: '/locations/vesu', icon: '📍', color: '#6366F1' },
          { name: 'Varachha', slug: '/locations/varachha', icon: '📍', color: '#F59E0B' },
          { name: 'Adajan', slug: '/locations/adajan', icon: '📍', color: '#10B981' },
          { name: 'Katargam', slug: '/locations/katargam', icon: '📍', color: '#8B5CF6' },
        ]}
      />
    </>
  )
}
