import type { Role, ShiftStatus } from "@/types"

export const APP_NAME = "MONCARE"
export const APP_TAGLINE = "Healthcare agency"

// Roles a worker can be qualified for / a shift can require.
export const CARE_ROLES = ["carer", "senior", "nurse", "support"] as const

// 0 = Sunday … 6 = Saturday (matches Postgres EXTRACT(DOW)).
export const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const

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

// Left-border accent per notification type (alert-feed styling).
export const NOTIF_ACCENT: Record<string, string> = {
  shift_cancelled: "border-l-red-500",
  shift_assigned: "border-l-emerald-500",
  open_shift: "border-l-brand-500",
  shift_claim: "border-l-amber-500",
}

// Tailwind badge classes per shift status (Clinical Precision status tints).
export const SHIFT_STATUS_STYLES: Record<ShiftStatus, string> = {
  open: "bg-warning/10 text-[#b45309] ring-1 ring-warning/25",
  assigned: "bg-brand-50 text-brand-700 ring-1 ring-brand-200/60",
  confirmed: "bg-success/10 text-[#0c8f70] ring-1 ring-success/25",
  completed: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  cancelled: "bg-danger/10 text-[#c0341d] ring-1 ring-danger/25",
}
