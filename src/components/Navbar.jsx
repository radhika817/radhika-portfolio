import { useState, useEffect } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/content'
import MagneticButton from './MagneticButton'
import MobileMenu from './MobileMenu'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '../hooks/useReducedMotion'

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Terminal', href: '#terminal' },
  { name: 'Contact', href: '#contact' },
]

/**
 * 21st.dev inspired Floating Pill Glassmorphism Navbar with sliding active indicator,
 * Monogram logo, smooth section links, and Resume CTA.
 */
export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-3 md:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 md:gap-6 px-3.5 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300 max-w-fit md:min-w-[680px] lg:min-w-[780px] ${
            isScrolled
              ? 'bg-[#0d0718]/90 border border-violet-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(139,92,246,0.22)] backdrop-blur-xl'
              : 'bg-[#0d0718]/70 border border-violet-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_18px_rgba(139,92,246,0.12)] backdrop-blur-lg'
          }`}
        >
          {/* Monogram Logo "RK" */}
          <MagneticButton>
            <a
              href="#hero"
              data-cursor="Open"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 text-decoration-none group"
            >
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-violet-900/40 border border-violet-400/50 text-white font-mono font-bold text-sm shadow-[0_0_12px_rgba(139,92,246,0.35)] group-hover:scale-105 group-hover:border-violet-300 transition-all">
                RK
              </span>
              <span className="hidden sm:inline font-heading font-semibold text-sm text-[var(--text-primary)] tracking-tight group-hover:text-violet-200 transition-colors">
                {personalInfo.name.split(' ')[0]}
              </span>
            </a>
          </MagneticButton>

          {/* Desktop Floating Pill Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#130b24]/50 border border-violet-500/15 rounded-full p-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor="Open"
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors select-none ${
                    isActive
                      ? 'text-white'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId={prefersReducedMotion ? undefined : 'active-pill'}
                      className="absolute inset-0 rounded-full bg-violet-600/30 border border-violet-400/40 shadow-[0_0_12px_rgba(139,92,246,0.3)] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{link.name}</span>
                </a>
              )
            })}
          </div>

          {/* Action button & Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Desktop Resume CTA */}
            <div className="hidden sm:block">
              <MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-violet-500/10 border-violet-500/30 text-[var(--color-lavender)] hover:bg-violet-500/25 hover:text-white backdrop-blur-md px-3.5 py-1.5 h-auto text-xs font-semibold tracking-wide transition-all shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                >
                  <a
                    href={personalInfo.resumeUrl}
                    download="Radhika_Kandalkar_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Open"
                    className="inline-flex items-center gap-1.5"
                  >
                    <FileText size={13} />
                    <span>Resume</span>
                  </a>
                </Button>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-[var(--color-lavender)] hover:text-white cursor-pointer transition-all"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              data-cursor="Open"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        activeSection={activeSection}
        navLinks={NAV_LINKS}
      />
    </>
  )
}
