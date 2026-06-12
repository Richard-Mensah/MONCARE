"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { approveTimesheet } from "@/lib/actions/timesheets"
import Button from "@/components/ui/Button"

export default function ApproveTimesheetButton({ id }: { id: string }) {
  const [pending, start] = useTransition()
  const router = useRouter()

  return (
    <Button
      size="sm"
      loading={pending}
      onClick={() =>
        start(async () => {
          await approveTimesheet(id)
          router.refresh()
        })
      }
    >
      Approve
    </Button>
  )
}
