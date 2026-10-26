import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Award, Medal, Flag, Sparkles } from 'lucide-react'
import { achievements } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Timeline, TimelineItem, TimelineIcon, TimelineContent } from '@/components/ui/timeline'
import { Badge } from '@/components/ui/badge'

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
    bg: 'rgba(245, 158, 11, 0.14)',
    border: 'rgba(245, 158, 11, 0.4)',
    glow: '0 0 32px rgba(245, 158, 11, 0.22)',
    metrics: [
      { end: 100, suffix: '', label: 'Teams Competed' },
      { end: 500, suffix: '+', label: 'Participants Outranked' },
    ],
  },
  'vellora-hackathon': {
    icon: Medal,
    color: '#a78bfa',
    bg: 'rgba(139, 92, 246, 0.12)',
    border: 'rgba(139, 92, 246, 0.3)',
    glow: '0 0 20px rgba(139, 92, 246, 0.15)',
    metrics: [
      { end: 400, suffix: '+', label: 'Participating Teams' },
      { end: 10, prefix: 'Top ', suffix: '', label: 'Final Standing' },
    ],
  },
  'project-expo': {
    icon: Award,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.3)',
    glow: '0 0 20px rgba(56, 189, 248, 0.15)',
    metrics: [
      { end: 70, suffix: '+', label: 'Participating Teams' },
      { end: 6, prefix: 'Top ', suffix: '', label: 'Final Rank' },
    ],
  },
  'decode-sih': {
    icon: Medal,
    color: '#34d399',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.3)',
    glow: '0 0 20px rgba(16, 185, 129, 0.15)',
    metrics: [
      { end: 1000, suffix: '+', label: 'Teams in Pool' },
      { end: 50, prefix: 'Top ', suffix: '', label: 'Selected Tier' },
    ],
  },
  'sih-2026': {
    icon: Flag,
    color: '#f472b6',
    bg: 'rgba(244, 114, 182, 0.12)',
    border: 'rgba(244, 114, 182, 0.3)',
    glow: '0 0 20px rgba(244, 114, 182, 0.15)',
    metrics: [
      { end: 1, suffix: 'st Round', label: 'Selection Qualified' },
      { end: 2026, suffix: '', label: 'Edition Year' },
    ],
  },
}

/**
 * Achievements Section with stat counters and 21st.dev inspired Timeline component
 */
export default function Achievements() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
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
          id="achievements-heading"
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

      {/* High-Impact Stat Counters Strip */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        <div className="bg-[#130b24]/70 border border-amber-500/30 rounded-xl p-4 md:p-5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="text-2xl md:text-3xl font-extrabold text-amber-400 font-display mb-1">
            <AnimatedCounter end={100} suffix=" Teams" />
          </div>
          <div className="text-xs md:text-sm text-[var(--text-secondary)]">
            Sinhgad Hackathon field
          </div>
        </div>

        <div className="bg-[#130b24]/70 border border-violet-500/25 rounded-xl p-4 md:p-5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="text-2xl md:text-3xl font-extrabold text-[var(--color-violet-light)] font-display mb-1">
            <AnimatedCounter end={500} suffix="+ Devs" />
          </div>
          <div className="text-xs md:text-sm text-[var(--text-secondary)]">
            Outranked in 24hr sprint
          </div>
        </div>

        <div className="bg-[#130b24]/70 border border-sky-400/25 rounded-xl p-4 md:p-5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="text-2xl md:text-3xl font-extrabold text-sky-400 font-display mb-1">
            <AnimatedCounter end={400} suffix="+ Teams" />
          </div>
          <div className="text-xs md:text-sm text-[var(--text-secondary)]">
            Vellora Hackathon pool
          </div>
        </div>

        <div className="bg-[#130b24]/70 border border-emerald-400/25 rounded-xl p-4 md:p-5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-display mb-1">
            <AnimatedCounter end={1000} suffix="+ Pool" />
          </div>
          <div className="text-xs md:text-sm text-[var(--text-secondary)]">
            Decode SIH national pool
          </div>
        </div>
      </motion.div>

      {/* 21st.dev inspired Timeline Component */}
      <Timeline className="mt-8">
        {achievements.map((item, index) => {
          const config = ACHIEVEMENT_CONFIGS[item.id] || ACHIEVEMENT_CONFIGS['vellora-hackathon']
          const IconComponent = config.icon
          const isWinner = item.highlight

          return (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TimelineItem>
                <TimelineIcon
                  style={{
                    backgroundColor: isWinner ? 'rgba(245, 158, 11, 0.16)' : '#0d0718',
                    borderColor: config.border,
                    color: config.color,
                    boxShadow: isWinner ? config.glow : undefined,
                  }}
                >
                  <IconComponent size={22} />
                </TimelineIcon>

                <TimelineContent
                  data-cursor="View"
                  className={isWinner ? 'border-amber-500/40 bg-gradient-to-br from-[#1f1438]/90 to-[#130b24]/90 shadow-[0_0_35px_rgba(245,158,11,0.18)]' : ''}
                >
                  {/* Top Bar: Date + Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-[var(--color-violet-light)] tracking-wider">
                      {item.date}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: config.bg,
                        borderColor: config.border,
                        color: config.color,
                      }}
                    >
                      {item.badge}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold mb-2 tracking-tight ${isWinner ? 'text-lg md:text-xl text-white' : 'text-base md:text-lg text-[var(--text-primary)]'}`}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] text-sm md:text-[0.95rem] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Metrics Chips */}
                  {config.metrics && config.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 pt-3 border-t border-violet-500/15">
                      {config.metrics.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono"
                        >
                          <span className="font-bold" style={{ color: config.color }}>
                            <AnimatedCounter
                              end={metric.end}
                              prefix={metric.prefix || ''}
                              suffix={metric.suffix || ''}
                            />
                          </span>
                          <span className="text-[var(--text-muted)]">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </TimelineContent>
              </TimelineItem>
            </motion.div>
          )
        })}
      </Timeline>
    </section>
  )
}
