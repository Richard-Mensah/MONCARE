"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { cancelShift } from "@/lib/actions/shifts"
import Button from "@/components/ui/Button"

type Props = {
  shiftId: string
  /** care_home users see the "permanent staff" reason; coordinators may too */
  showPermanentOption?: boolean
}

export default function CancelShiftButton({
  shiftId,
  showPermanentOption = true,
}: Props) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [perm, setPerm] = useState(false)
  const [error, setError] = useState("")
  const [pending, start] = useTransition()
  const router = useRouter()

  function submit() {
    setError("")
    start(async () => {
      const res = await cancelShift(shiftId, reason, perm)
      if (res.ok) {
        setOpen(false)
        setReason("")
        router.refresh()
      } else {
        setError(res.error ?? "Could not cancel shift")
      }
    })
  }

  if (!open) {
    return (
      <Button variant="danger" size="sm" onClick={() => setOpen(true)}>
        Cancel shift
      </Button>
    )
  }

  return (
    <div className="w-full space-y-2 rounded-lg border border-red-200 bg-red-50 p-3">
      <p className="text-sm font-medium text-red-800">
        Cancel this shift? The worker will be notified immediately.
      </p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason (e.g. resident hospitalised, covered internally)…"
        rows={2}
        className="w-full rounded-lg border border-red-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
      />
      {showPermanentOption && (
        <label className="flex items-center gap-2 text-sm text-red-800">
          <input
            type="checkbox"
            checked={perm}
            onChange={(e) => setPerm(e.target.checked)}
            className="h-4 w-4 rounded border-red-300"
          />
          Shift taken by permanent staff
        </label>
      )}
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-2">
        <Button variant="danger" size="sm" loading={pending} onClick={submit}>
          Confirm cancellation
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Back
        </Button>
      </div>
    </div>
  )
}
