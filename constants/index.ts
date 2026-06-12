import type { Role, ShiftStatus } from "@/types"

export const APP_NAME = "MONCARE"
export const APP_TAGLINE = "Healthcare agency"

// Roles a worker can be qualified for / a shift can require.
export const CARE_ROLES = ["carer", "senior", "nurse", "support"] as const

export const ROLE_LABELS: Record<Role, string> = {
  coordinator: "MONCARE Coordinator",
  worker: "Care Worker",
  care_home: "Care Home",
}

// Landing route per role after login.
export const ROLE_HOME: Record<Role, string> = {
  coordinator: "/dashboard",
  worker: "/my-shifts",
  care_home: "/rota",
}

export const SHIFT_STATUS_LABELS: Record<ShiftStatus, string> = {
  open: "Open",
  assigned: "Assigned",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
}

// Tailwind badge classes per shift status.
export const SHIFT_STATUS_STYLES: Record<ShiftStatus, string> = {
  open: "bg-amber-100 text-amber-800",
  assigned: "bg-brand-100 text-brand-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-800",
}
