import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Flask, Briefcase, Scroll, ChartLineUp } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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
    { href: "/impact-ledger", label: "Impact Ledger", icon: ChartLineUp },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-xl font-bold text-primary">A</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              AltruisticXAI
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <motion.div 
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {navItems.map((item, index) => {
                const isActive = item.href === "/"
                  ? location.pathname === "/" 
                  : location.pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, rotateX: -10 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.5,
                      rotateX: 10,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                      style={{
                        transform: isActive ? "translateZ(10px)" : "translateZ(0px)",
                      }}
                    >
                      {Icon && <Icon size={14} weight={isActive ? "fill" : "regular"} />}
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Building trust in AI through open-source innovation, 
                strategic consulting, and policy advocacy.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Our Work</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Open Source Labs (Trust Engine)</li>
                <li>Consulting Studio (Revenue Engine)</li>
                <li>Policy Alliance (Influence Engine)</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Connect</h3>
              <p className="text-sm text-muted-foreground">
                Interested in collaboration or consultation?
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2024 AltruisticXAI. Building ethical AI for the public good.
          </div>
        </div>
      </footer>
    </div>
  )
}
