import { SEOHead } from '@/components/SEOHead'
import { ResourcesPage } from '@/components/resources'

export function ResourcesPageWrapper() {
  return (
    <>
      <SEOHead 
        title="Resources | Automation Guides for Surat Businesses"
        description="Practical automation guides for Surat business owners. WhatsApp automation, lead generation, and workflow tips from local experts."
        canonicalUrl="https://mottobiz.com/resources"
      />
      <ResourcesPage />
    </>
  )
}
