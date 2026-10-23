import { useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import ScrollProgressBar from './components/ScrollProgressBar'
import Hero from './components/Hero'
import CustomCursor from './components/CustomCursor'
import CursorGlow from './components/CursorGlow'
import ParticleTrail from './components/ParticleTrail'
import ClickRipple from './components/ClickRipple'
import { stats, personalInfo } from './data/content'
import { useReducedMotion } from './hooks/useReducedMotion'
import { usePointerType } from './hooks/usePointerType'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useActiveSection } from './hooks/useActiveSection'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'

const SECTION_IDS = ['about', 'projects', 'skills', 'experience', 'achievements', 'terminal', 'contact']

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()

  // Initialize Lenis smooth scroll synced with GSAP ScrollTrigger
  useSmoothScroll()

  // Track active section for navbar highlighting
  const activeSection = useActiveSection(SECTION_IDS)

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Fixed Glassmorphism Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Preloader Intro Sequence */}
      <Preloader onComplete={() => setIsIntroComplete(true)} />

      {/* Global Cursor & Interaction Effects */}
      <CursorGlow />
      <ParticleTrail />
      <ClickRipple />
      <CustomCursor />

      {/* Hero Section with 3D Avatar, Aurora Glow, and CTAs */}
      <Hero />

      {/* Main Content Area with Semantic Section Skeletons */}
      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '2rem 1.5rem 5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Capability Diagnostic Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--color-lavender)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Stage 4: Navigation & Smooth Scroll Active
          </span>
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--color-violet-light)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Active Section: #{activeSection || 'hero'}
          </span>
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: hasFinePointer ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${hasFinePointer ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              color: hasFinePointer ? '#6ee7b7' : '#fca5a5',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Pointer: {hasFinePointer ? 'Fine Mouse' : 'Touch/Coarse'}
          </span>
        </div>

        {/* Section: About with Animated Stat Counters */}
        <About />

        {/* Section: Featured Projects */}
        <Projects />

        {/* Section: Technical Skills */}
        <Skills />

        {/* Section: Experience Timeline */}
        <Experience />

        {/* Section: Achievements Skeleton */}
        <section
          id="achievements"
          style={{
            padding: '3.5rem 0',
            scrollMarginTop: '80px',
            borderBottom: '1px solid rgba(139, 92, 246, 0.12)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              color: 'var(--color-violet-light)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              marginBottom: '0.5rem',
            }}
          >
            // 04. HONORS
          </div>
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Achievements & Recognition
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            1st Prize Sinhgad Hackathon 2026, Vellora Hackathon Top 10, Decode SIH Top 50.
          </p>
        </section>

        {/* Section: Terminal Skeleton */}
        <section
          id="terminal"
          style={{
            padding: '3.5rem 0',
            scrollMarginTop: '80px',
            borderBottom: '1px solid rgba(139, 92, 246, 0.12)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              color: 'var(--color-violet-light)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              marginBottom: '0.5rem',
            }}
          >
            // 05. INTERACTION
          </div>
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Interactive Terminal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            CLI developer sandbox supporting commands: help, projects, skills, achievements, contact.
          </p>
        </section>

        {/* Section: Contact Skeleton */}
        <section
          id="contact"
          style={{
            padding: '3.5rem 0 2rem',
            scrollMarginTop: '80px',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              color: 'var(--color-violet-light)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              marginBottom: '0.5rem',
            }}
          >
            // 06. CONNECT
          </div>
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Get In Touch
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem' }}>
            Open for software engineering internships, collaborative projects, and tech opportunities.
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            data-cursor="Open"
            style={{
              display: 'inline-flex',
              padding: '0.85rem 1.6rem',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, var(--color-violet), #6d28d9)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.95rem',
              boxShadow: '0 0 24px rgba(139, 92, 246, 0.4)',
              textDecoration: 'none',
            }}
          >
            {personalInfo.email}
          </a>
        </section>
      </main>
    </div>
  )
}
