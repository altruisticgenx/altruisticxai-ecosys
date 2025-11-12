import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { 
  GrantOpportunity, 
  searchEnergyAIGrants,
  searchEducationAIGrants,
  searchLocalGovernmentGrants,
  searchUniversityResearchGrants
} from '@/lib/grants-api'
import { analyzeBatchGrants, GrantAnalysis } from '@/lib/grant-analyzer'

export interface DiscoveredGrant {
  grant: GrantOpportunity
  analysis?: GrantAnalysis
  discoveredAt: string
  starred: boolean
  notes?: string
}

export type GrantCategory = 'energy-ai' | 'education-ai' | 'local-government' | 'university-research' | 'custom'

export function useGrantDiscovery() {
  const [grants, setGrants] = useKV<DiscoveredGrant[]>('discovered-grants', [])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const discoverGrants = async (category: GrantCategory, analyzeWithAI: boolean = true) => {
    setIsLoading(true)
    setError(null)
    setLoadingStage('Searching Grants.gov database...')

    try {
      let searchResult: { opportunities: GrantOpportunity[] }

      switch (category) {
        case 'energy-ai':
          searchResult = await searchEnergyAIGrants(15)
          break
        case 'education-ai':
          searchResult = await searchEducationAIGrants(15)
          break
        case 'local-government':
          searchResult = await searchLocalGovernmentGrants(15)
          break
        case 'university-research':
          searchResult = await searchUniversityResearchGrants(15)
          break
        default:
          throw new Error('Invalid category')
      }

      const newOpportunities = searchResult.opportunities.filter(opp => {
        return !(grants || []).find(g => g.grant.id === opp.id)
      })

      if (newOpportunities.length === 0) {
        setIsLoading(false)
        setLoadingStage('')
        return []
      }

      let analyses: Map<string, GrantAnalysis> | undefined

      if (analyzeWithAI && newOpportunities.length > 0) {
        setLoadingStage(`Analyzing ${newOpportunities.length} grants with AI...`)
        analyses = await analyzeBatchGrants(newOpportunities)
      }

      const newGrants: DiscoveredGrant[] = newOpportunities.map(opp => ({
        grant: opp,
        analysis: analyses?.get(opp.id),
        discoveredAt: new Date().toISOString(),
        starred: false
      }))

      if (analyses) {
        newGrants.sort((a, b) => {
          const scoreA = a.analysis?.alignmentScore || 0
          const scoreB = b.analysis?.alignmentScore || 0
          return scoreB - scoreA
        })
      }

      if (newGrants.length > 0) {
        setGrants(current => [...newGrants, ...(current || [])].slice(0, 100))
      }

      setIsLoading(false)
      setLoadingStage('')
      return newGrants
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to discover grants')
      setIsLoading(false)
      setLoadingStage('')
      return []
    }
  }

  const toggleStar = (grantId: string) => {
    setGrants(current =>
      (current || []).map(g =>
        g.grant.id === grantId ? { ...g, starred: !g.starred } : g
      )
    )
  }

  const addNote = (grantId: string, note: string) => {
    setGrants(current =>
      (current || []).map(g =>
        g.grant.id === grantId ? { ...g, notes: note } : g
      )
    )
  }

  const removeGrant = (grantId: string) => {
    setGrants(current => (current || []).filter(g => g.grant.id !== grantId))
  }

  const clearAll = () => {
    setGrants([])
  }

  const getStarredGrants = () => {
    return (grants || []).filter(g => g.starred)
  }

  const getByPillar = (pillar: 'labs' | 'consulting' | 'policy' | 'cross-pillar') => {
    return (grants || []).filter(g => g.analysis?.recommendedPillar === pillar)
  }

  return {
    grants,
    isLoading,
    loadingStage,
    error,
    discoverGrants,
    toggleStar,
    addNote,
    removeGrant,
    clearAll,
    getStarredGrants,
    getByPillar
  }
}
