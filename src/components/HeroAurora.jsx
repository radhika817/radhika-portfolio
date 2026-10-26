import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * 21st.dev inspired multi-layered Aurora and Spotlight effect
 * adapted for the Violet After Dark design system.
 * Features drifting aurora gradient waves, radial spotlight falloff,
 * and graceful fallback for reduced motion.
 */
export default function HeroAurora() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="hero-aurora-wrapper pointer-events-none absolute inset-0 -z-10 overflow-hidden flex items-center justify-center"
    >
      {/* Primary Radial Spotlight Beam */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.38) 0%, rgba(109, 40, 217, 0.22) 45%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* 21st.dev Aurora Wave Gradient Layer */}
      <div
        className={`hero-aurora-mesh absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full will-change-transform ${
          prefersReducedMotion ? '' : 'animate-aurora-drift'
        }`}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              115deg,
              rgba(139, 92, 246, 0.35) 0%,
              rgba(196, 181, 253, 0.3) 15%,
              rgba(109, 40, 217, 0.25) 30%,
              rgba(56, 189, 248, 0.18) 45%,
              rgba(139, 92, 246, 0.35) 60%
            )
          `,
          backgroundSize: '200% 200%',
          filter: 'blur(35px)',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 72%)',
          opacity: 0.85,
        }}
      />

      {/* Secondary Soft Ambient Counter-Wave */}
      {!prefersReducedMotion && (
        <div
          className="hero-aurora-counter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full will-change-transform animate-aurora-reverse"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at 40% 40%,
                rgba(217, 70, 239, 0.2) 0%,
                rgba(139, 92, 246, 0.28) 45%,
                transparent 70%
              )
            `,
            filter: 'blur(45px)',
            opacity: 0.75,
          }}
        />
      )}

      {/* Subtle Orbital Glass Rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-violet-500/20"
        style={{
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.15)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-dashed border-violet-400/15"
      />
    </div>
  )
}
