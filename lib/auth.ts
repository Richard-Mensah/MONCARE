import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ROLE_HOME } from "@/constants"
import type { Profile, Role } from "@/types"

/** Current signed-in user + their profile, or null if not signed in. */
export async function getUserProfile(): Promise<{
  userId: string
  email: string | null
  profile: Profile
} | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>()
  if (!profile) return null

  return { userId: user.id, email: user.email ?? null, profile }
}

/**
 * Require a signed-in user whose role is allowed. Redirects to /login if not
 * authenticated, or to their own home if their role isn't permitted here.
 */
export async function requireRole(allowed: Role[]) {
  const res = await getUserProfile()
  if (!res) redirect("/login")
  if (!allowed.includes(res.profile.role)) redirect(ROLE_HOME[res.profile.role])
  return res
}
