import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, ArrowUpRight } from 'lucide-react'
import { personalInfo } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * MobileMenu component providing full-screen animated overlay for mobile screens
 * with keyboard accessibility (Escape to close, focus trap) and body scroll lock.
 */
export default function MobileMenu({ isOpen, setIsOpen, activeSection, navLinks }) {
  const prefersReducedMotion = useReducedMotion()
  const menuRef = useRef(null)
  const previousActiveElementRef = useRef(null)

  // Lock body scroll, trap focus, and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement
      document.body.style.overflow = 'hidden'

      requestAnimationFrame(() => {
        if (menuRef.current) {
          const focusable = menuRef.current.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
          )
          if (focusable.length > 0) {
            focusable[0].focus()
          }
        }
      })

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
          return
        }

        // Trap focus inside menu
        if (e.key === 'Tab' && menuRef.current) {
          const focusable = Array.from(
            menuRef.current.querySelectorAll(
              'a, button, [tabindex]:not([tabindex="-1"])'
            )
          )
          if (focusable.length === 0) return

          const first = focusable[0]
          const last = focusable[focusable.length - 1]

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault()
              last.focus()
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault()
              first.focus()
            }
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
        if (
          previousActiveElementRef.current &&
          typeof previousActiveElementRef.current.focus === 'function'
        ) {
          previousActiveElementRef.current.focus()
        }
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, setIsOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'rgba(7, 4, 13, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '5.5rem 2rem 2.5rem',
            overflowY: 'auto',
          }}
        >
          {/* Nav Links List */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginTop: '1rem',
            }}
          >
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1)
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  data-cursor="Open"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    color: isActive ? 'var(--color-lavender)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(139, 92, 246, 0.12)',
                  }}
                >
                  <span>{link.name}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: isActive ? 'var(--color-violet)' : 'var(--text-muted)',
                    }}
                  >
                    0{index + 1}
                  </span>
                </motion.a>
              )
            })}
          </nav>

          {/* Bottom Actions: Resume & Email */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '2.5rem',
            }}
          >
            <a
              href={personalInfo.resumeUrl}
              download="Radhika_Kandalkar_Resume.pdf"
              onClick={() => setIsOpen(false)}
              data-cursor="Open"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.9rem',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--color-violet), #6d28d9)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
              }}
            >
              <FileText size={18} />
              <span>Download Resume</span>
            </a>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                paddingTop: '0.5rem',
              }}
            >
              <span>{personalInfo.location}</span>
              <a
                href={`mailto:${personalInfo.email}`}
                style={{
                  color: 'var(--color-lavender)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <span>Email Me</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
