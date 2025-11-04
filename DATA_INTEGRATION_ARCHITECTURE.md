# Data Integration & Automated Discovery Architecture

## Executive Summary

The AltruisticXAI ecosystem now includes a fully automated data discovery and integration pipeline that:

1. **Fetches real-world opportunities** from Grants.gov and Data.gov APIs
2. **Analyzes relevance** using AI-powered scoring aligned with the 3-pillar mission
3. **Stores discoveries** persistently using Spark KV
4. **Presents insights** through an interactive UI
5. **Automates workflows** via GitHub Actions and CLI tools

This transforms AltruisticXAI from a static showcase into a living, breathing ecosystem that continuously discovers and integrates real opportunities.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interface                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Home Page   │  │  Labs Page   │  │  Consulting  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Policy Page  │  │Impact Ledger │  │ Integration  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                      React Hooks Layer                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  useGrantDiscovery()  │  useDiscoveredProjects()         │  │
│  │  useDatasetDiscovery() │  useKV() (persistence)          │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                   Data Ingestion Pipeline                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              orchestrator.ts                              │  │
│  │  • runDiscovery()                                        │  │
│  │  • runEnrichedDiscovery()                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  APIs        │  │  Transform   │  │   Storage    │         │
│  │ grants-gov   │  │  normalize   │  │  storage.ts  │         │
│  │ data-gov     │  │  enrichWithAI│  │  Spark KV    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                    External Data Sources                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Grants.gov   │  │  Data.gov    │  │   GitHub     │         │
│  │ Federal      │  │  Federal &   │  │ Open Source  │         │
│  │ Grants API   │  │  State Data  │  │ Repositories │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Discovery Pipeline Flow

```
1. Trigger (Manual / Scheduled / CI)
   │
   ├─→ runDiscovery(filters)
   │   │
   │   ├─→ API Calls (Parallel)
   │   │   ├─→ fetchGrantsGovOpportunities()
   │   │   └─→ fetchDataGovDatasets()
   │   │
   │   ├─→ Normalization
   │   │   ├─→ normalizeGrant()
   │   │   └─→ normalizeProject()
   │   │
   │   ├─→ Filtering (relevance_threshold)
   │   │
   │   └─→ Storage
   │       ├─→ storeDiscoveredGrants()
   │       └─→ storeDiscoveredProjects()
   │
   └─→ Optional: AI Enrichment
       │
       ├─→ enrichWithAI() for top 20
       │   └─→ GPT-4 Analysis
       │       ├─→ 1-sentence summary
       │       ├─→ Enhanced relevance score
       │       └─→ Sector classification
       │
       └─→ Update stored records
```

### User Interaction Flow

```
User → Data Integration Page
  │
  ├─→ Select Category/Topic
  │
  ├─→ Click "Discover"
  │
  ├─→ Hook: discoverGrants() / discoverNewProjects()
  │   │
  │   ├─→ setIsLoading(true)
  │   ├─→ setLoadingStage("Searching...")
  │   │
  │   ├─→ API Calls
  │   │
  │   ├─→ AI Analysis (if enabled)
  │   │
  │   ├─→ Update Spark KV
  │   │
  │   └─→ setIsLoading(false)
  │
  └─→ View Results
      ├─→ Filter by sector
      ├─→ Sort by relevance
      ├─→ Star high-value items
      └─→ Navigate to external URLs
```

## Component Structure

### `/data-ingest` Directory

```
/data-ingest/
├── schema.ts              # TypeScript interfaces
│   ├── IngestedProject
│   ├── GrantOpportunity
│   ├── PolicyMemo
│   ├── DiscoveryFilters
│   └── IngestionJob
│
├── apis/                  # External API clients
│   ├── grants-gov.ts      # Grants.gov integration
│   │   ├── fetchGrantsGovOpportunities()
│   │   ├── calculateRelevance()
│   │   ├── categorizeSector()
│   │   └── extractKeywords()
│   │
│   └── data-gov.ts        # Data.gov integration
│       ├── fetchDataGovDatasets()
│       ├── calculateDatasetRelevance()
│       ├── determineSector()
│       └── extractLocation()
│
├── transform/             # Data normalization
│   └── normalize.ts
│       ├── normalizeProject()
│       ├── normalizeGrant()
│       ├── enrichWithAI()
│       └── cleanText()
│
├── store/                 # Persistence layer
│   └── storage.ts
│       ├── storeDiscoveredProjects()
│       ├── getDiscoveredProjects()
│       ├── storeDiscoveredGrants()
│       ├── getDiscoveredGrants()
│       ├── recordIngestionJob()
│       └── getIngestionJobs()
│
├── orchestrator.ts        # Main pipeline
│   ├── runDiscovery()
│   └── runEnrichedDiscovery()
│
└── README.md             # Documentation
```

