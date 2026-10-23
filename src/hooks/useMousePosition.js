import { useState, useEffect } from 'react'

/**
 * Custom hook to track viewport mouse position, visibility, and cursor speed
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: -100,
    y: -100,
    isVisible: false,
    speed: 0,
  })

  useEffect(() => {
    let lastX = -100
    let lastY = -100
    let lastTime = performance.now()
    let rafId = null
    let pendingEvent = null

    const updatePosition = () => {
      if (!pendingEvent) return
      const { clientX, clientY } = pendingEvent
      const currentTime = performance.now()
      const dt = Math.max(1, currentTime - lastTime)
      const dx = clientX - lastX
      const dy = clientY - lastY
      const distance = Math.hypot(dx, dy)
      const speed = (distance / dt) * 16.67 // normalized speed per 60fps frame

      lastX = clientX
      lastY = clientY
      lastTime = currentTime

      setMousePosition({
        x: clientX,
        y: clientY,
        isVisible: true,
        speed,
      })
      rafId = null
    }

    const handleMouseMove = (e) => {
      pendingEvent = { clientX: e.clientX, clientY: e.clientY }
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition)
      }
    }

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      setMousePosition((prev) => ({ ...prev, isVisible: false }))
    }

    const handleMouseEnter = () => {
      setMousePosition((prev) => ({ ...prev, isVisible: true }))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return mousePosition
}
