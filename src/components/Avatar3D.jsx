import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

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
 */
export default function Avatar3D() {
  const prefersReducedMotion = useReducedMotion()

  return (
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
  )
}

// Preload 3D model
useGLTF.preload('/models/avatar.glb')
