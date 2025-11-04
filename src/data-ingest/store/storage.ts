import type { IngestedProject, GrantOpportunity, IngestionJob } from '../schema'

declare const spark: {
  kv: {
    get: <T>(key: string) => Promise<T | undefined>
    set: <T>(key: string, value: T) => Promise<void>
  }
}

const STORAGE_KEYS = {
  PROJECTS: 'discovered-projects',
  GRANTS: 'discovered-grants',
  JOBS: 'ingestion-jobs',
  LAST_RUN: 'last-ingestion-run'
}

export async function storeDiscoveredProjects(projects: IngestedProject[]): Promise<void> {
  const existing = await getDiscoveredProjects()
  const merged = mergeProjects(existing, projects)
  await spark.kv.set(STORAGE_KEYS.PROJECTS, merged)
}

export async function getDiscoveredProjects(): Promise<IngestedProject[]> {
  const projects = await spark.kv.get<IngestedProject[]>(STORAGE_KEYS.PROJECTS)
  return projects || []
}

export async function storeDiscoveredGrants(grants: GrantOpportunity[]): Promise<void> {
  const existing = await getDiscoveredGrants()
  const merged = mergeGrants(existing, grants)
  await spark.kv.set(STORAGE_KEYS.GRANTS, merged)
}

export async function getDiscoveredGrants(): Promise<GrantOpportunity[]> {
  const grants = await spark.kv.get<GrantOpportunity[]>(STORAGE_KEYS.GRANTS)
  return grants || []
}

export async function recordIngestionJob(job: IngestionJob): Promise<void> {
  const jobs = await getIngestionJobs()
  const updated = [job, ...jobs.slice(0, 49)]
  await spark.kv.set(STORAGE_KEYS.JOBS, updated)
}

export async function getIngestionJobs(): Promise<IngestionJob[]> {
  const jobs = await spark.kv.get<IngestionJob[]>(STORAGE_KEYS.JOBS)
  return jobs || []
}

export async function updateLastRun(): Promise<void> {
  await spark.kv.set(STORAGE_KEYS.LAST_RUN, new Date().toISOString())
}

export async function getLastRun(): Promise<string | undefined> {
  return await spark.kv.get<string>(STORAGE_KEYS.LAST_RUN)
}

function mergeProjects(existing: IngestedProject[], incoming: IngestedProject[]): IngestedProject[] {
  const map = new Map<string, IngestedProject>()
  
  existing.forEach(p => map.set(p.id, p))
  
  incoming.forEach(p => {
    const current = map.get(p.id)
    if (!current || new Date(p.capture_date) > new Date(current.capture_date)) {
      map.set(p.id, p)
    }
  })
  
  return Array.from(map.values())
    .sort((a, b) => new Date(b.capture_date).getTime() - new Date(a.capture_date).getTime())
    .slice(0, 200)
}

function mergeGrants(existing: GrantOpportunity[], incoming: GrantOpportunity[]): GrantOpportunity[] {
  const map = new Map<string, GrantOpportunity>()
  
  existing.forEach(g => map.set(g.id, g))
  
  incoming.forEach(g => {
    const current = map.get(g.id)
    if (!current || new Date(g.capture_date) > new Date(current.capture_date)) {
      map.set(g.id, g)
    }
  })
  
  return Array.from(map.values())
    .sort((a, b) => new Date(b.posting_date).getTime() - new Date(a.posting_date).getTime())
    .slice(0, 150)
}
