import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function KatargamHubPage() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.slug.includes('katargam'))

  return (
    <>
      <SEOHead
        title="Business Automation in Katargam, Surat | MottoBiz"
        description="Automate your Katargam textile or restaurant business. WhatsApp automation, website development, and workflow tools for businesses in Katargam, Surat."
        canonicalUrl={`${SITE_URL}/locations/katargam`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Katargam"
        icon="📍"
        slug="katargam"
        description="Automate your Katargam business, home to Surat's diamond cutting and textile industries. From WhatsApp order management to website development, these guides help Katargam businesses scale."
        color="#8B5CF6"
        secondaryColor="#6366F1"
        articles={articles}
        canonicalUrl={`${SITE_URL}/locations/katargam`}
        metaTitle="Business Automation in Katargam, Surat | MottoBiz"
        metaDescription="Automate your Katargam textile or restaurant business."
        relatedHubs={[
          { name: 'Vesu', slug: '/locations/vesu', icon: '📍', color: '#6366F1' },
          { name: 'Varachha', slug: '/locations/varachha', icon: '📍', color: '#F59E0B' },
          { name: 'Adajan', slug: '/locations/adajan', icon: '📍', color: '#10B981' },
        ]}
      />
    </>
  )
}
