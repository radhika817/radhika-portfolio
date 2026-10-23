import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { projects } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import ProjectCard from './ProjectCard'
import ProjectCaseStudyModal from './ProjectCaseStudyModal'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Projects Section layout rendering SmartRide, PrepPulse, and Socio3
 * with staggered scroll reveal animations and interactive case study modal.
 */
export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
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
        style={{ marginBottom: '2.75rem' }}
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
          <span>// 02. FEATURED WORK</span>
        </div>
        <h2
          id="projects-heading"
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
      </motion.div>

      {/* Projects Grid with Staggered Scroll Reveal */}
      <motion.div
        className="projects-grid"
        variants={prefersReducedMotion ? {} : containerVariants}
        initial={prefersReducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={prefersReducedMotion ? {} : itemVariants}
            style={{ height: '100%' }}
          >
            <ProjectCard
              project={project}
              onOpenCaseStudy={(p) => setActiveCaseStudy(p)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={activeCaseStudy}
        isOpen={!!activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  )
}
