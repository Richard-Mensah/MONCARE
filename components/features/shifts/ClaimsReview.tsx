"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { approveClaim, rejectClaim } from "@/lib/actions/claims"
import Button from "@/components/ui/Button"
import { User } from "lucide-react"
import type { PendingClaim } from "@/lib/data/claims"

export default function ClaimsReview({ claims }: { claims: PendingClaim[] }) {
  const [pending, start] = useTransition()
  const router = useRouter()

  function approve(id: string) {
    start(async () => {
      await approveClaim(id)
      router.refresh()
    })
  }
  function reject(id: string) {
    start(async () => {
      await rejectClaim(id)
      router.refresh()
    })
  }

  if (claims.length === 0) return null

  return (
    <div className="w-full space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
        {claims.length} worker{claims.length > 1 ? "s" : ""} claimed this shift
      </p>
      {claims.map((c) => (
        <div key={c.id} className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-sm text-gray-700">
            <User className="h-4 w-4 text-gray-400" />
            {c.worker?.full_name ?? "Worker"}
            {c.worker?.home_postcode && (
              <span className="text-gray-400">· {c.worker.home_postcode}</span>
            )}
          </span>
          <div className="flex gap-1.5">
            <Button size="sm" loading={pending} onClick={() => approve(c.id)}>
              Approve
            </Button>
            <Button
              size="sm"
              variant="ghost"
              loading={pending}
              onClick={() => reject(c.id)}
            >
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
