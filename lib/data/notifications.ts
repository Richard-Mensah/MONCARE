import { createClient } from "@/lib/supabase/server"
import type { Notification } from "@/types"

/** In-app notifications for the current user, newest first. */
export async function getNotifications(userId: string): Promise<Notification[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("recipient_id", userId)
    .eq("channel", "in_app")
    .order("created_at", { ascending: false })
    .limit(50)
  return data ?? []
}
