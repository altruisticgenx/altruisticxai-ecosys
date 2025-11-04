# Data Ingestion & Integration Architecture

## Overview

This directory contains the automated data discovery and integration pipeline that powers the AltruisticXAI ecosystem. It fetches real-world grants, opportunities, and open datasets from public APIs and enriches them with AI-powered analysis.

## Architecture

```
/data-ingest/
├── apis/              → API client modules for each data source
│   ├── grants-gov.ts  → Grants.gov API integration
│   └── data-gov.ts    → Data.gov catalog integration
├── transform/         → Data normalization and enrichment
│   └── normalize.ts   → Schema standardization + AI enrichment
├── store/             → Persistence layer using Spark KV
│   └── storage.ts     → CRUD operations for discovered data
├── schema.ts          → TypeScript interfaces for all entities
└── orchestrator.ts    → Main pipeline coordinator
```

## Data Sources

### 1. Grants.gov API
- **Endpoint**: `https://www.grants.gov/grantsws/rest/opportunities/search`
- **Purpose**: Federal grant opportunities
- **Coverage**: All U.S. federal agencies
- **Update Frequency**: Daily
- **Key Features**:
  - Keyword-based search
  - Funding amount filters
  - Eligibility criteria
  - Application deadlines

### 2. Data.gov Catalog
- **Endpoint**: `https://catalog.data.gov/api/3/action/package_search`
- **Purpose**: Federal and state datasets
- **Coverage**: 250,000+ datasets
- **Update Frequency**: Continuous
- **Key Features**:
  - Dataset metadata
  - Organization information
  - Geographic tagging
  - Update tracking

### 3. NSF Awards API
- **Endpoint**: `https://api.nsf.gov/services/v1/awards.json`
- **Purpose**: National Science Foundation research awards
- **Coverage**: All NSF-funded research projects
- **Update Frequency**: Daily
- **Key Features**:
  - Research abstracts
  - Funding amounts
  - PI information
  - Institution details

### 4. USAspending API
- **Endpoint**: `https://api.usaspending.gov/api/v2`
- **Purpose**: Federal contract and grant awards
- **Coverage**: All federal spending transactions
- **Update Frequency**: Daily
- **Key Features**:
  - Award descriptions
  - Funding amounts
  - Agency information
  - Geographic data

### 5. EIA Open Data API
- **Endpoint**: `https://api.eia.gov/v2`
- **Purpose**: U.S. Energy Information Administration data
- **Coverage**: Energy production, consumption, prices, emissions
- **Update Frequency**: Monthly/Quarterly/Annual (varies by series)
- **Key Features**:
  - State-level electricity data
  - Price trends
  - Generation capacity
  - Emissions factors
- **Use Case**: Baseline metrics for ROI modeling and carbon impact calculations

### 6. NREL Developer Network APIs
- **Endpoint**: `https://developer.nrel.gov/api`
- **Purpose**: Renewable energy data and analysis tools
- **Coverage**: Solar resource, utility rates, EV infrastructure
- **Update Frequency**: Varies by dataset
- **Key Features**:
  - Utility rate data
  - Solar resource assessment
  - REopt optimization (future)
  - Building energy analysis
- **Use Case**: Solar feasibility studies, campus energy ROI calculations

### 7. College Scorecard API
- **Endpoint**: `https://api.data.gov/ed/collegescorecard/v1`
- **Purpose**: Institution-level higher education data
- **Coverage**: All Title IV institutions in the U.S.
- **Update Frequency**: Annual
- **Key Features**:
  - Enrollment demographics
  - Pell Grant percentages
  - First-generation student rates
  - Cost and completion data
- **Use Case**: Identify equity-focused campus energy pilot targets

### 8. Data.gov CKAN API
- **Endpoint**: `https://catalog.data.gov/api/3/action`
- **Purpose**: Federal open data catalog discovery
- **Coverage**: 250,000+ datasets across all federal agencies
- **Update Frequency**: Continuous
- **Key Features**:
  - Dataset search and filtering
  - Tag-based discovery
  - Organization filtering
  - Metadata access
