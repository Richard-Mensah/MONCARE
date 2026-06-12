import Link from "next/link"
import Logo from "@/components/layout/Logo"
import { LogOut, Search } from "lucide-react"
import { ROLE_LABELS } from "@/constants"
import NotificationBell from "@/components/features/notifications/NotificationBell"
import type { Profile } from "@/types"

type Props = {
  profile: Profile
}

function initials(name: string | null): string {
  if (!name) return "MC"
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function AppHeader({ profile }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 md:gap-5">
        <Link href="/" className="flex shrink-0 items-center">
          <Logo width={112} height={38} />
        </Link>

        {/* Quick search (visual) — hidden on small screens */}
        <div className="relative hidden flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search shifts, staff or location…"
            className="w-full rounded-lg border border-line bg-surface/60 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <NotificationBell userId={profile.id} />

          <div className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
              {initials(profile.full_name)}
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <p className="text-sm font-semibold text-ink">
                {profile.full_name || "Account"}
              </p>
              <p className="text-xs text-muted">{ROLE_LABELS[profile.role]}</p>
            </div>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              aria-label="Sign out"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
