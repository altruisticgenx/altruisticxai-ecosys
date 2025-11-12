import React, { useState } from "react"
import LayoutShell from "@/components/LayoutShell"
import { Container } from "@/components/Container"
import ImpactTable from "@/components/ImpactTable"
import CrawledProjectCard from "@/components/CrawledProjectCard"
import { impactEvents, ImpactEvent } from "@/data/impactEvents"
import { ChartLineUp, Rocket, Scroll, BookOpen, Database, CloudArrowDown, CheckCircle, CalendarBlank } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDataCrawler } from "@/hooks/use-data-crawler"
import { toast } from "sonner"
import { validateData, ValidationResult } from "@/data-ingest/validate"

interface CrawlerData {
  lastIngestTimestamp?: string
  projects?: Array<{ effectiveDate?: string }>
}

interface CrawlerData {
  lastIngestTimestamp?: string
  projects?: Array<{ effectiveDate?: string }>
}

function getLastUpdated(crawlerData: CrawlerData | null) {
  if (!crawlerData?.lastIngestTimestamp) return null
  return new Date(crawlerData.lastIngestTimestamp).toISOString().slice(0, 10)
}

function getCoverage(projects: Array<{ effectiveDate?: string }>) {
  const dates: Date[] = []

  projects.forEach((p) => {
    if (p.effectiveDate) {
      const d = new Date(p.effectiveDate)
      if (!Number.isNaN(d.getTime())) dates.push(d)
    }
  })

  if (dates.length === 0) return null

  const min = new Date(Math.min(...dates.map((d) => d.getTime())))
  const max = new Date(Math.max(...dates.map((d) => d.getTime())))

  return {
    from: min.toISOString().slice(0, 10),
    to: max.toISOString().slice(0, 10),
  }
}

