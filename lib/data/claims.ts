import { createClient } from "@/lib/supabase/server"
import { listShifts } from "@/lib/data/shifts"
import type { ClaimStatus, ShiftWithRelations } from "@/types"

export type WorkerOpenShift = ShiftWithRelations & {
  myClaim: { id: string; status: ClaimStatus } | null
}

/** Open shifts plus whether this worker has already claimed each one. */
export async function getOpenShiftsForWorker(
  workerId: string
): Promise<WorkerOpenShift[]> {
  const supabase = await createClient()
  const [shifts, claimsRes] = await Promise.all([
    listShifts("open"),
    supabase
      .from("shift_claims")
      .select("id, shift_id, status")
      .eq("worker_id", workerId),
  ])
  const byShift = new Map(
    (claimsRes.data ?? []).map((c) => [c.shift_id, { id: c.id, status: c.status as ClaimStatus }])
  )
  return shifts.map((s) => ({ ...s, myClaim: byShift.get(s.id) ?? null }))
}

export type PendingClaim = {
  id: string
  shift_id: string
  worker: { id: string; full_name: string | null; home_postcode: string | null } | null
}

/** Pending claims keyed by shift id, for the coordinator to approve. */
export async function getPendingClaimsByShift(): Promise<
  Record<string, PendingClaim[]>
> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shift_claims")
    .select("id, shift_id, worker:profiles(id, full_name, home_postcode)")
    .eq("status", "pending")

  const map: Record<string, PendingClaim[]> = {}
  for (const row of (data ?? []) as unknown as PendingClaim[]) {
    ;(map[row.shift_id] ??= []).push(row)
  }
  return map
}
