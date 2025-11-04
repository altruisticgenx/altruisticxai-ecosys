import { Project } from "@/data/schema"


  for (const p of projects) {
      const d = new Date(p.provena

  for (const p of projects) {
    if (p.provenance?.capturedAt) {
      const d = new Date(p.provenance.capturedAt)
      if (!Number.isNaN(d.getTime())) capturedTimes.push(d)
    }
  }
  for (const e of events) {
    if (e.provenance?.capturedAt) {
      const d = new Date(e.provenance.capturedAt)
      if (!Number.isNaN(d.getTime())) capturedTimes.push(d)
    }
  }

  if (capturedTimes.length === 0) return null

  const latest = new Date(Math.max(...capturedTimes.map((d) => d.getTime())))
  return latest.toISOString().slice(0, 10)
 

export function getCoverage(projects: Project[], events: ImpactEvent[]) {
  const dates: Date[] = []

  projects.forEach((p) => {
    if (p.effectiveDate) {
      const d = new Date(p.effectiveDate)
      if (!Number.isNaN(d.getTime())) dates.push(d)
    }
  })
  events.forEach((e) => {
    if (e.date) {
      const d = new Date(e.date)
      if (!Number.isNaN(d.getTime())) dates.push(d)
    }
  })

  if (dates.length === 0) return null

  const min = new Date(Math.min(...dates.map((d) => d.getTime())))
  const max = new Date(Math.max(...dates.map((d) => d.getTime())))

  return {
    from: min.toISOString().slice(0, 10),
    to: max.toISOString().slice(0, 10),
  }
}
      if (!Number.isNaN(d.getTime())) dates.push(d)
    }
  })
  events.forEach((e) => {
    if (e.date) {
      const d = new Date(e.date)
      if (!Number.isNaN(d.getTime())) dates.push(d)
    }
  })

  if (dates.length === 0) return null

  const min = new Date(Math.min(...dates.map((d) => d.getTime())))
  const max = new Date(Math.max(...dates.map((d) => d.getTime())))

  return {
    from: min.toISOString().slice(0, 10),
    to: max.toISOString().slice(0, 10),
  }
}
