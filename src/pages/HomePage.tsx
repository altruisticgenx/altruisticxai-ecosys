import LayoutShell from "@/components/LayoutShell"
import SectionCard from "@/components/SectionCard"
import ImpactTable from "@/components/ImpactTable"
import { impactEvents, ImpactEvent } from "@/data/impactEvents"
import { Flask, Briefcase, Scroll, ArrowsClockwise } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const latestImpact = impactEvents.slice(0, 3) as ImpactEvent[]

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Ethical AI for the Public Interest
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            AltruisticXAI builds trust in artificial intelligence through open-source innovation, 
            strategic consulting, and evidence-based policy advocacy. Our three-arm approach creates 
            a sustainable flywheel that advances ethical AI while serving the public good.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="mb-4 text-center text-3xl font-semibold text-foreground">
            The Impact Flywheel
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Each arm of our organization strengthens the others, creating a self-reinforcing cycle of innovation, 
            implementation, and influence.
          </p>

          <div className="mb-12 flex items-center justify-center">
            <Card className="max-w-4xl border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                  <div className="flex shrink-0 items-center justify-center">
                    <ArrowsClockwise size={64} weight="duotone" className="text-primary" />
                  </div>
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Flask size={20} weight="fill" className="text-primary" />
                        <span>Open Source Labs</span>
                        <span className="text-muted-foreground">→</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Develops experimental AI tools and releases them publicly. Builds trust and demonstrates 
                        technical feasibility of ethical AI approaches.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Briefcase size={20} weight="fill" className="text-secondary" />
                        <span>Consulting Studio</span>
                        <span className="text-muted-foreground">→</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Adapts open-source tools for paying clients (universities, hospitals, government). 
                        Generates revenue and creates real-world case studies with measurable impact.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Scroll size={20} weight="fill" className="text-accent" />
                        <span>Policy Alliance</span>
                        <span className="text-muted-foreground">→</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Uses client results as evidence for policy proposals. Successful policies create demand for 
                        compliance tools, driving more consulting work and funding new Labs projects.
                      </p>
                    </div>
                    <div className="rounded-lg bg-background/50 p-4">
                      <p className="text-sm font-medium text-primary">
                        ✓ Self-sustaining cycle: Open Source builds trust → Consulting generates revenue → 
                        Policy creates demand → Back to Open Source
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <SectionCard
              icon={<Flask size={32} weight="duotone" className="text-primary" />}
              title="Open Source Labs"
              description="Trust Engine: Build experimental AI tools in the open. Establish technical credibility and demonstrate ethical approaches work in practice."
              href="/labs"
            />
            <SectionCard
              icon={<Briefcase size={32} weight="duotone" className="text-secondary" />}
              title="Consulting Studio"
              description="Revenue Engine: Adapt proven open-source tools for institutional clients. Generate sustainable funding and produce real-world impact metrics."
              href="/consulting"
            />
            <SectionCard
              icon={<Scroll size={32} weight="duotone" className="text-accent" />}
              title="Policy Alliance"
              description="Influence Engine: Transform client case studies into evidence-based policy recommendations. Create structural change that scales impact."
              href="/policy"
            />
          </div>
        </div>

        <div>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-foreground">Latest Impact</h2>
              <p className="text-muted-foreground">Recent milestones across our three arms</p>
            </div>
          </div>
          <ImpactTable events={latestImpact} />
        </div>
      </div>
    </LayoutShell>
  )
}
