import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We map your manual workflows and identify the highest-ROI "Agentic" opportunities specific to your business.',
    detail: 'Free 30-min audit',
  },
  {
    number: '02',
    title: 'Deploy',
    description: 'We build and deploy your custom AI agents. You approve the workflow, we handle every technical detail.',
    detail: '3–6 weeks to launch',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Your agents run 24/7. We manage, monitor, and improve them continuously as your digital workforce.',
    detail: 'Fully Managed Service',
  },
]

// The agenda removes the single biggest barrier to form submission:
// "I don't know what I'm signing up for."
// Once a visitor knows exactly what the 30 minutes look like, clicking feels safe.
const agenda = [
  {
    time: '0–10 min',
    title: 'Workflow Audit',
    desc: 'We review your current manual processes and daily operations to find the hidden time sinks.',
  },
  {
    time: '10–20 min',
    title: 'Opportunity Mapping',
    desc: 'We identify your top 3 automation wins — ranked by how fast you\'ll see ROI.',
  },
  {
    time: '20–25 min',
    title: 'Live Agent Demo',
    desc: 'We show you a working agent demo relevant to your specific industry and use case.',
  },
  {
    time: '25–30 min',
    title: 'Your Roadmap',
    desc: 'You receive a written custom plan with a clear investment estimate. No hidden costs.',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="relative py-16 sm:py-24 lg:py-40 px-6">
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

        {/* 3 Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-3 gap-10 sm:gap-8 mb-24"
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
              <p className="text-white/80 text-base sm:text-lg mb-5 leading-relaxed">{step.description}</p>
              <span className="inline-block px-5 py-2 text-sm font-medium rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                {step.detail}
              </span>

              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-7 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Audit Agenda — removes "what am I signing up for?" anxiety */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-left"
        >
          <motion.div variants={staggerItem} className="text-center mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              What happens in your <span className="text-gradient">30-minute free audit</span>
            </h3>
            <p className="text-white/50 text-base max-w-lg mx-auto">
              No pitch. No sales pressure. Just 30 minutes that give you complete clarity on what's possible.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {agenda.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="card p-6 sm:p-7 flex gap-5"
              >
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="inline-flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-2 py-1.5">
                    <span className="text-[10px] font-bold text-indigo-400 leading-tight">{item.time}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm sm:text-base mb-1.5">{item.title}</h4>
                  <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Walk-away guarantee */}
          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/8"
          >
            <div className="flex items-start gap-4 text-left">
              <div className="text-2xl flex-shrink-0">📋</div>
              <div>
                <p className="text-sm sm:text-base font-semibold text-white mb-1">You walk away with:</p>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
                  A written automation roadmap · ROI estimate for your specific business · Clear next steps — whether you proceed with us or not.
                </p>
              </div>
            </div>
            <a href="#audit" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm flex-shrink-0">
              Book My Audit
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
