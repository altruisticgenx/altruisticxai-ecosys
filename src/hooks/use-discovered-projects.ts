import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { searchEthicalAIProjects, GitHubRepo } from '@/lib/github-api'
import { analyzeBatchProjectRelevance, ProjectAnalysis } from '@/lib/ai-analyzer'

export interface DiscoveredProject {
  repo: GitHubRepo
  analysis: ProjectAnalysis
  discoveredAt: string
}

export function useDiscoveredProjects() {
  const [projects, setProjects] = useKV<DiscoveredProject[]>('discovered-projects', [])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const discoverNewProjects = async (topic?: string, count: number = 10) => {
    setIsLoading(true)
    setError(null)
    setLoadingStage('Searching GitHub...')

    try {
      const searchResult = await searchEthicalAIProjects(topic, count)
      
      const newRepos = searchResult.items.filter(repo => {
        return !(projects || []).find(p => p.repo.id === repo.id)
      })

      if (newRepos.length === 0) {
        setIsLoading(false)
        setLoadingStage('')
        return []
      }

      setLoadingStage(`Analyzing ${newRepos.length} projects with AI...`)
      
      const analysisResults = await analyzeBatchProjectRelevance(newRepos)
      
      const newProjects: DiscoveredProject[] = []
      
      newRepos.forEach(repo => {
        const analysis = analysisResults.get(repo.id)
        if (analysis && analysis.relevanceScore >= 60) {
          newProjects.push({
            repo,
            analysis,
            discoveredAt: new Date().toISOString()
          })
        }
      })

      newProjects.sort((a, b) => b.analysis.relevanceScore - a.analysis.relevanceScore)

      if (newProjects.length > 0) {
        setProjects(current => [...newProjects, ...(current || [])].slice(0, 50))
      }

      setIsLoading(false)
      setLoadingStage('')
      return newProjects
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to discover projects')
      setIsLoading(false)
      setLoadingStage('')
      return []
    }
  }

  const removeProject = (repoId: number) => {
    setProjects(current => (current || []).filter(p => p.repo.id !== repoId))
  }

  const clearAll = () => {
    setProjects([])
  }

  return {
    projects,
    isLoading,
    loadingStage,
    error,
    discoverNewProjects,
    removeProject,
    clearAll
  }
}
