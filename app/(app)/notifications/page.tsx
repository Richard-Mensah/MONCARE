import { getUserProfile } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getNotifications } from "@/lib/data/notifications"
import { cn, timeAgo } from "@/lib/utils"
import PageHeader from "@/components/layout/PageHeader"
import EmptyState from "@/components/ui/EmptyState"
import MarkAllReadOnView from "@/components/features/notifications/MarkAllReadOnView"
import { Bell } from "lucide-react"

export const metadata = { title: "Notifications — MONCARE" }

export default async function NotificationsPage() {
  const res = await getUserProfile()
  if (!res) redirect("/login")
  const notifications = await getNotifications(res.userId)

  return (
    <div>
      <PageHeader title="Notifications" />
      <MarkAllReadOnView />

      {notifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="h-8 w-8" />}
          title="No notifications"
          description="Shift assignments and cancellations will show up here."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => {
            const unread = !n.read_at
            const cancelled = n.type === "shift_cancelled"
            return (
              <div
                key={n.id}
                className={cn(
                  "rounded-xl border p-3.5",
                  cancelled
                    ? "border-red-200 bg-red-50"
                    : unread
                      ? "border-brand-200 bg-brand-50"
                      : "border-gray-200 bg-white"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      cancelled ? "text-red-800" : "text-gray-900"
                    )}
                  >
                    {n.title}
                  </p>
                  <span className="shrink-0 text-xs text-gray-400">
                    {timeAgo(n.created_at)}
                  </span>
                </div>
                {n.body && (
                  <p className="mt-0.5 text-sm text-gray-600">{n.body}</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
