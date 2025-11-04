import { Project, GrantOpportunity, OpenDataset } from "../data/schema"
import { SEED_PROJECTS } from "../data/seed-projects"
import { runUsaspendingIngest } from "./apis/usaspending"
import { runGrantsGovIngest } from "./apis/grantsGov"
import { runNsfAwardsIngest } from "./apis/nsfAwards"
import { runDataGovIngest } from "./apis/dataGov"

export interface IngestResult {
  projects: Project[]
  grants: GrantOpportunity[]
  datasets: OpenDataset[]
  timestamp: string
  sources: {
    usaspending: number
    nsf: number
    grants_gov: number
    data_gov: number
    manual: number
  }
}

export async function runFullIngest(): Promise<IngestResult> {
  console.log("[ingest] Starting full pipeline...")

  const timestamp = new Date().toISOString()

  const [
    usaspendingProjects,
    nsfProjects,
    grants,
    datasets,
  ] = await Promise.all([
    runUsaspendingIngest().catch(err => {
      console.error("[ingest] USAspending failed:", err)
      return []
    }),
    runNsfAwardsIngest().catch(err => {
      console.error("[ingest] NSF failed:", err)
      return []
    }),
    runGrantsGovIngest().catch(err => {
      console.error("[ingest] Grants.gov failed:", err)
      return []
    }),
    runDataGovIngest().catch(err => {
      console.error("[ingest] Data.gov failed:", err)
      return []
    }),
  ])

  const allProjects = [
    ...SEED_PROJECTS,
    ...usaspendingProjects,
    ...nsfProjects,
  ]

  const projectMap = new Map<string, Project>()
  allProjects.forEach(p => projectMap.set(p.id, p))
  const uniqueProjects = Array.from(projectMap.values())

  const grantMap = new Map<string, GrantOpportunity>()
  grants.forEach((g: GrantOpportunity) => grantMap.set(g.id, g))
  const uniqueGrants = Array.from(grantMap.values())

  const datasetMap = new Map<string, OpenDataset>()
  datasets.forEach((d: OpenDataset) => datasetMap.set(d.id, d))
  const uniqueDatasets = Array.from(datasetMap.values())

  console.log(`[ingest] Completed:
  - Projects: ${uniqueProjects.length} (${SEED_PROJECTS.length} manual, ${usaspendingProjects.length} USAspending, ${nsfProjects.length} NSF)
  - Grants: ${uniqueGrants.length}
  - Datasets: ${uniqueDatasets.length}`)

  return {
    projects: uniqueProjects,
    grants: uniqueGrants,
    datasets: uniqueDatasets,
    timestamp,
    sources: {
      usaspending: usaspendingProjects.length,
      nsf: nsfProjects.length,
      grants_gov: uniqueGrants.length,
      data_gov: uniqueDatasets.length,
      manual: SEED_PROJECTS.length,
    },
  }
}
