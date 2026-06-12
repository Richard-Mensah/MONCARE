import { requireRole } from "@/lib/auth"
import { getWorkerShifts } from "@/lib/data/shifts"
import PageHeader from "@/components/layout/PageHeader"
import ShiftCard from "@/components/features/shifts/ShiftCard"
import ConfirmShiftButton from "@/components/features/shifts/ConfirmShiftButton"
import ShiftsRealtime from "@/components/features/shifts/ShiftsRealtime"
import EmptyState from "@/components/ui/EmptyState"
import { CalendarDays } from "lucide-react"

export const metadata = { title: "My shifts — MONCARE" }

export default async function MyShiftsPage() {
  const { userId } = await requireRole(["worker"])
  const shifts = await getWorkerShifts(userId)

  const upcoming = shifts.filter((s) => s.status !== "cancelled")
  const cancelled = shifts.filter((s) => s.status === "cancelled")

  return (
    <div>
      <PageHeader title="My shifts" subtitle="Your allocated work" />
      <ShiftsRealtime userId={userId} />

      {shifts.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="h-8 w-8" />}
          title="No shifts yet"
          description="When MONCARE allocates you a shift, it will show here — and you'll get a text."
        />
      ) : (
        <div className="space-y-6">
          {upcoming.length > 0 && (
            <div className="space-y-3">
              {upcoming.map((shift) => (
                <ShiftCard key={shift.id} shift={shift} showWorker={false}>
                  {shift.assignment?.status === "assigned" && (
                    <ConfirmShiftButton assignmentId={shift.assignment.id} />
                  )}
                  {shift.assignment?.status === "confirmed" && (
                    <span className="text-sm font-medium text-emerald-700">
                      ✓ You confirmed this shift
                    </span>
                  )}
                </ShiftCard>
              ))}
            </div>
          )}

          {cancelled.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Cancelled — do not travel
              </h2>
              <div className="space-y-3">
                {cancelled.map((shift) => (
                  <ShiftCard key={shift.id} shift={shift} showWorker={false}>
                    <span className="text-sm font-medium text-red-700">
                      This shift was cancelled. Please do not travel.
                    </span>
                  </ShiftCard>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
