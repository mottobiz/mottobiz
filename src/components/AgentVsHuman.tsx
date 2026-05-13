import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const rows = [
  { criteria: 'Monthly Cost',        human: '₹25,000 – 45,000+',   agent: 'Fraction of that',        agentWins: true },
  { criteria: 'Working Hours',       human: '8 hrs/day, 5 days',    agent: '24 hours, 7 days, 365',   agentWins: true },
  { criteria: 'Customer Memory',     human: 'Forgets context',       agent: 'Remembers everything',    agentWins: true },
  { criteria: 'Sick Days',           human: '12+ days per year',     agent: 'Zero. Ever.',             agentWins: true },
  { criteria: 'Training Period',     human: '2–3 months to ramp up', agent: 'One-time setup',          agentWins: true },
  { criteria: 'Consistency',         human: 'Varies by mood & day',  agent: 'Always at 100%',          agentWins: true },
  { criteria: 'Avg. Response Time',  human: 'Minutes to hours',      agent: 'Under 3 seconds',         agentWins: true },
  { criteria: 'Scales With Growth',  human: 'Hire more staff',       agent: 'One click to expand',     agentWins: true },
  { criteria: 'Notice Period Drama', human: '1–3 months + handover', agent: 'Doesn\'t happen',         agentWins: true },
  { criteria: 'Learns Over Time',    human: 'Yes, then leaves',      agent: 'Yes, and the memory stays',agentWins: true },
]

export function AgentVsHuman() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="comparison" className="relative py-16 sm:py-24 lg:py-40 px-6">
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
            Side by Side
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            The Employee You Wanted.
            <span className="text-gradient"> Minus Everything You Didn't.</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto">
            A direct comparison — no spin, no fluff. Just the math that makes every business owner rethink their next hire.
          </motion.p>
        </motion.div>

        {/* Table — desktop */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/[0.04] border-b border-white/10">
            <div className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40" />
            <div className="px-6 py-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400/80">Traditional Employee</span>
            </div>
            <div className="px-6 py-4 text-center bg-indigo-500/5 border-l border-indigo-500/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">MottoBiz AI Agent</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.015] ${
                i % 2 === 0 ? '' : 'bg-white/[0.01]'
              }`}
            >
              <div className="px-6 py-4 text-sm text-white/60 font-medium flex items-center">
                {row.criteria}
              </div>
              <div className="px-6 py-4 text-sm text-white/45 flex items-center justify-center text-center">
                {row.human}
              </div>
              <div className="px-6 py-4 bg-indigo-500/[0.04] border-l border-indigo-500/10 flex items-center justify-center gap-2 text-center">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-white font-medium">{row.agent}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom quote — the "Business Hours are for Humans" insight from Greg Isenberg */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-12 p-8 rounded-2xl bg-indigo-500/5 border border-indigo-500/15 text-center"
        >
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-3">
            "Business hours are for humans. Your agent closed a deal in Tokyo at 3am, processed the payment,
            sent the onboarding WhatsApp, and updated your CRM before your alarm went off."
          </p>
          <p className="text-indigo-400 text-sm font-medium">— That's not automation. That's a Digital Employee.</p>
        </motion.div>
      </div>
    </section>
  )
}
