import { motion } from 'framer-motion'
import {
  Code2,
  Globe,
  Blocks,
  BrainCircuit,
  Database,
  Cloud,
  Binary,
  Sparkles,
} from 'lucide-react'
import { skillsData } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export const SKILL_CATEGORIES = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Core programming & scripting',
    icon: Code2,
    skills: skillsData.languages,
    accent: '#a78bfa',
    badge: '8 Languages',
  },
  {
    id: 'webDevelopment',
    title: 'Web Development',
    subtitle: 'Full-stack client & server architectures',
    icon: Globe,
    skills: skillsData.webDevelopment,
    accent: '#38bdf8',
    badge: 'Full Stack',
  },
  {
    id: 'blockchainWeb3',
    title: 'Blockchain & Web3',
    subtitle: 'Decentralized contracts & storage',
    icon: Blocks,
    skills: skillsData.blockchainWeb3,
    accent: '#fbbf24',
    badge: 'Sepolia & IPFS',
  },
  {
    id: 'aiIntegrations',
    title: 'AI & Integrations',
    subtitle: 'LLM APIs & automated evaluations',
    icon: BrainCircuit,
    skills: skillsData.aiIntegrations,
    accent: '#c084fc',
    badge: 'Groq LLM',
  },
  {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Document, relational & real-time stores',
    icon: Database,
    skills: skillsData.databases,
    accent: '#34d399',
    badge: 'SQL & NoSQL',
  },
  {
    id: 'cloudTools',
    title: 'Cloud & Tools',
    subtitle: 'DevOps, version control & APIs',
    icon: Cloud,
    skills: skillsData.cloudTools,
    accent: '#60a5fa',
    badge: 'AWS & Git',
  },
  {
    id: 'computerScience',
    title: 'Computer Science',
    subtitle: 'Algorithmic & architectural theory',
    icon: Binary,
    skills: skillsData.computerScience,
    accent: '#f472b6',
    badge: 'Core Theory',
  },
]

/**
 * Skills Section with grouped categories derived directly from README.md.
 */
export default function Skills() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="skills"
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
        style={{ marginBottom: '3rem' }}
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
          <span>// 03. CAPABILITIES</span>
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
          Technical Skills
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '680px',
            lineHeight: 1.6,
          }}
        >
          A comprehensive breakdown of programming languages, modern web frameworks, Web3 protocols, AI integrations, and computer science foundations.
        </p>
      </motion.div>

      {/* Grouped Categories Grid */}
      <div
        className="skills-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {SKILL_CATEGORIES.map((category) => {
          const IconComponent = category.icon
          return (
            <div
              key={category.id}
              className="skill-category-card"
              style={{
                position: 'relative',
                background: 'rgba(19, 11, 36, 0.65)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
              }}
            >
              <div>
                {/* Category Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: category.accent,
                      }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: '0.15rem',
                        }}
                      >
                        {category.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {category.subtitle}
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: category.accent,
                      background: 'rgba(139, 92, 246, 0.08)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(139, 92, 246, 0.18)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {category.badge}
                  </span>
                </div>

                {/* Skill Chips */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-chip"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '0.85rem',
                        padding: '0.4rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-secondary)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
