import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Avatar3D component rendering the developer's pixel-art avatar with
 * smooth 3D perspective tilt following the cursor, idle float physics,
 * and holographic violet glow.
 */
export default function Avatar3D() {
  const prefersReducedMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for responsive 3D tilt
  const springConfig = { damping: 22, stiffness: 220, mass: 0.3 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig)
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      // Normalize pointer between -0.5 and 0.5
      mouseX.set(e.clientX / innerWidth - 0.5)
      mouseY.set(e.clientY / innerHeight - 0.5)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, prefersReducedMotion])

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '430px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
      }}
    >
      {/* 3D Tilting and Floating Card */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [-8, 8, -8],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 4.5,
          ease: 'easeInOut',
        }}
        style={{
          position: 'relative',
          width: '100%',
          transformStyle: 'preserve-3d',
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          cursor: 'grab',
        }}
      >
        {/* Outer glowing border card */}
        <div
          style={{
            position: 'relative',
            borderRadius: '28px',
            padding: '10px',
            background:
              'linear-gradient(135deg, rgba(196, 181, 253, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(109, 40, 217, 0.5) 100%)',
            boxShadow:
              '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 50px rgba(139, 92, 246, 0.35), inset 0 0 20px rgba(167, 139, 250, 0.2)',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden',
          }}
        >
          {/* Avatar Image */}
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#0d0718',
            }}
          >
            <img
              src="/images/avatar.png"
              alt="Radhika Kandalkar — Developer Avatar"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                imageRendering: 'pixelated',
                transform: 'scale(1.01)',
                transition: 'transform 0.3s ease',
              }}
            />

            {/* Subtle holographic sheen following cursor */}
            {!prefersReducedMotion && (
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle 320px at center, rgba(255, 255, 255, 0.15) 0%, transparent 65%)',
                  left: glareX,
                  top: glareY,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  mixBlendMode: 'overlay',
                }}
              />
            )}

            {/* Bottom vignette glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(7, 4, 13, 0.5) 0%, transparent 40%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Interactive Status Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: '22px',
              left: '50%',
              transform: 'translateX(-50%) translateZ(30px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              background: 'rgba(7, 4, 13, 0.82)',
              border: '1px solid rgba(167, 139, 250, 0.35)',
              backdropFilter: 'blur(10px)',
              color: 'var(--color-lavender)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(139, 92, 246, 0.3)',
              userSelect: 'none',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }}
            />
            <span>radhika.dev // active</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
