import { Link } from "react-router-dom"
import { projects } from "@/data/projects"
import { Flask, Briefcase, Scroll, Sparkle, ArrowRight, Buildings, GraduationCap, Users } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const pillars = [
  {
    id: "labs",
    name: "Open Source Labs",
    href: "/labs",
    tag: "Trust Engine",
    icon: Flask,
    description: "We publish local-first, transparent AI tools so anyone can inspect, fork, and deploy.",
    promise: "Code before claims. Public repos, reproducible results.",
  },
  {
    id: "consulting",
    name: "Consulting Studio",
    href: "/consulting",
    tag: "Revenue Engine",
    icon: Briefcase,
    description: "We turn prototypes into ROI-positive pilots for universities, utilities, and cities.",
    promise: "12–24 month payback, CFO-proof metrics or we don't ship.",
  },
  {
    id: "policy",
    name: "Policy Alliance",
    href: "/policy",
    tag: "Influence Engine",
    icon: Scroll,
    description: "We convert working pilots into durable funding and rules, not just press releases.",
    promise: "Executive actions, budget lines, and model standards.",
  },
]

const audiences = [
  {
    name: "Universities & Colleges",
    icon: GraduationCap,
    detail: "Campus energy intelligence, AI governance sandboxes, and student capstone pipelines.",
  },
  {
    name: "Cities & Utilities",
    icon: Buildings,
    detail: "Grid-aware analytics, demand-side pilots, and procurement that doesn't stall for 18 months.",
  },
  {
    name: "Ecosystem Partners",
    icon: Users,
    detail: "Foundations, consortia, and open-source communities that want verifiable impact, not vanity metrics.",
  },
]

