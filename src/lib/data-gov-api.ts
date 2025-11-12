export interface DataGovDataset {
  id: string
  name: string
  title: string
  description: string
  organization: string
  organizationTitle: string
  resources: DataGovResource[]
  tags: string[]
  metadataCreated: string
  metadataModified: string
  url: string
  landingPage?: string
}

export interface DataGovResource {
  id: string
  name: string
  description: string
  format: string
  url: string
  created: string
  lastModified?: string
}

interface DataGovRawResource {
  id: string
  name?: string
  description?: string
  format?: string
  url: string
  created?: string
  last_modified?: string
}

interface DataGovRawTag {
  name?: string
  display_name?: string
}

interface DataGovRawDataset {
  id: string
  name: string
  title?: string
  notes?: string
  organization?: {
    name?: string
    title?: string
  }
  resources?: DataGovRawResource[]
  tags?: (DataGovRawTag | string)[]
  metadata_created: string
  metadata_modified: string
  landing_page?: string
}

export interface DataGovSearchResponse {
  count: number
  datasets: DataGovDataset[]
}

const DATA_GOV_API_BASE = 'https://catalog.data.gov/api/3/action'

export async function searchDataGovDatasets(
  query: string,
  limit: number = 20
): Promise<DataGovSearchResponse> {
  const params = new URLSearchParams({
    q: query,
    rows: limit.toString(),
    start: '0'
  })

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(`${DATA_GOV_API_BASE}/package_search?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    }).catch(err => {
      console.error('Data.gov fetch failed:', err.message)
      return null
    }).finally(() => clearTimeout(timeoutId))

    if (!response || !response.ok) {
      throw new Error(`Data.gov API error: ${response?.statusText || 'network error'}`)
    }

    const data = await response.json().catch(err => {
      console.error('Data.gov JSON parse error:', err)
      return { success: false, result: { results: [], count: 0 } }
    })
    
    if (!data.success) {
      throw new Error('Data.gov API request was not successful')
    }

    const datasets: DataGovDataset[] = (data.result?.results || []).map((ds: DataGovRawDataset) => ({
      id: ds.id,
      name: ds.name,
      title: ds.title || ds.name,
      description: ds.notes || '',
      organization: ds.organization?.name || 'Unknown',
      organizationTitle: ds.organization?.title || ds.organization?.name || 'Unknown',
      resources: (ds.resources || []).map((r: DataGovRawResource) => ({
        id: r.id,
        name: r.name || r.description || 'Unnamed Resource',
        description: r.description || '',
        format: r.format || 'Unknown',
        url: r.url,
        created: r.created || '',
        lastModified: r.last_modified
      })),
      tags: (ds.tags || []).map((t: DataGovRawTag | string) => 
        typeof t === 'string' ? t : (t.name || t.display_name || '')
      ),
      metadataCreated: ds.metadata_created,
      metadataModified: ds.metadata_modified,
      url: `https://catalog.data.gov/dataset/${ds.name}`,
      landingPage: ds.landing_page
    }))

    return {
      count: data.result?.count || datasets.length,
      datasets
    }
  } catch (error) {
    console.error('Error fetching Data.gov datasets:', error)
    throw error
  }
}

export async function searchEnergyDatasets(limit: number = 15): Promise<DataGovSearchResponse> {
  return searchDataGovDatasets('energy consumption electricity grid renewable', limit)
}

export async function searchAIResearchDatasets(limit: number = 15): Promise<DataGovSearchResponse> {
  return searchDataGovDatasets('artificial intelligence machine learning AI research', limit)
}

export async function searchEducationDatasets(limit: number = 15): Promise<DataGovSearchResponse> {
  return searchDataGovDatasets('education schools university college student', limit)
}

export async function searchMunicipalDatasets(limit: number = 15): Promise<DataGovSearchResponse> {
  return searchDataGovDatasets('municipal city local government urban planning', limit)
}

export async function searchClimateDatasets(limit: number = 15): Promise<DataGovSearchResponse> {
  return searchDataGovDatasets('climate change emissions greenhouse gas sustainability', limit)
}
