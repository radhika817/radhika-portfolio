import { motion } from 'framer-motion'
import {
  Briefcase,
  Network,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { experience } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const EXP_METADATA = {
  cisco: {
    icon: Network,
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.3)',
    type: 'AICTE Virtual Internship',
    skills: ['IP Addressing', 'Subnetting', 'Network Protocols', 'Connectivity Diagnosis', 'Troubleshooting'],
  },
  launched: {
    icon: Users,
    accent: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.3)',
    type: 'Leadership & Outreach',
    skills: ['Campus Outreach', 'Campaign Coordination', 'Student Engagement', 'Brand Ambassador'],
  },
}

/**
 * Experience Section with a glowing vertical timeline rendering
 * Cisco Networking Academy and LaunchEd Global EdTech roles.
 */
export default function Experience() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
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
        style={{ marginBottom: '3.5rem' }}
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
          <span>// 04. EXPERIENCE</span>
        </div>
        <h2
          id="experience-heading"
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '0.75rem',
          }}
        >
          Work & Leadership Experience
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '680px',
            lineHeight: 1.6,
          }}
        >
          Practical industry internships and student leadership roles developing technical rigor, problem-solving, and cross-functional coordination.
        </p>
      </motion.div>

      {/* Vertical Timeline Container */}
      <div
        className="timeline-container"
        style={{
          position: 'relative',
          paddingLeft: '2rem',
          maxWidth: '900px',
        }}
      >
        {/* Continuous Glowing Vertical Line */}
        <div
          className="timeline-vertical-line"
          style={{
            position: 'absolute',
            top: '1.5rem',
            bottom: '2rem',
            left: '11px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--color-violet), var(--color-accent-pink), rgba(139, 92, 246, 0.2))',
            boxShadow: '0 0 12px rgba(139, 92, 246, 0.45)',
          }}
        />

        {/* Timeline Entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {experience.map((item, idx) => {
            const meta = EXP_METADATA[item.id] || EXP_METADATA.cisco
            const IconComponent = meta.icon

            return (
              <motion.div
                key={item.id}
                className="timeline-item"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                style={{
                  position: 'relative',
                  paddingLeft: '1.75rem',
                }}
              >
                {/* Glowing Node Marker */}
                <div
                  className="timeline-node"
                  style={{
                    position: 'absolute',
                    left: '-2rem',
                    top: '0.25rem',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#07040d',
                    border: `2px solid ${meta.accent}`,
                    boxShadow: `0 0 16px ${meta.glow}, inset 0 0 8px ${meta.glow}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: meta.accent,
                    }}
                  />
                </div>

                {/* Experience Content Card */}
                <div
                  className="timeline-card"
                  style={{
                    background: 'rgba(19, 11, 36, 0.7)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.75rem',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                  }}
                >
                  {/* Card Header */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          marginBottom: '0.35rem',
                        }}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'rgba(139, 92, 246, 0.1)',
                            border: `1px solid ${meta.accent}44`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: meta.accent,
                          }}
                        >
                          <IconComponent size={17} />
                        </div>
                        <h3
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {item.role}
                        </h3>
                      </div>
                      <p
                        style={{
                          color: 'var(--color-violet-light)',
                          fontWeight: 500,
                          fontSize: '0.95rem',
                        }}
                      >
                        {item.organization}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <Calendar size={12} />
                        <span>{item.period}</span>
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities list directly from README.md */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 1.25rem 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                    }}
                  >
                    {item.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.65rem',
                          color: 'var(--text-secondary)',
                          fontSize: '0.92rem',
                          lineHeight: 1.55,
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          style={{
                            color: meta.accent,
                            flexShrink: 0,
                            marginTop: '0.2rem',
                          }}
                        />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills/Tags */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.45rem',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid rgba(139, 92, 246, 0.12)',
                    }}
                  >
                    {meta.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)',
                          background: 'rgba(139, 92, 246, 0.06)',
                          border: '1px solid rgba(139, 92, 246, 0.15)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-xs)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
