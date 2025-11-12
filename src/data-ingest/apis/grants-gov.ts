import type { GrantOpportunity, DiscoveryFilters } from '../schema'

interface GrantsGovHit {
  number: string
  title: string
  agency: string
  synopsis?: string
  description?: string
  awardCeiling?: number
  awardFloor?: number
  openDate?: string
  closeDate?: string
  eligibility?: string[]
}

const GRANTS_GOV_API_BASE = 'https://www.grants.gov/grantsws/rest/opportunities/search'

export async function fetchGrantsGovOpportunities(
  filters: DiscoveryFilters
): Promise<GrantOpportunity[]> {
  const keywords = filters.keywords || ['AI', 'energy', 'education', 'innovation', 'pilot']
  
  const opportunities: GrantOpportunity[] = []

  for (const keyword of keywords) {
    try {
      const params = new URLSearchParams({
        keyword,
        sortBy: 'openDate|desc',
        rows: '50',
        oppStatuses: 'forecasted|posted'
      })

      const response = await fetch(`${GRANTS_GOV_API_BASE}?${params}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'AltruisticXAI-Discovery/1.0'
        }
      })

      if (!response.ok) {
        console.warn(`Grants.gov API returned ${response.status} for keyword: ${keyword}`)
        continue
      }

      const data = await response.json()
      
      if (data.oppHits) {
        for (const hit of data.oppHits) {
          const relevanceScore = calculateRelevance(hit, filters)
          
          if (relevanceScore >= (filters.relevance_threshold || 0.3)) {
            opportunities.push({
              id: `grant-${hit.number}`,
              opportunity_number: hit.number,
              title: hit.title,
              agency: hit.agency,
              description: hit.synopsis || hit.description || '',
              award_ceiling: hit.awardCeiling,
              award_floor: hit.awardFloor,
              posting_date: hit.openDate,
              close_date: hit.closeDate,
              eligible_applicants: hit.eligibility || [],
              sector: categorizeSector(hit),
              location_scope: 'federal',
              keywords: extractKeywords(hit),
              relevance_score: relevanceScore,
              api_source: 'grants.gov',
              capture_date: new Date().toISOString(),
              url: `https://www.grants.gov/search-results-detail/${hit.number}`
            })
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching grants for keyword "${keyword}":`, error)
    }
  }

  return opportunities
}

function calculateRelevance(grant: GrantsGovHit, filters: DiscoveryFilters): number {
  let score = 0.5
  
  const text = `${grant.title} ${grant.synopsis || ''} ${grant.description || ''}`.toLowerCase()
  
  const highValueTerms = ['local-first', 'edge-ai', 'campus energy', 'renewable', 'pilot', 'demonstration']
  highValueTerms.forEach(term => {
    if (text.includes(term)) score += 0.15
  })
  
  if (filters.keywords) {
    filters.keywords.forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) score += 0.1
    })
  }
  
  if (grant.awardCeiling && filters.min_funding_usd) {
    if (grant.awardCeiling >= filters.min_funding_usd) score += 0.2
  }
  
  return Math.min(score, 1.0)
}

function categorizeSector(grant: GrantsGovHit): string[] {
  const text = `${grant.title} ${grant.synopsis || ''}`.toLowerCase()
  const sectors: string[] = []
  
  if (text.match(/energy|renewable|solar|wind|grid|efficiency/)) sectors.push('energy')
  if (text.match(/education|university|college|campus|student/)) sectors.push('education')
  if (text.match(/health|medical|clinic|hospital/)) sectors.push('healthcare')
  if (text.match(/ai|artificial intelligence|machine learning|data/)) sectors.push('research')
  if (text.match(/policy|regulation|governance|legal/)) sectors.push('law')
  
  return sectors.length > 0 ? sectors : ['multi']
}

function extractKeywords(grant: GrantsGovHit): string[] {
  const keywords: string[] = []
  const text = `${grant.title} ${grant.synopsis || ''}`.toLowerCase()
  
  const keyTerms = [
    'ai', 'artificial intelligence', 'machine learning',
    'energy', 'renewable', 'solar', 'wind',
    'education', 'campus', 'university',
    'pilot', 'demonstration', 'innovation',
    'local-first', 'edge computing', 'grid'
  ]
  
  keyTerms.forEach(term => {
    if (text.includes(term)) keywords.push(term)
  })
  
  return [...new Set(keywords)]
}
