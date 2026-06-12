import Link from "next/link"
import Logo from "@/components/layout/Logo"
import { LogOut } from "lucide-react"
import { ROLE_LABELS } from "@/constants"
import NotificationBell from "@/components/features/notifications/NotificationBell"
import type { Profile } from "@/types"

type Props = {
  profile: Profile
}

export default function AppHeader({ profile }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
        <Link href="/" className="flex items-center">
          <Logo width={118} height={40} />
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium leading-tight text-gray-800">
              {profile.full_name || "Account"}
            </p>
            <p className="text-xs leading-tight text-gray-400">
              {ROLE_LABELS[profile.role]}
            </p>
          </div>

          <NotificationBell userId={profile.id} />

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              aria-label="Sign out"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
