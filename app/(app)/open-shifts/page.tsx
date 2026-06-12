import { requireRole } from "@/lib/auth"
import PageHeader from "@/components/layout/PageHeader"
import EmptyState from "@/components/ui/EmptyState"
import { Briefcase } from "lucide-react"

export const metadata = { title: "Open shifts — MONCARE" }

export default async function OpenShiftsPage() {
  await requireRole(["worker"])
  return (
    <div>
      <PageHeader title="Open shifts" subtitle="Shifts you can claim" />
      <EmptyState
        icon={<Briefcase className="h-8 w-8" />}
        title="Coming soon"
        description="Browsing and claiming open shifts (replacing WhatsApp broadcasts) arrives next."
      />
    </div>
  )
}
