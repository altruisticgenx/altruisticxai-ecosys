import { useState, useCallback } from "react"
import { runFullIngest, IngestResult } from

  projects: Project[]

  sources?: IngestResult["sourc
  error?: string

  const [crawlerData, set
    grants: [],
    isLoading: false,


 

        ...base,
        error: undefined,
    })
    try {

        projects: res
    

      })

      setCrawlerData((current) => {
        return {
          isLoading: false,
        }
      throw er
      setIsInges
  }, [setCrawlerData])
  const getHighPriorityPr
    ret
      

    if (!
      .filter(g => (g.alignmentScore ?? 0)

  const getRelevantDat
    return crawlerData.datasets
      .sort((a, b) => (b.relev

    crawlerData,
    runIngest,
    getHighAlignmentGrant
  }















































