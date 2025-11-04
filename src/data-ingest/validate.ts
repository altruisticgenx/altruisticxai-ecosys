import { Project, GrantOpportunity, PolicyMemo, ImpactEvent } from "../data/schema"

const MIN_DATE = new Date("2025-01-01T00:00:00Z")

function parseIso(dateStr?: string | null): Date | null {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return Number.isNaN(d.getTime()) ? null : d
}

export async function validateData() {
  const errors: string[] = []
  const warnings: string[] = []

  const projects = (await window.spark.kv.get<Project[]>("crawled-projects")) || []
  const grants = (await window.spark.kv.get<GrantOpportunity[]>("crawled-grants")) || []
  const policies = (await window.spark.kv.get<PolicyMemo[]>("crawled-policies")) || []
  const events = (await window.spark.kv.get<ImpactEvent[]>("impact-events")) || []

  console.log(`[validate] Checking ${projects.length} projects, ${grants.length} grants, ${policies.length} policies, ${events.length} events`)

  const allIds = new Set<string>()
  
  for (const set of [
    ["Project", projects as { id: string; provenance?: { source?: string } }[]],
    ["Grant", grants as { id: string; provenance?: { source?: string } }[]],
    ["Policy", policies as { id: string; provenance?: { source?: string } }[]],
    ["Event", events as { id: string; provenance?: { source?: string } }[]],
  ] as const) {
    const [label, list] = set
    for (const item of list) {
      if (!item.id) {
        errors.push(`${label} missing id: ${JSON.stringify(item).slice(0, 120)}…`)
      }
      if (allIds.has(item.id)) {
        errors.push(`Duplicate id detected: ${label} ${item.id}`)
      }
      allIds.add(item.id)
    }
  }

  const checkDateField = (
    list: any[],
    label: string,
    getter: (x: any) => string | undefined,
  ) => {
    for (const item of list) {
      const raw = getter(item)
      if (!raw) {
        warnings.push(`${label} ${item.id} has no date field (allowed but noted)`)
        continue
      }
      const d = parseIso(raw)
      if (!d) {
        errors.push(`${label} ${item.id} has invalid date: ${raw}`)
        continue
      }
      if (d < MIN_DATE) {
        errors.push(`${label} ${item.id} has pre-2025 date: ${raw}`)
      }
    }
  }

  checkDateField(projects, "Project", (p) => p.effectiveDate)
  checkDateField(grants, "Grant", (g) => g.postedDate ?? g.closeDate)
  checkDateField(events, "Event", (e) => e.date)

  const projectIds = new Set(projects.map((p) => p.id))
  const grantIds = new Set(grants.map((g) => g.id))
  const policyIds = new Set(policies.map((p) => p.id))

  for (const ev of events) {
    ev.relatedProjectIds?.forEach((id) => {
      if (!projectIds.has(id)) {
        warnings.push(`Event ${ev.id} refers to missing project ${id}`)
      }
    })
    ev.relatedGrantIds?.forEach((id) => {
      if (!grantIds.has(id)) {
        warnings.push(`Event ${ev.id} refers to missing grant ${id}`)
      }
    })
    ev.relatedPolicyIds?.forEach((id) => {
      if (!policyIds.has(id)) {
        warnings.push(`Event ${ev.id} refers to missing policy ${id}`)
      }
    })
  }

  const result = {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      projects: projects.length,
      grants: grants.length,
      policies: policies.length,
      events: events.length,
    },
  }

  if (errors.length > 0) {
    console.error("[validate] Found issues:")
    for (const e of errors) console.error("  ERROR:", e)
  }

  if (warnings.length > 0) {
    console.warn("[validate] Found warnings:")
    for (const w of warnings) console.warn("  WARN:", w)
  }

  if (errors.length === 0) {
    console.log("[validate] ✓ All good. Data is 2025+ and references align.")
  }

  return result
}
