import { Component, Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Checks if the current browser environment supports WebGL
 */
function isWebGLAvailable() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

/**
 * Static fallback avatar image displayed when WebGL is unavailable,
 * model loading fails, or reduced motion is preferred.
 */
export function StaticAvatarFallback() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '1px solid var(--border-medium)',
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.35)',
        }}
      >
        <img
          src="/images/avatar.png"
          alt="Radhika Kandalkar — 3D Developer Avatar representation"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '420px',
            display: 'block',
            objectFit: 'cover',
          }}
        />
        {/* Subtle overlay gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7, 4, 13, 0.7) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}

/**
 * Error boundary component catching 3D/WebGL failures
 */
class AvatarErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.warn('Avatar3D encountered an error; falling back to static avatar image:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <StaticAvatarFallback />
    }
    return this.props.children
  }
}

/**
 * 3D Avatar Model component with cursor-following rotation and idle float
 */
function AvatarModel({ prefersReducedMotion }) {
  const modelRef = useRef()
  const { scene } = useGLTF('/models/avatar.glb')

  useFrame((state) => {
    if (!modelRef.current || prefersReducedMotion) return

    // Tilt head/bust smoothly toward pointer coordinates
    const targetRotX = -state.pointer.y * 0.35
    const targetRotY = state.pointer.x * 0.55

    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetRotX,
      0.06,
    )
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotY,
      0.06,
    )
  })

  return (
    <group ref={modelRef} dispose={null}>
      <primitive object={scene} scale={1.85} position={[0, -0.4, 0]} />
    </group>
  )
}

/**
 * Loading fallback skeleton shown while 3D model loads
 */
function AvatarLoader() {
  return (
    <div
      style={{
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        border: '2px dashed rgba(167, 139, 250, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        color: 'var(--color-lavender)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
      }}
    >
      <span style={{ animation: 'pulse 1.5s infinite' }}>Loading 3D Avatar...</span>
    </div>
  )
}

/**
 * Avatar3D component rendering interactive 3D developer avatar via React Three Fiber
 * with automatic fallback to static image on WebGL failure or load error.
 */
export default function Avatar3D() {
  const prefersReducedMotion = useReducedMotion()
  const [webGLSupported, setWebGLSupported] = useState(true)

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable())
  }, [])

  if (!webGLSupported) {
    return <StaticAvatarFallback />
  }

  return (
    <AvatarErrorBoundary fallback={<StaticAvatarFallback />}>
      <div
        style={{
          width: '100%',
          height: '460px',
          maxWidth: '520px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Suspense fallback={<AvatarLoader />}>
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance',
            }}
          >
            {/* Violet After Dark 3D Lighting */}
            <ambientLight intensity={0.9} color="#e9d5ff" />
            <directionalLight position={[4, 6, 4]} intensity={2.2} color="#ffffff" />
            <pointLight position={[-4, -2, -3]} intensity={3.5} color="#8b5cf6" />
            <pointLight position={[3, -1, -2]} intensity={2.5} color="#a855f7" />
            <pointLight position={[0, 4, 3]} intensity={1.5} color="#ddd6fe" />

            {/* Idle Hover Float Animation */}
            <Float
              speed={prefersReducedMotion ? 0 : 2.2}
              rotationIntensity={prefersReducedMotion ? 0 : 0.25}
              floatIntensity={prefersReducedMotion ? 0 : 0.6}
              floatingRange={[-0.1, 0.1]}
            >
              <AvatarModel prefersReducedMotion={prefersReducedMotion} />
            </Float>
          </Canvas>
        </Suspense>
      </div>
    </AvatarErrorBoundary>
  )
}

// Preload 3D model
try {
  useGLTF.preload('/models/avatar.glb')
} catch (e) {
  // Graceful no-op if preload fails
}
