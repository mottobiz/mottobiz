import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

// Each card maps to a real cost/frustration that a Surat SMB owner feels viscerally
const pains = [
  {
    icon: '💸',
    title: '₹3–5 Lakh Lost Per Hire',
    desc: 'Salary, training, PF, sick leave, notice period — and they still quit in 6 months. Every new hire resets the clock.',
  },
  {
    icon: '🕐',
    title: 'Dead Hours After 6 PM',
    desc: 'Your competitors\' agents are replying to leads at 11pm. Yours are sleeping. Every midnight inquiry that goes unanswered is a deal gifted to someone else.',
  },
  {
    icon: '🔁',
    title: '50+ Daily Interruptions',
    desc: '"Boss, what should I reply?" Context-switching between managing staff and running your business is its own full-time job.',
  },
  {
    icon: '🧠',
    title: 'Zero Business Memory',
    desc: 'Every conversation starts from scratch. Your staff forgets the client\'s history, preferences, and last quote. Your agents never will.',
  },
  {
    icon: '📉',
    title: 'Leaking Revenue You Can\'t See',
    desc: 'Missed follow-ups. Slow responses. Leads that went cold while you were in a meeting. This isn\'t visible on any report — but it\'s happening every day.',
  },
  {
    icon: '⚙️',
    title: 'SaaS Tools That Make YOU Work',
    desc: 'You bought CRMs, scheduling tools, WhatsApp Business. You still do the work — just inside more dashboards. That\'s software. Not agents.',
  },
]

export function Pain() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pain" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-red-400 text-sm font-semibold tracking-wider uppercase mb-5">
            The Real Cost of Doing Nothing
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Manual Operations
            <span className="text-gradient-gold"> Have a Price Tag.</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Every business owner in Surat knows these problems. Most assume it's just part of running a business.
            It isn't. It's a choice — and there's now a better one.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16"
        >
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="card p-7 sm:p-8 group hover:border-red-500/20 transition-colors"
            >
              <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{pain.icon}</div>
              <h3 className="font-display text-base sm:text-lg font-semibold mb-2 text-white">{pain.title}</h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">{pain.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge statement — Contrast + Open Loop to pull them into the next section */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02]"
        >
          <p className="text-white/70 text-lg sm:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
            The question isn't whether you can afford an AI Agent.{' '}
            <span className="text-white font-semibold">It's whether you can afford NOT to have one</span>{' '}
            while your competition deploys theirs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
