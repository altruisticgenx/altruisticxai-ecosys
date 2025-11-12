export interface ImpactEvent {
  id: string
  date: string
  type: "pilot" | "policy" | "publication" | "partnership"
  title: string
  description: string
  references: string[]
  metrics?: {
    label: string
    value: string
  }[]
  provenance?: {
    capturedAt?: string
  }
}

export const impactEvents = [
  {
    id: "ie-001",
    date: "2024-03-15",
    type: "pilot",
    title: "UC Berkeley Energy Dashboard Deployment",
    description: "Deployed Campus Energy Explainability Dashboard across 8 campus buildings, providing real-time transparency to 3,500 students and faculty.",
    references: ["1"],
    metrics: [
      { label: "Buildings", value: "8" },
      { label: "Active Users", value: "3,500" },
      { label: "Energy Saved", value: "12%" }
    ]
  },
  {
    id: "ie-002",
    date: "2024-02-28",
    type: "policy",
    title: "NY Federated Learning Standards Adopted",
    description: "New York State Department of Health adopts federated learning privacy framework, enabling collaborative AI research across 15 hospital systems.",
    references: ["pm-004", "4"],
    metrics: [
      { label: "Hospitals", value: "15" },
      { label: "Patients Protected", value: "2.3M" }
    ]
  },
  {
    id: "ie-003",
    date: "2024-02-10",
    type: "publication",
    title: "Open Campus Energy Dataset v2.0 Released",
    description: "Published comprehensive 3-year energy consumption dataset from multiple university facilities, downloaded by 127 research teams globally.",
    references: ["3"],
    metrics: [
      { label: "Downloads", value: "127" },
      { label: "Data Points", value: "8.2M" },
      { label: "Institutions", value: "43" }
    ]
  },
  {
    id: "ie-004",
    date: "2024-01-15",
    type: "policy",
    title: "California Energy Transparency Bill Introduced",
    description: "AB-1847 introduced in California Assembly, requiring real-time energy disclosure for all public universities, based on our policy memo and pilot results.",
    references: ["pm-001", "1"],
    metrics: [
      { label: "Campuses Affected", value: "33" },
      { label: "Students Impacted", value: "750K" }
    ]
  },
  {
    id: "ie-005",
    date: "2023-12-05",
    type: "partnership",
    title: "AI Audit Toolkit - Government Partnership",
    description: "Partnered with GSA to pilot Local-First AI Audit Toolkit across 5 federal agencies, enabling sovereign AI compliance auditing.",
    references: ["2"],
    metrics: [
      { label: "Agencies", value: "5" },
      { label: "Models Audited", value: "23" },
      { label: "Cost Savings", value: "$450K" }
    ]
  },
  {
    id: "ie-006",
    date: "2023-11-18",
    type: "pilot",
    title: "Stanford Energy Dashboard Go-Live",
    description: "Second university deployment of energy dashboard, expanding to 12 buildings with enhanced predictive analytics features.",
    references: ["1"],
    metrics: [
      { label: "Buildings", value: "12" },
      { label: "Students", value: "5,200" },
      { label: "Reduction", value: "18%" }
    ]
  },
  {
    id: "ie-007",
    date: "2023-10-01",
    type: "publication",
    title: "Federated Learning Framework Open-Sourced",
    description: "Released privacy-preserving federated learning framework on GitHub, enabling institutions to collaborate on AI without sharing sensitive data.",
    references: ["4"],
    metrics: [
      { label: "GitHub Stars", value: "1,240" },
      { label: "Contributors", value: "18" },
      { label: "Deployments", value: "7" }
    ]
  },
  {
    id: "ie-008",
    date: "2023-08-22",
    type: "policy",
    title: "Multi-State Open Data Compact Signed",
    description: "12 universities across 5 states adopt our open campus data licensing model, creating largest public university operational dataset.",
    references: ["pm-003", "3"],
    metrics: [
      { label: "Universities", value: "12" },
      { label: "States", value: "5" },
      { label: "Students Served", value: "380K" }
    ]
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
