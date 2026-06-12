import { requireRole } from "@/lib/auth"
import { getReportStats } from "@/lib/data/reports"
import { getTimesheetsForApproval } from "@/lib/data/timesheets"
import { formatShiftDate } from "@/lib/utils"
import PageHeader from "@/components/layout/PageHeader"
import StatCard from "@/components/features/dashboard/StatCard"
import ApproveTimesheetButton from "@/components/features/timesheets/ApproveTimesheetButton"
import EmptyState from "@/components/ui/EmptyState"
import { Download, CheckCircle2 } from "lucide-react"

export const metadata = { title: "Reports — MONCARE" }

export default async function ReportsPage() {
  await requireRole(["coordinator"])
  const [stats, pending] = await Promise.all([
    getReportStats(),
    getTimesheetsForApproval(),
  ])

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Performance, timesheets & payroll"
        action={
          <a
            href="/api/payroll/export"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
          >
            <Download className="h-4 w-4" /> Payroll CSV
          </a>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Fill rate %" value={stats.fillRate} />
        <StatCard label="Filled shifts" value={stats.filledShifts} />
        <StatCard label="Cancelled" value={stats.cancelledShifts} highlight />
        <StatCard label="Taken by permanent" value={stats.cancelledByPermanent} />
        <StatCard label="Total shifts" value={stats.totalShifts} />
        <StatCard label="Approved hours" value={stats.approvedHours} />
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-gray-400">
        Timesheets awaiting approval
      </h2>
      {pending.length === 0 ? (
        <EmptyState
          icon={<CheckCircle2 className="h-8 w-8" />}
          title="Nothing to approve"
          description="Submitted timesheets will appear here for sign-off before payroll."
        />
      ) : (
        <div className="space-y-2">
          {pending.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {t.worker?.full_name ?? "Worker"} · {t.hours}h
                </p>
                <p className="text-xs text-gray-500">
                  {t.shift?.care_home?.name ?? "Care home"} ·{" "}
                  {t.shift?.shift_date ? formatShiftDate(t.shift.shift_date) : ""}
                </p>
              </div>
              <ApproveTimesheetButton id={t.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
