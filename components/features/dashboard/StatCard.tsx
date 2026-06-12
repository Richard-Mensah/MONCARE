import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  value: number
  href?: string
  highlight?: boolean
}

export default function StatCard({ label, value, href, highlight }: Props) {
  const inner = (
    <div
      className={cn(
        "rounded-xl border bg-white p-4 shadow-sm transition-colors",
        highlight && value > 0
          ? "border-red-200 bg-red-50"
          : "border-gray-200",
        href && "hover:border-brand-300"
      )}
    >
      <p
        className={cn(
          "text-2xl font-bold",
          highlight && value > 0 ? "text-red-600" : "text-gray-900"
        )}
      >
        {value}
      </p>
      <p className="mt-0.5 text-xs font-medium text-gray-500">{label}</p>
    </div>
  )

  return href ? <Link href={href}>{inner}</Link> : inner
}
