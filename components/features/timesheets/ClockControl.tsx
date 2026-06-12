"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { clockIn, clockOut } from "@/lib/actions/timesheets"
import { formatTime } from "@/lib/utils"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import type { Timesheet } from "@/types"

type Props = {
  shiftId: string
  timesheet: Timesheet | null
}

export default function ClockControl({ shiftId, timesheet }: Props) {
  const [pending, start] = useTransition()
  const router = useRouter()

  function doClockIn() {
    start(async () => {
      await clockIn(shiftId)
      router.refresh()
    })
  }
  function doClockOut() {
    if (!timesheet) return
    start(async () => {
      await clockOut(timesheet.id)
      router.refresh()
    })
  }

  if (!timesheet) {
    return (
      <Button size="sm" loading={pending} onClick={doClockIn}>
        Clock in
      </Button>
    )
  }

  if (timesheet.status === "open" && !timesheet.clock_out) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">
          In at {formatTime(timesheet.clock_in?.slice(11, 16) ?? null)}
        </span>
        <Button size="sm" variant="secondary" loading={pending} onClick={doClockOut}>
          Clock out
        </Button>
      </div>
    )
  }

  if (timesheet.status === "submitted") {
    return (
      <Badge className="bg-amber-100 text-amber-800">
        {timesheet.hours}h · awaiting approval
      </Badge>
    )
  }

  if (timesheet.status === "approved") {
    return (
      <Badge className="bg-emerald-100 text-emerald-800">
        {timesheet.hours}h · approved ✓
      </Badge>
    )
  }

  return <Badge className="bg-gray-100 text-gray-600">{timesheet.status}</Badge>
}
