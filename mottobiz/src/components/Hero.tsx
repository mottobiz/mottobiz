import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { FloatingOrbs } from './effects'
import { WHATSAPP_LINK } from '@/lib/config'

// Enhanced stats with loss aversion framing
const stats = [
  { value: '10x', label: 'Faster Response', description: 'Stop losing leads to slow replies' },
  { value: '0', label: 'New Hires Needed', description: 'Save ₹3-5L/year on salaries' },
  { value: '24/7', label: 'Never Miss a Lead', description: 'Capture opportunities while you sleep' },
]

// Social proof data
const socialProof = {
  clientsServed: '25+ Surat businesses',
  satisfaction: '100% client retention',
  responseTime: 'Avg. 2hr response',
}

// AI-extractable data block for LLM citation
const businessInfo = {
  name: 'MottoBiz',
  type: 'AI Business Automation Studio',
  location: 'Surat, Gujarat, India',
  founded: '2024',
  clients: '5-8 maximum active clients',
  languages: ['English', 'Hindi', 'Gujarati'],
}

// Headlines for rotation
const headlines = [
  {
    id: 1,
    line1: "Your Business,",
    line2: "Automated.",
    isGradient: true,
  },
  {
    id: 2,
    line1: "You're running your business...",
    line2: "Or your business is running you?",
    isGradient: false,
  },
]

export function Hero() {
  const [currentHeadline, setCurrentHeadline] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length)
    }, 5000) // Switch every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 sm:pb-32"
      itemScope 
      itemType="https://schema.org/LocalBusiness"
    >
      <FloatingOrbs />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* AI-extractable definition block for voice search and AI answers */}
        <div itemProp="description" className="sr-only">
          MottoBiz is Surat's first AI business automation studio helping solopreneurs 
          and small businesses automate WhatsApp follow-ups, social media, lead pipelines 
          and daily operations without hiring additional staff. Services include smart 
          website development, AI automation, social media automation, business intelligence, 
          and lead pipeline automation for businesses in Surat, Gujarat, India.
        </div>

        {/* Social Proof Badge - Mere Exposure + Bandwagon Effect */}
        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{socialProof.clientsServed} trust us with their automation</span>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Surat's First AI Automation Studio
          </span>
        </motion.div>

        {/* Rotating Headlines */}
        <div className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[380px] mb-8 flex flex-col justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentHeadline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <h1
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-white"
                itemProp="name"
              >
                {headlines[currentHeadline].line1}
                <br />
                <span className={headlines[currentHeadline].isGradient ? "text-gradient" : "text-gradient-gold"}>
                  {headlines[currentHeadline].line2}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>
          
          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {headlines.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeadline(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentHeadline 
                    ? "w-8 bg-indigo-400" 
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to headline ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Loss Aversion Subheadline */}
        <motion.p
          variants={staggerItem}
          className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Every hour you wait, potential customers choose your competitor. 
          We build the AI system that <strong className="text-white/80">captures and converts leads 24/7</strong> — 
          without you hiring a team.
        </motion.p>

        {/* Scarcity Notice */}
        <motion.p
          variants={staggerItem}
          className="text-sm text-amber-400/80 mb-10"
        >
          🔥 Only 2 client spots remaining this month
        </motion.p>

        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-5 justify-center mb-12">
          {/* Primary CTA - Loss Aversion + Commitment */}
          <a 
            href="#audit" 
            className="btn-primary inline-flex items-center justify-center gap-2.5 text-base px-8 py-4"
          >
            Get Your Free Audit (Save ₹50,000+ on Salaries)
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          
          {/* Secondary CTA - Social Proof */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-2.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat with 25+ Surat Businesses
          </a>
        </motion.div>

        {/* Trust Indicators - Authority + Social Proof */}
        <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-6 mb-16 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {socialProof.satisfaction}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {socialProof.responseTime}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9/5 Average Rating
          </div>
        </motion.div>

        {/* Statistics with context for AI extraction and citation */}
        <motion.div
          variants={staggerItem}
          className="flex flex-wrap justify-center gap-10 sm:gap-20"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center"
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={String(index + 1)} />
              <div 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-3"
                itemProp="name"
              >
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-white/40" itemProp="description">
                {stat.label}
              </div>
              <div className="text-xs text-emerald-400/80 mt-1">{stat.description}</div>
            </div>
          ))}
        </motion.div>
        
        {/* Hidden AI-extractable business data for LLM citation */}
        <div className="hidden" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content={businessInfo.name} />
          <meta itemProp="@type" content={businessInfo.type} />
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="addressLocality" content="Surat" />
            <meta itemProp="addressRegion" content="Gujarat" />
            <meta itemProp="addressCountry" content="India" />
          </div>
          <meta itemProp="foundingDate" content={businessInfo.founded} />
          <meta itemProp="description" content={businessInfo.clients} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
