import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Violet top scroll progress bar indicating scroll completion across the page
 */
export default function ScrollProgressBar() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  if (prefersReducedMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)',
        boxShadow: '0 0 12px rgba(167, 139, 250, 0.8), 0 0 4px #8b5cf6',
        transformOrigin: '0%',
        scaleX,
        zIndex: 1001,
        pointerEvents: 'none',
      }}
    />
  )
}
