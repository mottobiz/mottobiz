import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { WHATSAPP_LINK } from '@/lib/config'

export function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="cta" className="relative py-28 sm:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold mb-10 sm:mb-12 bg-red-500/10 border border-red-500/20 text-red-300"
          >
            <span className="w-2 h-2 rounded-full bg-red-400" />
            Limited client spots available
          </motion.div>

          <motion.h2 variants={staggerItem} className="font-display text-5xl sm:text-6xl md:text-7xl font-bold mb-8 sm:mb-10"
          >
            Your Business.
            <span className="text-gradient"> Automated.</span>
          </motion.h2>

          <motion.p variants={staggerItem} className="text-white/50 text-lg sm:text-xl mb-12 sm:mb-14 max-w-xl mx-auto leading-relaxed"
          >
            The longer you wait, the longer you're doing it manually.
            Start with a free audit — 30 minutes that could change everything.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#audit" className="btn-primary inline-flex items-center justify-center gap-2.5">
              Claim Your Free Audit
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
        </motion.div>
      </div>
    </section>
  )
}