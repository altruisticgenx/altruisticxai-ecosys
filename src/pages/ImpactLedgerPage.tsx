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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <ChartLineUp size={32} weight="duotone" className="text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground">
            Impact Ledger
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            A transparent, chronological record of every milestone across our three arms. 
            This ledger demonstrates how open-source innovation, client deployments, and policy 
            advocacy reinforce each other to create systemic change.
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon size={20} weight="duotone" className={stat.color} />
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
          <TabsList className="mb-8 grid w-full grid-cols-5">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="pilot">Pilots</TabsTrigger>
            <TabsTrigger value="policy">Policy</TabsTrigger>
            <TabsTrigger value="publication">Publications</TabsTrigger>
            <TabsTrigger value="partnership">Partnerships</TabsTrigger>
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

        <div className="mt-16 rounded-2xl border-2 border-primary/20 bg-primary/5 p-8">
          <h3 className="mb-3 text-center text-2xl font-semibold text-foreground">
            The Flywheel in Action
          </h3>
          <p className="mx-auto max-w-3xl text-center text-muted-foreground">
            Each event in this ledger contributes to our self-reinforcing cycle: open-source projects 
            establish trust and technical feasibility → consulting deployments generate revenue and 
            measurable outcomes → policy initiatives use those outcomes as evidence to create structural 
            change → successful policies increase demand for compliance tools → revenue funds new 
            open-source research. This is how we build sustainable, ethical AI at scale.
          </p>
        </div>
      </div>
    </LayoutShell>
  )
}
