import { OpenDataset, Provenance } from "../../data/schema"

const API_BASE = "https://catalog.data.gov/api/3/action"

interface CKANDataset {
  id?: string
  name?: string
  title?: string
  notes?: string
  organization?: {
    name?: string
    title?: string
  }
  tags?: Array<{ name?: string }>
  resources?: Array<{
    format?: string
    url?: string
  }>
  metadata_modified?: string
}

const SEARCH_QUERIES = [
  "energy consumption",
  "artificial intelligence",
  "campus sustainability",
  "renewable energy",
  "grid data",
]

export async function runDataGovIngest(): Promise<OpenDataset[]> {
  console.log("[data.gov] Starting ingest...")

  const allDatasets: OpenDataset[] = []
  const capturedAt = new Date().toISOString()

  for (const query of SEARCH_QUERIES.slice(0, 2)) {
    try {
      const params = new URLSearchParams({
        q: query,
        rows: "20",
        sort: "metadata_modified desc",
      })

      const res = await fetch(`${API_BASE}/package_search?${params}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      })

      if (!res.ok) {
        console.warn(`[data.gov] API error for query "${query}": ${res.status}`)
        continue
      }

      const json = await res.json()
      
      if (!json.success) {
        console.warn(`[data.gov] API returned success=false for query "${query}"`)
        continue
      }

      const datasets: CKANDataset[] = json.result?.results ?? []

      console.log(`[data.gov] Found ${datasets.length} results for "${query}"`)

      for (const ds of datasets) {
        const datasetId = ds.id || ds.name || `unknown-${Math.random()}`

        const provenance: Provenance = {
          source: "data_gov",
          externalId: datasetId,
          sourceUrl: `https://catalog.data.gov/dataset/${ds.name || datasetId}`,
          capturedAt,
        }

        const formats = Array.from(
          new Set(
            (ds.resources ?? [])
              .map(r => r.format?.toUpperCase())
              .filter(Boolean)
          )
        ) as string[]

        const downloadUrl = ds.resources?.[0]?.url

        const tags = (ds.tags ?? [])
          .map(t => t.name)
          .filter(Boolean) as string[]

        const hasApiFormat = formats.some(f => 
          f === "API" || f === "JSON" || f === "XML"
        )
        const hasDataFormat = formats.some(f => 
          f === "CSV" || f === "XLSX" || f === "XLS"
        )

        const relevanceScore = 
          (hasApiFormat ? 30 : 0) +
          (hasDataFormat ? 20 : 0) +
          (tags.length > 3 ? 20 : 10) +
          (ds.notes && ds.notes.length > 100 ? 15 : 5) +
          15

        const dataset: OpenDataset = {
          id: `data-gov-${datasetId}`,
          title: ds.title || "Federal Open Dataset",
          description: ds.notes || "No description available.",
          publisher: ds.organization?.title || ds.organization?.name || "Federal Agency",
          category: query,
          format: formats.length > 0 ? formats : undefined,
          landingPage: `https://catalog.data.gov/dataset/${ds.name || datasetId}`,
          downloadUrl: downloadUrl,
          lastModified: ds.metadata_modified,
          tags: [
            ...tags.slice(0, 10),
            query.replace(/\s/g, "-"),
          ],
          relevanceScore,
          provenance,
        }

        allDatasets.push(dataset)
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

    } catch (error) {
      console.error(`[data.gov] Error processing query "${query}":`, error)
    }
  }

  console.log(`[data.gov] Completed. Total datasets: ${allDatasets.length}`)
  return allDatasets
}
