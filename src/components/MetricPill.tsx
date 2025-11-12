import { Badge } from "@/components/ui/badge"

interface MetricPillProps {
  label: string
  value: string
  variant?: "default" | "secondary" | "outline"
}

export default function MetricPill({ label, value, variant = "secondary" }: MetricPillProps) {
  return (
    <Badge variant={variant} className="flex items-center gap-1.5 px-3 py-1.5">
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className="font-semibold">{value}</span>
    </Badge>
  )
}
