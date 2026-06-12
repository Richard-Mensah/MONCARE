"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { getUserProfile } from "@/lib/auth"
import type { ActionResult } from "@/lib/actions/shifts"

const schema = z.object({
  weekday: z.coerce.number().min(0).max(6),
  start_time: z.string().min(1),
  end_time: z.string().min(1),
})

/** Worker: add a recurring weekly availability window. */
export async function addAvailability(formData: FormData): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "worker") {
    return { ok: false, error: "Not authorised" }
  }
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { ok: false, error: "Pick a day and times" }

  const supabase = await createClient()
  const { error } = await supabase.from("availability").insert({
    worker_id: res.userId,
    weekday: parsed.data.weekday,
    start_time: parsed.data.start_time,
    end_time: parsed.data.end_time,
  })
  if (error) return { ok: false, error: error.message }
  revalidatePath("/availability")
  return { ok: true }
}

/** Worker: remove an availability window. */
export async function deleteAvailability(id: string): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res) return { ok: false, error: "Not signed in" }
  const supabase = await createClient()
  const { error } = await supabase
    .from("availability")
    .delete()
    .eq("id", id)
    .eq("worker_id", res.userId)
  if (error) return { ok: false, error: error.message }
  revalidatePath("/availability")
  return { ok: true }
}
