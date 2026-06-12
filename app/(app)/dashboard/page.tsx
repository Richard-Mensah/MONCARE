import { requireRole } from "@/lib/auth"
import { getCoordinatorStats, getRecentCancellations } from "@/lib/data/stats"
import PageHeader from "@/components/layout/PageHeader"
import StatCard from "@/components/features/dashboard/StatCard"
import ShiftCard from "@/components/features/shifts/ShiftCard"
import EmptyState from "@/components/ui/EmptyState"
import { CheckCircle2 } from "lucide-react"

export const metadata = { title: "Dashboard — MONCARE" }

export default async function DashboardPage() {
  const { profile } = await requireRole(["coordinator"])
  const [stats, cancellations] = await Promise.all([
    getCoordinatorStats(),
    getRecentCancellations(),
  ])

  return (
    <div>
      <PageHeader
        title={`Hello${profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}`}
        subtitle="Today's overview"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Open shifts" value={stats.openShifts} href="/shifts" />
        <StatCard
          label="Upcoming filled"
          value={stats.upcomingAssigned}
          href="/shifts"
        />
        <StatCard
          label="Cancelled today"
          value={stats.cancelledToday}
          highlight
        />
        <StatCard label="Care workers" value={stats.workers} href="/staff" />
        <StatCard label="Care homes" value={stats.careHomes} href="/care-homes" />
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-gray-400">
        Recent cancellations
      </h2>
      {cancellations.length === 0 ? (
        <EmptyState
          icon={<CheckCircle2 className="h-8 w-8" />}
          title="No cancellations"
          description="Cancelled shifts will appear here so you can re-fill or follow up."
        />
      ) : (
        <div className="space-y-3">
          {cancellations.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} />
          ))}
        </div>
      )}
    </div>
  )
}
