import './index.css'
import { SEOHead } from './components/SEOHead'
import { CustomCursor, AnimatedBackground } from './components/effects'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Pain } from './components/Pain'
import { Proof } from './components/Proof'
import { Services } from './components/Services'
import { HowItWorks } from './components/HowItWorks'
import { Qualifier } from './components/Qualifier'
import { SocialProof } from './components/SocialProof'
import { LeadMagnet } from './components/LeadMagnet'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <SEOHead />
      <CustomCursor />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />
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
        <Footer />
      </div>
    </>
  )
}

export default App
