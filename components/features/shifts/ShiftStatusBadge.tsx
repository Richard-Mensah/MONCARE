import Badge from "@/components/ui/Badge"
import { SHIFT_STATUS_LABELS, SHIFT_STATUS_STYLES } from "@/constants"
import type { ShiftStatus } from "@/types"

export default function ShiftStatusBadge({ status }: { status: ShiftStatus }) {
  return (
    <Badge className={SHIFT_STATUS_STYLES[status]}>
      {SHIFT_STATUS_LABELS[status]}
    </Badge>
  )
}
