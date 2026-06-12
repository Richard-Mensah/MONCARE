import { createClient } from "@/lib/supabase/server"
import type { ShiftWithRelations } from "@/types"

const SHIFT_SELECT = `
  *,
  care_home:care_homes(*),
  assignments:shift_assignments(*, worker:profiles(id, full_name, phone, home_postcode))
`

// Reduce the embedded assignments array to the single active (non-cancelled) one.
type RawShift = Omit<ShiftWithRelations, "assignment"> & {
  assignments: NonNullable<ShiftWithRelations["assignment"]>[]
}

function mapShift(row: RawShift): ShiftWithRelations {
  const { assignments, ...shift } = row
  const active =
    assignments?.find((a) => a.status !== "cancelled") ?? null
  return { ...shift, assignment: active }
}

/** All shifts (coordinator view), newest date first. Optional status filter. */
export async function listShifts(status?: string): Promise<ShiftWithRelations[]> {
  const supabase = await createClient()
  let query = supabase
    .from("shifts")
    .select(SHIFT_SELECT)
    .order("shift_date", { ascending: true })
    .order("start_time", { ascending: true })
  if (status) query = query.eq("status", status)
  const { data } = await query
  return (data ?? []).map((r) => mapShift(r as unknown as RawShift))
}

/** Shifts assigned to a specific worker (their "My Shifts"). */
export async function getWorkerShifts(
  workerId: string
): Promise<ShiftWithRelations[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shift_assignments")
    .select(`shift:shifts(${SHIFT_SELECT})`)
    .eq("worker_id", workerId)
    .order("created_at", { ascending: false })

  const shifts = (data ?? [])
    .map((row) => (row as unknown as { shift: RawShift | null }).shift)
    .filter((s): s is RawShift => Boolean(s))
    .map(mapShift)

  // newest shift date first
  return shifts.sort((a, b) => b.shift_date.localeCompare(a.shift_date))
}

/** Shifts for a single care home (care-home portal rota). */
export async function getCareHomeShifts(
  careHomeId: string
): Promise<ShiftWithRelations[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shifts")
    .select(SHIFT_SELECT)
    .eq("care_home_id", careHomeId)
    .order("shift_date", { ascending: true })
  return (data ?? []).map((r) => mapShift(r as unknown as RawShift))
}

/** Open shifts a worker can claim. */
export async function getOpenShifts(): Promise<ShiftWithRelations[]> {
  return listShifts("open")
}
