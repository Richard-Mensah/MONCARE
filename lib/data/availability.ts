import { createClient } from "@/lib/supabase/server"
import type { Availability } from "@/types"

/** A worker's availability windows, ordered by weekday then start time. */
export async function getAvailability(workerId: string): Promise<Availability[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("availability")
    .select("*")
    .eq("worker_id", workerId)
    .order("weekday", { ascending: true, nullsFirst: true })
    .order("start_time", { ascending: true })
  return data ?? []
}
