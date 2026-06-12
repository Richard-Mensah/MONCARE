"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { saveStaffDetails } from "@/lib/actions/directory"
import { CARE_ROLES } from "@/constants"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import { Phone, MapPin } from "lucide-react"
import type { Profile, StaffDetails } from "@/types"

type Props = {
  worker: Profile & { staff: StaffDetails | null }
}

export default function StaffCard({ worker }: Props) {
  const [editing, setEditing] = useState(false)
  const [roles, setRoles] = useState<string[]>(worker.staff?.roles ?? [])
  const [active, setActive] = useState(worker.staff?.active ?? true)
  const [notes, setNotes] = useState(worker.staff?.notes ?? "")
  const [pending, start] = useTransition()
  const router = useRouter()

  function toggleRole(role: string) {
    setRoles((r) => (r.includes(role) ? r.filter((x) => x !== role) : [...r, role]))
  }

  function save() {
    start(async () => {
      const res = await saveStaffDetails(worker.id, roles, active, notes)
      if (res.ok) {
        setEditing(false)
        router.refresh()
      }
    })
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-900">
            {worker.full_name ?? "Unnamed worker"}
          </p>
          <div className="mt-1 space-y-0.5 text-sm text-gray-500">
            {worker.phone && (
              <p className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-gray-400" /> {worker.phone}
              </p>
            )}
            {worker.home_postcode && (
              <p className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gray-400" /> {worker.home_postcode}
              </p>
            )}
          </div>
        </div>
        {!active && <Badge className="bg-gray-100 text-gray-500">Inactive</Badge>}
      </div>

      {!editing ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {roles.length > 0 ? (
            roles.map((r) => (
              <Badge key={r} className="bg-brand-100 capitalize text-brand-800">
                {r}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-gray-400">No roles set</span>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap gap-2">
            {CARE_ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => toggleRole(r)}
                className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                  roles.includes(r)
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            Active (can be assigned shifts)
          </label>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <div className="flex gap-2">
            <Button size="sm" loading={pending} onClick={save}>
              Save
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
