import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePointerType } from '../hooks/usePointerType'

/**
 * CustomCursor component with central dot and trailing ring utilizing Framer Motion spring physics.
 * Hides native cursor only on fine-pointer devices and respects prefers-reduced-motion.
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for trailing ring
  const springConfig = { damping: 28, stiffness: 260, mass: 0.5 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  // Fast spring for inner dot
  const dotSpringConfig = { damping: 45, stiffness: 1200 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  useEffect(() => {
    // Only hide native cursor if fine pointer and not reduced motion
    if (!hasFinePointer || prefersReducedMotion) {
      document.body.classList.remove('custom-cursor-active')
      return
    }

    document.body.classList.add('custom-cursor-active')

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [hasFinePointer, prefersReducedMotion, isVisible, mouseX, mouseY])

  // Don't render on touch or reduced motion
  if (!hasFinePointer || prefersReducedMotion) {
    return null
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
      {/* Trailing Ring with spring physics */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1.5px solid rgba(196, 181, 253, 0.75)',
          backgroundColor: 'rgba(139, 92, 246, 0.08)',
          boxShadow: '0 0 16px rgba(139, 92, 246, 0.3)',
          pointerEvents: 'none',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Center Dot with rapid response */}
      <motion.div
        aria-hidden="true"
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
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      />
    </div>
  )
}
