import React, { ReactNode, useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Flask, Briefcase, Scroll, ChartBar, List, Database, Drop } from "@phosphor-icons/react"
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

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/labs", label: "Labs", icon: Flask },
    { href: "/consulting", label: "Consulting", icon: Briefcase },
    { href: "/policy", label: "Policy", icon: Scroll },
    { href: "/impact-ledger", label: "Impact Ledger", icon: ChartBar },
    { href: "/data-integration", label: "Data Hub", icon: Database },
    { href: "/ripples", label: "Ripples", icon: Drop },
  ]

  const isActive = (href: string) => {
    return href === "/" ? location.pathname === "/" : location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md ring-1 ring-primary/20 transition-all group-hover:scale-105 group-hover:shadow-lg">
                <span className="text-sm font-bold tracking-tight text-primary-foreground">AX</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-foreground transition-colors group-hover:text-primary">AltruisticXAI</span>
                <span className="hidden text-xs text-muted-foreground sm:block">
                  Ethical AI Ecosystem
                </span>
              </div>
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
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm font-medium transition-all ${
                          active
                            ? "bg-primary/10 text-primary shadow-sm"
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
              className="flex items-center gap-2 sm:gap-3 lg:gap-4"
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
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                        active
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {Icon && <Icon size={18} weight={active ? "fill" : "regular"} />}
                      <span className="hidden sm:inline">{item.label}</span>
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

      <footer className="border-t border-border/40 bg-gradient-to-b from-muted/20 to-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md ring-1 ring-primary/20">
                  <span className="text-sm font-bold tracking-tight text-primary-foreground">AX</span>
                </div>
                <span className="text-lg font-bold text-foreground">AltruisticXAI</span>
              </div>
              <p className="mb-4 max-w-md text-base leading-relaxed text-muted-foreground">
                Building trust in AI through open-source innovation, strategic consulting, 
                and evidence-based policy advocacy. Join us in creating ethical AI solutions that scale.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="default" variant="default" className="rounded-full">
                  <Link to="/consulting">Get Started</Link>
                </Button>
                <Button asChild size="default" variant="outline" className="rounded-full">
                  <Link to="/impact-ledger">View Impact</Link>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-base font-semibold text-foreground">Ecosystem</h3>
              <ul className="space-y-2.5 text-base text-muted-foreground">
                <li><Link to="/labs" className="transition-colors hover:text-foreground hover:underline">Open Source Labs</Link></li>
                <li><Link to="/consulting" className="transition-colors hover:text-foreground hover:underline">Consulting Studio</Link></li>
                <li><Link to="/policy" className="transition-colors hover:text-foreground hover:underline">Policy Alliance</Link></li>
                <li><Link to="/impact-ledger" className="transition-colors hover:text-foreground hover:underline">Impact Ledger</Link></li>
                <li><Link to="/data-integration" className="transition-colors hover:text-foreground hover:underline">Data Integration Hub</Link></li>
                <li><Link to="/ripples" className="transition-colors hover:text-foreground hover:underline">Ripples</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-base font-semibold text-foreground">Connect</h3>
              <ul className="space-y-2.5 text-base text-muted-foreground">
                <li>
                  <a 
                    href="mailto:consulting@altruisticxai.org" 
                    className="transition-colors hover:text-foreground hover:underline"
                  >
                    consulting@altruisticxai.org
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/altruisticxai-labs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground hover:underline"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border/40 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AltruisticXAI. Building ethical AI for the public good.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
