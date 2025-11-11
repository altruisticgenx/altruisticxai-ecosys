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

interface GrantsGovRawOpportunity {
  opportunityID?: string
  opportunityNumber?: string
  opportunityTitle?: string
  agencyName?: string
  agencyCode?: string
  synopsis?: string
  description?: string
  closeDate?: string
  closeDateTimeStamp?: string
  awardCeiling?: number | string
  awardFloor?: number | string
  estimatedTotalProgramFunding?: number | string
  opportunityCategory?: string
  categoryOfFundingActivity?: string
  fundingInstrumentType?: string
  fundingActivityCategory?: string
  eligibleApplicants?: string[] | string
  applicantEligibility?: string
  additionalInfo?: string
  additionalInformation?: string
  additionalInformationOnEligibility?: string
  cfda?: string
  cfdaNumbers?: string
  cfdaNumber?: string
  opportunityStatus?: string
}

export interface GrantsSearchResponse {
  totalRecords: number
  opportunities: GrantOpportunity[]
}

const GRANTS_GOV_API_BASE = 'https://api.grants.gov/v2/opportunities/search'

export async function searchGrantOpportunities(
  keywords: string,
  limit: number = 20
): Promise<GrantsSearchResponse> {
  const requestBody = {
    keyword: keywords,
    oppStatuses: ['forecasted', 'posted'],
    sortBy: 'openDate',
    sortOrder: 'desc',
    from: 0,
    size: limit
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(GRANTS_GOV_API_BASE, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    }).catch(err => {
      console.error('Grants.gov fetch failed:', err.message)
      return null
    }).finally(() => clearTimeout(timeoutId))

    if (!response || !response.ok) {
      throw new Error(`Grants.gov API error: ${response?.status || 'network error'} ${response?.statusText || ''}`)
    }

    const data = await response.json().catch(err => {
      console.error('Grants.gov JSON parse error:', err)
      return { opportunities: [], totalRecords: 0 }
    })
    
    const opportunities: GrantOpportunity[] = (data.opportunities || []).map((opp: GrantsGovRawOpportunity) => {
      const oppNumber = opp.opportunityNumber || opp.opportunityID || `UNK-${Math.random().toString(36).substr(2, 9)}`
      
      return {
        id: opp.opportunityID || oppNumber,
        opportunityNumber: oppNumber,
        opportunityTitle: opp.opportunityTitle || 'Untitled Grant Opportunity',
        agencyName: opp.agencyName || opp.agencyCode || 'Federal Agency',
        description: opp.description || opp.synopsis || opp.opportunityTitle || '',
        closeDate: opp.closeDate || opp.closeDateTimeStamp || '',
        awardCeiling: opp.awardCeiling ? (typeof opp.awardCeiling === 'number' ? opp.awardCeiling : parseFloat(opp.awardCeiling)) : undefined,
        awardFloor: opp.awardFloor ? (typeof opp.awardFloor === 'number' ? opp.awardFloor : parseFloat(opp.awardFloor)) : undefined,
        estimatedTotalProgramFunding: opp.estimatedTotalProgramFunding ? (typeof opp.estimatedTotalProgramFunding === 'number' ? opp.estimatedTotalProgramFunding : parseFloat(opp.estimatedTotalProgramFunding)) : undefined,
        opportunityCategory: opp.opportunityCategory || opp.categoryOfFundingActivity || 'Discretionary',
        fundingInstrumentType: opp.fundingInstrumentType || opp.fundingActivityCategory || 'Grant',
        eligibleApplicants: Array.isArray(opp.eligibleApplicants) 
          ? opp.eligibleApplicants 
          : typeof opp.eligibleApplicants === 'string'
          ? [opp.eligibleApplicants]
          : opp.applicantEligibility
          ? [opp.applicantEligibility]
          : ['See opportunity details'],
        additionalInfo: opp.additionalInformationOnEligibility || opp.additionalInformation || opp.additionalInfo,
        cfda: opp.cfdaNumbers || opp.cfdaNumber || opp.cfda,
        opportunityStatus: opp.opportunityStatus || 'posted',
        url: `https://www.grants.gov/search-results-detail/${oppNumber}`
      }
    })

    return {
      totalRecords: data.totalRecords || data.total || opportunities.length,
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
