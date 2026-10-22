import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, FileText, Mail } from 'lucide-react'
import { personalInfo } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import MagneticButton from './MagneticButton'
import Avatar3D from './Avatar3D'

// Ambient particles orbiting near the avatar
const AMBIENT_PARTICLES = [
  { id: 1, top: '15%', left: '10%', size: 4, delay: '0s', duration: '5s' },
  { id: 2, top: '25%', right: '12%', size: 3, delay: '1.2s', duration: '6.5s' },
  { id: 3, bottom: '20%', left: '15%', size: 5, delay: '2.5s', duration: '7s' },
  { id: 4, bottom: '25%', right: '18%', size: 3, delay: '0.8s', duration: '5.5s' },
  { id: 5, top: '55%', left: '5%', size: 4, delay: '1.8s', duration: '6.2s' },
]

/**
 * Hero component providing full-screen hero layout, availability badge,
 * large gradient heading, typewriter role animation, short tagline,
 * magnetic CTAs, 3D developer avatar with aurora glow, and pulsing scroll indicator.
 */
export default function Hero() {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 5rem',
        overflow: 'hidden',
      }}
    >
      {/* Subtle perspective grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        className="hero-grid-container"
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(320px, 1fr)',
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
              fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
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

          {/* Tagline from README.md */}
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

          {/* Primary Hero CTAs with Magnetic Effect */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '0.75rem',
              alignItems: 'center',
            }}
          >
            {/* View Projects */}
            <MagneticButton>
              <a
                href="#projects"
                data-cursor="View"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.6rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--color-violet) 0%, #6d28d9 100%)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  boxShadow: '0 0 24px rgba(139, 92, 246, 0.45)',
                  transition: 'all 0.25s ease',
                  border: '1px solid rgba(196, 181, 253, 0.4)',
                }}
              >
                <span>View Projects</span>
                <ArrowDown size={17} />
              </a>
            </MagneticButton>

            {/* Download Resume */}
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
                  gap: '0.5rem',
                  padding: '0.85rem 1.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(139, 92, 246, 0.1)',
                  color: 'var(--color-lavender)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: '1px solid var(--border-medium)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                }}
              >
                <FileText size={17} />
                <span>Download Resume</span>
              </a>
            </MagneticButton>

            {/* Contact Me */}
            <MagneticButton>
              <a
                href="#contact"
                data-cursor="Open"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  border: '1px solid var(--border-glass)',
                  transition: 'all 0.25s ease',
                }}
              >
                <Mail size={17} />
                <span>Contact Me</span>
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Column: 3D Avatar, Aurora Glow, and Particles */}
        <div
          className="hero-avatar-column"
          data-cursor="Drag"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            minHeight: '440px',
          }}
        >
          {/* Animated Aurora Glow behind Avatar */}
          <div className="hero-aurora-glow" aria-hidden="true" />

          {/* Floating Ambient Particles */}
          {!prefersReducedMotion && (
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {AMBIENT_PARTICLES.map((p) => (
                <div
                  key={p.id}
                  className="hero-particle"
                  style={{
                    top: p.top,
                    left: p.left,
                    right: p.right,
                    bottom: p.bottom,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                  }}
                />
              ))}
            </div>
          )}

          {/* 3D Avatar */}
          <Avatar3D />
        </div>
      </div>

      {/* Pulsing Scroll Indicator */}
      <motion.a
        href="#projects"
        data-cursor="Open"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          zIndex: 5,
        }}
      >
        <span>Scroll</span>
        <div className="mouse-scroll-pill">
          <div className="mouse-scroll-dot" />
        </div>
      </motion.a>
    </section>
  )
}
