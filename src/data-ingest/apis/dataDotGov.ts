import { Project, Provenance } from "../../data/schema"

const API_BASE = "https://catalog.data.gov/api/3/action"

interface DataGovDataset {
  id?: string
  name?: string
  title?: string
  notes?: string
  organization?: {
    name?: string
    title?: string
  }
  tags?: Array<{
    name?: string
  }>
  metadata_created?: string
  metadata_modified?: string
  resources?: Array<{
    url?: string
    format?: string
  }>
}

const SEARCH_QUERIES = [
  "campus energy pilot",
  "university renewable energy",
  "campus sustainability AI",
  "building energy demonstration",
  "microgrid campus"
]

const PRIORITY_TAGS = [
  "energy",
  "climate",
  "education",
  "ai",
  "pilot",
  "demonstration",
  "campus",
  "renewable",
  "sustainability"
]

export async function runDataDotGovIngest(): Promise<Project[]> {
  console.log("[data.gov] Starting ingest...")
  
  const allProjects: Project[] = []
  const capturedAt = new Date().toISOString()

  for (const query of SEARCH_QUERIES.slice(0, 2)) {
    try {
      const params = new URLSearchParams({
        q: query,
        rows: "15",
        sort: "metadata_modified desc"
      })

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000)

      const res = await fetch(`${API_BASE}/package_search?${params}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        signal: controller.signal
      }).catch(err => {
        console.warn(`[data.gov] Fetch failed for query "${query}":`, err.message)
        return null
      }).finally(() => clearTimeout(timeoutId))

      if (!res || !res.ok) {
        console.warn(`[data.gov] API error for query "${query}": ${res?.status || 'network error'}`)
        continue
      }

      const json = await res.json().catch(err => {
        console.warn(`[data.gov] JSON parse error for query "${query}":`, err)
        return { success: false, result: { results: [] } }
      })
      
      if (!json.success) {
        console.warn(`[data.gov] API returned success=false for "${query}"`)
        continue
      }

      const datasets: DataGovDataset[] = json.result?.results ?? []

      console.log(`[data.gov] Found ${datasets.length} datasets for "${query}"`)

      for (const dataset of datasets.slice(0, 5)) {
        const datasetId = dataset.id || `unknown-${Math.random()}`
        const title = dataset.title || dataset.name || "Untitled Dataset"
        const description = dataset.notes || "No description available"
        const orgName = dataset.organization?.title || dataset.organization?.name || "Unknown Agency"
        const tags = dataset.tags?.map(t => t.name).filter(Boolean) as string[] || []
        
        const matchedPriorityTags = tags.filter(tag => 
          PRIORITY_TAGS.some(pt => tag && tag.toLowerCase().includes(pt))
        )

        const relevanceScore = matchedPriorityTags.length * 10 + 50
        const isPilotRelated = tags.some(t => 
          t && (t.toLowerCase().includes("pilot") || 
          t.toLowerCase().includes("demonstration"))
        )

        const resourceUrl = dataset.resources?.[0]?.url || `https://catalog.data.gov/dataset/${dataset.name}`

        const provenance: Provenance = {
          source: "data_gov",
          externalId: datasetId,
          sourceUrl: resourceUrl,
          capturedAt,
        }

        const project: Project = {
          id: `datagov-${datasetId}`,
          title: `Data.gov Discovery: ${title.slice(0, 100)}`,
          description: `Federal dataset from ${orgName}. ${description.slice(0, 300)}${description.length > 300 ? '...' : ''} This dataset can fuel Labs discovery and open-source tool development.`,
          sector: tags.some(t => t && t.includes("energy")) ? "Energy & Infrastructure" : 
                 tags.some(t => t && t.includes("education")) ? "Education" : "Research & Development",
          origin: "external",
          status: "active",
          clientName: orgName || "Unknown",
          tags: [
            "data-gov",
            "open-data",
            "dataset",
            ...matchedPriorityTags.slice(0, 5).filter((t): t is string => !!t),
            ...(isPilotRelated ? ["pilot-related"] : []),
            query.replace(/\s/g, '-').toLowerCase()
          ],
          short_kpi_summary: `Dataset from ${orgName} - ${matchedPriorityTags.length} priority tag matches`,
          priorityScore: isPilotRelated ? 85 : relevanceScore > 70 ? 75 : 65,
          provenance,
        }

        allProjects.push(project)
      }

      await new Promise(resolve => setTimeout(resolve, 800))

    } catch (error) {
      console.error(`[data.gov] Error processing query "${query}":`, error)
    }
  }

  console.log(`[data.gov] Completed. Total projects: ${allProjects.length}`)
  return allProjects
}
