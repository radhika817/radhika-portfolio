import { personalInfo, projects, stats } from './data/content'
import CustomCursor from './components/CustomCursor'
import CursorGlow from './components/CursorGlow'
import ParticleTrail from './components/ParticleTrail'
import ClickRipple from './components/ClickRipple'
import { useReducedMotion } from './hooks/useReducedMotion'
import { usePointerType } from './hooks/usePointerType'

export default function App() {
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Global Cursor & Interaction Effects */}
      <CursorGlow />
      <ParticleTrail />
      <ClickRipple />
      <CustomCursor />

      <main style={{ maxWidth: '1040px', margin: '0 auto', padding: '3.5rem 1.5rem', position: 'relative', zIndex: 1 }}>
        {/* Stage & Capability Status Banner */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--color-lavender)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Stage 2: Cursor System Active
            </span>
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: hasFinePointer ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: `1px solid ${hasFinePointer ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                color: hasFinePointer ? '#6ee7b7' : '#fca5a5',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Pointer: {hasFinePointer ? 'Fine (Custom Cursor Active)' : 'Touch/Coarse (Native Cursor Restored)'}
            </span>
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: prefersReducedMotion ? 'rgba(245, 158, 11, 0.15)' : 'rgba(139, 92, 246, 0.12)',
                border: `1px solid ${prefersReducedMotion ? 'rgba(245, 158, 11, 0.3)' : 'var(--border-subtle)'}`,
                color: prefersReducedMotion ? '#fcd34d' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Reduced Motion: {prefersReducedMotion ? 'Enabled (Effects Disabled)' : 'Disabled'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 700,
              background: 'var(--text-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            {personalInfo.name}
          </h1>
          <p
            style={{
              fontSize: '1.25rem',
              color: 'var(--color-lavender-light)',
              marginBottom: '0.75rem',
            }}
          >
            {personalInfo.title}
          </p>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', fontSize: '1rem' }}>
            {personalInfo.tagline}
          </p>
        </header>

        {/* Cursor Interactive Testing Suite */}
        <section
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            marginBottom: '3rem',
            boxShadow: 'var(--glow-card)',
          }}
        >
          <h2
            style={{
              fontSize: '1.15rem',
              color: 'var(--color-lavender)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}
          >
            ⚡ Cursor Effects & Interactive State Test
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Hover each element below to test the spring trailing ring, dynamic labels, button expansion, and click ripple. Move quickly to see violet sparkles.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {/* View label test */}
            <div
              data-cursor="View"
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ color: 'var(--color-lavender)', fontWeight: 600, marginBottom: '0.25rem' }}>
                View Project
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                data-cursor="View"
              </div>
            </div>

            {/* Open label test */}
            <div
              data-cursor="Open"
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ color: 'var(--color-lavender)', fontWeight: 600, marginBottom: '0.25rem' }}>
                Open Demo
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                data-cursor="Open"
              </div>
            </div>

            {/* Drag label test */}
            <div
              data-cursor="Drag"
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ color: 'var(--color-lavender)', fontWeight: 600, marginBottom: '0.25rem' }}>
                3D Canvas Area
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                data-cursor="Drag"
              </div>
            </div>

            {/* Standard Button hover & ripple test */}
            <button
              onClick={() => {}}
              style={{
                background: 'linear-gradient(135deg, var(--color-violet), var(--color-accent-purple))',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                color: '#ffffff',
                fontWeight: 600,
                textAlign: 'center',
                boxShadow: 'var(--glow-sm)',
                transition: 'transform 0.2s ease',
              }}
            >
              <div>Button Click Ripple</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.85, marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                Click to trigger ripple
              </div>
            </button>
          </div>
        </section>

        {/* Stats grid */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--glow-card)',
              }}
            >
              <div
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {stat.value}
                {stat.suffix}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Projects Preview */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--color-lavender)' }}>
            Featured Projects ({projects.length})
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {projects.map((project) => (
              <div
                key={project.id}
                data-cursor="View"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  boxShadow: 'var(--glow-card)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {project.title}{' '}
                  <span
                    style={{
                      fontSize: '0.9rem',
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
                    margin: '0.5rem 0 1rem',
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(139, 92, 246, 0.12)',
                        color: 'var(--color-lavender)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
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
