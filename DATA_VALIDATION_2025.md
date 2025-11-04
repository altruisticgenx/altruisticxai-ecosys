# 2025+ Data Validation & Quality Assurance

## Overview

This document describes the comprehensive data quality system that ensures all ingested data is **2025 or newer**, validated, and reliable. The system has three layers:

1. **Filter at ingest** - Only include 2025+ data from APIs
2. **Validate after ingest** - Automated validation script checks data quality
3. **Guarantee freshness** - Daily GitHub Action + UI indicators

---

## 1️⃣ Filter at Ingest (API Layer)

### Date Fields Schema

All entities have explicit date fields that represent real-world dates (not just `capturedAt`):

```typescript
interface Project {
  effectiveDate?: string;  // Award date, project start date
  provenance: {
    capturedAt: string;    // When we ingested it
  }
}

interface GrantOpportunity {
  postedDate?: string;     // When posted
  closeDate?: string;      // Application deadline
}

interface ImpactEvent {
  date: string;            // When the event occurred
}
```

### API Filters

Each ingest script applies **both** API-level and client-side date filters:

#### USAspending API (`src/data-ingest/apis/usaspending.ts`)
- API filter: `time_period.start_date = "2025-01-01"`
- Client filter: Check `action_date` or `period_of_performance_start_date`
- Field mapping: Maps to `effectiveDate` on Project

#### Grants.gov API (`src/data-ingest/apis/grantsGov.ts`)
- API filter: `postedDateFrom = "2025-01-01"`
- Client filter: Check `postedDate` or `closeDate`
- Field mapping: Maps to `postedDate` and `closeDate` on Grant

#### NSF Awards API (`src/data-ingest/apis/nsfAwards.ts`)
- API filter: `dateStart = "01/01/2025"`
- Client filter: Check `startDate` or `date`
- Field mapping: Maps to `effectiveDate` on Project

### Implementation Pattern

Every ingest script follows this pattern:

```typescript
const MIN_DATE = new Date("2025-01-01T00:00:00Z")

// 1. Request with API-level date filter
const body = {
  filters: {
    time_period: [{ start_date: "2025-01-01", end_date: today }]
  }
}

// 2. Client-side validation for each record
for (const record of results) {
  const effectiveDate = record.action_date || record.start_date
  
  if (effectiveDate) {
    const d = new Date(effectiveDate)
    if (d < MIN_DATE) {
      continue  // Skip pre-2025 records
    }
  }
  
  // Create entity with effectiveDate field
  const project: Project = {
    effectiveDate: effectiveDate ?? undefined,
    // ...other fields
  }
}
```

---

## 2️⃣ Validate After Ingest

### Validation Script

Location: `src/data-ingest/validate.ts`

The validation script runs after every ingest and checks:

1. **ID Integrity**: All entities have unique IDs
2. **Date Coverage**: All dates are >= 2025-01-01
3. **Date Validity**: All date strings parse correctly
4. **Cross-References**: Events refer to existing projects/grants/policies

### Running Validation

```typescript
import { validateData } from '@/data-ingest/validate'

const result = await validateData()

// Returns:
{
  valid: boolean,
  errors: string[],      // Validation failures (blocks)
  warnings: string[],    // Issues to note (doesn't block)
  stats: {
    projects: number,
    grants: number,
    policies: number,
    events: number
  }
}
```

### Error Types

**Errors (fail validation):**
- Missing IDs
- Duplicate IDs
- Invalid date format
- Pre-2025 dates

**Warnings (log but pass):**
- Missing date fields (allowed but noted)
- Dangling cross-references (event refers to deleted project)

### Integration

Validation is called:
1. **In UI**: After manual "Run Crawler" button
2. **In GitHub Action**: After automated daily ingest
3. **On demand**: Can be imported and run anywhere

```typescript
// Example: ImpactLedgerPage.tsx
const handleRunCrawler = async () => {
  await runIngest()
  
  const result = await validateData()
  
  if (result.valid) {
    toast.success("Data validation passed!")
  } else {
    toast.error(`Validation found ${result.errors.length} error(s)`)
  }
}
```

---

## 3️⃣ Guarantee Freshness (Automation + UI)

### Daily GitHub Action

**File**: `.github/workflows/data-discovery.yml`

**Schedule**: Daily at 06:00 UTC (`cron: '0 6 * * *'`)

**Workflow**:
```yaml
1. Checkout repo
2. Install dependencies
3. Run discovery pipeline (with 2025+ filters)
4. Run validation script
5. Generate report
6. Create GitHub issue with results
```

