import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className, width = 150, height = 60 }: Props) {
  return (
    <Image
      src="/moncare-logo.png"
      alt="MONCARE — Healthcare agency"
      width={width}
      height={height}
      priority
      className={cn("h-auto w-auto", className)}
    />
  )
}
