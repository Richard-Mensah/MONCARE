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
        "rounded-xl border bg-white p-4 shadow-sm",
        cancelled ? "border-red-300 bg-red-50" : "border-gray-200"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <CalendarDays className="h-4 w-4 shrink-0 text-brand-500" />
            {formatShiftDate(shift.shift_date)}
            <span className="text-gray-300">•</span>
            <Clock className="h-4 w-4 shrink-0 text-brand-500" />
            {formatTimeRange(shift.start_time, shift.end_time)}
          </div>

          {showHome && (
            <p className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
              {shift.care_home?.name ?? "Unknown home"}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            {shift.role_required && (
              <span className="rounded bg-gray-100 px-2 py-0.5 capitalize">
                {shift.role_required}
              </span>
            )}
            {shift.pay_rate != null && <span>£{shift.pay_rate.toFixed(2)}/hr</span>}
          </div>

          {showWorker && shift.assignment?.worker && (
            <p className="flex items-center gap-1.5 text-sm text-gray-700">
              <User className="h-4 w-4 shrink-0 text-gray-400" />
              {shift.assignment.worker.full_name ?? "Unnamed worker"}
            </p>
          )}
        </div>

        <ShiftStatusBadge status={shift.status} />
      </div>

      {shift.notes && (
        <p className="mt-2 border-t border-gray-100 pt-2 text-xs text-gray-500">
          {shift.notes}
        </p>
      )}

      {children && <div className="mt-3 flex flex-wrap gap-2">{children}</div>}
    </div>
  )
}
