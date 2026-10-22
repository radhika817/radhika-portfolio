import { useState } from 'react'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import CustomCursor from './components/CustomCursor'
import CursorGlow from './components/CursorGlow'
import ParticleTrail from './components/ParticleTrail'
import ClickRipple from './components/ClickRipple'
import { projects, stats } from './data/content'
import { useReducedMotion } from './hooks/useReducedMotion'
import { usePointerType } from './hooks/usePointerType'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()

  // Initialize Lenis smooth scroll synced with GSAP ScrollTrigger
  useSmoothScroll()

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Preloader Intro Sequence */}
      <Preloader onComplete={() => setIsIntroComplete(true)} />

      {/* Global Cursor & Interaction Effects */}
      <CursorGlow />
      <ParticleTrail />
      <ClickRipple />
      <CustomCursor />

      {/* Hero Section with 3D Avatar, Aurora Glow, and CTAs */}
      <Hero />

      {/* Main Content Area (Projects, Stats & Diagnostic Suite) */}
      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '2rem 1.5rem 5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Capability Diagnostic Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '2.5rem',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--color-lavender)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Stage 3: Hero & 3D Avatar Active
          </span>
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: hasFinePointer ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${hasFinePointer ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              color: hasFinePointer ? '#6ee7b7' : '#fca5a5',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Pointer: {hasFinePointer ? 'Fine Mouse' : 'Touch/Coarse'}
          </span>
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: prefersReducedMotion ? 'rgba(245, 158, 11, 0.15)' : 'rgba(139, 92, 246, 0.12)',
              border: `1px solid ${prefersReducedMotion ? 'rgba(245, 158, 11, 0.3)' : 'var(--border-subtle)'}`,
              color: prefersReducedMotion ? '#fcd34d' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Reduced Motion: {prefersReducedMotion ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        {/* Stats Grid */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3.5rem',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.4rem',
                boxShadow: 'var(--glow-card)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {stat.value}
                {stat.suffix}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Projects Preview */}
        <section id="projects" style={{ marginBottom: '3.5rem' }}>
          <h2
            style={{
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
              color: 'var(--color-lavender)',
              letterSpacing: '-0.02em',
            }}
          >
            Featured Projects ({projects.length})
          </h2>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {projects.map((project) => (
              <div
                key={project.id}
                data-cursor="View"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  boxShadow: 'var(--glow-card)',
                  transition: 'border-color 0.25s ease, transform 0.25s ease',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.35rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.3rem',
                  }}
                >
                  {project.title}{' '}
                  <span
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--color-violet-light)',
                      fontWeight: 400,
                    }}
                  >
                    — {project.subtitle}
                  </span>
                </h3>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    margin: '0.6rem 0 1.25rem',
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(139, 92, 246, 0.12)',
                        color: 'var(--color-lavender)',
                        border: '1px solid rgba(139, 92, 246, 0.25)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
