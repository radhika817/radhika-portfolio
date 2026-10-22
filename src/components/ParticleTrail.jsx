import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePointerType } from '../hooks/usePointerType'

const MAX_PARTICLES = 45
const SPEED_THRESHOLD = 9
const SPARKLE_COLORS = ['#c4b5fd', '#a78bfa', '#8b5cf6', '#ddd6fe', '#ffffff']

/**
 * High-performance canvas particle trail emitting short-lived violet sparkles
 * on fast cursor movement with capped particle count and zero idle CPU overhead.
 */
export default function ParticleTrail() {
  const canvasRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { hasFinePointer } = usePointerType()

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let particles = []
    let lastX = -1
    let lastY = -1
    let isLoopRunning = false

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createParticle = (x, y) => {
      if (particles.length >= MAX_PARTICLES) {
        particles.shift() // Maintain strict particle cap
      }

      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 2.2 + 0.6
      const size = Math.random() * 2.5 + 1.2
      const maxLife = Math.floor(Math.random() * 20) + 18
      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]

      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3, // slight upward float
        size,
        life: maxLife,
        maxLife,
        color,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.94
        p.vy *= 0.94
        p.life -= 1

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const progress = p.life / p.maxLife
        const currentRadius = p.size * progress

        ctx.save()
        ctx.globalAlpha = Math.max(0, progress * 0.85)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = '#8b5cf6'

        ctx.beginPath()
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        isLoopRunning = false
      }
    }

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true
        animationFrameId = requestAnimationFrame(render)
      }
    }

    const handleMouseMove = (e) => {
      if (lastX === -1) {
        lastX = e.clientX
        lastY = e.clientY
        return
      }

      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const distance = Math.hypot(dx, dy)

      // Only emit sparkles when moving quickly
      if (distance > SPEED_THRESHOLD) {
        const count = Math.min(3, Math.floor(distance / SPEED_THRESHOLD))
        for (let i = 0; i < count; i++) {
          createParticle(e.clientX, e.clientY)
        }
        startLoop()
      }

      lastX = e.clientX
      lastY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [hasFinePointer, prefersReducedMotion])

  if (!hasFinePointer || prefersReducedMotion) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  )
}
