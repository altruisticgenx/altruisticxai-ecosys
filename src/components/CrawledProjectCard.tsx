import { Project } from "@/data/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Buildings, TrendUp, Database, Star } from "@phosphor-icons/react"

interface CrawledProjectCardProps {
  project: Project
}

export default function CrawledProjectCard({ project }: CrawledProjectCardProps) {
  const isPriority = (project.priorityScore ?? 0) >= 80

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case "usaspending":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "nsf_awards":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20"
      case "manual":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  return (
    <Card className="group h-full border-border/50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="mb-2 flex items-start justify-between gap-3">
          <CardTitle className="text-base font-bold leading-tight">
            {project.title}
          </CardTitle>
          {isPriority && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
              <Star size={14} weight="fill" className="text-primary" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className={getSourceBadgeColor(project.provenance.source)}>
            <Database size={12} weight="bold" className="mr-1" />
            {project.provenance.source.replace(/_/g, " ")}
          </Badge>
          
          {project.origin && (
            <Badge variant="outline" className="text-xs">
              {project.origin}
            </Badge>
          )}

          {project.priorityScore !== undefined && (
            <Badge variant="secondary" className="text-xs">
              Score: {project.priorityScore}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="space-y-2 text-xs">
          {project.location && (project.location.state || project.location.city) && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={14} weight="duotone" className="shrink-0" />
              <span>
                {[project.location.city, project.location.state]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          )}

          {(project.institutionName || project.clientName) && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Buildings size={14} weight="duotone" className="shrink-0" />
              <span className="truncate">
                {project.institutionName || project.clientName}
              </span>
            </div>
          )}

          {project.short_kpi_summary && (
            <div className="flex items-start gap-2 text-muted-foreground">
              <TrendUp size={14} weight="duotone" className="mt-0.5 shrink-0" />
              <span className="line-clamp-2">{project.short_kpi_summary}</span>
            </div>
          )}
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.provenance.sourceUrl && (
          <a
            href={project.provenance.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View Source →
          </a>
        )}
      </CardContent>
    </Card>
  )
}
