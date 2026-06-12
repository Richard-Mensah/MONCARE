import { cn } from "@/lib/utils"
import type { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function Input({ label, id, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={cn(
          "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink",
          "placeholder:text-slate-400",
          "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200",
          "disabled:bg-slate-50 disabled:text-slate-400",
          className
        )}
      />
    </div>
  )
}
