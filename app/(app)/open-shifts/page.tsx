import { requireRole } from "@/lib/auth"
import { getOpenShiftsForWorker } from "@/lib/data/claims"
import PageHeader from "@/components/layout/PageHeader"
import ShiftCard from "@/components/features/shifts/ShiftCard"
import ClaimShiftButton from "@/components/features/shifts/ClaimShiftButton"
import ShiftsRealtime from "@/components/features/shifts/ShiftsRealtime"
import EmptyState from "@/components/ui/EmptyState"
import { Briefcase } from "lucide-react"

export const metadata = { title: "Open shifts — MONCARE" }

export default async function OpenShiftsPage() {
  const { userId } = await requireRole(["worker"])
  const shifts = await getOpenShiftsForWorker(userId)

  return (
    <div>
      <PageHeader
        title="Available Shifts Marketplace"
        subtitle="Claim open shifts from Medygg Care and other partners"
      />
      <ShiftsRealtime userId={userId} />

      {shifts.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-8 w-8" />}
          title="No open shifts right now"
          description="When MONCARE posts an open shift, it appears here and you'll be notified."
        />
      ) : (
        <div className="space-y-3">
          {shifts.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} showWorker={false}>
              <ClaimShiftButton shiftId={shift.id} claim={shift.myClaim} />
            </ShiftCard>
          ))}
        </div>
      )}
    </div>
  )
}
