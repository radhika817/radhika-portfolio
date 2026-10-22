import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { projects } from '../data/content'
import ProjectCard from './ProjectCard'
import ProjectCaseStudyModal from './ProjectCaseStudyModal'

/**
 * Projects Section layout rendering SmartRide, PrepPulse, and Socio3
 * with section headers, responsive cards grid, and interactive case study modal.
 */
export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)

  return (
    <section
      id="projects"
      style={{
        padding: '5rem 0 3.5rem',
        scrollMarginTop: '80px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.12)',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '2.75rem' }}>
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
          <span>// 02. FEATURED WORK</span>
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
          Featured Projects
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '680px',
            lineHeight: 1.6,
          }}
        >
          Full-stack web applications, AI integrations, and Web3 smart contracts focused on solving real problems with scalable architecture.
        </p>
      </div>

      {/* Projects Grid */}
      <div
        className="projects-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenCaseStudy={(p) => setActiveCaseStudy(p)}
          />
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={activeCaseStudy}
        isOpen={!!activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  )
}
