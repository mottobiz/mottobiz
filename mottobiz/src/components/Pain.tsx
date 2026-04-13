import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const pains = [
  { text: 'Manual WhatsApp replies all day', icon: '💬' },
  { text: 'Forgetting follow-ups', icon: '🤦' },
  { text: 'Inconsistent social posting', icon: '📱' },
  { text: 'No customer insights', icon: '📊' },
]

export function Pain() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pain" className="relative py-28 sm:py-40 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.p variants={staggerItem} className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-5">
            Sound Familiar?
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            You're running your business.
            <br />
            <span className="text-white/30">Your business is running you.</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
            Every hour on repetitive tasks is an hour not spent on growth. 
            You don't need more hours — you need a system.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="card p-7 sm:p-8 text-center group"
            >
              <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{pain.icon}</div>
              <p className="text-white/60 text-sm sm:text-base">{pain.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}