import { useState, useCallback } from "react"
import { useKV } from "@github/spark/hooks"
import type { Project, GrantOpportunity, OpenDataset } from "@/data/schema"
import { runNsfAwardsIngest } from "@/data-ingest/apis/nsfAwards"
import { runUsaspendingIngest } from "@/data-ingest/apis/usaspending"
import { runEiaIngest } from "@/data-ingest/apis/eia"
import { runNrelIngest } from "@/data-ingest/apis/nrel"
import { runCollegeScorecardIngest } from "@/data-ingest/apis/collegeScorecard"
import { runDataDotGovIngest } from "@/data-ingest/apis/dataDotGov"

interface CrawlerData {
  projects: Project[]
  grants: GrantOpportunity[]
  datasets: OpenDataset[]
  sources?: string[]
  isLoading: boolean
  error?: string
  lastIngestTimestamp?: string
}

async function runFullIngest() {
  console.log("[crawler] Starting full multi-source ingest...")
  
  const results = await Promise.allSettled([
    runNsfAwardsIngest(),
    runUsaspendingIngest(),
    runEiaIngest(),
    runNrelIngest(),
    runCollegeScorecardIngest(),
    runDataDotGovIngest(),
  ])

  const allProjects: Project[] = []
  const sources: string[] = []

  results.forEach((result, index) => {
    const sourceNames = ["NSF Awards", "USAspending", "EIA", "NREL", "College Scorecard", "Data.gov"]
    if (result.status === "fulfilled") {
      allProjects.push(...result.value)
      sources.push(sourceNames[index])
      console.log(`[crawler] ${sourceNames[index]}: ${result.value.length} projects`)
    } else {
      console.error(`[crawler] ${sourceNames[index]} failed:`, result.reason)
    }
  })

  console.log(`[crawler] Total projects ingested: ${allProjects.length} from ${sources.length} sources`)

  return {
    projects: allProjects,
    grants: [] as GrantOpportunity[],
    datasets: [] as OpenDataset[],
    sources,
    timestamp: new Date().toISOString()
  }
}

export function useDataCrawler() {
  const [crawlerData, setCrawlerData] = useKV<CrawlerData>("data-crawler-state", {
    projects: [],
    grants: [],
    datasets: [],
    isLoading: false,
  })
  const [isIngesting, setIsIngesting] = useState(false)

  const runIngest = useCallback(async () => {
    setIsIngesting(true)
    setCrawlerData((current = {
      projects: [],
      grants: [],
      datasets: [],
      isLoading: false,
    }) => ({
      ...current,
      isLoading: true,
      error: undefined,
    }))

    try {
      const result = await runFullIngest()
      setCrawlerData((current = {
        projects: [],
        grants: [],
        datasets: [],
        isLoading: false,
      }) => ({
        projects: result.projects,
        grants: result.grants,
        datasets: result.datasets,
        sources: result.sources,
        isLoading: false,
        lastIngestTimestamp: result.timestamp,
      }))
      setIsIngesting(false)
    } catch (error) {
      setCrawlerData((current = {
        projects: [],
        grants: [],
        datasets: [],
        isLoading: false,
      }) => ({
        ...current,
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }))
      setIsIngesting(false)
    }
  }, [setCrawlerData])

  const getHighPriorityProjects = useCallback(() => {
    if (!crawlerData?.projects) return []
    return crawlerData.projects
      .filter(p => p.priorityScore && p.priorityScore > 70)
      .slice(0, 10)
  }, [crawlerData])

  const getTopDatasets = useCallback(() => {
    if (!crawlerData?.datasets) return []
    return crawlerData.datasets
      .filter(d => d.relevanceScore && d.relevanceScore > 60)
      .slice(0, 10)
  }, [crawlerData])

  const getMatchingGrants = useCallback(() => {
    if (!crawlerData?.grants) return []
    return crawlerData.grants
      .filter(g => g.alignmentScore && g.alignmentScore > 60)
      .sort((a, b) => (b.alignmentScore || 0) - (a.alignmentScore || 0))
  }, [crawlerData])

  return {
    crawlerData,
    isIngesting,
    runIngest,
    getHighPriorityProjects,
    getTopDatasets,
    getMatchingGrants,
  }
}











































