import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your business and identify automation opportunities.',
    detail: 'Free 30-min audit',
  },
  {
    number: '02',
    title: 'Build',
    description: 'We design and build your complete automation system.',
    detail: '3-6 weeks to launch',
  },
  {
    number: '03',
    title: 'Run',
    description: 'We manage everything. After one year, handover is optional.',
    detail: 'No lock-in',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="relative py-28 sm:py-40 px-6">
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
            How It Works
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Simple.<span className="text-gradient"> Structured.</span> Yours.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-3 gap-10 sm:gap-8"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="relative text-center"
            >
              <div className="number-badge mx-auto mb-7">{step.number}</div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-white/50 text-base sm:text-lg mb-5 leading-relaxed">{step.description}</p>
              <span className="inline-block px-5 py-2 text-sm font-medium rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                {step.detail}
              </span>

              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-7 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}