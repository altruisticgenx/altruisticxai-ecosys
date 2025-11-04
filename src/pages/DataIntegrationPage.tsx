import LayoutShell from "@/components/LayoutShell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Money, Sparkle, Download, ArrowSquareOut, FileText, Calendar, Buildings, GitBranch } from "@phosphor-icons/react"
import { useGrantDiscovery, GrantCategory } from "@/hooks/use-grant-discovery"
import { useDiscoveredProjects } from "@/hooks/use-discovered-projects"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

export default function DataIntegrationPage() {
  const {
    grants,
    isLoading: grantsLoading,
    loadingStage: grantsStage,
    error: grantsError,
    discoverGrants,
    toggleStar,
    removeGrant,
    clearAll: clearGrants
  } = useGrantDiscovery()

  const {
    projects,
    isLoading: projectsLoading,
    loadingStage: projectsStage,
    error: projectsError,
    discoverNewProjects,
    removeProject,
    clearAll: clearProjects
  } = useDiscoveredProjects()

  const [selectedGrantCategory, setSelectedGrantCategory] = useState<GrantCategory>('energy-ai')
  const [selectedProjectTopic, setSelectedProjectTopic] = useState<string>('local-first AI energy')

  const handleDiscoverGrants = async () => {
    const result = await discoverGrants(selectedGrantCategory, true)
    if (result && result.length > 0) {
      toast.success(`Discovered ${result.length} grant opportunities!`, {
        description: 'AI analysis complete - check alignment scores'
      })
    } else if (!grantsError) {
      toast.info('No new grants found', {
        description: 'Try a different category or check back later'
      })
    }
  }

  const handleDiscoverProjects = async () => {
    const result = await discoverNewProjects(selectedProjectTopic, 15)
    if (result && result.length > 0) {
      toast.success(`Discovered ${result.length} GitHub projects!`, {
        description: 'Ready for integration into your ecosystem'
      })
    } else if (!projectsError) {
      toast.info('No new projects found', {
        description: 'Try a different topic or check back later'
      })
    }
  }

  const grantCategories: { value: GrantCategory; label: string }[] = [
    { value: 'energy-ai', label: 'Energy & AI' },
    { value: 'education-ai', label: 'Education & AI' },
    { value: 'local-government', label: 'Local Government' },
    { value: 'university-research', label: 'University Research' }
  ]

  const projectTopics = [
    'local-first AI energy',
    'campus sustainability',
    'explainable AI',
    'renewable energy analytics',
    'edge computing'
  ]

  const starredGrants = (grants || []).filter(g => g.starred)
  const highScoringGrants = (grants || []).filter(g => (g.analysis?.alignmentScore || 0) >= 70)
  const readyToApply = (grants || []).filter(g => g.starred && (g.analysis?.alignmentScore || 0) >= 70)

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 shadow-lg ring-1 ring-accent/20">
              <Database size={32} weight="duotone" className="text-accent" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Data Integration Hub
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Automated discovery of federal grants and open-source projects aligned with the AltruisticXAI ecosystem.{" "}
            <span className="font-medium text-foreground">
              AI-powered analysis ensures relevance to Labs → Consulting → Policy flywheel.
            </span>
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:mb-12 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Grants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{(grants || []).length}</div>
              <p className="mt-1 text-xs text-muted-foreground">{starredGrants.length} starred</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Source Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{(projects || []).length}</div>
              <p className="mt-1 text-xs text-muted-foreground">GitHub discoveries</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Alignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{highScoringGrants.length}</div>
              <p className="mt-1 text-xs text-muted-foreground">Grants scored 70+</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ready to Apply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{readyToApply.length}</div>
              <p className="mt-1 text-xs text-muted-foreground">Starred & high-scoring</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grants" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grants">
              <Money size={18} weight="duotone" className="mr-2" />
              Grant Opportunities
            </TabsTrigger>
            <TabsTrigger value="projects">
              <GitBranch size={18} weight="duotone" className="mr-2" />
              Open Source Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grants" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkle size={20} weight="duotone" className="text-primary" />
                  Discover Grants
                </CardTitle>
                <CardDescription>
                  Automated search of Grants.gov with AI-powered relevance analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Category
                    </label>
                    <Select
                      value={selectedGrantCategory}
                      onValueChange={(val) => setSelectedGrantCategory(val as GrantCategory)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {grantCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleDiscoverGrants}
                    disabled={grantsLoading}
                    className="w-full sm:w-auto"
                  >
                    {grantsLoading ? (
                      <>
                        <Sparkle size={18} className="mr-2 animate-spin" />
                        {grantsStage || 'Discovering...'}
                      </>
                    ) : (
                      <>
                        <Download size={18} className="mr-2" />
                        Discover Grants
                      </>
                    )}
                  </Button>
                </div>

                {grantsError && (
                  <Alert variant="destructive">
                    <AlertDescription>{grantsError}</AlertDescription>
                  </Alert>
                )}

                {(grants || []).length > 0 && (
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{(grants || []).length}</span> grants discovered
                    </p>
                    <Button variant="ghost" size="sm" onClick={clearGrants}>
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              {(grants || []).length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Money size={48} weight="duotone" className="mb-4 text-muted-foreground/50" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">No grants discovered yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Select a category and click Discover to start finding opportunities
                    </p>
                  </CardContent>
                </Card>
              ) : (
                (grants || []).map((grant, index) => (
                  <motion.div
                    key={grant.grant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden border border-border/50 transition-all hover:border-primary/50 hover:shadow-md">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              {grant.analysis && grant.analysis.alignmentScore >= 70 && (
                                <Badge variant="default" className="bg-primary">
                                  {grant.analysis.alignmentScore}% Match
                                </Badge>
                              )}
                              {grant.analysis && grant.analysis.recommendedPillar && (
                                <Badge variant="secondary">
                                  {grant.analysis.recommendedPillar}
                                </Badge>
                              )}
                              <Badge variant="outline">{grant.grant.agencyName}</Badge>
                            </div>
                            <CardTitle className="text-lg leading-tight">
                              {grant.grant.opportunityTitle}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {grant.grant.description}
                        </p>

                        {grant.analysis && grant.analysis.keyStrengths && grant.analysis.keyStrengths.length > 0 && (
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="mb-1 text-xs font-semibold text-foreground">Key Strengths:</p>
                            <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                              {grant.analysis.keyStrengths.map((strength, i) => (
                                <li key={i}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-3">
                          {grant.grant.awardCeiling && (
                            <div>
                              <p className="text-xs text-muted-foreground">Award Ceiling</p>
                              <p className="font-semibold text-foreground">
                                ${(grant.grant.awardCeiling / 1000).toFixed(0)}K
                              </p>
                            </div>
                          )}
                          {grant.grant.closeDate && (
                            <div>
                              <p className="text-xs text-muted-foreground">Close Date</p>
                              <p className="font-semibold text-foreground">
                                {new Date(grant.grant.closeDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                          {grant.grant.eligibleApplicants && grant.grant.eligibleApplicants.length > 0 && (
                            <div className="col-span-2 lg:col-span-1">
                              <p className="text-xs text-muted-foreground">Eligible</p>
                              <p className="line-clamp-1 font-semibold text-foreground">
                                {grant.grant.eligibleApplicants.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`https://www.grants.gov/search-results-detail/${grant.grant.opportunityNumber}`, '_blank')}
                          >
                            <ArrowSquareOut size={16} className="mr-2" />
                            View on Grants.gov
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeGrant(grant.grant.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkle size={20} weight="duotone" className="text-primary" />
                  Discover Projects
                </CardTitle>
                <CardDescription>
                  Find relevant open-source projects on GitHub with AI relevance scoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Topic
                    </label>
                    <Select
                      value={selectedProjectTopic}
                      onValueChange={setSelectedProjectTopic}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTopics.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleDiscoverProjects}
                    disabled={projectsLoading}
                    className="w-full sm:w-auto"
                  >
                    {projectsLoading ? (
                      <>
                        <Sparkle size={18} className="mr-2 animate-spin" />
                        {projectsStage || 'Discovering...'}
                      </>
                    ) : (
                      <>
                        <Download size={18} className="mr-2" />
                        Discover Projects
                      </>
                    )}
                  </Button>
                </div>

                {projectsError && (
                  <Alert variant="destructive">
                    <AlertDescription>{projectsError}</AlertDescription>
                  </Alert>
                )}

                {(projects || []).length > 0 && (
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{(projects || []).length}</span> projects discovered
                    </p>
                    <Button variant="ghost" size="sm" onClick={clearProjects}>
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              {(projects || []).length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <GitBranch size={48} weight="duotone" className="mb-4 text-muted-foreground/50" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">No projects discovered yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Select a topic and click Discover to start finding relevant open-source projects
                    </p>
                  </CardContent>
                </Card>
              ) : (
                (projects || []).map((project, index) => (
                  <motion.div
                    key={project.repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden border border-border/50 transition-all hover:border-primary/50 hover:shadow-md">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              {project.analysis.relevanceScore >= 70 && (
                                <Badge variant="default" className="bg-primary">
                                  {project.analysis.relevanceScore}% Relevant
                                </Badge>
                              )}
                              <Badge variant="secondary">
                                AI Project
                              </Badge>
                              <Badge variant="outline">⭐ {project.repo.stargazers_count}</Badge>
                            </div>
                            <CardTitle className="text-lg leading-tight">
                              {project.repo.full_name}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {project.repo.description}
                        </p>

                        {project.analysis.alignmentReason && (
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="mb-1 text-xs font-semibold text-foreground">Why This Matters:</p>
                            <p className="text-xs text-muted-foreground">{project.analysis.alignmentReason}</p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Language</p>
                            <p className="font-semibold text-foreground">
                              {project.repo.language || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">License</p>
                            <p className="font-semibold text-foreground">
                              {project.repo.license?.name || 'None'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Updated</p>
                            <p className="font-semibold text-foreground">
                              {new Date(project.repo.updated_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.repo.html_url, '_blank')}
                          >
                            <ArrowSquareOut size={16} className="mr-2" />
                            View on GitHub
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeProject(project.repo.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutShell>
  )
}
