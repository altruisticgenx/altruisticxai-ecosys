export interface Project {
  id: string
  title: string
  description: string
  sector: string
  techStack: string[]
  origin: "labs" | "client" | "internal"
  slug: string
  status: "active" | "archived" | "pilot"
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
    status: "pilot"
  },
  {
    id: "2",
    title: "Local-First AI Audit Toolkit",
    description: "A privacy-preserving toolkit for auditing AI models without cloud dependencies. Enables organizations to evaluate model fairness, bias, and performance metrics entirely on local infrastructure, ensuring sensitive data never leaves organizational boundaries.",
    sector: "AI Ethics & Compliance",
    techStack: ["Electron", "TensorFlow.js", "SQLite", "Vue.js", "WebAssembly"],
    origin: "labs",
    slug: "local-ai-audit-toolkit",
    status: "active"
  },
  {
    id: "3",
    title: "Open Campus Energy Dataset",
    description: "A comprehensive, anonymized dataset of energy consumption patterns from multiple university buildings over 3+ years. Includes granular hourly data, weather correlations, occupancy patterns, and building characteristics. Designed to accelerate research in building energy optimization and predictive modeling.",
    sector: "Open Data & Research",
    techStack: ["PostgreSQL", "Apache Parquet", "FastAPI", "Jupyter", "OpenAPI"],
    origin: "labs",
    slug: "open-campus-energy-dataset",
    status: "active"
  },
  {
    id: "4",
    title: "Federated Learning Privacy Framework",
    description: "An experimental framework for training machine learning models across distributed datasets without centralizing sensitive information. Implements differential privacy guarantees and secure aggregation protocols tailored for institutional research collaborations.",
    sector: "Privacy & Machine Learning",
    techStack: ["PyTorch", "gRPC", "Redis", "Docker", "Kubernetes"],
    origin: "labs",
    slug: "federated-learning-privacy",
    status: "active"
  }
]
