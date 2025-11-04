import LayoutShell from "@/components/LayoutShell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MetricPill from "@/components/MetricPill"
import { projects } from "@/data/projects"
import { Briefcase, ArrowRight, CheckCircle, TrendUp, Sparkle, Rocket, Building, EnvelopeSimple, CalendarCheck, ChartBar } from "@phosphor-icons/react"

const serviceTiers = [
  {
    id: "discovery",
    name: "Discovery Audit",
    priceRange: "$25K - $75K",
    duration: "4-6 weeks",
    icon: Sparkle,
    description: "Comprehensive assessment of your current AI systems, data infrastructure, and compliance posture. Identify opportunities for transparency improvements and ethical AI implementation.",
    outcomes: [
      "Detailed audit report with compliance gaps",
      "Prioritized roadmap for AI transparency",
      "Cost-benefit analysis for recommended solutions",
      "Technical specifications for next steps"
    ]
  },
  {
    id: "pilot",
    name: "Pilot Deployment",
    priceRange: "$150K - $350K",
    duration: "3-6 months",
    icon: Rocket,
    description: "Deploy proven open-source tools from our Labs portfolio in a controlled environment. Validate technical feasibility and measure initial impact metrics.",
    outcomes: [
      "Production-ready implementation (1-3 systems)",
      "Custom integration with existing infrastructure",
      "Staff training and documentation",
      "Quantified impact metrics and case study"
    ]
  },
  {
    id: "scale",
    name: "Scale Program",
    priceRange: "$500K - $2M+",
    duration: "12+ months",
    icon: Building,
    description: "Enterprise-wide rollout with ongoing support, continuous compliance monitoring, and custom feature development. Full partnership model with policy advocacy support.",
    outcomes: [
      "Organization-wide deployment",
      "Dedicated engineering support",
      "Custom feature development",
      "Policy advocacy and regulatory support",
      "Contribution to open-source ecosystem"
    ]
  }
]

export default function ConsultingPage() {
  const consultingProjects = projects.filter(p => p.origin === "consulting")
  const recentWins = consultingProjects
    .filter(p => p.short_kpi_summary && p.annual_savings_usd && p.payback_months)
    .slice(-3)

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/15 to-secondary/5 shadow-lg ring-1 ring-secondary/20">
              <Briefcase size={32} weight="duotone" className="text-secondary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Consulting Studio
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            We adapt our proven open-source tools for institutions that need ethical AI solutions. 
            <span className="font-medium text-foreground"> Our clients benefit from battle-tested technology while funding new Labs research and generating evidence for policy advocacy.</span>
          </p>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-semibold text-foreground sm:text-3xl">
            Service Tiers
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-muted-foreground">
            Flexible engagement models designed to meet you where you are - from initial assessment to full-scale deployment.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {serviceTiers.map((tier) => {
              const Icon = tier.icon
              return (
                <Card key={tier.id} className="flex flex-col border-2 transition-all hover:border-secondary hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                      <Icon size={28} weight="duotone" className="text-secondary" />
                    </div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="secondary" className="text-sm font-semibold">
                        {tier.priceRange}
                      </Badge>
                      <Badge variant="outline" className="text-sm">{tier.duration}</Badge>
                    </div>
                    <CardDescription className="pt-3 text-sm">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <h4 className="mb-3 text-sm font-semibold text-foreground">Key Outcomes</h4>
                    <ul className="space-y-2">
                      {tier.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-secondary" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {recentWins.length > 0 && (
          <div className="mb-20">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
                Recent Wins
              </h2>
              <p className="text-sm text-muted-foreground">
                Quantifiable impact from our latest consulting engagements
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {recentWins.map((project) => (
                <Card key={project.id} className="border-2 transition-all hover:border-secondary hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <ChartBar size={24} weight="duotone" className="text-accent" />
                    </div>
                    <CardTitle className="text-xl">{project.clientName}</CardTitle>
                    <Badge variant="outline" className="w-fit font-normal">
                      {project.sector}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {project.short_kpi_summary}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <span className="text-sm font-medium text-muted-foreground">Annual Savings</span>
                        <span className="text-lg font-bold text-foreground">
                          ${(project.annual_savings_usd! / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <span className="text-sm font-medium text-muted-foreground">Payback Period</span>
                        <span className="text-lg font-bold text-foreground">
                          {project.payback_months} months
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-semibold text-foreground sm:text-3xl">
            Our Approach
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 transition-all hover:border-secondary">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <CheckCircle className="text-secondary" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-base">Proven Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every engagement builds on open-source tools validated through Labs research. 
                  You get production-ready solutions, not experimental prototypes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-secondary">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <TrendUp className="text-secondary" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-base">Measurable Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We focus on quantifiable outcomes: cost savings, efficiency gains, compliance improvements. 
                  Our success metrics become evidence for policy recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-secondary">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <ArrowRight className="text-secondary" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-base">Aligned Incentives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Revenue from consulting funds new Labs projects and policy research. 
                  Your investment advances the broader ecosystem of ethical AI.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-20">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
              Client Case Studies
            </h2>
            <p className="text-sm text-muted-foreground">
              Real-world deployments with measurable impact across healthcare, government, and education sectors.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {consultingProjects.map((project) => (
              <Card key={project.id} className="flex flex-col border-2 transition-all hover:border-secondary hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      {project.clientName && (
                        <p className="mt-1 text-sm font-medium text-secondary">{project.clientName}</p>
                      )}
                    </div>
                    <Badge 
                      variant={project.status === "active" ? "default" : "secondary"}
                      className="shrink-0"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-foreground">Sector</h4>
                    <Badge variant="outline" className="font-normal">
                      {project.sector}
                    </Badge>
                  </div>
                  {project.metrics && project.metrics.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-foreground">Impact Metrics</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.metrics.map((metric, idx) => (
                          <MetricPill
                            key={idx}
                            label={metric.label}
                            value={metric.value}
                            variant="secondary"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-foreground">Technology</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-secondary/20 bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <Briefcase size={48} weight="duotone" className="mx-auto mb-6 text-secondary" />
            <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Ready to Deploy Ethical AI?
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We work with universities, healthcare systems, and government agencies to implement 
              privacy-preserving AI, energy transparency tools, and compliance frameworks. 
              <span className="font-medium text-foreground"> Let's discuss how our proven solutions can address your specific challenges.</span>
            </p>
            
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a 
                  href="https://scheduler.zoom.us/altruistic-xai/altruisticxai-booking" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <CalendarCheck size={20} weight="duotone" />
                  Schedule Discovery Call
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <a 
                  href="mailto:consulting@altruisticxai.org"
                  className="gap-2"
                >
                  <EnvelopeSimple size={20} weight="duotone" />
                  Email Our Team
                </a>
              </Button>
            </div>

            <div className="rounded-lg bg-background/60 p-4 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Direct Contact:</span>{" "}
                <a 
                  href="mailto:consulting@altruisticxai.org" 
                  className="text-secondary underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  consulting@altruisticxai.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutShell>
  )
}
