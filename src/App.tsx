import './index.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SEOHead } from './components/SEOHead'
import { CustomCursor, AnimatedBackground } from './components/effects'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ErrorBoundary } from './components/ErrorBoundary'

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const ResourcesPageWrapper = lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPageWrapper })))
const ArticlePage = lazy(() => import('./pages/ArticlePage').then(m => ({ default: m.ArticlePage })))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })))
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })))
const TextileDiamondHub = lazy(() => import('./pages/industries/TextileDiamondHubPage'))
const CoachingEducationHub = lazy(() => import('./pages/industries/CoachingEducationHubPage'))
const RealEstateHub = lazy(() => import('./pages/industries/RealEstateHubPage'))
const RestaurantFoodHub = lazy(() => import('./pages/industries/RestaurantFoodHubPage'))
const RetailConsumerHub = lazy(() => import('./pages/industries/RetailConsumerHubPage'))
const VarachhaHub = lazy(() => import('./pages/locations/VarachhaHubPage'))
const KatargamHub = lazy(() => import('./pages/locations/KatargamHubPage'))
const VesuHub = lazy(() => import('./pages/locations/VesuHubPage'))
const AdajanHub = lazy(() => import('./pages/locations/AdajanHubPage'))
const OtherAreasHub = lazy(() => import('./pages/locations/OtherAreasHubPage'))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-white/40 text-sm font-body">Loading...</span>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <SEOHead />
      <CustomCursor />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resources" element={<ResourcesPageWrapper />} />
              <Route path="/resources/:slug" element={<ArticlePage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/industries/textile-diamond" element={<TextileDiamondHub />} />
              <Route path="/industries/coaching-education" element={<CoachingEducationHub />} />
              <Route path="/industries/real-estate" element={<RealEstateHub />} />
              <Route path="/industries/restaurant-food" element={<RestaurantFoodHub />} />
              <Route path="/industries/retail" element={<RetailConsumerHub />} />
              <Route path="/locations/varachha" element={<VarachhaHub />} />
              <Route path="/locations/katargam" element={<KatargamHub />} />
              <Route path="/locations/vesu" element={<VesuHub />} />
              <Route path="/locations/adajan" element={<AdajanHub />} />
              <Route path="/locations/other" element={<OtherAreasHub />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  )
}

export default App