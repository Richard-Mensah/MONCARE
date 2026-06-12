import { requireRole } from "@/lib/auth"
import { listShifts } from "@/lib/data/shifts"
import { listCareHomes, listAssignableWorkers } from "@/lib/data/directory"
import PageHeader from "@/components/layout/PageHeader"
import ShiftCard from "@/components/features/shifts/ShiftCard"
import NewShiftForm from "@/components/features/shifts/NewShiftForm"
import AssignWorkerControl from "@/components/features/shifts/AssignWorkerControl"
import CancelShiftButton from "@/components/features/shifts/CancelShiftButton"
import EmptyState from "@/components/ui/EmptyState"
import { CalendarDays } from "lucide-react"

export const metadata = { title: "Shifts — MONCARE" }

export default async function ShiftsPage() {
  await requireRole(["coordinator"])
  const [shifts, careHomes, workers] = await Promise.all([
    listShifts(),
    listCareHomes(),
    listAssignableWorkers(),
  ])

  return (
    <div>
      <PageHeader
        title="Shifts"
        subtitle="Create, assign and manage all shifts"
        action={<NewShiftForm careHomes={careHomes} />}
      />

      {careHomes.length === 0 && (
        <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Add a care home first before creating shifts.
        </p>
      )}

      {shifts.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="h-8 w-8" />}
          title="No shifts yet"
          description="Create your first shift to start allocating staff."
        />
      ) : (
        <div className="space-y-3">
          {shifts.map((shift) => (
            <ShiftCard key={shift.id} shift={shift}>
              {shift.status === "open" && (
                <AssignWorkerControl shiftId={shift.id} workers={workers} />
              )}
              {(shift.status === "assigned" || shift.status === "confirmed") && (
                <CancelShiftButton shiftId={shift.id} />
              )}
            </ShiftCard>
          ))}
        </div>
      )}
    </div>
  )
}
