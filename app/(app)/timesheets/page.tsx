import { requireRole } from "@/lib/auth"
import PageHeader from "@/components/layout/PageHeader"
import EmptyState from "@/components/ui/EmptyState"
import { Clock } from "lucide-react"

export const metadata = { title: "Timesheets — MONCARE" }

export default async function TimesheetsPage() {
  await requireRole(["worker"])
  return (
    <div>
      <PageHeader title="Timesheets" subtitle="Your worked hours" />
      <EmptyState
        icon={<Clock className="h-8 w-8" />}
        title="Coming soon"
        description="Clock in/out and timesheet approval arrive in a later phase."
      />
    </div>
  )
}
