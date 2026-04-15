import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { WHATSAPP_LINK } from '@/lib/config'

// Social proof data
const finalCTAProof = {
  spotsLeft: 2,
  totalSpots: 8,
  businessesHelped: '25+',
  avgResponseTime: '2 hours',
}

export function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="cta" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Urgency Badge - Scarcity Principle */}
          <motion.div variants={staggerItem} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold mb-6 bg-red-500/10 border border-red-500/20 text-red-300"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Only {finalCTAProof.spotsLeft} of {finalCTAProof.totalSpots} client spots left this month
          </motion.div>

          {/* Social Proof Bar */}
          <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-emerald-400 font-semibold">{finalCTAProof.businessesHelped}</span>
              <span>Surat businesses automated</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-indigo-400 font-semibold">{finalCTAProof.avgResponseTime}</span>
              <span>average response time</span>
            </div>
          </motion.div>

          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Every Day You Wait,
            <br />
            <span className="text-gradient">You Lose Money.</span>
          </motion.h2>

          {/* Loss Aversion Messaging */}
          <motion.div variants={staggerItem} className="max-w-2xl mx-auto mb-10">
            <p className="text-white/50 text-lg sm:text-xl leading-relaxed mb-4">
              While you're reading this, your competitors are capturing the leads 
              that should be yours. Every hour of delay costs you <strong className="text-white">₹500-2,000</strong> in lost opportunities.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Don't let another lead slip away
            </div>
          </motion.div>

          {/* Value Stack (Anchoring) */}
          <motion.div variants={staggerItem} className="card p-6 mb-10 max-w-lg mx-auto">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">What You Get Today</h3>
            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-center justify-between text-sm">
                <span className="text-white/60">Free 30-Minute Automation Audit</span>
                <span className="text-emerald-400 font-medium">₹5,000 Value</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-white/60">Custom ROI Analysis</span>
                <span className="text-emerald-400 font-medium">₹3,000 Value</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-white/60">Implementation Roadmap</span>
                <span className="text-emerald-400 font-medium">₹2,000 Value</span>
              </li>
              <li className="flex items-center justify-between text-sm border-t border-white/10 pt-3 mt-3">
                <span className="text-white font-medium">Total Value</span>
                <span className="text-white font-bold">₹10,000</span>
              </li>
              <li className="flex items-center justify-between text-lg">
                <span className="text-white font-semibold">Your Investment</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </li>
            </ul>
            <p className="text-xs text-white/40">No credit card required. No obligation. Just pure value.</p>
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            {/* Primary CTA - Commitment + Loss Aversion */}
            <a href="#audit" className="btn-primary inline-flex items-center justify-center gap-2.5 text-base px-8 py-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book My Free Audit Now
            </a>
            
            {/* Secondary CTA */}
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

          {/* Trust Badges */}
          <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-6 text-xs text-white/40">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Free. No Credit Card.
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Response within 2 hours
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure & Confidential
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
