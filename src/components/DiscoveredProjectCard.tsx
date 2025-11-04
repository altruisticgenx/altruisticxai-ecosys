import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DiscoveredProject } from "@/hooks/use-discovered-projects"
import { GitBranch, Star, X } from "@phosphor-icons/react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface DiscoveredProjectCardProps {
  project: DiscoveredProject
  onRemove?: (repoId: number) => void
}

const categoryColors = {
  'explainability': 'bg-blue-100 text-blue-800 border-blue-300',
  'privacy': 'bg-purple-100 text-purple-800 border-purple-300',
  'fairness': 'bg-green-100 text-green-800 border-green-300',
  'sustainability': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'general-ethics': 'bg-gray-100 text-gray-800 border-gray-300'
}

export default function DiscoveredProjectCard({ project, onRemove }: DiscoveredProjectCardProps) {
  const { repo, analysis } = project
  const relevanceColor = analysis.relevanceScore >= 80 ? 'text-green-600' : 
                        analysis.relevanceScore >= 60 ? 'text-yellow-600' : 'text-gray-600'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="flex h-full flex-col border-2 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-xl">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="mb-2 flex items-start justify-between gap-2 sm:mb-3 sm:gap-3">
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate text-lg sm:text-xl">{repo.name}</CardTitle>
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-xs text-primary hover:underline sm:text-sm"
              >
                {repo.full_name}
              </a>
            </div>
            {onRemove && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(repo.id)}
                className="h-8 w-8 shrink-0 sm:h-10 sm:w-10"
              >
                <X size={18} className="sm:h-5 sm:w-5" />
              </Button>
            )}
          </div>
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {repo.description || 'No description available'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-3 sm:space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground sm:text-sm">Relevance Score</span>
              <span className={`text-sm font-bold sm:text-base ${relevanceColor}`}>
                {analysis.relevanceScore}/100
              </span>
            </div>
            <Progress value={analysis.relevanceScore} className="h-2" />
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold text-foreground sm:text-sm">Category & Sector</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <Badge className={categoryColors[analysis.category] + " text-xs"}>
                {analysis.category}
              </Badge>
              <Badge variant="outline" className="text-xs">{analysis.recommendedSector}</Badge>
            </div>
          </div>

          <div>
            <h4 className="mb-1.5 text-xs font-semibold text-foreground sm:mb-2 sm:text-sm">Potential Use Case</h4>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{analysis.potentialUseCase}</p>
          </div>

          <div>
            <h4 className="mb-1.5 text-xs font-semibold text-foreground sm:mb-2 sm:text-sm">Alignment Reason</h4>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{analysis.alignmentReason}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-3 sm:text-sm">
            <div className="flex items-center gap-1">
              <Star size={14} weight="fill" className="text-yellow-500 sm:h-4 sm:w-4" />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>
            {repo.language && (
              <Badge variant="secondary" className="text-xs font-normal">
                {repo.language}
              </Badge>
            )}
          </div>

          {repo.topics && repo.topics.length > 0 && (
            <div>
              <h4 className="mb-1.5 text-xs font-semibold text-foreground sm:mb-2 sm:text-sm">Topics</h4>
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 5).map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs font-normal">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            asChild
            className="w-full touch-manipulation"
            size="lg"
          >
            <a 
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <GitBranch size={18} weight="bold" className="sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">View on GitHub</span>
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
