"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type Props = {
  userId: string
}

/**
 * Live updater for the worker's shift views. When a notification lands for this
 * user (e.g. a cancellation), it refreshes the server data so the shift list
 * flips instantly, and raises a prominent banner so they don't travel.
 */
export default function ShiftsRealtime({ userId }: Props) {
  const router = useRouter()
  const [alert, setAlert] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel(`shift-updates:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          const n = payload.new as {
            type: string
            channel: string
            body: string | null
          }
          if (n.channel !== "in_app") return
          if (n.type === "shift_cancelled" && n.body) setAlert(n.body)
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, router])

  if (!alert) return null

  return (
    <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 shadow-sm">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
      <div className="flex-1">
        <p className="font-semibold text-red-800">Shift cancelled</p>
        <p className="mt-0.5 text-sm text-red-700">{alert}</p>
      </div>
      <button
        onClick={() => setAlert(null)}
        aria-label="Dismiss"
        className="rounded p-1 text-red-400 hover:bg-red-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
