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
    <section id="pain" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.p variants={staggerItem} className="text-white/90 text-2xl sm:text-3xl lg:text-4xl font-semibold mb-16">
            Still doing everything manually?
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
              <p className="text-white/80 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.85)' }}>{pain.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}