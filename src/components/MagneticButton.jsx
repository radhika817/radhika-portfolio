import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePointerType } from '../hooks/usePointerType'

/**
 * MagneticButton component providing smooth magnetic pull toward cursor.
 * Disabled on touch devices and under prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  as = 'div',
  style = {},
  className = '',
  ...props
}) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Fast, responsive spring for magnetic pull
  const springConfig = { damping: 14, stiffness: 160, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rafRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!hasFinePointer || prefersReducedMotion || !ref.current) return
    const clientX = e.clientX
    const clientY = e.clientY

    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      if (!ref.current) return
      const { left, top, width, height } = ref.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const distanceX = (clientX - centerX) * strength
      const distanceY = (clientY - centerY) * strength
      x.set(distanceX)
      y.set(distanceY)
    })
  }

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    x.set(0)
    y.set(0)
  }

  const MotionComponent = motion[as] || motion.div

  if (!hasFinePointer || prefersReducedMotion) {
    const Component = as
    return (
      <Component style={style} className={className} {...props}>
        {children}
      </Component>
    )
  }

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        ...style,
        x: springX,
        y: springY,
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}
