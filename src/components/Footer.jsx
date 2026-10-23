import { ArrowUp, Heart, Sparkles } from 'lucide-react'
import { personalInfo } from '../data/content'

function GithubIcon({ size = 15, ...props }) {
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
 * Footer with philosophical statement, monogram logo, navigation links,
 * and a smooth back-to-top trigger.
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(7, 4, 13, 0.95)',
        borderTop: '1px solid rgba(139, 92, 246, 0.18)',
        padding: '3.5rem 1.5rem 2.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
        }}
      >
        {/* Top Footer Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          {/* Brand Monogram & Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(109, 40, 217, 0.4))',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(139, 92, 246, 0.3)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#ffffff',
                }}
              >
                RK
              </span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {personalInfo.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {personalInfo.title}
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="Open"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid var(--border-medium)',
              color: 'var(--color-lavender)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Required Philosophical Statement */}
        <div
          style={{
            padding: '1.5rem',
            background: 'rgba(19, 11, 36, 0.55)',
            border: '1px solid rgba(139, 92, 246, 0.12)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '1.05rem',
              fontWeight: 500,
              color: 'var(--color-lavender-light)',
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
              lineHeight: 1.6,
            }}
          >
            &ldquo;Built with curiosity, iteration, and a focus on solving real problems.&rdquo;
          </p>
          <div
            style={{
              marginTop: '0.5rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            — Radhika Kandalkar · Computer Engineering @ MIT Academy of Engineering, Pune
          </div>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.8rem',
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Radhika Kandalkar. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="https://github.com/radhika817"
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              style={{
                color: 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                textDecoration: 'none',
              }}
            >
              <GithubIcon size={14} />
              <span>github.com/radhika817</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
