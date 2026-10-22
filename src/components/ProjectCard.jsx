import { useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * ProjectCard component featuring cursor-tracking spotlight border glow on hover,
 * tech stack chips, and structured layout.
 */
export default function ProjectCard({ project, children }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -250, y: -250 })
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: -250, y: -250 })
  }

  return (
    <article
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
        boxShadow: isHovered ? 'var(--glow-card-hover)' : 'var(--glow-card)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Dynamic Cursor-Tracking Spotlight Border Glow */}
      {!prefersReducedMotion && (
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

      {/* Internal Content Container with spotlight background */}
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
        }}
      >
        {/* Subtle interior spotlight sheen */}
        {!prefersReducedMotion && (
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
              marginBottom: '1.5rem',
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
              marginBottom: '1.5rem',
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

        {/* Action / Extension Slot for links and case study triggers */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </div>
      </div>
    </article>
  )
}
