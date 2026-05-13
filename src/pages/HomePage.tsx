import { lazy, Suspense } from 'react'
import { SEOHead } from '@/components/SEOHead'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Pain } from '@/components/Pain'
import { AgentVsHuman } from '@/components/AgentVsHuman'
import { Proof } from '@/components/Proof'
import { Services } from '@/components/Services'
import { AgentDemo } from '@/components/AgentDemo'
import { IndustryAgents } from '@/components/IndustryAgents'
import { TechStack } from '@/components/TechStack'
import { HowItWorks } from '@/components/HowItWorks'
import { Qualifier } from '@/components/Qualifier'
import { SocialProof } from '@/components/SocialProof'
import { FAQ } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { Footer } from '@/components/Footer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { StickyBar } from '@/components/StickyBar'

const LeadMagnet = lazy(() => import('@/components/LeadMagnet').then(m => ({ default: m.LeadMagnet })))

export function HomePage() {
  return (
    <>
      <SEOHead />

      {/* Fixed / floating UI — outside the document flow */}
      <FloatingWhatsApp />
      <StickyBar />

      <main id="main-content">
        {/* 1. Attention — grab & hook */}
        <Hero />

        {/* 2. Problem agitation — make the cost of inaction visceral */}
        <Pain />

        {/* 3. Intellectual contrast — Human vs Agent comparison table */}
        <AgentVsHuman />

        {/* 4. Authority — "We run on our own agents" */}
        <Proof />

        {/* 5. Interest — What we specifically build */}
        <Services />

        {/* 6. Desire — Watch a real agent in action */}
        <AgentDemo />

        {/* 7. Industry vertical use cases with before/after */}
        <IndustryAgents />

        {/* 8. Trust signal — enterprise tools powering the agents */}
        <TechStack />

        {/* 9. Anxiety reducer — exactly how it works + audit agenda */}
        <HowItWorks />

        {/* 10. Exclusivity + identification */}
        <Qualifier />

        {/* 11. Peer validation — specific before/after results */}
        <SocialProof />

        {/* 12. Action — the lead magnet form */}
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <LeadMagnet />
        </Suspense>

        {/* 13. Final objection removal */}
        <FAQ />

        {/* 14. Last-chance urgency CTA */}
        <FinalCTA />
      </main>
    </>
  )
}
