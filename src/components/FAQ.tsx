import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as Accordion from '@radix-ui/react-accordion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const faqs = [
  { q: 'What is an "AI Agent" vs basic automation?', a: 'Basic automation follows fixed rules. AI Agents follow goals. They can reason, remember customer context, and execute entire business workflows autonomously without human input.' },
  { q: 'Is this really cheaper than hiring an employee?', a: 'A reliable employee in Surat costs ₹3-5L/year plus management overhead. One Mottobiz agent costs a fraction of that, works 24/7/365, never burns out, and has perfect memory.' },
  { q: 'What do you mean by "Outcome-Based"?', a: 'We don\'t just sell software; we sell results. We align our deployment with your KPIs—whether that is leads captured, lease renewals processed, or candidates sourced.' },
  { q: 'Will I be stuck depending on you?', a: 'No. After one year, handover is optional. We document every agent workflow and can train you to manage them, though most clients prefer our managed service.' },
  { q: 'Hindi or Gujarati support?', a: 'Yes. Our agents and our team support English, Hindi, and Gujarati natively to ensure your local Surat customers feel heard.' },
  { q: 'How long to see results?', a: 'Your first agent is typically deployed within 2-4 weeks. You will see "Agentic" outcomes—like leads extracted or follow-ups executed—immediately after launch.' },
  { q: 'What about security and data?', a: 'We build agents that run on secure pipelines. Your customer data and "Business Memory" are treated as your most valuable assets and are protected with enterprise-grade encryption.' },
  { q: 'How many clients do you take?', a: 'To ensure every agent is perfectly tuned to the business workflow, we only take 5-8 active clients at any given time.' },
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