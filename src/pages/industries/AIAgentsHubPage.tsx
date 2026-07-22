import { SEOHead } from '@/components/SEOHead'
import { HubPage } from '@/components/resources/HubPage'
import { INDUSTRY_HUBS } from '@/types/article'
import { ARTICLES, LOCATION_SERVICE_ARTICLES } from '@/data/articles'
import { SITE_URL } from '@/lib/config'

export default function AIAgentsHub() {
  const articles = [...ARTICLES, ...LOCATION_SERVICE_ARTICLES].filter(a => a.pillar === 'AI Agents & Agentic Automation')
  const otherHubs = INDUSTRY_HUBS.filter(h => h.slug !== 'ai-agents')
    .map(h => ({ name: h.name, slug: `/industries/${h.slug}`, icon: h.icon, color: h.color }))

  return (
    <>
      <SEOHead
        title="AI Agents & Automation Guide for Surat Businesses | MottoBiz"
        description="Learn how AI agents and agentic automation can replace employees, handle workflows, and transform your Surat business. Guides on n8n, autonomous follow-ups, and more."
        canonicalUrl={`${SITE_URL}/industries/ai-agents`}
        ogImage={`${SITE_URL}/og-image.png`}
      />
      <HubPage
        name="AI Agents & Agentic Automation"
        icon="🤖"
        slug="ai-agents"
        description="Explore how AI agents and agentic automation can transform your Surat business. From autonomous lead follow-up agents to n8n workflow setups, these guides help you replace manual work with intelligent automation."
        color="#8B5CF6"
        secondaryColor="#6366F1"
        articles={articles}
        pillar="AI Agents & Agentic Automation"
        canonicalUrl={`${SITE_URL}/industries/ai-agents`}
        metaTitle="AI Agents & Automation Guide for Surat Businesses | MottoBiz"
        metaDescription="Learn how AI agents and agentic automation can transform your Surat business."
        relatedHubs={otherHubs}
      />
    </>
  )
}
