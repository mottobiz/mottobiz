import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

// Qualifier uses Mimetic Desire + Scarcity + Commitment & Consistency
// "This is not for everyone" is more powerful than "This is for everyone"
// Exclusivity raises perceived value. Identification creates desire.

const forItems = [
  { icon: '✓', text: 'Solo operator or 1–5 person team spending hours on repetitive tasks' },
  { icon: '✓', text: 'Business generating consistent revenue but can\'t scale without hiring more people' },
  { icon: '✓', text: 'Losing leads every week because follow-up is inconsistent or slow' },
  { icon: '✓', text: 'Ready to invest in a system — not just another tool you manage yourself' },
  { icon: '✓', text: 'Based in Surat or Gujarat and serious about growth in the next 12 months' },
]

const notForItems = [
  { text: 'Businesses that want the cheapest option, not the right one' },
  { text: 'Those not ready for a managed retainer model' },
  { text: 'Teams with large in-house IT or marketing departments' },
  { text: 'Anyone looking for a one-time website with no strategy' },
]

export function Qualifier() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="who" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-5">
            Not For Everyone
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            We Work With a
            <span className="text-gradient"> Deliberate Few.</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            We take on 5–8 clients at a time — by design. Every agent we deploy gets our full attention.
            This exclusivity is what makes results possible.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12"
        >
          {/* For You — Identification triggers */}
          <motion.div
            variants={staggerItem}
            className="card p-8 sm:p-10 border-indigo-500/20"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold text-indigo-400 text-lg">This was built for you if...</span>
            </div>
            <ul className="space-y-4">
              {forItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5 4-4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-white/80 text-sm sm:text-base leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not For You — Scarcity + exclusivity signals high value */}
          <motion.div variants={staggerItem} className="card p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                  <path d="M2 2l6 6M8 2l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-semibold text-white/70 text-lg">Not the right fit if...</span>
            </div>
            <ul className="space-y-4">
              {notForItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M3 3l4 4M7 3l-4 4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span className="text-white/50 text-sm sm:text-base leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Commitment bridge — foot-in-door technique */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <p className="text-white/60 text-base sm:text-lg mb-6">
            If you nodded at even 3 of those — the next step costs you nothing but 30 minutes.
          </p>
          <a href="#audit" className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 text-base">
            Check If You Qualify
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
