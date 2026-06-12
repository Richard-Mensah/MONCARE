import { requireRole } from "@/lib/auth"
import { getCoordinatorStats, getRecentCancellations } from "@/lib/data/stats"
import PageHeader from "@/components/layout/PageHeader"
import StatCard from "@/components/features/dashboard/StatCard"
import ShiftCard from "@/components/features/shifts/ShiftCard"
import EmptyState from "@/components/ui/EmptyState"
import {
  CheckCircle2,
  Briefcase,
  CalendarCheck,
  AlertTriangle,
  Users,
  Building2,
} from "lucide-react"

export const metadata = { title: "Dashboard — MONCARE" }

export default async function DashboardPage() {
  await requireRole(["coordinator"])
  const [stats, cancellations] = await Promise.all([
    getCoordinatorStats(),
    getRecentCancellations(),
  ])

  return (
    <div>
      <PageHeader
        title="Shift Management Center"
        subtitle="Real-time operational overview of Moncare medical staffing"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard
          label="Open shifts"
          value={stats.openShifts}
          href="/shifts"
          icon={Briefcase}
        />
        <StatCard
          label="Upcoming filled"
          value={stats.upcomingAssigned}
          href="/shifts"
          icon={CalendarCheck}
        />
        <StatCard
          label="Cancelled today"
          value={stats.cancelledToday}
          highlight
          icon={AlertTriangle}
        />
        <StatCard
          label="Care workers"
          value={stats.workers}
          href="/staff"
          icon={Users}
        />
        <StatCard
          label="Care homes"
          value={stats.careHomes}
          href="/care-homes"
          icon={Building2}
        />
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
