import { requireRole } from "@/lib/auth"
import { getAvailability } from "@/lib/data/availability"
import PageHeader from "@/components/layout/PageHeader"
import AvailabilityEditor from "@/components/features/availability/AvailabilityEditor"

export const metadata = { title: "Availability — MONCARE" }

export default async function AvailabilityPage() {
  const { userId } = await requireRole(["worker"])
  const availability = await getAvailability(userId)

  return (
    <div>
      <PageHeader
        title="Availability"
        subtitle="Tell MONCARE which days and hours you can work"
      />
      <AvailabilityEditor initial={availability} />
    </div>
  )
}
