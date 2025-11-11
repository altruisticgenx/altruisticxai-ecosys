import React, { Component, ErrorInfo, ReactNode, Suspense, lazy } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, useReducedMotion, type Variants } from "framer-motion"

const LazyShaderAnimation = lazy(() => 
  import("@/components/ui/shader-animation").then(module => ({
    default: module.ShaderAnimation
  }))
)

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn("WebGL component error:", error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const handleExplore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section
      className="relative flex min-h-[65vh] items-center overflow-hidden py-12 sm:py-16 md:py-20 text-white"
      aria-labelledby="hero-heading"
    >
      <WebGLErrorBoundary
        fallback={
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              background: "linear-gradient(135deg, #000000 0%, #a3e635 25%, #c4b5fd 50%, #fdba74 75%, #000000 100%)",
              backgroundSize: "400% 400%",
              animation: "gradient-shift 15s ease infinite"
            }}
            aria-hidden
          />
        }
      >
        {!reduceMotion && (
          <Suspense fallback={null}>
            <LazyShaderAnimation />
          </Suspense>
        )}
      </WebGLErrorBoundary>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <Badge variant="secondary" className="inline-flex items-center gap-1.5 px-3 py-1.5">
            <Sparkle className="w-3.5 h-3.5" weight="fill" />
            <span>Ethical AI Strategy — Built for Good, Designed for Impact</span>
          </Badge>
        </motion.div>

        <motion.h1
          id="hero-heading"
          className="mb-4 leading-tight"
          variants={itemVariants}
        >
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black drop-shadow-lg mb-1 bg-gradient-to-r from-lime-400 via-purple-300 to-orange-300 bg-clip-text text-transparent">
            Turn AI Vision
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black drop-shadow-lg">
            into Impact
          </span>
        </motion.h1>

        <motion.p
          className="text-xs sm:text-sm md:text-base font-normal mb-6 max-w-xl mx-auto leading-relaxed text-white/90"
          variants={itemVariants}
        >
          We help organizations build trustworthy, local-first AI solutions — code-first labs, ROI-driven pilots, and policy that scales what works.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          variants={itemVariants}
        >
          <Button
            asChild
            size="default"
            className="font-semibold inline-flex items-center gap-2"
            aria-label="Book an Ecosystem Intro Call"
          >
            <a
              href="https://scheduler.zoom.us/altruistic-xai/altruisticxai-booking"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
              <ArrowRight className="w-3.5 h-3.5" weight="bold" />
            </a>
          </Button>

          <Button
            onClick={handleExplore}
            size="default"
            variant="outline"
            className="font-medium"
            aria-label="Explore our solutions"
          >
            Explore Solutions
          </Button>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}

export default Hero
