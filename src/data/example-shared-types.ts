// types/project.ts

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
