"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type Props = {
  userId: string
}

// Live unread-notification indicator. Subscribes to new notifications for
// this user so the badge updates instantly (used by the cancellation flow).
export default function NotificationBell({ userId }: Props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const supabase = createClient()
    let active = true

    async function loadCount() {
      const { count } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("recipient_id", userId)
        .eq("channel", "in_app")
        .is("read_at", null)
      if (active) setCount(count ?? 0)
    }
    loadCount()

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new.channel === "in_app") setCount((c) => c + 1)
        }
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [userId])

  return (
    <Link
      href="/notifications"
      aria-label={`Notifications${count ? `, ${count} unread` : ""}`}
      className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
    >
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  )
}
