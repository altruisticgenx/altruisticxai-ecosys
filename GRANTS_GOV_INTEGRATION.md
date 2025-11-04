# Grants.gov API Integration

## Overview

AltruisticXAI now integrates with the **real Grants.gov API v2** to pull live federal grant opportunities directly from the official government database.

## API Details

### Endpoint
```
POST https://api.grants.gov/v2/opportunities/search
```

### Authentication
The Grants.gov API v2 does not require an API key for basic searches. The public endpoint allows:
- Searching grant opportunities
- Filtering by keywords, agencies, statuses
- Sorting and pagination

### Request Format
```json
{
  "keyword": "energy artificial intelligence",
  "oppStatuses": ["forecasted", "posted"],
  "sortBy": "openDate",
  "sortOrder": "desc",
  "from": 0,
  "size": 20
}
```

### Response Structure
The API returns a JSON object with:
```json
{
  "opportunities": [
    {
      "opportunityID": "unique-id",
      "opportunityNumber": "EPA-ABC-123",
      "opportunityTitle": "Grant Title",
      "agencyName": "Department of Energy",
      "description": "Full description...",
      "closeDate": "2024-12-31",
      "estimatedTotalProgramFunding": "5000000",
      "awardCeiling": "500000",
      "opportunityCategory": "Discretionary",
      "fundingInstrumentType": "Grant",
      "eligibleApplicants": ["State governments", "Universities"],
      "cfdaNumbers": "81.049"
    }
  ],
  "totalRecords": 150
}
```

## Implementation

### Core API Module
**File:** `src/lib/grants-api.ts`

This module provides:
- `searchGrantOpportunities(keywords, limit)` - Generic search function
- `searchEnergyAIGrants()` - Pre-configured for energy + AI grants
- `searchEducationAIGrants()` - Pre-configured for education + AI grants
- `searchLocalGovernmentGrants()` - Pre-configured for municipal grants
- `searchUniversityResearchGrants()` - Pre-configured for university research

### Data Ingestion Script
**File:** `src/data-ingest/apis/grantsGov.ts`

Automated ingestion that:
1. Searches multiple relevant categories (energy AI, education tech, grid modernization, etc.)
2. Deduplicates results by opportunity ID
3. Enriches with metadata (priority agencies, topics, CFDA numbers)
4. Converts to standardized `GrantOpportunity` schema
5. Can be run via GitHub Actions on a schedule

### React Hook
**File:** `src/hooks/use-grant-discovery.ts`

Client-side hook providing:
- `discoverGrants(category, analyzeWithAI)` - Fetch and analyze grants
- `toggleStar(grantId)` - Save grants for follow-up
- `addNote(grantId, note)` - Add internal notes
- Persistent storage via `useKV` (survives page refresh)

## Search Categories

The system searches for grants in these categories:
1. **Energy AI** - "energy artificial intelligence"
2. **Education Technology** - "education technology AI"
3. **Grid Modernization** - "grid modernization"
4. **Campus Renewable Energy** - "renewable energy campus"
5. **Local Government Energy** - "local government energy"
6. **University Research AI** - "university research AI"

## Priority Agencies

Grants from these agencies receive priority tagging:
- **DOE** - Department of Energy
- **NSF** - National Science Foundation
- **ED** - Department of Education
- **ARPA-E** - Advanced Research Projects Agency - Energy
- **EDA** - Economic Development Administration
- **EERE** - Office of Energy Efficiency & Renewable Energy
- **NETL** - National Energy Technology Laboratory

## Data Schema

### GrantOpportunity Interface
```typescript
interface GrantOpportunity {
  id: string
  title: string
  description: string
  agency: string
  cfdaNumber?: string
  opportunityNumber?: string
  closeDate?: string
  totalFundingEstimate?: number
  eligibility?: string
  topics?: string[]
  location?: LocationInfo
  alignmentScore?: number
  recommendedPillar?: "labs" | "consulting" | "policy"
  aiAnalysis?: {
    strengths?: string
    challenges?: string
    insights?: string
  }
  provenance: Provenance
}
```

### Provenance Tracking
Every grant includes metadata about where it came from:
```typescript
interface Provenance {
  source: "grants_gov"
  externalId: string  // The official opportunity ID
  sourceUrl: string   // Direct link to grants.gov page
  capturedAt: string  // ISO timestamp of when fetched
}
```

## AI Analysis Integration

After fetching grants, the system can optionally run AI analysis using the OpenAI API (GPT-4o) to:
- Calculate an **alignment score** (0-100) based on fit with AltruisticXAI's mission
- Recommend which pillar (Labs/Consulting/Policy) should pursue it
- Extract key strengths, challenges, and insights
- Generate actionable next steps

**File:** `src/lib/grant-analyzer.ts`

## Usage in UI

### Data Integration Page
Navigate to `/data-integration` to:
1. Select a grant category
2. Click "Discover Grants" to search Grants.gov API
3. View results with AI analysis scores
4. Star promising opportunities
5. Add notes for follow-up
6. Export starred grants

### Automated Ingestion
The crawler can be run automatically via GitHub Actions to:
- Refresh grant data daily/weekly
- Store results in persistent storage
- Alert team to high-priority new opportunities
- Feed into Impact Ledger

**File:** `.github/workflows/ingest.yml` (can be configured)

## Rate Limiting

The implementation includes:
- 1.2 second delay between category searches
- Deduplication to avoid processing same grant multiple times
- Reasonable limits (20 results per category)
- Error handling with graceful degradation

## Testing

To test the integration:

```typescript
// In browser console or test file
import { searchEnergyAIGrants } from '@/lib/grants-api'

const result = await searchEnergyAIGrants(10)
console.log(`Found ${result.opportunities.length} grants`)
console.log(result.opportunities[0])
```

## Future Enhancements

Potential improvements:
1. **Advanced Filters** - Filter by state, funding amount range, eligibility
2. **Notification System** - Email/Slack alerts for new high-scoring grants
3. **Application Tracking** - Track which grants you've applied to
4. **Historical Analysis** - Track funding trends over time
5. **Multi-Source Fusion** - Combine Grants.gov with NSF Awards, USAspending, etc.
6. **Geographic Prioritization** - Auto-boost Maine/New England opportunities
7. **Deadline Calendar** - Visual calendar of upcoming grant deadlines

## Resources

- [Grants.gov API Documentation](https://api.grants.gov/)
- [Simpler.Grants.gov Developer Portal](https://simpler.grants.gov/developer)
- [OpenGrants Initiative](https://www.grants.gov/)
- [CFDA (Catalog of Federal Domestic Assistance)](https://sam.gov/content/assistance-listings)

## Support

For issues with the Grants.gov API integration:
1. Check the browser console for API error messages
2. Verify the API endpoint is accessible: `https://api.grants.gov/v2/opportunities/search`
3. Review the `grants-api.ts` error handling
4. Check if Grants.gov is experiencing downtime (rare but possible)

## License

This integration uses the public Grants.gov API which provides U.S. federal government data that is in the public domain.
