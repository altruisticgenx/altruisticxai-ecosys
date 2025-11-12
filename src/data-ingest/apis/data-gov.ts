import type { IngestedProject, DiscoveryFilters } from '../schema'

interface DataGovTag {
  name: string
}

interface DataGovOrganization {
  title?: string
}

interface DataGovDataset {
  id: string
  name: string
  title: string
  notes?: string
  organization?: DataGovOrganization
  tags?: DataGovTag[]
}

const DATA_GOV_API_BASE = 'https://catalog.data.gov/api/3/action'

export async function fetchDataGovDatasets(
  filters: DiscoveryFilters
): Promise<IngestedProject[]> {
  const projects: IngestedProject[] = []
  
  const searchTerms = filters.keywords || [
    'energy consumption',
    'campus sustainability',
    'renewable energy pilot',
    'AI education',
    'local government innovation'
  ]

  for (const term of searchTerms) {
    try {
      const params = new URLSearchParams({
        q: term,
        rows: '25',
        sort: 'metadata_modified desc'
      })

      const response = await fetch(`${DATA_GOV_API_BASE}/package_search?${params}`, {
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!response.ok) continue

      const data = await response.json()
      
      if (data.success && data.result?.results) {
        for (const dataset of data.result.results) {
          const relevanceScore = calculateDatasetRelevance(dataset, filters)
          
          if (relevanceScore >= (filters.relevance_threshold || 0.4)) {
            projects.push({
              id: `datagov-${dataset.id}`,
              title: dataset.title,
              description: dataset.notes || '',
              sector: determineSector(dataset),
              organization: dataset.organization?.title,
              location: {
                state: extractState(dataset),
                region: extractRegion(dataset)
              },
              tags: dataset.tags?.map((t: DataGovTag) => t.name) || [],
              status: 'active',
              relevance_score: relevanceScore,
              api_source: 'data.gov',
              capture_date: new Date().toISOString(),
              url: `https://catalog.data.gov/dataset/${dataset.name}`
            })
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching data.gov datasets for "${term}":`, error)
    }
  }

  return projects
}

function calculateDatasetRelevance(dataset: DataGovDataset, filters: DiscoveryFilters): number {
  let score = 0.4
  
  const text = `${dataset.title} ${dataset.notes || ''}`.toLowerCase()
  
  const highValueTerms = [
    'pilot', 'demonstration', 'innovation', 'local',
    'campus', 'municipal', 'renewable', 'ai', 'efficiency'
  ]
  
  highValueTerms.forEach(term => {
    if (text.includes(term)) score += 0.1
  })
  
  if (dataset.organization?.title?.match(/university|college|city|municipal/i)) {
    score += 0.15
  }
  
  if (filters.keywords) {
    filters.keywords.forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) score += 0.08
    })
  }
  
  return Math.min(score, 1.0)
}

function determineSector(dataset: DataGovDataset): IngestedProject['sector'] {
  const text = `${dataset.title} ${dataset.notes || ''}`.toLowerCase()
  
  if (text.match(/energy|solar|wind|renewable|efficiency|grid/)) return 'energy'
  if (text.match(/education|university|college|school|student/)) return 'education'
  if (text.match(/health|medical|clinic|patient/)) return 'healthcare'
  if (text.match(/ai|data science|machine learning|analytics/)) return 'research'
  if (text.match(/policy|regulation|law|legal|governance/)) return 'law'
  
  return 'multi'
}

function extractState(dataset: DataGovDataset): string | undefined {
  const states = [
    'maine', 'vermont', 'new hampshire', 'massachusetts', 'rhode island', 'connecticut',
    'california', 'texas', 'new york', 'florida'
  ]
  
  const text = `${dataset.title} ${dataset.notes || ''}`.toLowerCase()
  
  for (const state of states) {
    if (text.includes(state)) {
      return state.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }
  }
  
  return undefined
}

function extractRegion(dataset: DataGovDataset): string | undefined {
  const text = `${dataset.title} ${dataset.notes || ''}`.toLowerCase()
  
  if (text.match(/new england|northeast/)) return 'New England'
  if (text.match(/midwest|great lakes/)) return 'Midwest'
  if (text.match(/west coast|pacific/)) return 'West Coast'
  if (text.match(/south|southeast/)) return 'Southeast'
  
  return undefined
}
