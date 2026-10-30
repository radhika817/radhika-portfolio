import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * 21st.dev inspired Text Reveal and Animated Gradient Heading
 * adapted for the Violet After Dark design system.
 * Features staggered word blur-reveal and a continuous fluid gradient sheen.
 */
export default function AnimatedHeroHeading({ name }) {
  const prefersReducedMotion = useReducedMotion()
  const words = name.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      filter: prefersReducedMotion ? 'none' : 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.h1
      variants={prefersReducedMotion ? {} : containerVariants}
      initial="hidden"
      animate="visible"
      className="hero-animated-heading flex flex-wrap gap-x-3.5 leading-tight tracking-tight font-extrabold"
      style={{
        fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
        marginBottom: '0.25rem',
      }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className={`hero-gradient-text inline-block ${
            prefersReducedMotion ? '' : 'animate-gradient-flow'
          }`}
          style={{
            backgroundImage:
              'linear-gradient(135deg, #ffffff 0%, #ede9fe 25%, #c4b5fd 50%, #8b5cf6 75%, #a78bfa 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}
