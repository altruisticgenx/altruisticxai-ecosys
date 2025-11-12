// data/projects.ts

export type ProjectOrigin = "labs" | "consulting";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  sector: string;
  techStack: string[];
  origin: ProjectOrigin;
  slug: string;
  status?: "active" | "planned" | "completed" | string;
  tags?: string[];
  clientName?: string;
  short_kpi_summary?: string;
  annual_savings_usd?: number;
  payback_months?: number;
  metrics?: ProjectMetric[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Campus Energy Intelligence Dashboard",
    description:
      "Interactive campus-wide energy dashboard built for a university, combining meter data, weather, and occupancy to surface real-time optimization opportunities.",
    sector: "Higher Education & Energy",
    techStack: ["React", "D3.js", "Python", "PostgreSQL"],
    origin: "labs",
    slug: "campus-energy-dashboard",
    status: "active",
    tags: ["open source", "energy", "visualization", "campus"],
    metrics: [
      { label: "Avg. Energy Reduction", value: "12%" },
      { label: "Buildings Covered", value: "24" },
      { label: "Data Latency", value: "< 5 min" },
    ],
  },
  {
    id: "2",
    title: "Federated Learning Toolkit",
    description:
      "Open-source toolkit for privacy-preserving machine learning across distributed datasets, enabling training without centralizing sensitive data.",
    sector: "Healthcare & Privacy",
    techStack: ["PyTorch", "Python", "Docker", "FastAPI"],
    origin: "labs",
    slug: "federated-learning-toolkit",
    status: "active",
    tags: ["open source", "privacy", "federated learning", "machine learning"],
    metrics: [
      { label: "Downloads", value: "5K+" },
      { label: "Contributors", value: "12" },
      { label: "Organizations Using", value: "8" },
    ],
  },
  {
    id: "3",
    title: "Healthcare AI Compliance Suite",
    description:
      "Local-first AI audit toolkit for healthcare organizations to monitor AI model behavior and compliance against internal and regulatory standards.",
    sector: "Healthcare & AI Ethics",
    techStack: ["Electron", "TensorFlow.js", "PostgreSQL", "React"],
    origin: "labs",
    slug: "healthcare-ai-compliance",
    status: "active",
    tags: ["open source", "healthcare", "AI ethics", "compliance"],
    metrics: [
      { label: "Models Supported", value: "15+" },
      { label: "Compliance Checks", value: "50+" },
      { label: "Organizations", value: "6" },
    ],
  },
  {
    id: "4",
    title: "Local-First AI Audit Toolkit",
    description:
      "Privacy-focused toolkit for auditing AI models without sending any underlying data to external services, designed for regulated sectors.",
    sector: "AI Ethics & Privacy",
    techStack: ["Electron", "TensorFlow.js", "Python", "React"],
    origin: "labs",
    slug: "local-first-ai-audit",
    status: "active",
    tags: ["open source", "privacy", "AI ethics", "audit"],
    metrics: [
      { label: "Audit Types", value: "12" },
      { label: "Models Analyzed", value: "200+" },
      { label: "Users", value: "1K+" },
    ],
  },
  {
    id: "5",
    title: "Healthcare AI Compliance Suite – NYU Langone",
    description:
      "Custom implementation of the Local-First AI Audit Toolkit for NYU Langone Health's diagnostic AI systems, enabling continuous monitoring across models under HIPAA.",
    sector: "Healthcare",
    techStack: ["Electron", "TensorFlow.js", "PostgreSQL", "React", "Docker"],
    origin: "consulting",
    slug: "nyu-healthcare-ai",
    status: "active",
    clientName: "NYU Langone Health",
    tags: ["consulting", "healthcare", "AI ethics", "compliance", "HIPAA"],
    short_kpi_summary:
      "Monitored 8 diagnostic AI models with 65% audit cost reduction and 120 hours/month saved.",
    annual_savings_usd: 320000,
    payback_months: 9,
    metrics: [
      { label: "AI Models Monitored", value: "8" },
      { label: "Cost Reduction", value: "65%" },
      { label: "Audit Time Saved", value: "120 hrs/mo" },
    ],
  },
  {
    id: "6",
    title: "Regional Healthcare AI Audit Consortium",
    description:
      "Multi-hospital rollout of the Local-First AI Audit Toolkit for a Northeast healthcare consortium, aligning shared governance across several ML models.",
    sector: "Healthcare",
    techStack: ["Electron", "Python", "PostgreSQL", "React"],
    origin: "consulting",
    slug: "northeast-healthcare-consortium",
    status: "active",
    clientName: "Northeast Healthcare Consortium",
    tags: ["consulting", "consortium", "healthcare", "AI governance"],
    short_kpi_summary:
      "7 hospitals collaborating on 3 ML models benefiting 50K+ patients with 100% privacy compliance.",
    annual_savings_usd: 620000,
    payback_months: 18,
    metrics: [
      { label: "Hospitals", value: "7" },
      { label: "Models Deployed", value: "3" },
      { label: "Patients Benefited", value: "50K+" },
      { label: "Privacy Compliance", value: "100%" },
    ],
  },
  {
    id: "7",
    title: "State University Energy Optimization Platform",
    description:
      "Campus-wide energy dashboard deployment across 3 state university campuses, integrating real-time meter data with predictive analytics for demand response.",
    sector: "Education",
    techStack: ["React", "D3.js", "Python", "TimescaleDB", "FastAPI"],
    origin: "consulting",
    slug: "state-university-energy",
    status: "active",
    clientName: "State University System",
    tags: ["consulting", "education", "energy", "sustainability"],
    short_kpi_summary:
      "3 campuses, 72 buildings monitored, 15% energy reduction, $890K annual savings.",
    annual_savings_usd: 890000,
    payback_months: 14,
    metrics: [
      { label: "Campuses", value: "3" },
      { label: "Buildings", value: "72" },
      { label: "Energy Reduction", value: "15%" },
      { label: "Students Impacted", value: "45K" },
    ],
  },
  {
    id: "8",
    title: "Municipal Court AI Bias Detection System",
    description:
      "Deployment of AI fairness monitoring system across county court system to detect and flag potential bias in sentencing recommendation algorithms.",
    sector: "Law",
    techStack: ["Python", "Scikit-learn", "PostgreSQL", "React", "FastAPI"],
    origin: "consulting",
    slug: "county-court-ai-fairness",
    status: "active",
    clientName: "County Court System",
    tags: ["consulting", "law", "AI ethics", "fairness"],
    short_kpi_summary:
      "3 jurisdictions, 12 judges, bias flags on 8% of cases, 95% transparency score.",
    annual_savings_usd: 180000,
    payback_months: 11,
    metrics: [
      { label: "Jurisdictions", value: "3" },
      { label: "Cases Analyzed", value: "15K+" },
      { label: "Bias Flags", value: "8%" },
      { label: "Transparency Score", value: "95%" },
    ],
  },
  {
    id: "9",
    title: "Regional Utility Grid AI Transparency Framework",
    description:
      "Implementation of explainable AI framework for demand forecasting and load balancing across regional utility grid serving 2M+ customers.",
    sector: "Energy",
    techStack: ["Python", "TensorFlow", "SHAP", "Apache Kafka", "Grafana"],
    origin: "consulting",
    slug: "regional-utility-grid-ai",
    status: "active",
    clientName: "Regional Power Authority",
    tags: ["consulting", "energy", "utilities", "explainability"],
    short_kpi_summary:
      "2M+ customers served, 9% peak load reduction, $2.4M annual savings, full regulatory compliance.",
    annual_savings_usd: 2400000,
    payback_months: 22,
    metrics: [
      { label: "Customers", value: "2M+" },
      { label: "Peak Load Reduction", value: "9%" },
      { label: "Compliance Score", value: "100%" },
      { label: "Grid Stability", value: "+18%" },
    ],
  },
  {
    id: "10",
    title: "National Lab Federated Research Platform",
    description:
      "Privacy-preserving federated learning platform deployment across 5 national research laboratories enabling collaborative AI research without data sharing.",
    sector: "Research",
    techStack: ["PyTorch", "Flower", "Python", "Docker", "Kubernetes"],
    origin: "consulting",
    slug: "national-lab-federated-platform",
    status: "active",
    clientName: "National Research Consortium",
    tags: ["consulting", "research", "federated learning", "privacy"],
    short_kpi_summary:
      "5 national labs, 120+ researchers, 8 collaborative projects, zero data transfers.",
    annual_savings_usd: 1100000,
    payback_months: 20,
    metrics: [
      { label: "Labs Connected", value: "5" },
      { label: "Researchers", value: "120+" },
      { label: "Projects", value: "8" },
      { label: "Data Centralization", value: "0%" },
    ],
  },
  {
    id: "11",
    title: "Community College AI Literacy Program",
    description:
      "Comprehensive AI ethics and transparency curriculum deployment with hands-on labs using open-source audit tools for community college network.",
    sector: "Education",
    techStack: ["Jupyter", "Python", "Scikit-learn", "TensorFlow", "React"],
    origin: "consulting",
    slug: "community-college-ai-literacy",
    status: "active",
    clientName: "Community College District",
    tags: ["consulting", "education", "AI literacy", "workforce"],
    short_kpi_summary:
      "12 colleges, 2,400 students trained, 95% completion rate, 78% job placement.",
    annual_savings_usd: 450000,
    payback_months: 8,
    metrics: [
      { label: "Colleges", value: "12" },
      { label: "Students Trained", value: "2.4K" },
      { label: "Completion Rate", value: "95%" },
      { label: "Job Placement", value: "78%" },
    ],
  },
  {
    id: "12",
    title: "State Legal Aid AI Case Triage System",
    description:
      "AI-powered case triage and recommendation system for state legal aid network with built-in fairness monitoring and explainability features.",
    sector: "Law",
    techStack: ["Python", "spaCy", "PostgreSQL", "React", "FastAPI"],
    origin: "consulting",
    slug: "legal-aid-case-triage",
    status: "active",
    clientName: "State Legal Aid Network",
    tags: ["consulting", "law", "access to justice", "AI ethics"],
    short_kpi_summary:
      "18 legal aid offices, 25K cases triaged, 40% faster intake, 100% fairness compliance.",
    annual_savings_usd: 380000,
    payback_months: 12,
    metrics: [
      { label: "Offices", value: "18" },
      { label: "Cases Triaged", value: "25K" },
      { label: "Intake Time Saved", value: "40%" },
      { label: "Fairness Score", value: "100%" },
    ],
  },
];