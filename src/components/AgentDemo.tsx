import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

// A real-feeling WhatsApp conversation demonstrating 4 core agent capabilities:
// 1. Instant reply (⚡) — replies at 9:47 PM in under 2 seconds
// 2. Memory (🧠) — remembers a previous enquiry from a month ago
// 3. Auto-scheduling (📅) — books the appointment without any human
// 4. Autonomous follow-up (🔄) — sends a reminder next morning unprompted
// This is the most powerful objection-destroyer on the page.

type MessageFrom = 'customer' | 'agent' | 'system'
type LabelColor = 'emerald' | 'indigo' | 'amber'

interface Message {
  id: number
  from: MessageFrom
  text: string
  time: string
  label?: string
  labelColor?: LabelColor
}

const messages: Message[] = [
  {
    id: 1,
    from: 'customer',
    text: 'Hi, saw your Instagram. Interested in interior design for my 3BHK in Adajan. What are your rates?',
    time: '9:47 PM',
  },
  {
    id: 2,
    from: 'agent',
    text: 'Hi Priya! We specialise in 3BHK interiors across Surat. Packages from ₹4.5L for full-home design + execution.\n\nWant to see our recent Adajan projects? I can also check if we have a site-visit slot this week!',
    time: '9:47 PM',
    label: '⚡ Replied in 2 seconds',
    labelColor: 'emerald',
  },
  {
    id: 3,
    from: 'customer',
    text: "Yes please! What's the earliest slot for a visit?",
    time: '9:49 PM',
  },
  {
    id: 4,
    from: 'agent',
    text: "Next available: Saturday 11 AM or Sunday 4 PM.\n\nAlso — you messaged us last month about a 2BHK. I've noted your preference for modern-minimal style and will ask our designer to bring relevant samples for your 3BHK too!",
    time: '9:49 PM',
    label: '🧠 Remembered your previous enquiry',
    labelColor: 'indigo',
  },
  {
    id: 5,
    from: 'customer',
    text: 'Saturday 11 AM works perfectly!',
    time: '9:51 PM',
  },
  {
    id: 6,
    from: 'agent',
    text: "Confirmed! Site visit booked: Saturday, 11 AM, Adajan.\nOur designer Amit will call 30 mins before arrival.\n\nSee you Saturday! 🏠",
    time: '9:51 PM',
    label: '📅 Appointment booked automatically',
    labelColor: 'emerald',
  },
  {
    id: 7,
    from: 'system',
    text: '📩 Saturday 8:30 AM — Automated reminder sent to Priya ✓',
    time: 'Next morning',
    label: '🔄 Follow-up sent without any human input',
    labelColor: 'amber',
  },
]

const capabilities = [
  { icon: '⚡', label: 'Instant Response', sub: 'Under 3 seconds' },
  { icon: '🧠', label: 'Business Memory', sub: 'Recalls every past chat' },
  { icon: '📅', label: 'Auto-Scheduling', sub: 'No human clicks needed' },
  { icon: '🔄', label: 'Autonomous Follow-up', sub: 'Set once, runs forever' },
]

const labelStyles: Record<LabelColor, string> = {
  emerald: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-300',
  indigo: 'bg-indigo-500/15 border-indigo-500/25 text-indigo-300',
  amber: 'bg-amber-500/15 border-amber-500/25 text-amber-300',
}

export function AgentDemo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [revealedCount, setRevealedCount] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!inView) return
    messages.forEach((_, i) => {
      setTimeout(() => {
        setRevealedCount(i + 1)
        if (i === messages.length - 1) setCompleted(true)
      }, i * 750)
    })
  }, [inView])

  const replay = () => {
    setRevealedCount(0)
    setCompleted(false)
    // Small gap before re-triggering so the wipe is visible
    setTimeout(() => {
      messages.forEach((_, i) => {
        setTimeout(() => {
          setRevealedCount(i + 1)
          if (i === messages.length - 1) setCompleted(true)
        }, i * 750)
      })
    }, 200)
  }

  return (
    <section id="agent-demo" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-5">
            Agent in Action
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Your Agent Doesn't Sleep.
            <span className="text-gradient"> Your Leads Don't Wait.</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A real enquiry arrives at 9:47 PM. You're asleep. Watch exactly what your agent does — without you lifting a finger.
          </motion.p>
        </motion.div>

        {/* Status Bar — Business owner context */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white/50">
            <span>🔕</span>
            <span>Business owner: <strong className="text-white/70">Do Not Disturb — 9:45 PM</strong></span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-medium">MottoBiz Agent: Active 24/7</span>
          </div>
        </motion.div>

        {/* Chat Widget */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10"
          style={{ background: 'rgba(8, 8, 20, 0.7)', backdropFilter: 'blur(20px)' }}
        >
          {/* WhatsApp-style header */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b border-white/10"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              ID
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#080814]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">Interior Design Studio</p>
              <p className="text-xs text-emerald-400 mt-0.5">Agent active · replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="px-4 py-5 space-y-4 min-h-[340px]">
            {messages.map((msg, i) => {
              if (i >= revealedCount) return null

              if (msg.from === 'system') {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    {msg.label && (
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${labelStyles[msg.labelColor!]}`}>
                        {msg.label}
                      </span>
                    )}
                    <div className="rounded-xl border border-amber-500/15 bg-amber-500/5 px-4 py-2 text-xs text-amber-300/80 text-center">
                      {msg.text}
                    </div>
                  </motion.div>
                )
              }

              const isAgent = msg.from === 'agent'

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className={`flex flex-col gap-1 ${isAgent ? 'items-end' : 'items-start'}`}
                >
                  {/* Capability label — only on agent messages */}
                  {isAgent && msg.label && (
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${labelStyles[msg.labelColor!]}`}>
                      {msg.label}
                    </span>
                  )}

                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    isAgent
                      ? 'rounded-tr-sm bg-indigo-600/30 border border-indigo-500/25 text-white'
                      : 'rounded-tl-sm bg-white/8 border border-white/10 text-white/80'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-white/30 px-1">{msg.time}</span>
                </motion.div>
              )
            })}

            {/* Typing indicator */}
            {revealedCount > 0 && revealedCount < messages.length && messages[revealedCount - 1].from === 'customer' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-end gap-1.5"
              >
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-indigo-600/20 border border-indigo-500/15 px-4 py-3">
                  {[0, 1, 2].map(dot => (
                    <span
                      key={dot}
                      className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                      style={{ animation: `pulse 1s ease-in-out ${dot * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer — Replay button when done */}
          {completed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-white/8 px-4 py-3 flex items-center justify-between"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <span className="text-xs text-white/40">Appointment booked. Owner still asleep.</span>
              <button
                onClick={replay}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium flex items-center gap-1"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
                Replay
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Capability Badges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-2xl mx-auto"
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="card p-4 text-center"
            >
              <div className="text-xl mb-1.5">{cap.icon}</div>
              <div className="text-xs font-semibold text-white mb-0.5">{cap.label}</div>
              <div className="text-[10px] text-white/40">{cap.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge CTA */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-10 text-center"
        >
          <p className="text-white/50 text-sm sm:text-base mb-5">
            That wasn't a demo. That's what your customers experience <span className="text-white/80">starting week one</span>.
          </p>
          <a href="#audit" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm">
            Deploy This for My Business
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
