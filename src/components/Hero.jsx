import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Hero component providing full-screen hero layout, availability badge,
 * large gradient heading, typewriter role animation, and tagline.
 */
export default function Hero({ avatarSlot, ctaSlot, scrollIndicatorSlot }) {
  const prefersReducedMotion = useReducedMotion()
  const fullRole = personalInfo.title // "Full-Stack Developer · AI · Web3"
  const [displayedRole, setDisplayedRole] = useState(prefersReducedMotion ? fullRole : '')
  const [isTypingDone, setIsTypingDone] = useState(prefersReducedMotion)

  // Typewriter effect for role
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedRole(fullRole)
      setIsTypingDone(true)
      return
    }

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullRole.length) {
        setDisplayedRole(fullRole.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsTypingDone(true)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [fullRole, prefersReducedMotion])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 3rem',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left Column: Text and Intro */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Availability Status Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#6ee7b7',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.15)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                  animation: prefersReducedMotion ? 'none' : 'pulse 2s infinite',
                }}
              />
              Available for Opportunities & Internships
            </span>
          </div>

          {/* Name Header */}
          <h1
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 10%, #d8b4fe 55%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {personalInfo.name}
          </h1>

          {/* Typewriter Role Line */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
              color: 'var(--color-lavender)',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              minHeight: '2rem',
            }}
          >
            <span>{displayedRole}</span>
            <span
              style={{
                display: 'inline-block',
                marginLeft: '2px',
                width: '2px',
                height: '1.2em',
                backgroundColor: 'var(--color-violet-light)',
                opacity: isTypingDone ? 0.7 : 1,
                animation: prefersReducedMotion ? 'none' : 'blink 1s step-end infinite',
              }}
            />
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '560px',
            }}
          >
            {personalInfo.tagline}
          </p>

          {/* CTA Slot */}
          {ctaSlot && <div style={{ marginTop: '0.75rem' }}>{ctaSlot}</div>}
        </motion.div>

        {/* Right Column: Avatar Slot (Desktop Right, Mobile Top) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            minHeight: '380px',
          }}
        >
          {avatarSlot}
        </div>
      </div>

      {/* Scroll indicator slot */}
      {scrollIndicatorSlot}
    </section>
  )
}
