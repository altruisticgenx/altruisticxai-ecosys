import { DiscoveredProject } from "@/hooks/use-discovered-projects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, GithubLogo, X, Lightbulb } from "@phosphor-icons/react"

interface DiscoveredProjectCardProps {
  project: DiscoveredProject
  onRemove?: (repoId: number) => void
}

export default function DiscoveredProjectCard({ project, onRemove }: DiscoveredProjectCardProps) {
  const { repo, analysis } = project
  const isHighRelevance = analysis.relevanceScore >= 80

  const getOwnerFromFullName = (fullName: string) => {
    return fullName.split('/')[0] || 'Unknown'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "explainability":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "privacy":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20"
      case "fairness":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "sustainability":
        return "bg-teal-500/10 text-teal-700 border-teal-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  return (
    <Card className="group h-full border-border/50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="mb-2 flex items-start justify-between gap-3">
          <CardTitle className="text-base font-bold leading-tight">
            {repo.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            {isHighRelevance && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                <Star size={14} weight="fill" className="text-primary" />
              </div>
            )}
            {onRemove && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100"
                onClick={() => onRemove(repo.id)}
              >
                <X size={14} />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            <GithubLogo size={12} weight="bold" className="mr-1" />
            {getOwnerFromFullName(repo.full_name)}
          </Badge>

          <Badge className={getCategoryColor(analysis.category)}>
            {analysis.category.replace('-', ' ')}
          </Badge>

          <Badge variant="outline" className="text-xs">
            Score: {analysis.relevanceScore}
          </Badge>

          {repo.language && (
            <Badge variant="outline" className="text-xs">
              {repo.language}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {repo.description || "No description available"}
        </p>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star size={14} weight="duotone" />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex items-center gap-1">
                <Lightbulb size={14} weight="duotone" />
                <span>{repo.topics.length} topics</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs">
            <div className="mb-1 font-medium text-foreground">Use Case:</div>
            <p className="text-muted-foreground">{analysis.potentialUseCase}</p>
          </div>
          <div className="text-xs">
            <div className="mb-1 font-medium text-foreground">Why Relevant:</div>
            <p className="text-muted-foreground">{analysis.alignmentReason}</p>
          </div>
        </div>

        {analysis.keyInsights && analysis.keyInsights.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {analysis.keyInsights.slice(0, 3).map((insight, idx) => (
              <span
                key={idx}
                className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {insight}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {analysis.impactPotential} impact
            </Badge>
            <Badge variant="outline" className="text-xs">
              {analysis.technicalComplexity}
            </Badge>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            GitHub →
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
