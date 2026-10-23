import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Award, Medal, Flag, Sparkles, TrendingUp, Users } from 'lucide-react'
import { achievements } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Animated number counter with smooth cubic ease-out
 */
function AnimatedCounter({ end, decimals = 0, prefix = '', suffix = '', duration = 1.8 }) {
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
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  )
}

const ACHIEVEMENT_CONFIGS = {
  'sinhgad-hackathon': {
    icon: Trophy,
    color: '#fbbf24',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.35)',
    glow: '0 0 32px rgba(245, 158, 11, 0.22)',
    metrics: [
      { end: 100, suffix: '', label: 'Teams Competed' },
      { end: 500, suffix: '+', label: 'Participants Outranked' },
    ],
  },
  'vellora-hackathon': {
    icon: Medal,
    color: '#a78bfa',
    bg: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.25)',
    glow: '0 0 20px rgba(139, 92, 246, 0.15)',
    metrics: [
      { end: 400, suffix: '+', label: 'Participating Teams' },
      { end: 10, prefix: 'Top ', suffix: '', label: 'Final Standing' },
    ],
  },
  'project-expo': {
    icon: Award,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.1)',
    border: 'rgba(56, 189, 248, 0.25)',
    glow: '0 0 20px rgba(56, 189, 248, 0.15)',
    metrics: [
      { end: 70, suffix: '+', label: 'Participating Teams' },
      { end: 6, prefix: 'Top ', suffix: '', label: 'Final Rank' },
    ],
  },
  'decode-sih': {
    icon: Medal,
    color: '#34d399',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.25)',
    glow: '0 0 20px rgba(16, 185, 129, 0.15)',
    metrics: [
      { end: 1000, suffix: '+', label: 'Teams in Pool' },
      { end: 50, prefix: 'Top ', suffix: '', label: 'Selected Tier' },
    ],
  },
  'sih-2026': {
    icon: Flag,
    color: '#f472b6',
    bg: 'rgba(244, 114, 182, 0.1)',
    border: 'rgba(244, 114, 182, 0.25)',
    glow: '0 0 20px rgba(244, 114, 182, 0.15)',
    metrics: [
      { end: 1, suffix: 'st Round', label: 'Selection Qualified' },
      { end: 2026, suffix: '', label: 'Edition Year' },
    ],
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Achievements Section with scroll-reveal animations and animated number counters.
 */
export default function Achievements() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="achievements"
      style={{
        padding: '5rem 0 3.5rem',
        scrollMarginTop: '80px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.12)',
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '2.5rem' }}
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
          <span>// 05. HONORS</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '0.75rem',
          }}
        >
          Achievements & Recognition
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '680px',
            lineHeight: 1.6,
          }}
        >
          Recognized across competitive university hackathons, state-level project expos, and national innovation challenges.
        </p>
      </motion.div>

      {/* High-Impact Animated Counters Strip */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            background: 'rgba(19, 11, 36, 0.7)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#fbbf24',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
              marginBottom: '0.25rem',
            }}
          >
            <AnimatedCounter end={100} suffix=" Teams" />
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Sinhgad Hackathon field
          </div>
        </div>

        <div
          style={{
            background: 'rgba(19, 11, 36, 0.7)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#a78bfa',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
              marginBottom: '0.25rem',
            }}
          >
            <AnimatedCounter end={500} suffix="+ Participants" />
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Outranked in 24hr sprint
          </div>
        </div>

        <div
          style={{
            background: 'rgba(19, 11, 36, 0.7)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#38bdf8',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
              marginBottom: '0.25rem',
            }}
          >
            <AnimatedCounter end={400} suffix="+ Teams" />
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Vellora Hackathon pool
          </div>
        </div>

        <div
          style={{
            background: 'rgba(19, 11, 36, 0.7)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#34d399',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
              marginBottom: '0.25rem',
            }}
          >
            <AnimatedCounter end={1000} suffix="+ Teams" />
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Decode SIH national pool
          </div>
        </div>
      </motion.div>

      {/* Staggered Scroll-Reveal Achievements Cards */}
      <motion.div
        className="achievements-grid"
        variants={prefersReducedMotion ? {} : containerVariants}
        initial={prefersReducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {achievements.map((item) => {
          const config = ACHIEVEMENT_CONFIGS[item.id] || ACHIEVEMENT_CONFIGS['vellora-hackathon']
          const IconComponent = config.icon
          const isWinner = item.highlight

          return (
            <motion.div
              key={item.id}
              variants={prefersReducedMotion ? {} : cardVariants}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { y: -4, transition: { duration: 0.2 } }
              }
              className={`achievement-card ${isWinner ? 'achievement-card-featured' : ''}`}
              style={{
                position: 'relative',
                background: isWinner
                  ? 'linear-gradient(135deg, rgba(31, 20, 56, 0.88) 0%, rgba(19, 11, 36, 0.88) 100%)'
                  : 'rgba(19, 11, 36, 0.65)',
                border: `1px solid ${isWinner ? config.border : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isWinner ? config.glow : '0 8px 30px rgba(0, 0, 0, 0.3)',
                gridColumn: isWinner ? '1 / -1' : 'auto',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div>
                {/* Card Top Row: Icon + Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: isWinner ? '48px' : '40px',
                      height: isWinner ? '48px' : '40px',
                      borderRadius: '12px',
                      background: config.bg,
                      border: `1px solid ${config.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: config.color,
                      boxShadow: isWinner ? `0 0 16px ${config.color}55` : 'none',
                    }}
                  >
                    <IconComponent size={isWinner ? 24 : 20} />
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: config.color,
                      background: config.bg,
                      border: `1px solid ${config.border}`,
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Achievement Title */}
                <h3
                  style={{
                    fontSize: isWinner ? '1.45rem' : '1.15rem',
                    fontWeight: 700,
                    color: isWinner ? '#ffffff' : 'var(--text-primary)',
                    marginBottom: '0.65rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>

                {/* Achievement Description verbatim from README */}
                <p
                  style={{
                    color: isWinner ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: isWinner ? '1.02rem' : '0.92rem',
                    lineHeight: 1.6,
                    opacity: isWinner ? 0.95 : 0.85,
                  }}
                >
                  {item.description}
                </p>

                {/* Sub-Metrics Counters for each card */}
                {config.metrics && config.metrics.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      marginTop: '1.25rem',
                    }}
                  >
                    {config.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.4rem 0.75rem',
                          display: 'inline-flex',
                          alignItems: 'baseline',
                          gap: '0.4rem',
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontFamily: 'var(--font-display)',
                            color: config.color,
                            fontSize: '0.95rem',
                          }}
                        >
                          <AnimatedCounter
                            end={metric.end}
                            prefix={metric.prefix || ''}
                            suffix={metric.suffix || ''}
                          />
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Decorative footer tag */}
              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(139, 92, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {isWinner ? '★ 1st Place Champion' : 'Verified Finalist'}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: config.color,
                  }}
                >
                  Competitive Track
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
