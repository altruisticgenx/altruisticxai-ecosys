import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import {
  DataGovDataset,
  searchEnergyDatasets,
  searchAIResearchDatasets,
  searchEducationDatasets,
  searchMunicipalDatasets,
  searchClimateDatasets
} from '@/lib/data-gov-api'

export interface SavedDataset {
  dataset: DataGovDataset
  discoveredAt: string
  starred: boolean
  notes?: string
  integratedWithPillar?: 'labs' | 'consulting' | 'policy'
}

export type DatasetCategory = 'energy' | 'ai-research' | 'education' | 'municipal' | 'climate'

export function useDatasetDiscovery() {
  const [datasets, setDatasets] = useKV<SavedDataset[]>('discovered-datasets', [])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const discoverDatasets = async (category: DatasetCategory) => {
    setIsLoading(true)
    setError(null)
    setLoadingStage('Searching Data.gov catalog...')

    try {
      let searchResult: { datasets: DataGovDataset[] }

      switch (category) {
        case 'energy':
          searchResult = await searchEnergyDatasets(15)
          break
        case 'ai-research':
          searchResult = await searchAIResearchDatasets(15)
          break
        case 'education':
          searchResult = await searchEducationDatasets(15)
          break
        case 'municipal':
          searchResult = await searchMunicipalDatasets(15)
          break
        case 'climate':
          searchResult = await searchClimateDatasets(15)
          break
        default:
          throw new Error('Invalid category')
      }

      const newDatasets = searchResult.datasets.filter(ds => {
        return !(datasets || []).find(d => d.dataset.id === ds.id)
      })

      if (newDatasets.length === 0) {
        setIsLoading(false)
        setLoadingStage('')
        return []
      }

      const savedDatasets: SavedDataset[] = newDatasets.map(ds => ({
        dataset: ds,
        discoveredAt: new Date().toISOString(),
        starred: false
      }))

      if (savedDatasets.length > 0) {
        setDatasets(current => [...savedDatasets, ...(current || [])].slice(0, 100))
      }

      setIsLoading(false)
      setLoadingStage('')
      return savedDatasets
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to discover datasets')
      setIsLoading(false)
      setLoadingStage('')
      return []
    }
  }

  const toggleStar = (datasetId: string) => {
    setDatasets(current =>
      (current || []).map(d =>
        d.dataset.id === datasetId ? { ...d, starred: !d.starred } : d
      )
    )
  }

  const addNote = (datasetId: string, note: string) => {
    setDatasets(current =>
      (current || []).map(d =>
        d.dataset.id === datasetId ? { ...d, notes: note } : d
      )
    )
  }

  const setPillar = (datasetId: string, pillar: 'labs' | 'consulting' | 'policy' | undefined) => {
    setDatasets(current =>
      (current || []).map(d =>
        d.dataset.id === datasetId ? { ...d, integratedWithPillar: pillar } : d
      )
    )
  }

  const removeDataset = (datasetId: string) => {
    setDatasets(current => (current || []).filter(d => d.dataset.id !== datasetId))
  }

  const clearAll = () => {
    setDatasets([])
  }

  const getStarredDatasets = () => {
    return (datasets || []).filter(d => d.starred)
  }

  const getByPillar = (pillar: 'labs' | 'consulting' | 'policy') => {
    return (datasets || []).filter(d => d.integratedWithPillar === pillar)
  }

  return {
    datasets,
    isLoading,
    loadingStage,
    error,
    discoverDatasets,
    toggleStar,
    addNote,
    setPillar,
    removeDataset,
    clearAll,
    getStarredDatasets,
    getByPillar
  }
}
