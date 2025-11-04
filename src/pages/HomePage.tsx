import LayoutShell from "@/components/LayoutShell"
import SectionCard from "@/components/SectionCard"
import ImpactTable from "@/components/ImpactTable"
import { impactEvents, ImpactEvent } from "@/data/impactEvents"
import { Flask, Briefcase, Scroll, ArrowsClockwise, Sparkle } from "@phosphor-icons/react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function HomePage() {
  const latestImpact = impactEvents.slice(0, 3) as ImpactEvent[]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <motion.div 
          className="mb-12 text-center sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 flex justify-center sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary sm:px-6 sm:py-2.5 sm:text-base">
              <Sparkle size={20} weight="fill" className="animate-pulse" />
              <span>Ethical AI for the Public Interest</span>
            </div>
          </motion.div>
          
          <h1 className="mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:mb-6 sm:text-5xl lg:text-6xl">
            Building Trust in AI Through Innovation
          </h1>
          
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            AltruisticXAI builds trust in artificial intelligence through open-source innovation, 
            strategic consulting, and evidence-based policy advocacy. Our three-arm approach creates 
            a sustainable flywheel that advances ethical AI while serving the public good.
          </p>
        </motion.div>

        <motion.div 
          className="mb-12 sm:mb-16 lg:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h2 className="mb-3 text-center text-2xl font-semibold text-foreground sm:mb-4 sm:text-3xl">
              The Impact Flywheel
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground sm:mb-12 sm:text-base">
              Each arm of our organization strengthens the others, creating a self-reinforcing cycle of innovation, 
              implementation, and influence.
            </p>
          </motion.div>

          <motion.div className="mb-8 flex items-center justify-center sm:mb-12" variants={itemVariants}>
            <Card className="w-full max-w-4xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 shadow-lg">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:items-start">
                  <div className="flex shrink-0 items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <ArrowsClockwise size={48} weight="duotone" className="text-primary sm:h-16 sm:w-16" />
                    </motion.div>
                  </div>
                  <div className="flex-1 space-y-3 text-center sm:space-y-4 md:text-left">
                    <div className="rounded-lg bg-background/50 p-3 transition-all hover:bg-background/80 sm:p-4">
                      <h3 className="mb-1.5 flex flex-wrap items-center justify-center gap-2 text-base font-semibold text-foreground sm:mb-2 sm:text-lg md:justify-start">
                        <Flask size={18} weight="fill" className="shrink-0 text-primary sm:h-5 sm:w-5" />
                        <span>Open Source Labs</span>
                        <span className="text-muted-foreground">→</span>
                      </h3>
                      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        Develops experimental AI tools and releases them publicly. Builds trust and demonstrates 
                        technical feasibility of ethical AI approaches.
                      </p>
                    </div>
                    <div className="rounded-lg bg-background/50 p-3 transition-all hover:bg-background/80 sm:p-4">
                      <h3 className="mb-1.5 flex flex-wrap items-center justify-center gap-2 text-base font-semibold text-foreground sm:mb-2 sm:text-lg md:justify-start">
                        <Briefcase size={18} weight="fill" className="shrink-0 text-secondary sm:h-5 sm:w-5" />
                        <span>Consulting Studio</span>
                        <span className="text-muted-foreground">→</span>
                      </h3>
                      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        Adapts open-source tools for paying clients (universities, hospitals, government). 
                        Generates revenue and creates real-world case studies with measurable impact.
                      </p>
                    </div>
                    <div className="rounded-lg bg-background/50 p-3 transition-all hover:bg-background/80 sm:p-4">
                      <h3 className="mb-1.5 flex flex-wrap items-center justify-center gap-2 text-base font-semibold text-foreground sm:mb-2 sm:text-lg md:justify-start">
                        <Scroll size={18} weight="fill" className="shrink-0 text-accent sm:h-5 sm:w-5" />
                        <span>Policy Alliance</span>
                        <span className="text-muted-foreground">→</span>
                      </h3>
                      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        Uses client results as evidence for policy proposals. Successful policies create demand for 
                        compliance tools, driving more consulting work and funding new Labs projects.
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-3 sm:p-4">
                      <p className="text-xs font-medium leading-relaxed text-primary sm:text-sm">
                        ✓ Self-sustaining cycle: Open Source builds trust → Consulting generates revenue → 
                        Policy creates demand → Back to Open Source
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <SectionCard
                icon={<Flask size={32} weight="duotone" className="text-primary" />}
                title="Open Source Labs"
                description="Trust Engine: Build experimental AI tools in the open. Establish technical credibility and demonstrate ethical approaches work in practice."
                href="/labs"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                icon={<Briefcase size={32} weight="duotone" className="text-secondary" />}
                title="Consulting Studio"
                description="Revenue Engine: Adapt proven open-source tools for institutional clients. Generate sustainable funding and produce real-world impact metrics."
                href="/consulting"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
              <SectionCard
                icon={<Scroll size={32} weight="duotone" className="text-accent" />}
                title="Policy Alliance"
                description="Influence Engine: Transform client case studies into evidence-based policy recommendations. Create structural change that scales impact."
                href="/policy"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Latest Impact</h2>
              <p className="text-sm text-muted-foreground sm:text-base">Recent milestones across our three arms</p>
            </div>
          </div>
          <ImpactTable events={latestImpact} />
        </motion.div>
      </div>
    </LayoutShell>
  );
}
