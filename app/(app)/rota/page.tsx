import { requireRole } from "@/lib/auth"
import { getCareHomeShifts } from "@/lib/data/shifts"
import PageHeader from "@/components/layout/PageHeader"
import ShiftCard from "@/components/features/shifts/ShiftCard"
import CancelShiftButton from "@/components/features/shifts/CancelShiftButton"
import SyncBridge from "@/components/features/rota/SyncBridge"
import EmptyState from "@/components/ui/EmptyState"
import { CalendarDays } from "lucide-react"

export const metadata = { title: "Rota — MONCARE" }

export default async function RotaPage() {
  const { profile } = await requireRole(["care_home"])

  if (!profile.care_home_id) {
    return (
      <div>
        <PageHeader title="Rota" />
        <EmptyState
          title="No care home linked to your account"
          description="Please ask your MONCARE coordinator to link your login to your care home."
        />
      </div>
    )
  }

  const shifts = await getCareHomeShifts(profile.care_home_id)
  const homeName = shifts[0]?.care_home?.name ?? "Your care home"

  return (
    <div>
      <PageHeader
        title="Rota"
        subtitle="MONCARE staff booked at your home. Cancel here to alert them instantly."
      />

      <SyncBridge homeName={homeName} />

      {shifts.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="h-8 w-8" />}
          title="No shifts booked"
          description="Shifts MONCARE books for your home will appear here."
        />
      ) : (
        <div className="space-y-3">
          {shifts.map((shift) => {
            const cancellable =
              shift.status === "assigned" ||
              shift.status === "confirmed" ||
              shift.status === "open"
            return (
              <ShiftCard key={shift.id} shift={shift}>
                {cancellable && <CancelShiftButton shiftId={shift.id} />}
              </ShiftCard>
            )
          })}
        </div>
      )}
    </div>
  )
}
