import { useState } from 'react'
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
  Zap,
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

// Prominent core technologies for the infinite marquee
export const MARQUEE_ITEMS = [
  { name: 'React', category: 'Frontend', color: '#61dafb' },
  { name: 'Solidity', category: 'Smart Contracts', color: '#fbbf24' },
  { name: 'Groq LLM', category: 'AI Inference', color: '#f97316' },
  { name: 'Node.js', category: 'Backend', color: '#68a063' },
  { name: 'Express.js', category: 'REST API', color: '#ffffff' },
  { name: 'MongoDB', category: 'Database', color: '#47a248' },
  { name: 'Hardhat', category: 'Web3 Tooling', color: '#eab308' },
  { name: 'Ethers.js', category: 'Blockchain', color: '#3b82f6' },
  { name: 'IPFS', category: 'Decentralized Storage', color: '#06b6d4' },
  { name: 'Python', category: 'Language', color: '#38bdf8' },
  { name: 'Firebase', category: 'Realtime DB', color: '#f59e0b' },
  { name: 'Socket.IO', category: 'WebSockets', color: '#a855f7' },
  { name: 'AWS', category: 'Cloud Infrastructure', color: '#ec4899' },
  { name: 'C++', category: 'Algorithms', color: '#60a5fa' },
  { name: 'MySQL', category: 'Relational DB', color: '#00758f' },
  { name: 'Tailwind CSS', category: 'Styling', color: '#38bdf8' },
  { name: 'Leaflet', category: 'Geospatial Maps', color: '#10b981' },
]

/**
 * Infinite Tech Marquee Row
 */
function TechMarquee() {
  // Duplicate array twice to ensure seamless continuous loop
  const marqueeList = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div
      style={{
        margin: '2.5rem 0 3.5rem',
        padding: '1rem 0',
        background: 'rgba(13, 7, 24, 0.4)',
        borderTop: '1px solid rgba(139, 92, 246, 0.12)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.12)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div className="tech-marquee-container" data-cursor="Drag">
        <div className="tech-marquee-track">
          {marqueeList.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.55rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(19, 11, 36, 0.8)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  letterSpacing: '0.01em',
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  color: 'var(--text-faint)',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingLeft: '0.5rem',
                }}
              >
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Skills Section with grouped categories, animated hover glow chips,
 * and an infinite tech marquee row.
 */
export default function Skills() {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredChip, setHoveredChip] = useState(null)

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
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
        style={{ marginBottom: '1.5rem' }}
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
          id="skills-heading"
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

      {/* Infinite Tech Marquee Row */}
      <TechMarquee />

      {/* Grouped Categories Grid */}
      <div
        className="skills-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '1.5rem',
        }}
      >
        {SKILL_CATEGORIES.map((category) => {
          const IconComponent = category.icon
          return (
            <motion.div
              key={category.id}
              className="skill-category-card"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45 }}
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

                {/* Skill Chips with Hover Glow and Motion */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  {category.skills.map((skill) => {
                    const isHovered = hoveredChip === skill
                    return (
                      <motion.span
                        key={skill}
                        className="skill-chip"
                        data-cursor="View"
                        onMouseEnter={() => setHoveredChip(skill)}
                        onMouseLeave={() => setHoveredChip(null)}
                        whileHover={
                          prefersReducedMotion
                            ? {}
                            : { y: -2, scale: 1.04 }
                        }
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontSize: '0.85rem',
                          padding: '0.42rem 0.8rem',
                          borderRadius: 'var(--radius-sm)',
                          background: isHovered
                            ? 'rgba(139, 92, 246, 0.18)'
                            : 'rgba(255, 255, 255, 0.04)',
                          color: isHovered
                            ? '#ffffff'
                            : 'var(--text-secondary)',
                          border: `1px solid ${
                            isHovered
                              ? 'rgba(167, 139, 250, 0.55)'
                              : 'rgba(255, 255, 255, 0.08)'
                          }`,
                          boxShadow: isHovered
                            ? `0 0 16px ${category.accent}44`
                            : 'none',
                          userSelect: 'none',
                        }}
                      >
                        {skill}
                      </motion.span>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
