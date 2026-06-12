"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { getUserProfile } from "@/lib/auth"
import type { ActionResult } from "@/lib/actions/shifts"

const careHomeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().optional(),
  postcode: z.string().optional(),
  region: z.string().optional(),
  contact_name: z.string().optional(),
  contact_phone: z.string().optional(),
})

/** Coordinator: add a care home (client). */
export async function createCareHome(formData: FormData): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "coordinator") {
    return { ok: false, error: "Not authorised" }
  }

  const parsed = careHomeSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("care_homes").insert(parsed.data)
  if (error) return { ok: false, error: error.message }

  revalidatePath("/care-homes")
  return { ok: true }
}

/** Coordinator: update a worker's staff details (roles, active flag). */
export async function saveStaffDetails(
  workerId: string,
  roles: string[],
  active: boolean,
  notes: string
): Promise<ActionResult> {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "coordinator") {
    return { ok: false, error: "Not authorised" }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("staff_details").upsert({
    id: workerId,
    roles,
    active,
    notes: notes || null,
  })
  if (error) return { ok: false, error: error.message }

  revalidatePath("/staff")
  return { ok: true }
}
