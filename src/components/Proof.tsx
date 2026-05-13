import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

// The "Proof" section uses the Pratfall Effect + Authority Bias:
// We openly admit MottoBiz itself is run by agents — which is the most honest and
// powerful proof that the system works. It's not theory. It's our own reality.
const ownAgents = [
  {
    icon: '🔔',
    title: 'Lead Capture Agent',
    result: 'Every audit request from this website is automatically captured, tagged, and followed up via WhatsApp — without us touching a single message.',
  },
  {
    icon: '✍️',
    title: 'Content Creation Agent',
    result: 'Our social posts — research, copy, formatting, scheduling — handled autonomously. We haven\'t manually written a routine post in months.',
  },
  {
    icon: '🗂️',
    title: 'Client Onboarding Agent',
    result: 'New clients get a structured welcome sequence, scoping questionnaire, and kickoff calendar invite — triggered the moment they sign. Zero manual steps.',
  },
  {
    icon: '📊',
    title: 'Reporting Agent',
    result: 'Weekly performance reports are auto-generated from our client dashboards and sent directly to the right person. No one compiles a spreadsheet.',
  },
]

export function Proof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proof" className="relative py-16 sm:py-24 lg:py-40 px-6">
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
            We Practice What We Deploy
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            MottoBiz Runs on
            <span className="text-gradient"> Its Own Agents.</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Before we deploy a single agent for a client, we battle-tested every system on our own business.
            What you're looking at right now is proof the system works.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 gap-6"
        >
          {ownAgents.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="card p-8 sm:p-9 group hover:border-amber-500/20 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">{item.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Authority bridge — "Moat = workflow intelligence" from research */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed">
            The code is a commodity. Knowing exactly <span className="text-white/70">which workflow to automate first</span>{' '}
            to unlock the fastest ROI for your business type — that's the expertise.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
