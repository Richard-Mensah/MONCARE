"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { getUserProfile } from "@/lib/auth"

export type ActionResult = { ok: boolean; error?: string }

const shiftSchema = z.object({
  care_home_id: z.string().uuid("Select a care home"),
  shift_date: z.string().min(1, "Date is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  role_required: z.string().optional(),
  pay_rate: z.coerce.number().nonnegative().optional(),
  notes: z.string().optional(),
})

/** Coordinator: create a new shift. */
export async function createShift(formData: FormData): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "coordinator") {
    return { ok: false, error: "Not authorised" }
  }

  const parsed = shiftSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("shifts").insert({
    ...parsed.data,
    pay_rate: parsed.data.pay_rate || null,
    role_required: parsed.data.role_required || null,
    notes: parsed.data.notes || null,
    created_by: res.userId,
  })
  if (error) return { ok: false, error: error.message }

  revalidatePath("/shifts")
  revalidatePath("/dashboard")
  return { ok: true }
}

/** Coordinator: assign a worker to an open shift. */
export async function assignWorker(
  shiftId: string,
  workerId: string
): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "coordinator") {
    return { ok: false, error: "Not authorised" }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("shift_assignments").insert({
    shift_id: shiftId,
    worker_id: workerId,
    assigned_by: res.userId,
  })
  if (error) return { ok: false, error: error.message }

  revalidatePath("/shifts")
  revalidatePath("/dashboard")
  return { ok: true }
}

/** Coordinator OR the owning care home: cancel a shift (the critical flow). */
export async function cancelShift(
  shiftId: string,
  reason: string,
  takenByPermanent = false
): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.rpc("cancel_shift", {
    p_shift_id: shiftId,
    p_reason: reason || null,
    p_taken_by_permanent: takenByPermanent,
  })
  if (error) return { ok: false, error: error.message }

  revalidatePath("/shifts")
  revalidatePath("/dashboard")
  revalidatePath("/rota")
  revalidatePath("/my-shifts")
  return { ok: true }
}

/** Worker: confirm an assigned shift. */
export async function confirmShift(assignmentId: string): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res) return { ok: false, error: "Not signed in" }

  const supabase = await createClient()
  const { error } = await supabase
    .from("shift_assignments")
    .update({ status: "confirmed" })
    .eq("id", assignmentId)
    .eq("worker_id", res.userId)
  if (error) return { ok: false, error: error.message }

  revalidatePath("/my-shifts")
  return { ok: true }
}
