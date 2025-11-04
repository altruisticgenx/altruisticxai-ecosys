import { useState, useCallback } from "react"
import type { Project, GrantOpportunity, Op
import type { Project, GrantOpportunity, OpenDataset } from "@/data/schema"

  grants: GrantOpportunity[]
  sources?: string[]
  isLoading: boolean
}
async function runFu
    projects: [] as Project[],
  isLoading: boolean
  error?: string
}

async function runFullIngest() {
  return {
    projects: [] as Project[],
    grants: [] as GrantOpportunity[],
    datasets: [] as OpenDataset[],
    sources: [] as string[],
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
      }

        p
        datasets: [],
      
        isLoading: false,
      }))
      setIsIngestin
    }

    return (cr
      .slice(0, 10)

    return (crawlerData?.datas
      .slice(0, 10)

    if (!crawlerData?.grants) return []
    return crawlerData.gr
      .sort((a, b) => (b.


    runIngest,
    getHighPriority
  }















































