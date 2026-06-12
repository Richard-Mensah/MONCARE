"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { createCareHome } from "@/lib/actions/directory"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

export default function NewCareHomeForm() {
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
      const res = await createCareHome(data)
      if (res.ok) {
        form.reset()
        setOpen(false)
        router.refresh()
      } else {
        setError(res.error ?? "Could not add care home")
      }
    })
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" /> Add care home
      </Button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-brand-200 bg-white p-4 shadow-sm"
    >
      <h2 className="font-semibold text-gray-900">Add care home</h2>
      <Input id="name" name="name" label="Name" placeholder="MEDYGG Criccieth" required />
      <div className="grid grid-cols-2 gap-3">
        <Input id="region" name="region" label="Town / region" placeholder="Criccieth" />
        <Input id="postcode" name="postcode" label="Postcode" placeholder="LL52" />
      </div>
      <Input id="address" name="address" label="Address (optional)" />
      <div className="grid grid-cols-2 gap-3">
        <Input id="contact_name" name="contact_name" label="Contact name" />
        <Input id="contact_phone" name="contact_phone" label="Contact phone" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" loading={pending}>
          Save
        </Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
