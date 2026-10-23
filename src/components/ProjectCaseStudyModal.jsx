import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Trophy, CheckCircle2, ShieldCheck, Cpu, Clock } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

function GithubIcon({ size = 16, ...props }) {
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

// Case study engineering insights derived directly from README.md
const CASE_STUDY_DETAILS = {
  smartride: {
    problem:
      'Campus and workplace commuters face severe traffic congestion, excessive individual vehicle emissions, and coordination friction when attempting to find reliable carpool partners with compatible schedules.',
    approach:
      'Engineered an intelligent geospatial route matching system that analyzes departure windows, pickup/drop-off proximity, and path overlap algorithms to automate partner matching.',
    decisions: [
      'Implemented atomic seat reservations in MongoDB/Express to eliminate race conditions and avoid double-booking during peak request windows.',
      'Designed real-time GPS telemetry and participant-scoped ride channels using Socket.IO for live location tracking and commuter communication.',
      'Integrated verified institutional identity checks, SOS emergency dispatch, and time-expiring trip sharing links for passenger safety.',
      'Automated proportional split accounting across fuel, toll, and municipal parking fees.',
    ],
  },
  preppulse: {
    problem:
      'Computer science students preparing for technical placements struggle with unstructured revision, memory decay across extensive syllabus domains, and lack of objective evaluation on written/code answers.',
    approach:
      'Architected an adaptive interview preparation platform combining a 198-question curriculum with spaced repetition algorithms and LLM-powered answer grading.',
    decisions: [
      'Curated and indexed 198 placement questions spanning DSA, DBMS, Operating Systems, Networks, OOP, SQL, aptitude, and HR domains.',
      'Engineered a Leitner-based spaced repetition scheduler that surfaces weak topics and optimizes revision intervals according to individual memory retention curves.',
      'Integrated high-throughput Groq LLM API to deliver sub-second automated feedback and qualitative improvement tips on submitted answers.',
      'Implemented JWT session authentication, role-based access control, and analytics dashboards for tracking streaks, accuracy rates, and revision progress.',
    ],
  },
  socio3: {
    problem:
      'Traditional social media architectures centralize user identity, monetize user content without equitable creator compensation, and enforce opaque moderation protocols.',
    approach:
      'Built a decentralized Web3 social dApp utilizing Solidity smart contracts deployed on Sepolia, IPFS decentralized content addressing, and non-custodial wallet sign-in.',
    decisions: [
      'Authored and deployed gas-efficient Solidity smart contracts on the Sepolia Ethereum testnet to facilitate direct cryptocurrency creator tipping without platform fees.',
      'Utilized IPFS for immutable decentralized content distribution coupled with Web3 wallet authentication (Ethers.js / Hardhat).',
      'Engineered a dual-layer data architecture using Firebase Firestore for instant feeds, comment threads, and social graphs alongside on-chain tipping states.',
      'Awarded 1st Prize at Sinhgad Hackathon 2026, ranking first out of approximately 100 competing teams and 500+ developers in a 24-hour sprint.',
    ],
  },
}

/**
 * ProjectCaseStudyModal displaying Problem, Approach, Engineering Decisions,
 * Tech Stack, and Links with Esc key listener and focus management.
 */
export default function ProjectCaseStudyModal({ project, isOpen, onClose }) {
  const prefersReducedMotion = useReducedMotion()
  const modalRef = useRef(null)
  const previousActiveElementRef = useRef(null)

  // Manage body scroll, focus trapping, and Escape key
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement
      document.body.style.overflow = 'hidden'

      // Move focus to first interactive element inside modal
      requestAnimationFrame(() => {
        if (modalRef.current) {
          const focusable = Array.from(
            modalRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => !el.hasAttribute('disabled'))
          if (focusable.length > 0) {
            focusable[0].focus()
          }
        }
      })

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose()
          return
        }

        // Focus trap
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = Array.from(
            modalRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => !el.hasAttribute('disabled'))

          if (focusable.length === 0) return

          const first = focusable[0]
          const last = focusable[focusable.length - 1]

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault()
              last.focus()
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault()
              first.focus()
            }
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
        if (
          previousActiveElementRef.current &&
          typeof previousActiveElementRef.current.focus === 'function'
        ) {
          previousActiveElementRef.current.focus()
        }
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!project) return null

  const details = CASE_STUDY_DETAILS[project.id] || {
    problem: project.description,
    approach: project.tagline,
    decisions: project.highlights || [],
  }

  const isLiveValid = isValidUrl(project.liveUrl)
  const isGithubValid = isValidUrl(project.githubUrl)
  const hasAward = project.award || project.id === 'socio3'

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(7, 4, 13, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            className="case-study-modal-card"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '740px',
              maxHeight: '88vh',
              overflowY: 'auto',
              background: 'linear-gradient(135deg, rgba(20, 12, 38, 0.96) 0%, rgba(10, 6, 20, 0.98) 100%)',
              border: '1.5px solid rgba(167, 139, 250, 0.35)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.25rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(139, 92, 246, 0.25)',
              zIndex: 1,
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close case study modal"
              data-cursor="Open"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid var(--border-medium)',
                color: 'var(--color-lavender)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <X size={18} />
            </button>

            {/* Award Badge if present */}
            {hasAward && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.45)',
                  color: '#fbbf24',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  boxShadow: '0 0 15px rgba(245, 158, 11, 0.25)',
                  marginBottom: '1rem',
                }}
              >
                <Trophy size={14} color="#f59e0b" />
                <span>1st Place, Sinhgad Hackathon 2026 (500+ participants)</span>
              </div>
            )}

            {/* Title & Subtitle */}
            <div style={{ marginBottom: '1.5rem', paddingRight: '2.5rem' }}>
              <h2
                id="case-study-title"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.35rem',
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-violet-light)',
                  fontWeight: 500,
                }}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '2rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
              }}
            >
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(139, 92, 246, 0.15)',
                    color: 'var(--color-lavender)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Case Study Body: Problem, Approach, Decisions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Problem Statement */}
              <div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-lavender)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Cpu size={15} />
                  <span>The Problem</span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.98rem' }}>
                  {details.problem}
                </p>
              </div>

              {/* Architectural Approach */}
              <div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-lavender)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <ShieldCheck size={15} />
                  <span>Architectural Approach</span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.98rem' }}>
                  {details.approach}
                </p>
              </div>

              {/* Key Engineering Decisions / Features */}
              <div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-lavender)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <CheckCircle2 size={15} />
                  <span>Key Engineering Decisions & Features</span>
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    padding: 0,
                  }}
                >
                  {details.decisions.map((decision, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-violet-light)',
                          marginTop: '0.5rem',
                          flexShrink: 0,
                          boxShadow: '0 0 6px var(--color-violet)',
                        }}
                      />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Links Bar */}
            <div
              style={{
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(139, 92, 246, 0.15)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              {isLiveValid ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem 1.4rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, var(--color-violet), #6d28d9)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                  }}
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink size={15} />
                </a>
              ) : (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem 1.2rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'not-allowed',
                  }}
                >
                  <Clock size={14} />
                  <span>Live Demo Coming Soon</span>
                </span>
              )}

              {isGithubValid ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem 1.4rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(139, 92, 246, 0.12)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--color-lavender)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <GithubIcon size={16} />
                  <span>View Repository</span>
                </a>
              ) : (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem 1.2rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'not-allowed',
                  }}
                >
                  <GithubIcon size={14} style={{ opacity: 0.5 }} />
                  <span>Repository Coming Soon</span>
                </span>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
