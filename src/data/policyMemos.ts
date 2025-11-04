export interface PolicyMemo {
  id: string
  title: string
  status: "draft" | "published" | "implemented"
  jurisdiction: string
  relatedProjects: string[]
  summary: string
  datePublished?: string
}

export const policyMemos: PolicyMemo[] = [
  {
    id: "pm-001",
    title: "Building Energy Transparency Standards for Public Universities",
    status: "published",
    jurisdiction: "California",
    relatedProjects: ["1", "3"],
    summary: "Proposes mandatory real-time energy disclosure requirements for public university facilities, modeled after successful pilot implementations. Includes technical specifications for data granularity, API standards, and student accessibility requirements.",
    datePublished: "2024-01-15"
  },
  {
    id: "pm-002",
    title: "Local-First AI Audit Requirements for Government Contractors",
    status: "draft",
    jurisdiction: "Federal",
    relatedProjects: ["2"],
    summary: "Framework for requiring AI vendors serving government agencies to provide local-first auditing capabilities. Addresses sovereignty concerns and reduces vendor lock-in while maintaining compliance standards.",
    datePublished: undefined
  },
  {
    id: "pm-003",
    title: "Open Campus Data Licensing Model for Research Institutions",
    status: "implemented",
    jurisdiction: "Multi-State",
    relatedProjects: ["3"],
    summary: "Template licensing agreement enabling universities to share anonymized operational data for research purposes while maintaining privacy protections. Adopted by 12 institutions across 5 states.",
    datePublished: "2023-08-22"
  },
  {
    id: "pm-004",
    title: "Federated Learning Privacy Standards for Healthcare Collaborations",
    status: "published",
    jurisdiction: "New York",
    relatedProjects: ["4"],
    summary: "Technical standards and legal framework for healthcare institutions to collaborate on AI model development using federated learning techniques. Ensures HIPAA compliance while enabling multi-institutional research.",
    datePublished: "2024-02-28"
  }
]
