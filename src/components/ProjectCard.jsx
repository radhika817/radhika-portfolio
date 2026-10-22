import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, Trophy, Clock } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePointerType } from '../hooks/usePointerType'

/**
 * Checks whether a URL is a real, active link or an unconfigured placeholder
 */
function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  return trimmed.startsWith('http://') || trimmed.startsWith('https://')
}

/**
 * ProjectCard component with 3D tilt hover physics, cursor-tracking border glow,
 * "1st Place, Sinhgad Hackathon 2026" badge on Socio3, and placeholder handling
 * showing disabled "Coming soon" buttons instead of broken links.
 */
export default function ProjectCard({ project, onOpenCaseStudy }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -250, y: -250 })
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()

  // Motion values for 3D tilt
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  // Spring physics for tilt response
  const springConfig = { damping: 18, stiffness: 180, mass: 0.2 }
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !hasFinePointer || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top

    setMousePos({ x: relX, y: relY })
    tiltX.set(relX / rect.width - 0.5)
    tiltY.set(relY / rect.height - 0.5)
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: -250, y: -250 })
    tiltX.set(0)
    tiltY.set(0)
  }

  const shouldTilt = hasFinePointer && !prefersReducedMotion
  const isLiveDemoValid = isValidUrl(project.liveUrl)
  const isGithubValid = isValidUrl(project.githubUrl)
  const hasAward = project.award || project.id === 'socio3'

  return (
    <div style={{ perspective: 1000, height: '100%' }}>
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="project-card"
        data-cursor="View"
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          padding: '1px',
          overflow: 'hidden',
          height: '100%',
          transformStyle: 'preserve-3d',
          rotateX: shouldTilt ? rotateX : 0,
          rotateY: shouldTilt ? rotateY : 0,
          boxShadow: isHovered ? 'var(--glow-card-hover)' : 'var(--glow-card)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Dynamic Cursor-Tracking Spotlight Border Glow */}
        {shouldTilt && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'var(--radius-lg)',
              background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196, 181, 253, 0.65), rgba(139, 92, 246, 0.3) 40%, transparent 75%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

        {/* Static subtle border fallback */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Internal Content Container */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'var(--bg-card)',
            borderRadius: 'calc(var(--radius-lg) - 1px)',
            padding: '2rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            transform: 'translateZ(15px)',
          }}
        >
          {/* Subtle interior spotlight sheen */}
          {shouldTilt && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.1), transparent 65%)`,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.25s ease',
                pointerEvents: 'none',
              }}
            />
          )}

          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Top row: Award Badge for Socio3 or category */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                minHeight: '26px',
              }}
            >
              {hasAward ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(245, 158, 11, 0.14)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    color: '#fbbf24',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    boxShadow: '0 0 15px rgba(245, 158, 11, 0.25)',
                  }}
                >
                  <Trophy size={14} color="#f59e0b" />
                  <span>1st Place, Sinhgad Hackathon 2026</span>
                </div>
              ) : (
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                  }}
                >
                  FEATURED PROJECT
                </span>
              )}
            </div>

            {/* Header: Title and Subtitle */}
            <div style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.25rem',
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-violet-light)',
                  fontWeight: 500,
                }}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Project Description */}
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.65,
                marginBottom: '1.4rem',
              }}
            >
              {project.description}
            </p>

            {/* Tech Stack Chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1.75rem',
              }}
            >
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(139, 92, 246, 0.12)',
                    color: 'var(--color-lavender)',
                    border: '1px solid rgba(139, 92, 246, 0.22)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links Bar with Placeholder Handling */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              borderTop: '1px solid rgba(139, 92, 246, 0.12)',
              paddingTop: '1.25rem',
            }}
          >
            {/* Live Demo Button / Coming Soon */}
            {isLiveDemoValid ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--color-violet), #6d28d9)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.35)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Live Demo</span>
                <ExternalLink size={13} />
              </a>
            ) : (
              <span
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
                  userSelect: 'none',
                }}
                title="Live demo deployment coming soon"
              >
                <Clock size={12} />
                <span>Demo coming soon</span>
              </span>
            )}

            {/* GitHub Repo Button / Coming Soon */}
            {isGithubValid ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--color-lavender)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Github size={14} />
                <span>Source Code</span>
              </a>
            ) : (
              <span
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
                  userSelect: 'none',
                }}
                title="Repository link being finalized"
              >
                <Github size={13} style={{ opacity: 0.5 }} />
                <span>Repo coming soon</span>
              </span>
            )}

            {/* Case Study Trigger */}
            {onOpenCaseStudy && (
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project)}
                data-cursor="View"
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-violet-light)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  background: 'rgba(139, 92, 246, 0.08)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Case Study →</span>
              </button>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  )
}
