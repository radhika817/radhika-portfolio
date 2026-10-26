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
} from 'lucide-react'
import { skillsData } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Marquee } from '@/components/ui/marquee'
import { Badge } from '@/components/ui/badge'

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
 * 21st.dev inspired Dual-Row Infinite Marquee with edge-fade gradient masks
 */
function TechMarquee({ prefersReducedMotion }) {
  const row1 = MARQUEE_ITEMS.slice(0, 9)
  const row2 = MARQUEE_ITEMS.slice(9)

  const renderBadge = (item, idx) => (
    <div
      key={`${item.name}-${idx}`}
      data-cursor="View"
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#130b24]/90 border border-violet-500/25 hover:border-violet-400/60 hover:bg-[#180d2f] text-sm shadow-[0_4px_14px_rgba(0,0,0,0.3)] shrink-0 transition-all select-none"
    >
      <span
        className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
        style={{ backgroundColor: item.color, color: item.color }}
      />
      <span className="font-semibold text-slate-100 text-xs sm:text-sm">
        {item.name}
      </span>
      <span className="text-[0.72rem] font-mono text-[var(--color-violet-light)] border-l border-white/10 pl-2">
        {item.category}
      </span>
    </div>
  )

  if (prefersReducedMotion) {
    return (
      <div className="my-8 p-4 rounded-xl bg-[#0d0718]/40 border border-violet-500/15 flex flex-wrap gap-2.5 justify-center">
        {MARQUEE_ITEMS.map((item, idx) => renderBadge(item, idx))}
      </div>
    )
  }

  return (
    <div className="relative flex flex-col gap-3 w-full overflow-hidden my-8 py-3 rounded-xl bg-[#0d0718]/40 border border-violet-500/15 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <Marquee pauseOnHover repeat={4} className="[--duration:36s]">
        {row1.map((item, idx) => renderBadge(item, idx))}
      </Marquee>
      <Marquee reverse pauseOnHover repeat={4} className="[--duration:40s]">
        {row2.map((item, idx) => renderBadge(item, idx))}
      </Marquee>
    </div>
  )
}

/**
 * Skills Section with grouped categories, animated hover glow chips,
 * and 21st.dev inspired dual-direction tech marquee.
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

      {/* 21st.dev inspired Infinite Tech Marquee */}
      <TechMarquee prefersReducedMotion={prefersReducedMotion} />

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
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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

                  {/* shadcn Badge for Category counter */}
                  <Badge
                    variant="outline"
                    className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full border border-violet-500/25 bg-violet-500/10"
                    style={{ color: category.accent }}
                  >
                    {category.badge}
                  </Badge>
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
                            : { y: -2, scale: 1.05 }
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
                              ? category.accent
                              : 'rgba(255, 255, 255, 0.08)'
                          }`,
                          boxShadow: isHovered
                            ? `0 0 16px ${category.accent}44`
                            : 'none',
                          userSelect: 'none',
                          cursor: 'pointer',
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
