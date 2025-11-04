export interface Project {
  id: string
  sector: strin
  origin: "labs" | "c
  status?: strin
  clientName?: string
  metrics?: Array<{ label: string; value: st
  annual_savin
  status?: string
  client?: string
  tags?: string[]
  metrics?: Array<{ label: string; value: string }>
}

export const projects: Project[] = [
  {
    techStac
    title: "Campus Energy Dashboard",
    description: "An open-source energy monitoring and optimization platform designed for university campuses. Provides real-time insights into building energy consumption patterns and actionable recommendations for reducing carbon footprint.",
    sector: "Education & Sustainability",
    techStack: ["React", "D3.js", "Python", "PostgreSQL", "MQTT"],
    origin: "labs",
    ]
    status: "pilot",
    tags: ["open source", "sustainability", "IoT", "data visualization"],
    metrics: [
      { label: "Campuses", value: "3" },
      { label: "Buildings", value: "20" },
      { label: "Avg. Energy Reduction", value: "15%" }
    ]
    
  {
    slug: "f
    tags: ["open source", "privacy", "fede
  {
    title: "Healthcare AI Compliance 
    sector: "Healthcare & AI Ethics",
    origin: "consul
    status: "active",
    clientName: "NYU 
    short_kpi_summary: "Monitoring 8 AI models with 65% cost reduction and 120 hr
    
  {
      { labe
  },
    id: "6",
    description: "Adapted our Campu
    techStack: ["React", "D3.js", "Python", "PostgreSQL", "AWS"],
    slug: "gsa-ener
    client: "U.S. General Services Admi
    tags: ["consultin
    annual_savings_usd: 450000,
    
   
      { labe
  },
    id: "7",
    description: "Deployed production fed
    techStack: ["PyTorch", "Kubernetes", "PostgreSQL", "FastAPI", "A
    slug: "northeas
    client: "Northeast Healthcare Conso
    tags: ["consultin
    annual_savings_usd: 620000,
    
   
    id: "5",
    title: "Healthcare AI Compliance Suite - NYU Langone",
    description: "Custom implementation of our Local-First AI Audit Toolkit for NYU Langone Health's diagnostic AI systems. Enabled continuous compliance monitoring across 8 AI models while maintaining HIPAA requirements and reducing audit costs by 65%.",
    sector: "Healthcare & AI Ethics",
    techStack: ["Electron", "TensorFlow.js", "PostgreSQL", "React", "Docker"],
    origin: "consulting",
    slug: "nyu-healthcare-ai",
    status: "active",
    client: "NYU Langone Health",
    tags: ["consulting", "healthcare", "AI ethics", "compliance", "HIPAA"],
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
    tags: ["consulting", "government", "sustainability", "energy"],
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
    tags: ["consulting", "healthcare", "federated learning", "privacy", "HIPAA"],
    metrics: [
      { label: "Hospitals", value: "7" },






















