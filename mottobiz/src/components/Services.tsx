import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

const services = [
  {
    icon: '🌐',
    title: 'Smart Website',
    description: 'A high-converting site that captures leads while you sleep.',
    features: ['Lead forms', 'SEO optimized', 'Mobile-first'],
  },
  {
    icon: '🤖',
    title: 'AI Automation',
    description: 'WhatsApp replies, follow-ups, and workflows on autopilot.',
    features: ['Auto-responses', 'Lead nurturing', '24/7 availability'],
  },
  {
    icon: '📱',
    title: 'Social Media',
    description: 'Content creation and scheduling that runs itself.',
    features: ['Auto-posting', 'Content AI', 'Multi-platform'],
  },
  {
    icon: '📊',
    title: 'Business Intelligence',
    description: 'Know exactly what drives revenue and where to focus.',
    features: ['Analytics', 'Reports', 'Insights'],
  },
  {
    icon: '⚡',
    title: 'Workflow Automation',
    description: 'Connect your tools and eliminate manual tasks.',
    features: ['Integrations', 'Triggers', 'Notifications'],
  },
  {
    icon: '🎯',
    title: 'Lead Pipeline',
    description: 'Capture, qualify, and convert leads automatically.',
    features: ['CRM sync', 'Scoring', 'Routing'],
  },
]

export function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-28 sm:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.p variants={staggerItem} className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-5">
            What We Do
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Your Digital
            <span className="text-gradient"> Nervous System</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to run and grow — without the overhead.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="card p-8 sm:p-10 group text-center"
            >
              <div className="icon-container mx-auto mb-7 group-hover:scale-110 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/20 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold mb-3 text-white">
                {service.title}
              </h3>
              <p className="text-white/50 text-base mb-7 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2.5">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-white/60"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}