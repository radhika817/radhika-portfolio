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

    const handleMouseMove = (e) => {
      const currentTime = performance.now()
      const dt = Math.max(1, currentTime - lastTime)
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const distance = Math.hypot(dx, dy)
      const speed = (distance / dt) * 16.67 // normalized speed per 60fps frame

      lastX = e.clientX
      lastY = e.clientY
      lastTime = currentTime

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        isVisible: true,
        speed,
      })
    }

    const handleMouseLeave = () => {
      setMousePosition((prev) => ({ ...prev, isVisible: false }))
    }

    const handleMouseEnter = () => {
      setMousePosition((prev) => ({ ...prev, isVisible: true }))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return mousePosition
}
