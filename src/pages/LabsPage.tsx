import LayoutShell from "@/components/LayoutShell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, GitBranch, Lightbulb, Code, Rocket, GitMerge, Flask, Sparkle, MagnifyingGlass } from "@phosphor-icons/react"
import { projects } from "@/data/projects"
import { useDiscoveredProjects } from "@/hooks/use-discovered-projects"
import DiscoveredProjectCard from "@/components/DiscoveredProjectCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { toast } from "sonner"

export default function LabsPage() {
  const labsProjects = projects.filter(p => p.origin === "labs")
  const { projects: discoveredProjects, isLoading, error, discoverNewProjects, removeProject, clearAll } = useDiscoveredProjects()
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
    const newProjects = await discoverNewProjects(selectedTopic, 5)
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 sm:h-16 sm:w-16">
              <Flask size={28} weight="duotone" className="text-primary sm:h-8 sm:w-8" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Open Source Labs
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            Experimental projects pushing the boundaries of explainable AI, energy transparency, and ethical technology.
          </p>
        </div>

        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="mb-6 text-center text-2xl font-semibold text-foreground sm:mb-8 sm:text-3xl">
            How We Work
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 sm:mb-3 sm:h-12 sm:w-12">
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

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 sm:mb-3 sm:h-12 sm:w-12">
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

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 sm:mb-3 sm:h-12 sm:w-12">
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

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 sm:mb-3 sm:h-12 sm:w-12">
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
            <TabsTrigger value="our-projects" className="text-sm sm:text-base">Our Projects</TabsTrigger>
            <TabsTrigger value="discover" className="text-sm sm:text-base">
              <Sparkle size={14} className="mr-1.5 sm:mr-2 sm:h-4 sm:w-4" weight="fill" />
              AI Discovery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="our-projects">
            <div className="mb-6 sm:mb-8">
              <h2 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
                Active Projects
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                Open-source initiatives advancing transparency, privacy, and ethical AI.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
              {labsProjects.map((project) => (
                <Card key={project.id} className="flex flex-col border-2 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-xl">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex items-start justify-between gap-2 sm:mb-3 sm:gap-3">
                      <CardTitle className="text-xl sm:text-2xl">{project.title}</CardTitle>
                      <Badge 
                        variant={project.status === "active" ? "default" : project.status === "pilot" ? "secondary" : "outline"}
                        className="shrink-0 text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed sm:text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="mb-1.5 text-xs font-semibold text-foreground sm:mb-2 sm:text-sm">Sector</h4>
                        <Badge variant="outline" className="text-xs font-normal">
                          {project.sector}
                        </Badge>
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div>
                          <h4 className="mb-1.5 text-xs font-semibold text-foreground sm:mb-2 sm:text-sm">Tags</h4>
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
                        <h4 className="mb-1.5 text-xs font-semibold text-foreground sm:mb-2 sm:text-sm">Tech Stack</h4>
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
                        <GitBranch size={18} weight="bold" className="sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base">View Repository</span>
                        <ArrowRight size={18} weight="bold" className="sm:h-5 sm:w-5" />
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
                Discover Aligned Open-Source Projects
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                Use AI to discover and analyze open-source projects that align with our ethical AI mission.
              </p>
            </div>

            <Card className="mb-6 border-2 border-primary/20 bg-primary/5 sm:mb-8">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MagnifyingGlass size={20} weight="duotone" className="text-primary sm:h-6 sm:w-6" />
                  Search for Projects
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Select a topic and let AI analyze GitHub repositories for relevance to ethical AI principles.
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
                    className="h-10 gap-2 touch-manipulation sm:h-11"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span className="text-sm sm:text-base">Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkle size={18} weight="fill" className="sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base">Discover Projects</span>
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
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {(discoveredProjects || []).length} project{(discoveredProjects || []).length !== 1 ? 's' : ''} discovered
                    </p>
                    <Button variant="outline" size="sm" onClick={clearAll} className="h-8 touch-manipulation text-xs sm:h-9 sm:text-sm">
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {(discoveredProjects || []).length > 0 ? (
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
                  <MagnifyingGlass size={48} weight="duotone" className="mb-3 text-muted-foreground sm:mb-4 sm:h-16 sm:w-16" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
                    No Projects Discovered Yet
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    Select a topic and click "Discover Projects" to find open-source repositories that align with our ethical AI mission. AI will analyze each project for relevance.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 text-center sm:mt-16 sm:p-8">
          <Rocket size={40} weight="duotone" className="mx-auto mb-3 text-primary sm:mb-4 sm:h-12 sm:w-12" />
          <h3 className="mb-2 text-xl font-semibold text-foreground sm:mb-3 sm:text-2xl">
            Have an idea for a Labs project?
          </h3>
          <p className="mx-auto mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mb-6 sm:text-base">
            We're always looking for new challenges in AI transparency, privacy-preserving ML, and sustainable technology. 
            Reach out to discuss potential collaborations.
          </p>
          <Button size="lg" variant="default" className="touch-manipulation">
            Get in Touch
          </Button>
        </div>
      </div>
    </LayoutShell>
  )
}
