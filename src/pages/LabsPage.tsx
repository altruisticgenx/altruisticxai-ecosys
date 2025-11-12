import React, { useState } from "react"
import LayoutShell from "@/components/LayoutShell"
import { Container } from "@/components/Container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, GitBranch, Lightbulb, Code, Rocket, GitMerge, Flask, Sparkle, MagnifyingGlass } from "@phosphor-icons/react"
import { projects } from "@/data/projects"
import { useDiscoveredProjects } from "@/hooks/use-discovered-projects"
import DiscoveredProjectCard from "@/components/DiscoveredProjectCard"
import DiscoveryLoadingSkeleton from "@/components/DiscoveryLoadingSkeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

export default function LabsPage() {
  const labsProjects = projects.filter(p => p.origin === "labs")
  const { projects: discoveredProjects, isLoading, loadingStage, error, discoverNewProjects, removeProject, clearAll } = useDiscoveredProjects()
  const [selectedTopic, setSelectedTopic] = useState<string>('explainable-ai')

  const topics = [
    { value: 'explainable-ai', label: 'Explainable AI' },
    { value: 'ai-ethics', label: 'AI Ethics' },
    { value: 'fairness-ml', label: 'Fairness in ML' },
    { value: 'privacy-preserving-ml', label: 'Privacy-Preserving ML' },
    { value: 'federated-learning', label: 'Federated Learning' },
    { value: 'differential-privacy', label: 'Differential Privacy' },
    { value: 'bias-detection', label: 'Bias Detection' },
    { value: 'ai-transparency', label: 'AI Transparency' },
    { value: 'responsible-ai', label: 'Responsible AI' },
    { value: 'interpretable-ml', label: 'Interpretable ML' }
  ]

  const handleDiscover = async () => {
    const newProjects = await discoverNewProjects(selectedTopic, 10)
    if (newProjects && newProjects.length > 0) {
      toast.success(`Discovered ${newProjects.length} relevant project${newProjects.length !== 1 ? 's' : ''}!`, {
        description: `AI analyzed and found high-quality matches for ${topics.find(t => t.value === selectedTopic)?.label}`
      })
    } else if (!error) {
      toast.info('No new projects found', {
        description: 'Try a different topic or check back later'
      })
    }
  }

  return (
    <LayoutShell>
      <Container className="py-8 sm:py-12 lg:py-16">
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-lg ring-1 ring-primary/20">
              <Flask size={32} weight="duotone" className="text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Open Source Labs
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Experimental projects pushing the boundaries of explainable AI, energy transparency, and ethical technology. 
            <span className="font-medium text-foreground"> All code is public, reproducible, and ready to deploy.</span>
          </p>
        </div>

        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="mb-6 text-center text-2xl font-semibold text-foreground sm:mb-8 sm:text-3xl">
            How We Work
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group overflow-hidden border border-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-inner ring-1 ring-primary/10 transition-all group-hover:scale-105 sm:mb-3 sm:h-12 sm:w-12">
                  <Lightbulb className="text-primary" size={20} weight="duotone" />
                </div>
                <CardTitle className="text-base sm:text-lg">Ideation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Identify real-world problems where AI explainability and transparency can create measurable impact.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border border-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-inner ring-1 ring-primary/10 transition-all group-hover:scale-105 sm:mb-3 sm:h-12 sm:w-12">
                  <Code className="text-primary" size={20} weight="duotone" />
                </div>
                <CardTitle className="text-base sm:text-lg">Prototype</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Build rapid proof-of-concept implementations using modern, open-source technology stacks.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border border-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-inner ring-1 ring-primary/10 transition-all group-hover:scale-105 sm:mb-3 sm:h-12 sm:w-12">
                  <GitBranch className="text-primary" size={20} weight="duotone" />
                </div>
                <CardTitle className="text-base sm:text-lg">Public Repo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Release validated prototypes as open-source projects with comprehensive documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border border-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-inner ring-1 ring-primary/10 transition-all group-hover:scale-105 sm:mb-3 sm:h-12 sm:w-12">
                  <GitMerge className="text-primary" size={20} weight="duotone" />
                </div>
                <CardTitle className="text-base sm:text-lg">Pilot Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Partner with organizations to deploy and refine solutions in real-world environments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="our-projects" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 sm:mb-8">
            <TabsTrigger value="our-projects" className="text-sm">Our Projects</TabsTrigger>
            <TabsTrigger value="discover" className="text-sm">
              <Sparkle size={14} className="mr-1.5 sm:mr-2" weight="fill" />
              AI Discovery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="our-projects">
            <div className="mb-6 sm:mb-8">
              <h2 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
                Active Projects
              </h2>
              <p className="text-sm text-muted-foreground">
                Open-source initiatives advancing transparency, privacy, and ethical AI.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
              {labsProjects.map((project) => (
                <Card key={project.id} className="group flex flex-col overflow-hidden border border-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex items-start justify-between gap-2 sm:mb-3 sm:gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-inner ring-1 ring-primary/10 transition-all group-hover:scale-105">
                          <Flask size={18} weight="duotone" className="text-primary" />
                        </div>
                        <CardTitle className="text-xl sm:text-2xl">{project.title}</CardTitle>
                      </div>
                      <Badge 
                        variant={project.status === "active" ? "default" : project.status === "pilot" ? "secondary" : "outline"}
                        className="shrink-0 text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="mb-1.5 text-sm font-semibold text-foreground sm:mb-2">Sector</h4>
                        <Badge variant="outline" className="text-xs font-normal">
                          {project.sector}
                        </Badge>
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div>
                          <h4 className="mb-1.5 text-sm font-semibold text-foreground sm:mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <h4 className="mb-1.5 text-sm font-semibold text-foreground sm:mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs font-normal">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      asChild
                      className="w-full touch-manipulation"
                      size="lg"
                    >
                      <a 
                        href={`https://github.com/altruisticxai-labs/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <GitBranch size={18} weight="bold" />
                        <span className="text-sm">View Repository</span>
                        <ArrowRight size={18} weight="bold" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discover">
            <div className="mb-6 sm:mb-8">
              <h2 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
                AI-Powered Project Discovery
              </h2>
              <p className="text-sm text-muted-foreground">
                Advanced GPT-4 analysis of open-source projects for ethical AI alignment, impact potential, and integration readiness.
              </p>
            </div>

            <Card className="mb-6 border-2 border-primary/20 bg-primary/5 sm:mb-8">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MagnifyingGlass size={20} weight="duotone" className="text-primary" />
                  Intelligent Project Search
                </CardTitle>
                <CardDescription className="text-sm">
                  Select a topic and let GPT-4 deeply analyze GitHub repositories for relevance, impact potential, and ethical alignment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <div className="flex-1">
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger className="h-10 sm:h-11">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value}>
                            {topic.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleDiscover} 
                    disabled={isLoading}
                    className="h-10 gap-2 touch-manipulation"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span className="text-sm">{loadingStage || 'Analyzing...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkle size={18} weight="fill" />
                        <span className="text-sm">Discover Projects</span>
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                {(discoveredProjects || []).length > 0 && (
                  <div className="flex items-center justify-between border-t border-border pt-3 sm:pt-4">
                    <p className="text-sm text-muted-foreground">
                      {(discoveredProjects || []).length} project{(discoveredProjects || []).length !== 1 ? 's' : ''} discovered
                    </p>
                    <Button variant="outline" size="sm" onClick={clearAll} className="h-8 touch-manipulation text-sm">
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {isLoading ? (
              <DiscoveryLoadingSkeleton count={3} stage={loadingStage} />
            ) : (discoveredProjects || []).length > 0 ? (
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
                {(discoveredProjects || []).map((project) => (
                  <DiscoveredProjectCard
                    key={project.repo.id}
                    project={project}
                    onRemove={removeProject}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
                  <MagnifyingGlass size={48} weight="duotone" className="mb-3 text-muted-foreground sm:mb-4" />
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    No Projects Discovered Yet
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    Select a topic and click "Discover Projects" to find open-source repositories that align with our ethical AI mission. Advanced GPT-4 will analyze each project for relevance, impact, and integration potential.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 text-center sm:mt-16 sm:p-10">
          <Rocket size={48} weight="duotone" className="mx-auto mb-4 text-primary" />
          <h3 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
            Have an idea for a Labs project?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We're always looking for new challenges in AI transparency, privacy-preserving ML, and sustainable technology. 
            <span className="font-medium text-foreground"> Partner with us to turn research into reality.</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" variant="default" className="touch-manipulation">
              Propose a Collaboration
            </Button>
            <Button size="lg" variant="outline" asChild className="touch-manipulation">
              <a 
                href="https://github.com/altruisticxai-labs" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Browse on GitHub
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </LayoutShell>
  )
}
