import { GrantOpportunity, Provenance } from "../../data/schema"

const API_BASE = "https://apply07.grants.gov/grantsws/rest/opportunities/search"

interface GrantsGovOpportunity {
  id?: string
  number?: string
  title?: string
  description?: string
  agencyName?: string
  agencyCode?: string
  cfda?: {
    number?: string
  }
  closeDate?: string
  awardCeiling?: number
  estimatedTotalProgramFunding?: number
  eligibility?: {
    code?: string
    description?: string
  }[]
}

const CATEGORIES = [
  "energy",
  "artificial intelligence",
  "education technology",
  "grid modernization",
  "renewable energy",
]

const TARGET_AGENCIES = [
  "DOE",
  "NSF", 
  "ED",
  "ARPA-E",
  "EDA",
]

export async function runGrantsGovIngest(): Promise<GrantOpportunity[]> {
  console.log("[grants.gov] Starting ingest...")

  const allGrants: GrantOpportunity[] = []
  const capturedAt = new Date().toISOString()

  for (const category of CATEGORIES.slice(0, 2)) {
    try {
      const params = new URLSearchParams({
        keyword: category,
        oppStatuses: "forecasted|posted",
        sortBy: "openDate|desc",
        rows: "25",
      })

      const res = await fetch(`${API_BASE}?${params}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      })

      if (!res.ok) {
        console.warn(`[grants.gov] API error for category "${category}": ${res.status}`)
        continue
      }

      const json = await res.json()
      const opportunities: GrantsGovOpportunity[] = json.opportunitiesList ?? []

      console.log(`[grants.gov] Found ${opportunities.length} results for "${category}"`)

      for (const opp of opportunities) {
        const oppId = opp.id || opp.number || `unknown-${Math.random()}`

        const provenance: Provenance = {
          source: "grants_gov",
          externalId: oppId,
          sourceUrl: `https://www.grants.gov/search-results-detail/${oppId}`,
          capturedAt,
        }

        const agency = opp.agencyName || "Federal Agency"
        const isPriorityAgency = TARGET_AGENCIES.some(a => 
          agency.toUpperCase().includes(a)
        )

        const topics: string[] = [
          category,
          ...(opp.cfda?.number ? [`CFDA-${opp.cfda.number}`] : []),
          ...(isPriorityAgency ? ["priority-agency"] : []),
        ]

        const grant: GrantOpportunity = {
          id: `grants-gov-${oppId}`,
          title: opp.title || "Federal Grant Opportunity",
          description: opp.description || "No description available.",
          agency,
          cfdaNumber: opp.cfda?.number,
          opportunityNumber: opp.number,
          closeDate: opp.closeDate,
          totalFundingEstimate: opp.estimatedTotalProgramFunding || opp.awardCeiling,
          eligibility: opp.eligibility?.map(e => e.description || e.code).join(", "),
          topics,
          location: {
            country: "US",
          },
          provenance,
        }

        allGrants.push(grant)
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

    } catch (error) {
      console.error(`[grants.gov] Error processing category "${category}":`, error)
    }
  }

  console.log(`[grants.gov] Completed. Total grants: ${allGrants.length}`)
  return allGrants
}
