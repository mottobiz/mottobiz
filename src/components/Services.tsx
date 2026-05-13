import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

// Enhanced service data with Agentic terminology and outcome-based results
const services = [
  {
    icon: '🌐',
    title: 'AI-Native Web Engines',
    shortTitle: 'Web Engines',
    description: 'Not just a website—a digital storefront that extracts leads 24/7.',
    detailedDescription: 'Professional website development for Surat businesses with integrated agentic lead capture and autonomous follow-up triggers. Built to convert visitors into customers without human intervention.',
    features: ['Lead Extraction', 'Autonomous Triggers', 'Mobile-Native'],
    timeline: '2-3 weeks',
    targetAudience: 'Surat businesses needing online presence',
  },
  {
    icon: '🤖',
    title: 'Autonomous Communication Agents',
    shortTitle: 'Agentic Chat',
    description: 'WhatsApp, Email, and DMs managed by agents that remember your clients.',
    detailedDescription: 'Intelligent AI agents for WhatsApp business that maintain context (Memory Mode), handle complex inquiries, and escalate to humans only when necessary. Reduces response time by 10x.',
    features: ['Context Memory', 'Outcome Tracking', '24/7 Execution'],
    timeline: '2-4 weeks',
    targetAudience: 'Businesses with high customer communication volume',
    stats: { metric: '10x', label: 'faster execution' },
  },
  {
    icon: '📱',
    title: 'Self-Running Media Teams',
    shortTitle: 'Autonomous Media',
    description: 'Agents that research, create, and schedule your social content.',
    detailedDescription: 'Automated social media management where agents study your brand voice and competitors to generate high-converting posts and schedule them across all platforms autonomously.',
    features: ['Brand Voice Sync', 'Competitor Analysis', 'Auto-Growth'],
    timeline: '1-2 weeks',
    targetAudience: 'Businesses wanting consistent social presence',
  },
  {
    icon: '🧠',
    title: 'Agentic Decision Support',
    shortTitle: 'Decision Agents',
    description: 'Know exactly what drives revenue and where your agent should focus.',
    detailedDescription: 'Custom intelligence dashboards where agents analyze your business data to suggest improvements and execute optimizations in your lead pipeline automatically.',
    features: ['Data Extraction', 'Auto-Optimization', 'Insights'],
    timeline: '3-4 weeks',
    targetAudience: 'Data-driven business owners',
  },
  {
    icon: '⚡',
    title: 'Digital Workforce Orchestration',
    shortTitle: 'Digital Employees',
    description: 'Connect your tools and deploy agents to replace manual admin.',
    detailedDescription: 'Deploy "Digital Employees" that live inside your workflow (n8n/Make). They handle invoicing, document prep, and team coordination without you lifting a finger.',
    features: ['No-Human-Required', 'End-to-end Logic', 'SOP Automation'],
    timeline: '2-4 weeks',
    targetAudience: 'Businesses using multiple software tools',
  },
  {
    icon: '🎯',
    title: 'Revenue Extraction Pipelines',
    shortTitle: 'Revenue Agents',
    description: 'Capture, qualify, and close leads on autopilot.',
    detailedDescription: 'End-to-end revenue agents that source leads, qualify them via AI conversation, and book meetings or process payments directly. Outcome-based performance.',
    features: ['Lead Sourcing', 'AI Qualification', 'Auto-Closing'],
    timeline: '2-4 weeks',
    targetAudience: 'Sales-focused businesses',
    stats: { metric: '₹0', label: 'Cost Per Seat' },
  },
]

export function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section 
      id="services" 
      className="relative py-16 sm:py-24 lg:py-40 px-6"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto text-center">
        {/* AI-extractable service catalog definition */}
        <div className="sr-only" itemProp="description">
          MottoBiz offers six core business automation services for Surat businesses: 
          Smart Website Development, AI Automation, Social Media Automation, 
          Business Intelligence, Workflow Automation, and Lead Pipeline Automation. 
          All services include setup, management, and ongoing support with typical 
          timelines ranging from 1-4 weeks depending on complexity.
        </div>

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
              itemScope
              itemType="https://schema.org/Service"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={String(i + 1)} />
              <div 
                className="icon-container mx-auto mb-7 group-hover:scale-110 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/20 transition-all duration-300"
                aria-hidden="true"
              >
                {service.icon}
              </div>
              
              <h3 
                className="font-display text-xl sm:text-2xl font-semibold mb-3 text-white"
                itemProp="name"
              >
                {service.title}
              </h3>
              
              {/* Visible short description */}
              <p className="text-white text-base mb-4 leading-relaxed">
                {service.description}
              </p>
              
              {/* AI-extractable detailed description (hidden from view but accessible) */}
              <meta itemProp="description" content={service.detailedDescription} />
              
              {/* Timeline for AI extraction */}
              <div className="text-xs text-indigo-400/80 mb-3">
                Timeline: {service.timeline}
              </div>
              
              {/* Statistics badge if available */}
              {service.stats && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                  <span className="text-lg font-bold text-indigo-400">{service.stats.metric}</span>
                  <span className="text-xs text-indigo-300">{service.stats.label}</span>
                </div>
              )}
              
              <div className="flex flex-wrap justify-center gap-2.5">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-white"
                    itemProp="hasOfferCatalog"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI-extractable service summary statistics */}
        <div className="sr-only" itemScope itemType="https://schema.org/OfferCatalog">
          <meta itemProp="name" content="MottoBiz Service Statistics" />
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="AI Automation" />
            <meta itemProp="description" content="10x faster response time with automated WhatsApp and workflow systems" />
          </div>
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="Lead Pipeline" />
            <meta itemProp="description" content="First results visible within 2-4 weeks of implementation" />
          </div>
        </div>
      </div>
    </section>
  )
}
