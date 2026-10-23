import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Trophy, Clock, Route, BrainCircuit, Blocks } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePointerType } from '../hooks/usePointerType'

function GithubIcon({ size = 14, ...props }) {
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
 * Checks whether a URL is a real link or an unconfigured placeholder
 */
function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  return trimmed.startsWith('http://') || trimmed.startsWith('https://')
}

/**
 * Visual banner showing tailored futuristic gradient graphic for each project
 * until real application screenshots are uploaded.
 */
function ProjectVisualBanner({ project }) {
  const configs = {
    smartride: {
      gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(139, 92, 246, 0.25) 100%)',
      borderColor: 'rgba(56, 189, 248, 0.25)',
      accentColor: '#38bdf8',
      icon: <Route size={24} color="#38bdf8" />,
      tag: 'GEOSPATIAL ROUTE MATCHING',
      pattern: 'radial-gradient(circle at 20% 40%, rgba(56, 189, 248, 0.25) 0%, transparent 50%)',
    },
    preppulse: {
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(16, 185, 129, 0.15) 100%)',
      borderColor: 'rgba(168, 85, 247, 0.3)',
      accentColor: '#c084fc',
      icon: <BrainCircuit size={24} color="#c084fc" />,
      tag: '198 QUESTIONS // GROQ LLM EVAL',
      pattern: 'radial-gradient(circle at 80% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
    },
    socio3: {
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(139, 92, 246, 0.25) 100%)',
      borderColor: 'rgba(245, 158, 11, 0.35)',
      accentColor: '#fbbf24',
      icon: <Blocks size={24} color="#fbbf24" />,
      tag: 'SEPOLIA dAPP // IPFS STORAGE',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.2) 0%, transparent 60%)',
    },
  }

  const config = configs[project.id] || configs.smartride

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '140px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.25rem',
        overflow: 'hidden',
        background: '#0e081c',
        border: `1px solid ${config.borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
      }}
    >
      {/* Dynamic background gradient mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: config.gradient,
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: config.pattern,
        }}
      />
      {/* Decorative Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.6,
        }}
      />

      {/* Top Banner Row: Icon + Architecture Badge */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(7, 4, 13, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {config.icon}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-primary)',
            background: 'rgba(7, 4, 13, 0.65)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {config.tag}
        </span>
      </div>

      {/* Bottom Row Tag */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-lavender)',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            opacity: 0.9,
          }}
        >
          System Architecture Preview
        </span>
      </div>
    </div>
  )
}

/**
 * ProjectCard component with 3D tilt hover physics, cursor-tracking border glow,
 * tailored gradient visuals, and placeholder-safe link actions.
 */
export default function ProjectCard({ project, onOpenCaseStudy }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -250, y: -250 })
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

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
            padding: '1.75rem',
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
            {/* Visual Banner Preview */}
            <ProjectVisualBanner project={project} />

            {/* Top row: Award Badge or category */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.85rem',
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
                  FEATURED WORK
                </span>
              )}
            </div>

            {/* Header: Title and Subtitle */}
            <div style={{ marginBottom: '0.85rem' }}>
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
                  fontSize: '0.88rem',
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
                fontSize: '0.92rem',
                lineHeight: 1.6,
                marginBottom: '1.25rem',
              }}
            >
              {project.description}
            </p>

            {/* Tech Stack Chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
                marginBottom: '1.5rem',
              }}
            >
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.22rem 0.6rem',
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

          {/* Action Links Bar */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
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
                aria-label={`Launch live demo for ${project.title} (opens in new tab)`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--color-violet), #6d28d9)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.35)',
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
                  padding: '0.42rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
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
                aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--color-lavender)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <GithubIcon size={14} />
                <span>Source</span>
              </a>
            ) : (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.42rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'not-allowed',
                  userSelect: 'none',
                }}
                title="Repository link being finalized"
              >
                <GithubIcon size={13} style={{ opacity: 0.5 }} />
                <span>Repo coming soon</span>
              </span>
            )}

            {/* Case Study Trigger */}
            {onOpenCaseStudy && (
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project)}
                data-cursor="View"
                aria-label={`Read ${project.title} case study and architecture breakdown`}
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.42rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-violet-light)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
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
