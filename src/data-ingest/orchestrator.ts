import { fetchGrantsGovOpportunities } from './apis/grants-gov'
import { fetchDataGovDatasets } from './apis/data-gov'
import { normalizeProject, normalizeGrant, enrichWithAI } from './transform/normalize'
import { 
  storeDiscoveredProjects, 
  storeDiscoveredGrants, 
  recordIngestionJob,
  updateLastRun
} from './store/storage'
import type { DiscoveryFilters, IngestionJob, IngestedProject, GrantOpportunity } from './schema'

export async function runDiscovery(filters?: Partial<DiscoveryFilters>): Promise<IngestionJob> {
  const jobId = `job-${Date.now()}`
  const defaultFilters: DiscoveryFilters = {
    keywords: ['AI', 'energy', 'campus', 'renewable', 'pilot', 'education', 'local-first'],
    sectors: ['energy', 'education', 'research'],
    locations: ['Maine', 'New England', 'Massachusetts', 'Vermont'],
    relevance_threshold: 0.4,
    ...filters
  }

  const job: IngestionJob = {
    job_id: jobId,
    source: 'grants.gov',
    status: 'running',
    started_at: new Date().toISOString(),
    records_found: 0,
    records_imported: 0,
    errors: []
  }

  try {
    await recordIngestionJob(job)

    const [grants, datasets] = await Promise.all([
      fetchGrantsGovOpportunities(defaultFilters),
      fetchDataGovDatasets(defaultFilters)
    ])

    const normalizedGrants = grants.map(normalizeGrant)
    const normalizedProjects = datasets.map(normalizeProject)

    await Promise.all([
      storeDiscoveredGrants(normalizedGrants),
      storeDiscoveredProjects(normalizedProjects)
    ])

    await updateLastRun()

    const completedJob: IngestionJob = {
      ...job,
      status: 'completed',
      completed_at: new Date().toISOString(),
      records_found: grants.length + datasets.length,
      records_imported: normalizedGrants.length + normalizedProjects.length
    }

    await recordIngestionJob(completedJob)
    return completedJob

  } catch (error) {
    const failedJob: IngestionJob = {
      ...job,
      status: 'failed',
      completed_at: new Date().toISOString(),
      errors: [error instanceof Error ? error.message : 'Unknown error']
    }

    await recordIngestionJob(failedJob)
    throw error
  }
}

export async function runEnrichedDiscovery(
  filters?: Partial<DiscoveryFilters>,
  useAI: boolean = true
): Promise<IngestionJob> {
  const job = await runDiscovery(filters)
  
  if (useAI && job.status === 'completed') {
    const { getDiscoveredProjects, getDiscoveredGrants } = await import('./store/storage')
    
    const [projects, grants] = await Promise.all([
      getDiscoveredProjects(),
      getDiscoveredGrants()
    ])

    const enrichedProjects = await Promise.all(
      projects.slice(0, 20).map(p => enrichWithAI(p))
    )
    
    const enrichedGrants = await Promise.all(
      grants.slice(0, 20).map(g => enrichWithAI(g))
    )

    await Promise.all([
      storeDiscoveredProjects(enrichedProjects.filter((p): p is IngestedProject => 'sector' in p && 'status' in p)),
      storeDiscoveredGrants(enrichedGrants.filter((g): g is GrantOpportunity => 'opportunity_number' in g))
    ])
  }

  return job
}
