import { useState, useCallback } from "react"
import { useKV } from "@github/spark/hooks"
import { Project, GrantOpportunity, OpenDataset } from "../data/schema"
import { runFullIngest, IngestResult } from "../data-ingest/run-ingest"

export interface CrawlerState {
  projects: Project[]
  grants: GrantOpportunity[]
  datasets: OpenDataset[]
  lastIngestTimestamp?: string
  sources?: IngestResult["sources"]
  isLoading: boolean
  error?: string
}

export function useDataCrawler() {
  const [crawlerData, setCrawlerData] = useKV<CrawlerState>("crawler-data", {
    projects: [],
    grants: [],
    datasets: [],
    isLoading: false,
  })

  const [isIngesting, setIsIngesting] = useState(false)

  const runIngest = useCallback(async () => {
    setIsIngesting(true)
    setCrawlerData((current) => {
      const base = current || { projects: [], grants: [], datasets: [], isLoading: false }
      return {
        ...base,
        isLoading: true,
        error: undefined,
      }
    })

    try {
      const result = await runFullIngest()

      setCrawlerData({
        projects: result.projects,
        grants: result.grants,
        datasets: result.datasets,
        lastIngestTimestamp: result.timestamp,
        sources: result.sources,
        isLoading: false,
      })

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      
      setCrawlerData((current) => {
        const base = current || { projects: [], grants: [], datasets: [], isLoading: false }
        return {
          ...base,
          isLoading: false,
          error: errorMessage,
        }
      })

      throw error
    } finally {
      setIsIngesting(false)
    }
  }, [setCrawlerData])

  const getPriorityProjects = useCallback(() => {
    if (!crawlerData) return []
    return crawlerData.projects
      .filter(p => (p.priorityScore ?? 0) >= 80)
      .sort((a, b) => (b.priorityScore ?? 0) - (a.priorityScore ?? 0))
  }, [crawlerData])

  const getHighAlignmentGrants = useCallback(() => {
    if (!crawlerData) return []
    return crawlerData.grants
      .filter(g => (g.alignmentScore ?? 0) >= 70)
      .sort((a, b) => (b.alignmentScore ?? 0) - (a.alignmentScore ?? 0))
  }, [crawlerData])

  const getRelevantDatasets = useCallback(() => {
    if (!crawlerData) return []
    return crawlerData.datasets
      .filter(d => (d.relevanceScore ?? 0) >= 60)
      .sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0))
  }, [crawlerData])

  return {
    crawlerData,
    isIngesting,
    runIngest,
    getPriorityProjects,
    getHighAlignmentGrants,
    getRelevantDatasets,
  }
}
