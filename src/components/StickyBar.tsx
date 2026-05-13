import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function StickyBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('mottobiz_bar_dismissed')) {
      setDismissed(true)
      return
    }

    const onScroll = () => {
      // Appear once the user has scrolled past the hero (~500px)
      setVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('mottobiz_bar_dismissed', '1')
  }

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          // Positioned above the WhatsApp bubble (bottom-6 = 24px + 56px button + 16px gap)
          className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 px-4 w-full max-w-sm sm:max-w-md"
        >
          <div
            className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 shadow-2xl"
            style={{
              background: 'rgba(10, 10, 25, 0.92)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
            }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs sm:text-sm text-white/70 truncate">
                <span className="text-amber-400 font-semibold">2 spots left</span> for May — agents deploy in 3–4 weeks
              </span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="#audit"
                onClick={() => setVisible(false)}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'rgba(99,102,241,0.85)', border: '1px solid rgba(99,102,241,0.4)' }}
              >
                Claim Slot
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              <button
                onClick={dismiss}
                className="flex h-6 w-6 items-center justify-center rounded-full text-white/35 transition-colors hover:text-white/70"
                aria-label="Dismiss"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
