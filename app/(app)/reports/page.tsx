import { requireRole } from "@/lib/auth"
import PageHeader from "@/components/layout/PageHeader"
import EmptyState from "@/components/ui/EmptyState"
import { BarChart3 } from "lucide-react"

export const metadata = { title: "Reports — MONCARE" }

export default async function ReportsPage() {
  await requireRole(["coordinator"])
  return (
    <div>
      <PageHeader title="Reports" subtitle="Analytics & payroll export" />
      <EmptyState
        icon={<BarChart3 className="h-8 w-8" />}
        title="Coming soon"
        description="Fill rates, cancellation analysis, hours per worker and CSV payroll export arrive in a later phase."
      />
    </div>
  )
}
