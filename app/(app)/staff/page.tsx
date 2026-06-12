import { requireRole } from "@/lib/auth"
import { listWorkers } from "@/lib/data/directory"
import PageHeader from "@/components/layout/PageHeader"
import StaffCard from "@/components/features/staff/StaffCard"
import EmptyState from "@/components/ui/EmptyState"
import { Users } from "lucide-react"

export const metadata = { title: "Staff — MONCARE" }

export default async function StaffPage() {
  await requireRole(["coordinator"])
  const workers = await listWorkers()

  return (
    <div>
      <PageHeader
        title="Care workers"
        subtitle={`${workers.length} registered`}
      />

      {workers.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No workers yet"
          description="Workers appear here once they sign in with their email for the first time."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {workers.map((worker) => (
            <StaffCard key={worker.id} worker={worker} />
          ))}
        </div>
      )}
    </div>
  )
}
