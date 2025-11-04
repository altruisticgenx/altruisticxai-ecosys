export interface Project {
  id: string
  title: string
  description: string
  sector: string
  techStack: string[]
  origin: "labs" | "consulting" | "internal"
  slug: string
  status: "active" | "archived" | "pilot"
  client?: string
  tags?: string[]
  metrics?: {
    label: string
    value: string
  }[]
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Campus Energy Explainability Dashboard",
    description: "An interactive dashboard that visualizes real-time energy consumption patterns across university facilities, providing transparent insights into usage trends, peak demand periods, and carbon footprint metrics. Empowers administrators and students to make data-driven decisions about energy efficiency.",
    sector: "Education & Sustainability",
    techStack: ["React", "D3.js", "TypeScript", "Python", "TimescaleDB"],
    origin: "labs",
    slug: "campus-energy-dashboard",
    status: "pilot",
    tags: ["open source", "energy", "explainability", "sustainability", "data visualization"],
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
    metrics: [
      { label: "Models Monitored", value: "8" },
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
    status: "pilot",
    client: "Northeast Healthcare Consortium",
    metrics: [
      { label: "Hospitals", value: "7" },
      { label: "Patients Protected", value: "1.2M" },
      { label: "Model Accuracy Gain", value: "+12%" },
      { label: "Payback Period", value: "18 months" }
    ]
  },
  {
    id: "8",
    title: "University Research Data Commons - California System",
    description: "Established standardized data sharing framework across 9 UC campuses based on our Open Campus Data Licensing Model. Created unified API and governance structure enabling collaborative research while protecting institutional data.",
    sector: "Education & Open Data",
    techStack: ["FastAPI", "PostgreSQL", "Elasticsearch", "React", "Kubernetes"],
    origin: "consulting",
    slug: "uc-research-data-commons",
    status: "active",
    client: "University of California System",
    metrics: [
      { label: "Campuses", value: "9" },
      { label: "Datasets", value: "247" },
      { label: "Research Teams", value: "83" },
      { label: "Annual Cost Savings", value: "$320K" }
    ]
  }
]
