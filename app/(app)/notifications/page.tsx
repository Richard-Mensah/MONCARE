import { getUserProfile } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getNotifications } from "@/lib/data/notifications"
import { cn, timeAgo } from "@/lib/utils"
import { NOTIF_ACCENT } from "@/constants"
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
            const accent = NOTIF_ACCENT[n.type] ?? "border-l-slate-300"
            return (
              <div
                key={n.id}
                className={cn(
                  "rounded-xl border border-line border-l-4 p-3.5",
                  accent,
                  unread ? "bg-brand-50/40" : "bg-white"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{n.title}</p>
                  <span className="shrink-0 text-xs text-slate-400">
                    {timeAgo(n.created_at)}
                  </span>
                </div>
                {n.body && <p className="mt-0.5 text-sm text-slate-600">{n.body}</p>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
