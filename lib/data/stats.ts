import { createClient } from "@/lib/supabase/server"
import type { ShiftWithRelations } from "@/types"

export type CoordinatorStats = {
  openShifts: number
  upcomingAssigned: number
  cancelledToday: number
  workers: number
  careHomes: number
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Headline counts for the coordinator dashboard. */
export async function getCoordinatorStats(): Promise<CoordinatorStats> {
  const supabase = await createClient()
  const t = today()

  const countOf = (q: PromiseLike<{ count: number | null }>) =>
    Promise.resolve(q).then((r) => r.count ?? 0)

  const [openShifts, upcomingAssigned, cancelledToday, workers, careHomes] =
    await Promise.all([
      countOf(
        supabase
          .from("shifts")
          .select("id", { count: "exact", head: true })
          .eq("status", "open")
          .gte("shift_date", t)
      ),
      countOf(
        supabase
          .from("shifts")
          .select("id", { count: "exact", head: true })
          .in("status", ["assigned", "confirmed"])
          .gte("shift_date", t)
      ),
      countOf(
        supabase
          .from("shift_cancellations")
          .select("id", { count: "exact", head: true })
          .gte("created_at", t)
      ),
      countOf(
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .eq("role", "worker")
      ),
      countOf(
        supabase.from("care_homes").select("id", { count: "exact", head: true })
      ),
    ])

  return { openShifts, upcomingAssigned, cancelledToday, workers, careHomes }
}

/** The most recent cancellations, for the dashboard feed. */
export async function getRecentCancellations(
  limit = 5
): Promise<ShiftWithRelations[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shifts")
    .select(
      `*, care_home:care_homes(*), assignments:shift_assignments(*, worker:profiles(id, full_name))`
    )
    .eq("status", "cancelled")
    .order("updated_at", { ascending: false })
    .limit(limit)

  return (data ?? []).map((row) => {
    const r = row as ShiftWithRelations & {
      assignments: NonNullable<ShiftWithRelations["assignment"]>[]
    }
    const { assignments, ...shift } = r
    return { ...shift, assignment: assignments?.[0] ?? null }
  })
}
