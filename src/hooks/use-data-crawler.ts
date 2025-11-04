import { useState, useCallback } from "react"
import { useKV } from "@github/spark/hooks"

  projects: Project[]

  lastIngestTimestamp?:
  error?: string

  const [crawlerData, set
    grants: [],
  lastIngestTimestamp?: string
  isLoading: boolean
  error?: string
}

export function useDataCrawler() {
  const [crawlerData, setCrawlerData] = useKV<CrawlerData>("data-crawler-state", {
    projects: [],
    grants: [],
    datasets: [],
      datasets: [],
    
  
    }))

      
        projects: [],
        datasets: [],
      }) => ({
        projects:
        datasets: r
        lastIngestTimes
        erro

      return result
      const errorMessag
      s

    try {
      const result = await runFullIngest()
      
      setCrawlerData((current = {
        projects: [],
        grants: [],
        datasets: [],
        isLoading: false,
      }) => ({
        ...current,
        projects: result.projects,
        grants: result.grants,
        datasets: result.datasets,
        sources: result.sources,
        lastIngestTimestamp: result.timestamp,
        isLoading: false,
        error: undefined,
      }))

      setIsIngesting(false)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ingest failed"
      
      setCrawlerData((current = {
        projects: [],
        grants: [],
        datasets: [],
        isLoading: false,
      }) => ({
        ...current,
        isLoading: false,
        error: errorMessage,
      }))

      setIsIngesting(false)
      throw err
    }
  }, [setCrawlerData])

  const getHighPriorityProjects = useCallback(() => {
    return (crawlerData?.projects || [])
      .filter(p => p.status === "active" || p.status === "planned")
      .slice(0, 10)
  }, [crawlerData])

  const getRelevantDatasets = useCallback(() => {
    return (crawlerData?.datasets || [])
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, 10)
  }, [crawlerData])

  const getHighAlignmentGrants = useCallback((minScore: number = 0.7) => {
    if (!crawlerData?.grants) return []
    
    return crawlerData.grants
      .filter(g => (g.alignmentScore ?? 0) >= minScore)
      .sort((a, b) => (b.alignmentScore || 0) - (a.alignmentScore || 0))
  }, [crawlerData])

  return {
    crawlerData,
    isIngesting,
    runIngest,
    getHighAlignmentGrants,
    getHighPriorityProjects,
    getRelevantDatasets,
  }
}
    getHighAlignmentGrants,
    getHighPriorityProjects,
    getRelevantDatasets,
  }
}
