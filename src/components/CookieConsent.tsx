import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'cookie-consent'

type ConsentValue = 'accepted' | 'rejected' | null

function getStoredConsent(): ConsentValue {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted' || stored === 'rejected') return stored
  } catch {
    // localStorage unavailable
  }
  return null
}

function setStoredConsent(value: 'accepted' | 'rejected') {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // silent fail
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setConsent(getStoredConsent())
    setReady(true)
  }, [])

  const handleAccept = () => {
    setStoredConsent('accepted')
    setConsent('accepted')
  }

  const handleReject = () => {
    setStoredConsent('rejected')
    setConsent('rejected')
  }

  return (
    <AnimatePresence>
      {ready && consent === null && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div
            className={cn(
              'mx-auto max-w-3xl',
              'rounded-2xl border border-white/10',
              'bg-[#0a0a0a]/95 backdrop-blur-xl',
              'shadow-2xl shadow-black/50',
              'p-5 sm:p-6'
            )}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 leading-relaxed">
                  We use cookies and similar technologies to improve your experience.{' '}
                  By clicking <span className="text-white font-medium">'Accept All'</span>, you consent
                  to our use of cookies.{' '}
                  <Link
                    to="/privacy"
                    className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                  >
                    Learn more
                  </Link>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleReject}
                  className={cn(
                    'px-5 py-2.5 rounded-xl text-sm font-medium',
                    'border border-white/10 text-white/60',
                    'hover:bg-white/5 hover:text-white/80',
                    'transition-all duration-200'
                  )}
                >
                  Reject All
                </button>
                <button
                  onClick={handleAccept}
                  className={cn(
                    'px-5 py-2.5 rounded-xl text-sm font-semibold',
                    'bg-indigo-500 text-white',
                    'hover:bg-indigo-400',
                    'shadow-lg shadow-indigo-500/25',
                    'transition-all duration-200'
                  )}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