export default function ImpactLedgerPage() {
  const { crawlerData, isIngesting, runIngest, getHighPriorityProjects } = useDataCrawler()
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  
  const allEvents = impactEvents as ImpactEvent[]
  const pilotEvents = allEvents.filter(e => e.type === "pilot")
  const policyEvents = allEvents.filter(e => e.type === "policy")
  const publicationEvents = allEvents.filter(e => e.type === "publication")
  const partnershipEvents = allEvents.filter(e => e.type === "partnership")
  
  const priorityProjects = getHighPriorityProjects()
  
  const lastUpdated = getLastUpdated(crawlerData || null)
  const coverage = getCoverage(priorityProjects)
  
  const handleRunCrawler = async () => {
    try {
      await runIngest()
      toast.success("Data crawler completed successfully!")
      
      setIsValidating(true)
      const result = await validateData()
      setValidationResult(result)
      setIsValidating(false)
      
      if (result.valid) {
        toast.success("Data validation passed! All data is 2025+ compliant.")
      } else {
        toast.error(`Validation found ${result.errors.length} error(s)`)
      }
    } catch (error) {
      setIsValidating(false)
      toast.error("Crawler failed: " + (error instanceof Error ? error.message : "Unknown error"))
    }
  }

  const stats = [
    { 
      label: "Pilot Deployments", 
      value: pilotEvents.length.toString(), 
      icon: Rocket,
      color: "text-primary"
    },
    { 
      label: "Policy Initiatives", 
      value: policyEvents.length.toString(), 
      icon: Scroll,
      color: "text-secondary"
    },
    { 
      label: "Publications", 
      value: publicationEvents.length.toString(), 
      icon: BookOpen,
      color: "text-accent"
    },
    { 
      label: "Crawled Projects", 
      value: (crawlerData?.projects?.length ?? 0).toString(), 
      icon: Database,
      color: "text-muted-foreground"
    }
  ]

  return (
    <LayoutShell>
      <Container className="py-12 sm:py-16">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-lg ring-1 ring-primary/20">
              <ChartLineUp size={32} weight="duotone" className="text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Impact Ledger
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            A transparent, chronological record of every milestone across our three arms. 
            <span className="font-medium text-foreground"> This ledger demonstrates how open-source innovation, client deployments, and policy 
            advocacy reinforce each other to create systemic change.</span>
          </p>
          
          {(lastUpdated || coverage) && (
            <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-left sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2">
                <CalendarBlank size={20} weight="duotone" className="mt-0.5 shrink-0 text-primary" />
                <div>
                  {lastUpdated && (
                    <p className="text-xs text-muted-foreground">
                      Last updated: <span className="font-semibold text-foreground">{lastUpdated}</span>
                    </p>
                  )}
                  {coverage && (
                    <p className="text-xs text-muted-foreground">
                      Data coverage: <span className="font-semibold text-foreground">{coverage.from} → {coverage.to}</span>
                    </p>
                  )}
                </div>
              </div>
              {validationResult?.valid && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
                  <CheckCircle size={16} weight="fill" />
                  <span>2025+ Validated</span>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6">
            <Button
              onClick={handleRunCrawler}
              disabled={isIngesting || isValidating}
              className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
            >
              <CloudArrowDown size={18} weight="bold" className="mr-2" />
              {isIngesting ? "Crawling..." : isValidating ? "Validating..." : "Run Federal Data Crawler"}
            </Button>
          </div>
        </div>

        {(crawlerData?.error || (validationResult && !validationResult.valid)) && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>
              {crawlerData?.error}
              {validationResult && !validationResult.valid && (
                <div className="mt-2">
                  <p className="font-semibold">Validation Errors ({validationResult.errors.length}):</p>
                  <ul className="ml-4 mt-1 list-disc text-xs">
                    {validationResult.errors.slice(0, 5).map((err: string, idx: number) => (
                      <li key={idx}>{err}</li>
                    ))}
                    {validationResult.errors.length > 5 && (
                      <li>...and {validationResult.errors.length - 5} more</li>
                    )}
                  </ul>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="group overflow-hidden border border-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 shadow-inner ring-1 ring-primary/10 transition-all group-hover:scale-105">
                      <Icon size={18} weight="duotone" className={stat.color} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 gap-2 sm:grid-cols-6 sm:gap-0">
            <TabsTrigger value="all" className="text-sm">All Events</TabsTrigger>
            <TabsTrigger value="discovered" className="text-sm">Discovered Projects</TabsTrigger>
            <TabsTrigger value="pilot" className="text-sm">Pilots</TabsTrigger>
            <TabsTrigger value="policy" className="text-sm">Policy</TabsTrigger>
            <TabsTrigger value="publication" className="text-sm">Publications</TabsTrigger>
            <TabsTrigger value="partnership" className="col-span-2 text-sm sm:col-span-1">Partnerships</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ImpactTable events={allEvents} />
          </TabsContent>
          
          <TabsContent value="discovered">
            {priorityProjects.length > 0 ? (
              <div className="space-y-6">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">{priorityProjects.length} high-priority projects</span> discovered from federal APIs (USAspending, NSF Awards).
                    These are automatically scored based on geographic relevance (Maine, New England, PA) and sector alignment (energy, AI, education).
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {priorityProjects.map((project) => (
                    <CrawledProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 p-12 text-center">
                <Database size={48} weight="duotone" className="mb-4 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-bold">No Projects Discovered Yet</h3>
                <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                  Click "Run Federal Data Crawler" above to automatically discover relevant energy and AI projects from federal databases.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pilot">
            <ImpactTable events={pilotEvents} />
          </TabsContent>

          <TabsContent value="policy">
            <ImpactTable events={policyEvents} />
          </TabsContent>

          <TabsContent value="publication">
            <ImpactTable events={publicationEvents} />
          </TabsContent>

          <TabsContent value="partnership">
            <ImpactTable events={partnershipEvents} />
          </TabsContent>
        </Tabs>

        <div className="mt-16 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 sm:p-10">
          <h3 className="mb-3 text-center text-2xl font-bold text-foreground sm:text-3xl">
            The Flywheel in Action
          </h3>
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            Each event in this ledger contributes to our self-reinforcing cycle: 
            <span className="font-medium text-foreground"> open-source projects establish trust and technical feasibility → consulting deployments generate revenue and 
            measurable outcomes → policy initiatives use those outcomes as evidence to create structural 
            change → successful policies increase demand for compliance tools → revenue funds new 
            open-source research.</span> This is how we build sustainable, ethical AI at scale.
          </p>
        </div>
      </Container>
    </LayoutShell>
  )
}
