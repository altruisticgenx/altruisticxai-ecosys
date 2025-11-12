import React from "react"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkle } from "@phosphor-icons/react"

export default function Hero() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: "easeOut",
      },
    },
  }

  const handleExplore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkle weight="fill" size={16} />
              <span>Open AI Labs, Consulting & Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Turn open tools into{" "}
              <span className="text-primary">policy-backed pilots</span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            From GitHub, to campus, to statehouse. We bridge the gap between innovative open-source AI tools and real-world policy implementation.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <Button
              onClick={handleExplore}
              variant="glow"
              size="xs"
              className="group"
            >
              <Sparkle size={14} weight="fill" />
              <span>Explore Solutions</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" weight="bold" size={14} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = "/labs"}
            >
              View Labs
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
