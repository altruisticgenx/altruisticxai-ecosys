import React from "react"
import { Link } from "react-router-dom"
import { projects } from "@/data/projects"
import { Flask, Briefcase, Scroll, Sparkle, ArrowRight, Buildings, GraduationCap, Users, Database, CheckCircle } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import LayoutShell from "@/components/LayoutShell"

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1
    }
  }

  const itemTransition = {
    duration: prefersReducedMotion ? 0 : 0.4
  }

  return (
    <LayoutShell>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/80 z-10" />
            <div className="absolute inset-0" style={{ filter: 'blur(100px) saturate(150%) hue-rotate(-10deg)' }}>
              <motion.div 
                className="absolute -top-24 left-[-8%] h-96 w-96 rounded-full bg-primary/20 blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.25, 0.15]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity as number,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-1/4 right-[-10%] h-80 w-80 rounded-full bg-accent/25 blur-3xl"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity as number,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute bottom-[-10%] left-[10%] h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.25, 0.15]
                }}
                transition={{ 
                  duration: 12,
                  repeat: Infinity as number,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-8 sm:gap-12 sm:px-6 sm:pb-16 sm:pt-12 lg:gap-16 lg:px-8 lg:pb-20 lg:pt-16">

        <motion.section 
          className="space-y-6 sm:space-y-7 lg:space-y-8 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} transition={itemTransition} className="space-y-5 sm:space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="inline-flex items-center gap-1.5 border-primary/40 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary shadow-sm sm:gap-2 sm:text-xs">
                <Sparkle size={14} weight="fill" className="animate-pulse" />
                <span>Local-first AI · Energy · Education · Governance</span>
              </Badge>

              <h1 className="text-balance text-4xl font-extrabold leading-[1.1] sm:text-5xl sm:leading-[1.1] lg:text-6xl lg:leading-[1.1]">
                Turn{" "}
                <span className="bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
                  open tools
                </span>{" "}
                into{" "}
                <span className="bg-gradient-to-r from-secondary via-secondary/90 to-accent bg-clip-text text-transparent">policy-backed pilots</span>{" "}
                that actually ship.
              </h1>
            </div>
            
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              AltruisticXAI is a connected ecosystem: we ship{" "}
              <span className="font-semibold text-foreground">open-source labs</span>, run{" "}
              <span className="font-semibold text-foreground">ROI-positive consulting pilots</span>, and translate what works into{" "}
              <span className="font-semibold text-foreground">durable funding and rules</span>. One flywheel—from GitHub, to campus, to statehouse.
            </p>
            
            <a 
              href="https://scheduler.zoom.us/altruistic-xai/altruisticxai-booking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all btn-tiny-glow focus:outline-none focus:ring-2 focus:ring-primary/60"
              aria-label="Book an Ecosystem Intro Call"
            >
              <CheckCircle size={16} weight="fill" />
              <span>Book A Call</span>
            </a>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-2 text-[11px] sm:hidden" 
            variants={itemVariants}
            transition={itemTransition}
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
          <motion.div variants={itemVariants} transition={itemTransition}>
            <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                Three engines. One ecosystem.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Everything is designed as a flywheel:{" "}
                <span className="font-medium text-foreground">Open Source Labs → Consulting Studio → Policy Alliance → back to Labs.</span>
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
                <motion.div key={pillar.id} variants={itemVariants} transition={itemTransition}>
                  <Link to={pillar.href}>
                    <Card className="group relative flex h-full flex-col justify-between overflow-hidden border border-border/50 bg-card p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1 active:scale-[0.98] sm:p-4">
                      <div className="space-y-2 sm:space-y-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-inner ring-1 ring-primary/10 transition-all group-hover:scale-105 group-hover:shadow-md group-hover:ring-primary/20">
                            <Icon size={20} weight="duotone" className="text-primary" />
                          </div>
                          <Badge variant="secondary" className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-primary">
                            {pillar.tag}
                          </Badge>
                        </div>
                        <h3 className="text-sm font-semibold text-foreground sm:text-base">{pillar.name}</h3>
                        <p className="text-xs leading-relaxed text-muted-foreground">{pillar.description}</p>
                      </div>
                      <div className="mt-3 space-y-2 sm:mt-4">
                        <p className="text-xs font-medium text-primary">{pillar.promise}</p>
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
            <h2 className="mb-2 text-2xl font-bold sm:mb-3 sm:text-3xl lg:text-4xl">
              The flywheel: from GitHub to budget line
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:mb-5">
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
          <motion.h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl" variants={itemVariants} transition={itemTransition}>
            Who plugs into this?
          </motion.h2>
          <motion.div 
            className="grid gap-3 sm:gap-4 md:grid-cols-3"
            variants={containerVariants}
          >
            {audiences.map((aud) => {
              const Icon = aud.icon
              return (
                <motion.div key={aud.name} variants={itemVariants} transition={itemTransition}>
                  <Card className="group h-full overflow-hidden border border-border/50 bg-card p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1">
                    <div className="mb-3 flex items-center gap-2.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-inner ring-1 ring-secondary/15 transition-all group-hover:scale-105 group-hover:shadow-md group-hover:ring-secondary/25">
                        <Icon size={20} weight="duotone" className="text-secondary" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{aud.name}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{aud.detail}</p>
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
            transition={itemTransition}
          >
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Recent pilots & signals</h2>
              <p className="text-sm text-muted-foreground sm:text-base">Latest from the Impact Ledger</p>
            </div>
            <Link
              to="/impact-ledger"
              className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-secondary"
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
                transition={itemTransition}
              >
                <Card className="group flex h-full flex-col overflow-hidden border border-border/50 bg-card p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1">
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent/15 to-accent/5 shadow-inner ring-1 ring-accent/10 transition-all group-hover:scale-105">
                        <Sparkle size={14} weight="duotone" className="text-accent" />
                      </div>
                      <Badge variant="secondary" className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-foreground">
                        {p.origin === "labs" ? "Labs" : "Consulting"}
                      </Badge>
                    </div>
                    {p.sector && (
                      <span className="line-clamp-1 text-[10px] text-muted-foreground">{p.sector}</span>
                    )}
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-foreground">{p.title}</h3>
                  <p className="mb-3 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                  {p.short_kpi_summary && (
                    <p className="mt-auto text-[11px] font-medium text-primary">{p.short_kpi_summary}</p>
                  )}
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-6 text-center sm:p-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <Database size={48} weight="duotone" className="mx-auto mb-4 text-accent" />
          <h3 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Fuel Your Ecosystem with Real Data
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Access high-leverage federal grants, open datasets, and automation flows.{" "}
            <span className="font-medium text-foreground">
              The Data Integration Hub connects Grants.gov, Data.gov, and AI-powered analysis to your strategic pipeline.
            </span>
          </p>
          <Button size="lg" asChild className="rounded-full">
            <Link to="/data-integration" className="flex items-center gap-2">
              <Database size={20} weight="duotone" />
              Explore Data Integration Hub
              <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.section>
      </div>
    </LayoutShell>
  );
}

function FlywheelStep({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex-1 rounded-xl border border-border bg-background/60 p-3 backdrop-blur-sm transition-all hover:bg-background/80 sm:p-3.5">
      <div className="mb-1 text-sm font-semibold text-primary">{label}</div>
      <div className="text-sm leading-relaxed text-muted-foreground">{detail}</div>
    </div>
  )
}
