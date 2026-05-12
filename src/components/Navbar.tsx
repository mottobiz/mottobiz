import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_LINK } from '@/lib/config'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  // Close on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])

  const navLinks = isHomePage
    ? [
        { label: 'Services', href: '#services' },
        { label: 'Process', href: '#how-it-works' },
        { label: 'Results', href: '#proof' },
        { label: 'FAQ', href: '#faq' },
      ]
    : [{ label: 'Home', href: '/' }]

  const extraLinks = [
    { label: 'Resources', href: '/resources' },
    { label: 'Textile & Diamond', href: '/industries/textile-diamond' },
    { label: 'Restaurants', href: '/industries/restaurant-food' },
    { label: 'Real Estate', href: '/industries/real-estate' },
  ]

  const allLinks = [...navLinks, ...extraLinks]

  return (
    <>
      <motion.nav
        aria-label="Main navigation"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5"
      >
        <div
          className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(10,10,11,0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <img 
              src="/logo-static.svg" 
              alt="Mottobiz" 
              className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-display font-semibold text-xl tracking-tight text-white">
              Motto<span className="text-indigo-400">Biz</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
            
            {extraLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.25)',
                color: '#fafafa',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(99,102,241,0.2)'
                el.style.borderColor = 'rgba(99,102,241,0.5)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(99,102,241,0.1)'
                el.style.borderColor = 'rgba(99,102,241,0.25)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book a Call
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
              style={{ background: mobileMenuOpen ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)' }}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className="block h-0.5 w-full rounded-full bg-white transition-all duration-300 origin-center"
                  style={{
                    transform: mobileMenuOpen ? 'rotate(45deg) translate(2.5px, 2.5px)' : 'none',
                  }}
                />
                <span
                  className="block h-0.5 w-full rounded-full bg-white transition-all duration-300"
                  style={{ opacity: mobileMenuOpen ? 0 : 1 }}
                />
                <span
                  className="block h-0.5 w-full rounded-full bg-white transition-all duration-300 origin-center"
                  style={{
                    transform: mobileMenuOpen ? 'rotate(-45deg) translate(2.5px, -2.5px)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(10,10,11,0.85)' }}
            onClick={closeMenu}
            aria-hidden="true"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-24 left-4 right-4 rounded-2xl p-6 flex flex-col gap-2"
              style={{
                background: 'rgba(18,18,20,0.98)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(24px)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {allLinks.map((link) => {
                const isHash = link.href.startsWith('#')
                return (
                  <div key={link.label}>
                    {isHash ? (
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="block w-full px-4 py-3.5 rounded-xl text-base font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={closeMenu}
                        className={`block w-full px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                          location.pathname === link.href
                            ? 'text-indigo-400 bg-indigo-500/10'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                )
              })}

              {/* Divider */}
              <div className="my-2 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

              {/* Mobile CTA */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-300 mt-1"
                style={{
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  color: '#fafafa',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book a Call
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
