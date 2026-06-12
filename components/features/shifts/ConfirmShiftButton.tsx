"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { confirmShift } from "@/lib/actions/shifts"
import Button from "@/components/ui/Button"

export default function ConfirmShiftButton({
  assignmentId,
}: {
  assignmentId: string
}) {
  const [pending, start] = useTransition()
  const router = useRouter()

  function submit() {
    start(async () => {
      const res = await confirmShift(assignmentId)
      if (res.ok) router.refresh()
    })
  }

  return (
    <Button size="sm" loading={pending} onClick={submit}>
      Confirm I&apos;m attending
    </Button>
  )
}
