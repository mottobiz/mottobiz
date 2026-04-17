import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { INDUSTRY_HUBS } from '@/types/article'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function CoachingEducationHub() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.pillar === 'Coaching & Education')
  const otherHubs = INDUSTRY_HUBS.filter(h => h.slug !== 'coaching-education')
    .map(h => ({ name: h.name, slug: `/industries/${h.slug}`, icon: h.icon, color: h.color }))

  return (
    <>
      <SEOHead
        title="Coaching & Education Automation Guide | MottoBiz"
        description="Automate your Surat coaching center or tuition business. 24/7 admission inquiry response, class reminders, fee collection, and student progress updates for tutors across Surat."
        canonicalUrl={`${SITE_URL}/industries/coaching-education`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Coaching & Education"
        icon="📚"
        slug="coaching-education"
        description="Automate coaching center operations in Surat. From 24/7 admission inquiry response to automated class reminders and fee tracking, these guides help tutors in Rander, Vesu, and across Surat."
        color="#F43F5E"
        secondaryColor="#EC4899"
        articles={articles}
        pillar="Coaching & Education"
        canonicalUrl={`${SITE_URL}/industries/coaching-education`}
        metaTitle="Coaching & Education Automation Guide | MottoBiz"
        metaDescription="Automate your Surat coaching center or tuition business."
        relatedHubs={otherHubs}
      />
    </>
  )
}
