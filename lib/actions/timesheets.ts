"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { getUserProfile } from "@/lib/auth"
import type { ActionResult } from "@/lib/actions/shifts"

/** Worker: clock in to a shift (creates the timesheet). */
export async function clockIn(shiftId: string): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "worker") {
    return { ok: false, error: "Not authorised" }
  }
  const supabase = await createClient()
  const { error } = await supabase.from("timesheets").insert({
    shift_id: shiftId,
    worker_id: res.userId,
    clock_in: new Date().toISOString(),
    status: "open",
  })
  if (error) return { ok: false, error: error.message }
  revalidatePath("/timesheets")
  return { ok: true }
}

/** Worker: clock out — computes hours and submits for approval. */
export async function clockOut(timesheetId: string): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res) return { ok: false, error: "Not signed in" }
  const supabase = await createClient()

  const { data: ts } = await supabase
    .from("timesheets")
    .select("clock_in")
    .eq("id", timesheetId)
    .eq("worker_id", res.userId)
    .single()
  if (!ts?.clock_in) return { ok: false, error: "No clock-in found" }

  const out = new Date()
  const hours =
    Math.round(((out.getTime() - new Date(ts.clock_in).getTime()) / 3.6e6) * 100) / 100

  const { error } = await supabase
    .from("timesheets")
    .update({ clock_out: out.toISOString(), hours, status: "submitted" })
    .eq("id", timesheetId)
    .eq("worker_id", res.userId)
  if (error) return { ok: false, error: error.message }
  revalidatePath("/timesheets")
  return { ok: true }
}

/** Coordinator: approve a submitted timesheet. */
export async function approveTimesheet(timesheetId: string): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "coordinator") {
    return { ok: false, error: "Not authorised" }
  }
  const supabase = await createClient()
  const { error } = await supabase
    .from("timesheets")
    .update({ status: "approved", approved_by: res.userId })
    .eq("id", timesheetId)
  if (error) return { ok: false, error: error.message }
  revalidatePath("/dashboard")
  revalidatePath("/reports")
  return { ok: true }
}
