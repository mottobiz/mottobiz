import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const testimonials = [
  {
    name: 'Rohit M.',
    business: 'Interior Design, Adajan',
    quote: 'Before MottoBiz, I replied to WhatsApp at midnight. Now I wake up to booked consultations.',
  },
  {
    name: 'Priya S.',
    business: 'Tiffin Service, Vesu',
    quote: 'My website captures orders and posts my daily menu automatically. Game changer.',
  },
  {
    name: 'Kiran D.',
    business: 'Coaching Institute, Ring Road',
    quote: 'Lead follow-up automation doubled our conversion rate in the first month.',
  },
]

export function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.p variants={staggerItem} className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-5">
            Results
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
            Surat Businesses,
            <span className="text-gradient"> Transformed.</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={staggerItem} className="text-center" animate={inView ? 'visible' : 'hidden'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="card p-10 sm:p-14 lg:p-16 mb-10"
            >
              <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl italic leading-relaxed mb-10 text-white/90">
                "{testimonials[active].quote}"
              </blockquote>
              
              <div>
                <p className="font-semibold text-white text-lg" style={{ color: '#ffffff' }}>{testimonials[active].name}</p>
                <p className="text-base text-white/80 mt-2" style={{ color: 'rgba(255,255,255,0.8)' }}>{testimonials[active].business}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: active === i ? 32 : 10,
                  height: 10,
                  background: active === i ? '#6366f1' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}