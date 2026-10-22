import { personalInfo, projects, stats } from './data/content'

export default function App() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--color-lavender)',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-mono)',
            marginBottom: '1rem',
          }}
        >
          Stage 1 Complete • Violet After Dark
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

      {/* Stats preview */}
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

      {/* Projects preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--color-lavender)' }}>
          Featured Projects ({projects.length})
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                boxShadow: 'var(--glow-card)',
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
    </div>
  )
}
