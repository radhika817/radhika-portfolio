import { useState, lazy, Suspense } from 'react'
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

// Lazy loaded below-the-fold components
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Achievements = lazy(() => import('./components/Achievements'))
const Terminal = lazy(() => import('./components/Terminal'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))


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
      {/* Accessible Skip to Main Content Link for Keyboard Users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

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

      {/* Main Content Area with Semantic Landmark */}
      <main
        id="main-content"
        tabIndex={-1}
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

        {/* Section: Featured Projects (Lazy Loaded) */}
        <Suspense fallback={<SectionFallback id="projects" label="Projects" />}>
          <Projects />
        </Suspense>

        {/* Section: Technical Skills (Lazy Loaded) */}
        <Suspense fallback={<SectionFallback id="skills" label="Skills" />}>
          <Skills />
        </Suspense>

        {/* Section: Experience Timeline (Lazy Loaded) */}
        <Suspense fallback={<SectionFallback id="experience" label="Experience" />}>
          <Experience />
        </Suspense>

        {/* Section: Achievements & Recognition (Lazy Loaded) */}
        <Suspense fallback={<SectionFallback id="achievements" label="Achievements" />}>
          <Achievements />
        </Suspense>

        {/* Section: Interactive Terminal (Lazy Loaded) */}
        <Suspense fallback={<SectionFallback id="terminal" label="Terminal" />}>
          <Terminal />
        </Suspense>

        {/* Section: Contact & Socials (Lazy Loaded) */}
        <Suspense fallback={<SectionFallback id="contact" label="Contact" />}>
          <Contact />
        </Suspense>
      </main>

      {/* Global Footer (Lazy Loaded) */}
      <Suspense fallback={<div style={{ minHeight: '80px' }} />}>
        <Footer />
      </Suspense>
    </div>
  )
}

function SectionFallback({ id, label }) {
  return (
    <div
      id={id}
      aria-label={`Loading ${label || 'section'}`}
      style={{
        minHeight: '340px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed rgba(139, 92, 246, 0.15)',
        background: 'rgba(15, 10, 26, 0.25)',
        margin: '2rem 0',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(139, 92, 246, 0.2)',
          borderTopColor: 'var(--color-violet-light)',
          animation: 'spin 1s linear infinite',
        }}
      />
    </div>
  )
}
