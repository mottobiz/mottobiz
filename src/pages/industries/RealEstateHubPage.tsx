import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { INDUSTRY_HUBS } from '@/types/article'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function RealEstateHub() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.pillar === 'Real Estate')
  const otherHubs = INDUSTRY_HUBS.filter(h => h.slug !== 'real-estate')
    .map(h => ({ name: h.name, slug: `/industries/${h.slug}`, icon: h.icon, color: h.color }))

  return (
    <>
      <SEOHead
        title="Real Estate Automation Guide | MottoBiz"
        description="Automate your Surat real estate business. Lead capture, property matching, follow-up sequences, and virtual tour scheduling for agents in Vesu, Parle Point, and across Surat."
        canonicalUrl={`${SITE_URL}/industries/real-estate`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Real Estate"
        icon="🏠"
        slug="real-estate"
        description="Automate real estate lead generation and client management in Surat. From instant lead response to virtual tour scheduling, these guides help agents in Vesu, Udhna, and beyond."
        color="#10B981"
        secondaryColor="#14B8A6"
        articles={articles}
        pillar="Real Estate"
        canonicalUrl={`${SITE_URL}/industries/real-estate`}
        metaTitle="Real Estate Automation Guide | MottoBiz"
        metaDescription="Automate your Surat real estate business."
        relatedHubs={otherHubs}
      />
    </>
  )
}
