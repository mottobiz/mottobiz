import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { LEAD_WEBHOOK_URL, WHATSAPP_NUMBER } from '@/lib/config'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  whatsapp: z.string().min(10, 'Enter a valid WhatsApp number').max(15),
  email: z.string().email('Enter a valid email address'),
  businessType: z.string().min(1, 'Please select your business type'),
})

type FormValues = z.infer<typeof schema>

const businessTypes = [
  'Retail / Shop',
  'Food & Tiffin Service',
  'Coaching / Education',
  'Professional Services',
  'Health & Wellness',
  'Interior / Decor',
  'Manufacturing / Trade',
  'Other',
]

// Value proposition for reciprocity
const auditValue = {
  worth: '₹5,000',
  duration: '30 minutes',
  deliverables: [
    'Complete automation opportunity report',
    'ROI calculation for your business',
    'Implementation roadmap',
    'No obligation, zero pressure',
  ],
}

// Social proof for form
const formSocialProof = {
  bookedThisWeek: '12',
  averageRating: '4.9',
  totalAudits: '200+',
}

export function LeadMagnet() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const selectedBusinessType = watch('businessType')

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    setValue('businessType', value, { shouldValidate: true })
    setDropdownOpen(false)
  }

  const openWhatsAppLead = (message: string) => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null)

    // If webhook URL is configured, POST to it
    if (LEAD_WEBHOOK_URL) {
      try {
        const res = await fetch(LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        setSubmitted(true)
      } catch {
        // Fallback to WhatsApp on error
        const msg = encodeURIComponent(
          `Hi MottoBiz, I'd like a free automation audit.\n\nName: ${data.name}\nWhatsApp: ${data.whatsapp}\nEmail: ${data.email}\nBusiness: ${data.businessType}`
        )
        openWhatsAppLead(msg)
        setSubmitted(true)
      }
      return
    }

    // No webhook configured — redirect to WhatsApp with form data
    const msg = encodeURIComponent(
      `Hi MottoBiz, I'd like a free automation audit.\n\nName: ${data.name}\nWhatsApp: ${data.whatsapp}\nEmail: ${data.email}\nBusiness: ${data.businessType}`
    )
    openWhatsAppLead(msg)
    setSubmitted(true)
  }

  return (
    <section id="audit" className="relative py-16 sm:py-24 lg:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column: Value Prop (Reciprocity + Anchoring) */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2"
          >
            <motion.div variants={staggerItem} className="sticky top-32">
              <div className="inline-block text-xs font-semibold tracking-wider uppercase mb-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                🎁 Free Gift (Worth {auditValue.worth})
              </div>
              
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                Get Your 
                <span className="text-gradient">Free Automation Audit</span>
              </h2>
              
              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                In just {auditValue.duration}, we'll identify exactly where your business 
                is leaking revenue — and show you how to fix it with automation.
              </p>

              {/* What You Get (Reciprocity - High Value Perception) */}
              <div className="card p-6 mb-8">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
                  What You'll Receive
                </h3>
                <ul className="space-y-3">
                  {auditValue.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                      <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formSocialProof.bookedThisWeek}</div>
                  <div className="text-xs text-white/55">Booked this week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formSocialProof.averageRating}</div>
                  <div className="text-xs text-white/55">Avg. rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formSocialProof.totalAudits}</div>
                  <div className="text-xs text-white/55">Total audits</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Form (Commitment & Consistency) */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-10 sm:p-12 text-center border-indigo-500/30"
              >
                <div className="text-5xl mb-6">🎯</div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4 text-white">You're on the list!</h3>
                <p className="text-white/50 text-base sm:text-lg mb-6">We'll WhatsApp you within 24 hours.</p>
                <div className="inline-flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Your audit is confirmed
                </div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="card p-8 sm:p-10 space-y-6"
              >
                {/* Loss Aversion Header */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-2">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">⚡</span>
                    <div>
                      <p className="text-sm text-amber-400 font-medium">Only 2 free audits remaining this week</p>
                      <p className="text-xs text-white/50 mt-1">Next batch opens in 7 days. Don't wait — every day without automation costs you leads.</p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Your Name *</label>
                    <input
                      {...register('name')}
                      placeholder="Rahul Shah"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm sm:text-base placeholder-white/50 focus:border-indigo-500/50 focus:outline-none transition-colors"
                    />
                    {errors.name && <p className="mt-2 text-xs text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">WhatsApp Number *</label>
                    <input
                      {...register('whatsapp')}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm sm:text-base placeholder-white/50 focus:border-indigo-500/50 focus:outline-none transition-colors"
                    />
                    {errors.whatsapp && <p className="mt-2 text-xs text-red-400">{errors.whatsapp.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Email Address *</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="you@business.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm sm:text-base placeholder-white/50 focus:border-indigo-500/50 focus:outline-none transition-colors"
                  />
                  {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <div ref={dropdownRef} className="relative">
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Business Type *</label>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-full bg-white/5 border rounded-xl px-5 py-4 text-left text-sm sm:text-base transition-colors focus:outline-none ${
                      dropdownOpen ? 'border-indigo-500/50' : 'border-white/10 hover:border-white/20'
                    } ${selectedBusinessType ? 'text-white' : 'text-white/50'}`}
                  >
                    <span className="block truncate">
                      {selectedBusinessType || 'Select your business type...'}
                    </span>
                    <span className="absolute right-4 top-[42px] pointer-events-none">
                      <svg className={`w-5 h-5 text-white/55 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full mt-2 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto"
                      >
{businessTypes.map((type) => (
  <button
    key={type}
    type="button"
    onClick={() => handleSelect(type)}
    className={`w-full px-5 py-3 text-left text-sm transition-colors hover:bg-indigo-500/20 ${
      selectedBusinessType === type 
        ? 'bg-indigo-500/20 text-white font-medium' 
        : 'text-white'
    }`}
  >
    {type}
  </button>
))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {errors.businessType && <p className="mt-2 text-xs text-red-400">{errors.businessType.message}</p>}
                  
                  {/* Hidden input for react-hook-form registration */}
                  <input {...register('businessType')} type="hidden" />
                </div>

                {/* Submit Button - Loss Aversion + Commitment */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 text-base py-4"
                >
                  {isSubmitting ? 'Securing Your Spot...' : 'Claim My Free Audit →'}
                </button>

                {/* Risk Reversal (Regret Aversion) */}
                <div className="flex items-center justify-center gap-4 text-xs text-white/55">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    100% Free
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    No Credit Card
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No Obligation
                  </span>
                </div>

                {submitError && (
                  <p className="text-center text-sm font-medium text-red-400">{submitError}</p>
                )}
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
