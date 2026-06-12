import Link from "next/link"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type Props = {
  label: string
  value: number | string
  href?: string
  highlight?: boolean
  icon?: LucideIcon
}

export default function StatCard({ label, value, href, highlight, icon: Icon }: Props) {
  const danger = highlight && Number(value) > 0

  const inner = (
    <div
      className={cn(
        "rounded-xl border bg-white p-4 transition-colors",
        danger ? "border-red-200 bg-red-50/60" : "border-line",
        href && "hover:border-brand-300"
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          {label}
        </p>
        {Icon && (
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg",
              danger ? "bg-red-100 text-red-600" : "bg-brand-50 text-brand-600"
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p
        className={cn(
          "mt-2 text-3xl font-bold tracking-tight",
          danger ? "text-red-600" : "text-ink"
        )}
      >
        {value}
      </p>
    </div>
  )

  return href ? <Link href={href}>{inner}</Link> : inner
}
