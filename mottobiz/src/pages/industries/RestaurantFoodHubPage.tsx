import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { INDUSTRY_HUBS } from '@/types/article'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function RestaurantFoodHub() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.pillar === 'Restaurants & Food')
  const otherHubs = INDUSTRY_HUBS.filter(h => h.slug !== 'restaurant-food')
    .map(h => ({ name: h.name, slug: `/industries/${h.slug}`, icon: h.icon, color: h.color }))

  return (
    <>
      <SEOHead
        title="Restaurant & Food Automation Guide | MottoBiz"
        description="Automate your Surat restaurant or food business. Order management, reservation systems, delivery tracking, and review automation for restaurants in Adajan, Vesu, and across Surat."
        canonicalUrl={`${SITE_URL}/industries/restaurant-food`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="Restaurants & Food"
        icon="🍽️"
        slug="restaurant-food"
        description="Automate restaurant operations in Surat. From WhatsApp ordering to automated delivery updates and review requests, these guides help restaurants in Adajan, Katargam, and beyond."
        color="#F59E0B"
        secondaryColor="#F97316"
        articles={articles}
        pillar="Restaurants & Food"
        canonicalUrl={`${SITE_URL}/industries/restaurant-food`}
        metaTitle="Restaurant & Food Automation Guide | MottoBiz"
        metaDescription="Automate your Surat restaurant or food business."
        relatedHubs={otherHubs}
      />
    </>
  )
}
