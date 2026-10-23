import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Copy,
  Check,
  MapPin,
  Send,
  Sparkles,
  ExternalLink,
  Clock,
  MessageSquare,
} from 'lucide-react'
import { contactInfo, personalInfo } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

function GithubIcon({ size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

/**
 * Contact Section with email, location, social profile links,
 * copy-email toast notification, and an interactive mailto contact form.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const prefersReducedMotion = useReducedMotion()

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactInfo.email)
      } else {
        // Fallback
        const textarea = document.createElement('textarea')
        textarea.value = contactInfo.email
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setToastMessage('✓ Email copied to clipboard: ' + contactInfo.email)
      setTimeout(() => {
        setCopied(false)
        setToastMessage('')
      }, 3000)
    } catch {
      setToastMessage('Email: ' + contactInfo.email)
      setTimeout(() => setToastMessage(''), 3000)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = formData
    const mailSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name || 'Recruiter'}`)
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Radhika Kandalkar Portfolio`
    )
    window.location.href = `mailto:${contactInfo.email}?subject=${mailSubject}&body=${mailBody}`

    setToastMessage('✓ Opening default mail client...')
    setTimeout(() => setToastMessage(''), 3500)
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        padding: '5rem 0 3.5rem',
        scrollMarginTop: '80px',
        position: 'relative',
      }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              background: 'rgba(19, 11, 36, 0.95)',
              border: '1px solid var(--border-glow)',
              color: '#ffffff',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              fontFamily: 'var(--font-mono)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(139, 92, 246, 0.4)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              pointerEvents: 'none',
            }}
          >
            <Sparkles size={16} color="var(--color-violet-light)" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '3rem' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--color-violet-light)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            marginBottom: '0.6rem',
          }}
        >
          <Sparkles size={14} />
          <span>// 07. CONNECT</span>
        </div>
        <h2
          id="contact-heading"
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '0.75rem',
          }}
        >
          Get In Touch
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '680px',
            lineHeight: 1.6,
          }}
        >
          Have a project in mind, an engineering internship opportunity, or want to discuss full-stack, Web3, or AI architectures? My inbox is always open.
        </p>
      </motion.div>

      {/* Contact Grid: Info Card + Compose Form */}
      <div
        className="contact-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '2rem',
        }}
      >
        {/* Left Card: Direct Contact & Socials */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(19, 11, 36, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
              }}
            >
              Direct Communication
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                marginBottom: '1.75rem',
              }}
            >
              I am actively looking for software engineering internships and innovative hackathon / builder collaborations.
            </p>

            {/* Email item with Copy button */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-violet-light)',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={18} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    EMAIL ADDRESS
                  </div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    style={{
                      color: 'var(--color-lavender)',
                      fontWeight: 600,
                      fontSize: '0.92rem',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block',
                    }}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="Copy"
                aria-label="Copy email address to clipboard"
                style={{
                  background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(139, 92, 246, 0.12)',
                  border: `1px solid ${copied ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)'}`,
                  color: copied ? '#6ee7b7' : 'var(--color-violet-light)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Location Item */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                  flexShrink: 0,
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  LOCATION & TIMEZONE
                </div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem' }}>
                  {contactInfo.location} (IST, UTC+5:30)
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles with placeholder handling */}
          <div>
            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                marginBottom: '0.75rem',
              }}
            >
              PROFILES & REPOSITORIES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {contactInfo.profiles.map((profile) => {
                const isPlaceholder = profile.placeholder || profile.url === '#'
                if (isPlaceholder) {
                  return (
                    <span
                      key={profile.name}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'not-allowed',
                      }}
                      title={`${profile.name} URL coming soon`}
                    >
                      <Clock size={12} style={{ opacity: 0.6 }} />
                      <span>{profile.name} (Soon)</span>
                    </span>
                  )
                }

                return (
                  <a
                    key={profile.name}
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Open"
                    aria-label={`Visit Radhika's ${profile.name} profile (opens in new tab)`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.45rem 0.95rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(139, 92, 246, 0.12)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--color-lavender)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {profile.name === 'GitHub' && <GithubIcon size={14} />}
                    <span>{profile.name}</span>
                    <ExternalLink size={12} />
                  </a>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Card: Interactive Mailto Contact Form */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(19, 11, 36, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-violet-light)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              marginBottom: '0.4rem',
            }}
          >
            <MessageSquare size={16} />
            <span>SEND A MESSAGE</span>
          </div>
          <h3
            style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
            }}
          >
            Compose an Email
          </h3>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.4rem',
                  }}
                >
                  YOUR NAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(7, 4, 13, 0.75)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.4rem',
                  }}
                >
                  YOUR EMAIL
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(7, 4, 13, 0.75)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.4rem',
                }}
              >
                SUBJECT
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                placeholder="Software Engineering Internship / Project"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(7, 4, 13, 0.75)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.4rem',
                }}
              >
                MESSAGE
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="Hi Radhika, I came across your portfolio and wanted to reach out regarding..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(7, 4, 13, 0.75)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s ease',
                }}
              />
            </div>

            <button
              type="submit"
              data-cursor="Open"
              style={{
                marginTop: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.6rem',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--color-violet), #6d28d9)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(139, 92, 246, 0.4)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Send Message</span>
              <Send size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
