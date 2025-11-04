# Federal Data Crawler Architecture

## Overview

The AltruisticXAI ecosystem now includes a **fully automated federal data crawler** - transforming the platform from a brochure into an **intelligence layer with a political agenda**. The crawler automatically discovers high-leverage opportunities from US federal databases and scores them based on strategic alignment with the Labs → Consulting → Policy flywheel.

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   Federal Data Sources                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ USAspending │ │ Grants.gov  │ │ NSF Awards  │           │
│  │   .gov API  │ │     API     │ │     API     │           │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘           │
│  ┌─────────────┐        │                │                  │
│  │  Data.gov   │        │                │                  │
│  │  CKAN API   │────────┘                │                  │
│  └─────────────┘                         │                  │
└─────────────────────────────────────────┬──────────────────┘
                                           │
                    ┌──────────────────────┴───────────────────┐
                    │   Data Ingestion Layer                   │
                    │   /src/data-ingest/                      │
                    │                                           │
                    │   ┌─────────────────────────────────┐   │
                    │   │   run-ingest.ts                 │   │
                    │   │   • Orchestrates all sources    │   │
                    │   │   • Parallel fetching           │   │
                    │   │   • Deduplication               │   │
                    │   └─────────────┬───────────────────┘   │
                    │                  │                        │
                    │   ┌──────────────┴──────────────┐       │
                    │   │   APIs (parallel fetch)      │       │
                    │   │   • usaspending.ts           │       │
                    │   │   • grantsGov.ts             │       │
                    │   │   • nsfAwards.ts             │       │
                    │   │   • dataGov.ts               │       │
                    │   └──────────────┬───────────────┘       │
                    │                  │                        │
                    │   ┌──────────────┴───────────────┐       │
                    │   │   Transform Layer            │       │
                    │   │   • enrichWithAI.ts (GPT-4)  │       │
                    │   │   • Priority scoring         │       │
                    │   │   • Geographic filtering     │       │
                    │   └──────────────────────────────┘       │
                    └────────────────┬─────────────────────────┘
                                     │
              ┌──────────────────────┴──────────────────────┐
              │          Data Schema Layer                   │
              │          /src/data/schema.ts                 │
              │                                               │
              │   Project │ GrantOpportunity │ OpenDataset  │
              │   PolicyMemo │ ImpactEvent │ Provenance     │
              └──────────────────────┬──────────────────────┘
                                     │
              ┌──────────────────────┴──────────────────────┐
              │       Persistence Layer                      │
              │       Spark KV (useDataCrawler hook)        │
              │                                               │
              │   • Persistent between sessions              │
              │   • Reactive updates                         │
              │   • Timestamp tracking                       │
              └──────────────────────┬──────────────────────┘
                                     │
              ┌──────────────────────┴──────────────────────┐
              │         UI Layer                             │
              │         /src/pages/ImpactLedgerPage.tsx     │
              │                                               │
              │   • "Run Federal Data Crawler" button       │
              │   • Discovered Projects tab                  │
              │   • Real-time stats                          │
              │   • Priority filtering                       │
              └──────────────────────────────────────────────┘
```

## Data Sources

### 1. USAspending.gov API
- **What it provides**: All federal awards (contracts, grants, loans)
- **Endpoint**: `https://api.usaspending.gov/api/v2/search/spending_by_award/`
- **Keywords searched**: "energy efficiency", "microgrid", "campus energy", "artificial intelligence energy"
- **Geographic filter**: Priority scoring for ME, MA, NH, VT, RI, CT, PA
- **Output**: `Project[]` entities with `source: "usaspending"`

### 2. NSF Awards API
- **What it provides**: National Science Foundation research awards
- **Endpoint**: `https://api.nsf.gov/services/v1/awards.json`
- **Search terms**: "energy efficiency", "artificial intelligence", "machine learning", "campus sustainability"
- **University detection**: Auto-flags institutional affiliations
- **Output**: `Project[]` entities with `source: "nsf_awards"`

### 3. Grants.gov API
- **What it provides**: Federal funding opportunities (forecasted & posted)
- **Endpoint**: `https://apply07.grants.gov/grantsws/rest/opportunities/search`
- **Categories**: "energy", "artificial intelligence", "grid modernization", "renewable energy"
- **Priority agencies**: DOE, NSF, ED, ARPA-E, EDA
- **Output**: `GrantOpportunity[]` entities with `source: "grants_gov"`

### 4. Data.gov CKAN API
- **What it provides**: Federal open dataset catalog
- **Endpoint**: `https://catalog.data.gov/api/3/action/package_search`
- **Queries**: "energy consumption", "artificial intelligence", "campus sustainability"
- **Relevance scoring**: Based on format (API/CSV), tags, documentation quality
- **Output**: `OpenDataset[]` entities with `source: "data_gov"`

## Data Schema

All ingested data conforms to TypeScript interfaces in `/src/data/schema.ts`:

```typescript
export interface Provenance {
  source: SourceSystem
  externalId?: string
  sourceUrl?: string
  capturedAt: string  // ISO timestamp
}

export interface Project {
  id: string
  title: string
  description: string
  sector: string
  origin: "labs" | "consulting" | "external"
  location?: LocationInfo
  priorityScore?: number  // 0-100 based on geography + sector
  provenance: Provenance
  // ... metrics, KPIs, tags
}

export interface GrantOpportunity {
  id: string
  title: string
  agency: string
  closeDate?: string
  totalFundingEstimate?: number
  alignmentScore?: number  // AI-generated 0-100
  recommendedPillar?: "labs" | "consulting" | "policy"
  aiAnalysis?: {
    strengths: string
    challenges: string
    insights: string
  }
  provenance: Provenance
}

export interface OpenDataset {
  id: string
  title: string
  publisher: string
  format?: string[]  // CSV, JSON, API, etc.
  relevanceScore?: number  // 0-100
  provenance: Provenance
}
```

