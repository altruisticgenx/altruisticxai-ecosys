import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Flask, Briefcase, Scroll, ChartLineUp } from "@phosphor-icons/react"

interface LayoutShellProps {
  children: ReactNode
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const location = useLocation()

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/labs", label: "Labs", icon: Flask },
    { href: "/consulting", label: "Consulting", icon: Briefcase },
    { href: "/policy", label: "Policy", icon: Scroll },
    { href: "/impact-ledger", label: "Impact", icon: ChartLineUp }
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">AX</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-foreground">AltruisticXAI</h1>
                <p className="text-xs text-muted-foreground">Ethical AI · Public Impact</p>
              </div>
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.href === "/" 
                  ? location.pathname === "/" 
                  : location.pathname.startsWith(item.href)
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {Icon && <Icon size={18} weight={isActive ? "fill" : "regular"} />}
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.label === "Home" ? "Home" : item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">AltruisticXAI</h3>
              <p className="text-sm text-muted-foreground">
                Building ethical AI systems that serve the public interest through open-source innovation, 
                strategic consulting, and policy advocacy.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Three-Arm Approach</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Open Source Labs (Trust Engine)</li>
                <li>Consulting Studio (Revenue Engine)</li>
                <li>Policy Alliance (Influence Engine)</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Connect</h3>
              <p className="text-sm text-muted-foreground">
                Interested in collaborating? Reach out to discuss partnerships, pilot opportunities, 
                or policy initiatives.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2024 AltruisticXAI. Open Source · Public Interest · Ethical AI.
          </div>
        </div>
      </footer>
    </div>
  )
}
