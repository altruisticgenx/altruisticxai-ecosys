import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"

interface SectionCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
  linkText?: string
}

export default function SectionCard({ icon, title, description, href, linkText = "View more" }: SectionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="flex h-full flex-col border-2 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-xl">
        <CardHeader className="pb-3 sm:pb-4">
          <motion.div 
            className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 sm:h-14 sm:w-14"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed sm:text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto pt-0">
          <Button asChild className="w-full touch-manipulation" size="lg">
            <Link to={href} className="flex items-center justify-center gap-2">
              {linkText}
              <ArrowRight size={20} weight="bold" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
