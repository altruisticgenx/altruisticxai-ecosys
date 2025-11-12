export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  license: {
    name: string
  } | null
}

export interface GitHubSearchResult {
  total_count: number
  items: GitHubRepo[]
}

const ETHICAL_AI_TOPICS = [
  'explainable-ai',
  'ai-ethics',
  'fairness-ml',
  'privacy-preserving-ml',
  'federated-learning',
  'differential-privacy',
  'bias-detection',
  'ai-transparency',
  'responsible-ai',
  'interpretable-ml'
]

export async function searchEthicalAIProjects(
  topic?: string,
  perPage: number = 10
): Promise<GitHubSearchResult> {
  const searchTopic = topic || ETHICAL_AI_TOPICS[Math.floor(Math.random() * ETHICAL_AI_TOPICS.length)]
  const query = `topic:${searchTopic} stars:>100 archived:false pushed:>2023-01-01`
  
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${Math.min(perPage, 30)}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  )

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('GitHub API rate limit reached. Please try again in a few minutes.')
    }
    throw new Error(`GitHub API error: ${response.status}`)
  }

  return response.json()
}

export async function getRepoDetails(owner: string, repo: string): Promise<GitHubRepo> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  return response.json()
}
