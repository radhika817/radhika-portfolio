import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Trophy, CheckCircle2, ShieldCheck, Cpu, Clock } from 'lucide-react'

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
 * Tech Stack, and Links using accessible shadcn Dialog with focus trapping and Esc key support.
 */
export default function ProjectCaseStudyModal({ project, isOpen, onClose }) {
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[740px] max-h-[88vh] overflow-y-auto bg-gradient-to-br from-[#140c26]/98 to-[#0a0614]/99 border-[1.5px] border-violet-400/35 rounded-2xl p-6 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_50px_rgba(139,92,246,0.25)] text-foreground">
        {/* Award Badge if present */}
        {hasAward && (
          <div className="mb-2">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border-amber-500/45 text-amber-400 font-mono text-xs font-semibold shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            >
              <Trophy size={14} className="text-amber-500" />
              <span>1st Place, Sinhgad Hackathon 2026 (500+ participants)</span>
            </Badge>
          </div>
        )}

        {/* Title & Subtitle */}
        <DialogHeader className="gap-1 mb-2 pr-8 text-left">
          <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight font-heading">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base font-mono text-[var(--color-violet-light)] font-medium">
            {project.subtitle}
          </DialogDescription>
        </DialogHeader>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-violet-500/15">
          {project.tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="text-xs font-mono px-3 py-0.5 rounded-[var(--radius-xs)] bg-violet-500/15 text-[var(--color-lavender)] border border-violet-500/30 hover:bg-violet-500/25 transition-colors"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* Case Study Body: Problem, Approach, Decisions */}
        <div className="flex flex-col gap-6">
          {/* Problem Statement */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-lavender)] flex items-center gap-1.5 mb-2 font-semibold">
              <Cpu size={15} />
              <span>The Problem</span>
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed text-[0.95rem]">
              {details.problem}
            </p>
          </div>

          {/* Architectural Approach */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-lavender)] flex items-center gap-1.5 mb-2 font-semibold">
              <ShieldCheck size={15} />
              <span>Architectural Approach</span>
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed text-[0.95rem]">
              {details.approach}
            </p>
          </div>

          {/* Key Engineering Decisions / Features */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-lavender)] flex items-center gap-1.5 mb-3 font-semibold">
              <CheckCircle2 size={15} />
              <span>Key Engineering Decisions & Features</span>
            </h3>
            <ul className="list-none flex flex-col gap-3 p-0 m-0">
              {details.decisions.map((decision, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[var(--text-secondary)] text-[0.93rem] leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-violet-light)] mt-2 shrink-0 shadow-[0_0_6px_var(--color-violet)]" />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Links Bar / Footer */}
        <DialogFooter className="mt-6 pt-4 border-t border-violet-500/15 flex flex-wrap gap-3 items-center sm:justify-start">
          {isLiveValid ? (
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[#6d28d9] text-white hover:opacity-90 shadow-[0_0_20px_rgba(139,92,246,0.4)] text-sm font-semibold px-5"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
              >
                <span>Launch Live Demo</span>
                <ExternalLink size={15} className="ml-1.5" />
              </a>
            </Button>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[var(--text-muted)] text-xs font-mono cursor-not-allowed select-none"
            >
              <Clock size={14} />
              <span>Live Demo Coming Soon</span>
            </span>
          )}

          {isGithubValid ? (
            <Button
              asChild
              variant="outline"
              className="rounded-full bg-violet-500/10 border-violet-500/30 text-[var(--color-lavender)] hover:bg-violet-500/20 text-sm font-semibold px-5"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
              >
                <GithubIcon size={16} className="mr-1.5" />
                <span>View Repository</span>
              </a>
            </Button>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[var(--text-muted)] text-xs font-mono cursor-not-allowed select-none"
            >
              <GithubIcon size={14} style={{ opacity: 0.5 }} />
              <span>Repository Coming Soon</span>
            </span>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
