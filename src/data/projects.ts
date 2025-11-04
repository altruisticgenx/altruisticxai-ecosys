export interface Project {
  id: string
  title: string
  description: string
  sector: string
  techStack: string[]
  origin: "labs" | "consulting"
  slug: string
  status?: string
  client?: string
  clientName?: string
  tags?: string[]
  metrics?: Array<{ label: string; value: string }>
  payback_months?: number
  annual_savings_usd?: number
  short_kpi_summary?: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Campus Energy Dashboard",
    description: "Real-time energy monitoring dashboard for university campuses to track and reduce energy consumption.",
    sector: "Sustainability",
    techStack: ["React", "D3.js", "Python", "PostgreSQL"],
    origin: "labs",
    slug: "campus-energy-dashboard",
    status: "active",
    tags: ["open source", "sustainability", "energy", "dashboard"],
    metrics: [
      { label: "Avg. Energy Reduction", value: "18%" },
      { label: "Campuses Using", value: "12" },
      { label: "Cost Savings", value: "$2M+" }
    ]
  },
  {
    id: "2",
    title: "Federated Learning Toolkit",
    description: "An open-source toolkit for privacy-preserving machine learning across distributed datasets.",
    sector: "Healthcare & Privacy",
    techStack: ["PyTorch", "Python", "Docker", "FastAPI"],
    origin: "labs",
    slug: "federated-learning-toolkit",
    status: "active",
    tags: ["open source", "privacy", "federated learning", "machine learning"],
    metrics: [
      { label: "Downloads", value: "5K+" },
      { label: "Contributors", value: "12" },
      { label: "Organizations Using", value: "8" }
    ]
  },
  {
    id: "3",
    title: "Healthcare AI Compliance Suite",
    description: "Local-first AI audit toolkit for healthcare organizations to monitor AI model compliance.",
    sector: "Healthcare & AI Ethics",
    techStack: ["Electron", "TensorFlow.js", "PostgreSQL", "React"],
    origin: "labs",
    slug: "healthcare-ai-compliance",
    status: "active",
    tags: ["open source", "healthcare", "AI ethics", "compliance"],
    metrics: [
      { label: "Models Supported", value: "15+" },
      { label: "Compliance Checks", value: "50+" },
      { label: "Organizations", value: "6" }
    ]
  },
  {
    id: "4",
    title: "Local-First AI Audit Toolkit",
    description: "Privacy-focused toolkit for auditing AI models without sending data to external services.",
    sector: "AI Ethics & Privacy",
    techStack: ["Electron", "TensorFlow.js", "Python", "React"],
    origin: "labs",
    slug: "local-first-ai-audit",
    status: "active",
    tags: ["open source", "privacy", "AI ethics", "audit"],
    metrics: [
      { label: "Audit Types", value: "12" },
      { label: "Models Analyzed", value: "200+" },
      { label: "Users", value: "1K+" }
    ]
  },
  {
    id: "5",
    title: "Healthcare AI Compliance Suite - NYU Langone",
    description: "Custom implementation of our Local-First AI Audit Toolkit for NYU Langone Health's diagnostic AI systems. Enabled continuous compliance monitoring across 8 AI models while maintaining HIPAA requirements and reducing audit costs by 65%.",
    sector: "Healthcare & AI Ethics",
    techStack: ["Electron", "TensorFlow.js", "PostgreSQL", "React", "Docker"],
    origin: "consulting",
    slug: "nyu-healthcare-ai",
    status: "active",
    client: "NYU Langone Health",
    clientName: "NYU Langone Health",
    tags: ["consulting", "healthcare", "AI ethics", "compliance", "HIPAA"],
    short_kpi_summary: "8 AI models with continuous HIPAA-compliant monitoring, 65% cost reduction, 120 hrs/mo saved",
    payback_months: 12,
    annual_savings_usd: 450000,
    metrics: [
      { label: "AI Models Monitored", value: "8" },
      { label: "Cost Reduction", value: "65%" },
      { label: "Audit Time Saved", value: "120 hrs/mo" }
    ]
  },
  {
    id: "6",
    title: "Federated Healthcare Analytics - Northeast Consortium",
    description: "Privacy-preserving federated learning implementation for collaborative medical research across 7 hospitals. Enabled multi-institutional ML model training while maintaining full HIPAA compliance and patient privacy.",
    sector: "Healthcare & Privacy",
    techStack: ["PyTorch", "Python", "Docker", "FastAPI", "Kubernetes"],
    origin: "consulting",
    slug: "northeast-federated-healthcare",
    status: "active",
    client: "Northeast Healthcare Consortium",
    clientName: "Northeast Healthcare Consortium",
    tags: ["consulting", "healthcare", "privacy", "federated learning", "HIPAA"],
    short_kpi_summary: "7 hospitals collaborating on 3 ML models benefiting 50K+ patients with 100% privacy compliance",
    payback_months: 18,
    annual_savings_usd: 620000,
    metrics: [
      { label: "Hospitals", value: "7" },
      { label: "Models Deployed", value: "3" },
      { label: "Patients Benefited", value: "50K+" },
      { label: "Privacy Compliance", value: "100%" }
    ]
  }
]
