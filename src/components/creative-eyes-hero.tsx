import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function CreativeEyesHero() {
  const eyesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyesRef.current) return

      const eyes = eyesRef.current.querySelectorAll(".eye")
      eyes.forEach((eye) => {
        const eyeElement = eye as HTMLElement
        const rect = eyeElement.getBoundingClientRect()
        const eyeX = rect.left + rect.width / 2
        const eyeY = rect.top + rect.height / 2

        const deltaX = e.clientX - eyeX
        const deltaY = e.clientY - eyeY
        const angle = Math.atan2(deltaY, deltaX)

        const pupil = eyeElement.querySelector(".pupil") as HTMLElement
        if (pupil) {
          const distance = Math.min(rect.width / 4, 20)
          const x = Math.cos(angle) * distance
          const y = Math.sin(angle) * distance
          pupil.style.transform = `translate(${x}px, ${y}px)`
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Creative Eyes
              <br />
              <span className="text-primary">Watching You</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg"
            >
              Experience interactive design that follows your every move. A
              playful demonstration of modern web creativity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Get Started
              </button>
              <button className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors font-medium">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
            ref={eyesRef}
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
              
              <div className="relative z-10 grid grid-cols-2 gap-8 p-8">
                {[0, 1].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="eye aspect-square bg-card rounded-full shadow-2xl border-4 border-border flex items-center justify-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-card to-muted" />
                    <div className="pupil relative w-1/3 h-1/3 bg-foreground rounded-full transition-transform duration-100 ease-out shadow-lg">
                      <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-background rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-accent rounded-full blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
