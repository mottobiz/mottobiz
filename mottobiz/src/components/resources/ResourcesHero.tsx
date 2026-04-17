import { motion } from 'framer-motion'
import { SearchBar } from './CategoryFilter'

interface ResourcesHeroProps {
  onSearch?: (value: string) => void
  searchValue?: string
  articleCount?: number
}

export function ResourcesHero({ 
  onSearch, 
  searchValue = '',
  articleCount = 150 
}: ResourcesHeroProps) {
  return (
    <section className="relative py-16 sm:py-24 px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Resources for Surat Business Owners
          </p>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Automation Guides
            <span className="text-gradient"> for Surat</span>
          </h1>
          
          <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Practical tips, local insights, and step-by-step tutorials—built for Gujarat's entrepreneurs. 
            <span className="text-white/70"> {articleCount}+ guides</span> to help your business grow.
          </p>

          {onSearch && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl mx-auto"
            >
              <SearchBar 
                value={searchValue}
                onChange={onSearch}
                placeholder="Search for WhatsApp automation, lead generation, website..."
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// Newsletter CTA for resources page
export function NewsletterCTA() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div 
          className="card p-8 sm:p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1), rgba(245, 158, 11, 0.1))'
          }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Get Automation Tips in Your Inbox
            </h3>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              Weekly updates on Surat business automation and new guides. No spam, just actionable advice.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500/50"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// WhatsApp CTA for resources page
export function WhatsAppCTA() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div 
          className="card p-8 sm:p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))'
          }}
        >
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Need Help Right Now?
            </h3>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              Chat with us on WhatsApp. We'll show you exactly how automation can help your specific business.
            </p>
            
            <a
              href="https://wa.me/917487957972?text=Hi%20MottoBiz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
