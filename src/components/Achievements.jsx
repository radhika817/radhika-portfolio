import { Trophy, Award, Medal, Flag, Sparkles } from 'lucide-react'
import { achievements } from '../data/content'

const ACHIEVEMENT_ICONS = {
  'sinhgad-hackathon': {
    icon: Trophy,
    color: '#fbbf24',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.35)',
    glow: '0 0 30px rgba(245, 158, 11, 0.2)',
  },
  'vellora-hackathon': {
    icon: Medal,
    color: '#a78bfa',
    bg: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.25)',
    glow: '0 0 20px rgba(139, 92, 246, 0.15)',
  },
  'project-expo': {
    icon: Award,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.1)',
    border: 'rgba(56, 189, 248, 0.25)',
    glow: '0 0 20px rgba(56, 189, 248, 0.15)',
  },
  'decode-sih': {
    icon: Medal,
    color: '#34d399',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.25)',
    glow: '0 0 20px rgba(16, 185, 129, 0.15)',
  },
  'sih-2026': {
    icon: Flag,
    color: '#f472b6',
    bg: 'rgba(244, 114, 182, 0.1)',
    border: 'rgba(244, 114, 182, 0.25)',
    glow: '0 0 20px rgba(244, 114, 182, 0.15)',
  },
}

/**
 * Achievements Section rendering all 5 achievements exactly as stated in README.md.
 */
export default function Achievements() {
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
      <div style={{ marginBottom: '3rem' }}>
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
      </div>

      {/* Achievements Cards Grid */}
      <div
        className="achievements-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {achievements.map((item) => {
          const config = ACHIEVEMENT_ICONS[item.id] || ACHIEVEMENT_ICONS['vellora-hackathon']
          const IconComponent = config.icon
          const isWinner = item.highlight

          return (
            <div
              key={item.id}
              className={`achievement-card ${isWinner ? 'achievement-card-featured' : ''}`}
              style={{
                position: 'relative',
                background: isWinner
                  ? 'linear-gradient(135deg, rgba(31, 20, 56, 0.85) 0%, rgba(19, 11, 36, 0.85) 100%)'
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
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
            </div>
          )
        })}
      </div>
    </section>
  )
}
