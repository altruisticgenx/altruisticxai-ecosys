import LayoutShell from "@/components/LayoutShell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { policyMemos } from "@/data/policyMemos"
import { projects } from "@/data/projects"
import { Scroll, CheckCircle, Clock, Rocket } from "@phosphor-icons/react"

export default function PolicyPage() {
  const getProjectTitle = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    return project?.title || `Project ${projectId}`
  }

  const statusConfig = {
    "Concept": { variant: "outline" as const, icon: Clock, label: "Concept" },
    "In Discussion": { variant: "secondary" as const, icon: Scroll, label: "In Discussion" },
    "Enacted": { variant: "default" as const, icon: CheckCircle, label: "Enacted" }
  }

  const conceptMemos = policyMemos.filter(m => m.status === "Concept")
  const inDiscussionMemos = policyMemos.filter(m => m.status === "In Discussion")
  const enactedMemos = policyMemos.filter(m => m.status === "Enacted")

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
              <Scroll size={32} weight="duotone" className="text-accent" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground">
            Policy Alliance
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            We transform real-world implementation results into evidence-based policy recommendations. 
            By documenting measurable outcomes from our Labs projects and consulting engagements, 
            we advocate for structural changes that scale ethical AI beyond individual organizations.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-semibold text-foreground">
            Our Policy Framework
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 transition-all hover:border-accent">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Scroll className="text-accent" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-lg">Evidence-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every policy recommendation is grounded in quantifiable results from real deployments. 
                  We don't theorize—we measure and report.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-accent">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <CheckCircle className="text-accent" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-lg">Implementable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We propose policies that can actually be implemented because we've already done it. 
                  Our recommendations include technical specifications and cost analyses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-accent">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Rocket className="text-accent" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-lg">Demand-Creating</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Successful policy adoption creates compliance requirements, driving demand for our 
                  consulting services and funding new Labs research.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-semibold text-foreground">
            Policy Memos & Initiatives
          </h2>
          <p className="text-muted-foreground">
            Current policy recommendations derived from our project outcomes and research findings.
          </p>
        </div>

        <div className="space-y-12">
          {enactedMemos.length > 0 && (
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-foreground flex items-center gap-2">
                <CheckCircle size={24} weight="duotone" className="text-primary" />
                Enacted
              </h3>
              <div className="grid gap-6">
                {enactedMemos.map((memo) => {
                  const config = statusConfig[memo.status]
                  const Icon = config.icon

                  return (
                    <Card key={memo.id} className="border-2 transition-all hover:border-accent hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <Badge variant={config.variant} className="flex items-center gap-1">
                                <Icon size={14} weight="bold" />
                                {config.label}
                              </Badge>
                              <Badge variant="outline">{memo.jurisdiction}</Badge>
                            </div>
                            <CardTitle className="text-2xl">{memo.title}</CardTitle>
                            {memo.datePublished && (
                              <p className="mt-1 text-sm text-muted-foreground">
                                Published: {new Date(memo.datePublished).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                        <CardDescription className="text-base">
                          {memo.summary}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-foreground">
                            Related Projects & Evidence
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {memo.relatedProjects.map((projectId) => {
                              const isProject = !projectId.startsWith('pm-')
                              return (
                                <Badge 
                                  key={projectId} 
                                  variant="secondary"
                                  className="font-normal"
                                >
                                  {isProject ? getProjectTitle(projectId) : projectId}
                                </Badge>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {inDiscussionMemos.length > 0 && (
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-foreground flex items-center gap-2">
                <Scroll size={24} weight="duotone" className="text-secondary" />
                In Discussion
              </h3>
              <div className="grid gap-6">
                {inDiscussionMemos.map((memo) => {
                  const config = statusConfig[memo.status]
                  const Icon = config.icon

                  return (
                    <Card key={memo.id} className="border-2 transition-all hover:border-accent hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <Badge variant={config.variant} className="flex items-center gap-1">
                                <Icon size={14} weight="bold" />
                                {config.label}
                              </Badge>
                              <Badge variant="outline">{memo.jurisdiction}</Badge>
                            </div>
                            <CardTitle className="text-2xl">{memo.title}</CardTitle>
                            {memo.datePublished && (
                              <p className="mt-1 text-sm text-muted-foreground">
                                Published: {new Date(memo.datePublished).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                        <CardDescription className="text-base">
                          {memo.summary}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-foreground">
                            Related Projects & Evidence
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {memo.relatedProjects.map((projectId) => {
                              const isProject = !projectId.startsWith('pm-')
                              return (
                                <Badge 
                                  key={projectId} 
                                  variant="secondary"
                                  className="font-normal"
                                >
                                  {isProject ? getProjectTitle(projectId) : projectId}
                                </Badge>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {conceptMemos.length > 0 && (
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-foreground flex items-center gap-2">
                <Clock size={24} weight="duotone" className="text-muted-foreground" />
                Concept
              </h3>
              <div className="grid gap-6">
                {conceptMemos.map((memo) => {
                  const config = statusConfig[memo.status]
                  const Icon = config.icon

                  return (
                    <Card key={memo.id} className="border-2 transition-all hover:border-accent hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <Badge variant={config.variant} className="flex items-center gap-1">
                                <Icon size={14} weight="bold" />
                                {config.label}
                              </Badge>
                              <Badge variant="outline">{memo.jurisdiction}</Badge>
                            </div>
                            <CardTitle className="text-2xl">{memo.title}</CardTitle>
                            {memo.datePublished && (
                              <p className="mt-1 text-sm text-muted-foreground">
                                Published: {new Date(memo.datePublished).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                        <CardDescription className="text-base">
                          {memo.summary}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-foreground">
                            Related Projects & Evidence
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {memo.relatedProjects.map((projectId) => {
                              const isProject = !projectId.startsWith('pm-')
                              return (
                                <Badge 
                                  key={projectId} 
                                  variant="secondary"
                                  className="font-normal"
                                >
                                  {isProject ? getProjectTitle(projectId) : projectId}
                                </Badge>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 rounded-2xl border-2 border-accent/20 bg-accent/5 p-8 text-center">
          <Scroll size={48} weight="duotone" className="mx-auto mb-4 text-accent" />
          <h3 className="mb-3 text-2xl font-semibold text-foreground">
            Partner on Policy Research
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Are you working on AI governance, transparency standards, or privacy regulations? 
            We can provide technical expertise and real-world case studies to support evidence-based 
            policy development. Let's collaborate to create implementable standards.
          </p>
          <Button size="lg" variant="default">
            Discuss Policy Partnership
          </Button>
        </div>
      </div>
    </LayoutShell>
  )
}
