import { createClient } from "@/lib/supabase/server"
import type { CareHome, Profile, StaffDetails } from "@/types"

/** All care homes (clients), alphabetical. */
export async function listCareHomes(): Promise<CareHome[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("care_homes")
    .select("*")
    .order("name", { ascending: true })
  return data ?? []
}

/** All care workers with their staff details (coordinator view). */
export async function listWorkers(): Promise<
  (Profile & { staff: StaffDetails | null })[]
> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select("*, staff:staff_details(*)")
    .eq("role", "worker")
    .order("full_name", { ascending: true })
  return (data ?? []).map((p) => {
    const { staff, ...profile } = p as Profile & { staff: StaffDetails[] }
    return { ...profile, staff: staff?.[0] ?? null }
  })
}

/** Active workers only — for the assignment picker. */
export async function listAssignableWorkers(): Promise<Profile[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select("*, staff:staff_details(active)")
    .eq("role", "worker")
    .order("full_name", { ascending: true })
  return (data ?? [])
    .filter((p) => {
      const staff = (p as { staff: { active: boolean }[] }).staff
      return staff?.[0]?.active !== false
    })
    .map((p) => {
      const { staff, ...profile } = p as Profile & { staff: unknown }
      return profile
    })
}
