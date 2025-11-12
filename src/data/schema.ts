export type SourceSystem =
  | "usaspending"
  | "grants_gov"
  | "nsf_awards"
  | "eia"
  | "nrel_reopt"
  | "college_scorecard"
  | "open_states"
  | "data_gov"
  | "manual"
  | "other";

export interface Provenance {
  source: SourceSystem;
  externalId?: string;
  sourceUrl?: string;
  capturedAt: string;
}

export interface LocationInfo {
  country?: string;
  state?: string;
  county?: string;
  city?: string;
  campusName?: string;
  latitude?: number;
  longitude?: number;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export type ProjectOrigin = "labs" | "consulting" | "external";

export interface Project {
  id: string;
  title: string;
  description: string;
  sector: string;
  origin: ProjectOrigin;
  status?: "active" | "planned" | "completed" | string;
  clientName?: string;
  institutionName?: string;
  location?: LocationInfo;
  annual_savings_usd?: number;
  payback_months?: number;
  short_kpi_summary?: string;
  tags?: string[];
  metrics?: ProjectMetric[];
  priorityScore?: number;
  effectiveDate?: string;
  provenance: Provenance;
}

export interface GrantOpportunity {
  id: string;
  title: string;
  description: string;
  agency: string;
  cfdaNumber?: string;
  opportunityNumber?: string;
  postedDate?: string;
  closeDate?: string;
  totalFundingEstimate?: number;
  eligibility?: string;
  topics?: string[];
  location?: LocationInfo;
  alignmentScore?: number;
  recommendedPillar?: "labs" | "consulting" | "policy";
  aiAnalysis?: {
    strengths?: string;
    challenges?: string;
    insights?: string;
  };
  provenance: Provenance;
}

export interface PolicyMemo {
  id: string;
  title: string;
  status: "concept" | "in_discussion" | "enacted" | string;
  jurisdiction: "federal" | "state" | "local" | "institutional";
  state?: string;
  problemStatement: string;
  summary: string;
  relatedProjectIds?: string[];
  relatedGrantIds?: string[];
  sourceBillId?: string;
  provenance: Provenance;
}

export type ImpactEventType = "pilot" | "policy" | "publication" | "grant_award" | "opportunity";

export interface ImpactEvent {
  id: string;
  date: string;
  type: ImpactEventType;
  title: string;
  description: string;
  relatedProjectIds?: string[];
  relatedGrantIds?: string[];
  relatedPolicyIds?: string[];
  location?: LocationInfo;
  provenance: Provenance;
}

export interface OpenDataset {
  id: string;
  title: string;
  description: string;
  publisher: string;
  category: string;
  format?: string[];
  landingPage?: string;
  downloadUrl?: string;
  lastModified?: string;
  tags?: string[];
  relevanceScore?: number;
  provenance: Provenance;
}
