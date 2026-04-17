import { WHATSAPP_LINK, EMAIL, PHONE_DISPLAY } from '@/lib/config'
import { SERVICE_AREAS } from '@/lib/config'

export function Footer() {
  // Get primary service areas for display
  const primaryAreas = SERVICE_AREAS.slice(0, 8).map(a => a.name)
  
  return (
    <footer className="relative pt-20 sm:pt-24 pb-10 px-6">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-16">
          {/* Brand Column */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-5">
              <img
                src="/logo-static.svg"
                alt="MottoBiz"
                className="w-10 h-10"
              />
              <span className="font-display font-semibold text-xl text-white">
                Motto<span className="text-indigo-400">Biz</span>
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Surat's AI business automation studio. We build the digital system your business runs on.
            </p>
          </div>

          {/* Contact Column */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-semibold tracking-wider uppercase mb-5 text-white/55">Contact</h3>
            <address className="not-italic space-y-3">
              <p className="text-sm text-white/60">MottoBiz</p>
              <p className="text-sm text-white/60">Surat, Gujarat 395001</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-sm block text-indigo-400 hover:text-indigo-300 transition-colors">
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="text-sm block text-white/60 hover:text-white transition-colors">
                {EMAIL}
              </a>
            </address>
          </div>

          {/* Quick Links Column */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-semibold tracking-wider uppercase mb-5 text-white/55">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Services', href: '#services' },
                { label: 'Free Audit', href: '#audit' },
                { label: 'FAQ', href: '#faq' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas Column - NEW */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-semibold tracking-wider uppercase mb-5 text-white/55">Areas We Serve</h3>
            <p className="text-sm text-white/50 mb-3">
              Serving businesses across Surat:
            </p>
            <ul className="space-y-2 text-sm text-white/55">
              {primaryAreas.map(area => (
                <li key={area} className="hover:text-white/60 transition-colors">{area}</li>
              ))}
            </ul>
            <p className="text-xs text-white/50 mt-3">
              And all Surat neighborhoods
            </p>
          </div>
        </div>

        {/* Local SEO Rich Snippet */}
        <div className="sr-only" itemScope itemType="https://schema.org/LocalBusiness">
          <meta itemProp="name" content="MottoBiz" />
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="addressLocality" content="Surat" />
            <meta itemProp="addressRegion" content="Gujarat" />
            <meta itemProp="addressCountry" content="India" />
          </div>
          <meta itemProp="telephone" content={PHONE_DISPLAY} />
          <meta itemProp="email" content={EMAIL} />
          <div itemProp="areaServed" itemScope itemType="https://schema.org/Place">
            <meta itemProp="name" content="Surat" />
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 border-t border-white/5">
          <p>&copy; {new Date().getFullYear()} MottoBiz. Surat, Gujarat, India.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <span aria-hidden="true">|</span>
            <a href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ boxShadow: '0 8px 30px rgba(37,211,102,0.4)' }}
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  )
}
