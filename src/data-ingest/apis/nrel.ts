import { Project, Provenance } from "../../data/schema"

const API_BASE = "https://developer.nrel.gov/api"

interface NRELUtilityRate {
  utility?: string
  name?: string
  state?: string
  residential?: number
  commercial?: number
  industrial?: number
}

const PRIORITY_STATES = ["ME", "MA", "NH", "VT", "RI", "CT", "PA"]

export async function runNrelIngest(): Promise<Project[]> {
  console.log("[nrel] Starting ingest...")
  
  const allProjects: Project[] = []
  const capturedAt = new Date().toISOString()

  for (const state of PRIORITY_STATES.slice(0, 2)) {
    try {
      const params = new URLSearchParams({
        api_key: "DEMO_KEY",
        address: state,
        limit: "5"
      })

      const res = await fetch(`${API_BASE}/utility_rates/v3.json?${params}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
      })

      if (!res.ok) {
        console.warn(`[nrel] API error for ${state}: ${res.status}`)
        continue
      }

      const json = await res.json()
      const outputs = json.outputs

      if (!outputs) {
        console.log(`[nrel] No utility data for ${state}`)
        continue
      }

      const residential = outputs.residential || 0
      const commercial = outputs.commercial || 0

      const savingsPotential = commercial > 0.12 ? "High" : commercial > 0.10 ? "Medium" : "Low"

      const provenance: Provenance = {
        source: "nrel_reopt",
        externalId: `utility-rates-${state}`,
        sourceUrl: `https://developer.nrel.gov/docs/electricity/utility-rates-v3/`,
        capturedAt,
      }

      const project: Project = {
        id: `nrel-utility-${state}`,
        title: `${state} Utility Rate Analysis for Campus Energy`,
        description: `NREL utility rate data for ${state}. Commercial rate: $${commercial.toFixed(3)}/kWh, Residential: $${residential.toFixed(3)}/kWh. Savings potential rated as ${savingsPotential} for solar/efficiency projects. This data supports ROI calculations and renewable energy feasibility studies for campus deployments.`,
        sector: "Energy & Infrastructure",
        origin: "external",
        status: "active",
        location: {
          country: "US",
          state: state,
        },
        short_kpi_summary: `Utility rates: $${commercial.toFixed(3)}/kWh commercial, ${savingsPotential} savings potential`,
        tags: [
          "nrel",
          "utility-rates",
          "solar-feasibility",
          state.toLowerCase(),
          "roi-modeling",
          "campus-energy",
          "priority-region",
          `savings-${savingsPotential.toLowerCase()}`
        ],
        priorityScore: savingsPotential === "High" ? 85 : savingsPotential === "Medium" ? 75 : 65,
        provenance,
      }

      allProjects.push(project)
      await new Promise(resolve => setTimeout(resolve, 500))

    } catch (error) {
      console.error(`[nrel] Error processing state ${state}:`, error)
    }
  }

  console.log("[nrel] Attempting to fetch solar resource data...")

  const CAMPUS_LOCATIONS = [
    { name: "University of Maine", lat: 44.9006, lon: -68.6678, state: "ME" },
    { name: "UMass Amherst", lat: 42.3868, lon: -72.5301, state: "MA" },
  ]

  for (const location of CAMPUS_LOCATIONS.slice(0, 1)) {
    try {
      const params = new URLSearchParams({
        api_key: "DEMO_KEY",
        lat: location.lat.toString(),
        lon: location.lon.toString(),
      })

      const res = await fetch(`${API_BASE}/solar/solar_resource/v1.json?${params}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
      })

      if (!res.ok) {
        console.warn(`[nrel] Solar resource API error for ${location.name}: ${res.status}`)
        continue
      }

      const json = await res.json()
      const outputs = json.outputs

      if (!outputs || !outputs.avg_dni) {
        console.log(`[nrel] No solar resource data for ${location.name}`)
        continue
      }

      const avgDni = outputs.avg_dni.annual || 0
      const avgGhi = outputs.avg_ghi?.annual || 0
      
      const solarPotential = avgGhi > 4.5 ? "Excellent" : avgGhi > 4.0 ? "Good" : "Moderate"

      const provenance: Provenance = {
        source: "nrel_reopt",
        externalId: `solar-resource-${location.state}-${location.name.replace(/\s/g, '-')}`,
        sourceUrl: `https://developer.nrel.gov/docs/solar/solar-resource-v1/`,
        capturedAt,
      }

      const project: Project = {
        id: `nrel-solar-${location.state}-${location.name.replace(/\s/g, '-').toLowerCase()}`,
        title: `${location.name} Solar Resource Assessment`,
        description: `NREL solar resource data for ${location.name} campus. Annual average GHI: ${avgGhi.toFixed(2)} kWh/m²/day, DNI: ${avgDni.toFixed(2)} kWh/m²/day. Solar potential rated as ${solarPotential}. Ideal for rooftop PV installations and campus microgrid planning.`,
        sector: "Energy & Infrastructure",
        origin: "external",
        status: "active",
        institutionName: location.name,
        location: {
          country: "US",
          state: location.state,
          latitude: location.lat,
          longitude: location.lon,
        },
        short_kpi_summary: `Solar potential: ${avgGhi.toFixed(2)} kWh/m²/day (${solarPotential})`,
        tags: [
          "nrel",
          "solar-resource",
          "campus-solar",
          location.state.toLowerCase(),
          "renewable-energy",
          "university",
          "priority-region",
          `potential-${solarPotential.toLowerCase()}`
        ],
        priorityScore: solarPotential === "Excellent" ? 90 : solarPotential === "Good" ? 80 : 70,
        provenance,
      }

      allProjects.push(project)
      await new Promise(resolve => setTimeout(resolve, 500))

    } catch (error) {
      console.error(`[nrel] Error processing solar resource for ${location.name}:`, error)
    }
  }

  console.log(`[nrel] Completed. Total projects: ${allProjects.length}`)
  return allProjects
}
