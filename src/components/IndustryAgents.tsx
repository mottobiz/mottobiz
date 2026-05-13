import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

// Inspired directly by the workflow transformation tables in the research docs
// Property Management: 14hrs/week → 20 minutes (Greg Isenberg)
// Recruiting: 30 messages manually → 200 overnight (Greg Isenberg)
// These specific "before/after" numbers trigger the Contrast Effect strongly

const industries = [
  {
    name: 'Real Estate & Property',
    outcome: 'Lease Renewals & Tenant Management',
    description: 'Agent pulls payment history, drafts personalised renewal letters, sends DocuSign links, and tracks responses — entirely overnight.',
    before: '14+ hours/week on paperwork',
    after: 'Under 20 minutes to review',
    icon: '🏠',
    color: 'indigo',
  },
  {
    name: 'Recruitment & Staffing',
    outcome: 'Candidate Sourcing & Scheduling',
    description: 'Agent sources candidates, writes personalised outreach for each one, and handles interview scheduling via calendar — while you sleep.',
    before: '30 messages written manually/day',
    after: '200 candidates sourced overnight',
    icon: '🤝',
    color: 'emerald',
  },
  {
    name: 'Retail & E-Commerce',
    outcome: 'Customer Support & Inventory',
    description: 'Agent handles multi-lingual customer queries, tracks inventory levels, triggers restocking alerts, and manages review responses autonomously.',
    before: '60% of day on support tickets',
    after: '24/7 support, zero staff needed',
    icon: '🛍️',
    color: 'amber',
  },
  {
    name: 'Coaching & Education',
    outcome: 'Lead Nurturing & Admissions',
    description: 'Agent follows up with every enquiry 3 times over 5 days, qualifies prospects, answers FAQs, and books admission calls automatically.',
    before: 'Inconsistent follow-up, leads go cold',
    after: '2× admission conversion rate',
    icon: '🎓',
    color: 'indigo',
  },
  {
    name: 'Professional Services',
    outcome: 'Onboarding & Reporting',
    description: 'Agent manages client intake, sends structured onboarding sequences, generates weekly reports, and organises project documentation.',
    before: '2–3 hrs/day on admin & emails',
    after: 'Client runs itself post-kickoff',
    icon: '⚖️',
    color: 'emerald',
  },
  {
    name: 'Food & Hospitality',
    outcome: 'Orders, Menus & Reviews',
    description: 'Agent posts daily menus, confirms orders via WhatsApp, routes complaints to the right person, and follows up for Google reviews.',
    before: '45 mins of manual posting daily',
    after: 'Fully automated + 4.6★ avg rating',
    icon: '🍽️',
    color: 'amber',
  },
]

const colorMap: Record<string, { badge: string; dot: string }> = {
  indigo: { badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300', dot: 'bg-indigo-400' },
  emerald: { badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300', dot: 'bg-emerald-400' },
  amber: { badge: 'bg-amber-500/10 border-amber-500/20 text-amber-300', dot: 'bg-amber-400' },
}

export function IndustryAgents() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="industry-agents" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-5">
            Vertical Agent Solutions
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Agents Built for
            <span className="text-gradient"> Your Exact Workflow.</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Every industry has a workflow that shouldn't need a human. These are the ones we've already mapped and can deploy for you.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((industry, i) => {
            const colors = colorMap[industry.color]
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="card p-7 sm:p-8 flex flex-col gap-5 hover:border-indigo-500/20 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {industry.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white">{industry.name}</h3>
                    <p className={`text-xs font-medium mt-1 ${colors.badge.includes('indigo') ? 'text-indigo-400' : colors.badge.includes('emerald') ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {industry.outcome}
                    </p>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-relaxed">{industry.description}</p>

                {/* Before/After — the Contrast Effect in action */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400/80 w-12 shrink-0">Before</span>
                    <span className="text-xs text-white/40">{industry.before}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 w-12 shrink-0">After</span>
                    <span className="text-xs text-white font-medium">{industry.after}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Open-loop teaser — Zeigarnik Effect: leaves a compelling question unanswered */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 p-8 rounded-3xl bg-white/[0.02] border border-white/8 text-center"
        >
          <p className="text-white/60 text-base sm:text-lg mb-2">
            Don't see your industry? Every manual workflow is automatable.
          </p>
          <p className="text-white font-semibold text-base sm:text-lg">
            In your free audit, we'll map exactly which workflow to automate first for the fastest ROI.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
