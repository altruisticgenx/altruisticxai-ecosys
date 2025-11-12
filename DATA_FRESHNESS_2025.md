# 2025+ Data Guarantee: What Years Are Included & How The Site Reflects It

## Executive Summary

**All federal data ingested into AltruisticXAI is guaranteed to be from 2025 or later.** This document proves it.

## What Years Are Included?

### ✅ Included: 2025 → Present

All data ingestion APIs are configured with strict date filters:

- **USAspending.gov**: `start_date: "2025-01-01"` (line 68, `src/data-ingest/apis/usaspending.ts`)
- **NSF Awards**: `dateStart: "01/01/2025"` (line 41, `src/data-ingest/apis/nsfAwards.ts`)
- **Grants.gov**: `postedDateFrom: "2025-01-01"` (line 70, `src/data-ingest/apis/grantsGov.ts`)
- **All other APIs**: Client-side filtering enforces `MIN_DATE = new Date("2025-01-01T00:00:00Z")`

### ❌ Excluded: Pre-2025

- API-level filters **reject** data before 2025-01-01
- Client-side validation **skips** any records with dates < 2025-01-01
- Validation script **flags errors** if pre-2025 data slips through

## How The Site Reflects This

### 1. **Data Integration Page** (`/data-integration`)

**Visible Indicators:**

```
┌────────────────────────────────────────────────────────────────┐
│ 🔔 2025+ Data Only: All federal data sources (USAspending,    │
│    NSF Awards, Grants.gov) are filtered to include only       │
│    records from 2025 onwards. Multi-layer validation ensures  │
│    data freshness and accuracy.                               │
└────────────────────────────────────────────────────────────────┘
```

**After Running Crawler:**

```
┌────────────────────────────────────────────────────────────────┐
│ 📅 Last crawled: 2025-01-15, 3:42 PM                          │
│    Data coverage: 2025-01-01 → 2025-06-30                     │
│                                        ✓ 2025+ Validated (47 projects) │
└────────────────────────────────────────────────────────────────┘
```

**Location in Code:**
- Alert banner: Lines 126-136 in `src/pages/DataIntegrationPage.tsx`
- Date coverage display: Lines 593-615 in `src/pages/DataIntegrationPage.tsx`
- Validation badge: Lines 615-621 in `src/pages/DataIntegrationPage.tsx`

### 2. **Impact Ledger Page** (`/impact-ledger`)

**Visible Indicators:**

```
┌────────────────────────────────────────────────────────────────┐
│ 📅 Last updated: 2025-01-15                                   │
│    Data coverage: 2025-01-01 → 2025-06-30                     │
│                                        ✓ 2025+ Validated       │
└────────────────────────────────────────────────────────────────┘
```

**Location in Code:**
- Date coverage calculation: Lines 20-39 in `src/pages/ImpactLedgerPage.tsx`
- Display component: Lines 123-147 in `src/pages/ImpactLedgerPage.tsx`
- Validation badge: Lines 140-146 in `src/pages/ImpactLedgerPage.tsx`

### 3. **Toast Notifications**

When user runs the crawler:

```
✓ Crawled 47 projects!
  From 6 sources - 2025+ validated ✓
```

**Location in Code:**
- Toast with validation: Lines 59-71 in `src/pages/DataIntegrationPage.tsx`

### 4. **Validation Errors (If Any)**

