"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { markAllNotificationsRead } from "@/lib/actions/notifications"

// Marks notifications read shortly after the feed is viewed.
export default function MarkAllReadOnView() {
  const router = useRouter()
  useEffect(() => {
    const t = setTimeout(async () => {
      await markAllNotificationsRead()
      router.refresh()
    }, 1200)
    return () => clearTimeout(t)
  }, [router])
  return null
}
