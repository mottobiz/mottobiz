import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function AdajanHubPage() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.slug.includes('adajan'))

  return (
    <>
      <SEOHead
        title="Business Automation in Adajan, Surat | MottoBiz"
        description="Automate your Adajan restaurant or retail business. Order management, delivery tracking, and customer automation for food businesses in Adajan, Surat."
        canonicalUrl={`${SITE_URL}/locations/adajan`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Adajan"
        icon="📍"
        slug="adajan"
        description="Automate your Adajan restaurant or retail business. From WhatsApp order automation to delivery tracking, these guides are tailored for Adajan's thriving food and retail scene."
        color="#10B981"
        secondaryColor="#14B8A6"
        articles={articles}
        canonicalUrl={`${SITE_URL}/locations/adajan`}
        metaTitle="Business Automation in Adajan, Surat | MottoBiz"
        metaDescription="Automate your Adajan restaurant or retail business."
        relatedHubs={[
          { name: 'Vesu', slug: '/locations/vesu', icon: '📍', color: '#6366F1' },
          { name: 'Varachha', slug: '/locations/varachha', icon: '📍', color: '#F59E0B' },
          { name: 'Katargam', slug: '/locations/katargam', icon: '📍', color: '#10B981' },
        ]}
      />
    </>
  )
}
