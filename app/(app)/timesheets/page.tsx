import { requireRole } from "@/lib/auth"
import { getWorkerTimesheetShifts } from "@/lib/data/timesheets"
import PageHeader from "@/components/layout/PageHeader"
import ShiftCard from "@/components/features/shifts/ShiftCard"
import ClockControl from "@/components/features/timesheets/ClockControl"
import EmptyState from "@/components/ui/EmptyState"
import { Clock } from "lucide-react"

export const metadata = { title: "Timesheets — MONCARE" }

export default async function TimesheetsPage() {
  const { userId } = await requireRole(["worker"])
  const shifts = await getWorkerTimesheetShifts(userId)

  return (
    <div>
      <PageHeader
        title="Timesheets"
        subtitle="Clock in and out of your shifts"
      />

      {shifts.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-8 w-8" />}
          title="No shifts to log"
          description="Your assigned shifts will appear here so you can clock in and out."
        />
      ) : (
        <div className="space-y-3">
          {shifts.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} showWorker={false}>
              <ClockControl shiftId={shift.id} timesheet={shift.timesheet} />
            </ShiftCard>
          ))}
        </div>
      )}
    </div>
  )
}