export default function HomePage() {
  const latestProjects = projects.slice(0, 3)
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }
    }
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0 : 0.6 }
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute -top-24 left-[-8%] h-56 w-56 rounded-full bg-primary/8 blur-3xl sm:-top-32 sm:h-64 sm:w-64"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[-4%] right-[-4%] h-64 w-64 rounded-full bg-accent/10 blur-3xl sm:h-72 sm:w-72"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-4 sm:gap-12 sm:px-6 sm:pb-16 sm:pt-6 lg:gap-16 lg:px-8 lg:pb-20 lg:pt-8">
        <motion.header 
          className="flex items-center justify-between gap-3 py-2 sm:gap-4 sm:py-3"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3">
            <motion.div 
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md ring-1 ring-primary/20 sm:h-10 sm:w-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs font-bold tracking-tight text-primary-foreground sm:text-sm">AX</span>
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-foreground sm:text-sm">AltruisticXAI Ecosystem</span>
              <span className="hidden text-[10px] text-muted-foreground sm:block sm:text-[11px]">
                Labs · Consulting · Policy · Impact
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 text-xs sm:flex sm:gap-2">
            {pillars.map((pillar) => (
              <Link
                key={pillar.id}
                to={pillar.href}
                className="rounded-full px-3 py-1.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
              >
                {pillar.name.split(' ').pop()}
              </Link>
            ))}
            <Link
              to="/impact-ledger"
              className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-primary transition-all hover:border-primary hover:bg-primary/10 active:scale-95"
            >
              Impact Ledger
            </Link>
          </nav>
        </motion.header>

        <motion.section 
          className="space-y-6 sm:space-y-7 lg:space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-4 inline-flex items-center gap-1.5 border-primary/40 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary shadow-sm sm:mb-5 sm:gap-2 sm:text-xs">
              <Sparkle size={14} weight="fill" className="animate-pulse" />
              <span>Local-first AI · Energy · Education · Governance</span>
            </Badge>

            <h1 className="mb-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:mb-4 sm:text-4xl lg:text-5xl">
              Turn{" "}
              <span className="bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
                open tools
              </span>{" "}
              into{" "}
              <span className="bg-gradient-to-r from-secondary via-secondary/90 to-accent bg-clip-text text-transparent">
                policy-backed pilots
              </span>{" "}
              that actually ship.
            </h1>
            
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
              AltruisticXAI is a connected ecosystem: we ship{" "}
              <span className="font-medium text-foreground">open-source labs</span>, run{" "}
              <span className="font-medium text-foreground">ROI-positive consulting pilots</span>, and translate what works into{" "}
              <span className="font-medium text-foreground">durable funding and rules</span>. One flywheel—from GitHub, to campus, to statehouse.
            </p>
          </motion.div>

          <motion.div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap" variants={itemVariants}>
            <Button 
              asChild 
              size="lg"
              className="w-full rounded-full bg-primary text-sm font-semibold shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] sm:w-auto sm:px-6"
            >
              <Link to="/consulting">
                Book an ecosystem intro call
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="group w-full rounded-full border-border text-sm font-semibold transition-all hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-[0.98] sm:w-auto sm:px-6"
            >
              <Link to="/impact-ledger" className="flex items-center gap-1.5">
                Browse the Impact Ledger
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-2 text-[11px] sm:hidden" 
            variants={itemVariants}
          >
            {pillars.map((pillar) => (
              <Link 
                key={pillar.id} 
                to={pillar.href} 
                className="rounded-full bg-muted px-3 py-1.5 text-muted-foreground transition-all active:scale-95"
              >
                {pillar.name.split(' ').pop()}
              </Link>
            ))}
          </motion.div>
        </motion.section>

        <motion.section 
          className="space-y-5 sm:space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl">
                Three engines. One ecosystem.
              </h2>
              <p className="max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                Everything is designed as a flywheel:{" "}
                <span className="text-foreground">Open Source Labs → Consulting Studio → Policy Alliance → back to Labs.</span>
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="grid gap-3 sm:gap-4 md:grid-cols-3"
            variants={containerVariants}
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <motion.div key={pillar.id} variants={itemVariants}>
                  <Link to={pillar.href}>
                    <Card className="group flex h-full flex-col justify-between border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98] sm:p-5">
                      <div className="space-y-2.5 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-primary">
                            {pillar.tag}
                          </Badge>
                          <div className="h-px flex-1 bg-border" />
                          <Icon size={18} weight="duotone" className="shrink-0 text-primary transition-transform group-hover:scale-110" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground sm:text-base">{pillar.name}</h3>
                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{pillar.description}</p>
                      </div>
                      <div className="mt-4 space-y-2 sm:mt-5">
                        <p className="text-xs font-medium text-primary sm:text-sm">{pillar.promise}</p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary transition-all group-hover:gap-1.5 group-hover:text-secondary">
                          Explore {pillar.name}
                          <ArrowRight size={12} weight="bold" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.section>

        <motion.section 
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-4 sm:p-6">
            <h2 className="mb-2 text-base font-semibold sm:mb-3 sm:text-lg lg:text-xl">
              The flywheel: from GitHub to budget line
            </h2>
            <p className="mb-4 text-xs leading-relaxed text-muted-foreground sm:mb-5 sm:text-sm">
              This isn't "slide deck → shrug." It's a simple, repeatable loop:
            </p>
            <div className="grid gap-2.5 sm:gap-3 md:grid-cols-2 lg:grid-cols-4">
              <FlywheelStep label="1. Open Source" detail="Labs ship tools and datasets into public repos." />
              <FlywheelStep label="2. Pilots" detail="Consulting deploys them with real clients and KPIs." />
              <FlywheelStep label="3. Policy" detail="Policy Alliance codifies wins into funding and rules." />
              <FlywheelStep label="4. Back to Labs" detail="New mandates + money = next generation of tools." />
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="space-y-5 sm:space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 className="text-lg font-semibold sm:text-xl lg:text-2xl" variants={itemVariants}>
            Who plugs into this?
          </motion.h2>
          <motion.div 
            className="grid gap-3 sm:gap-4 md:grid-cols-3"
            variants={containerVariants}
          >
            {audiences.map((aud) => {
              const Icon = aud.icon
              return (
                <motion.div key={aud.name} variants={itemVariants}>
                  <Card className="h-full border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-5">
                    <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
                      <Icon size={20} weight="duotone" className="shrink-0 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground sm:text-base">{aud.name}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{aud.detail}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.section>

        <motion.section 
          className="space-y-4 sm:space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl">Recent pilots & signals</h2>
              <p className="text-xs text-muted-foreground sm:text-sm">Latest from the Impact Ledger</p>
            </div>
            <Link
              to="/impact-ledger"
              className="group inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-secondary sm:text-sm"
            >
              Open the full Impact Ledger
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.div 
            className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {latestProjects.map((p) => (
              <motion.article
                key={p.id}
                variants={itemVariants}
              >
                <Card className="flex h-full flex-col border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-5">
                  <div className="mb-2.5 flex items-center justify-between gap-2 sm:mb-3">
                    <Badge variant="secondary" className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-foreground">
                      {p.origin === "labs" ? "Labs" : "Consulting"}
                    </Badge>
                    {p.sector && (
                      <span className="line-clamp-1 text-[10px] text-muted-foreground">{p.sector}</span>
                    )}
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-foreground sm:mb-2 sm:text-base">{p.title}</h3>
                  <p className="mb-3 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{p.description}</p>
                  {p.short_kpi_summary && (
                    <p className="mt-auto text-[11px] font-medium text-primary sm:text-xs">{p.short_kpi_summary}</p>
                  )}
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </main>
  )
}

function FlywheelStep({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex-1 rounded-xl border border-border bg-background/60 p-3 backdrop-blur-sm transition-all hover:bg-background/80 sm:p-3.5">
      <div className="mb-1 text-[11px] font-semibold text-primary sm:text-xs">{label}</div>
      <div className="text-[11px] leading-relaxed text-muted-foreground sm:text-xs">{detail}</div>
    </div>
  )
}