### React Hooks

```
/hooks/
├── use-grant-discovery.ts
│   ├── discoverGrants(category, useAI)
│   ├── toggleStar(grantId)
│   ├── addNote(grantId, note)
│   ├── removeGrant(grantId)
│   └── getByPillar(pillar)
│
├── use-discovered-projects.ts
│   ├── discoverNewProjects(topic, count)
│   ├── removeProject(repoId)
│   └── clearAll()
│
└── use-dataset-discovery.ts
    ├── runDiscovery(useAI)
    ├── loadStoredData()
    ├── filterBySector(sector)
    ├── filterByRelevance(minScore)
    ├── getTopGrants(count)
    └── getTopProjects(count)
```

## Data Schema

### Core Interfaces

#### IngestedProject
```typescript
{
  id: string                    // Unique identifier
  title: string                 // Project name
  description: string           // Full description
  sector: string                // energy | healthcare | education | law | research | multi
  organization?: string         // Owning organization
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
  tags: string[]               // Keywords
  status: string               // opportunity | active | completed | archived
  relevance_score?: number     // 0-1
  ai_summary?: string          // GPT-4 generated summary
  
  // Provenance
  api_source: string           // grants.gov | data.gov | scraped | manual
  capture_date: string         // ISO timestamp
  url: string                  // Source URL
}
```

#### GrantOpportunity
```typescript
{
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
  location_scope: string       // federal | state | local | regional
  keywords: string[]
  relevance_score?: number
  
  // Provenance
  api_source: 'grants.gov'
  capture_date: string
  url: string
}
```

## Automation & Scheduling

### GitHub Actions Workflow

**File**: `.github/workflows/data-discovery.yml`

**Triggers**:
- Scheduled: Every Monday at 6 AM UTC
- Manual: Via workflow_dispatch

**Steps**:
1. Checkout repository
2. Setup Node.js environment
3. Install dependencies
4. Run discovery pipeline
5. Generate discovery report
6. Create GitHub issue with results
7. Notify on failure

**Configuration**:
```yaml
inputs:
  use_ai_enrichment: true/false
  relevance_threshold: 0.0-1.0
```

### CLI Tool

**Command**: `npm run discover <command>`

**Available Commands**:

```bash
# Show current status
npm run discover status

# Run discovery with preset
npm run discover discover energy
npm run discover discover education
npm run discover discover ai
npm run discover discover pilot
npm run discover discover new-england

# Disable AI enrichment
npm run discover discover energy --no-ai

# List results
npm run discover list projects
npm run discover list grants

# Show presets
npm run discover presets
```

## Relevance Scoring Algorithm

### Base Score Calculation

```
Initial Score: 0.5

High-Value Terms (+0.15 each):
  - local-first
  - edge-ai
  - campus energy
  - renewable
  - pilot
  - demonstration

Keyword Matches (+0.1 each):
  - User-provided keywords

Funding Threshold (+0.2):
  - Meets minimum funding requirement

Location Match (+0.15):
  - Matches target regions

Final Score: min(sum, 1.0)
```

### AI Enhancement

When `enrichWithAI()` is called, GPT-4 analyzes:

1. **Mission Alignment**: How well does this align with the 3-pillar model?
2. **Strategic Value**: Long-term ecosystem impact
3. **Implementation Feasibility**: Can we actually do this?
4. **Innovation Potential**: Does this push the field forward?

The AI can:
- Override the base relevance score
- Add a 1-sentence summary
- Reclassify the sector
- Identify cross-pillar opportunities

