import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Trophy, Clock, Route, BrainCircuit, Blocks } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePointerType } from '../hooks/usePointerType'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

function GithubIcon({ size = 14, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

/**
 * Checks whether a URL is a real link or an unconfigured placeholder
 */
function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  return trimmed.startsWith('http://') || trimmed.startsWith('https://')
}

/**
 * Visual banner showing tailored futuristic gradient graphic for each project
 * until real application screenshots are uploaded.
 */
function ProjectVisualBanner({ project }) {
  const configs = {
    smartride: {
      gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(139, 92, 246, 0.25) 100%)',
      borderColor: 'rgba(56, 189, 248, 0.25)',
      accentColor: '#38bdf8',
      icon: <Route size={24} color="#38bdf8" />,
      tag: 'GEOSPATIAL ROUTE MATCHING',
      pattern: 'radial-gradient(circle at 20% 40%, rgba(56, 189, 248, 0.25) 0%, transparent 50%)',
    },
    preppulse: {
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(16, 185, 129, 0.15) 100%)',
      borderColor: 'rgba(168, 85, 247, 0.3)',
      accentColor: '#c084fc',
      icon: <BrainCircuit size={24} color="#c084fc" />,
      tag: '198 QUESTIONS // GROQ LLM EVAL',
      pattern: 'radial-gradient(circle at 80% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
    },
    socio3: {
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(139, 92, 246, 0.25) 100%)',
      borderColor: 'rgba(245, 158, 11, 0.35)',
      accentColor: '#fbbf24',
      icon: <Blocks size={24} color="#fbbf24" />,
      tag: 'SEPOLIA dAPP // IPFS STORAGE',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.2) 0%, transparent 60%)',
    },
  }

  const config = configs[project.id] || configs.smartride

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '140px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.25rem',
        overflow: 'hidden',
        background: '#0e081c',
        border: `1px solid ${config.borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
      }}
    >
      {/* Dynamic background gradient mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: config.gradient,
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: config.pattern,
        }}
      />
      {/* Decorative Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.6,
        }}
      />

      {/* Top Banner Row: Icon + Architecture Badge */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(7, 4, 13, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {config.icon}
        </div>
        <Badge
          variant="outline"
          className="font-mono text-[0.72rem] text-[var(--text-primary)] bg-[rgba(7,4,13,0.65)] px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md"
        >
          {config.tag}
        </Badge>
      </div>

      {/* Bottom Row Tag */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-lavender)',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            opacity: 0.9,
          }}
        >
          System Architecture Preview
        </span>
      </div>
    </div>
  )
}

/**
 * ProjectCard component with 3D tilt hover physics, cursor-tracking border glow,
 * tailored gradient visuals, and placeholder-safe link actions.
 */
export default function ProjectCard({ project, onOpenCaseStudy }) {
  const cardRef = useRef(null)
  const rafRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  const springConfig = { damping: 18, stiffness: 180, mass: 0.2 }
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !hasFinePointer || !cardRef.current) return
    const clientX = e.clientX
    const clientY = e.clientY

    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const relX = clientX - rect.left
      const relY = clientY - rect.top

      cardRef.current.style.setProperty('--glow-x', `${relX}px`)
      cardRef.current.style.setProperty('--glow-y', `${relY}px`)
      tiltX.set(relX / rect.width - 0.5)
      tiltY.set(relY / rect.height - 0.5)
    })
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    setIsHovered(false)
    if (cardRef.current) {
      cardRef.current.style.setProperty('--glow-x', '-250px')
      cardRef.current.style.setProperty('--glow-y', '-250px')
    }
    tiltX.set(0)
    tiltY.set(0)
  }

  const shouldTilt = hasFinePointer && !prefersReducedMotion
  const isLiveDemoValid = isValidUrl(project.liveUrl)
  const isGithubValid = isValidUrl(project.githubUrl)
  const hasAward = project.award || project.id === 'socio3'

  return (
    <div style={{ perspective: 1000, height: '100%' }}>
      <motion.article
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
          height: '100%',
          transformStyle: 'preserve-3d',
          rotateX: shouldTilt ? rotateX : 0,
          rotateY: shouldTilt ? rotateY : 0,
          boxShadow: isHovered ? 'var(--glow-card-hover)' : 'var(--glow-card)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Dynamic Cursor-Tracking Spotlight Border Glow */}
        {shouldTilt && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'var(--radius-lg)',
              background:
                'radial-gradient(380px circle at var(--glow-x, -250px) var(--glow-y, -250px), rgba(196, 181, 253, 0.65), rgba(139, 92, 246, 0.3) 40%, transparent 75%)',
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

        {/* Internal Content Container using shadcn Card */}
        <Card
          className="relative z-1 flex flex-col justify-between h-full overflow-hidden p-7 border-0 bg-[var(--bg-card)] backdrop-blur-md ring-0 text-card-foreground transform-[translateZ(15px)] gap-0"
        >
          {/* Subtle interior spotlight sheen */}
          {shouldTilt && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(420px circle at var(--glow-x, -250px) var(--glow-y, -250px), rgba(139, 92, 246, 0.1), transparent 65%)',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.25s ease',
                pointerEvents: 'none',
              }}
            />
          )}

          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Visual Banner Preview */}
            <ProjectVisualBanner project={project} />

            {/* Top row: Award Badge or category */}
            <div className="flex items-center justify-between mb-3 min-h-[26px]">
              {hasAward ? (
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border-amber-500/40 text-amber-400 font-mono text-xs font-semibold shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                >
                  <Trophy size={14} className="text-amber-500" />
                  <span>1st Place, Sinhgad Hackathon 2026</span>
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="font-mono text-xs tracking-wider text-muted-foreground border-transparent px-0 bg-transparent font-normal"
                >
                  FEATURED WORK
                </Badge>
              )}
            </div>

            {/* Header: Title and Subtitle */}
            <CardHeader className="p-0 gap-1 mb-3">
              <CardTitle className="text-2xl font-bold tracking-tight text-[var(--text-primary)] font-heading">
                {project.title}
              </CardTitle>
              <CardDescription className="text-sm font-mono text-[var(--color-violet-light)] font-medium">
                {project.subtitle}
              </CardDescription>
            </CardHeader>

            {/* Project Description and Tech Chips */}
            <CardContent className="p-0">
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem',
                }}
              >
                {project.description}
              </p>

              {/* Tech Stack Chips using shadcn Badge */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.45rem',
                  marginBottom: '1.5rem',
                }}
              >
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs font-mono px-2.5 py-0.5 rounded-[var(--radius-xs)] bg-violet-500/12 text-[var(--color-lavender)] border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>

          {/* Action Links Bar / CardFooter */}
          <CardFooter
            className="relative z-2 flex flex-wrap gap-2.5 items-center border-t border-violet-500/15 pt-5 px-0 pb-0 bg-transparent rounded-none"
          >
            {/* Live Demo Button / Coming Soon */}
            {isLiveDemoValid ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                aria-label={`Launch live demo for ${project.title} (opens in new tab)`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--color-violet), #6d28d9)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.35)',
                }}
              >
                <span>Live Demo</span>
                <ExternalLink size={13} />
              </a>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    tabIndex={0}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.42rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'not-allowed',
                      userSelect: 'none',
                    }}
                    aria-label="Live demo coming soon"
                  >
                    <Clock size={12} />
                    <span>Demo coming soon</span>
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-[#180d2f] text-[var(--color-lavender)] border border-violet-500/30 text-xs font-mono shadow-lg">
                  <p>Deployment link coming soon</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* GitHub Repo Button / Coming Soon */}
            {isGithubValid ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--color-lavender)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <GithubIcon size={14} />
                <span>Source</span>
              </a>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    tabIndex={0}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.42rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'not-allowed',
                      userSelect: 'none',
                    }}
                    aria-label="Repository link coming soon"
                  >
                    <GithubIcon size={13} style={{ opacity: 0.5 }} />
                    <span>Repo coming soon</span>
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-[#180d2f] text-[var(--color-lavender)] border border-violet-500/30 text-xs font-mono shadow-lg">
                  <p>Repository link being finalized</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Case Study Trigger */}
            {onOpenCaseStudy && (
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project)}
                data-cursor="View"
                aria-label={`Read ${project.title} case study and architecture breakdown`}
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.42rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-violet-light)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  background: 'rgba(139, 92, 246, 0.08)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Case Study →</span>
              </button>
            )}
          </CardFooter>
        </Card>
      </motion.article>
    </div>
  )
}
