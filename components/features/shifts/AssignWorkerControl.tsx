"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { assignWorker } from "@/lib/actions/shifts"
import Button from "@/components/ui/Button"
import type { Profile } from "@/types"

type Props = {
  shiftId: string
  workers: Profile[]
}

export default function AssignWorkerControl({ shiftId, workers }: Props) {
  const [workerId, setWorkerId] = useState("")
  const [error, setError] = useState("")
  const [pending, start] = useTransition()
  const router = useRouter()

  function submit() {
    if (!workerId) return
    setError("")
    start(async () => {
      const res = await assignWorker(shiftId, workerId)
      if (res.ok) {
        setWorkerId("")
        router.refresh()
      } else {
        setError(res.error ?? "Could not assign worker")
      }
    })
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
      <select
        value={workerId}
        onChange={(e) => setWorkerId(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      >
        <option value="">Assign a worker…</option>
        {workers.map((w) => (
          <option key={w.id} value={w.id}>
            {w.full_name ?? "Unnamed"} {w.home_postcode ? `· ${w.home_postcode}` : ""}
          </option>
        ))}
      </select>
      <Button size="sm" loading={pending} disabled={!workerId} onClick={submit}>
        Assign
      </Button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
