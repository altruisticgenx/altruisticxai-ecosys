import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ImpactEvent } from "@/data/impactEvents"
import MetricPill from "./MetricPill"
import { Rocket, Scroll, BookOpen, Handshake } from "@phosphor-icons/react"

interface ImpactTableProps {
  events: ImpactEvent[]
}

const typeConfig = {
  pilot: { label: "Pilot", variant: "default" as const, icon: Rocket, color: "text-primary" },
  policy: { label: "Policy", variant: "secondary" as const, icon: Scroll, color: "text-secondary" },
  publication: { label: "Publication", variant: "outline" as const, icon: BookOpen, color: "text-accent" },
  partnership: { label: "Partnership", variant: "outline" as const, icon: Handshake, color: "text-muted-foreground" }
}

export default function ImpactTable({ events }: ImpactTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Date</TableHead>
            <TableHead className="w-32">Type</TableHead>
            <TableHead>Event</TableHead>
            <TableHead className="hidden lg:table-cell">Metrics</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const config = typeConfig[event.type]
            const Icon = config.icon

            return (
              <TableRow key={event.id} className="hover:bg-muted/50">
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant={config.variant} className="flex w-fit items-center gap-1.5">
                    <Icon size={14} weight="bold" className={config.color} />
                    <span className="hidden sm:inline">{config.label}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{event.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {event.metrics && event.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {event.metrics.map((metric, idx) => (
                        <MetricPill
                          key={idx}
                          label={metric.label}
                          value={metric.value}
                          variant="outline"
                        />
                      ))}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
