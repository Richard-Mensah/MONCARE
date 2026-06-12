import { cn } from "@/lib/utils"
import type { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function Input({ label, id, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={cn(
          "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm",
          "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200",
          "disabled:bg-gray-50 disabled:text-gray-500",
          className
        )}
      />
    </div>
  )
}
