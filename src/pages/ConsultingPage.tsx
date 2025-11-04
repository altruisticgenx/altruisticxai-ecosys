import LayoutShell from "@/components/LayoutShell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MetricPill from "@/components/MetricPill"
import { projects } from "@/data/projects"
import { Briefcase, ArrowRight, CheckCircle, TrendUp } from "@phosphor-icons/react"

export default function ConsultingPage() {
  const clientProjects = projects.filter(p => p.origin === "client")

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
              <Briefcase size={32} weight="duotone" className="text-secondary" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground">
            Consulting Studio
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            We adapt our proven open-source tools for institutions that need ethical AI solutions. 
            Our clients benefit from battle-tested technology while funding new Labs research and 
            generating evidence for policy advocacy.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-semibold text-foreground">
            Our Approach
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 transition-all hover:border-secondary">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <CheckCircle className="text-secondary" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-lg">Proven Technology</CardTitle>
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
                <CardTitle className="text-lg">Measurable Impact</CardTitle>
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
                <CardTitle className="text-lg">Aligned Incentives</CardTitle>
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

        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-semibold text-foreground">
            Client Case Studies
          </h2>
          <p className="text-muted-foreground">
            Real-world deployments with measurable impact across healthcare, government, and education sectors.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {clientProjects.map((project) => (
            <Card key={project.id} className="flex flex-col border-2 transition-all hover:border-secondary hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    {project.client && (
                      <p className="mt-1 text-sm font-medium text-secondary">{project.client}</p>
                    )}
                  </div>
                  <Badge 
                    variant={project.status === "active" ? "default" : "secondary"}
                    className="shrink-0"
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-base">
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

        <div className="mt-16 rounded-2xl border-2 border-secondary/20 bg-secondary/5 p-8 text-center">
          <Briefcase size={48} weight="duotone" className="mx-auto mb-4 text-secondary" />
          <h3 className="mb-3 text-2xl font-semibold text-foreground">
            Ready to deploy ethical AI in your organization?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            We work with universities, healthcare systems, and government agencies to implement 
            privacy-preserving AI, energy transparency tools, and compliance frameworks. Let's discuss 
            how our proven solutions can address your specific challenges.
          </p>
          <Button size="lg" variant="default">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </LayoutShell>
  )
}