## Scoring & Prioritization

### Priority Scoring (Projects)
```typescript
const TARGET_STATES = ["ME", "MA", "NH", "VT", "RI", "CT", "PA"]

priorityScore = 
  (state in TARGET_STATES ? 85 : 65) +
  (university detected ? +5 : 0) +
  (sector matches energy/AI ? +10 : 0)
```

### Relevance Scoring (Datasets)
```typescript
relevanceScore = 
  (has API format ? 30 : 0) +
  (has CSV/data format ? 20 : 0) +
  (tags.length > 3 ? 20 : 10) +
  (description length > 100 ? 15 : 5) +
  15  // base score
```

### AI Alignment Scoring (Grants)
Uses GPT-4o-mini to analyze grant opportunities:
- Alignment with Labs (R&D/open-source): 0-100
- Alignment with Consulting (revenue/pilots): 0-100
- Alignment with Policy (advocacy/memos): 0-100
- Recommended pillar based on highest score
- Strategic insights (strengths, challenges, next steps)

## Usage

### Manual Trigger (UI)
```tsx
import { useDataCrawler } from "@/hooks/use-data-crawler"

const { crawlerData, isIngesting, runIngest } = useDataCrawler()

<Button onClick={runIngest} disabled={isIngesting}>
  {isIngesting ? "Crawling..." : "Run Federal Data Crawler"}
</Button>
```

### Programmatic Trigger
```typescript
import { runFullIngest } from "@/data-ingest/run-ingest"

const result = await runFullIngest()
// Returns: { projects, grants, datasets, timestamp, sources }
```

## Data Flow

1. **User triggers crawler** via Impact Ledger page button
2. **`runFullIngest()`** orchestrates parallel API calls:
   - `runUsaspendingIngest()` → 50-75 federal awards
   - `runNsfAwardsIngest()` → 40-50 research projects
   - `runGrantsGovIngest()` → 50-100 funding opportunities
   - `runDataGovIngest()` → 30-40 open datasets
3. **Deduplication** via Map structures (by ID)
4. **Merging** with seed/manual projects
5. **Storage** via `useDataCrawler` hook → Spark KV
6. **UI update** with real-time stats and filterable cards

## Persistence

All crawler data is stored in Spark KV under the key `"crawler-data"`:

```typescript
interface CrawlerState {
  projects: Project[]
  grants: GrantOpportunity[]
  datasets: OpenDataset[]
  lastIngestTimestamp?: string
  sources?: {
    usaspending: number
    nsf: number
    grants_gov: number
    data_gov: number
    manual: number
  }
  isLoading: boolean
  error?: string
}
```

This persists between sessions and can be displayed/filtered in the UI.

## Future Enhancements

### Scheduled Automation (GitHub Actions)
Create `.github/workflows/ingest.yml`:
```yaml
on:
  schedule:
    - cron: "0 5 * * 1-5"  # Weekdays at 5am UTC
  workflow_dispatch: {}

jobs:
  ingest:
    runs-on: ubuntu-latest
    steps:
      - run: npx ts-node src/data-ingest/run-ingest.ts
      - # Commit to repo or push to external DB
```

### Additional APIs
- **EIA (Energy Information Administration)**: Baseline energy metrics
- **NREL REopt**: Renewable energy optimization scenarios
- **College Scorecard**: Institution demographics for targeting
- **Open States API**: State legislative tracking
- **EPA**: Environmental compliance data

### Advanced Features
- **Smart alerts**: Notify when new high-priority opportunities detected
- **Auto-classification**: ML-based sector/pillar assignment
- **Relationship mapping**: Link grants → projects → policies
- **Export to policy memos**: "Use this project as evidence"
- **Dashboard analytics**: Trend charts, geographic heatmaps

## Security & Rate Limiting

- USAspending, NSF, Data.gov: No API keys required (public endpoints)
- Grants.gov: May require API key for production usage
- Rate limiting: 500-1000ms delays between requests
- Error handling: Graceful degradation if individual sources fail
- No sensitive data stored (all public federal data)

## File Structure

```
src/
├── data/
│   ├── schema.ts                 # TypeScript interfaces
│   └── seed-projects.ts          # Manual/curated projects
├── data-ingest/
│   ├── apis/
│   │   ├── usaspending.ts        # USAspending API client
│   │   ├── grantsGov.ts          # Grants.gov API client
│   │   ├── nsfAwards.ts          # NSF API client
│   │   └── dataGov.ts            # Data.gov API client
│   ├── transform/
│   │   └── enrichWithAI.ts       # GPT-4 grant analysis
│   └── run-ingest.ts             # Main orchestrator
├── hooks/
│   └── use-data-crawler.ts       # React hook for persistence
├── components/
│   └── CrawledProjectCard.tsx    # Display component
└── pages/
    └── ImpactLedgerPage.tsx      # UI integration
```

## Conclusion

The Federal Data Crawler transforms AltruisticXAI into a **living intelligence system** that:
- **Watches** the entire US federal opportunity landscape
- **Scores** relevance to Maine/New England energy + AI priorities
- **Surfaces** high-leverage projects, grants, and datasets automatically
- **Integrates** discoveries into the Labs → Consulting → Policy narrative

This is no longer a brochure. It's a **crawler with a political agenda** that turns federal data into strategic action.
