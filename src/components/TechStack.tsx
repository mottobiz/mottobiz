import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

// Tech stack badges communicate two things:
// 1. Authority — we use the same enterprise-grade tools that Fortune 500 companies use
// 2. Reassurance — these are proven, reliable platforms, not bespoke fragile scripts

const tools = [
  { name: 'n8n', desc: 'Workflow Engine', color: 'rgba(255,100,50,0.15)', border: 'rgba(255,100,50,0.25)', text: '#f97316' },
  { name: 'Make', desc: 'Automation Layer', color: 'rgba(130,90,255,0.15)', border: 'rgba(130,90,255,0.25)', text: '#a78bfa' },
  { name: 'OpenAI', desc: 'AI Brain', color: 'rgba(80,200,120,0.15)', border: 'rgba(80,200,120,0.25)', text: '#4ade80' },
  { name: 'Meta API', desc: 'WhatsApp Business', color: 'rgba(37,211,102,0.15)', border: 'rgba(37,211,102,0.25)', text: '#25d366' },
  { name: 'Google', desc: 'Data & Calendar', color: 'rgba(66,133,244,0.15)', border: 'rgba(66,133,244,0.25)', text: '#60a5fa' },
  { name: 'Airtable', desc: 'Memory & CRM', color: 'rgba(255,185,80,0.15)', border: 'rgba(255,185,80,0.25)', text: '#fbbf24' },
]

export function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tech-stack" className="relative py-12 sm:py-16 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-10"
        >
          <motion.p variants={staggerItem} className="text-white/35 text-xs font-semibold tracking-widest uppercase">
            Built on enterprise-grade infrastructure
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-3"
        >
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5"
              style={{
                background: tool.color,
                border: `1px solid ${tool.border}`,
              }}
            >
              <span className="text-sm font-bold" style={{ color: tool.text }}>{tool.name}</span>
              <span className="text-xs text-white/40">{tool.desc}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={staggerItem}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-8 text-white/30 text-xs max-w-lg mx-auto"
        >
          The same platforms used by global enterprises — configured and managed as your private agentic infrastructure.
        </motion.p>
      </div>
    </section>
  )
}
