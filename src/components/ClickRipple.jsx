import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePointerType } from '../hooks/usePointerType'

/**
 * ClickRipple component emitting a smooth violet pulse ring on mouse clicks.
 * Automatically disabled under reduced motion or on touch devices.
 */
export default function ClickRipple() {
  const [ripples, setRipples] = useState([])
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) return

    const handleClick = (e) => {
      const newRipple = {
        id: `${Date.now()}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
      }

      setRipples((prev) => [...prev.slice(-6), newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 550)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [hasFinePointer, prefersReducedMotion])

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
        zIndex: 9997,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.2, opacity: 0.85 }}
            animate={{ scale: 3.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1.5px solid rgba(196, 181, 253, 0.9)',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              boxShadow: '0 0 16px rgba(139, 92, 246, 0.5)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