- **Use Case**: Labs discovery feed for open-source tools and demos

## Unified Schema

All data sources are normalized to standard schemas:

### IngestedProject
```typescript
{
  id: string
  title: string
  description: string
  sector: 'energy' | 'healthcare' | 'education' | 'law' | 'research' | 'multi'
  organization?: string
  location?: { state, city, region }
  funding?: { amount_usd, source, award_date }
  tags: string[]
  status: 'opportunity' | 'active' | 'completed' | 'archived'
  relevance_score?: number
  ai_summary?: string
  
  // Provenance
  api_source: 'grants.gov' | 'data.gov' | 'scraped' | 'manual'
  capture_date: string
  url: string
}
```

### GrantOpportunity
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
  keywords: string[]
  relevance_score?: number
  
  // Provenance
  api_source: 'grants.gov'
  capture_date: string
  url: string
}
```

## Discovery Filters

Control what gets ingested:

```typescript
{
  sectors?: string[]              // e.g., ['energy', 'education']
  keywords?: string[]             // e.g., ['AI', 'pilot', 'local-first']
  locations?: string[]            // e.g., ['Maine', 'New England']
  min_funding_usd?: number        // Minimum grant amount
  date_range?: { start, end }     // Timeframe filter
  relevance_threshold?: number    // 0-1, default 0.4
}
```

## AI Enrichment

Each discovered item can be enriched with GPT-4 analysis:

```typescript
await enrichWithAI(item)  // Returns item with:
// - ai_summary: 1-sentence impact summary
// - relevance_score: Enhanced 0-1 score
// - sector: AI-classified primary sector
```

## Usage

### Run Discovery Manually

```typescript
import { runDiscovery, runEnrichedDiscovery } from '@/data-ingest/orchestrator'

// Basic discovery
const job = await runDiscovery({
  keywords: ['AI', 'energy', 'campus'],
  sectors: ['energy', 'education'],
  relevance_threshold: 0.5
})

// With AI enrichment
const enrichedJob = await runEnrichedDiscovery(filters, true)
```

### Access Stored Data

```typescript
import { getDiscoveredProjects, getDiscoveredGrants } from '@/data-ingest/store/storage'

const projects = await getDiscoveredProjects()
const grants = await getDiscoveredGrants()
```

### React Hook Integration

```typescript
import { useDatasetDiscovery } from '@/hooks/use-dataset-discovery'

const {
  projects,
  grants,
  isDiscovering,
  runDiscovery,
  filterBySector,
  getTopProjects
} = useDatasetDiscovery()

// Trigger discovery
await runDiscovery(true)  // true = use AI enrichment

// Filter results
const energyProjects = filterBySector('energy')
const top10 = getTopProjects(10)
```

## Automation Strategy

### GitHub Actions Workflow (Recommended)

Create `.github/workflows/data-discovery.yml`:

```yaml
name: Automated Data Discovery

on:
  schedule:
    - cron: '0 2 * * 1'  # Weekly on Monday at 2 AM UTC
  workflow_dispatch:      # Manual trigger

jobs:
  discover:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Run Discovery
        run: node scripts/run-discovery.js
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          
      - name: Commit Results
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A
          git commit -m "chore: auto-discovery $(date +'%Y-%m-%d')" || true
          git push
```

### Discovery Script

Create `scripts/run-discovery.js`:

```javascript
import { runEnrichedDiscovery } from '../src/data-ingest/orchestrator.js'

async function main() {
  console.log('Starting automated discovery...')
  
  const job = await runEnrichedDiscovery({
    keywords: [
      'AI', 'energy', 'campus', 'renewable',
      'pilot', 'education', 'local-first'
    ],
    sectors: ['energy', 'education', 'research'],
    locations: ['Maine', 'New England'],
    relevance_threshold: 0.4
  }, true)
  
  console.log(`Discovery complete: ${job.records_imported} records imported`)
  console.log(`Status: ${job.status}`)
  
  if (job.errors && job.errors.length > 0) {
    console.error('Errors:', job.errors)
    process.exit(1)
  }
}

