import { createClient } from "@/lib/supabase/server"

export type ReportStats = {
  totalShifts: number
  filledShifts: number
  cancelledShifts: number
  cancelledByPermanent: number
  fillRate: number // 0–100
  approvedHours: number
}

const countOf = (q: PromiseLike<{ count: number | null }>) =>
  Promise.resolve(q).then((r) => r.count ?? 0)

/** Headline analytics for the coordinator reports page. */
export async function getReportStats(): Promise<ReportStats> {
  const supabase = await createClient()

  const [total, filled, cancelled, byPermanent, hoursRes] = await Promise.all([
    countOf(supabase.from("shifts").select("id", { count: "exact", head: true })),
    countOf(
      supabase
        .from("shifts")
        .select("id", { count: "exact", head: true })
        .in("status", ["assigned", "confirmed", "completed"])
    ),
    countOf(
      supabase
        .from("shifts")
        .select("id", { count: "exact", head: true })
        .eq("status", "cancelled")
    ),
    countOf(
      supabase
        .from("shift_cancellations")
        .select("id", { count: "exact", head: true })
        .eq("taken_by_permanent", true)
    ),
    supabase.from("timesheets").select("hours").eq("status", "approved"),
  ])

  const approvedHours = (hoursRes.data ?? []).reduce(
    (sum, r) => sum + (Number((r as { hours: number | null }).hours) || 0),
    0
  )
  const denom = filled + cancelled
  const fillRate = denom > 0 ? Math.round((filled / denom) * 100) : 0

  return {
    totalShifts: total,
    filledShifts: filled,
    cancelledShifts: cancelled,
    cancelledByPermanent: byPermanent,
    fillRate,
    approvedHours: Math.round(approvedHours * 100) / 100,
  }
}
