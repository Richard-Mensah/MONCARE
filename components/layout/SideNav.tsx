"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV } from "@/components/layout/navItems"
import type { Role } from "@/types"

type Props = {
  role: Role
}

// Desktop sidebar (hidden on mobile, where BottomNav takes over).
export default function SideNav({ role }: Props) {
  const pathname = usePathname()
  const items = NAV[role]

  return (
    <nav className="hidden w-60 shrink-0 flex-col border-r border-line bg-white p-4 md:flex">
      <div className="mb-4 px-2">
        <p className="text-sm font-bold text-brand-700">Care Management</p>
        <p className="text-xs text-muted">Moncare &amp; Medygg Care</p>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-ink"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              {label}
            </Link>
          )
        })}
      </div>

      {role === "coordinator" && (
        <Link
          href="/shifts"
          className="mt-3 flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          <Plus className="h-4 w-4" /> New Shift
        </Link>
      )}
    </nav>
  )
}
