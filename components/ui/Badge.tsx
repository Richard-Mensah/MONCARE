import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  )
}
