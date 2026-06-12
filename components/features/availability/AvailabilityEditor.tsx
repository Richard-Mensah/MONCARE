"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"
import { addAvailability, deleteAvailability } from "@/lib/actions/availability"
import { WEEKDAYS } from "@/constants"
import { formatTimeRange } from "@/lib/utils"
import Button from "@/components/ui/Button"
import type { Availability } from "@/types"

export default function AvailabilityEditor({
  initial,
}: {
  initial: Availability[]
}) {
  const [pending, start] = useTransition()
  const [error, setError] = useState("")
  const router = useRouter()

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setError("")
    start(async () => {
      const res = await addAvailability(data)
      if (res.ok) {
        form.reset()
        router.refresh()
      } else {
        setError(res.error ?? "Could not add")
      }
    })
  }

  function remove(id: string) {
    start(async () => {
      await deleteAvailability(id)
      router.refresh()
    })
  }

  return (
    <div className="space-y-5">
      <form
        onSubmit={handleAdd}
        className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="weekday" className="text-sm font-medium text-gray-700">
            Day
          </label>
          <select
            id="weekday"
            name="weekday"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            {WEEKDAYS.map((d, i) => (
              <option key={d} value={i}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="start_time" className="text-sm font-medium text-gray-700">
              From
            </label>
            <input
              id="start_time"
              name="start_time"
              type="time"
              required
              defaultValue="08:00"
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="end_time" className="text-sm font-medium text-gray-700">
              To
            </label>
            <input
              id="end_time"
              name="end_time"
              type="time"
              required
              defaultValue="20:00"
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" loading={pending}>
          <Plus className="h-4 w-4" /> Add availability
        </Button>
      </form>

      <div className="space-y-2">
        {initial.length === 0 ? (
          <p className="text-sm text-gray-400">No availability set yet.</p>
        ) : (
          initial.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5"
            >
              <span className="text-sm text-gray-800">
                <span className="font-medium">
                  {a.weekday != null ? WEEKDAYS[a.weekday] : a.specific_date}
                </span>{" "}
                · {formatTimeRange(a.start_time, a.end_time)}
              </span>
              <button
                onClick={() => remove(a.id)}
                aria-label="Remove"
                className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
