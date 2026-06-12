import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Building2,
  Briefcase,
  Clock,
  BarChart3,
  CalendarClock,
  type LucideIcon,
} from "lucide-react"
import type { Role } from "@/types"

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

// Bottom-nav destinations per role (mobile-first primary navigation).
export const NAV: Record<Role, NavItem[]> = {
  coordinator: [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/shifts", label: "Shifts", icon: CalendarDays },
    { href: "/staff", label: "Staff", icon: Users },
    { href: "/care-homes", label: "Homes", icon: Building2 },
    { href: "/reports", label: "Reports", icon: BarChart3 },
  ],
  worker: [
    { href: "/my-shifts", label: "My Shifts", icon: CalendarDays },
    { href: "/open-shifts", label: "Open", icon: Briefcase },
    { href: "/availability", label: "Free", icon: CalendarClock },
    { href: "/timesheets", label: "Hours", icon: Clock },
  ],
  care_home: [{ href: "/rota", label: "Rota", icon: CalendarDays }],
}
