"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAV } from "@/components/layout/navItems"
import type { Role } from "@/types"

type Props = {
  role: Role
}

export default function BottomNav({ role }: Props) {
  const pathname = usePathname()
  const items = NAV[role]

  return (
    <nav className="sticky bottom-0 z-20 border-t border-gray-200 bg-white/95 backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-2xl items-stretch justify-around">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-brand-600" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
