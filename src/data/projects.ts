export interface Project {
  id: string
  title: string
  description: string
  sector: string
  techStack: string[]
  origin: "labs" | "consulting" | "internal"
  slug: string
  status?: string
  client?: string
  clientName?: string
  tags?: string[]
  metrics?: Array<{ label: string; value: string }>
  short_kpi_summary?: string
  annual_savings_usd?: number
  payback_months?: number
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Campus Energy Dashboard",
    description: "An open-source energy monitoring and optimization platform designed for university campuses. Provides real-time insights into building energy consumption patterns and actionable recommendations for reducing carbon footprint.",
    sector: "Education & Sustainability",
    techStack: ["React", "D3.js", "Python", "PostgreSQL", "MQTT"],
    origin: "labs",
    slug: "campus-energy-dashboard",
    status: "pilot",
    tags: ["open source", "sustainability", "IoT", "data visualization"],
    metrics: [
      { label: "Campuses", value: "3" },
      { label: "Buildings", value: "20" },
      { label: "Avg. Energy Reduction", value: "15%" }
    ]
  },
  {
    id: "2",
    title: "Local-First AI Audit Toolkit",
    description: "A privacy-preserving toolkit for auditing AI models without cloud dependencies. Enables organizations to evaluate model fairness, bias, and performance metrics entirely on local infrastructure, ensuring sensitive data never leaves organizational boundaries.",
    sector: "AI Ethics & Compliance",
    techStack: ["Electron", "TensorFlow.js", "SQLite", "Vue.js", "WebAssembly"],
    origin: "labs",
    slug: "local-ai-audit-toolkit",
    status: "active",
    tags: ["open source", "AI ethics", "privacy", "bias detection", "compliance"]
  },
  {
    id: "3",
    title: "Open Campus Energy Dataset",
    description: "A comprehensive, anonymized dataset of energy consumption patterns from multiple university buildings over 3+ years. Includes granular hourly data, weather correlations, occupancy patterns, and building characteristics. Designed to accelerate research in building energy optimization and predictive modeling.",
    sector: "Open Data & Research",
    techStack: ["PostgreSQL", "Apache Parquet", "FastAPI", "Jupyter", "OpenAPI"],
    origin: "labs",
    slug: "open-campus-energy-dataset",
    status: "active",
    tags: ["open source", "open data", "energy", "research", "sustainability"]
  },
  {
    id: "4",
    title: "Federated Learning Privacy Framework",
    description: "An experimental framework for training machine learning models across distributed datasets without centralizing sensitive information. Implements differential privacy guarantees and secure aggregation protocols tailored for institutional research collaborations.",
    sector: "Privacy & Machine Learning",
    techStack: ["PyTorch", "gRPC", "Redis", "Docker", "Kubernetes"],
    origin: "labs",
    slug: "federated-learning-privacy",
    status: "active",
    tags: ["open source", "privacy", "federated learning", "machine learning", "healthcare"]
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
    short_kpi_summary: "Monitoring 8 AI models with 65% cost reduction and 120 hrs/month saved in audit time",
    annual_savings_usd: 280000,
    payback_months: 9,
    metrics: [
      { label: "AI Models Monitored", value: "8" },
      { label: "Cost Reduction", value: "65%" },
      { label: "Audit Time Saved", value: "120 hrs/mo" }
    ]
  },
  {
    id: "6",
    title: "Federal Energy Optimization - GSA",
    description: "Adapted our Campus Energy Dashboard for the General Services Administration to monitor and optimize energy usage across 12 federal buildings in the DC metro area. Achieved 18% energy reduction in first year through behavioral insights and predictive analytics.",
    sector: "Government & Sustainability",
    techStack: ["React", "D3.js", "Python", "PostgreSQL", "AWS"],
    origin: "consulting",
    slug: "gsa-energy-optimization",
    status: "active",
    client: "U.S. General Services Administration",
    clientName: "U.S. GSA",
    tags: ["consulting", "government", "sustainability", "energy"],
    short_kpi_summary: "12 buildings optimized with 18% energy reduction and $450K annual savings, 14-month payback",
    annual_savings_usd: 450000,
    payback_months: 14,
    metrics: [
      { label: "Buildings", value: "12" },
      { label: "Energy Reduction", value: "18%" },
      { label: "Annual Savings", value: "$450K" },
      { label: "Payback Period", value: "14 months" }
    ]
  },
  {
    id: "7",
    title: "Multi-Hospital Federated ML Platform - Northeast Consortium",
    description: "Deployed production federated learning infrastructure enabling 7 hospitals to collaboratively train diagnostic AI models without sharing patient data. First cross-institutional ML collaboration to meet both HIPAA and state-level privacy requirements.",
    sector: "Healthcare & Privacy",
    techStack: ["PyTorch", "Kubernetes", "PostgreSQL", "FastAPI", "Azure"],
    origin: "consulting",
    slug: "northeast-federated-ml",
    status: "active",
    client: "Northeast Healthcare Consortium",
    clientName: "Northeast Healthcare Consortium",
    tags: ["consulting", "healthcare", "federated learning", "privacy", "HIPAA"],
    short_kpi_summary: "7 hospitals collaborating with +12% model accuracy gain and 18-month payback period",
    annual_savings_usd: 620000,
    payback_months: 18,
    metrics: [
      { label: "Hospitals", value: "7" },
      { label: "Model Accuracy Gain", value: "+12%" },
      { label: "Payback Period", value: "18 months" }
    ]
  },
  {
    id: "8",
    title: "University Research Data Commons - California System",
    description: "Established standardized data sharing framework across 9 UC campuses based on our Open Campus Data Licensing Model. Created unified API and governance structure enabling collaborative research while protecting institutional data.",
    sector: "Education & Open Data",
    techStack: ["FastAPI", "PostgreSQL", "React", "Kubernetes", "S3"],
    origin: "consulting",
    slug: "uc-data-commons",
    status: "active",
    client: "University of California System",
    clientName: "University of California",
    tags: ["consulting", "education", "open data", "research", "governance"],
    short_kpi_summary: "9 campuses unified with 45+ research projects enabled and 120+ datasets shared",
    annual_savings_usd: 380000,
    payback_months: 16,
    metrics: [
      { label: "Campuses", value: "9" },
      { label: "Research Projects Enabled", value: "45+" },
      { label: "Datasets Shared", value: "120+" }
    ]
  }
]