**Date Filter**: Passes `date_range: { start: '2025-01-01', end: today }` to discovery orchestrator

**Validation Step**: Fails the workflow if validation errors detected

### UI Indicators

**Location**: `/impact-ledger` page

**Shows**:
- **Last Updated**: Date of most recent ingest (`crawlerData.lastIngestTimestamp`)
- **Data Coverage**: Min and max `effectiveDate` from all projects (`YYYY-MM-DD → YYYY-MM-DD`)
- **Validation Badge**: Green "2025+ Validated" checkmark if `validationResult.valid`

**Implementation**:
```typescript
function getLastUpdated(crawlerData) {
  if (!crawlerData?.lastIngestTimestamp) return null
  return new Date(crawlerData.lastIngestTimestamp)
    .toISOString()
    .slice(0, 10)
}

function getCoverage(projects) {
  const dates = projects
    .map(p => p.effectiveDate)
    .filter(Boolean)
    .map(d => new Date(d))
  
  return {
    from: min(dates).toISOString().slice(0, 10),
    to: max(dates).toISOString().slice(0, 10)
  }
}
```

**Visual Design**:
```
┌─────────────────────────────────────────────────────┐
│ 📅 Last updated: 2025-01-15                        │
│    Data coverage: 2025-01-01 → 2025-06-30          │
│                                        ✓ 2025+ Validated│
└─────────────────────────────────────────────────────┘
```

---

## Quick Sanity Checks

### Weekly Manual Check

```bash
# Run ingest + validation locally
npm run ingest-and-validate
```

### Debug Route (Optional)

Create `/debug/data` route showing:
- Total counts (projects, grants, policies, events)
- Date ranges (min/max for each entity type)
- Top 5 tags/states
- Last validation result

### Validation Report

After each ingest, check console output:

```
[validate] Checking 42 projects, 18 grants, 3 policies, 12 events
[validate] ✓ All good. Data is 2025+ and references align.
```

Or if issues:

```
[validate] Found issues:
  ERROR: Project usaspending-123 has pre-2025 date: 2024-12-01
  ERROR: Grant grants-gov-456 has invalid date: not-a-date
  WARN: Event event-789 refers to missing project proj-999
```

---

## Date Field Reference

| Entity          | Date Field(s)              | Source Field(s)                          | Required? |
|-----------------|----------------------------|------------------------------------------|-----------|
| Project         | `effectiveDate`            | `action_date`, `start_date`, `date`      | No        |
| GrantOpportunity| `postedDate`, `closeDate`  | `postedDate`, `closeDate`, `closeDateTimeStamp` | No |
| PolicyMemo      | (TBD)                      | `introduced`, `enacted_date`             | No        |
| ImpactEvent     | `date`                     | User-provided or derived                 | Yes       |

---

## Troubleshooting

### "Why am I seeing pre-2025 data?"

1. Check if API supports date filters (some don't)
2. Verify client-side filter is applied after fetch
3. Run validation to catch regressions

### "Validation fails with 'invalid date'"

- Check source API response format
- Verify date parsing logic handles null/undefined
- Ensure date strings are ISO 8601 compatible

### "Coverage shows wrong date range"

- Verify `effectiveDate` is mapped correctly in ingest scripts
- Check that seed data also has correct dates
- Run `validateData()` to see which entities lack dates

### "GitHub Action fails validation"

- Check Action logs for specific errors
- Run validation locally to reproduce
- Fix ingest scripts or schema issues
- Re-run Action manually via `workflow_dispatch`

---

## Maintenance

### Adding New APIs

When adding a new data source:

1. **Schema**: Add date field to entity interface
2. **Ingest**: Apply `MIN_DATE` filter (API + client)
3. **Validation**: Add to `checkDateField()` calls
4. **UI**: Ensure coverage calculation includes new entity

### Changing Date Threshold

To change from 2025+ to a different year:

1. Update `MIN_DATE` in all ingest scripts
2. Update `MIN_DATE` in `validate.ts`
3. Update GitHub Action date filter
4. Update UI labels and documentation

---

## Summary

✅ **Layer 1**: APIs filtered to 2025+ (double-checked client-side)  
✅ **Layer 2**: Validation script catches regressions and data quality issues  
✅ **Layer 3**: Daily automation + UI transparency ensures trust  

**Result**: You can confidently tell policymakers "This data is fresh, validated, and 2025+."
