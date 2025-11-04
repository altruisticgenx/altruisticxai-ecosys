import { Project, Provenance } from "../../data/schema"

const API_BASE = "https://api.usaspending.gov/api/v2"

interface UsaSpendingAwardRecord {
  Award?: {
    id?: string | number
    fain?: string
    uri?: string
  }
  award_id?: string
  generated_unique_award_id?: string
  Recipient?: {
    recipient_name?: string
  }
  recipient_name?: string | null
  description?: string | null
  Award_Description?: string
  Awarding_Agency?: {
    toptier_name?: string | null
  }
  awarding_agency?: { 
    toptier_name?: string | null 
  } | null
  Place_of_Performance?: {
    state_code?: string | null
    city_name?: string | null
  }
  place_of_performance?: { 
    state_code?: string | null
    city_name?: string | null 
  } | null
  total_obligation?: number | null
  Award_Amount?: number
}

const KEYWORDS = [
  "energy efficiency",
  "microgrid",
  "campus energy",
  "university solar",
  "building optimization",
  "renewable energy campus",
  "grid modernization university",
  "artificial intelligence energy",
  "machine learning utilities",
]

const TARGET_STATES = ["ME", "MA", "NH", "VT", "RI", "CT", "PA"]

export async function runUsaspendingIngest(): Promise<Project[]> {
  console.log("[usaspending] Starting ingest...")

  const allProjects: Project[] = []
  const capturedAt = new Date().toISOString()

  for (const keyword of KEYWORDS.slice(0, 3)) {
    try {
      const body = {
        filters: {
          keywords: [keyword],
          award_type_codes: ["02", "03", "04", "05"],
        },
        fields: [
          "Award",
          "award_id", 
          "generated_unique_award_id",
          "description",
          "Award_Description",
          "Recipient",
          "recipient_name",
          "Awarding_Agency",
          "awarding_agency",
          "Place_of_Performance",
          "place_of_performance",
          "total_obligation",
          "Award_Amount",
        ],
        page: 1,
        limit: 25,
        sort: "Award_Amount",
        order: "desc",
      }

      const res = await fetch(`${API_BASE}/search/spending_by_award/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        console.warn(`[usaspending] API error for keyword "${keyword}": ${res.status}`)
        continue
      }

      const json = await res.json()
      const results: UsaSpendingAwardRecord[] = json.results ?? []

      console.log(`[usaspending] Found ${results.length} results for "${keyword}"`)

      for (const record of results) {
        const awardId = 
          record.Award?.id?.toString() ||
          record.award_id || 
          record.generated_unique_award_id || 
          `unknown-${Math.random()}`

        const recipientName = 
          record.Recipient?.recipient_name || 
          record.recipient_name || 
          "Unknown Recipient"

        const description = 
          record.description || 
          record.Award_Description || 
          "Federal energy-related award"

        const agency = 
          record.Awarding_Agency?.toptier_name ||
          record.awarding_agency?.toptier_name || 
          "Federal Agency"

        const state = 
          record.Place_of_Performance?.state_code ||
          record.place_of_performance?.state_code

        const city = 
          record.Place_of_Performance?.city_name ||
          record.place_of_performance?.city_name

        const amount = 
          record.total_obligation || 
          record.Award_Amount || 
          0

        const priorityScore = TARGET_STATES.includes(state || "") ? 85 : 65

        const provenance: Provenance = {
          source: "usaspending",
          externalId: awardId,
          sourceUrl: `https://www.usaspending.gov/award/${awardId}`,
          capturedAt,
        }

        const isUniversity = 
          recipientName.toLowerCase().includes("university") ||
          recipientName.toLowerCase().includes("college") ||
          description.toLowerCase().includes("campus")

        const project: Project = {
          id: `usaspending-${awardId}`,
          title: description.slice(0, 120) || recipientName,
          description: description || "No description provided.",
          sector: "Energy & Infrastructure",
          origin: "external",
          status: "completed",
          clientName: recipientName,
          institutionName: isUniversity ? recipientName : undefined,
          location: {
            country: "US",
            state: state || undefined,
            city: city || undefined,
          },
          annual_savings_usd: undefined,
          short_kpi_summary: amount 
            ? `Federal award: $${Math.round(amount).toLocaleString()} from ${agency}`
            : undefined,
          tags: [
            "federal-award",
            "usaspending",
            keyword.replace(/\s/g, "-"),
            ...(TARGET_STATES.includes(state || "") ? ["priority-region"] : []),
            ...(isUniversity ? ["university"] : []),
          ],
          priorityScore,
          provenance,
        }

        allProjects.push(project)
      }

      await new Promise(resolve => setTimeout(resolve, 500))

    } catch (error) {
      console.error(`[usaspending] Error processing keyword "${keyword}":`, error)
    }
  }

  console.log(`[usaspending] Completed. Total projects: ${allProjects.length}`)
  return allProjects
}
