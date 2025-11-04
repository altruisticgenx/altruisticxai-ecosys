import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "@phosphor-icons/react"

interface SectionCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
  linkText?: string
}

export default function SectionCard({ icon, title, description, href, linkText = "View more" }: SectionCardProps) {
  return (
    <Card className="flex flex-col border-2 transition-all hover:border-primary hover:shadow-lg">
      <CardHeader>
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          {icon}
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button asChild className="w-full" size="lg">
          <Link to={href} className="flex items-center justify-center gap-2">
            {linkText}
            <ArrowRight size={20} weight="bold" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
