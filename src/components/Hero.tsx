import React, { Component, ErrorInfo, ReactNode, Suspense, lazy } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const LazyShaderAnimation = lazy(() => 
  import("@/components/ui/shader-animation").then(module => ({ default: module.ShaderAnimation }))
)

class WebGLErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("WebGL component failed to load:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const handleExplore = () => {
    document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 100%)"
        }}
        aria-hidden="true"
      />
      
      {!reduceMotion && (
        <WebGLErrorBoundary>
          <Suspense fallback={null}>
            <LazyShaderAnimation />
          </Suspense>
        </WebGLErrorBoundary>
      )}

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Badge variant="outline" className="mb-6 inline-flex items-center gap-2 border-primary/40 bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-sm">
            <Sparkle size={16} weight="fill" className="animate-pulse" />
            <span>Local-first AI · Energy · Education · Governance</span>
          </Badge>
        </motion.div>

        <motion.h1
          className="mb-6 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight"
          variants={itemVariants}
        >
          Turn{" "}
          <span className="bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
            open tools
          </span>{" "}
          into{" "}
          <span className="bg-gradient-to-r from-secondary via-secondary/90 to-accent bg-clip-text text-transparent">
            policy-backed pilots
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mb-8 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl"
          variants={itemVariants}
        >
          From GitHub, to campus, to statehouse. AltruisticXAI connects open-source labs, ROI-positive pilots, and durable policy outcomes.
        </motion.p>

        <motion.div className="flex flex-col items-center justify-center gap-4 sm:flex-row" variants={itemVariants}>
          <Button 
            asChild 
            size="lg"
            className="w-full rounded-full bg-primary text-base font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl sm:w-auto sm:px-8"
          >
            <a 
              href="https://schedule.altruisticxai.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Book a Call
              <ArrowRight size={18} weight="bold" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleExplore}
            className="w-full rounded-full font-medium sm:w-auto"
          >
            Explore Solutions
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
