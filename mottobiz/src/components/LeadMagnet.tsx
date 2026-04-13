import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { LEAD_WEBHOOK_URL } from '@/lib/config'

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

export function LeadMagnet() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null)
    if (!LEAD_WEBHOOK_URL) {
      setSubmitError('Form temporarily unavailable. Please use WhatsApp.')
      return
    }
    try {
      const res = await fetch(LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please try WhatsApp instead.')
    }
  }

  return (
    <section id="audit" className="relative py-28 sm:py-40 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="text-center mb-12 sm:mb-14">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase mb-6 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              Free Audit
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-5">
              Claim Your
              <span className="text-gradient"> Automation Audit</span>
            </h2>
            <p className="text-white/50 text-lg sm:text-xl leading-relaxed">
              30 minutes. Zero pitch. Pure clarity on what can be automated.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-10 sm:p-12 text-center border-indigo-500/30"
            >
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4 text-white">You're on the list.</h3>
              <p className="text-white/50 text-base sm:text-lg">We'll WhatsApp you within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              variants={staggerItem}
              onSubmit={handleSubmit(onSubmit)}
              className="card p-8 sm:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Name</label>
                  <input
                    {...register('name')}
                    placeholder="Rahul Shah"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm sm:text-base placeholder-white/30 focus:border-indigo-500/50 focus:outline-none transition-colors"
                  />
                  {errors.name && <p className="mt-2 text-xs text-red-400">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">WhatsApp</label>
                  <input
                    {...register('whatsapp')}
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm sm:text-base placeholder-white/30 focus:border-indigo-500/50 focus:outline-none transition-colors"
                  />
                  {errors.whatsapp && <p className="mt-2 text-xs text-red-400">{errors.whatsapp.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@business.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm sm:text-base placeholder-white/30 focus:border-indigo-500/50 focus:outline-none transition-colors"
                />
                {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Business Type</label>
                <select
                  {...register('businessType')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm sm:text-base focus:border-indigo-500/50 focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-[#121214]">Select type...</option>
                  {businessTypes.map(t => (
                    <option key={t} value={t} className="bg-[#121214]">{t}</option>
                  ))}
                </select>
                {errors.businessType && <p className="mt-2 text-xs text-red-400">{errors.businessType.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50"
              >
                {isSubmitting ? 'Booking...' : 'Book My Free Audit →'}
              </button>

              <p className="text-center text-sm text-white/30">We'll WhatsApp you within 24 hours. No spam.</p>

              {submitError && (
                <p className="text-center text-sm font-medium text-red-400">{submitError}</p>
              )}
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  )
}