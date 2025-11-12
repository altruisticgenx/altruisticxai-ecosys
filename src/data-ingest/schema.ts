export interface DataSource {
  api_source: 'grants.gov' | 'data.gov' | 'state-portal' | 'scraped' | 'manual'
  capture_date: string
  url: string
}

export interface IngestedProject extends DataSource {
  id: string
  title: string
  description: string
  sector: 'energy' | 'healthcare' | 'education' | 'law' | 'research' | 'multi'
  organization?: string
  location?: {
    state?: string
    city?: string
    region?: string
  }
  funding?: {
    amount_usd?: number
    source?: string
    award_date?: string
  }
  tags: string[]
  status: 'opportunity' | 'active' | 'completed' | 'archived'
  relevance_score?: number
  ai_summary?: string
}

export interface GrantOpportunity extends DataSource {
  id: string
  opportunity_number: string
  title: string
  agency: string
  description: string
  award_ceiling?: number
  award_floor?: number
  posting_date: string
  close_date?: string
  eligible_applicants: string[]
  sector: string[]
  location_scope: 'federal' | 'state' | 'local' | 'regional'
  keywords: string[]
  relevance_score?: number
}

export interface PolicyMemo extends DataSource {
  id: string
  title: string
  jurisdiction: string
  status: 'concept' | 'in-discussion' | 'enacted'
  summary: string
  related_projects?: string[]
  effective_date?: string
  budget_impact_usd?: number
}

export interface DiscoveryFilters {
  sectors?: string[]
  keywords?: string[]
  locations?: string[]
  min_funding_usd?: number
  date_range?: {
    start: string
    end: string
  }
  relevance_threshold?: number
}

export interface IngestionJob {
  job_id: string
  source: DataSource['api_source']
  status: 'pending' | 'running' | 'completed' | 'failed'
  started_at: string
  completed_at?: string
  records_found: number
  records_imported: number
  errors?: string[]
}
