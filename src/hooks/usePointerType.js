import { useState, useEffect } from 'react'

/**
 * Helper hook to detect fine pointer (mouse, precision trackpad) vs coarse/touch pointer
 */
export function usePointerType() {
  const [hasFinePointer, setHasFinePointer] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return true
    return window.matchMedia('(pointer: fine)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(pointer: fine)')
    const updatePointer = (e) => {
      setHasFinePointer(e.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePointer)
    } else {
      mediaQuery.addListener(updatePointer)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updatePointer)
      } else {
        mediaQuery.removeListener(updatePointer)
      }
    }
  }, [])

  return {
    hasFinePointer,
    isTouch: !hasFinePointer,
  }
}
