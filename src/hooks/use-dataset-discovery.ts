import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import type { IngestedProject, GrantOpportunity } from '@/data-ingest/schema'
import { runEnrichedDiscovery } from '@/data-ingest/orchestrator'
import { getDiscoveredProjects, getDiscoveredGrants } from '@/data-ingest/store/storage'

export function useDatasetDiscovery() {
  const [projects, setProjects] = useKV<IngestedProject[]>('dataset-discovery-projects', [])
  const [grants, setGrants] = useKV<GrantOpportunity[]>('dataset-discovery-grants', [])
  const [isDiscovering, setIsDiscovering] = useState(false)
  const [progress, setProgress] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const loadStoredData = async () => {
    try {
      const [storedProjects, storedGrants] = await Promise.all([
        getDiscoveredProjects(),
        getDiscoveredGrants()
      ])
      
      setProjects(() => storedProjects)
      setGrants(() => storedGrants)
    } catch (err) {
      console.error('Error loading stored data:', err)
    }
  }

  const runDiscovery = async (useAI: boolean = true) => {
    setIsDiscovering(true)
    setError(null)
    setProgress('Initializing discovery...')

    try {
      setProgress('Querying Grants.gov and Data.gov APIs...')
      
      const job = await runEnrichedDiscovery({
        keywords: ['AI', 'energy', 'campus', 'renewable', 'pilot', 'education', 'local-first'],
        sectors: ['energy', 'education', 'research'],
        relevance_threshold: 0.4
      }, useAI)

      if (job.status === 'completed') {
        setProgress('Loading discovered data...')
        await loadStoredData()
        setProgress('')
      } else {
        throw new Error('Discovery job failed')
      }

      setIsDiscovering(false)
      return job
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Discovery failed')
      setIsDiscovering(false)
      setProgress('')
      throw err
    }
  }

  const filterBySector = (sector: IngestedProject['sector']) => {
    return (projects || []).filter(p => p.sector === sector)
  }

  const filterByRelevance = (minScore: number) => {
    return (projects || []).filter(p => (p.relevance_score || 0) >= minScore)
  }

  const getTopGrants = (count: number = 10) => {
    return (grants || [])
      .sort((a, b) => (b.relevance_score || 0) - (a.relevance_score || 0))
      .slice(0, count)
  }

  const getTopProjects = (count: number = 10) => {
    return (projects || [])
      .sort((a, b) => (b.relevance_score || 0) - (a.relevance_score || 0))
      .slice(0, count)
  }

  return {
    projects,
    grants,
    isDiscovering,
    progress,
    error,
    runDiscovery,
    loadStoredData,
    filterBySector,
    filterByRelevance,
    getTopGrants,
    getTopProjects
  }
}
