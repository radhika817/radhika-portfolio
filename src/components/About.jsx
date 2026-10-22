import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, BookOpen, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { personalInfo } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Animated number counter that counts up smoothly when scrolled into view
 */
function AnimatedCounter({ end, decimals = 0, suffix = '', duration = 1.8 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    if (!isInView) return

    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3)
      const currentVal = ease * end
      setCount(currentVal)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration, prefersReducedMotion])

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  )
}

/**
 * About Section with verified background, academic credentials,
 * and animated stat counters for CGPA, questions, and hackathon competitors.
 */
export default function About() {
  const prefersReducedMotion = useReducedMotion()

  const statsData = [
    {
      id: 'cgpa',
      value: 8.51,
      decimals: 2,
      suffix: ' / 10',
      label: 'Engineering CGPA',
      caption: 'MIT Academy of Engineering, Pune (2024–2028)',
      icon: <GraduationCap size={22} color="var(--color-violet-light)" />,
    },
    {
      id: 'questions',
      value: 198,
      decimals: 0,
      suffix: '',
      label: 'Curated Questions',
      caption: 'Built into PrepPulse across DSA, DBMS, OS & Networks',
      icon: <BookOpen size={22} color="var(--color-violet-light)" />,
    },
    {
      id: 'participants',
      value: 500,
      decimals: 0,
      suffix: '+',
      label: 'Participants Outranked',
      caption: '1st Prize at Sinhgad Hackathon 2026 (~100 teams)',
      icon: <Award size={22} color="var(--color-violet-light)" />,
    },
  ]

  return (
    <section
      id="about"
      style={{
        padding: '5rem 0 3.5rem',
        scrollMarginTop: '80px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.12)',
      }}
    >
      {/* Section Tag & Heading */}
      <div style={{ marginBottom: '2.5rem' }}>
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
          <span>// 01. BACKGROUND</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          About Me
        </h2>
      </div>

      {/* Main Grid: Bio + Academic Highlight */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}
      >
        {/* Left: Detailed Bio */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            boxShadow: 'var(--glow-card)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '1.08rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem',
              }}
            >
              I'm <strong style={{ color: 'var(--text-primary)' }}>{personalInfo.name}</strong>, a Computer
              Engineering student at <strong style={{ color: 'var(--color-lavender)' }}>{personalInfo.education.institution}</strong>.
            </p>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem',
              }}
            >
              I enjoy building full-stack applications and exploring AI integrations, Web3, and scalable systems.
              This portfolio helps recruiters and engineering teams quickly understand what I've built, the problems
              each project solves, and the technical decisions behind the work.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-mono)',
              borderTop: '1px solid rgba(139, 92, 246, 0.1)',
              paddingTop: '1rem',
            }}
          >
            <MapPin size={16} color="var(--color-violet-light)" />
            <span>Based in {personalInfo.location}</span>
          </div>
        </div>

        {/* Right: Academic Focus Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(19, 11, 36, 0.8) 0%, rgba(29, 17, 54, 0.7) 100%)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            boxShadow: 'var(--glow-card)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(139, 92, 246, 0.15)',
                color: 'var(--color-lavender)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                marginBottom: '1rem',
              }}
            >
              EDUCATION
            </div>
            <h3
              style={{
                fontSize: '1.35rem',
                color: 'var(--text-primary)',
                fontWeight: 600,
                marginBottom: '0.35rem',
              }}
            >
              {personalInfo.education.degree}
            </h3>
            <p style={{ color: 'var(--color-violet-light)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              {personalInfo.education.institution}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontFamily: 'var(--font-mono)' }}>
              Batch: {personalInfo.education.period} • CGPA: {personalInfo.education.cgpa}
            </p>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {['Full-Stack Dev', 'AI Integrations', 'Web3 & Sepolia', 'Scalable Systems'].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-xs)',
                  background: 'rgba(139, 92, 246, 0.1)',
                  color: 'var(--color-lavender-light)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Stat Counters Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {statsData.map((stat) => (
          <div
            key={stat.id}
            data-cursor="View"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.6rem',
              boxShadow: 'var(--glow-card)',
              transition: 'all 0.25s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  padding: '0.5rem',
                  borderRadius: '10px',
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stat.icon}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}
              >
                VERIFIED
              </span>
            </div>

            <div
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}
            >
              <AnimatedCounter
                end={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
              />
            </div>

            <div
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-lavender)',
                marginBottom: '0.25rem',
              }}
            >
              {stat.label}
            </div>

            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.45,
              }}
            >
              {stat.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
