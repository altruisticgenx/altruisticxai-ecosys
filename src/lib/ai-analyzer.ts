import { GitHubRepo } from './github-api'

export interface ProjectAnalysis {
  relevanceScore: number
  category: 'explainability' | 'privacy' | 'fairness' | 'sustainability' | 'general-ethics'
  potentialUseCase: string
  alignmentReason: string
  recommendedSector: string
  impactPotential: 'high' | 'medium' | 'low'
  technicalComplexity: 'advanced' | 'intermediate' | 'beginner'
  keyInsights: string[]
  integrationReadiness: number
}

interface AnalysisCache {
  [repoId: string]: {
    analysis: ProjectAnalysis
    timestamp: number
  }
}

const analysisCache: AnalysisCache = {}
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000

export async function analyzeBatchProjectRelevance(repos: GitHubRepo[]): Promise<Map<number, ProjectAnalysis>> {
  const results = new Map<number, ProjectAnalysis>()
  
  const uncachedRepos = repos.filter(repo => {
    const cached = analysisCache[repo.id]
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      results.set(repo.id, cached.analysis)
      return false
    }
    return true
  })

  if (uncachedRepos.length === 0) {
    return results
  }

  const batchPromptText = `You are an elite AI ethics analyst with expertise in evaluating open-source AI projects for societal impact, technical merit, and ethical alignment.

Analyze these ${uncachedRepos.length} GitHub projects in batch and return a JSON object with a "projects" array. For each project, provide deep insights:

${uncachedRepos.map((repo, i) => `
Project ${i + 1}:
- ID: ${repo.id}
- Name: ${repo.name}
- Description: ${repo.description || 'No description'}
- Topics: ${repo.topics.join(', ') || 'None'}
- Language: ${repo.language || 'Unknown'}
- Stars: ${repo.stargazers_count}
`).join('\n')}

For EACH project, analyze and return:
1. repoId: The project ID number
2. relevanceScore (0-100): Deep analysis of ethical AI alignment, explainability, privacy preservation, fairness, and public benefit potential
3. category: 'explainability' | 'privacy' | 'fairness' | 'sustainability' | 'general-ethics'
4. potentialUseCase: Specific, compelling use case for universities, hospitals, or government (1-2 sentences)
5. alignmentReason: Detailed explanation of ethical AI alignment with concrete examples (1-2 sentences)
6. recommendedSector: 'Healthcare' | 'Education' | 'Government' | 'Energy' | 'General'
7. impactPotential: 'high' | 'medium' | 'low' based on scope and scalability
8. technicalComplexity: 'advanced' | 'intermediate' | 'beginner'
9. keyInsights: Array of 2-3 unique insights about this project's innovation or approach
10. integrationReadiness (0-100): How production-ready and well-documented is this project

Return as JSON: { "projects": [{ repoId, relevanceScore, category, ... }, ...] }`

  try {
    const response = await window.spark.llm(batchPromptText, 'gpt-4o', true)
    const parsed = JSON.parse(response) as { projects?: Array<Partial<ProjectAnalysis> & { repoId: number }> }
    
    if (parsed.projects && Array.isArray(parsed.projects)) {
      parsed.projects.forEach((item) => {
        const analysis: ProjectAnalysis = {
          relevanceScore: item.relevanceScore || 50,
          category: item.category || 'general-ethics',
          potentialUseCase: item.potentialUseCase || 'General ethical AI application',
          alignmentReason: item.alignmentReason || 'Promotes transparency and accountability',
          recommendedSector: item.recommendedSector || 'General',
          impactPotential: item.impactPotential || 'medium',
          technicalComplexity: item.technicalComplexity || 'intermediate',
          keyInsights: item.keyInsights || ['Open-source ethical AI project'],
          integrationReadiness: item.integrationReadiness || 50
        }
        
        analysisCache[item.repoId] = {
          analysis,
          timestamp: Date.now()
        }
        
        results.set(item.repoId, analysis)
      })
    }
  } catch (error) {
    console.error('Batch AI analysis failed:', error)
    uncachedRepos.forEach(repo => {
      const fallbackAnalysis = createFallbackAnalysis(repo)
      results.set(repo.id, fallbackAnalysis)
    })
  }

  return results
}

