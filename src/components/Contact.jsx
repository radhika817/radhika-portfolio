import { useState } from 'react'
import { motion } from 'framer-motion'
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
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { contactInfo } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '@/lib/utils'

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
 * Sonner toast notifications, and an interactive contact form powered by shadcn inputs.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false)
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
        const textarea = document.createElement('textarea')
        textarea.value = contactInfo.email
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      toast.success(`Email copied: ${contactInfo.email}`)
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    } catch {
      toast.info(`Email: ${contactInfo.email}`)
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
    toast.success('Opening default mail client...')
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
              className="contact-email-row"
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

              {/* shadcn Button for Copy Email */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                data-cursor="Copy"
                aria-label="Copy email address to clipboard"
                className={cn(
                  "h-8 px-3 text-xs font-mono gap-1.5 transition-all shrink-0 rounded-[var(--radius-sm)]",
                  copied
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25"
                    : "bg-violet-500/10 border-violet-500/25 text-[var(--color-violet-light)] hover:bg-violet-500/20 hover:text-white"
                )}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </Button>
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

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono text-[var(--text-muted)] mb-1.5 uppercase tracking-wider"
                >
                  YOUR NAME
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 bg-[#07040d]/75 border-violet-500/25 focus-visible:border-violet-400 focus-visible:ring-violet-400/30 text-white placeholder:text-muted-foreground text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono text-[var(--text-muted)] mb-1.5 uppercase tracking-wider"
                >
                  YOUR EMAIL
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10 bg-[#07040d]/75 border-violet-500/25 focus-visible:border-violet-400 focus-visible:ring-violet-400/30 text-white placeholder:text-muted-foreground text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-xs font-mono text-[var(--text-muted)] mb-1.5 uppercase tracking-wider"
              >
                SUBJECT
              </label>
              <Input
                id="contact-subject"
                type="text"
                required
                placeholder="Software Engineering Internship / Project"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="h-10 bg-[#07040d]/75 border-violet-500/25 focus-visible:border-violet-400 focus-visible:ring-violet-400/30 text-white placeholder:text-muted-foreground text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-mono text-[var(--text-muted)] mb-1.5 uppercase tracking-wider"
              >
                MESSAGE
              </label>
              <Textarea
                id="contact-message"
                required
                rows={4}
                placeholder="Hi Radhika, I came across your portfolio and wanted to reach out regarding..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-28 bg-[#07040d]/75 border-violet-500/25 focus-visible:border-violet-400 focus-visible:ring-violet-400/30 text-white placeholder:text-muted-foreground resize-y text-sm font-sans"
              />
            </div>

            {/* shadcn Button for Form Submit */}
            <Button
              type="submit"
              data-cursor="Open"
              className="mt-2 w-full sm:w-auto self-start rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[#6d28d9] text-white hover:opacity-90 shadow-[0_0_24px_rgba(139,92,246,0.4)] px-6 py-2.5 text-sm font-semibold gap-2 transition-all cursor-pointer"
            >
              <span>Send Message</span>
              <Send size={15} />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
