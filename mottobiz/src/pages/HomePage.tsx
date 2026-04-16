import { SEOHead } from '@/components/SEOHead'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Pain } from '@/components/Pain'
import { Proof } from '@/components/Proof'
import { Services } from '@/components/Services'
import { HowItWorks } from '@/components/HowItWorks'
import { Qualifier } from '@/components/Qualifier'
import { SocialProof } from '@/components/SocialProof'
import { LeadMagnet } from '@/components/LeadMagnet'
import { FAQ } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { Footer } from '@/components/Footer'

export function HomePage() {
  return (
    <>
      <SEOHead />
      <main>
        <Hero />
        <Pain />
        <Proof />
        <Services />
        <HowItWorks />
        <Qualifier />
        <SocialProof />
        <LeadMagnet />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  )
}
