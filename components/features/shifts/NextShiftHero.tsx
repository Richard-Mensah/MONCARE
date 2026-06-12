import { CalendarDays, Clock, MapPin, CheckCircle2 } from "lucide-react"
import { formatShiftDate, formatTimeRange } from "@/lib/utils"
import ConfirmShiftButton from "@/components/features/shifts/ConfirmShiftButton"
import type { ShiftWithRelations } from "@/types"

// Prominent "your next shift" hero card for the worker home screen.
export default function NextShiftHero({ shift }: { shift: ShiftWithRelations }) {
  const confirmed = shift.assignment?.status === "confirmed"

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
        Your next shift
      </p>

      <div className="mt-2 flex items-center gap-2 text-3xl font-bold tracking-tight text-ink">
        <Clock className="h-6 w-6 text-brand-500" />
        {formatTimeRange(shift.start_time, shift.end_time)}
      </div>

      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-muted">
        <CalendarDays className="h-4 w-4" />
        {formatShiftDate(shift.shift_date)}
      </p>

      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-700">
        <MapPin className="h-4 w-4 text-slate-400" />
        {shift.care_home?.name ?? "Care home"}
      </p>

      <div className="mt-4">
        {confirmed ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-success/10 px-3 py-2 text-sm font-semibold text-[#0c8f70] ring-1 ring-success/25">
            <CheckCircle2 className="h-4 w-4" /> Confirmed — OK to travel
          </span>
        ) : (
          shift.assignment && (
            <ConfirmShiftButton assignmentId={shift.assignment.id} />
          )
        )}
      </div>
    </div>
  )
}
