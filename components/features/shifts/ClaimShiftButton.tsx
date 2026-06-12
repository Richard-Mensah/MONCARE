"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { claimShift, withdrawClaim } from "@/lib/actions/claims"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import type { ClaimStatus } from "@/types"

type Props = {
  shiftId: string
  claim: { id: string; status: ClaimStatus } | null
}

export default function ClaimShiftButton({ shiftId, claim }: Props) {
  const [pending, start] = useTransition()
  const router = useRouter()

  function doClaim() {
    start(async () => {
      await claimShift(shiftId)
      router.refresh()
    })
  }
  function doWithdraw() {
    if (!claim) return
    start(async () => {
      await withdrawClaim(claim.id)
      router.refresh()
    })
  }

  if (claim?.status === "pending") {
    return (
      <div className="flex items-center gap-2">
        <Badge className="bg-amber-100 text-amber-800">Claim pending</Badge>
        <Button variant="ghost" size="sm" loading={pending} onClick={doWithdraw}>
          Withdraw
        </Button>
      </div>
    )
  }
  if (claim?.status === "approved") {
    return <Badge className="bg-emerald-100 text-emerald-800">You got it 🎉</Badge>
  }
  if (claim?.status === "rejected") {
    return <Badge className="bg-gray-100 text-gray-600">Not selected</Badge>
  }

  return (
    <Button size="sm" loading={pending} onClick={doClaim}>
      Claim this shift
    </Button>
  )
}
