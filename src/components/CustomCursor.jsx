import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePointerType } from '../hooks/usePointerType'

/**
 * CustomCursor component with interactive hover states, dynamic labels
 * ("View", "Open", "Drag"), and click shrink physics.
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('')

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for trailing ring
  const springConfig = { damping: 26, stiffness: 280, mass: 0.5 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  // Fast spring for inner dot
  const dotSpringConfig = { damping: 45, stiffness: 1200 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) {
      document.body.classList.remove('custom-cursor-active')
      return
    }

    document.body.classList.add('custom-cursor-active')

    let rafId = null

    const handleMouseMove = (e) => {
      if (rafId) return
      const clientX = e.clientX
      const clientY = e.clientY

      rafId = requestAnimationFrame(() => {
        mouseX.set(clientX)
        mouseY.set(clientY)
        setIsVisible(true)
        rafId = null
      })
    }

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Interactive element detection via event delegation
    const handleMouseOver = (e) => {
      const target = e.target

      // Check for explicit data-cursor label
      const cursorEl = target.closest('[data-cursor], [data-cursor-label]')
      if (cursorEl) {
        setIsHovered(true)
        const label =
          cursorEl.getAttribute('data-cursor-label') ||
          cursorEl.getAttribute('data-cursor') ||
          ''
        // If data-cursor is just a boolean or empty string, no label
        if (label && label !== 'true' && label !== 'false') {
          setCursorLabel(label)
        } else {
          setCursorLabel('')
        }
        return
      }

      // Check standard interactive elements
      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"]')
      if (interactiveEl) {
        setIsHovered(true)
        setCursorLabel('')
      } else {
        setIsHovered(false)
        setCursorLabel('')
      }
    }

    const handleMouseOut = (e) => {
      // If mouse leaves the current window or target has no relatedTarget
      if (!e.relatedTarget) {
        setIsHovered(false)
        setCursorLabel('')
        return
      }

      const relatedInteractive = e.relatedTarget.closest(
        '[data-cursor], [data-cursor-label], a, button, input, textarea, select, [role="button"]',
      )
      if (!relatedInteractive) {
        setIsHovered(false)
        setCursorLabel('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [hasFinePointer, prefersReducedMotion, mouseX, mouseY])

  if (!hasFinePointer || prefersReducedMotion) {
    return null
  }

  // Determine size based on state
  let ringSize = 34
  let ringBg = 'rgba(139, 92, 246, 0.08)'
  let ringBorder = '1.5px solid rgba(196, 181, 253, 0.75)'
  let ringScale = isClicking ? 0.75 : 1

  if (cursorLabel) {
    ringSize = 74
    ringBg = 'rgba(139, 92, 246, 0.35)'
    ringBorder = '1.5px solid rgba(221, 214, 254, 0.95)'
  } else if (isHovered) {
    ringSize = 50
    ringBg = 'rgba(139, 92, 246, 0.2)'
    ringBorder = '1.5px solid rgba(221, 214, 254, 0.85)'
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Trailing Ring with dynamic size, hover state, and label */}
      <motion.div
        aria-hidden="true"
        animate={{
          width: ringSize,
          height: ringSize,
          scale: ringScale,
          backgroundColor: ringBg,
          border: ringBorder,
        }}
        transition={{
          width: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.15, ease: 'easeOut' },
          backgroundColor: { duration: 0.2 },
          border: { duration: 0.2 },
        }}
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
          borderRadius: '50%',
          boxShadow: cursorLabel
            ? '0 0 24px rgba(139, 92, 246, 0.5), inset 0 0 12px rgba(196, 181, 253, 0.3)'
            : isHovered
              ? '0 0 20px rgba(139, 92, 246, 0.4)'
              : '0 0 16px rgba(139, 92, 246, 0.25)',
          backdropFilter: cursorLabel ? 'blur(4px)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <AnimatePresence>
          {cursorLabel && (
            <motion.span
              key={cursorLabel}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                userSelect: 'none',
              }}
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center Dot (faded when displaying label, shrinks on click) */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: isClicking ? 0.6 : cursorLabel ? 0 : 1,
          opacity: isVisible && !cursorLabel ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#f5f3ff',
          boxShadow: '0 0 8px #c4b5fd',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
