import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

// Metrics strip — Availability Heuristic: specific numbers feel real and recalled easily
const metrics = [
  { value: '₹0', label: 'Average cost of a missed follow-up', sub: 'after agent deployment' },
  { value: '< 3s', label: 'Agent response time', sub: 'vs. 4–6 hrs manual avg.' },
  { value: '100%', label: 'Follow-up rate', sub: 'no lead ever falls through' },
]

// Testimonials with specific before/after outcomes — Contrast Effect + Availability Heuristic
// Vague quotes don't convert. Specific transformations do.
const testimonials = [
  {
    name: 'Rohit M.',
    business: 'Interior Design Studio, Adajan',
    quote: 'I used to lose half my leads just because I couldn\'t reply fast enough after hours. Now my agent books consultations while I sleep. Last week — 4 consultations booked on a Sunday.',
    beforeAfter: { before: '12+ unanswered enquiries/week', after: '0 missed, 4 booked on autopilot' },
  },
  {
    name: 'Priya S.',
    business: 'Cloud Kitchen & Tiffin Service, Vesu',
    quote: 'My social media, daily menu posts, order confirmations — all automated. I haven\'t manually posted since onboarding. My Google reviews went from 3.8 to 4.6 in 60 days.',
    beforeAfter: { before: '1 hr/day on manual posting + zero reviews system', after: 'Fully automated, 4.6 rating in 60 days' },
  },
  {
    name: 'Kiran D.',
    business: 'Coaching Institute, Ring Road',
    quote: 'We had leads coming in but nobody was systematically following up. The agent now follows up 3 times over 5 days with personalised messages. Our admission conversion doubled in the first month.',
    beforeAfter: { before: '22% lead-to-admission conversion', after: '46% conversion — first month post-deployment' },
  },
]

export function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-5">
            Real Results
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Surat Businesses,
            <span className="text-gradient"> Before & After.</span>
          </motion.h2>
        </motion.div>

        {/* Metrics Strip */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="card p-5 sm:p-6 text-center"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{m.value}</div>
              <div className="text-xs sm:text-sm text-white/60 mb-1">{m.label}</div>
              <div className="text-[10px] sm:text-xs text-emerald-400/80">{m.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="card p-8 sm:p-12 mb-8"
            >
              {/* Before/After Strip — Contrast Effect */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/5 border border-red-500/15">
                  <span className="text-red-400 text-xs font-bold uppercase tracking-wider mt-0.5 shrink-0">Before</span>
                  <span className="text-white/55 text-sm">{testimonials[active].beforeAfter.before}</span>
                </div>
                <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mt-0.5 shrink-0">After</span>
                  <span className="text-white/80 text-sm font-medium">{testimonials[active].beforeAfter.after}</span>
                </div>
              </div>

              <blockquote className="text-lg sm:text-xl lg:text-2xl italic leading-relaxed mb-8 text-white/85">
                "{testimonials[active].quote}"
              </blockquote>

              <div>
                <p className="font-semibold text-white">{testimonials[active].name}</p>
                <p className="text-sm text-white/55 mt-1">{testimonials[active].business}</p>
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
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
