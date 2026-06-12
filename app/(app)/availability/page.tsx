import { requireRole } from "@/lib/auth"
import PageHeader from "@/components/layout/PageHeader"
import EmptyState from "@/components/ui/EmptyState"
import { CalendarClock } from "lucide-react"

export const metadata = { title: "Availability — MONCARE" }

export default async function AvailabilityPage() {
  await requireRole(["worker"])
  return (
    <div>
      <PageHeader title="Availability" subtitle="Tell MONCARE when you can work" />
      <EmptyState
        icon={<CalendarClock className="h-8 w-8" />}
        title="Coming soon"
        description="Setting your weekly availability arrives in a later phase."
      />
    </div>
  )
}
