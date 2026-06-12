import { requireRole } from "@/lib/auth"
import { getWorkerShifts } from "@/lib/data/shifts"
import PageHeader from "@/components/layout/PageHeader"
import ShiftCard from "@/components/features/shifts/ShiftCard"
import ConfirmShiftButton from "@/components/features/shifts/ConfirmShiftButton"
import NextShiftHero from "@/components/features/shifts/NextShiftHero"
import ShiftsRealtime from "@/components/features/shifts/ShiftsRealtime"
import EmptyState from "@/components/ui/EmptyState"
import { CalendarDays } from "lucide-react"

export const metadata = { title: "My shifts — MONCARE" }

export default async function MyShiftsPage() {
  const { userId } = await requireRole(["worker"])
  const shifts = await getWorkerShifts(userId)

  const today = new Date().toISOString().slice(0, 10)
  const upcomingAll = shifts.filter((s) => s.status !== "cancelled")
  const future = upcomingAll
    .filter((s) => s.shift_date >= today)
    .sort((a, b) => a.shift_date.localeCompare(b.shift_date))
  const hero = future[0] ?? null
  const upcoming = upcomingAll.filter((s) => s.id !== hero?.id)
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
          {hero && (
            <div className="mb-1">
              <NextShiftHero shift={hero} />
            </div>
          )}
          {upcoming.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Upcoming
              </h2>
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
