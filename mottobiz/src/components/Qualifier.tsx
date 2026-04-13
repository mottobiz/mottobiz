import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const forItems = [
  'Solo or 1-3 person team',
  'WhatsApp + word-of-mouth driven',
  'Want growth without big hires',
  'Clear service or product',
  'Based in Surat/Gujarat',
]

const notForItems = [
  'Large teams with IT/marketing',
  'One-time website, no strategy',
  'Looking for cheap templates',
  'Not ready for retainer model',
]

export function Qualifier() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="who" className="relative py-28 sm:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.p variants={staggerItem} className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-5">
            Is This For You?
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
            We Work With a
            <span className="text-gradient"> Select Few.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-6 sm:gap-8"
        >
          <motion.div variants={staggerItem} className="card p-8 sm:p-10 text-center lg:text-left" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold text-indigo-400 text-lg">This is for you if...</span>
            </div>            
            <ul className="space-y-5">
              {forItems.map((item, i) => (
                <li key={i} className="flex items-center justify-center lg:justify-start gap-4 text-white/70 text-base sm:text-lg">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem} className="card p-8 sm:p-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                  <path d="M2 2l6 6M8 2l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-semibold text-white/50 text-lg">Not for you if...</span>
            </div>
            <ul className="space-y-5">
              {notForItems.map((item, i) => (
                <li key={i} className="flex items-center justify-center lg:justify-start gap-4 text-white/40 text-base sm:text-lg">
                  <span className="w-2 h-2 rounded-full bg-red-400/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}