main().catch(console.error)
```

## Relevance Scoring

### Automatic Scoring

Built-in heuristics assign relevance scores (0-1):

**High-value terms** (+0.15 each):
- local-first
- edge-ai
- campus energy
- renewable
- pilot
- demonstration

**Keyword matches** (+0.1 each):
- User-provided keywords

**Funding threshold** (+0.2):
- Meets minimum funding requirement

**Location match** (+0.15):
- Matches target regions

### AI Enhancement

GPT-4 can override/boost scores based on:
- Mission alignment with AltruisticXAI pillars
- Strategic value to Labs→Consulting→Policy flywheel
- Innovation potential
- Implementation feasibility

## Alerts & Notifications

### High-Impact Detection

```typescript
// After discovery, check for high-impact opportunities
const grants = await getDiscoveredGrants()

const highImpact = grants.filter(g =>
  g.relevance_score > 0.7 &&
  g.award_ceiling > 500000 &&
  g.sector.includes('energy')
)

if (highImpact.length > 0) {
  // Trigger Slack/Email alert
  await notifyTeam(highImpact)
}
```

### Suggested Alert Triggers

1. **Grant > $500K** with relevance > 70%
2. **New England location** + energy/AI keywords
3. **Close date < 30 days** with high alignment
4. **Cross-pillar opportunity** (labs + consulting + policy)

## Maintenance

### Data Freshness

- **Grants**: Auto-archive after close date
- **Projects**: Remove stale (>6 months no update)
- **Storage**: Keep max 200 projects, 150 grants

### Error Handling

All API calls include:
- Rate limiting respect
- Exponential backoff
- Error logging to job record
- Graceful degradation

### Performance

- Batch AI calls (max 20 at a time)
- Cache analysis results
- Paginate large result sets
- Use functional React state updates

## Integration with Impact Ledger

Discovered items can be promoted to the main Impact Ledger:

```typescript
// Convert grant to policy memo
const memo = {
  id: grant.id,
  title: grant.title,
  jurisdiction: grant.agency,
  status: 'concept',
  related_projects: [],
  ...grant
}

// Add to ledger
await addPolicyMemo(memo)
```

## Future Enhancements

### Additional Data Sources

1. **State Portals** (CKAN-based):
   - Maine Open Data
   - Massachusetts Data Portal
   - Vermont Open Data

2. **Energy & Infrastructure** (Priority for v1):
   - ✅ EIA Open Data API - IMPLEMENTED
   - ✅ NREL Developer Network - IMPLEMENTED
   - DOE Building Performance Database API (BPD)
   - Campus energy APIs (UNC Energy Data, Princeton TigerEnergy)

3. **Education & Context** (Priority for v1):
   - ✅ College Scorecard API - IMPLEMENTED
   - ✅ Data.gov CKAN API - IMPLEMENTED

4. **News & Publications**:
   - DOE Energy Blog
   - Campus Sustainability News
   - Policy Announcements

### Advanced Features

- **Geo-clustering**: Group opportunities by region
- **Trend analysis**: Track emerging topics over time
- **Network mapping**: Connect related grants/projects
- **Auto-application**: Pre-fill grant applications
- **Impact forecasting**: Predict ROI using historical data

## Security & Ethics

- **Rate Limiting**: Respect API limits (never exceed)
- **Attribution**: Always track data provenance
- **Privacy**: No PII collection or storage
- **Robots.txt**: Honor for scraping
- **Terms of Service**: Comply with all API ToS

## Support

For issues or questions:
- Check logs in ingestion job records
- Review API documentation
- Test filters incrementally
- Validate schemas match API responses

---

**Last Updated**: 2025
**Maintained by**: AltruisticXAI Team
