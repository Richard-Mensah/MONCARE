import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLDivElement>

export default function Card({ className, children, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}
