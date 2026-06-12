import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Merge Tailwind classes safely (conditional + de-duplicated). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format an ISO date string (YYYY-MM-DD) as e.g. "Sat 14 Jun". */
export function formatShiftDate(date: string): string {
  const d = new Date(date + "T00:00:00")
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

/** Trim a "HH:MM:SS" Postgres time to "HH:MM". */
export function formatTime(time: string | null): string {
  if (!time) return ""
  return time.slice(0, 5)
}

/** "08:00 – 20:00" from two Postgres times. */
export function formatTimeRange(start: string | null, end: string | null): string {
  return `${formatTime(start)} – ${formatTime(end)}`
}

/** Relative "2m ago" / "3h ago" style label for a timestamp. */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}
