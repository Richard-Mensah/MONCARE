import { createClient } from "@/lib/supabase/server"
import { getWorkerShifts } from "@/lib/data/shifts"
import type { ShiftWithRelations, Timesheet } from "@/types"

export type TimesheetShift = ShiftWithRelations & { timesheet: Timesheet | null }

/** A worker's non-cancelled shifts, each with its timesheet (if any). */
export async function getWorkerTimesheetShifts(
  workerId: string
): Promise<TimesheetShift[]> {
  const supabase = await createClient()
  const [shifts, tsRes] = await Promise.all([
    getWorkerShifts(workerId),
    supabase.from("timesheets").select("*").eq("worker_id", workerId),
  ])
  const byShift = new Map((tsRes.data ?? []).map((t) => [t.shift_id, t as Timesheet]))
  return shifts
    .filter((s) => s.status !== "cancelled")
    .map((s) => ({ ...s, timesheet: byShift.get(s.id) ?? null }))
}

export type ApprovalRow = Timesheet & {
  shift: (ShiftWithRelations & { care_home: { name: string } | null }) | null
  worker: { full_name: string | null } | null
}

/** Submitted timesheets awaiting coordinator approval. */
export async function getTimesheetsForApproval(): Promise<ApprovalRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("timesheets")
    .select(
      `*, shift:shifts(*, care_home:care_homes(name)), worker:profiles(full_name)`
    )
    .eq("status", "submitted")
    .order("created_at", { ascending: true })
  return (data ?? []) as unknown as ApprovalRow[]
}

/** Approved timesheets for export/reporting, with worker + home names. */
export async function getApprovedTimesheets(): Promise<ApprovalRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("timesheets")
    .select(
      `*, shift:shifts(*, care_home:care_homes(name)), worker:profiles(full_name)`
    )
    .eq("status", "approved")
    .order("created_at", { ascending: false })
  return (data ?? []) as unknown as ApprovalRow[]
}
