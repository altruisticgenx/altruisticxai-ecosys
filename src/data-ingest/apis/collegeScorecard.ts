import { Project, Provenance } from "../../data/schema"

const API_BASE = "https://api.data.gov/ed/collegescorecard/v1"

interface CollegeData {
  id?: number
  "school.name"?: string
  "school.city"?: string
  "school.state"?: string
  "school.zip"?: string
  "latest.student.size"?: number
  "latest.student.demographics.race_ethnicity.white"?: number
  "latest.student.demographics.first_generation"?: number
  "latest.aid.pell_grant_rate"?: number
  "latest.completion.completion_rate_4yr_100nt"?: number
  "latest.cost.avg_net_price.overall"?: number
  "latest.earnings.10_yrs_after_entry.median"?: number
}

const PRIORITY_STATES = ["ME", "MA", "NH", "VT", "RI", "CT", "PA"]

export async function runCollegeScorecardIngest(): Promise<Project[]> {
  console.log("[college-scorecard] Starting ingest...")
  
  const allProjects: Project[] = []
  const capturedAt = new Date().toISOString()

  for (const state of PRIORITY_STATES.slice(0, 2)) {
    try {
      const params = new URLSearchParams({
        api_key: "DEMO_KEY",
        "school.state": state,
        "school.degrees_awarded.predominant": "3",
        "latest.student.size__range": "1000..",
        fields: [
          "id",
          "school.name",
          "school.city",
          "school.state",
          "latest.student.size",
          "latest.student.demographics.first_generation",
          "latest.aid.pell_grant_rate",
          "latest.completion.completion_rate_4yr_100nt",
          "latest.cost.avg_net_price.overall"
        ].join(","),
        per_page: "10",
        page: "0"
      })

      const res = await fetch(`${API_BASE}/schools.json?${params}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
      })

      if (!res.ok) {
        console.warn(`[college-scorecard] API error for ${state}: ${res.status}`)
        continue
      }

      const json = await res.json()
      const schools: CollegeData[] = json.results ?? []

      console.log(`[college-scorecard] Found ${schools.length} schools in ${state}`)

      for (const school of schools.slice(0, 5)) {
        const schoolName = school["school.name"] || "Unknown Institution"
        const schoolId = school.id || Math.random().toString()
        const size = school["latest.student.size"] || 0
        const pellRate = school["latest.aid.pell_grant_rate"] || 0
        const firstGen = school["latest.student.demographics.first_generation"] || 0
        const netPrice = school["latest.cost.avg_net_price.overall"] || 0

        const equityScore = pellRate > 0.4 || firstGen > 0.3 ? "High" : pellRate > 0.25 ? "Medium" : "Low"
        const isEquityFocused = equityScore === "High"

        const provenance: Provenance = {
          source: "college_scorecard",
          externalId: schoolId.toString(),
          sourceUrl: `https://collegescorecard.ed.gov/school/?${schoolId}`,
          capturedAt,
        }

        const project: Project = {
          id: `college-${state}-${schoolId}`,
          title: `${schoolName} - Campus Energy Equity Opportunity`,
          description: `${schoolName} (${school["school.city"]}, ${state}) serves ${size.toLocaleString()} students with ${(pellRate * 100).toFixed(0)}% Pell Grant recipients and ${(firstGen * 100).toFixed(0)}% first-generation students. Equity alignment: ${equityScore}. Prime candidate for equity-focused AI energy pilots and campus sustainability programs with strong community impact narratives.`,
          sector: "Education",
          origin: "external",
          status: "active",
          institutionName: schoolName,
          location: {
            country: "US",
            state: state,
            city: school["school.city"] || undefined,
          },
          short_kpi_summary: `${size.toLocaleString()} students, ${(pellRate * 100).toFixed(0)}% Pell, Equity: ${equityScore}`,
          tags: [
            "college-scorecard",
            "university",
            "campus-energy",
            state.toLowerCase(),
            "priority-region",
            `equity-${equityScore.toLowerCase()}`,
            ...(isEquityFocused ? ["high-pell", "equity-priority"] : []),
            ...(size > 5000 ? ["large-campus"] : size > 2000 ? ["medium-campus"] : ["small-campus"])
          ],
          priorityScore: isEquityFocused ? 90 : 70,
          provenance,
        }

        allProjects.push(project)
      }

      await new Promise(resolve => setTimeout(resolve, 500))

    } catch (error) {
      console.error(`[college-scorecard] Error processing state ${state}:`, error)
    }
  }

  console.log(`[college-scorecard] Completed. Total projects: ${allProjects.length}`)
  return allProjects
}
