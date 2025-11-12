import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface DiscoveryLoadingSkeletonProps {
  count?: number
  stage?: string
}

export default function DiscoveryLoadingSkeleton({ count = 3, stage }: DiscoveryLoadingSkeletonProps) {
  return (
    <div className="space-y-6">
      {stage && (
        <div className="flex items-center justify-center gap-3 rounded-lg border-2 border-primary/30 bg-primary/10 p-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-primary">{stage}</p>
        </div>
      )}
      
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
        {Array.from({ length: count }).map((_, idx) => (
          <Card key={idx} className="animate-pulse border border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="mb-2 flex items-start justify-between gap-2 sm:mb-3">
                <div className="flex min-w-0 flex-1 items-start gap-2.5">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
