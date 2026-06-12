"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { createShift } from "@/lib/actions/shifts"
import { CARE_ROLES } from "@/constants"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import type { CareHome } from "@/types"

export default function NewShiftForm({ careHomes }: { careHomes: CareHome[] }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const [pending, start] = useTransition()
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setError("")
    start(async () => {
      const res = await createShift(data)
      if (res.ok) {
        form.reset()
        setOpen(false)
        router.refresh()
      } else {
        setError(res.error ?? "Could not create shift")
      }
    })
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" /> New shift
      </Button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-brand-200 bg-white p-4 shadow-sm"
    >
      <h2 className="font-semibold text-gray-900">New shift</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="care_home_id" className="text-sm font-medium text-gray-700">
          Care home
        </label>
        <select
          id="care_home_id"
          name="care_home_id"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          <option value="">Select a care home…</option>
          {careHomes.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name}
            </option>
          ))}
        </select>
      </div>

      <Input id="shift_date" name="shift_date" type="date" label="Date" required />

      <div className="grid grid-cols-2 gap-3">
        <Input id="start_time" name="start_time" type="time" label="Start" required />
        <Input id="end_time" name="end_time" type="time" label="End" required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="role_required" className="text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role_required"
            name="role_required"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm capitalize focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            <option value="">Any</option>
            {CARE_ROLES.map((r) => (
              <option key={r} value={r} className="capitalize">
                {r}
              </option>
            ))}
          </select>
        </div>
        <Input
          id="pay_rate"
          name="pay_rate"
          type="number"
          step="0.01"
          min="0"
          label="Pay £/hr"
          placeholder="12.50"
        />
      </div>

      <Input id="notes" name="notes" label="Notes (optional)" placeholder="e.g. dementia unit" />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" loading={pending}>
          Create shift
        </Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