If pre-2025 data somehow gets through (shouldn't happen):

```
❌ Validation Errors (2):
   • Project usaspending-123 has pre-2025 date: 2024-12-01
   • Grant grants-gov-456 has invalid date: not-a-date
```

**Location in Code:**
- Error display: Lines 584-600 in `src/pages/DataIntegrationPage.tsx`

## Three-Layer Validation System

### Layer 1: Filter at API Level

**Where:** `src/data-ingest/apis/`

Every API ingest script:
1. Sends date filter in API request body/params
2. Double-checks each record's date field client-side
3. Skips records with dates < 2025-01-01

**Example (USAspending):**
```typescript
// API-level filter (line 66-71)
time_period: [{
  start_date: "2025-01-01",
  end_date: new Date().toISOString().split('T')[0],
}]

// Client-side double-check (line 152-157)
if (effectiveDate) {
  const d = new Date(effectiveDate)
  if (d < MIN_DATE) {
    continue  // Skip this record
  }
}
```

### Layer 2: Validate After Ingest

**Where:** `src/data-ingest/validate.ts`

Validation script checks:
- ✓ All dates are >= 2025-01-01
- ✓ All dates parse correctly
- ✓ All IDs are unique
- ✓ Cross-references are valid

**Runs:**
- After manual "Run Crawler" button (UI)
- After automated daily ingest (GitHub Action)
- On-demand via `validateData()` import

### Layer 3: Daily Automation + UI Transparency

**Where:** `.github/workflows/data-discovery.yml`

GitHub Action runs daily at 06:00 UTC:
1. Runs full ingest with 2025+ filters
2. Runs validation script
3. Generates report
4. Creates issue if validation fails

**UI shows:**
- Last crawl timestamp
- Data coverage (min → max date)
- Validation badge (✓ 2025+ Validated)

## Proof Points

### Code References

1. **USAspending API Filter**
   - File: `src/data-ingest/apis/usaspending.ts`
   - Line 68: `start_date: "2025-01-01"`
   - Line 154-157: Client-side MIN_DATE check

2. **NSF Awards API Filter**
   - File: `src/data-ingest/apis/nsfAwards.ts`
   - Line 41: `dateStart: "01/01/2025"`
   - Line 69-74: Client-side MIN_DATE check

3. **Grants.gov API Filter**
   - File: `src/data-ingest/apis/grantsGov.ts`
   - Line 70: `postedDateFrom: "2025-01-01"`
   - Line 108-118: Client-side MIN_DATE check

4. **Validation Script**
   - File: `src/data-ingest/validate.ts`
   - Checks all date fields against 2025-01-01 threshold

5. **UI Indicators**
   - File: `src/pages/DataIntegrationPage.tsx`
   - Lines 126-136: Alert banner for 2025+ guarantee
   - Lines 593-621: Date coverage + validation badge

6. **Impact Ledger Indicators**
   - File: `src/pages/ImpactLedgerPage.tsx`
   - Lines 123-147: Date coverage display

### Documentation

- **DATA_VALIDATION_2025.md**: Comprehensive validation architecture
- **GRANTS_GOV_INTEGRATION.md**: Grants.gov API integration details
- **DATA_INTEGRATION_ARCHITECTURE.md**: Overall data pipeline architecture

## User-Facing Evidence

### Before Running Crawler

User sees:
- Alert: "2025+ Data Only" banner on Data Integration page
- Empty state: "No data crawled yet"

### After Running Crawler

User sees:
- "Last crawled: [timestamp]"
- "Data coverage: 2025-01-01 → 2025-06-30" (actual dates vary)
- "✓ 2025+ Validated (47 projects)" (actual count varies)

### If Validation Fails

User sees:
- Red alert box with specific errors
- List of projects/grants with date issues
- Clear indication that data needs attention

## For Policymakers & Stakeholders

**You can confidently state:**

> "All federal data integrated into the AltruisticXAI platform is from 2025 onwards. Our three-layer validation system—API-level filtering, automated validation scripts, and daily CI/CD checks—ensures data freshness and accuracy. The UI displays data coverage ranges and validation status transparently."

**Verification Steps:**

1. Visit `/data-integration`
2. Look for "2025+ Data Only" alert banner
3. Click "Run Full Crawler"
4. Check date coverage display (should show 2025-XX-XX → 2025-XX-XX)
5. Verify "✓ 2025+ Validated" badge appears

## Troubleshooting

### "I see pre-2025 data!"

This shouldn't happen. If it does:
1. Check validation report for errors
2. Review ingest logs for API filter failures
3. Verify MIN_DATE constant is set correctly
4. Run validation script manually: `await validateData()`

### "Validation fails with date errors"

Possible causes:
- API returned invalid date format
- Date parsing logic needs adjustment
- Time zone conversion issue

Fix:
1. Check console logs for specific error
2. Review ingest script for affected API
3. Update date parsing logic if needed

### "Coverage shows wrong date range"

Check:
- Are `effectiveDate` fields mapped correctly?
- Are seed data projects also 2025+?
- Run validation to identify which entities lack dates

## Summary

| Question | Answer |
|----------|--------|
| **What years are included?** | 2025 → Present only |
| **How do we enforce this?** | 3-layer validation (API filter + client check + validation script) |
| **Where does the UI show this?** | Data Integration page + Impact Ledger page + toast notifications |
| **How fresh is the data?** | Daily automated crawler + manual refresh available |
| **Can we trust it?** | Yes - multi-layer validation + transparent UI indicators |

---

**Last Updated:** 2025-01-15  
**Maintained By:** AltruisticXAI Team