## Integration Points

### With Existing Pages

#### Home Page (`HomePage.tsx`)
- Shows "Latest Discoveries" section
- Pulls top 3 most recent/relevant items
- Links to Data Integration page

#### Labs Page (`LabsPage.tsx`)
- Can pull discovered open-source projects
- Filter by `origin === 'labs'`
- Show GitHub repo integration

#### Consulting Page (`ConsultingPage.tsx`)
- Display relevant grants for pilots
- Filter by funding threshold
- Show high-alignment opportunities

#### Policy Page (`PolicyPage.tsx`)
- Convert grants to policy memos
- Track policy-relevant opportunities
- Link to related projects

#### Impact Ledger (`ImpactLedgerPage.tsx`)
- Unified view of all discoveries
- Provenance tracking
- Timeline visualization

## Performance Considerations

### Caching
- API responses cached per session
- AI analysis results cached for 7 days
- React Query for automatic background refresh

### Rate Limiting
- Grants.gov: Respect rate limits (unspecified, be conservative)
- Data.gov: 1000 requests/hour
- OpenAI: GPT-4 rate limits (tier-based)

### Optimization
- Parallel API calls
- Batch AI analysis (max 20 at once)
- Progressive loading in UI
- Functional state updates (avoid stale closures)

### Storage Limits
- Max 200 projects stored
- Max 150 grants stored
- Auto-prune based on:
  - Age (>6 months)
  - Relevance (< threshold)
  - Status (closed/expired)

## Security & Privacy

### API Keys
- Never commit to repository
- Use environment variables
- GitHub Secrets for CI/CD

### Data Handling
- No PII collection
- Public data sources only
- Attribution maintained (provenance)

### Rate Limiting
- Exponential backoff on errors
- Respect robots.txt for scraping
- Honor API Terms of Service

## Future Enhancements

### Phase 2: State & Local Integration
- Maine Open Data Portal
- Massachusetts Data Portal
- Vermont Open Data
- CKAN-based state systems

### Phase 3: Advanced Analysis
- Trend detection over time
- Network graph of related opportunities
- Predictive scoring for win probability
- Auto-application draft generation

### Phase 4: Alerting & Notifications
- Slack integration for high-value discoveries
- Email digests
- SMS for urgent deadlines
- Calendar integration

### Phase 5: Enrichment Pipeline
- Automatic PDF parsing
- Entity extraction (organizations, people)
- Sentiment analysis
- Competitive landscape mapping

## Monitoring & Maintenance

### Health Checks
- Monitor ingestion job success rate
- Track API response times
- Alert on consecutive failures
- Log error patterns

### Data Quality
- Validate schema compliance
- Check for duplicate entries
- Verify URL accessibility
- Audit relevance scores

### Operational Tasks
- Weekly review of high-value opportunities
- Monthly cleanup of expired grants
- Quarterly relevance threshold tuning
- Annual API integration updates

## Troubleshooting

### Common Issues

**Issue**: No results returned
- Check API endpoints are accessible
- Verify filters aren't too restrictive
- Check relevance threshold setting

**Issue**: Low relevance scores
- Review keyword selection
- Adjust high-value terms list
- Consider AI enrichment

**Issue**: Storage errors
- Clear Spark KV cache
- Check storage limits
- Verify schema compatibility

**Issue**: AI enrichment failures
- Check OpenAI API key
- Verify rate limits
- Fallback to base scoring

## Developer Guide

### Adding a New Data Source

1. Create API client in `/data-ingest/apis/new-source.ts`
2. Implement fetch function
3. Add normalization logic
4. Update `orchestrator.ts` to call new source
5. Add to `DiscoveryFilters` schema
6. Create preset in CLI tool
7. Document in README

### Modifying Relevance Algorithm

1. Update scoring logic in API clients
2. Adjust high-value terms list
3. Test with representative samples
4. Document changes
5. Update AI enrichment prompt if needed

### Creating Custom Filters

1. Extend `DiscoveryFilters` interface
2. Implement filter logic in API clients
3. Add UI controls in DataIntegrationPage
4. Test edge cases
5. Document filter behavior

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintained by**: AltruisticXAI Team
