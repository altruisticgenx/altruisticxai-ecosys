import { GrantOpportunity, Provenance } from "../../data/schema"

const API_BASE = "https://api.grants.gov/v2/opportunities/search"
const MIN_DATE = new Date("2025-01-01T00:00:00Z")

interface GrantsGovOpportunity {
  opportunityID?: string
  opportunityNumber?: string
  opportunityTitle?: string
  description?: string
  synopsis?: string
  agencyName?: string
  agencyCode?: string
  cfdaNumbers?: string
  cfdaNumber?: string
  postedDate?: string
  closeDate?: string
  closeDateTimeStamp?: string
  awardCeiling?: string | number
  awardFloor?: string | number
  estimatedTotalProgramFunding?: string | number
  opportunityCategory?: string
  categoryOfFundingActivity?: string
  fundingInstrumentType?: string
  fundingActivityCategory?: string
  eligibleApplicants?: string[] | string
  applicantEligibility?: string
  opportunityStatus?: string
  additionalInformation?: string
  additionalInformationOnEligibility?: string
}

interface GrantsGovResponse {
  opportunities?: GrantsGovOpportunity[]
  totalRecords?: number
  total?: number
}

const CATEGORIES = [
  "energy artificial intelligence",
  "education technology AI",
  "grid modernization",
  "renewable energy campus",
  "local government energy",
  "university research AI",
]

const TARGET_AGENCIES = [
  "DOE",
  "NSF", 
  "ED",
  "ARPA-E",
  "EDA",
  "EERE",
  "NETL",
]

export async function runGrantsGovIngest(): Promise<GrantOpportunity[]> {
  console.log("[grants.gov] Starting ingest with real API v2...")

  const allGrants: GrantOpportunity[] = []
  const capturedAt = new Date().toISOString()
  const seenIds = new Set<string>()

  for (const category of CATEGORIES) {
    try {
      const requestBody = {
        keyword: category,
        oppStatuses: ['forecasted', 'posted'],
        postedDateFrom: "2025-01-01",
        sortBy: 'openDate',
        sortOrder: 'desc',
        from: 0,
        size: 20
      }

      console.log(`[grants.gov] Fetching category: "${category}"`)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000)

      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      }).catch(err => {
        console.warn(`[grants.gov] Fetch failed for category "${category}":`, err.message)
        return null
      }).finally(() => clearTimeout(timeoutId))

      if (!res || !res.ok) {
        console.warn(`[grants.gov] API error for category "${category}": ${res?.status || 'network error'} ${res?.statusText || ''}`)
        continue
      }

      const json: GrantsGovResponse = await res.json().catch(err => {
        console.warn(`[grants.gov] JSON parse error for category "${category}":`, err)
        return { opportunities: [] }
      })
      
      const opportunities: GrantsGovOpportunity[] = json.opportunities ?? []

      console.log(`[grants.gov] Found ${opportunities.length} results for "${category}"`)

      for (const opp of opportunities) {
        const oppId = opp.opportunityID || opp.opportunityNumber || `unknown-${Math.random().toString(36).substr(2, 9)}`
        
        if (seenIds.has(oppId)) {
          continue
        }

        const postedDate = opp.postedDate || null
        const closeDate = opp.closeDate || opp.closeDateTimeStamp || null

        if (postedDate) {
          const d = new Date(postedDate)
          if (d < MIN_DATE) {
            continue
          }
        } else if (closeDate) {
          const d = new Date(closeDate)
          if (d < MIN_DATE) {
            continue
          }
        }

        seenIds.add(oppId)

        const provenance: Provenance = {
          source: "grants_gov",
          externalId: oppId,
          sourceUrl: `https://www.grants.gov/search-results-detail/${opp.opportunityNumber || oppId}`,
          capturedAt,
        }

        const agency = opp.agencyName || opp.agencyCode || "Federal Agency"
        const isPriorityAgency = TARGET_AGENCIES.some(a => 
          agency.toUpperCase().includes(a)
        )

        const cfdaNumber = opp.cfdaNumbers || opp.cfdaNumber

        const topics: string[] = [
          category.split(' ')[0],
          ...(cfdaNumber ? [`CFDA-${cfdaNumber}`] : []),
          ...(isPriorityAgency ? ["priority-agency"] : []),
          opp.opportunityCategory || opp.categoryOfFundingActivity || '',
        ].filter(Boolean)

        const parseAmount = (val?: string | number): number | undefined => {
          if (typeof val === 'number') return val
          if (typeof val === 'string') {
            const parsed = parseFloat(val.replace(/[^0-9.-]/g, ''))
            return isNaN(parsed) ? undefined : parsed
          }
          return undefined
        }

        const grant: GrantOpportunity = {
          id: `grants-gov-${oppId}`,
          title: opp.opportunityTitle || "Federal Grant Opportunity",
          description: opp.description || opp.synopsis || opp.opportunityTitle || "No description available.",
          agency,
          cfdaNumber,
          opportunityNumber: opp.opportunityNumber,
          postedDate: postedDate ?? undefined,
          closeDate: closeDate ?? undefined,
          totalFundingEstimate: parseAmount(opp.estimatedTotalProgramFunding) || parseAmount(opp.awardCeiling),
          eligibility: Array.isArray(opp.eligibleApplicants)
            ? opp.eligibleApplicants.join(", ")
            : typeof opp.eligibleApplicants === 'string'
            ? opp.eligibleApplicants
            : opp.applicantEligibility || undefined,
          topics,
          location: {
            country: "US",
          },
          provenance,
        }

        allGrants.push(grant)
      }

      await new Promise(resolve => setTimeout(resolve, 1200))

    } catch (error) {
      console.error(`[grants.gov] Error processing category "${category}":`, error)
    }
  }

  console.log(`[grants.gov] Completed. Total unique grants: ${allGrants.length}`)
  return allGrants
}
