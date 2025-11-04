import LayoutShell from "@/components/LayoutShell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Money, Sparkle, Download, Star, Trash, ArrowSquareOut, FileText, Calendar, Buildings } from "@phosphor-icons/react"
import { useGrantDiscovery, GrantCategory } from "@/hooks/use-grant-discovery"
import { useDatasetDiscovery, DatasetCategory } from "@/hooks/use-dataset-discovery"
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
    toggleStar: toggleGrantStar,
    removeGrant,
    clearAll: clearGrants
  } = useGrantDiscovery()

  const {
    datasets,
    isLoading: datasetsLoading,
    loadingStage: datasetsStage,
    error: datasetsError,
    discoverDatasets,
    toggleStar: toggleDatasetStar,
    removeDataset,
    clearAll: clearDatasets
  } = useDatasetDiscovery()

  const [selectedGrantCategory, setSelectedGrantCategory] = useState<GrantCategory>('energy-ai')
  const [selectedDatasetCategory, setSelectedDatasetCategory] = useState<DatasetCategory>('energy')

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

  const handleDiscoverDatasets = async () => {
    const result = await discoverDatasets(selectedDatasetCategory)
    if (result && result.length > 0) {
      toast.success(`Discovered ${result.length} datasets!`, {
        description: 'Ready for integration into your ecosystem'
      })
    } else if (!datasetsError) {
      toast.info('No new datasets found', {
        description: 'Try a different category or check back later'
      })
    }
  }

  const grantCategories: { value: GrantCategory; label: string }[] = [
    { value: 'energy-ai', label: 'Energy & AI' },
    { value: 'education-ai', label: 'Education & AI' },
    { value: 'local-government', label: 'Local Government' },
    { value: 'university-research', label: 'University Research' }
  ]

  const datasetCategories: { value: DatasetCategory; label: string }[] = [
    { value: 'energy', label: 'Energy & Grid' },
    { value: 'ai-research', label: 'AI Research' },
    { value: 'education', label: 'Education' },
    { value: 'municipal', label: 'Municipal Data' },
    { value: 'climate', label: 'Climate & Sustainability' }
  ]

  const starredGrants = (grants || []).filter(g => g.starred)
  const starredDatasets = (datasets || []).filter(d => d.starred)

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
            High-leverage data sources and automation flows to fuel the Labs → Consulting → Policy ecosystem.{" "}
            <span className="font-medium text-foreground">
              Connect federal grants, open datasets, and real-world projects to your strategic pipeline.
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Datasets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{(datasets || []).length}</div>
              <p className="mt-1 text-xs text-muted-foreground">{starredDatasets.length} starred</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Alignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {(grants || []).filter(g => (g.analysis?.alignmentScore || 0) >= 70).length}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Grants scored 70+</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ready to Apply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {(grants || []).filter(g => g.starred && (g.analysis?.alignmentScore || 0) >= 70).length}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Starred & high-scoring</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grants" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 sm:mb-8">
            <TabsTrigger value="grants" className="text-sm">
              <Money size={16} className="mr-2" weight="duotone" />
              Federal Grants
            </TabsTrigger>
            <TabsTrigger value="datasets" className="text-sm">
              <Database size={16} className="mr-2" weight="duotone" />
              Open Datasets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grants">
            <Card className="mb-6 border-2 border-primary/20 bg-primary/5 sm:mb-8">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkle size={20} weight="duotone" className="text-primary" />
                  Grants.gov Discovery
                </CardTitle>
                <CardDescription className="text-sm">
                  Search federal grant opportunities with AI-powered alignment analysis for your ecosystem pillars.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <div className="flex-1">
                    <Select value={selectedGrantCategory} onValueChange={(v) => setSelectedGrantCategory(v as GrantCategory)}>
                      <SelectTrigger className="h-10 sm:h-11">
                        <SelectValue placeholder="Select category" />
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
                  <Button onClick={handleDiscoverGrants} disabled={grantsLoading} className="h-10 gap-2">
                    {grantsLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span className="text-sm">{grantsStage || 'Searching...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkle size={18} weight="fill" />
                        <span className="text-sm">Discover Grants</span>
                      </>
                    )}
                  </Button>
                </div>

                {grantsError && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-sm">{grantsError}</AlertDescription>
                  </Alert>
                )}

                {(grants || []).length > 0 && (
                  <div className="flex items-center justify-between border-t border-border pt-3 sm:pt-4">
                    <p className="text-sm text-muted-foreground">
                      {(grants || []).length} grant{(grants || []).length !== 1 ? 's' : ''} discovered
                    </p>
                    <Button variant="outline" size="sm" onClick={clearGrants} className="h-8 text-sm">
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              {(grants || []).length === 0 ? (
                <Card className="border-2 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
                    <Money size={48} weight="duotone" className="mb-3 text-muted-foreground sm:mb-4" />
                    <h3 className="mb-2 text-xl font-semibold text-foreground">No Grants Discovered Yet</h3>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                      Select a category and click "Discover Grants" to find federal funding opportunities. AI will analyze each for alignment with your ecosystem.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                (grants || []).map((discoveredGrant, idx) => (
                  <GrantCard
                    key={discoveredGrant.grant.id}
                    grant={discoveredGrant}
                    onToggleStar={() => toggleGrantStar(discoveredGrant.grant.id)}
                    onRemove={() => removeGrant(discoveredGrant.grant.id)}
                    index={idx}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="datasets">
            <Card className="mb-6 border-2 border-secondary/20 bg-secondary/5 sm:mb-8">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Database size={20} weight="duotone" className="text-secondary" />
                  Data.gov Catalog Search
                </CardTitle>
                <CardDescription className="text-sm">
                  Explore federal open datasets for integration into Labs prototypes, Consulting pilots, and Policy evidence.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <div className="flex-1">
                    <Select value={selectedDatasetCategory} onValueChange={(v) => setSelectedDatasetCategory(v as DatasetCategory)}>
                      <SelectTrigger className="h-10 sm:h-11">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {datasetCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleDiscoverDatasets} disabled={datasetsLoading} className="h-10 gap-2">
                    {datasetsLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span className="text-sm">{datasetsStage || 'Searching...'}</span>
                      </>
                    ) : (
                      <>
                        <Database size={18} weight="fill" />
                        <span className="text-sm">Discover Datasets</span>
                      </>
                    )}
                  </Button>
                </div>

                {datasetsError && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-sm">{datasetsError}</AlertDescription>
                  </Alert>
                )}

                {(datasets || []).length > 0 && (
                  <div className="flex items-center justify-between border-t border-border pt-3 sm:pt-4">
                    <p className="text-sm text-muted-foreground">
                      {(datasets || []).length} dataset{(datasets || []).length !== 1 ? 's' : ''} discovered
                    </p>
                    <Button variant="outline" size="sm" onClick={clearDatasets} className="h-8 text-sm">
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              {(datasets || []).length === 0 ? (
                <Card className="border-2 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
                    <Database size={48} weight="duotone" className="mb-3 text-muted-foreground sm:mb-4" />
                    <h3 className="mb-2 text-xl font-semibold text-foreground">No Datasets Discovered Yet</h3>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                      Select a category and click "Discover Datasets" to find open government data that can fuel your Labs research, Consulting pilots, and Policy advocacy.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                (datasets || []).map((savedDataset, idx) => (
                  <DatasetCard
                    key={savedDataset.dataset.id}
                    dataset={savedDataset}
                    onToggleStar={() => toggleDatasetStar(savedDataset.dataset.id)}
                    onRemove={() => removeDataset(savedDataset.dataset.id)}
                    index={idx}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutShell>
  )
}

function GrantCard({ 
  grant, 
  onToggleStar, 
  onRemove,
  index 
}: { 
  grant: any
  onToggleStar: () => void
  onRemove: () => void
  index: number
}) {
  const analysis = grant.analysis
  const g = grant.grant

  const getAlignmentColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getPillarColor = (pillar: string) => {
    switch (pillar) {
      case 'labs': return 'bg-primary/10 text-primary border-primary/20'
      case 'consulting': return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'policy': return 'bg-accent/10 text-accent border-accent/20'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden border border-border/50 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge className="text-xs">{g.opportunityStatus}</Badge>
                {analysis && (
                  <>
                    <Badge className={`border text-xs ${getPillarColor(analysis.recommendedPillar)}`}>
                      {analysis.recommendedPillar}
                    </Badge>
                    <Badge className="border border-border/50 bg-background text-xs">
                      <span className={getAlignmentColor(analysis.alignmentScore)}>
                        {analysis.alignmentScore}% alignment
                      </span>
                    </Badge>
                  </>
                )}
              </div>
              <CardTitle className="mb-1 text-lg">{g.opportunityTitle}</CardTitle>
              <CardDescription className="text-sm">
                <Buildings size={14} className="mr-1 inline" weight="duotone" />
                {g.agencyName}
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleStar}
                className="h-8 w-8 shrink-0"
              >
                <Star size={18} weight={grant.starred ? 'fill' : 'regular'} className={grant.starred ? 'text-yellow-500' : ''} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="h-8 w-8 shrink-0"
              >
                <Trash size={18} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {g.description}
          </p>

          <div className="grid gap-2 text-sm sm:grid-cols-2">
            {g.closeDate && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar size={14} weight="duotone" />
                <span>Closes: {new Date(g.closeDate).toLocaleDateString()}</span>
              </div>
            )}
            {(g.awardFloor || g.awardCeiling) && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Money size={14} weight="duotone" />
                <span>
                  ${(g.awardFloor || 0).toLocaleString()} - ${(g.awardCeiling || 0).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {analysis && (
            <div className="space-y-2 rounded-lg border border-border/50 bg-muted/30 p-3">
              <div>
                <p className="mb-1 text-xs font-semibold text-foreground">AI Analysis:</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{analysis.actionableInsights}</p>
              </div>
              {analysis.keyStrengths.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-semibold text-foreground">Key Strengths:</p>
                  <ul className="space-y-0.5 text-xs text-muted-foreground">
                    {analysis.keyStrengths.slice(0, 2).map((strength, i) => (
                      <li key={i}>• {strength}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline" className="flex-1">
              <a href={g.url} target="_blank" rel="noopener noreferrer">
                <ArrowSquareOut size={14} className="mr-1.5" />
                View on Grants.gov
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function DatasetCard({ 
  dataset, 
  onToggleStar, 
  onRemove,
  index 
}: { 
  dataset: any
  onToggleStar: () => void
  onRemove: () => void
  index: number
}) {
  const ds = dataset.dataset

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden border border-border/50 shadow-sm transition-all hover:border-secondary/30 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {ds.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="mb-1 text-lg">{ds.title}</CardTitle>
              <CardDescription className="text-sm">
                <Buildings size={14} className="mr-1 inline" weight="duotone" />
                {ds.organizationTitle}
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleStar}
                className="h-8 w-8 shrink-0"
              >
                <Star size={18} weight={dataset.starred ? 'fill' : 'regular'} className={dataset.starred ? 'text-yellow-500' : ''} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="h-8 w-8 shrink-0"
              >
                <Trash size={18} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {ds.description}
          </p>

          {ds.resources && ds.resources.length > 0 && (
            <div className="space-y-1.5 rounded-lg border border-border/50 bg-muted/30 p-3">
              <p className="text-xs font-semibold text-foreground">
                {ds.resources.length} Resource{ds.resources.length !== 1 ? 's' : ''} Available:
              </p>
              <div className="space-y-1">
                {ds.resources.slice(0, 3).map((resource: any) => (
                  <div key={resource.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText size={12} weight="duotone" />
                    <span className="flex-1 truncate">{resource.name}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {resource.format}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline" className="flex-1">
              <a href={ds.url} target="_blank" rel="noopener noreferrer">
                <ArrowSquareOut size={14} className="mr-1.5" />
                View on Data.gov
              </a>
            </Button>
            {ds.resources && ds.resources[0] && (
              <Button asChild size="sm" variant="default">
                <a href={ds.resources[0].url} target="_blank" rel="noopener noreferrer">
                  <Download size={14} className="mr-1.5" />
                  Download
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
