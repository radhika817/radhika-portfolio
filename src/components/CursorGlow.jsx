import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePointerType } from '../hooks/usePointerType'

/**
 * CursorGlow component rendering a soft violet radial spotlight that follows
 * the pointer across the background, GPU accelerated with spring physics.
 */
export default function CursorGlow() {
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-600)
  const mouseY = useMotionValue(-600)

  // Fluid spring for smooth ambient spotlight lag
  const springX = useSpring(mouseX, { damping: 35, stiffness: 180, mass: 0.8 })
  const springY = useSpring(mouseY, { damping: 35, stiffness: 180, mass: 0.8 })

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) return

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
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [hasFinePointer, prefersReducedMotion, isVisible, mouseX, mouseY])

  if (!hasFinePointer || prefersReducedMotion) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: springX,
        top: springY,
        x: '-50%',
        y: '-50%',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(109, 40, 217, 0.06) 45%, rgba(7, 4, 13, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(30px)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    />
  )
}
