import React, { useEffect, useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion()
  const particles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 10 + 15,
  }))

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute left-[40%] top-[30%] h-[400px] w-[400px] rounded-full bg-accent/5 blur-[90px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 20, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

interface GridPatternProps {
  className?: string
}

export function GridPattern({ className = "" }: GridPatternProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                backgroundPosition: ["0px 0px", "80px 80px"],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 3,
  yOffset = 10,
  className = "",
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [-yOffset, yOffset, -yOffset],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
}

export function ShimmerText({ children, className = "" }: ShimmerTextProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>
  }

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  )
}

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerChildren({ children, className = "", staggerDelay = 0.1 }: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  )
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}
