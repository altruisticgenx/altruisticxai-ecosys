export interface GrantOpportunity {
  id: string
  opportunityNumber: string
  opportunityTitle: string
  agencyName: string
  description: string
  closeDate: string
  awardCeiling?: number
  awardFloor?: number
  estimatedTotalProgramFunding?: number
  opportunityCategory: string
  fundingInstrumentType: string
  eligibleApplicants: string[]
  additionalInfo?: string
  cfda?: string
  opportunityStatus: string
  url: string
  relevanceScore?: number
  alignmentReason?: string
}

export interface GrantsSearchResponse {
  totalRecords: number
  opportunities: GrantOpportunity[]
}

const GRANTS_GOV_API_BASE = 'https://api.grants.gov/v1/api'

export async function searchGrantOpportunities(
  keywords: string,
  limit: number = 20
): Promise<GrantsSearchResponse> {
  const params = new URLSearchParams({
    keyword: keywords,
    oppStatuses: 'forecasted|posted',
    sortBy: 'openDate|desc',
    rows: limit.toString()
  })

  try {
    const response = await fetch(`${GRANTS_GOV_API_BASE}/search2?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Grants.gov API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    const opportunities: GrantOpportunity[] = (data.opportunitiesView || []).map((opp: any) => ({
      id: opp.opportunityId || opp.opportunityNumber,
      opportunityNumber: opp.opportunityNumber,
      opportunityTitle: opp.opportunityTitle,
      agencyName: opp.agencyName,
      description: opp.description || opp.synopsis || '',
      closeDate: opp.closeDate,
      awardCeiling: opp.awardCeiling,
      awardFloor: opp.awardFloor,
      estimatedTotalProgramFunding: opp.estimatedTotalProgramFunding,
      opportunityCategory: opp.opportunityCategory || opp.oppCategory || 'Unknown',
      fundingInstrumentType: opp.fundingInstrumentType || 'Unknown',
      eligibleApplicants: Array.isArray(opp.eligibleApplicants) 
        ? opp.eligibleApplicants 
        : typeof opp.eligibleApplicants === 'string'
        ? [opp.eligibleApplicants]
        : [],
      additionalInfo: opp.additionalInfo,
      cfda: opp.cfdaNumber,
      opportunityStatus: opp.opportunityStatus,
      url: `https://www.grants.gov/search-results-detail/${opp.opportunityNumber}`
    }))

    return {
      totalRecords: data.totalRecords || opportunities.length,
      opportunities
    }
  } catch (error) {
    console.error('Error fetching grants:', error)
    throw error
  }
}

export async function searchEnergyAIGrants(limit: number = 15): Promise<GrantsSearchResponse> {
  return searchGrantOpportunities('energy AI artificial intelligence pilot', limit)
}

export async function searchEducationAIGrants(limit: number = 15): Promise<GrantsSearchResponse> {
  return searchGrantOpportunities('education AI artificial intelligence technology', limit)
}

export async function searchLocalGovernmentGrants(limit: number = 15): Promise<GrantsSearchResponse> {
  return searchGrantOpportunities('local government municipal city energy', limit)
}

export async function searchUniversityResearchGrants(limit: number = 15): Promise<GrantsSearchResponse> {
  return searchGrantOpportunities('university research AI energy sustainability', limit)
}
