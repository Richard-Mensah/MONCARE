import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLDivElement>

export default function Card({ className, children, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-xl border border-line bg-white p-5",
        className
      )}
    >
      {children}
    </div>
  )
}
