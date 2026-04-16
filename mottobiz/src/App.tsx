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
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  )
}

export default App