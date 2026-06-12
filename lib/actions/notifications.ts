"use server"

import { createClient } from "@/lib/supabase/server"
import { getUserProfile } from "@/lib/auth"

/** Mark all of the current user's in-app notifications as read. */
export async function markAllNotificationsRead(): Promise<void> {
  const res = await getUserProfile()
  if (!res) return
  const supabase = await createClient()
  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", res.userId)
    .is("read_at", null)
}
