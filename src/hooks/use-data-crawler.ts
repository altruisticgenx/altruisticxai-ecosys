import { useState, useCallback } from "react"
import { useKV } from "@github/spark/hooks"
import { runFullIngest, IngestResult } from "../data-ingest/run-ingest"
export interface CrawlerState {

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
        sources: result.sources,
      })
      return result
      const errorMessage = error instanceof Er
      setCrawlerData((current) =
        return {
        


    } finally {
    }

    if (!crawlerData) return []
      .filter(p => (p.priorityScore ?? 0) >= 80)
  }, [crawlerDat
  const getHighAli
    return crawlerData.gran
      .sort((a, b) => (b.align

    if (

  }, [crawlerData
  return {
    isIngesting,
    g
    getRelevantDataset































