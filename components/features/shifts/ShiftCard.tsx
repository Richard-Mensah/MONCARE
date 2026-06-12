import { CalendarDays, Clock, MapPin, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatShiftDate, formatTimeRange } from "@/lib/utils"
import ShiftStatusBadge from "@/components/features/shifts/ShiftStatusBadge"
import type { ShiftWithRelations } from "@/types"

type Props = {
  shift: ShiftWithRelations
  showWorker?: boolean
  showHome?: boolean
  children?: React.ReactNode // action area
}

export default function ShiftCard({
  shift,
  showWorker = true,
  showHome = true,
  children,
}: Props) {
  const cancelled = shift.status === "cancelled"

  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-4 transition-colors",
        cancelled ? "border-red-200 bg-red-50/60" : "border-line hover:border-brand-200"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 text-base font-bold text-ink">
            <Clock className="h-4 w-4 shrink-0 text-brand-500" />
            {formatTimeRange(shift.start_time, shift.end_time)}
          </div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            {formatShiftDate(shift.shift_date)}
          </p>

          {showHome && (
            <p className="flex items-center gap-1.5 text-sm text-slate-600">
              <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
              {shift.care_home?.name ?? "Unknown home"}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            {shift.role_required && (
              <span className="rounded bg-slate-100 px-2 py-0.5 font-medium capitalize text-slate-600">
                {shift.role_required}
              </span>
            )}
            {shift.pay_rate != null && (
              <span className="font-semibold text-ink">£{shift.pay_rate.toFixed(2)}/hr</span>
            )}
          </div>

          {showWorker && shift.assignment?.worker && (
            <p className="flex items-center gap-1.5 text-sm text-slate-700">
              <User className="h-4 w-4 shrink-0 text-slate-400" />
              {shift.assignment.worker.full_name ?? "Unnamed worker"}
            </p>
          )}
        </div>

        <ShiftStatusBadge status={shift.status} />
      </div>

      {shift.notes && (
        <p className="mt-2 border-t border-line pt-2 text-xs text-muted">
          {shift.notes}
        </p>
      )}

      {children && <div className="mt-3 flex flex-wrap gap-2">{children}</div>}
    </div>
  )
}
