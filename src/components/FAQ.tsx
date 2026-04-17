import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as Accordion from '@radix-ui/react-accordion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const faqs = [
  { q: 'How much does this cost?', a: 'Retainer model — monthly fee covering management and updates. Exact quote after your free audit.' },
  { q: 'Will I be stuck depending on you?', a: 'No. After one year, handover is optional. We document everything and train you.' },
  { q: 'I\'m not technical. Will this work?', a: 'Built for non-technical owners. You don\'t touch the tech — we run it entirely.' },
  { q: 'Hindi or Gujarati support?', a: 'Yes. All communication, calls, and docs available in Hindi or Gujarati.' },
  { q: 'What happens after year one?', a: 'Continue on retainer, take full ownership, or upgrade. No lock-in.' },
  { q: 'How long to see results?', a: 'Lead automation: 2-4 weeks. Full system: 60-90 days.' },
  { q: 'Need a website already?', a: 'No. We build it. If you have one, we\'ll evaluate and improve or rebuild.' },
  { q: 'How many clients do you take?', a: '5-8 active clients max. Quality over quantity.' },
]

export function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.p variants={staggerItem} className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-5">
            FAQ
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
            Honest Answers to
            <span className="text-white/50"> Real Questions.</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={staggerItem} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <Accordion.Item key={i} value={`item-${i}`} className="card overflow-hidden">
                <Accordion.Trigger className="w-full flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 text-left group">
                  <span className="font-medium text-white/90 text-base sm:text-lg pr-4">{faq.q}</span>
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center"
                  >
                    <svg width="14" height="14" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-data-[state=open]:rotate-45"
                    >
                      <path d="M5 1v8M1 5h8" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
                >
                  <p className="px-6 sm:px-8 pb-5 sm:pb-6 text-white/80 text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{faq.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  )
}