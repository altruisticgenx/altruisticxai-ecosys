import { ReactNode, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Flask, Briefcase, Scroll, ChartBar, List, X } from "@phosphor-icons/react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface LayoutShellProps {
  children: ReactNode
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const location = useLocation()
  const isMobile = useIsMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/labs", label: "Labs", icon: Flask },
    { href: "/consulting", label: "Consulting", icon: Briefcase },
    { href: "/policy", label: "Policy", icon: Scroll },
    { href: "/impact-ledger", label: "Impact Ledger", icon: ChartBar },
  ]

  const isActive = (href: string) => {
    return href === "/" ? location.pathname === "/" : location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary sm:text-xl">AltruisticXAI</span>
            </Link>
          </motion.div>

          {isMobile ? (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <List size={24} weight="bold" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all ${
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {Icon && <Icon size={20} weight={active ? "fill" : "regular"} />}
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <motion.nav 
              className="flex items-center gap-2 sm:gap-4 lg:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                
                return (
                  <motion.div
                    key={item.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors lg:text-base ${
                        active
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {Icon && <Icon size={16} weight={active ? "fill" : "regular"} className="hidden sm:block" />}
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.nav>
          )}
        </div>
      </header>

      <main className="transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-border/40 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground sm:mb-4">About</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Building trust in AI through open-source innovation, strategic consulting, 
                and evidence-based policy advocacy.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground sm:mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/labs" className="transition-colors hover:text-foreground">Open Source Labs</Link></li>
                <li><Link to="/consulting" className="transition-colors hover:text-foreground">Consulting Studio</Link></li>
                <li><Link to="/policy" className="transition-colors hover:text-foreground">Policy Alliance</Link></li>
                <li><Link to="/impact-ledger" className="transition-colors hover:text-foreground">Impact Ledger</Link></li>
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="mb-3 text-sm font-semibold text-foreground sm:mb-4">Contact</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Learn more about how we can work together to advance ethical AI.
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-border/40 pt-6 text-center sm:mt-8 sm:pt-8">
            <p className="text-xs text-muted-foreground sm:text-sm">
              © 2024 AltruisticXAI. Building ethical AI for the public good.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
