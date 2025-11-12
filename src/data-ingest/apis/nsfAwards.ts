import { Project, Provenance } from "../../data/schema"

const API_BASE = "https://api.nsf.gov/services/v1/awards.json"
const MIN_DATE = new Date("2025-01-01T00:00:00Z")

interface NSFAward {
  id?: string
  title?: string
  abstractText?: string
  agency?: string
  awardee?: string
  awardeeCity?: string
  awardeeStateCode?: string
  fundsObligatedAmt?: string
  date?: string
  startDate?: string
  expDate?: string
  piFirstName?: string
  piLastName?: string
  primaryProgram?: string
}

const SEARCH_TERMS = [
  "energy efficiency",
  "artificial intelligence",
  "machine learning",
  "campus sustainability",
  "grid optimization",
]

export async function runNsfAwardsIngest(): Promise<Project[]> {
  console.log("[nsf] Starting ingest...")

  const allProjects: Project[] = []
  const capturedAt = new Date().toISOString()

  for (const term of SEARCH_TERMS.slice(0, 2)) {
    try {
      const params = new URLSearchParams({
        keyword: term,
        dateStart: "01/01/2025",
        printFields: "id,title,abstractText,agency,awardee,awardeeCity,awardeeStateCode,fundsObligatedAmt,date,startDate,expDate,piFirstName,piLastName,primaryProgram",
        offset: "1",
        limit: "25",
      })

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const res = await fetch(`${API_BASE}?${params}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        signal: controller.signal
      }).catch(err => {
        console.warn(`[nsf] Fetch failed for term "${term}":`, err.message)
        return null
      }).finally(() => clearTimeout(timeoutId))

      if (!res || !res.ok) {
        console.warn(`[nsf] API error for term "${term}": ${res?.status || 'network error'}`)
        continue
      }

      const json = await res.json().catch(err => {
        console.warn(`[nsf] JSON parse error for term "${term}":`, err)
        return { response: { award: [] } }
      })
      
      const awards: NSFAward[] = json.response?.award ?? []

      console.log(`[nsf] Found ${awards.length} results for "${term}"`)

      for (const award of awards) {
        const awardId = award.id || `unknown-${Math.random()}`

        const effectiveDate = award.startDate || award.date || null

        if (effectiveDate) {
          const d = new Date(effectiveDate)
          if (d < MIN_DATE) {
            continue
          }
        }

        const provenance: Provenance = {
          source: "nsf_awards",
          externalId: awardId,
          sourceUrl: `https://www.nsf.gov/awardsearch/showAward?AWD_ID=${awardId}`,
          capturedAt,
        }

        const isUniversity = 
          award.awardee?.toLowerCase().includes("university") ||
          award.awardee?.toLowerCase().includes("college")

        const state = award.awardeeStateCode

        const TARGET_STATES = ["ME", "MA", "NH", "VT", "RI", "CT", "PA"]
        const priorityScore = TARGET_STATES.includes(state || "") ? 90 : 70

        const fundingAmount = award.fundsObligatedAmt 
          ? parseFloat(award.fundsObligatedAmt.replace(/[^0-9.]/g, ""))
          : undefined

        const pi = award.piFirstName && award.piLastName
          ? `${award.piFirstName} ${award.piLastName}`
          : undefined

        const project: Project = {
          id: `nsf-${awardId}`,
          title: award.title || "NSF Research Award",
          description: award.abstractText || "No abstract available.",
          sector: "Research & Development",
          origin: "external",
          status: "active",
          clientName: award.awardee,
          institutionName: isUniversity ? award.awardee : undefined,
          location: {
            country: "US",
            state: state || undefined,
            city: award.awardeeCity || undefined,
          },
          effectiveDate: effectiveDate ?? undefined,
          short_kpi_summary: fundingAmount 
            ? `NSF Award: $${Math.round(fundingAmount).toLocaleString()}${pi ? ` (PI: ${pi})` : ""}`
            : undefined,
          tags: [
            "nsf",
            "research",
            term.replace(/\s/g, "-"),
            ...(award.primaryProgram ? [award.primaryProgram.replace(/\s/g, "-").toLowerCase()] : []),
            ...(isUniversity ? ["university"] : []),
            ...(TARGET_STATES.includes(state || "") ? ["priority-region"] : []),
          ],
          priorityScore,
          provenance,
        }

        allProjects.push(project)
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

    } catch (error) {
      console.error(`[nsf] Error processing term "${term}":`, error)
    }
  }

  console.log(`[nsf] Completed. Total projects: ${allProjects.length}`)
  return allProjects
}
