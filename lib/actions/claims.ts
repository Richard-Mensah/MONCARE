"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { getUserProfile } from "@/lib/auth"
import type { ActionResult } from "@/lib/actions/shifts"

/** Worker: claim an open shift. */
export async function claimShift(shiftId: string): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "worker") {
    return { ok: false, error: "Not authorised" }
  }
  const supabase = await createClient()
  const { error } = await supabase
    .from("shift_claims")
    .insert({ shift_id: shiftId, worker_id: res.userId })
  if (error) return { ok: false, error: error.message }
  revalidatePath("/open-shifts")
  return { ok: true }
}

/** Worker: withdraw their own pending claim. */
export async function withdrawClaim(claimId: string): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res) return { ok: false, error: "Not signed in" }
  const supabase = await createClient()
  const { error } = await supabase
    .from("shift_claims")
    .update({ status: "withdrawn" })
    .eq("id", claimId)
    .eq("worker_id", res.userId)
  if (error) return { ok: false, error: error.message }
  revalidatePath("/open-shifts")
  return { ok: true }
}

/** Coordinator: approve a claim (assigns the worker, fires their alert). */
export async function approveClaim(claimId: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.rpc("approve_claim", { p_claim_id: claimId })
  if (error) return { ok: false, error: error.message }
  revalidatePath("/shifts")
  return { ok: true }
}

/** Coordinator: reject a claim. */
export async function rejectClaim(claimId: string): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "coordinator") {
    return { ok: false, error: "Not authorised" }
  }
  const supabase = await createClient()
  const { error } = await supabase
    .from("shift_claims")
    .update({ status: "rejected" })
    .eq("id", claimId)
  if (error) return { ok: false, error: error.message }
  revalidatePath("/shifts")
  return { ok: true }
}
