import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Preloader component featuring name reveal, animated progress bar,
 * and smooth upward slide-away transition. Automatically skipped under reduced motion.
 */
export default function Preloader({ onComplete }) {
  const prefersReducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  // Skip entirely if user requested reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldRender(false)
      onComplete?.()
    }
  }, [prefersReducedMotion, onComplete])

  useEffect(() => {
    if (prefersReducedMotion) return

    // Smooth progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsDone(true), 150)
          return 100
        }
        // Accelerate near the end
        const jump = prev > 70 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 5) + 3
        return Math.min(100, prev + jump)
      })
    }, 45)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  if (!shouldRender || prefersReducedMotion) {
    return null
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone ? (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: '#07040d',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            overflow: 'hidden',
          }}
        >
          {/* Subtle background glow */}
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {/* System Status Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--color-lavender)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              // PORTFOLIO OS v2.0
            </motion.div>

            {/* Name Reveal */}
            <div
              style={{
                overflow: 'hidden',
                marginBottom: '0.75rem',
              }}
            >
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 60%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Radhika Kandalkar
              </motion.h1>
            </div>

            {/* Role Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                marginBottom: '2rem',
              }}
            >
              Full-Stack Developer · AI · Web3
            </motion.p>

            {/* Progress Bar Container */}
            <div
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(139, 92, 246, 0.15)',
                borderRadius: '9999px',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '1rem',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd)',
                  boxShadow: '0 0 12px rgba(167, 139, 250, 0.8)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>

            {/* Progress Counter */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>INITIALIZING</span>
              <span style={{ color: 'var(--color-lavender)' }}>{progress}%</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
