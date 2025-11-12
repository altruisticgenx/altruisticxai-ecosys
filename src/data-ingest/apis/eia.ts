import { Project, Provenance } from "../../data/schema"

const API_BASE = "https://api.eia.gov/v2"

interface EIADataPoint {
  period: string
  value: number
}

const PRIORITY_STATES = ["ME", "MA", "NH", "VT", "RI", "CT", "PA"]

const STATE_CODES: Record<string, string> = {
  ME: "Maine",
  MA: "Massachusetts",
  NH: "New Hampshire",
  VT: "Vermont",
  RI: "Rhode Island",
  CT: "Connecticut",
  PA: "Pennsylvania"
}

export async function runEiaIngest(): Promise<Project[]> {
  console.log("[eia] Starting ingest...")
  
  const allProjects: Project[] = []
  const capturedAt = new Date().toISOString()
  
  for (const stateCode of PRIORITY_STATES.slice(0, 3)) {
    try {
      const stateName = STATE_CODES[stateCode]
      
      const params = new URLSearchParams({
        api_key: "DEMO_KEY",
        frequency: "annual",
        data: JSON.stringify(["value"]),
        facets: JSON.stringify({ stateid: [stateCode] }),
        start: "2020",
        end: "2023",
        sort: JSON.stringify([{ column: "period", direction: "desc" }]),
        length: "10"
      })

      const endpoints = [
        { path: "electricity/retail-sales", metric: "Electricity Sales", sector: "Energy & Infrastructure" },
        { path: "electricity/operating-generator-capacity", metric: "Generation Capacity", sector: "Energy & Infrastructure" },
      ]

      for (const endpoint of endpoints.slice(0, 1)) {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const res = await fetch(`${API_BASE}/${endpoint.path}/data/?${params}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
          signal: controller.signal
        }).catch(err => {
          console.warn(`[eia] Fetch failed for ${stateCode} ${endpoint.metric}:`, err.message)
          return null
        }).finally(() => clearTimeout(timeoutId))

        if (!res || !res.ok) {
          console.warn(`[eia] API error for ${stateCode} ${endpoint.metric}: ${res?.status || 'network error'}`)
          continue
        }

        const json = await res.json().catch(err => {
          console.warn(`[eia] JSON parse error for ${stateCode} ${endpoint.metric}:`, err)
          return { response: { data: [] } }
        })
        
        const data = json.response?.data ?? []

        if (data.length === 0) {
          console.log(`[eia] No data for ${stateCode} ${endpoint.metric}`)
          continue
        }

        const recentData = data.slice(0, 3)
        const avgValue = recentData.reduce((sum: number, item: EIADataPoint) => sum + (parseFloat(String(item.value)) || 0), 0) / recentData.length
        const trend = recentData.length >= 2 
          ? ((recentData[0].value - recentData[recentData.length - 1].value) / recentData[recentData.length - 1].value * 100)
          : 0

        const trendText = Math.abs(trend) > 1 
          ? `${trend > 0 ? '+' : ''}${trend.toFixed(1)}% trend`
          : "stable"

        const provenance: Provenance = {
          source: "eia",
          externalId: `${stateCode}-${endpoint.path.replace(/\//g, '-')}`,
          sourceUrl: `https://www.eia.gov/electricity/data/state/`,
          capturedAt,
        }

        const project: Project = {
          id: `eia-${stateCode}-${endpoint.path.replace(/\//g, '-')}`,
          title: `${stateName} ${endpoint.metric} Analysis`,
          description: `Energy Information Administration data for ${stateName} ${endpoint.metric.toLowerCase()}. Recent average: ${avgValue.toLocaleString()} with ${trendText} over recent periods. This baseline data supports ROI modeling and carbon impact calculations for campus energy projects.`,
          sector: endpoint.sector,
          origin: "external",
          status: "active",
          location: {
            country: "US",
            state: stateCode,
          },
          short_kpi_summary: `EIA ${endpoint.metric}: ${avgValue.toLocaleString()} (${trendText})`,
          tags: [
            "eia",
            "energy-data",
            "baseline-metrics",
            stateCode.toLowerCase(),
            endpoint.metric.toLowerCase().replace(/\s/g, '-'),
            "roi-modeling",
            "priority-region"
          ],
          priorityScore: 75,
          provenance,
        }

        allProjects.push(project)
        await new Promise(resolve => setTimeout(resolve, 300))
      }

    } catch (error) {
      console.error(`[eia] Error processing state ${stateCode}:`, error)
    }
  }

  console.log(`[eia] Completed. Total projects: ${allProjects.length}`)
  return allProjects
}
