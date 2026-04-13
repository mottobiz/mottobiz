import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { FloatingOrbs } from './effects'
import { WHATSAPP_LINK } from '@/lib/config'

const stats = [
  { value: '10x', label: 'Faster Response' },
  { value: '0', label: 'New Hires Needed' },
  { value: '24/7', label: 'Always On' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 sm:pb-32">
      <FloatingOrbs />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.div variants={staggerItem} className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Surat's First AI Automation Studio — Auto-Deployed 🚀
          </span>
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8"
        >
          Your Business,
          <br />
          <span className="text-gradient">Automated.</span>
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          We build the digital system that runs your business — so you can 
          focus on growth without hiring a team.
        </motion.p>

        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-5 justify-center mb-24">
          <a href="#services" className="btn-primary inline-flex items-center justify-center gap-2.5">
            Explore Services
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-2.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="flex flex-wrap justify-center gap-10 sm:gap-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-3">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
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