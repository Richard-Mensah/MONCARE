"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
    <nav className="hidden w-56 shrink-0 flex-col gap-1 border-r border-gray-200 bg-white p-3 md:flex">
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
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
