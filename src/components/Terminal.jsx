import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react'
import {
  personalInfo,
  projects,
  skillsData,
  achievements,
  experience,
  contactInfo,
} from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export const AVAILABLE_COMMANDS = [
  'help',
  'about',
  'projects',
  'skills',
  'achievements',
  'experience',
  'contact',
  'resume',
  'clear',
]

/**
 * Executes a terminal command string and returns output text.
 */
function executeCommand(rawCommand) {
  const cmd = rawCommand.trim().toLowerCase()

  switch (cmd) {
    case 'help':
      return [
        'Available Developer Commands:',
        '  about         Display bio, education, and background',
        '  projects      List full-stack & Web3 engineering projects',
        '  skills        Show technical skills and category breakdown',
        '  achievements  List hackathon awards and competition rankings',
        '  experience    Show professional internships and campus outreach',
        '  contact       Get email, location, and social profile links',
        '  resume        Open resume document (/resume.pdf)',
        '  clear         Clear the terminal screen buffer',
        '  help          Display this help manual',
      ].join('\n')

    case 'about':
    case 'bio':
      return [
        `${personalInfo.name} — ${personalInfo.title}`,
        `${personalInfo.tagline}`,
        '',
        `Education: ${personalInfo.education.degree}`,
        `Institution: ${personalInfo.education.institution} (${personalInfo.education.period})`,
        `CGPA: ${personalInfo.education.cgpa}`,
        `Location: ${personalInfo.location}`,
        '',
        personalInfo.bio,
      ].join('\n')

    case 'projects':
      return projects
        .map(
          (p, i) =>
            `[${i + 1}] ${p.title} — ${p.subtitle}\n` +
            `    Tech: ${p.tech.join(', ')}\n` +
            `    Summary: ${p.tagline}\n` +
            `    Live Demo: ${p.liveUrl || 'Coming soon'}\n` +
            (p.award ? `    Award: ★ ${p.award}\n` : '')
        )
        .join('\n')

    case 'skills':
      return [
        'Technical Skills Breakdown:',
        `  • Languages:        ${skillsData.languages.join(', ')}`,
        `  • Web Development:  ${skillsData.webDevelopment.join(', ')}`,
        `  • Blockchain/Web3:  ${skillsData.blockchainWeb3.join(', ')}`,
        `  • AI Integrations:  ${skillsData.aiIntegrations.join(', ')}`,
        `  • Databases:        ${skillsData.databases.join(', ')}`,
        `  • Cloud & Tools:    ${skillsData.cloudTools.join(', ')}`,
        `  • Computer Science: ${skillsData.computerScience.join(', ')}`,
      ].join('\n')

    case 'achievements':
    case 'honors':
      return [
        'Awards & Competitive Recognition:',
        ...achievements.map((a) =>
          a.highlight
            ? `  ★ ${a.title}\n    ${a.description}`
            : `  • ${a.title}\n    ${a.description}`
        ),
      ].join('\n')

    case 'experience':
      return [
        'Work & Leadership Experience:',
        ...experience.map(
          (e) =>
            `  • ${e.role} @ ${e.organization} (${e.period})\n` +
            e.responsibilities.map((r) => `      - ${r}`).join('\n')
        ),
      ].join('\n')

    case 'contact':
      return [
        'Contact & Communication:',
        `  Email:    ${contactInfo.email}`,
        `  Location: ${contactInfo.location}`,
        `  GitHub:   https://github.com/radhika817`,
        `  Profiles: LinkedIn, LeetCode, CodeChef (links on contact card)`,
      ].join('\n')

    case 'resume':
      if (typeof window !== 'undefined') {
        window.open('/resume.pdf', '_blank')
      }
      return 'Opening /resume.pdf in a new tab... [Done]'

    default:
      return `bash: command not found: "${rawCommand}". Type "help" to view available developer commands.`
  }
}

/**
 * Terminal UI Window with core commands (help, about, projects, skills,
 * achievements, contact, resume, clear, and unknown command handling).
 */
export default function Terminal() {
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Radhika OS v1.0.0 [x86_64-pc-linux-gnu]\nType "help" to view available developer commands.',
    },
  ])
  const inputRef = useRef(null)
  const windowRef = useRef(null)
  const bottomRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const handleWindowClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Auto-scroll terminal output to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = inputVal.trim()
    if (!trimmed) return

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([])
      setInputVal('')
      return
    }

    const output = executeCommand(trimmed)
    setHistory((prev) => [
      ...prev,
      { type: 'input', text: trimmed },
      { type: 'output', text: output },
    ])
    setInputVal('')
  }

  return (
    <section
      id="terminal"
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
        style={{ marginBottom: '2.5rem' }}
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
          <span>// 06. INTERACTIVE CLI</span>
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
          Developer Terminal
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '680px',
            lineHeight: 1.6,
          }}
        >
          An interactive in-browser CLI sandbox for developers and recruiters who prefer command-line navigation.
        </p>
      </motion.div>

      {/* Terminal Window Frame */}
      <motion.div
        ref={windowRef}
        onClick={handleWindowClick}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(10, 6, 18, 0.95)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 24px rgba(139, 92, 246, 0.15)',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
          cursor: 'text',
        }}
      >
        {/* Terminal Title Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            background: 'rgba(19, 11, 36, 0.85)',
            borderBottom: '1px solid rgba(139, 92, 246, 0.18)',
            userSelect: 'none',
          }}
        >
          {/* Traffic Light Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#eab308',
                boxShadow: '0 0 8px rgba(234, 179, 8, 0.5)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
                display: 'inline-block',
              }}
            />
          </div>

          {/* Title Monogram */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
            }}
          >
            <TerminalIcon size={14} color="var(--color-violet-light)" />
            <span>radhika@portfolio: ~ (bash)</span>
          </div>

          {/* Right Status Badge */}
          <div
            style={{
              fontSize: '0.72rem',
              color: 'var(--color-violet-light)',
              background: 'rgba(139, 92, 246, 0.1)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            Type &quot;help&quot;
          </div>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: '1.5rem',
            minHeight: '280px',
            maxHeight: '440px',
            overflowY: 'auto',
            fontSize: '0.9rem',
            lineHeight: 1.6,
          }}
        >
          {/* Output log */}
          {history.map((entry, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem' }}>
              {entry.type === 'input' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>radhika@portfolio</span>
                  <span style={{ color: 'var(--color-violet-light)' }}>:</span>
                  <span style={{ color: '#38bdf8' }}>~</span>
                  <span style={{ color: 'var(--text-muted)' }}>$</span>
                  <span style={{ color: '#ffffff' }}>{entry.text}</span>
                </div>
              ) : entry.type === 'system' ? (
                <div
                  style={{
                    color: 'var(--color-violet-light)',
                    background: 'rgba(139, 92, 246, 0.08)',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid var(--color-violet)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {entry.text}
                </div>
              ) : (
                <div
                  style={{
                    color: entry.text.startsWith('bash:') ? '#f87171' : 'var(--text-secondary)',
                    whiteSpace: 'pre-line',
                    paddingLeft: '0.25rem',
                  }}
                >
                  {entry.text}
                </div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
            }}
          >
            <span style={{ color: '#10b981', flexShrink: 0 }}>radhika@portfolio</span>
            <span style={{ color: 'var(--color-violet-light)', flexShrink: 0 }}>:</span>
            <span style={{ color: '#38bdf8', flexShrink: 0 }}>~</span>
            <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoFocus
              spellCheck="false"
              autoComplete="off"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                caretColor: 'var(--color-violet)',
              }}
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </motion.div>
    </section>
  )
}
