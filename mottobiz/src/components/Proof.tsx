import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const proofItems = [
  {
    title: 'Lead Follow-Up',
    desc: 'Instant WhatsApp replies + 3-day nurture sequence.',
    icon: '💬',
  },
  {
    title: 'Content Automation',
    desc: 'Social posts researched, written, and scheduled.',
    icon: '📱',
  },
  {
    title: 'Smart Inbox',
    desc: 'Queries categorized and routed automatically.',
    icon: '🧠',
  },
  {
    title: 'Analytics Dashboard',
    desc: 'Know what drives revenue and where to focus.',
    icon: '📊',
  },
]

export function Proof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proof" className="relative py-28 sm:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.p variants={staggerItem} className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-5">
            Built for Ourselves First
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            What We Run On.
            <span className="text-gradient"> Built for You.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {proofItems.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="card p-7 sm:p-8 text-center group"
            >
              <div className="text-4xl sm:text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="font-display text-base sm:text-lg font-semibold mb-3 text-white">{item.title}</h3>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}