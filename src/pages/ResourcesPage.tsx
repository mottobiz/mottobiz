import { SEOHead } from '@/components/SEOHead'
import { SITE_URL } from '@/lib/config'
import { ResourcesPage } from '@/components/resources'

export function ResourcesPageWrapper() {
  return (
    <>
      <SEOHead 
        title="Resources | Automation Guides for Surat Businesses"
        description="Practical automation guides for Surat business owners. WhatsApp automation, lead generation, and workflow tips from local experts."
        canonicalUrl={`${SITE_URL}/resources`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <ResourcesPage />
    </>
  )
}
