import LayoutShell from "@/components/LayoutShell"
import ImpactTable from "@/components/ImpactTable"
import { impactEvents, ImpactEvent } from "@/data/impactEvents"
import { ChartLineUp, Rocket, Scroll, BookOpen, Handshake } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ImpactLedgerPage() {
  const allEvents = impactEvents as ImpactEvent[]
  const pilotEvents = allEvents.filter(e => e.type === "pilot")
  const policyEvents = allEvents.filter(e => e.type === "policy")
  const publicationEvents = allEvents.filter(e => e.type === "publication")
  const partnershipEvents = allEvents.filter(e => e.type === "partnership")

  const stats = [
    { 
      label: "Pilot Deployments", 
      value: pilotEvents.length.toString(), 
      icon: Rocket,
      color: "text-primary"
    },
    { 
      label: "Policy Initiatives", 
      value: policyEvents.length.toString(), 
      icon: Scroll,
      color: "text-secondary"
    },
    { 
      label: "Publications", 
      value: publicationEvents.length.toString(), 
      icon: BookOpen,
      color: "text-accent"
    },
    { 
      label: "Partnerships", 
      value: partnershipEvents.length.toString(), 
      icon: Handshake,
      color: "text-muted-foreground"
    }
  ]

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-lg ring-1 ring-primary/20">
              <ChartLineUp size={32} weight="duotone" className="text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Impact Ledger
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            A transparent, chronological record of every milestone across our three arms. 
            <span className="font-medium text-foreground"> This ledger demonstrates how open-source innovation, client deployments, and policy 
            advocacy reinforce each other to create systemic change.</span>
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="group overflow-hidden border border-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 shadow-inner ring-1 ring-primary/10 transition-all group-hover:scale-105">
                      <Icon size={18} weight="duotone" className={stat.color} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-0">
            <TabsTrigger value="all" className="text-sm">All Events</TabsTrigger>
            <TabsTrigger value="pilot" className="text-sm">Pilots</TabsTrigger>
            <TabsTrigger value="policy" className="text-sm">Policy</TabsTrigger>
            <TabsTrigger value="publication" className="text-sm">Publications</TabsTrigger>
            <TabsTrigger value="partnership" className="col-span-2 text-sm sm:col-span-1">Partnerships</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ImpactTable events={allEvents} />
          </TabsContent>

          <TabsContent value="pilot">
            <ImpactTable events={pilotEvents} />
          </TabsContent>

          <TabsContent value="policy">
            <ImpactTable events={policyEvents} />
          </TabsContent>

          <TabsContent value="publication">
            <ImpactTable events={publicationEvents} />
          </TabsContent>

          <TabsContent value="partnership">
            <ImpactTable events={partnershipEvents} />
          </TabsContent>
        </Tabs>

        <div className="mt-16 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 sm:p-10">
          <h3 className="mb-3 text-center text-2xl font-bold text-foreground sm:text-3xl">
            The Flywheel in Action
          </h3>
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            Each event in this ledger contributes to our self-reinforcing cycle: 
            <span className="font-medium text-foreground"> open-source projects establish trust and technical feasibility → consulting deployments generate revenue and 
            measurable outcomes → policy initiatives use those outcomes as evidence to create structural 
            change → successful policies increase demand for compliance tools → revenue funds new 
            open-source research.</span> This is how we build sustainable, ethical AI at scale.
          </p>
        </div>
      </div>
    </LayoutShell>
  )
}
