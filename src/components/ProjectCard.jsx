/**
 * ProjectCard component displaying project title, subtitle, description,
 * and technical stack chips.
 */
export default function ProjectCard({ project, children }) {
  return (
    <article
      className="project-card"
      data-cursor="View"
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        boxShadow: 'var(--glow-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <div>
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

      {/* Action / Extension Slot for links and case studies */}
      {children}
    </article>
  )
}