export async function analyzeProjectRelevance(repo: GitHubRepo): Promise<ProjectAnalysis> {
  const cached = analysisCache[repo.id]
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.analysis
  }

  const promptText = `You are an elite AI ethics analyst evaluating this open-source project for ethical AI alignment and societal impact.

Project: ${repo.name}
Description: ${repo.description || 'No description'}
Topics: ${repo.topics.join(', ') || 'None'}
Language: ${repo.language || 'Unknown'}
Stars: ${repo.stargazers_count}

Provide a comprehensive analysis as JSON with:
1. relevanceScore (0-100): Deep analysis of ethical AI alignment
2. category: 'explainability' | 'privacy' | 'fairness' | 'sustainability' | 'general-ethics'
3. potentialUseCase: Specific use case for universities, hospitals, or government
4. alignmentReason: Detailed explanation with concrete examples
5. recommendedSector: 'Healthcare' | 'Education' | 'Government' | 'Energy' | 'General'
6. impactPotential: 'high' | 'medium' | 'low'
7. technicalComplexity: 'advanced' | 'intermediate' | 'beginner'
8. keyInsights: Array of 2-3 unique insights
9. integrationReadiness (0-100): Production readiness score`

  try {
    const response = await window.spark.llm(promptText, 'gpt-4o', true)
    const analysis = JSON.parse(response)
    
    const result: ProjectAnalysis = {
      relevanceScore: analysis.relevanceScore || 50,
      category: analysis.category || 'general-ethics',
      potentialUseCase: analysis.potentialUseCase || 'General ethical AI application',
      alignmentReason: analysis.alignmentReason || 'Promotes transparency and accountability',
      recommendedSector: analysis.recommendedSector || 'General',
      impactPotential: analysis.impactPotential || 'medium',
      technicalComplexity: analysis.technicalComplexity || 'intermediate',
      keyInsights: analysis.keyInsights || ['Open-source ethical AI project'],
      integrationReadiness: analysis.integrationReadiness || 50
    }
    
    analysisCache[repo.id] = {
      analysis: result,
      timestamp: Date.now()
    }
    
    return result
  } catch (error) {
    console.error('AI analysis failed:', error)
    return createFallbackAnalysis(repo)
  }
}

function createFallbackAnalysis(repo: GitHubRepo): ProjectAnalysis {
  const topicKeywords = repo.topics.join(' ').toLowerCase()
  const descKeywords = (repo.description || '').toLowerCase()
  
  let category: ProjectAnalysis['category'] = 'general-ethics'
  let relevanceScore = 50
  
  if (topicKeywords.includes('explainable') || topicKeywords.includes('interpretable') || descKeywords.includes('explainab')) {
    category = 'explainability'
    relevanceScore = 70
  } else if (topicKeywords.includes('privacy') || topicKeywords.includes('federated') || topicKeywords.includes('differential')) {
    category = 'privacy'
    relevanceScore = 75
  } else if (topicKeywords.includes('fairness') || topicKeywords.includes('bias')) {
    category = 'fairness'
    relevanceScore = 72
  } else if (topicKeywords.includes('sustain') || topicKeywords.includes('energy')) {
    category = 'sustainability'
    relevanceScore = 68
  }
  
  return {
    relevanceScore,
    category,
    potentialUseCase: 'Applicable to ethical AI systems requiring transparency and accountability',
    alignmentReason: 'Open-source project focused on responsible AI development',
    recommendedSector: 'General',
    impactPotential: 'medium',
    technicalComplexity: 'intermediate',
    keyInsights: ['Community-driven ethical AI initiative', 'Open-source approach to AI transparency'],
    integrationReadiness: 50
  }
}
