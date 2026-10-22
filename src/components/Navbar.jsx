import { useState, useEffect } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/content'
import MagneticButton from './MagneticButton'
import MobileMenu from './MobileMenu'

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Terminal', href: '#terminal' },
  { name: 'Contact', href: '#contact' },
]

/**
 * Glassmorphism Navbar fixed on top with RK monogram logo,
 * smooth section links, Resume download CTA, and animated mobile menu.
 */
export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          background: isScrolled
            ? 'rgba(7, 4, 13, 0.88)'
            : 'rgba(7, 4, 13, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${
            isScrolled ? 'rgba(139, 92, 246, 0.22)' : 'rgba(139, 92, 246, 0.08)'
          }`,
          boxShadow: isScrolled
            ? '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(139, 92, 246, 0.12)'
            : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Monogram Logo "RK" */}
          <MagneticButton>
            <a
              href="#hero"
              data-cursor="Open"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  background:
                    'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(109, 40, 217, 0.15) 100%)',
                  border: '1.5px solid rgba(196, 181, 253, 0.45)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
                  letterSpacing: '-0.02em',
                }}
              >
                RK
              </span>
              <span
                style={{
                  display: 'none',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}
                className="navbar-brand-name"
              >
                {personalInfo.name}
              </span>
            </a>
          </MagneticButton>

          {/* Desktop Nav Links */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor="Open"
                  style={{
                    position: 'relative',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--color-lavender)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '0.35rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'all 0.2s ease',
                    background: isActive ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '20%',
                        right: '20%',
                        height: '2px',
                        background: 'var(--color-violet-light)',
                        borderRadius: '9999px',
                        boxShadow: '0 0 8px var(--color-violet)',
                      }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Action button & Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Desktop Resume CTA */}
            <div className="desktop-resume-btn">
              <MagneticButton>
                <a
                  href={personalInfo.resumeUrl}
                  download="Radhika_Kandalkar_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.5rem 1.1rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(139, 92, 246, 0.12)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--color-lavender)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <FileText size={15} />
                  <span>Resume</span>
                </a>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-hamburger-btn"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              data-cursor="Open"
              style={{
                display: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: isMobileMenuOpen ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.12)',
                border: '1px solid var(--border-medium)',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-lavender)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
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
