import { lazy, Suspense } from 'react'
import { SEOHead } from '@/components/SEOHead'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Pain } from '@/components/Pain'
import { Proof } from '@/components/Proof'
import { Services } from '@/components/Services'
import { HowItWorks } from '@/components/HowItWorks'
import { Qualifier } from '@/components/Qualifier'
import { SocialProof } from '@/components/SocialProof'
import { FAQ } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { Footer } from '@/components/Footer'

const LeadMagnet = lazy(() => import('@/components/LeadMagnet').then(m => ({ default: m.LeadMagnet })))

export function HomePage() {
  return (
    <>
      <SEOHead />
      <main id="main-content">
        <Hero />
        <Pain />
        <Proof />
        <Services />
        <HowItWorks />
        <Qualifier />
        <SocialProof />
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <LeadMagnet />
        </Suspense>
        <FAQ />
        <FinalCTA />
      </main>
    </>
  )
}